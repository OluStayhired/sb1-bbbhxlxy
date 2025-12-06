// src/components/HomeHealthcareAgencyModal.tsx
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
  Users
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

interface HomeHealthcareAgencyModalProps {
  agency: HomeHealthAgency;
  nationalMedianWalkingMoving: number;
  nationalMedianInOutBed: number;
  nationalMedianBathing: number;
  nationalMedianBreathing: number;
  onClose: () => void;
}

export function HomeHealthcareAgencyModal({
  agency,
  nationalMedianWalkingMoving,
  nationalMedianInOutBed,
  nationalMedianBathing,
  nationalMedianBreathing,
  onClose,
}: HomeHealthcareAgencyModalProps) {
  
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
        message: 'This home health agency demonstrates exceptional patient care quality across all recovery metrics.'
      };
    } else if (rating >= 3.5) {
      return {
        label: 'Very Good',
        color: 'text-blue-700',
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        message: 'This agency consistently delivers strong patient outcomes with proven recovery success rates.'
      };
    } else if (rating >= 2.5) {
      return {
        label: 'Adequate',
        color: 'text-amber-700',
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        message: 'This agency meets basic care standards but shows inconsistent results across recovery metrics.'
      };
    } else {
      return {
        label: 'Below Average',
        color: 'text-rose-700',
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        message: 'This agency faces significant challenges in delivering consistent patient recovery outcomes.'
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding mobility improvement rate of ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points above national median).`,
        impact: 'Patients regain independence faster, reducing fall risks and enabling daily activities like grocery shopping or visiting friends. Your loved one will likely achieve walking goals ahead of schedule, easing your worry about their safety and autonomy.',
        familyNote: 'This high success rate means fewer emergency calls, less need for mobility equipment, and greater peace of mind knowing your family member can move safely.',
        good: true
      };
    } else if (percentage >= nationalMedianWalkingMoving * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid mobility improvement rate of ${percentage.toFixed(0)}%, meeting the national median of ${nationalMedianWalkingMoving.toFixed(0)}%.`,
        impact: 'Patients show consistent progress in walking and movement. Recovery timelines align with national standards, enabling safe navigation at home and reducing dependence on mobility aids.',
        familyNote: 'You can expect steady, predictable progress. Your loved one should regain enough mobility for essential daily tasks within typical recovery timeframes.',
        good: true
      };
    } else if (percentage >= nationalMedianWalkingMoving * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Below-average mobility improvement at ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Slower recovery may prolong dependence on walkers, wheelchairs, or assistance. Patients face extended periods of limited independence, potentially delaying return to normal activities and increasing isolation.',
        familyNote: 'As a family member, you may need to arrange longer-term assistance or modify the home environment. The recovery journey will require extra patience and possibly additional therapy sessions at your own expense.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Concerning mobility outcomes at ${percentage.toFixed(0)}% (${Math.abs(walkingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Significantly delayed mobility recovery increases fall risks, social isolation, and psychological distress. Patients may remain bedbound or chair-bound far longer than medically necessary, leading to muscle atrophy and secondary complications.',
        familyNote: 'Your family will face difficult decisions: hiring full-time caregivers, considering facility placement, or shouldering intense caregiving burdens yourself. The financial and emotional toll can be substantial and prolonged.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Exceptional bed mobility improvement at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points above national median).`,
        impact: 'Patients quickly master safe bed transfers, eliminating nighttime fall risks and enabling independent toileting. This fundamental skill accelerates all other recovery areas and prevents pressure sores from prolonged bed rest.',
        familyNote: 'You will sleep better knowing your loved one can safely get up at night without calling for help. This independence is often the difference between staying at home versus needing facility care.',
        good: true
      };
    } else if (percentage >= nationalMedianInOutBed * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Reliable bed mobility improvement at ${percentage.toFixed(0)}%, aligned with the national median of ${nationalMedianInOutBed.toFixed(0)}%.`,
        impact: 'Patients achieve safe bed transfers within expected timeframes. This restores dignity and reduces caregiver strain, allowing patients to manage personal needs with minimal assistance.',
        familyNote: 'Your involvement will decrease steadily as your loved one regains independence with basic transfers, freeing you to focus on emotional support rather than physical assistance.',
        good: true
      };
    } else if (percentage >= nationalMedianInOutBed * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Suboptimal bed mobility progress at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points below national median).`,
        impact: 'Prolonged transfer difficulties trap patients in bed longer, increasing risks of bedsores, blood clots, and pneumonia. Every movement becomes a source of anxiety rather than independence.',
        familyNote: 'You may need to install hospital beds, transfer poles, or hire overnight assistance. The constant worry about nighttime falls can disrupt your sleep and work performance for months.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Severely limited bed mobility gains at ${percentage.toFixed(0)}% (${Math.abs(bedMobilityVsMedian).toFixed(0)} points below national median).`,
        impact: 'Patients remain dangerously dependent for basic transfers, leading to complete loss of privacy and dignity. The physical strain of assisting with every transfer can injure caregivers, creating a cascading crisis.',
        familyNote: 'This level of dependency often breaks family caregiving capacity. You will face impossible choices between your own health, your job, and your loved one\'s safety—frequently requiring costly 24/7 professional care.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Outstanding bathing independence at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points above national median).`,
        impact: 'Patients rapidly regain the ability to bathe safely and independently, preserving dignity and self-esteem. This achievement signals broader recovery success and readiness for independent living.',
        familyNote: 'Your loved one will maintain their dignity and you will avoid the awkwardness of intimate care assistance. This independence often becomes a turning point in their emotional recovery and your relationship.',
        good: true
      };
    } else if (percentage >= nationalMedianBathing * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Solid bathing improvement at ${percentage.toFixed(0)}%, matching the national median of ${nationalMedianBathing.toFixed(0)}%.`,
        impact: 'Patients progress toward independent bathing on typical timelines. Adaptive equipment and techniques enable safe hygiene maintenance with decreasing supervision.',
        familyNote: 'You can plan for a gradual transition to independence. Simple bathroom modifications and occasional assistance will likely suffice, preserving both safety and dignity.',
        good: true
      };
    } else if (percentage >= nationalMedianBathing * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Delayed bathing independence at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Prolonged bathing dependence erodes dignity and increases depression risks. Poor hygiene can lead to skin infections, social withdrawal, and resistance to care, complicating overall recovery.',
        familyNote: 'You will face uncomfortable decisions about providing intimate care for your parent or spouse. Many families report this as the most emotionally difficult aspect of caregiving, straining relationships.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Critical bathing dependency at ${percentage.toFixed(0)}% (${Math.abs(bathingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Severe bathing limitations destroy patient dignity and self-worth. Total dependence for personal hygiene contributes to depression, isolation, and giving up on recovery goals entirely.',
        familyNote: 'The psychological impact on both patient and family is devastating. Providing intimate care for a parent or spouse often causes profound relationship changes and caregiver burnout, with lasting emotional consequences.',
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
        borderColor: 'border-emerald-100',
        iconColor: 'text-emerald-500',
        textColor: 'text-emerald-900',
        concern: `Exceptional breathing improvement at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points above national median).`,
        impact: 'Superior respiratory care reduces hospitalization risks and enables full activity participation. Patients breathe easier, sleep better, and regain stamina for social engagement and physical activities.',
        familyNote: 'You will experience less anxiety about emergency situations and late-night calls. Your loved one can participate in family gatherings and activities without exhaustion or breathing distress.',
        good: true
      };
    } else if (percentage >= nationalMedianBreathing * 0.95) {
      return {
        status: 'Good',
        icon: CheckCircle,
        bgColor: 'bg-blue-50',
        borderColor: 'border-blue-100',
        iconColor: 'text-blue-500',
        textColor: 'text-blue-900',
        concern: `Effective breathing management at ${percentage.toFixed(0)}%, meeting the national median of ${nationalMedianBreathing.toFixed(0)}%.`,
        impact: 'Patients achieve stable respiratory function, reducing emergency room visits and complications. Proper breathing techniques and medication management enable safe daily activities.',
        familyNote: 'You can trust that respiratory issues are being properly monitored and managed, reducing the constant fear of breathing emergencies that plague many caregivers.',
        good: true
      };
    } else if (percentage >= nationalMedianBreathing * 0.80) {
      return {
        status: 'Fair',
        icon: TrendingDown,
        bgColor: 'bg-amber-50',
        borderColor: 'border-amber-100',
        iconColor: 'text-amber-500',
        textColor: 'text-amber-900',
        concern: `Concerning breathing outcomes at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Inadequate respiratory improvement leaves patients vulnerable to pneumonia, COPD exacerbations, and emergency hospitalizations. Shortness of breath limits all activities, causing fear and isolation.',
        familyNote: 'You will live with constant vigilance, watching for signs of respiratory distress. Frequent hospital visits disrupt your life and work, while anxiety about your loved one\'s breathing never truly subsides.',
        good: false
      };
    } else {
      return {
        status: 'Poor',
        icon: AlertTriangle,
        bgColor: 'bg-rose-50',
        borderColor: 'border-rose-100',
        iconColor: 'text-rose-500',
        textColor: 'text-rose-900',
        concern: `Critical respiratory management at ${percentage.toFixed(0)}% (${Math.abs(breathingVsMedian).toFixed(0)} points below national median).`,
        impact: 'Poor respiratory outcomes lead to repeated hospitalizations, oxygen dependency, and life-threatening complications. Patients live in constant fear of suffocation, unable to walk across a room or sleep through the night.',
        familyNote: 'Your family faces the terrifying reality of life-threatening breathing crises. The financial burden of repeated hospitalizations combines with emotional trauma of watching your loved one struggle for breath, often requiring end-of-life planning discussions prematurely.',
        good: false
      };
    }
  };

  const walking = getWalkingAnalysis();
  const bedMobility = getBedMobilityAnalysis();
  const bathing = getBathingAnalysis();
  const breathing = getBreathingAnalysis();

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
              <h2 className="text-xl font-bold text-gray-900">{agency.provider_name}</h2>
              <p className="text-sm text-gray-500 flex items-center space-x-1">
                <MapPin className="w-3 h-3" />
                <span>{agency.city_town}, {agency.state} {agency.zip_code}</span>
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
          {/* Quality Rating Hero Section */}
          <div className={`${status.bgColor} rounded-xl p-6 border ${status.borderColor}`}>
            <div className="flex items-center justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <Star className={`w-5 h-5 ${status.color}`} />
                  <span className={`text-sm font-semibold ${status.color} uppercase tracking-wide`}>
                    Patient Care Quality Rating
                  </span>
                </div>
                <div className="flex items-center space-x-4 mb-3">
                  <div className="flex items-center space-x-1">
                    {[...Array(5)].map((_, index) => (
                      <Star
                        key={index}
                        className={`w-8 h-8 ${
                          index < Math.floor(agency.quality_of_patient_care_star_rating || 0)
                            ? 'fill-red-50 text-red-500'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-4xl font-bold text-gray-900">
                    {agency.quality_of_patient_care_star_rating.toFixed(1)}
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

          {/* Agency Information */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 mb-1">
                <Phone className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Contact</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{agency.telephone_number || 'N/A'}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Users className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">CMS ID</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{agency.cms_certification_number}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <MapPin className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Location</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{agency.state}</p>
            </div>
            <div className="bg-gray-50 hover:bg-gray-100 text-gray-500 rounded-lg p-4 border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-500 mb-1">
                <Star className="w-4 h-4" />
                <span className="text-xs font-medium uppercase">Rating</span>
              </div>
              <p className="text-sm font-semibold text-gray-900">{agency.quality_of_patient_care_star_rating.toFixed(1)}/5</p>
            </div>
          </div>

          {/* Key Recovery Areas */}
          <div>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center space-x-2">
              <Heart className="w-5 h-5 text-rose-500" />
              <span>Recovery Performance Analysis</span>
            </h3>

            <div className="space-y-4">
              {/* Walking/Mobility */}
              <div className={`${walking.bgColor} rounded-lg p-5 border ${walking.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${walking.bgColor} rounded-lg`}>
                    <walking.icon className={`w-6 h-6 ${walking.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${walking.textColor} flex items-center space-x-2`}>
                        <Activity className="w-4 h-4" />
                        <span>Walking & Mobility Recovery</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${walking.textColor} ${walking.bgColor} border border-current`}>
                        {walking.status}
                      </span>
                    </div>
                    <p className={`text-sm ${walking.textColor} mb-2 font-medium`}>
                      {walking.concern}
                    </p>
                    <p className={`text-xs ${walking.textColor} opacity-90 leading-relaxed mb-2`}>
                      <span className="font-semibold">Patient Impact:</span> {walking.impact}
                    </p>
                    <p className={`text-xs ${walking.textColor} opacity-90 leading-relaxed`}>
                      <span className="font-semibold">Family Impact:</span> {walking.familyNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bed Mobility */}
              <div className={`${bedMobility.bgColor} rounded-lg p-5 border ${bedMobility.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${bedMobility.bgColor} rounded-lg`}>
                    <bedMobility.icon className={`w-6 h-6 ${bedMobility.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${bedMobility.textColor} flex items-center space-x-2`}>
                        <UserCheck className="w-4 h-4" />
                        <span>Bed Mobility & Transfer Independence</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bedMobility.textColor} ${bedMobility.bgColor} border border-current`}>
                        {bedMobility.status}
                      </span>
                    </div>
                    <p className={`text-sm ${bedMobility.textColor} mb-2 font-medium`}>
                      {bedMobility.concern}
                    </p>
                    <p className={`text-xs ${bedMobility.textColor} opacity-90 leading-relaxed mb-2`}>
                      <span className="font-semibold">Patient Impact:</span> {bedMobility.impact}
                    </p>
                    <p className={`text-xs ${bedMobility.textColor} opacity-90 leading-relaxed`}>
                      <span className="font-semibold">Family Impact:</span> {bedMobility.familyNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Bathing */}
              <div className={`${bathing.bgColor} rounded-lg p-5 border ${bathing.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${bathing.bgColor} rounded-lg`}>
                    <bathing.icon className={`w-6 h-6 ${bathing.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${bathing.textColor} flex items-center space-x-2`}>
                        <Heart className="w-4 h-4" />
                        <span>Bathing & Personal Care Independence</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${bathing.textColor} ${bathing.bgColor} border border-current`}>
                        {bathing.status}
                      </span>
                    </div>
                    <p className={`text-sm ${bathing.textColor} mb-2 font-medium`}>
                      {bathing.concern}
                    </p>
                    <p className={`text-xs ${bathing.textColor} opacity-90 leading-relaxed mb-2`}>
                      <span className="font-semibold">Patient Impact:</span> {bathing.impact}
                    </p>
                    <p className={`text-xs ${bathing.textColor} opacity-90 leading-relaxed`}>
                      <span className="font-semibold">Family Impact:</span> {bathing.familyNote}
                    </p>
                  </div>
                </div>
              </div>

              {/* Breathing */}
              <div className={`${breathing.bgColor} rounded-lg p-5 border ${breathing.borderColor}`}>
                <div className="flex items-start space-x-4">
                  <div className={`p-3 ${breathing.bgColor} rounded-lg`}>
                    <breathing.icon className={`w-6 h-6 ${breathing.iconColor}`} />
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className={`font-bold ${breathing.textColor} flex items-center space-x-2`}>
                        <Stethoscope className="w-4 h-4" />
                        <span>Respiratory Function & Breathing</span>
                      </h4>
                      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${breathing.textColor} ${breathing.bgColor} border border-current`}>
                        {breathing.status}
                      </span>
                    </div>
                    <p className={`text-sm ${breathing.textColor} mb-2 font-medium`}>
                      {breathing.concern}
                    </p>
                    <p className={`text-xs ${breathing.textColor} opacity-90 leading-relaxed mb-2`}>
                      <span className="font-semibold">Patient Impact:</span> {breathing.impact}
                    </p>
                    <p className={`text-xs ${breathing.textColor} opacity-90 leading-relaxed`}>
                      <span className="font-semibold">Family Impact:</span> {breathing.familyNote}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Services Offered */}
          <div className="bg-gray-50 rounded-lg p-5 border border-gray-200">
            <h4 className="font-bold text-gray-900 mb-3 flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span>Available Services</span>
            </h4>
            <div className="flex flex-wrap gap-2">
              {agency.nursing_care_services === 'YES' && (
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-lg text-sm font-medium">Nursing Care</span>
              )}
              {agency.physical_therapy_services === 'YES' && (
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-lg text-sm font-medium">Physical Therapy</span>
              )}
              {agency.occupational_therapy_services === 'YES' && (
                <span className="px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-sm font-medium">Occupational Therapy</span>
              )}
              {agency.speech_pathology_services === 'YES' && (
                <span className="px-3 py-1 bg-pink-100 text-pink-700 rounded-lg text-sm font-medium">Speech Pathology</span>
              )}
              {agency.medical_social_services === 'YES' && (
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-lg text-sm font-medium">Medical Social Services</span>
              )}
              {agency.home_health_aide_services === 'YES' && (
                <span className="px-3 py-1 bg-teal-100 text-teal-700 rounded-lg text-sm font-medium">Home Health Aide</span>
              )}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-100 to-red-50 rounded-lg p-6 border border-red-100 hover:border-red-200">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-bold text-gray-900 mb-1">Need expert guidance on home care options?</h4>
                <p className="text-sm text-gray-600">Schedule a consultation to discuss the best care plan for your loved one.</p>
              </div>
              <Link 
                to="https://meetings.hubspot.com/olu-adedeji"
                target="_blank"
                className="px-6 py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors shadow-lg shadow-red-500/50 font-semibold whitespace-nowrap">
                Book Consultation
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default HomeHealthcareAgencyModal;
