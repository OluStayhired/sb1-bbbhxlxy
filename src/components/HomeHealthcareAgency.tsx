// src/components/HomeHealthcareAgency.tsx
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { 
  Loader2, Search, X, Building2, 
  ChevronUp, ChevronDown, Calendar,
  ArrowLeft, ArrowRight, Star, Globe, 
  MapPin, ArrowUpDown, Clock, 
  Heart, Activity, Briefcase, Filter,
  CheckCircle, UserCheck, Stethoscope, Lightbulb
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TooltipExtended } from '/src/utils/TooltipExtended';
import { TooltipHelp } from '/src/utils/TooltipHelp';
import { HomeHealthcareAgencyModal } from './HomeHealthcareAgencyModal';
import { HomeHealthcareAgencySidePanel } from './HomeHealthcareAgencySidePanel';



interface HomeHealthAgency {
  id: string;
  cms_certification_number: string;
  state: string;
  provider_name: string;
  address: string;
  city_town: string;
  zip_code: string;
  telephone_number: string;
  nursing_care_services: string;
  physical_therapy_services: string;
  occupational_therapy_services: string;
  speech_pathology_services: string;
  medical_social_services: string;
  home_health_aide_services: string;
  quality_of_patient_care_star_rating: number;
  better_walking_moving: number;
  better_in_and_out_of_bed: number;
  better_at_bathing: number;
  breathing_improved: number;
}

type SortField = keyof HomeHealthAgency;
type SortDirection = 'asc' | 'desc';

interface HomeHealthcareAgencyProps {}

export function HomeHealthcareAgency({}: HomeHealthcareAgencyProps) {
  const [allAgencies, setAllAgencies] = useState<HomeHealthAgency[]>([]);
  const [displayedAgencies, setDisplayedAgencies] = useState<HomeHealthAgency[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedState, setSelectedState] = useState('All States');
  const [sortField, setSortField] = useState<SortField | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>('asc');
  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false);

  // Modal state
const [selectedAgency, setSelectedAgency] = useState<HomeHealthAgency | null>(null);
const [isModalOpen, setIsModalOpen] = useState(false);


  // Advanced filter states
  const [filterNursingCare, setFilterNursingCare] = useState(false);
  const [filterPhysicalTherapy, setFilterPhysicalTherapy] = useState(false);
  const [filterOccupationalTherapy, setFilterOccupationalTherapy] = useState(false);
  const [filterSpeechPathology, setFilterSpeechPathology] = useState(false);
  const [filterMedicalSocial, setFilterMedicalSocial] = useState(false);
  const [filterHomeHealthAide, setFilterHomeHealthAide] = useState(false);

  // National medians
  const [nationalMedianQualityRating, setNationalMedianQualityRating] = useState<number>(0);
  const [nationalMedianWalkingMoving, setNationalMedianWalkingMoving] = useState<number>(0);
  const [nationalMedianInOutBed, setNationalMedianInOutBed] = useState<number>(0);
  const [nationalMedianBathing, setNationalMedianBathing] = useState<number>(0);
  const [nationalMedianBreathing, setNationalMedianBreathing] = useState<number>(0);

  // Add state for side panel
const [selectedAgencyForPanel, setSelectedAgencyForPanel] = useState<HomeHealthAgency | null>(null);
const [isPanelOpen, setIsPanelOpen] = useState(false);

  const agenciesPerPage = 25;

  const calculateMedian = (values: number[]): number => {
    if (values.length === 0) return 0;
    const sorted = [...values].sort((a, b) => a - b);
    const mid = Math.floor(sorted.length / 2);
    return sorted.length % 2 === 0 ? (sorted[mid - 1] + sorted[mid]) / 2 : sorted[mid];
  };

  const fetchAgencies = useCallback(async () => {
    if (!supabase) {
      setError("Supabase client is not initialized.");
      setIsLoading(false);
      return;
    }
    
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('home_health_care_agencies')
        .select(`
          cms_certification_number,
          state,
          provider_name,
          address,
          city_town,
          zip_code,
          telephone_number,
          nursing_care_services,
          physical_therapy_services,
          occupational_therapy_services,
          speech_pathology_services,
          medical_social_services,
          home_health_aide_services,
          quality_of_patient_care_star_rating,
          better_walking_moving,
          better_in_and_out_of_bed,
          better_at_bathing,
          breathing_improved
        `)
        .order('provider_name');

      if (fetchError) {
        throw fetchError;
      }

      if (data && Array.isArray(data) && data.length > 0) {
        // Calculate medians
        const qualityRatings = data
          .map(a => parseFloat(a.quality_of_patient_care_star_rating as any))
          .filter(v => !isNaN(v) && v !== null && v > 0);
        
        const walkingMoving = data
          .map(a => parseFloat(a.better_walking_moving as any))
          .filter(v => !isNaN(v) && v !== null && v >= 0);
        
        const inOutBed = data
          .map(a => parseFloat(a.better_in_and_out_of_bed as any))
          .filter(v => !isNaN(v) && v !== null && v >= 0);
        
        const bathing = data
          .map(a => parseFloat(a.better_at_bathing as any))
          .filter(v => !isNaN(v) && v !== null && v >= 0);
        
        const breathing = data
          .map(a => parseFloat(a.breathing_improved as any))
          .filter(v => !isNaN(v) && v !== null && v >= 0);

        setNationalMedianQualityRating(calculateMedian(qualityRatings));
        setNationalMedianWalkingMoving(calculateMedian(walkingMoving));
        setNationalMedianInOutBed(calculateMedian(inOutBed));
        setNationalMedianBathing(calculateMedian(bathing));
        setNationalMedianBreathing(calculateMedian(breathing));

        const agencies: HomeHealthAgency[] = data.map(record => ({
          id: String(record.cms_certification_number),
          cms_certification_number: String(record.cms_certification_number) || '',
          state: record.state || '',
          provider_name: record.provider_name || '',
          address: record.address || '',
          city_town: record.city_town || '',
          zip_code: String(record.zip_code) || '',
          telephone_number: record.telephone_number || '',
          nursing_care_services: String(record.nursing_care_services || '').toUpperCase(),
          physical_therapy_services: String(record.physical_therapy_services || '').toUpperCase(),
          occupational_therapy_services: String(record.occupational_therapy_services || '').toUpperCase(),
          speech_pathology_services: String(record.speech_pathology_services || '').toUpperCase(),
          medical_social_services: String(record.medical_social_services || '').toUpperCase(),
          home_health_aide_services: String(record.home_health_aide_services || '').toUpperCase(),
          quality_of_patient_care_star_rating: parseFloat(record.quality_of_patient_care_star_rating as any) || 0,
          better_walking_moving: parseFloat(record.better_walking_moving as any) || 0,
          better_in_and_out_of_bed: parseFloat(record.better_in_and_out_of_bed as any) || 0,
          better_at_bathing: parseFloat(record.better_at_bathing as any) || 0,
          breathing_improved: parseFloat(record.breathing_improved as any) || 0,
        }));

        setAllAgencies(agencies);
      } else {
        setAllAgencies([]);
      }
      setError(null);
    } catch (err: any) {
      console.error('Error fetching home health agencies:', err);
      setError('Failed to load home health agency data. ' + (err.message || 'Check database connection.'));
      setAllAgencies([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const uniqueStates = useMemo(() => {
    const states = new Set(allAgencies.map(a => a.state).filter(Boolean));
    return ['All States', ...Array.from(states).sort()];
  }, [allAgencies]);

  // Filter and sort agencies logic
  useEffect(() => {
    let filtered = [...allAgencies];

    // State filter
    if (selectedState !== 'All States') {
      filtered = filtered.filter(agency => agency.state === selectedState);
    }

    // Search filter
    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(agency =>
        agency.provider_name.toLowerCase().includes(lowerCaseQuery) ||
        agency.city_town.toLowerCase().includes(lowerCaseQuery) ||
        agency.state.toLowerCase().includes(lowerCaseQuery) ||
        agency.address.toLowerCase().includes(lowerCaseQuery) ||
        agency.zip_code.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Advanced service filters
    if (filterNursingCare) {
      filtered = filtered.filter(agency => agency.nursing_care_services === 'YES');
    }
    if (filterPhysicalTherapy) {
      filtered = filtered.filter(agency => agency.physical_therapy_services === 'YES');
    }
    if (filterOccupationalTherapy) {
      filtered = filtered.filter(agency => agency.occupational_therapy_services === 'YES');
    }
    if (filterSpeechPathology) {
      filtered = filtered.filter(agency => agency.speech_pathology_services === 'YES');
    }
    if (filterMedicalSocial) {
      filtered = filtered.filter(agency => agency.medical_social_services === 'YES');
    }
    if (filterHomeHealthAide) {
      filtered = filtered.filter(agency => agency.home_health_aide_services === 'YES');
    }

    // Sorting
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
    const startIndex = (currentPage - 1) * agenciesPerPage;
    const endIndex = startIndex + agenciesPerPage;
    setDisplayedAgencies(filtered.slice(startIndex, endIndex));

    // Recalculate total pages and reset current page if needed
    const totalPages = Math.ceil(filtered.length / agenciesPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [
    allAgencies, 
    searchQuery, 
    selectedState, 
    currentPage, 
    sortField, 
    sortDirection,
    filterNursingCare,
    filterPhysicalTherapy,
    filterOccupationalTherapy,
    filterSpeechPathology,
    filterMedicalSocial,
    filterHomeHealthAide
  ]);

  // Initial data fetch
  useEffect(() => {
    fetchAgencies();
    setSearchQuery('');
    setCurrentPage(1);
    setSelectedState('All States');
  }, [fetchAgencies]);

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

  const getFilteredAgencies = () => {
    let filtered = [...allAgencies];

    if (selectedState !== 'All States') {
      filtered = filtered.filter(agency => agency.state === selectedState);
    }

    if (searchQuery.trim()) {
      const lowerCaseQuery = searchQuery.toLowerCase();
      filtered = filtered.filter(agency =>
        agency.provider_name.toLowerCase().includes(lowerCaseQuery) ||
        agency.city_town.toLowerCase().includes(lowerCaseQuery) ||
        agency.state.toLowerCase().includes(lowerCaseQuery) ||
        agency.address.toLowerCase().includes(lowerCaseQuery) ||
        agency.zip_code.toLowerCase().includes(lowerCaseQuery)
      );
    }

    // Advanced service filters
    if (filterNursingCare) {
      filtered = filtered.filter(agency => agency.nursing_care_services === 'YES');
    }
    if (filterPhysicalTherapy) {
      filtered = filtered.filter(agency => agency.physical_therapy_services === 'YES');
    }
    if (filterOccupationalTherapy) {
      filtered = filtered.filter(agency => agency.occupational_therapy_services === 'YES');
    }
    if (filterSpeechPathology) {
      filtered = filtered.filter(agency => agency.speech_pathology_services === 'YES');
    }
    if (filterMedicalSocial) {
      filtered = filtered.filter(agency => agency.medical_social_services === 'YES');
    }
    if (filterHomeHealthAide) {
      filtered = filtered.filter(agency => agency.home_health_aide_services === 'YES');
    }

    return filtered;
  };

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(getFilteredAgencies().length / agenciesPerPage);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  const clearAdvancedFilters = () => {
    setFilterNursingCare(false);
    setFilterPhysicalTherapy(false);
    setFilterOccupationalTherapy(false);
    setFilterSpeechPathology(false);
    setFilterMedicalSocial(false);
    setFilterHomeHealthAide(false);
    setCurrentPage(1);
  };

  const hasActiveFilters = filterNursingCare || filterPhysicalTherapy || 
    filterOccupationalTherapy || filterSpeechPathology || 
    filterMedicalSocial || filterHomeHealthAide;

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
                ? 'fill-red-100 text-red-400 text-xs'
                : 'text-gray-300 text-xs'
            }`}
          />
        ))}
        <span className="ml-1 text-xs font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const getPerformanceColor = (value: number, median: number) => {
    if (value >= median * 1.1) {
      return 'bg-emerald-100 text-emerald-800';
    } else if (value >= median * 0.9) {
      return 'bg-blue-100 text-blue-800';
    } else if (value >= median * 0.7) {
      return 'bg-amber-100 text-amber-800';
    } else {
      return 'bg-rose-100 text-rose-800';
    }
  };

  const totalFiltered = getFilteredAgencies().length;
  const totalPages = Math.ceil(totalFiltered / agenciesPerPage);

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
              {/*{totalFiltered.toLocaleString()} agencies found*/}
              12,157 Home Caregiving Agencies
            </p>
          </div>
        </div>
      </div>

      {/* Search and Filters */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative md:col-span-2">
          <input
            type="text"
            placeholder="Search by name, city, zip, or address..."
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
            className="w-auto px-4 py-2.5 border border-gray-300 rounded-lg 
            focus:ring-2 focus:ring-red-500 focus:border-red-500 bg-white text-sm"
          >
            {uniqueStates.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>
      </div>

      {/* Advanced Filters */}
      <div className="mb-6">
        <button
          onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
          className="flex items-center space-x-2 px-4 py-2 bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors text-sm font-medium text-white"
        >
          <Filter className="w-4 h-4" />
          <span>Advanced Filters</span>
          {hasActiveFilters && (
            <span className="bg-red-500 text-white text-xs px-2 py-0.5 rounded-full">Active</span>
          )}
        </button>

        <div className="flex flex-wrap mt-2 gap-1">
          <TooltipHelp text="⚡Nursing Care">
            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">NC</span>
           </TooltipHelp> 

          <TooltipHelp text="⚡Physical Therapy">
            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">PT</span>
          </TooltipHelp>

          <TooltipHelp text="⚡Occupational Therapy">
            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">OT</span>
          </TooltipHelp>

          <TooltipHelp text="⚡Speech Pathology">
            <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">SP</span>
          </TooltipHelp>

          <TooltipHelp text="⚡Medical Social Services">
            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">MS</span>
          </TooltipHelp>

          <TooltipHelp text="⚡Home Health Aide">
            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs">HHA</span>
          </TooltipHelp> 
        </div>
        

        {showAdvancedFilters && (
          <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
            <div className="flex items-center justify-between mb-3">
              <h3 className="text-sm font-semibold text-gray-700">Filter by Services Offered</h3>
              {hasActiveFilters && (
                <button
                  onClick={clearAdvancedFilters}
                  className="text-xs text-red-600 hover:text-red-700 font-medium"
                >
                  Clear All
                </button>
              )}
            </div>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
      <TooltipExtended text="Nursing Care - A nurse visits to check on you, give you medicine correctly, and make sure you don't get sick so you can stay healthy and strong.">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterNursingCare}
                  onChange={(e) => {
                    setFilterNursingCare(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Nursing Care</span>
                <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">NC</span>
              </label>
          </TooltipExtended>

             <TooltipExtended text="Physical Therapy - This therapy helps you get stronger, learn how to walk again, and teaches you how to move safely so you can go wherever you want to go.">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterPhysicalTherapy}
                  onChange={(e) => {
                    setFilterPhysicalTherapy(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Physical Therapy</span>
                <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">PT</span>
              </label>
          </TooltipExtended>    

             <TooltipExtended text="Occupational Therapy - This helper teaches you how to do everyday tasks like getting dressed, brushing your teeth, or cooking simple food all by yourself again.">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterOccupationalTherapy}
                  onChange={(e) => {
                    setFilterOccupationalTherapy(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Occupational Therapy</span>
                <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">OT</span>
              </label>
        </TooltipExtended>

           <TooltipExtended text="Speech Pathology - This special doctor helps you learn how to talk clearly and make sure you can swallow your food and water safely so you don't choke.">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterSpeechPathology}
                  onChange={(e) => {
                    setFilterSpeechPathology(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Speech Pathology</span>
                <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">SP</span>
              </label>
           </TooltipExtended>

          <TooltipExtended text="Medical Social Services - This person is a super-helper who finds all the important information and resources, like special equipment or financial help, so you don't have to worry about grown-up things.">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterMedicalSocial}
                  onChange={(e) => {
                    setFilterMedicalSocial(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Medical Social Services</span>
                <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">MS</span>
              </label>
          </TooltipExtended>
              
          <TooltipExtended text="Home Health Aide - This helper assists you with personal things like taking a bath or getting out of bed in the morning, so you can feel clean and comfortable.">             
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filterHomeHealthAide}
                  onChange={(e) => {
                    setFilterHomeHealthAide(e.target.checked);
                    setCurrentPage(1);
                  }}
                  className="w-4 h-4 text-red-500 border-gray-300 rounded focus:ring-red-500"
                />
                <span className="text-sm text-gray-700">Home Health Aide</span>
                <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs">HHA</span>
              </label>
            </TooltipExtended>
            </div>
          </div>
        )}

        
      </div>

      {/* National Medians Display */}
      <div className="mb-12">
        {/*}div className="flex items-center text-xs text-gray-500 space-x-2 flex-wrap gap-2">*/}
        <div className="grid grid-cols-1 space-y-1 sm:inline flex items-center text-xs text-gray-500 sm:space-x-2">
          <TooltipExtended text="⚡national median quality rating for patient care">
            <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
              border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
              <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group">
                <Star className="w-4 h-4"/>
              </span>
              <span className="font-semibold">Quality Rating</span> 
              <span>{nationalMedianQualityRating.toFixed(1)}</span>
            </div>
          </TooltipExtended>

          <TooltipExtended text="⚡national median percentage for patients showing improvement in walking/moving">
            <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
              border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
              <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group">
                <Activity className="w-4 h-4"/>
              </span>
              <span className="font-semibold">Walking/Moving</span> 
              <span>{nationalMedianWalkingMoving.toFixed(0)}%</span>
            </div>
          </TooltipExtended>

          <TooltipExtended text="⚡national median percentage for patients improving in getting in/out of bed">
            <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
              border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
              <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group">
                <UserCheck className="w-4 h-4"/>
              </span>
              <span className="font-semibold">Bed Mobility</span> 
              <span>{nationalMedianInOutBed.toFixed(0)}%</span>
            </div>
          </TooltipExtended>

          <TooltipExtended text="⚡national median percentage for patients improving bathing ability">
            <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
              border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
              <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group">
                <Heart className="w-4 h-4"/>
              </span>
              <span className="font-semibold">Bathing</span> 
              <span>{nationalMedianBathing.toFixed(0)}%</span>
            </div>
          </TooltipExtended>

          <TooltipExtended text="⚡national median percentage for patients with improved breathing">
            <div className="flex w-full space-x-2 items-center bg-gray-50 p-3 
              border border-gray-200 hover:border-red-200 hover:text-red-500 hover:bg-red-50 rounded-lg group transition-colors">
              <span className="bg-red-100 hover:bg-red-200 rounded-full p-2 group">
                <Stethoscope className="w-4 h-4"/>
              </span>
              <span className="font-semibold">Breathing</span> 
              <span>{nationalMedianBreathing.toFixed(0)}%</span>
            </div>
          </TooltipExtended>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader2 className="w-8 h-8 text-red-500 animate-spin" />
          <span className="ml-3 text-red-500">Loading agency data...</span>
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
                    onClick={() => handleSort('quality_of_patient_care_star_rating')}
                    className="px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Star className="w-3.5 h-3.5"/></span>
                      <span>Quality Rating</span>
                      {renderSortIcon('quality_of_patient_care_star_rating')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('provider_name')}
                    className="px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Building2 className="w-3.5 h-3.5"/></span>
                      <span>Agency Name</span>
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
                    onClick={() => handleSort('better_walking_moving')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Activity className="w-3.5 h-3.5"/></span>
                      <span>Walking</span>
                      {renderSortIcon('better_walking_moving')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('better_in_and_out_of_bed')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><UserCheck className="w-3.5 h-3.5"/></span>
                      <span>Bed Mobility</span>
                      {renderSortIcon('better_in_and_out_of_bed')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('better_at_bathing')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Heart className="w-3.5 h-3.5"/></span>
                      <span>Bathing</span>
                      {renderSortIcon('better_at_bathing')}
                    </div>
                  </th>

                  <th
                    onClick={() => handleSort('breathing_improved')}
                    className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Stethoscope className="w-3.5 h-3.5"/></span>
                      <span>Breathing</span>
                      {renderSortIcon('breathing_improved')}
                    </div>
                  </th>

                  <th className="hidden sm:table-cell px-4 py-3 text-left text-xs font-normal text-gray-700 tracking-wider">
                    <div className="flex items-center text-gray-500 space-x-1">
                      <span className="text-gray-400"><Briefcase className="w-3.5 h-3.5"/></span>
                      <span>Services</span>
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
                {displayedAgencies.length === 0 ? (
                  <tr>
                    <td colSpan={9} className="px-4 py-8 text-center text-gray-500">
                      <MapPin className="w-12 h-12 mx-auto text-gray-400 mb-2" />
                      <p>No home health agencies found matching your criteria.</p>
                    </td>
                  </tr>
                ) : (
                  displayedAgencies.map((agency) => (
                    <tr key={agency.id} className="hover:bg-red-50 text-xs cursor-pointer"
                          //onClick={() => {
                          //setSelectedAgency(agency);
                          //setIsModalOpen(true);
                          //}}

                      // In the table row onClick
                      onClick={() => {
                      setSelectedAgencyForPanel(agency);
                      setIsPanelOpen(true);
                        }}

                      >
                      <td className="px-4 py-4 text-xs whitespace-nowrap">
                        {renderStarRating(agency.quality_of_patient_care_star_rating)}

                        <button     
                            className="sm:hidden mt-2 flex items-center space-x-1 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group"                          
                         >
                              <span>Insights</span>
                              <ArrowRight className="w-3.5 h-3.5 transition-transform duration-300 group-hover:translate-x-1" />
                        </button>

                      </td>
                      <td className="px-4 py-4">
                        <div className="text-xs font-medium text-gray-900">{agency.provider_name}</div>
                        <div className="text-xs lowercase text-gray-500">{agency.address}</div>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {agency.city_town}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        {agency.state}
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getPerformanceColor(agency.better_walking_moving, nationalMedianWalkingMoving)
                        }`}>
                          {agency.better_walking_moving.toFixed(0)}%
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getPerformanceColor(agency.better_in_and_out_of_bed, nationalMedianInOutBed)
                        }`}>
                          {agency.better_in_and_out_of_bed.toFixed(0)}%
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getPerformanceColor(agency.better_at_bathing, nationalMedianBathing)
                        }`}>
                          {agency.better_at_bathing.toFixed(0)}%
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4 whitespace-nowrap text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          getPerformanceColor(agency.breathing_improved, nationalMedianBreathing)
                        }`}>
                          {agency.breathing_improved.toFixed(0)}%
                        </span>
                      </td>
                      <td className="hidden sm:table-cell px-4 py-4">
                        <div className="flex flex-wrap gap-1">
                          {agency.nursing_care_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-blue-100 text-blue-700 rounded text-xs">NC</span>
                          )}
                          {agency.physical_therapy_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-green-100 text-green-700 rounded text-xs">PT</span>
                          )}
                          {agency.occupational_therapy_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-purple-100 text-purple-700 rounded text-xs">OT</span>
                          )}
                          {agency.speech_pathology_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-pink-100 text-pink-700 rounded text-xs">SP</span>
                          )}
                          {agency.medical_social_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-amber-100 text-amber-700 rounded text-xs">MS</span>
                          )}
                          {agency.home_health_aide_services === 'YES' && (
                            <span className="px-2 py-0.5 bg-teal-100 text-teal-700 rounded text-xs">HHA</span>
                          )}
                        </div>
                      </td>

                        <td className="hidden sm:table-cell px-2 items-center">
                      <TooltipHelp text="⚡get insights">  
                       <button
                           
                            className="flex items-center space-x-1 px-2 py-2 bg-red-500 text-white rounded-lg hover:bg-red-500 transition-colors shadow-lg shadow-red-500/60 hover:shadow-xl hover:shadow-red-500/80 group" 
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
                  ({((currentPage - 1) * agenciesPerPage) + 1}-{Math.min(currentPage * agenciesPerPage, totalFiltered)} of {totalFiltered})
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

        {isModalOpen && selectedAgency && (
        <HomeHealthcareAgencyModal
          agency={selectedAgency}
          nationalMedianWalkingMoving={nationalMedianWalkingMoving}
          nationalMedianInOutBed={nationalMedianInOutBed}
          nationalMedianBathing={nationalMedianBathing}
          nationalMedianBreathing={nationalMedianBreathing}
          onClose={() => {
            setIsModalOpen(false);
            setSelectedAgency(null);
          }}
        />
      )}

      {/* Add before the closing </div> of the main component */}
{selectedAgencyForPanel && (
  <HomeHealthcareAgencySidePanel
    agency={selectedAgencyForPanel}
    nationalMedianWalkingMoving={nationalMedianWalkingMoving}
    nationalMedianInOutBed={nationalMedianInOutBed}
    nationalMedianBathing={nationalMedianBathing}
    nationalMedianBreathing={nationalMedianBreathing}
    isOpen={isPanelOpen}
    onClose={() => {
      setIsPanelOpen(false);
      // Delay clearing the agency to allow animation to complete
      setTimeout(() => setSelectedAgencyForPanel(null), 300);
    }}
  />
)}

             
    </div>
  );
}

export default HomeHealthcareAgency;
