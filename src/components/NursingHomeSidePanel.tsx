// src/components/NursingHomeSidePanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Star, 
  CircleDollarSign, 
  ArrowUpDown, 
  Clock, 
  Heart,
  Building2,
  MapPin,
  Phone,
  Bed,
  Users,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  Activity,
  ChevronRight,
  ExternalLink
} from 'lucide-react';

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

interface NursingHomeSidePanelProps {
  provider: NursingHomeProvider;
  nationalMedianStaffTurnover: number;
  nationalMedianStaffingHours: number;
  finesThreshold: number;
  isOpen: boolean;
  onClose: () => void;
}

export function NursingHomeSidePanel({
  provider,
  nationalMedianStaffTurnover,
  nationalMedianStaffingHours,
  finesThreshold,
  isOpen,
  onClose,
}: NursingHomeSidePanelProps) {
  
  // Calculate metrics for analysis
  const turnoverVsMedian = ((provider.total_nursing_staff_turnover / nationalMedianStaffTurnover) * 100) - 100;
  const staffingVsMedian = ((provider.reported_total_nurse_staffing_hours_per_resident_per_day / nationalMedianStaffingHours) * 100) - 100;
  const finesExceedThreshold = provider.total_amount_of_fines_in_dollars > finesThreshold;
  const finesPercentOverThreshold = ((provider.total_amount_of_fines_in_dollars / finesThreshold) * 100) - 100;

  // Determine overall status
  const getOverallStatus = (): { label: string; color: string; bgColor: string; borderColor: string; message: string } => {
    const rating = provider.poetiq_rating || 0;
    if (rating >= 4.5) {
      return {
        label: 'Exceptional',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        message: 'Outstanding performance across all quality indicators.'
      };
    } else if (rating >= 3.5) {
      return {
        label: 'Good',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        message: 'Strong performance in most quality areas.'
      };
    } else if (rating >= 2.5) {
      return {
        label: 'Fair',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        message: 'Acceptable performance with room for improvement.'
      };
    } else {
      return {
        label: 'Needs Improvement',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        message: 'Challenges in multiple quality indicators.'
      };
    }
  };

  const status = getOverallStatus();

  // Financial Stability Analysis
  const getFinancialAnalysis = () => {
    if (provider.total_amount_of_fines_in_dollars === 0) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `No regulatory fines recorded.`,
        impact: 'Demonstrates consistent compliance with federal and state regulations.',
        good: true
      };
    } else if (provider.total_amount_of_fines_in_dollars <= finesThreshold) {
      return {
        status: 'Stable',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Fines at $${provider.total_amount_of_fines_in_dollars.toLocaleString()}.`,
        impact: 'Minor regulatory issues addressed. Reasonable financial stability.',
        good: true
      };
    } else if (provider.total_amount_of_fines_in_dollars <= finesThreshold * 2) {
      return {
        status: 'Concerning',
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Elevated fines of $${provider.total_amount_of_fines_in_dollars.toLocaleString()}.`,
        impact: 'Past compliance violations may reflect on care quality.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Significant fines totaling $${provider.total_amount_of_fines_in_dollars.toLocaleString()}.`,
        impact: 'Substantial regulatory violations suggest serious concerns.',
        good: false
      };
    }
  };

  // Staff Stability Analysis
  const getStaffStabilityAnalysis = () => {
    if (provider.total_nursing_staff_turnover < nationalMedianStaffTurnover * 0.7) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Very low turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}%.`,
        impact: 'Strong workforce retention and staff satisfaction.',
        good: true
      };
    } else if (provider.total_nursing_staff_turnover <= nationalMedianStaffTurnover) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}% near median.`,
        impact: 'Reasonable staff retention supports consistent care.',
        good: true
      };
    } else if (provider.total_nursing_staff_turnover <= nationalMedianStaffTurnover * 1.5) {
      return {
        status: 'Concerning',
        icon: TrendingUp,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Elevated turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}%.`,
        impact: 'High turnover disrupts continuity of care.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Very high turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}%.`,
        impact: 'Excessive turnover severely impacts care quality.',
        good: false
      };
    }
  };

  // Staff Attentiveness Analysis
  const getStaffAttentivenessAnalysis = () => {
    if (provider.reported_total_nurse_staffing_hours_per_resident_per_day >= nationalMedianStaffingHours * 1.3) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `High staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/day.`,
        impact: 'Generous staffing enables prompt responses to needs.',
        good: true
      };
    } else if (provider.reported_total_nurse_staffing_hours_per_resident_per_day >= nationalMedianStaffingHours) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Adequate staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/day.`,
        impact: 'Sufficient staffing supports timely care delivery.',
        good: true
      };
    } else if (provider.reported_total_nurse_staffing_hours_per_resident_per_day >= nationalMedianStaffingHours * 0.8) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/day.`,
        impact: 'Reduced staffing may lead to delayed responses.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Low staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/day.`,
        impact: 'Critically low staffing compromises care quality.',
        good: false
      };
    }
  };

  // Health Inspection Analysis
  const getHealthInspectionAnalysis = () => {
    if (provider.health_inspection_rating >= 4) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding rating of ${provider.health_inspection_rating}/5.`,
        impact: 'Exceptional compliance with health and safety standards.',
        good: true
      };
    } else if (provider.health_inspection_rating >= 3) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid rating of ${provider.health_inspection_rating}/5.`,
        impact: 'Meets federal health and safety standards.',
        good: true
      };
    } else if (provider.health_inspection_rating >= 2) {
      return {
        status: 'Fair',
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average rating of ${provider.health_inspection_rating}/5.`,
        impact: 'Multiple deficiencies identified during inspections.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Poor rating of ${provider.health_inspection_rating}/5.`,
        impact: 'Serious deficiencies in health and safety standards.',
        good: false
      };
    }
  };

  const financial = getFinancialAnalysis();
  const staffStability = getStaffStabilityAnalysis();
  const staffAttentiveness = getStaffAttentivenessAnalysis();
  const healthInspection = getHealthInspectionAnalysis();

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-black transition-opacity duration-300 z-40 ${
          isOpen ? 'opacity-50' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />

      {/* Side Panel */}
      <div 
        className={`fixed top-0 right-0 h-full w-full md:w-[600px] lg:w-[700px] bg-white shadow-2xl transform transition-transform duration-300 ease-in-out z-50 ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="h-full flex flex-col">
          {/* Header - Sticky */}
          <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10 shadow-sm">
            <div className="flex items-center space-x-3 flex-1 min-w-0">
              <div className="p-2 bg-rose-50 rounded-lg flex-shrink-0">
                <Building2 className="w-5 h-5 text-rose-500" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-lg font-bold text-gray-900 truncate">{provider.provider_name}</h2>
                <p className="text-xs text-gray-500 flex items-center space-x-1 truncate">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{provider.city_town}, {provider.state}</span>
                </p>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors flex-shrink-0 ml-2"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto">
            <div className="p-6 space-y-5">
              {/* Poetiq Rating Hero Section */}
              <div className={`${status.bgColor} rounded-lg p-5 border ${status.borderColor}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-xs font-semibold ${status.color} uppercase tracking-wide`}>
                    Poetiq Quality Rating
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(provider.poetiq_rating || 0)
                            ? 'fill-red-50 text-red-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {provider.poetiq_rating?.toFixed(1)}
                  </span>
                </div>
                <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.color} ${status.bgColor} border border-current mb-2`}>
                  {status.label}
                </span>
                <p className={`text-xs ${status.color} leading-relaxed`}>
                  {status.message}
                </p>
              </div>

              {/* Quick Info Grid */}
              <div className="grid grid-cols-2 gap-3">
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Phone className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">Contact</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{provider.telephone_number || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Bed className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">Beds</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{provider.number_of_certified_beds}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Users className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">Residents</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{provider.average_number_of_residents_per_day.toFixed(0)}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Activity className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">Type</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{provider.provider_type || 'N/A'}</p>
                </div>
              </div>

              {/* Quality Analysis Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Quality Analysis</span>
                </h3>

                <div className="space-y-3">
                  {/* Financial Stability - Compact */}
                  <div className={`${financial.bgColor} rounded-lg p-4 border ${financial.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${financial.bgColorIcon} rounded-full border ${financial.borderColor}`}>
                        <financial.icon className={`w-4 h-4 ${financial.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${financial.textColor} flex items-center space-x-1`}>
                            <CircleDollarSign className="w-3 h-3" />
                            <span>Financial Stability</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${financial.textColor} ${financial.bgColor} border border-current`}>
                            {financial.status}
                          </span>
                        </div>
                        <p className={`text-xs ${financial.textColor} mb-1 font-medium`}>
                          {financial.concern}
                        </p>
                        <p className={`text-xs ${financial.textColor} leading-relaxed`}>
                          {financial.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Staff Stability - Compact */}
                  <div className={`${staffStability.bgColor} rounded-lg p-4 border ${staffStability.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${staffStability.bgColorIcon} rounded-full border ${staffStability.borderColor}`}>
                        <staffStability.icon className={`w-4 h-4 ${staffStability.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${staffStability.textColor} flex items-center space-x-1`}>
                            <ArrowUpDown className="w-3 h-3" />
                            <span>Staff Stability</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${staffStability.textColor} ${staffStability.bgColor} border border-current`}>
                            {staffStability.status}
                          </span>
                        </div>
                        <p className={`text-xs ${staffStability.textColor} mb-1 font-medium`}>
                          {staffStability.concern}
                        </p>
                        <p className={`text-xs ${staffStability.textColor} leading-relaxed`}>
                          {staffStability.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Staff Attentiveness - Compact */}
                  <div className={`${staffAttentiveness.bgColor} rounded-lg p-4 border ${staffAttentiveness.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${staffAttentiveness.bgColorIcon} rounded-full border ${staffAttentiveness.borderColor}`}>
                        <staffAttentiveness.icon className={`w-4 h-4 ${staffAttentiveness.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${staffAttentiveness.textColor} flex items-center space-x-1`}>
                            <Clock className="w-3 h-3" />
                            <span>Staff Attentiveness</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${staffAttentiveness.textColor} ${staffAttentiveness.bgColor} border border-current`}>
                            {staffAttentiveness.status}
                          </span>
                        </div>
                        <p className={`text-xs ${staffAttentiveness.textColor} mb-1 font-medium`}>
                          {staffAttentiveness.concern}
                        </p>
                        <p className={`text-xs ${staffAttentiveness.textColor} leading-relaxed`}>
                          {staffAttentiveness.impact}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Health Inspection - Compact */}
                  <div className={`${healthInspection.bgColor} rounded-lg p-4 border ${healthInspection.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${healthInspection.bgColorIcon} rounded-full border ${healthInspection.borderColor}`}>
                        <healthInspection.icon className={`w-4 h-4 ${healthInspection.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${healthInspection.textColor} flex items-center space-x-1`}>
                            <Heart className="w-3 h-3" />
                            <span>Health Inspection</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${healthInspection.textColor} ${healthInspection.bgColor} border border-current`}>
                            {healthInspection.status}
                          </span>
                        </div>
                        <p className={`text-xs ${healthInspection.textColor} mb-1 font-medium`}>
                          {healthInspection.concern}
                        </p>
                        <p className={`text-xs ${healthInspection.textColor} leading-relaxed`}>
                          {healthInspection.impact}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-5 border border-red-200">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">Ready to learn more?</h4>
                    <p className="text-xs text-gray-600">Schedule a consultation to discuss care options and get a full report.</p>
                  </div>
                  <Link 
                    to="https://meetings.hubspot.com/olu-adedeji"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="w-full flex items-center justify-center space-x-2 px-4 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/50 font-semibold text-sm">
                    <span>Book Consultation</span>
                    <ExternalLink className="w-4 h-4" />
                  </Link>
                </div>
              </div>

              {/* Address Section  */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>Full Address</span>
                </h4>
                <p className="text-sm text-gray-900">{provider.provider_address}</p>
                <p className="text-sm text-gray-900">{provider.city_town}, {provider.state} {provider.zip_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default NursingHomeSidePanel;
