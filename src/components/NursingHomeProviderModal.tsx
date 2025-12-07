// src/components/NursingHomeProviderModal.tsx
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
  Activity
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

interface NursingHomeProviderModalProps {
  provider: NursingHomeProvider;
  nationalMedianStaffTurnover: number;
  nationalMedianStaffingHours: number;
  finesThreshold: number;
  onClose: () => void;
}

export function NursingHomeProviderModal({
  provider,
  nationalMedianStaffTurnover,
  nationalMedianStaffingHours,
  finesThreshold,
  onClose,
}: NursingHomeProviderModalProps) {
  
  // Calculate metrics for analysis
  const turnoverVsMedian = ((provider.total_nursing_staff_turnover / nationalMedianStaffTurnover) * 100) - 100;
  const staffingVsMedian = ((provider.reported_total_nurse_staffing_hours_per_resident_per_day / nationalMedianStaffingHours) * 100) - 100;
  const finesExceedThreshold = provider.total_amount_of_fines_in_dollars > finesThreshold;
  const finesPercentOverThreshold = ((provider.total_amount_of_fines_in_dollars / finesThreshold) * 100) - 100;

  // Determine overall status
  const getOverallStatus = (): { label: string; color: string; bgColor: string; message: string } => {
    const rating = provider.poetiq_rating || 0;
    if (rating >= 4.5) {
      return {
        label: 'Exceptional',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        message: 'This facility demonstrates outstanding performance across all key quality indicators.'
      };
    } else if (rating >= 3.5) {
      return {
        label: 'Good',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        message: 'This facility meets quality standards with strong performance in most areas.'
      };
    } else if (rating >= 2.5) {
      return {
        label: 'Fair',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        message: 'This facility shows acceptable performance but has room for improvement in several areas.'
      };
    } else {
      return {
        label: 'Needs Improvement',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        message: 'This facility faces challenges in multiple quality indicators requiring careful consideration.'
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: 'No regulatory fines recorded.',
        impact: 'Demonstrates consistent compliance with federal and state regulations, suggesting strong operational management and quality care protocols.',
        good: true
      };
    } else if (provider.total_amount_of_fines_in_dollars <= finesThreshold) {
      return {
        status: 'Stable',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Fines remain within acceptable range at $${provider.total_amount_of_fines_in_dollars.toLocaleString()}.`,
        impact: 'Minor regulatory issues have been addressed. The facility maintains reasonable financial stability without major compliance concerns.',
        good: true
      };
    } else if (provider.total_amount_of_fines_in_dollars <= finesThreshold * 2) {
      return {
        status: 'Concerning',
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Elevated fines of $${provider.total_amount_of_fines_in_dollars.toLocaleString()} (${finesPercentOverThreshold.toFixed(0)}% above threshold).`,
        impact: 'Indicates past compliance violations that may reflect on care quality or operational management. Financial resources may be strained affecting service improvements.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Significant fines totaling $${provider.total_amount_of_fines_in_dollars.toLocaleString()} (${finesPercentOverThreshold.toFixed(0)}% above threshold).`,
        impact: 'Substantial regulatory violations suggest serious quality or safety concerns. High financial penalties may impact resources available for resident care and facility improvements.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Very low turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}% (${Math.abs(turnoverVsMedian).toFixed(0)}% below national median).`,
        impact: 'Strong workforce retention indicates positive work environment and staff satisfaction. Residents benefit from continuity of care with familiar, experienced staff members.',
        good: true
      };
    } else if (provider.total_nursing_staff_turnover <= nationalMedianStaffTurnover) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}% is below or near the national median of ${nationalMedianStaffTurnover.toFixed(1)}%.`,
        impact: 'Reasonable staff retention supports consistent care delivery. Residents experience stable relationships with caregivers, contributing to better outcomes.',
        good: true
      };
    } else if (provider.total_nursing_staff_turnover <= nationalMedianStaffTurnover * 1.5) {
      return {
        status: 'Concerning',
        icon: TrendingUp,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Elevated turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}% (${turnoverVsMedian.toFixed(0)}% above national median).`,
        impact: 'High staff turnover disrupts continuity of care and may indicate workplace challenges. Residents may face inconsistent care from frequently changing staff members.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Very high turnover at ${provider.total_nursing_staff_turnover.toFixed(1)}% (${turnoverVsMedian.toFixed(0)}% above national median).`,
        impact: 'Excessive staff turnover severely impacts care quality and resident safety. Frequent staff changes lead to communication breakdowns and reduced familiarity with resident needs.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `High staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/resident/day (${staffingVsMedian.toFixed(0)}% above national median).`,
        impact: 'Generous staffing levels enable prompt responses to resident needs, more personalized attention, and better monitoring of health conditions.',
        good: true
      };
    } else if (provider.reported_total_nurse_staffing_hours_per_resident_per_day >= nationalMedianStaffingHours) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Adequate staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/resident/day, meeting or exceeding the ${nationalMedianStaffingHours.toFixed(2)} hour median.`,
        impact: 'Sufficient nurse staffing supports timely care delivery and appropriate supervision, contributing to positive resident outcomes.',
        good: true
      };
    } else if (provider.reported_total_nurse_staffing_hours_per_resident_per_day >= nationalMedianStaffingHours * 0.8) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/resident/day (${Math.abs(staffingVsMedian).toFixed(0)}% below national median).`,
        impact: 'Reduced staffing may lead to delayed responses to resident needs and less individualized attention. Staff may experience higher workloads affecting care quality.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Significantly low staffing at ${provider.reported_total_nurse_staffing_hours_per_resident_per_day.toFixed(2)} hrs/resident/day (${Math.abs(staffingVsMedian).toFixed(0)}% below national median).`,
        impact: 'Critically low staffing levels compromise care quality and resident safety. Insufficient staff may miss important health changes or struggle to provide adequate assistance.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding health inspection rating of ${provider.health_inspection_rating} out of 5 stars.`,
        impact: 'Exceptional compliance with health and safety standards. Residents benefit from a facility that consistently meets or exceeds regulatory requirements for cleanliness, safety, and care protocols.',
        good: true
      };
    } else if (provider.health_inspection_rating >= 3) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid health inspection rating of ${provider.health_inspection_rating} out of 5 stars.`,
        impact: 'Meets federal health and safety standards with few deficiencies. Facility demonstrates adequate attention to infection control, medication management, and resident care quality.',
        good: true
      };
    } else if (provider.health_inspection_rating >= 2) {
      return {
        status: 'Fair',
        icon: AlertTriangle,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average health inspection rating of ${provider.health_inspection_rating} out of 5 stars.`,
        impact: 'Multiple deficiencies identified during inspections may affect resident care quality. Areas such as cleanliness, safety protocols, or documentation may need improvement.',
        good: false
      };
    } else {
      return {
        status: 'Critical',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Poor health inspection rating of ${provider.health_inspection_rating} out of 5 stars.`,
        impact: 'Serious deficiencies in health and safety standards pose risks to resident wellbeing. Issues may include inadequate infection control, medication errors, or insufficient care protocols.',
        good: false
      };
    }
  };

  const financial = getFinancialAnalysis();
  const staffStability = getStaffStabilityAnalysis();
  const staffAttentiveness = getStaffAttentivenessAnalysis();
  const healthInspection = getHealthInspectionAnalysis();

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <div className="p-2 bg-rose-50 rounded-lg">
              <Building2 className="w-6 h-6 text-rose-500" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-gray-900">{provider.provider_name}</h2>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{provider.city_town}, {provider.state} {provider.zip_code}</span>
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        <div className="p-6 space-y-6">
          {/* Poetiq Rating Hero Section */}
          <div className={`${status.bgColor} rounded-xl p-6 border ${status.borderColor}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className={`w-5 h-5 ${status.color}`} />
                  <span className={`text-sm font-semibold ${status.color} uppercase tracking-wide`}>
                    Poetiq Quality Rating
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-8 h-8 ${
                          index < Math.floor(provider.poetiq_rating || 0)
                            ? 'fill-red-50 text-red-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-4xl font-bold text-gray-900">
                    {provider.poetiq_rating?.toFixed(1)}
                  </span>
                  <span className={`px-3 py-1 rounded-full text-sm font-semibold ${status.color} ${status.bgColor} border border-current`}>
                    {status.label}
                  </span>
                </div>
                <p className={`text-sm ${status.color} leading-relaxed`}>
                  {status.message}
                </p>
              </div>
            </div>
          </div>

          {/* Facility Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Contact</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{provider.telephone_number || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Bed className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Beds</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{provider.number_of_certified_beds}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Avg Residents</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{provider.average_number_of_residents_per_day.toFixed(0)}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Activity className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Type</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{provider.provider_type || 'N/A'}</p>
            </div>
          </div>

          {/* Key Performance Areas */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Quality Analysis</span>
            </h3>

            <div className="space-y-4">
              {/* Financial Stability */}
              <div className={`${financial.bgColor} rounded-lg p-5 border ${financial.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${financial.bgColor} rounded-lg`}>
                    <financial.icon className={`w-6 h-6 ${financial.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${financial.textColor} flex items-center space-x-2`}>
                        <CircleDollarSign className="w-4 h-4" />
                        <span>Financial Stability</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${financial.textColor} ${financial.bgColor} border border-current`}>
                        {financial.status}
                      </span>
                    </div>
                    <p className={`text-sm ${financial.textColor} mb-2 font-medium`}>
                      {financial.concern}
                    </p>
                    <p className={`text-xs ${financial.textColor}  leading-relaxed`}>
                      {financial.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Stability */}
              <div className={`${staffStability.bgColor} rounded-lg p-5 border ${staffStability.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${staffStability.bgColor} rounded-lg`}>
                    <staffStability.icon className={`w-6 h-6 ${staffStability.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${staffStability.textColor} flex items-center space-x-2`}>
                        <ArrowUpDown className="w-4 h-4" />
                        <span>Staff Stability</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${staffStability.textColor} ${staffStability.bgColor} border border-current`}>
                        {staffStability.status}
                      </span>
                    </div>
                    <p className={`text-sm ${staffStability.textColor} mb-2 font-medium`}>
                      {staffStability.concern}
                    </p>
                    <p className={`text-xs ${staffStability.textColor}  leading-relaxed`}>
                      {staffStability.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Staff Attentiveness */}
              <div className={`${staffAttentiveness.bgColor} rounded-lg p-5 border ${staffAttentiveness.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${staffAttentiveness.bgColor} rounded-lg`}>
                    <staffAttentiveness.icon className={`w-6 h-6 ${staffAttentiveness.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${staffAttentiveness.textColor} flex items-center space-x-2`}>
                        <Clock className="w-4 h-4" />
                        <span>Staff Attentiveness</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${staffAttentiveness.textColor} ${staffAttentiveness.bgColor} border border-current`}>
                        {staffAttentiveness.status}
                      </span>
                    </div>
                    <p className={`text-sm ${staffAttentiveness.textColor} mb-2 font-medium`}>
                      {staffAttentiveness.concern}
                    </p>
                    <p className={`text-xs ${staffAttentiveness.textColor}  leading-relaxed`}>
                      {staffAttentiveness.impact}
                    </p>
                  </div>
                </div>
              </div>

              {/* Health Inspection */}
              <div className={`${healthInspection.bgColor} rounded-lg p-5 border ${healthInspection.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${healthInspection.bgColor} rounded-lg`}>
                    <healthInspection.icon className={`w-6 h-6 ${healthInspection.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${healthInspection.textColor} flex items-center space-x-2`}>
                        <Heart className="w-4 h-4" />
                        <span>Health Inspection Quality</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${healthInspection.textColor} ${healthInspection.bgColor} border border-current`}>
                        {healthInspection.status}
                      </span>
                    </div>
                    <p className={`text-sm ${healthInspection.textColor} mb-2 font-medium`}>
                      {healthInspection.concern}
                    </p>
                    <p className={`text-xs ${healthInspection.textColor}  leading-relaxed`}>
                      {healthInspection.impact}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-6 border border-red-100 hover:border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Ready to learn more?</h4>
                <p className="text-sm text-gray-600">Schedule a call to discuss care options for your loved one ❤️💛🧡.</p>
              </div>
              <Link 
                to="https://meetings.hubspot.com/olu-adedeji"
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/50 font-semibold">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default NursingHomeProviderModal;
