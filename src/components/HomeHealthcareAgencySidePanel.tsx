// src/components/HomeHealthcareAgencySidePanel.tsx
import React from 'react';
import { Link } from 'react-router-dom';
import { 
  X, 
  Star, 
  Activity,
  Heart,
  Building2,
  MapPin,
  Phone,
  AlertTriangle,
  CheckCircle,
  TrendingUp,
  TrendingDown,
  UserCheck,
  Stethoscope,
  Users,
  ExternalLink,
  Briefcase
} from 'lucide-react';

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

interface HomeHealthcareAgencySidePanelProps {
  agency: HomeHealthAgency;
  nationalMedianWalkingMoving: number;
  nationalMedianInOutBed: number;
  nationalMedianBathing: number;
  nationalMedianBreathing: number;
  isOpen: boolean;
  onClose: () => void;
}

export function HomeHealthcareAgencySidePanel({
  agency,
  nationalMedianWalkingMoving,
  nationalMedianInOutBed,
  nationalMedianBathing,
  nationalMedianBreathing,
  isOpen,
  onClose,
}: HomeHealthcareAgencySidePanelProps) {
  
  // Calculate performance vs medians
  const walkingVsMedian = agency.better_walking_moving - nationalMedianWalkingMoving;
  const bedMobilityVsMedian = agency.better_in_and_out_of_bed - nationalMedianInOutBed;
  const bathingVsMedian = agency.better_at_bathing - nationalMedianBathing;
  const breathingVsMedian = agency.breathing_improved - nationalMedianBreathing;

  // Determine overall status based on quality rating
  const getOverallStatus = (): { label: string; color: string; bgColor: string; borderColor: string; message: string } => {
    const rating = agency.quality_of_patient_care_star_rating || 0;
    if (rating >= 4.5) {
      return {
        label: 'Outstanding',
        color: 'text-emerald-700',
        bgColor: 'bg-emerald-50',
        borderColor: 'border-emerald-100',
        message: 'Exceptional patient care quality across all recovery metrics.'
      };
    } else if (rating >= 3.5) {
      return {
        label: 'Very Good',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        message: 'Strong patient outcomes with proven recovery success rates.'
      };
    } else if (rating >= 2.5) {
      return {
        label: 'Adequate',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        message: 'Meets basic care standards with room for improvement.'
      };
    } else {
      return {
        label: 'Below Average',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        message: 'Challenges in delivering consistent patient recovery outcomes.'
      };
    }
  };

  const status = getOverallStatus();

  // Walking/Mobility Analysis
  const getWalkingAnalysis = () => {
    const percentage = agency.better_walking_moving;
    if (percentage >= nationalMedianWalkingMoving * 1.15) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding mobility improvement rate of ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points above median).`,
        impact: 'Patients regain independence faster, reducing fall risks and enabling daily activities.',
        familyNote: 'Fewer emergency calls and greater peace of mind knowing safe mobility.',
        good: true
      };
    } else if (percentage >= nationalMedianWalkingMoving * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid mobility improvement rate of ${percentage.toFixed(0)}%, meeting the national median.`,
        impact: 'Consistent progress in walking and movement with timely recovery.',
        familyNote: 'Steady, predictable progress toward mobility goals.',
        good: true
      };
    } else if (percentage >= nationalMedianWalkingMoving * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average mobility improvement at ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points below median).`,
        impact: 'Slower recovery may prolong dependence on mobility aids.',
        familyNote: 'May need longer-term assistance and extra patience.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Concerning mobility outcomes at ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points below median).`,
        impact: 'Significantly delayed mobility recovery increases fall risks.',
        familyNote: 'May require full-time caregivers or facility placement.',
        good: false
      };
    }
  };

  // Bed Mobility Analysis
  const getBedMobilityAnalysis = () => {
    const percentage = agency.better_in_and_out_of_bed;
    if (percentage >= nationalMedianInOutBed * 1.15) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Exceptional bed mobility improvement at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points above median).`,
        impact: 'Patients quickly master safe bed transfers and independent toileting.',
        familyNote: 'Peace of mind with nighttime independence.',
        good: true
      };
    } else if (percentage >= nationalMedianInOutBed * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Reliable bed mobility improvement at ${percentage.toFixed(0)}%, aligned with national median.`,
        impact: 'Patients achieve safe bed transfers within expected timeframes.',
        familyNote: 'Reduced need for physical assistance over time.',
        good: true
      };
    } else if (percentage >= nationalMedianInOutBed * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Suboptimal bed mobility progress at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points below median).`,
        impact: 'Prolonged transfer difficulties increase risks of bedsores.',
        familyNote: 'May need hospital beds, transfer poles, or overnight help.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Severely limited bed mobility gains at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points below median).`,
        impact: 'Dangerous dependency for basic transfers and loss of privacy.',
        familyNote: 'Often requires costly 24/7 professional care.',
        good: false
      };
    }
  };

  // Bathing/Self-Care Analysis
  const getBathingAnalysis = () => {
    const percentage = agency.better_at_bathing;
    if (percentage >= nationalMedianBathing * 1.15) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding bathing independence at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points above median).`,
        impact: 'Patients rapidly regain bathing ability, preserving dignity.',
        familyNote: 'Maintains dignity and avoids awkward intimate care.',
        good: true
      };
    } else if (percentage >= nationalMedianBathing * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid bathing improvement at ${percentage.toFixed(0)}%, matching national median.`,
        impact: 'Patients progress toward independent bathing on typical timelines.',
        familyNote: 'Gradual transition to independence with simple modifications.',
        good: true
      };
    } else if (percentage >= nationalMedianBathing * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Delayed bathing independence at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points below median).`,
        impact: 'Prolonged bathing dependence erodes dignity.',
        familyNote: 'Uncomfortable decisions about providing intimate care.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Critical bathing dependency at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points below median).`,
        impact: 'Severe limitations destroy patient dignity and self-worth.',
        familyNote: 'Devastating psychological impact on patient and family.',
        good: false
      };
    }
  };

  // Breathing/Respiratory Analysis
  const getBreathingAnalysis = () => {
    const percentage = agency.breathing_improved;
    if (percentage >= nationalMedianBreathing * 1.15) {
      return {
        status: 'Excellent',
        icon: CheckCircle,
        bgColor: 'bg-emerald-50',
        bgColorIcon: 'bg-emerald-100', 
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Exceptional breathing improvement at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points above median).`,
        impact: 'Superior respiratory care reduces hospitalization risks.',
        familyNote: 'Less anxiety about breathing emergencies.',
        good: true
      };
    } else if (percentage >= nationalMedianBreathing * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        bgColorIcon: 'bg-blue-100', 
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Effective breathing management at ${percentage.toFixed(0)}%, meeting national median.`,
        impact: 'Patients achieve stable respiratory function.',
        familyNote: 'Proper monitoring reduces fear of breathing emergencies.',
        good: true
      };
    } else if (percentage >= nationalMedianBreathing * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        bgColorIcon: 'bg-amber-100', 
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Concerning breathing outcomes at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points below median).`,
        impact: 'Inadequate improvement leaves patients vulnerable to complications.',
        familyNote: 'Constant vigilance and frequent hospital visits.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        bgColorIcon: 'bg-rose-100', 
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Critical respiratory management at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points below median).`,
        impact: 'Poor outcomes lead to repeated hospitalizations and oxygen dependency.',
        familyNote: 'Terrifying reality of life-threatening breathing crises.',
        good: false
      };
    }
  };

  const walking = getWalkingAnalysis();
  const bedMobility = getBedMobilityAnalysis();
  const bathing = getBathingAnalysis();
  const breathing = getBreathingAnalysis();

  // Count available services
  const availableServices = [
    agency.nursing_care_services === 'YES' && 'Nursing Care',
    agency.physical_therapy_services === 'YES' && 'Physical Therapy',
    agency.occupational_therapy_services === 'YES' && 'Occupational Therapy',
    agency.speech_pathology_services === 'YES' && 'Speech Pathology',
    agency.medical_social_services === 'YES' && 'Medical Social',
    agency.home_health_aide_services === 'YES' && 'Home Health Aide',
  ].filter(Boolean);

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
                <h2 className="text-lg font-bold text-gray-900 truncate">{agency.provider_name}</h2>
                <p className="text-xs text-gray-500 flex items-center space-x-1 truncate">
                  <MapPin className="w-3 h-3 flex-shrink-0" />
                  <span>{agency.city_town}, {agency.state}</span>
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
              {/* Quality Rating Hero Section */}
              <div className={`${status.bgColor} rounded-lg p-5 border ${status.borderColor}`}>
                <div className="flex items-center space-x-2 mb-2">
                  <Star className={`w-4 h-4 ${status.color}`} />
                  <span className={`text-xs font-semibold ${status.color} uppercase tracking-wide`}>
                    Patient Care Quality Rating
                  </span>
                </div>
                <div className="flex items-center space-x-3 mb-2">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-5 h-5 ${
                          index < Math.floor(agency.quality_of_patient_care_star_rating || 0)
                            ? 'fill-red-50 text-red-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-2xl font-bold text-gray-900">
                    {agency.quality_of_patient_care_star_rating.toFixed(1)}
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
                  <p className="text-sm font-semibold text-gray-900 truncate">{agency.telephone_number || 'N/A'}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Briefcase className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">CMS ID</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900 truncate">{agency.cms_certification_number}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <MapPin className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">State</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{agency.state}</p>
                </div>
                <div className="bg-gray-50 rounded-lg p-3 border border-gray-200">
                  <div className="flex items-center space-x-2 mb-1">
                    <Star className="w-3 h-3 text-gray-500" />
                    <span className="text-xs font-medium text-gray-600 uppercase">Rating</span>
                  </div>
                  <p className="text-sm font-semibold text-gray-900">{agency.quality_of_patient_care_star_rating.toFixed(1)}/5</p>
                </div>
              </div>

              {/* Recovery Analysis Section */}
              <div>
                <h3 className="text-sm font-bold text-gray-900 mb-3 flex items-center space-x-2">
                  <Heart className="w-4 h-4 text-rose-500" />
                  <span>Recovery Performance</span>
                </h3>

                <div className="space-y-3">
                  {/* Walking/Mobility - Compact */}
                  <div className={`${walking.bgColor} rounded-lg p-4 border ${walking.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${walking.bgColorIcon} rounded-full border ${walking.borderColor}`}>
                        <walking.icon className={`w-4 h-4 ${walking.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${walking.textColor} flex items-center space-x-1`}>
                            <Activity className="w-3 h-3" />
                            <span>Walking & Mobility</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${walking.textColor} ${walking.bgColor} border border-current`}>
                            {walking.status}
                          </span>
                        </div>
                        <p className={`text-xs ${walking.textColor} mb-1 font-medium`}>
                          {walking.concern}
                        </p>
                        <p className={`text-xs ${walking.textColor} leading-relaxed mb-1`}>
                          <span className="font-semibold">Impact:</span> {walking.impact}
                        </p>
                        <p className={`text-xs ${walking.textColor} leading-relaxed`}>
                          <span className="font-semibold">Family:</span> {walking.familyNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bed Mobility - Compact */}
                  <div className={`${bedMobility.bgColor} rounded-lg p-4 border ${bedMobility.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${bedMobility.bgColorIcon} rounded-full border ${bedMobility.borderColor}`}>
                        <bedMobility.icon className={`w-4 h-4 ${bedMobility.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${bedMobility.textColor} flex items-center space-x-1`}>
                            <UserCheck className="w-3 h-3" />
                            <span>Bed Mobility</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${bedMobility.textColor} ${bedMobility.bgColor} border border-current`}>
                            {bedMobility.status}
                          </span>
                        </div>
                        <p className={`text-xs ${bedMobility.textColor} mb-1 font-medium`}>
                          {bedMobility.concern}
                        </p>
                        <p className={`text-xs ${bedMobility.textColor} leading-relaxed mb-1`}>
                          <span className="font-semibold">Impact:</span> {bedMobility.impact}
                        </p>
                        <p className={`text-xs ${bedMobility.textColor} leading-relaxed`}>
                          <span className="font-semibold">Family:</span> {bedMobility.familyNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Bathing - Compact */}
                  <div className={`${bathing.bgColor} rounded-lg p-4 border ${bathing.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${bathing.bgColorIcon} rounded-full border ${bathing.borderColor}`}>
                        <bathing.icon className={`w-4 h-4 ${bathing.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${bathing.textColor} flex items-center space-x-1`}>
                            <Heart className="w-3 h-3" />
                            <span>Bathing & Personal Care</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${bathing.textColor} ${bathing.bgColor} border border-current`}>
                            {bathing.status}
                          </span>
                        </div>
                        <p className={`text-xs ${bathing.textColor} mb-1 font-medium`}>
                          {bathing.concern}
                        </p>
                        <p className={`text-xs ${bathing.textColor} leading-relaxed mb-1`}>
                          <span className="font-semibold">Impact:</span> {bathing.impact}
                        </p>
                        <p className={`text-xs ${bathing.textColor} leading-relaxed`}>
                          <span className="font-semibold">Family:</span> {bathing.familyNote}
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Breathing - Compact */}
                  <div className={`${breathing.bgColor} rounded-lg p-4 border ${breathing.borderColor}`}>
                    <div className="flex items-start space-x-3">
                      <div className={`p-2 ${breathing.bgColorIcon} rounded-full border ${breathing.borderColor}`}>
                        <breathing.icon className={`w-4 h-4 ${breathing.iconColor}`} />
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between mb-1">
                          <h4 className={`text-xs font-bold ${breathing.textColor} flex items-center space-x-1`}>
                            <Stethoscope className="w-3 h-3" />
                            <span>Respiratory Function</span>
                          </h4>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-semibold ${breathing.textColor} ${breathing.bgColor} border border-current`}>
                            {breathing.status}
                          </span>
                        </div>
                        <p className={`text-xs ${breathing.textColor} mb-1 font-medium`}>
                          {breathing.concern}
                        </p>
                        <p className={`text-xs ${breathing.textColor} leading-relaxed mb-1`}>
                          <span className="font-semibold">Impact:</span> {breathing.impact}
                        </p>
                        <p className={`text-xs ${breathing.textColor} leading-relaxed`}>
                          <span className="font-semibold">Family:</span> {breathing.familyNote}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Available Services */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                  <Users className="w-3 h-3" />
                  <span>Available Services ({availableServices.length})</span>
                </h4>
                <div className="flex flex-wrap gap-2">
                  {agency.nursing_care_services === 'YES' && (
                    <span className="px-2 py-1 bg-blue-100 text-blue-700 rounded-md text-xs font-medium">Nursing Care</span>
                  )}
                  {agency.physical_therapy_services === 'YES' && (
                    <span className="px-2 py-1 bg-green-100 text-green-700 rounded-md text-xs font-medium">Physical Therapy</span>
                  )}
                  {agency.occupational_therapy_services === 'YES' && (
                    <span className="px-2 py-1 bg-cyan-100 text-cyan-700 rounded-md text-xs font-medium">Occupational Therapy</span>
                  )}
                  {agency.speech_pathology_services === 'YES' && (
                    <span className="px-2 py-1 bg-pink-100 text-pink-700 rounded-md text-xs font-medium">Speech Pathology</span>
                  )}
                  {agency.medical_social_services === 'YES' && (
                    <span className="px-2 py-1 bg-amber-100 text-amber-700 rounded-md text-xs font-medium">Medical Social</span>
                  )}
                  {agency.home_health_aide_services === 'YES' && (
                    <span className="px-2 py-1 bg-teal-100 text-teal-700 rounded-md text-xs font-medium">Home Health Aide</span>
                  )}
                </div>
              </div>

              {/* Call to Action */}
              <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-5 border border-red-200">
                <div className="space-y-3">
                  <div>
                    <h4 className="font-bold text-gray-900 mb-1 text-sm">Need expert guidance?</h4>
                    <p className="text-xs text-gray-600">Schedule a consultation to discuss home care options.</p>
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

              {/* Address Section */}
              <div className="bg-gray-50 rounded-lg p-4 border border-gray-200">
                <h4 className="text-xs font-semibold text-gray-700 mb-2 flex items-center space-x-1">
                  <MapPin className="w-3 h-3" />
                  <span>Full Address</span>
                </h4>
                <p className="text-sm text-gray-900">{agency.address}</p>
                <p className="text-sm text-gray-900">{agency.city_town}, {agency.state} {agency.zip_code}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default HomeHealthcareAgencySidePanel;
