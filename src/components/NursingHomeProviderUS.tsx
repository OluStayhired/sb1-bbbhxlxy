import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { Loader2, Search, X, Building2, ChevronUp, ChevronDown, ArrowLeft, ArrowRight, Star, MapPin } from 'lucide-react';
import { supabase } from '../lib/supabase';

interface NursingHomeProvider {
  id: string;
  provider_name: string;
  provider_address: string;
  city_town: string;
  state: string;
  zip_code: string;
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
    try {
      setIsLoading(true);
      const { data, error: fetchError } = await supabase
        .from('nursing_home_provider_info')
        .select(`
          id,
          provider_name,
          provider_address,
          city_town,
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
        const staffTurnoverValues = data
          .map(p => p.total_nursing_staff_turnover)
          .filter(v => v !== null && v >= 0);
        const staffingHoursValues = data
          .map(p => p.reported_total_nurse_staffing_hours_per_resident_per_day)
          .filter(v => v !== null && v > 0);

        const medianTurnover = calculateMedian(staffTurnoverValues);
        const medianStaffingHours = calculateMedian(staffingHoursValues);

        setNationalMedianStaffTurnover(medianTurnover);
        setNationalMedianStaffingHours(medianStaffingHours);

        const providersWithRating: NursingHomeProvider[] = data.map(record => {
          const provider = {
            id: String(record.id),
            provider_name: record.provider_name || '',
            provider_address: record.provider_address || '',
            city_town: record.city_town || '',
            state: record.state || '',
            zip_code: record.zip_code || '',
            telephone_number: record.telephone_number || '',
            number_of_certified_beds: record.number_of_certified_beds || 0,
            average_number_of_residents_per_day: record.average_number_of_residents_per_day || 0,
            provider_type: record.provider_type || '',
            overall_rating: record.overall_rating || 0,
            health_inspection_rating: record.health_inspection_rating || 0,
            staffing_rating: record.staffing_rating || 0,
            reported_total_nurse_staffing_hours_per_resident_per_day: record.reported_total_nurse_staffing_hours_per_resident_per_day || 0,
            total_nursing_staff_turnover: record.total_nursing_staff_turnover || 0,
            registered_nurse_turnover: record.registered_nurse_turnover || 0,
            total_amount_of_fines_in_dollars: record.total_amount_of_fines_in_dollars || 0,
            location: record.location || '',
            latitude: record.latitude || 0,
            longitude: record.longitude || 0,
          };

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
      setError('Failed to load nursing home data. ' + err.message);
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
        provider.zip_code.toLowerCase().includes(lowerCaseQuery)
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

    const startIndex = (currentPage - 1) * providersPerPage;
    const endIndex = startIndex + providersPerPage;
    setDisplayedProviders(filtered.slice(startIndex, endIndex));

    const totalPages = Math.ceil(filtered.length / providersPerPage);
    if (currentPage > totalPages && totalPages > 0) {
      setCurrentPage(1);
    }
  }, [allProviders, searchQuery, selectedState, selectedPoetiqRating, currentPage, sortField, sortDirection]);

  useEffect(() => {
    fetchProviders();
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

  const handlePageChange = (newPage: number) => {
    const totalPages = Math.ceil(getFilteredProviders().length / providersPerPage);
    if (newPage > 0 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
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
        provider.zip_code.toLowerCase().includes(lowerCaseQuery)
      );
    }

    return filtered;
  };

  const renderSortIcon = (field: SortField) => {
    if (sortField !== field) {
      return <ChevronUp className="w-3 h-3 text-gray-400" />;
    }
    return sortDirection === 'asc'
      ? <ChevronUp className="w-3 h-3 text-blue-600" />
      : <ChevronDown className="w-3 h-3 text-blue-600" />;
  };

  const renderStarRating = (rating: number) => {
    return (
      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            className={`w-4 h-4 ${
              index < Math.floor(rating)
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm font-semibold text-gray-700">{rating.toFixed(1)}</span>
      </div>
    );
  };

  const totalFiltered = getFilteredProviders().length;
  const totalPages = Math.ceil(totalFiltered / providersPerPage);

  return (
    <div className="bg-white rounded-lg shadow-sm p-6 h-full flex flex-col">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <div className="p-3 bg-blue-50 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600" />
          </div>
          <div>
            <h2 className="text-2xl font-bold text-gray-900">Nursing Home Provider Search</h2>
            <p className="text-sm text-gray-500 mt-1">
              {totalFiltered.toLocaleString()} providers found
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="relative">
          <input
            type="text"
            placeholder="Search by name, city, or location..."
            value={searchQuery}
            onChange={handleSearchChange}
            className="w-full px-4 py-2.5 pl-10 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm"
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
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
            {uniqueStates.map(state => (
              <option key={state} value={state}>
                {state}
              </option>
            ))}
          </select>
        </div>

        <div>
          <select
            value={selectedPoetiqRating}
            onChange={handlePoetiqRatingFilter}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 bg-white text-sm"
          >
            {poetiqRatingOptions.map(option => (
              <option key={option} value={option}>
                Poetiq {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 mb-4">
        <div className="flex items-center justify-between text-xs text-blue-800">
          <div>
            <span className="font-semibold">National Median Staff Turnover:</span> {nationalMedianStaffTurnover.toFixed(1)}%
          </div>
          <div>
            <span className="font-semibold">National Median Staffing Hours:</span> {nationalMedianStaffingHours.toFixed(2)} hrs/resident/day
          </div>
          <div>
            <span className="font-semibold">Fines Threshold:</span> ${finesThreshold.toLocaleString()}
          </div>
        </div>
      </div>

      {isLoading ? (
        <div className="flex items-center justify-center flex-grow">
          <Loader2 className="w-8 h-8 text-blue-500 animate-spin" />
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
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Poetiq Rating</span>
                      {renderSortIcon('poetiq_rating')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('provider_name')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Provider Name</span>
                      {renderSortIcon('provider_name')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('city_town')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>City</span>
                      {renderSortIcon('city_town')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('state')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>State</span>
                      {renderSortIcon('state')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('health_inspection_rating')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Health Rating</span>
                      {renderSortIcon('health_inspection_rating')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('reported_total_nurse_staffing_hours_per_resident_per_day')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Staff Hours</span>
                      {renderSortIcon('reported_total_nurse_staffing_hours_per_resident_per_day')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_nursing_staff_turnover')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Turnover %</span>
                      {renderSortIcon('total_nursing_staff_turnover')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('total_amount_of_fines_in_dollars')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Fines</span>
                      {renderSortIcon('total_amount_of_fines_in_dollars')}
                    </div>
                  </th>
                  <th
                    onClick={() => handleSort('number_of_certified_beds')}
                    className="px-4 py-3 text-left text-xs font-medium text-gray-700 uppercase tracking-wider cursor-pointer hover:bg-gray-100"
                  >
                    <div className="flex items-center space-x-1">
                      <span>Beds</span>
                      {renderSortIcon('number_of_certified_beds')}
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
                    <tr key={provider.id} className="hover:bg-gray-50">
                      <td className="px-4 py-4 whitespace-nowrap">
                        {provider.poetiq_rating && renderStarRating(provider.poetiq_rating)}
                      </td>
                      <td className="px-4 py-4">
                        <div className="text-sm font-medium text-gray-900">{provider.provider_name}</div>
                        <div className="text-xs text-gray-500">{provider.provider_address}</div>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {provider.city_town}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {provider.state}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
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
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)}
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
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
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          provider.total_amount_of_fines_in_dollars <= finesThreshold
                            ? 'bg-green-100 text-green-800'
                            : 'bg-red-100 text-red-800'
                        }`}>
                          ${provider.total_amount_of_fines_in_dollars.toLocaleString()}
                        </span>
                      </td>
                      <td className="px-4 py-4 whitespace-nowrap text-sm text-gray-700">
                        {provider.number_of_certified_beds}
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
                <span className="text-sm text-gray-500">
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
    </div>
  );
}

export default NursingHomeProviderUS;
