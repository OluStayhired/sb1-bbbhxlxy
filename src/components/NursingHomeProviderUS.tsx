import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2, Search, X, Building2, 
        ChevronUp, ChevronDown, Calendar,
        ArrowLeft, ArrowRight, Star, Zap, Globe, Bed, Heart,
        MapPin, ArrowUpDown, Clock, CircleDollarSign, 
        Lightbulb} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import { TooltipHelp } from '/src/utils/TooltipHelp';
import { NursingHomeProviderModal } from './NursingHomeProviderModal';
import { NursingHomeSidePanel } from './NursingHomeSidePanel';





// NOTE: Assuming 'supabase' client is available in the environment scope or imported via a mechanism not visible here.
// For self-contained execution in this environment, we must mock or assume its presence.
// Reverting to the original structure and ensuring data parsing is robust.
//const supabase = (window as any).supabase;

interface NursingHomeProvider {
  id: string;
  provider_name: string;
  provider_address: string;
  city_town: string;
  state: string;
  zip_code: string;
  county_parish: string;
  telephone_number: string;
  number_of_certified_beds: number;
  average_number_of_residents_per_day: number;
  provider_type: string;
  overall_rating: number;
  health_inspection_rating: number;
  staffing_rating: number;
  reported_total_nurse_staffing_hours_per_resident_per_day: number;
  total_nursing_staff_turnover: number;
  registered_nurse_turnover: number;
  total_amount_of_fines_in_dollars: number;
  location: string;
  latitude: number;
  longitude: number;
  poetiq_rating?: number;
}

type SortField = keyof NursingHomeProvider;
type SortDirection = 'asc' | 'desc';

interface NursingHomeProviderUSProps {
}

export function NursingHomeProviderUS({}: NursingHomeProviderUSProps) {
  const [allProviders, setAllProviders] = useState<NursingHomeProvider[]>([]);
  const [displayedProviders, setDisplayedProviders] = useState<NursingHomeProvider[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [selectedPoetiqRating, setSelectedPoetiqRating] = useState('All Ratings');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');

  const [nationalMedianStaffTurnover, setNationalMedianStaffTurnover] = useState<number>(0);
  const [nationalMedianStaffingHours, setNationalMedianStaffingHours] = useState<number>(0);
  
  // Nursing Modal Report modal visibility
  const [selectedProvider, setSelectedProvider] = useState<NursingHomeProvider | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Add state for side panel
const [selectedProviderForPanel, setSelectedProviderForPanel] = useState<NursingHomeProvider | null>(null);
const [isPanelOpen, setIsPanelOpen] = useState(false);

  const providersPerPage = 25;
  const finesThreshold = 100000;

  const calculateMedian = (values: number[]): number => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  };

  const calculatePoetiqRating = (provider: NursingHomeProvider): number => {
    let score = 0;

    score += (provider.health_inspection_rating / 5) * 1.5;

    if (nationalMedianStaffingHours > 0) {
      const staffingScore = Math.min(
        (provider.reported_total_nurse_staffing_hours_per_resident_per_day / nationalMedianStaffingHours),
        2
      );
      score += staffingScore * 0.75;
    }

    if (nationalMedianStaffTurnover > 0 && provider.total_nursing_staff_turnover >= 0) {
      const turnoverRatio = provider.total_nursing_staff_turnover / nationalMedianStaffTurnover;
      const turnoverScore = Math.max(0, 2 - turnoverRatio);
      score += Math.min(turnoverScore, 2) * 0.625;
    }

    if (provider.total_amount_of_fines_in_dollars <= finesThreshold) {
      score += 0.75;
    } else {
      const finesScore = Math.max(0, 1 - (provider.total_amount_of_fines_in_dollars - finesThreshold) / (finesThreshold * 2));
      score += finesScore * 0.75;
    }

    return Math.min(Math.round(score * 10) / 10, 5);
  };

  const fetchProviders = useCallback(async () => {
    if (!supabase) {
      setError("Supabase client is not initialized.");
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('nursing_home_provider_info')
        .select(`
          cms_certification_number,
          provider_name,
          provider_address,
          city_town,
          county_parish,
          state,
          zip_code,
          telephone_number,
          number_of_certified_beds,
          average_number_of_residents_per_day,
          provider_type,
          overall_rating,
          health_inspection_rating,
          staffing_rating,
          reported_total_nurse_staffing_hours_per_resident_per_day,
          total_nursing_staff_turnover,
          registered_nurse_turnover,
          total_amount_of_fines_in_dollars,
          location,
          latitude,
          longitude
        `)
        .order('provider_name');

      if (fetchError) {
        throw fetchError;
      }

      if (data && Array.isArray(data) && data.length > 0) {
        // --- FIX: Robustly parse string values to numbers for median calculation ---
        const staffTurnoverValues = data
          // Use 'as any' to allow indexing, even if TS types are loose on runtime data
          .map(p => parseFloat(p.total_nursing_staff_turnover as any))
          .filter(v => !isNaN(v) && v !== null && v >= 0);
        
        const staffingHoursValues = data
          .map(p => parseFloat(p.reported_total_nurse_staffing_hours_per_resident_per_day as any))
          .filter(v => !isNaN(v) && v !== null && v > 0);
        // --------------------------------------------------------------------------

        const medianTurnover = calculateMedian(staffTurnoverValues);
        const medianStaffingHours = calculateMedian(staffingHoursValues);

        setNationalMedianStaffTurnover(medianTurnover);
        setNationalMedianStaffingHours(medianStaffingHours);

        const providersWithRating: NursingHomeProvider[] = data.map(record => {
          const provider = {
            id: String(record.cms_certification_number), // Use a unique identifier from DB
            provider_name: record.provider_name || '',
            provider_address: record.provider_address || '',
            city_town: record.city_town || '',
            county_parish: record.county_parish || '',
            state: record.state || '',
            //zip_code: parseFloat(record.zip_code as any) || 0,
            zip_code: String(record.zip_code) || '',
            telephone_number: record.telephone_number || '',
            // Ensure all necessary fields are robustly converted to numbers using parseFloat
            number_of_certified_beds: parseFloat(record.number_of_certified_beds as any) || 0,
            average_number_of_residents_per_day: parseFloat(record.average_number_of_residents_per_day as any) || 0,
            provider_type: record.provider_type || '',
            overall_rating: parseFloat(record.overall_rating as any) || 0,
            health_inspection_rating: parseFloat(record.health_inspection_rating as any) || 0,
            staffing_rating: parseFloat(record.staffing_rating as any) || 0,
            reported_total_nurse_staffing_hours_per_resident_per_day: parseFloat(record.reported_total_nurse_staffing_hours_per_resident_per_day as any) || 0,
            total_nursing_staff_turnover: parseFloat(record.total_nursing_staff_turnover as any) || 0,
            registered_nurse_turnover: parseFloat(record.registered_nurse_turnover as any) || 0,
            total_amount_of_fines_in_dollars: parseFloat(record.total_amount_of_fines_in_dollars as any) || 0,
            location: record.location || '',
            latitude: parseFloat(record.latitude as any) || 0,
            longitude: parseFloat(record.longitude as any) || 0,
          } as NursingHomeProvider; // Cast to ensure type compatibility

          return {
            ...provider,
            poetiq_rating: calculatePoetiqRating(provider)
          };
        });

        setAllProviders(providersWithRating);
      } else {
        setAllProviders([]);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching nursing home providers:', err);
      setError('Failed to load nursing home data. ' + (err.message || 'Check database connection.'));
      setAllProviders([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uniqueStates = useMemo(() => {
    const states = new Set(allProviders.map(p => p.state).filter(Boolean));
    return ['All States', ...Array.from(states).sort()];
  }, [allProviders]);

  const poetiqRatingOptions = useMemo(() => {
    return ['All Ratings', '5 Stars', '4+ Stars', '3+ Stars', '2+ Stars', '1+ Stars'];
  }, []);

  // Filter and sort providers logic
  useEffect(() => {
    let filtered = [...allProviders];

    if (selectedState !== 'All States') {
      filtered = filtered.filter(provider => provider.state === selectedState);
    }

    if (selectedPoetiqRating !== 'All Ratings') {
      const ratingThreshold = parseInt(selectedPoetiqRating.charAt(0));
      filtered = filtered.filter(provider => provider.poetiq_rating && provider.poetiq_rating >= ratingThreshold);
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.provider_name.toLowerCase().includes(lowerCaseQuery) ||
        provider.city_town.toLowerCase().includes(lowerCaseQuery) ||
        provider.state.toLowerCase().includes(lowerCaseQuery) ||
        provider.provider_address.toLowerCase().includes(lowerCaseQuery) ||
        provider.zip_code.toLowerCase().includes(lowerCaseQuery) ||
        provider.county_parish.toLowerCase().includes(lowerCaseQuery)                                 
      );
    }

    if (sortField) {
      filtered.sort((a, b) => {
        const aValue = a[sortField];
        const bValue = b[sortField];

        if (aValue === null || aValue === undefined) return 1;
        if (bValue === null || bValue === undefined) return -1;

        if (typeof aValue === 'string' && typeof bValue === 'string') {
          return sortDirection === 'asc'
            ? aValue.localeCompare(bValue)
            : bValue.localeCompare(aValue);
        }

        if (typeof aValue === 'number' && typeof bValue === 'number') {
          return sortDirection === 'asc' ? aValue - bValue : bValue - aValue;
        }

        return 0;
      });
    }

    // Apply pagination
    const startIndex = (currentPage - 1) * providersPerPage;
    const endIndex = startIndex + providersPerPage;
    setDisplayedProviders(filtered.slice(startIndex, endIndex));

    // Recalculate total pages and reset current page if needed
    const totalPages = Math.ceil(filtered.length / providersPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [allProviders, searchQuery, selectedState, selectedPoetiqRating, currentPage, sortField, sortDirection]);

  // Initial data fetch
  useEffect(() => {
    fetchProviders();
    // Reset filters and page on initial load
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedState('All States');
    setSelectedPoetiqRating('All Ratings');
  }, [fetchProviders]);

  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(prev => prev === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleStateFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedState(e.target.value);
    setCurrentPage(1);
  };

  const handlePoetiqRatingFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedPoetiqRating(e.target.value);
    setCurrentPage(1);
  };

  const getFilteredProviders = () => {
    let filtered = [...allProviders];

    if (selectedState !== 'All States') {
      filtered = filtered.filter(provider => provider.state === selectedState);
    }

    if (selectedPoetiqRating !== 'All Ratings') {
      const ratingThreshold = parseInt(selectedPoetiqRating.charAt(0));
      filtered = filtered.filter(provider => provider.poetiq_rating && provider.poetiq_rating >= ratingThreshold);
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(provider =>
        provider.provider_name.toLowerCase().includes(lowerCaseQuery) ||
        provider.city_town.toLowerCase().includes(lowerCaseQuery) ||
        provider.state.toLowerCase().includes(lowerCaseQuery) ||
        provider.provider_address.toLowerCase().includes(lowerCaseQuery) ||
        provider.zip_code.toLowerCase().includes(lowerCaseQuery) ||
        provider.county_parish.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return filtered;
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(getFilteredProviders().length / providersPerPage);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <ChevronUp className="w-3 h-3 text-red-500" />
      : <ChevronDown className="w-3 h-3 text-red-500" />;
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex text-xs items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-3.5 h-3.5 ${
              index < Math.floor(rating)
                //? 'fill-yellow-400 text-yellow-400'
              ? 'fill-red-100 text-red-400 text-xs'
                : 'text-gray-300 text-xs'
            }`}
          />
        ))}
      
        <span className="ml-1 text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
      
      </div>
    
      
      
    );
  };

  const totalFiltered = getFilteredProviders().length;
  const totalPages = Math.ceil(totalFiltered / providersPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-red-50 rounded-lg">
            <Search className="h-6 w-6 text-red-500" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Quick Search</h2>
            <p className="text-sm text-gray-500 mt-1">
              {/*{totalFiltered.toLocaleString()} providers found*/}
              14,721 Nursing Homes
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, city, zip, county or location..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm"
          />
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
          {searchQuery && (
            <button
              onClick={() => setSearchQuery('')}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>

        <div>
          <select
            value={selectedState}
            onChange={handleStateFilter}
            className="w-auto md:col-span-1 px-4 py-2.5 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm"
          >
            {uniqueStates.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        {/*
        <div>
          <select
            value={selectedPoetiqRating}
            onChange={handlePoetiqRatingFilter}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm"
          >
            {poetiqRatingOptions.map(option => (
              <option key={option} value={option}>
                Poetiq {option}
              </option>
            ))}
          </select>
        </div>
        */}
        
      </div>

      {/* KPI/Median Display Row */}
      {/*<div className="bg-red-50 border border-red-200 rounded-lg p-3 mb-4">*/}
      <div className="mb-12">
        {/*<div className="flex items-center text-xs text-gray-500 space-x-2">*/}
        <div className="grid grid-cols-1 space-y-1 sm:inline flex items-center text-xs text-gray-500 sm:space-x-2">
          <TooltipExtended text="⚡staff stability - this indicates the national median (%) of staff changes in a nursing home">
          <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
            border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
            <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group"><ArrowUpDown className="w-4 h-4"/></span>
            <span className="font-semibold">Staff Turnover</span> 
            <span>{(nationalMedianStaffTurnover ?? 0).toFixed(1)}%</span>
          </div>
            </TooltipExtended>

          <TooltipExtended text="⚡staff attentiveness - this is the national median (%) of staff hrs spent on a patient per day">  
          <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
            border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg">
            <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group"><Clock className="w-4 h-4"/></span>
            <span className="font-semibold">Staffing Hours:</span> 
            <span>{nationalMedianStaffingHours.toFixed(2)} hours</span>
          </div>
          </TooltipExtended>
          
          <TooltipExtended text="⚡financial stability - Concerns are raised when a nursing home incurs above $100,000 in fines">  
          <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
            border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg">
            <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group"><CircleDollarSign className="w-4 h-4"/></span>
            <span className="font-semibold">Fines Threshold:</span> 
            <span>${finesThreshold.toLocaleString()}</span>
          </div>
          </TooltipExtended>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          <span className="ml-3 text-red-500">Loading provider data...</span>
        </div>
      ) : error ? (
        <div className="text-red-500 p-4 bg-red-50 rounded-lg">{error}</div>
      ) : (
        <>
          <div className="overflow-x-auto flex-grow">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50 sticky top-0">
                <tr>
                  
                  <th
                    onClick={() => handleSort('poetiq_rating')}
                    className="px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Star className="w-3.5 h-3.5"/></span>
                      <span>Poetiq Rating</span>
                      
                      {renderSortIcon('poetiq_rating')}
                    </div>
                      
                  </th>
                  
                  
                  <th
                    onClick={() => handleSort('provider_name')}
                    className="px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Building2 className="w-3.5 h-3.5"/></span>
                      <span>Nursing Home</span>
                      {renderSortIcon('provider_name')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('city_town')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><MapPin className="w-3.5 h-3.5"/></span>
                      <span>City</span>
                      {renderSortIcon('city_town')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('state')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Globe className="w-3.5 h-3.5"/></span>
                      <span>State</span>
                      {renderSortIcon('state')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('health_inspection_rating')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Heart className="w-3.5 h-3.5"/></span>
                      <span>Health Rating</span>
                      {renderSortIcon('health_inspection_rating')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('reported_total_nurse_staffing_hours_per_resident_per_day')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Clock className="w-3.5 h-3.5"/></span>
                      <span>Staff Hours</span>
                      {renderSortIcon('reported_total_nurse_staffing_hours_per_resident_per_day')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_nursing_staff_turnover')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><ArrowUpDown className="w-3.5 h-3.5"/></span>
                      <span>Turnover %</span>
                      {renderSortIcon('total_nursing_staff_turnover')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_amount_of_fines_in_dollars')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><CircleDollarSign className="w-3.5 h-3.5"/></span>
                      <span>Fines</span>
                      {renderSortIcon('total_amount_of_fines_in_dollars')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('number_of_certified_beds')}
                  className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Bed className="w-3.5 h-3.5"/></span>
                      <span>Beds</span>
                      {renderSortIcon('number_of_certified_beds')}
                    </div>
                  </th>

                  <th
                    //onClick={() => handleSort('number_of_certified_beds')}
                  className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Lightbulb className="w-3.5 h-3.5"/></span>
                      <span>Insights</span>
                      
                    </div>

                  </th>
                  
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {displayedProviders.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p>No nursing homes found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  displayedProviders.map((provider) => (
                    <tr key={provider.id} className="hover:bg-red-50 text-xs cursor-pointer"
                      //remove modal onclick from table   
                      //onClick={() => {
                        //    setSelectedProvider(provider);
                          //  setIsModalOpen(true);
                            //    }}               

                      //Added side panel onclick to table row. 
                      onClick={() => {
                      setSelectedProviderForPanel(provider);
                      setIsPanelOpen(true);
                        }}
                      >
                      <td className="px-4 py-4 text-xs whitespace-nowrap" >
                      
                        {provider.poetiq_rating && renderStarRating(provider.poetiq_rating)}
                        
                      </td>
                      <td className="px-4 py-4">
                        
                        <div className="text-xs text-left font-medium text-gray-900">
                          {provider.provider_name}</div>
                        <div className="text-xs text-left lowercase text-gray-500">{provider.provider_address}</div>
                        
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {provider.city_town}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {provider.state}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.health_inspection_rating >= 4
                            ? 'bg-green-100 text-green-800'
                            : provider.health_inspection_rating >= 3
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {provider.health_inspection_rating}/5
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.total_nursing_staff_turnover < nationalMedianStaffTurnover
                            ? 'bg-green-100 text-green-800'
                            : provider.total_nursing_staff_turnover < nationalMedianStaffTurnover * 1.5
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          {provider.total_nursing_staff_turnover.toFixed(1)}%
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.total_amount_of_fines_in_dollars <= finesThreshold
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          ${provider.total_amount_of_fines_in_dollars.toLocaleString()}
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {provider.number_of_certified_beds}
                      </td>

                      <td className="hidden sm:table-cell px-2 items-center">
                      <TooltipHelp text="⚡get insights">  
                       <button
                           //onClick={openCommunityModal}
                            className="flex items-center space-x-1 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group" 
                            //onClick={() => {
                            //setSelectedProvider(provider);
                            //setIsModalOpen(true);
                              //  }}
                         >
                    <span>Insights</span>
                    <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                          </button>
                      </TooltipHelp>
                        
                      </td>
                    </tr>
                 
                  ))
                )}
              </tbody>
            </table>
          </div>

          {totalPages > 1 && (
            <div className="flex justify-between items-center mt-6 pt-4 border-t border-gray-200">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <ArrowLeft className="w-4 h-4 mr-2" />
                Previous
              </button>
              <div className="flex items-center space-x-2">
                <span className="text-sm text-gray-700">
                  Page <span className="font-semibold">{currentPage}</span> of <span className="font-semibold">{totalPages}</span>
                </span>
                <span className="hidden sm:inline text-sm text-gray-500">
                  ({((currentPage - 1) * providersPerPage) + 1}-{Math.min(currentPage * providersPerPage, totalFiltered)} of {totalFiltered})
                </span>
              </div>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
                className="flex items-center px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </button>
            </div>
          )}
        </>
      )}

      {isModalOpen && selectedProvider && (
  <NursingHomeProviderModal
    provider={selectedProvider}
    nationalMedianStaffTurnover={nationalMedianStaffTurnover}
    nationalMedianStaffingHours={nationalMedianStaffingHours}
    finesThreshold={finesThreshold}
    onClose={() => {
      setIsModalOpen(false);
      setSelectedProvider(null);
    }}
  />
)}

{/* Add before the closing </div> of the main component */}
{selectedProviderForPanel && (
  <NursingHomeSidePanel
    provider={selectedProviderForPanel}
    nationalMedianStaffTurnover={nationalMedianStaffTurnover}
    nationalMedianStaffingHours={nationalMedianStaffingHours}
    finesThreshold={finesThreshold}
    isOpen={isPanelOpen}
    onClose={() => {
      setIsPanelOpen(false);
      // Delay clearing the provider to allow animation to complete
      setTimeout(() => setSelectedProviderForPanel(null), 300);
    }}
  />
)}
      

    </div>
  );
}

export default NursingHomeProviderUS;