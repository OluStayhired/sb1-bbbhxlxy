// src/components/EldercareGapDashboardModal.tsx
import React, { useState, useEffect } from 'react';
import { 
  X, 
  AlertTriangle, 
  Shield, 
  DollarSign, 
  CircleDollarSign,
  Clock, 
  FileText, 
  Heart,
  TrendingDown,
  AlertCircle,
  CheckCircle2,
  XCircle,
  ChevronRight,
  Zap,
  Brain,
  Scale,
  Users,
  Building2,
  Home,
  Activity,
  Target,
  Flame,
  Lightbulb,
  ShieldCheck,
  ArrowBigRightDash,
  Ambulance,
  HeartPulse
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { TooltipHelp } from '/src/utils/TooltipHelp';
import { TooltipExtended } from '/src/utils/TooltipExtended';

// Added Community Modal and Waitlist Modal
import { CommunityModal } from '../components/CommunityModal.tsx';
import { WaitlistModal } from '../components/WaitlistModal.tsx';


interface EldercareGapDashboardModalProps {
  isOpen: boolean;
  onClose: () => void;
  sessionId: string;
}

interface OnboardingResponse {
  id: number;
  session_id: string;
  firstname: string;
  relation: string;
  country: string;
  raw_answers: { [key: number]: string };
  calculated_phase: number;
  drag_score: number;
  is_registered: boolean;
  user_email: string | null;
}

interface PhaseData {
  id: number;
  phase_name: string;
  journey_name: string;
  current_location: string;
  likely_next_stage: string;
  next_stage_must_have: string;
  docs_needed: string;
  cost_funding: string;
  base_cognitive_drag: number;
}

interface ChecklistItem {
  id: number;
  checklist_phase_name: string;
  checklist: string;
  checklist_type: string;
}

interface ExecutiveInsight {
  level: 'green' | 'yellow' | 'orange' | 'red';
  status: string;
  message: string;
  color: string;
  bgColor: string;
  borderColor: string;
}

export function EldercareGapDashboardModal({ isOpen, onClose, sessionId }: EldercareGapDashboardModalProps) {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [responseData, setResponseData] = useState<OnboardingResponse | null>(null);
  const [phaseData, setPhaseData] = useState<PhaseData | null>(null);
  const [checklistItems, setChecklistItems] = useState<ChecklistItem[]>([]);
  const [executiveInsight, setExecutiveInsight] = useState<ExecutiveInsight | null>(null);


  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isCommunitySuccessModalOpen, setIsCommunitySuccessModalOpen] = useState(false);

  const [isWaitlistModalOpen, setIsWaitlistModalOpen] = useState(false);
  const [isWaitlistSuccessModalOpen, setIsWaitlistSuccessModalOpen] = useState(false);

  useEffect(() => {
    if (isOpen && sessionId) {
      fetchDashboardData();
    }
  }, [isOpen, sessionId]);

     const openWaitlistModal = () => {
    setIsWaitlistModalOpen(true);
  };

  const closeWaitlistModal = () => {
    setIsWaitlistModalOpen(false);
  };

    const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };


    const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  const getExecutiveInsight = (dragScore: number): ExecutiveInsight => {
    const percentage = dragScore;
    
    if (percentage <= 30) {
      return {
        level: 'green',
        status: 'Operational',
        message: 'Standard management load. Maintain vigilance.',
        color: 'text-green-700',
        bgColor: 'bg-green-50',
        bgIconColor: 'bg-green-100',
        borderColor: 'border-green-200',
        borderHoverColor: 'hover:border-green-400'
      };
    } else if (percentage <= 60) {
      return {
        level: 'yellow',
        status: 'Max Capacity',
        message: 'Risk of career interference. Delegate low-level tasks.',
        color: 'text-yellow-700',
        bgColor: 'bg-yellow-50',
        bgIconColor: 'bg-yellow-100',
        borderColor: 'border-yellow-300',
        borderHoverColor: 'hover:border-yellow-400'
      };
    } else if (percentage <= 85) {
      return {
        level: 'orange',
        status: 'High Friction',
        message: 'Burnout Imminent. Systemize family comms immediately.',
        color: 'text-orange-700',
        bgColor: 'bg-orange-50',
        bgIconColor: 'bg-orange-100',
        borderColor: 'border-orange-300',
        borderHoverColor: 'hover:border-orange-400'
      };
    } else {
      return {
        level: 'red',
        status: 'System Failure',
        message: 'Immediate tactical offloading required to protect career.',
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        bgIconColor: 'bg-red-100',
        borderColor: 'border-red-300',
        borderHoverColor: 'hover:border-red-400'
      };
    }
  };

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      
      // Fetch onboarding response
      const { data: responseData, error: responseError } = await supabase
        .from('eldercare_onboard_responses')
        .select('*')
        .eq('session_id', sessionId)
        .single();

      if (responseError) throw responseError;
      
      if (!responseData) {
        setError('No onboarding data found.');
        setLoading(false);
        return;
      }

      setResponseData(responseData);

      // Fetch phase data
      if (responseData.calculated_phase) {
        const { data: phaseData, error: phaseError } = await supabase
          .from('eldercare_phase')
          .select('*')
          .eq('id', responseData.calculated_phase)
          .single();

        if (phaseError) throw phaseError;
        setPhaseData(phaseData);

        // Fetch checklist items for this phase
        const { data: checklistData, error: checklistError } = await supabase
          .from('eldercare_phase_checklist')
          .select('*')
          .eq('checklist_phase_name', phaseData.phase_name);

        if (checklistError) throw checklistError;
        setChecklistItems(checklistData || []);
      }

      // Calculate executive insight
      if (responseData.drag_score !== null) {
        const insight = getExecutiveInsight(responseData.drag_score);
        setExecutiveInsight(insight);
      }

      setLoading(false);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data.');
      setLoading(false);
    }
  };

  // Calculate financial burn rate (example logic - adjust based on your data)
  const calculateFinancialBurnRate = () => {
    if (!responseData || !phaseData) return null;
    
    const answer = responseData.raw_answers[7]?.toLowerCase() || '';
    const isSelfFunded = answer.includes('self');
    const isGovtInsurance = answer.includes('insurance') || answer.includes('government');
    const isNotSure = answer.includes('not sure');
    const country = responseData.country;
    
    // Example calculation - replace with your actual logic
    let monthlyBurnRate = 0;
    let projectedMonths = 0;
    
    if (isSelfFunded) {
      if (country === 'US') {
        // US financial logic
        switch (responseData.calculated_phase) {
          case 1: monthlyBurnRate = 2000; break;
          case 2: monthlyBurnRate = 8000; break;
          case 3: monthlyBurnRate = 5000; break;
          case 4: monthlyBurnRate = 8500; break;
          case 5: monthlyBurnRate = 10000; break;
        }
        projectedMonths = 24; // Example
      } else if (country === 'UK') {
        // UK financial logic
        switch (responseData.calculated_phase) {
          case 1: monthlyBurnRate = 1500; break;
          case 2: monthlyBurnRate = 6000; break;
          case 3: monthlyBurnRate = 4000; break;
          case 4: monthlyBurnRate = 7000; break;
          case 5: monthlyBurnRate = 8000; break;
        }
        projectedMonths = 28; // Example
      }
    }

    return {
      monthlyBurnRate,
      projectedMonths,
      isSelfFunded,
      isGovtInsurance,
      isNotSure,
      currency: country === 'US' ? '$' : '£'
    };
  };


//------------------ getChecklistStatus -----------------//
  const getChecklistStatus = (item: ChecklistItem): 'missing' | 'partial' | 'complete' => {
  // Check if this is the LPA checklist item
  if (item.checklist_type.toLowerCase() === 'sign legal documents' && 
      (item.checklist.toLowerCase().includes('lpa') || 
       item.checklist.toLowerCase().includes('power of attorney'))) {
    
    // Get POA status from raw_answers[5]
    if (responseData?.raw_answers[5]) {
      const poaStatus = getLegalPOAStatus(responseData.raw_answers[5]);
      
      // Map poaStatus.level to checklist status
      if (poaStatus.level === 'green') {
        return 'complete';
      } else if (poaStatus.level === 'amber') {
        return 'partial';
      } else if (poaStatus.level === 'red') {
        return 'missing';
      }
    }
    
    // Default to missing if no answer provided
    return 'missing';

  }
 
  // Default logic for other checklist items
  const relevantAnswers = responseData?.raw_answers || {};
  const legalAnswer = relevantAnswers[5];
  
  if (legalAnswer?.toLowerCase().includes('nothing') || legalAnswer?.toLowerCase().includes('missing')) {
    return 'missing';
  } else if (legalAnswer?.toLowerCase().includes('partial') || legalAnswer?.toLowerCase().includes('some')) {
    return 'partial';
  } else {
    return 'missing';
  }
};

  
  //---------------- getLegalPOAStatus --------------- //

    const getLegalPOAStatus = (answer: string): { 
    level: 'red' | 'amber' | 'green';
    status: string;
    icon: any;
    color: string;
    bgColor: string;
    bgIconColor: string;
    borderColor: string;
    message: string;
  } => {
    //const lowerAnswer = answer?.toLowerCase() || '';

    const lowerAnswer = responseData.raw_answers[5]?.toLowerCase() || '';
    
    // Red Alert: Not yet signed
    if (lowerAnswer.includes('not yet') || 
        lowerAnswer.includes('not signed') || 
        lowerAnswer.includes('missing') ||
        lowerAnswer.includes('none') ||
        lowerAnswer.includes('haven\'t')) {
      return {
        level: 'red',
        status: 'CRITICAL RISK',
        icon: XCircle,
        color: 'text-red-700',
        bgColor: 'bg-red-50',
        bgIconColor: 'bg-red-200',
        borderColor: 'border-red-500',
        borderHoverColor: 'hover:border-red-600',
        message: 'Legal Power of Attorney not in place. Immediate action required.'
      };
    }
    
    // Amber: Exists but have to find it
    if (lowerAnswer.includes('exists') || 
        lowerAnswer.includes('find') || 
        lowerAnswer.includes('look for') ||
        lowerAnswer.includes('somewhere') ||
        lowerAnswer.includes('can\'t locate')) {
      return {
        level: 'amber',
        status: 'AT RISK',
        icon: AlertCircle,
        color: 'text-yellow-600',
        bgColor: 'bg-yellow-50',
        bgIconColor: 'bg-yellow-100',
        borderColor: 'border-yellow-300',
        borderHoverColor: 'hover:border-yellow-500',
        message: 'Document exists but location unknown. Retrieve and secure immediately.'
      };
    }
    
    // Green: Signed and available
    return {
      level: 'green',
      status: 'SECURED',
      icon: CheckCircle2,
      color: 'text-green-700',
      bgColor: 'bg-green-50',
      bgIconColor: 'bg-green-200',
      borderColor: 'border-green-500',
      borderHoverColor: 'hover:border-green-600',
      message: 'Legal Power of Attorney signed and accessible.'
    };
  };



  //---------------- End getLegalPOAStatus ------------//

  if (!isOpen) return null;

  if (loading) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-2xl">
          <div className="flex items-center justify-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-red-500"></div>
          </div>
          <p className="text-center mt-4 text-gray-600">Analyzing your eldercare situation...</p>
        </div>
      </div>
    );
  }

  if (error || !responseData || !phaseData) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
        <div className="bg-white rounded-2xl p-8 w-full max-w-4xl shadow-2xl">
          <div className="text-center">
            <AlertCircle className="w-16 h-16 text-red-500 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Unable to Load Dashboard</h2>
            <p className="text-gray-600 mb-6">{error || 'Please complete the onboarding first.'}</p>
            <button
              onClick={onClose}
              className="px-6 py-3 bg-red-500 text-white rounded-lg font-semibold hover:bg-red-600 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    );
  }

  const financialData = calculateFinancialBurnRate();
  const dragPercentage = responseData.drag_score || 0;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-50 backdrop-blur-sm">
      <div className="bg-gradient-to-br from-gray-50 to-white rounded-2xl w-full max-w-7xl relative shadow-2xl max-h-[95vh] overflow-hidden flex flex-col border border-gray-200">
        
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute right-6 top-6 text-gray-400 hover:text-gray-600 transition-colors z-50 bg-white rounded-full p-2 shadow-md hover:shadow-lg"
        >
          <X className="w-6 h-6" />
        </button>

        {/* Header Section */}
        <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-700 px-8 py-6 text-white relative overflow-hidden">
          <div className="absolute inset-0 bg-black opacity-5"></div>
          <div className="relative z-10">
            <div className="flex items-start justify-between mb-4">
              <div className="mb-2">
                <h1 className="text-3xl font-bold">Eldercare Gap Analysis</h1>
                {/*
                <p className="text-red-100 text-lg">
                  {responseData.firstname}'s {responseData.relation} - {phaseData.phase_name}
                </p>
                */}
              </div>
             
            </div>
            
            <div className={`p-4 rounded-lg border ${executiveInsight?.borderColor} ${executiveInsight?.bgColor} backdrop-blur-sm`}>
              <div className="flex items-center">
                <AlertTriangle className={`w-5 h-5 mr-3 ${executiveInsight?.color}`} />
                <p className={`text-sm font-medium ${executiveInsight?.color}`}>
                  {executiveInsight?.message}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Scrollable Content Area */}
        <div className="flex-1 overflow-y-auto px-8 py-6">
          
          {/* Top Metrics Row */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            
            {/* Hero Metric: Cognitive Drag Gauge */}
            <div 
              onClick={openCommunityModal}
              className="lg:col-span-1 bg-white rounded-xl shadow-lg 
              border border-gray-200 p-6 relative overflow-hidden
              transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl
              ">
              <div className="absolute top-0 right-0 w-32 h-32 bg-red-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Cognitive Load</h3>
                  <Brain className="w-5 h-5 text-red-500" />
                </div>
                
                {/* Dual Ring Gauge */}
                <div className="relative w-40 h-40 mx-auto mb-4">
                  {/* Outer Ring (Total Capacity - 100%) */}
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
                      stroke="#e5e7eb"
                      strokeWidth="12"
                    />
                    {/* Inner Ring (Cognitive Drag) */}
                    <circle
                      cx="80"
                      cy="80"
                      r="70"
                      fill="none"
           
                      stroke={dragPercentage > 85 ? '#ef4444' : dragPercentage > 60 ? '#ff3030' : dragPercentage > 30 ? '#ffd323' : '#58e091'}
                      strokeWidth="12"
                      strokeDasharray={`${(dragPercentage / 100) * 439.6} 439.6`}
                      strokeLinecap="round"
                      className="transition-all duration-1000 ease-out"
                    />
                  </svg>
                  
                  {/* Center Text */}
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <p className="text-4xl font-bold text-gray-900">{dragPercentage}%</p>
                    <p className="text-xs text-gray-500 uppercase tracking-wide">Capacity Lost</p>
                  </div>
                </div>
                
                <div className="text-center">
                  <p className="text-lg font-bold text-gray-600 mb-1">
                    Bandwidth Deficit: -{dragPercentage}%
                  </p>
                  <p className="text-xs text-gray-500">
                    You have {100 - dragPercentage}% capacity remaining
                  </p>
                </div>
              </div>
                 
                      <div className={`flex-col mt-11 p-3 rounded-lg border ${executiveInsight?.borderColor} ${executiveInsight?.bgColor} ${executiveInsight?.borderHoverColor}`}>

                      <div className="flex items-center space-x-2">
                        <div className={`p-2 ${executiveInsight?.bgIconColor} rounded-lg`}>
                          <Lightbulb className={`w-4 h-4  ${executiveInsight?.color}`} />
                        </div>
                     <div>
                       <TooltipExtended text ={`⚡${executiveInsight?.message}`}>
                        <h3 className={`text-xs ${executiveInsight?.color}`}> 
                          Overall status is <b>{executiveInsight?.status}</b>
                        </h3>
                         </TooltipExtended>  
                     </div>
                 </div> 
                         
                
                        
                </div>
                     
            </div>

            {/* Financial Burn Rate */}
            <div 
              onClick={openCommunityModal}
              className="lg:col-span-1 bg-white rounded-xl shadow-lg 
              border border-gray-200 p-6 relative overflow-hidden
              transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl
              ">
              <div className="absolute top-0 right-0 w-32 h-32 bg-orange-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Capital at Risk</h3>
                  <CircleDollarSign className="w-5 h-5 text-orange-500" />
                </div>
                
                {financialData && financialData.isSelfFunded ? (
                  <>
                    <div className="mb-4">
                      <p className="text-4xl font-bold text-gray-900">
                        {financialData.currency}{financialData.monthlyBurnRate.toLocaleString()}
                      </p>
                      <p className="text-sm text-gray-500">Monthly Burn Rate</p>
                    </div>
                    
                    <div className="relative h-16 bg-gradient-to-r from-green-400 via-yellow-400 to-red-500 rounded-lg overflow-hidden mb-3">
                      <div 
                        className="absolute left-0 top-0 bottom-0 bg-gray-200 opacity-40"
                        style={{ 
                          left: `${Math.max(0, Math.min(100, (financialData.projectedMonths / 36) * 100))}%`,
                          width: '2px'
                        }}
                      ></div>
                      <div className="absolute inset-0 flex items-center justify-center">
                        <TrendingDown className="w-8 h-8 text-white opacity-80" />
                      </div>
                    </div>
                    
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">Self-Funded Cliff:</span>
                      <span className="font-bold text-orange-600">{financialData.projectedMonths} months</span>
                    </div>
                    
                    <div className="flex-col mt-24 p-3 bg-yellow-50 rounded-lg border border-yellow-300 hover:border-yellow-500">
                      
                      <div className="flex items-center space-x-2">
                        <div className={`p-2 bg-yellow-100 rounded-lg`}>
                          <CircleDollarSign className="w-4 h-4 font-normal text-yellow-700" />
                        </div>
                     <div>
                       <TooltipExtended text="⚡Purchase Long Term Care Insurance. Activate LPOA!">
                        <h3 className="text-xs text-yellow-700 flex items-center"> 
                          Estate preservation strategies required!
                        </h3>
                       </TooltipExtended> 
                     </div>
                 </div>
              </div>            
            </>
      
          ): financialData && financialData.isGovtInsurance ? (
      <>
        <div className="text-center py-1">               
          <ShieldCheck className="relative w-40 h-40 text-green-400 mx-auto mb-4" />
          <p className="text-lg font-bold text-gray-600">Government/Insurance Funded</p>
          <p className="text-xs text-gray-500 mt-1">Lower financial exposure</p>
        </div> 

        <div className="flex-col mt-10 p-3 bg-green-50 rounded-lg border border-green-200 hover:border-green-400">
          <div className="flex items-center space-x-2">
            <div className={`p-2 bg-green-100 rounded-lg`}>
              <CircleDollarSign className="w-4 h-4 font-normal text-green-700" />
            </div>
            <div>
              <TooltipExtended text="⚡Avoid penalties. Notify insurance companies of changes">
              <h3 className="text-xs text-green-700 flex items-center"> 
                Keep health insurance status regularly updated!
              </h3>
                </TooltipExtended>
            </div>
          </div>
        </div>
      </>
    ) : financialData && financialData.isNotSure ? (
      <>
        <div className="text-center py-1">               
          <AlertCircle className="relative w-40 h-40 text-red-400 mx-auto mb-4" />
          <p className="text-lg font-bold text-red-600">Funding Status Unknown</p>
          <p className="text-xs text-gray-500 mt-1">Clarification needed</p>
        </div> 

        <div className="flex-col mt-10 p-3 bg-red-50 rounded-lg border border-red-200 hover:border-red-400">
          <div className="flex items-center space-x-2">
            <div className={`p-2 bg-red-100 rounded-lg`}>
              <CircleDollarSign className="w-4 h-4 font-normal text-red-700" />
            </div>
            <div>
            <TooltipExtended text="⚡Financial Assistance | UK is Under £23,250 | US is Under $2,000">
              <h3 className="text-xs text-red-700 flex items-center"> 
                Determine funding source to assess financial risk!
              </h3>
            </TooltipExtended>
            </div>
          </div>
        </div>
      </>
    ) : (
      <div className="text-center py-8">
        <p className="text-sm text-gray-500">Financial data unavailable</p>
      </div>
    )}
  </div>
</div>

            {/* Phase Journey Timeline */}
            <div 
              onClick={openCommunityModal}
              className="lg:col-span-1 bg-white rounded-xl shadow-lg 
              border border-gray-200 p-6 relative overflow-hidden
              transition-all duration-700 cursor-pointer transform hover:-translate-y-2 hover:shadow-2xl
              ">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-50 rounded-full -mr-16 -mt-16 opacity-50"></div>
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Care Journey</h3>
                  {/*<Target className="w-5 h-5 text-blue-500" />*/}

                  <Ambulance className="w-5 h-5 text-blue-500" />
                </div>
                
                <div className="mb-4">
                  <p className="text-4xl font-bold text-gray-900">{phaseData.phase_name}</p>
                  <p className="text-sm text-gray-600">{phaseData.journey_name}</p>
                </div>
                
                {/* Timeline Progress */}
                {/* Timeline Progress - Compact Horizontal Design */}
                <div className="mb-6">
  {/* Phase Indicators */}
  <div className="flex items-center justify-between mb-3 relative">
    {/* Connecting Line */}
    <div className="absolute left-0 right-0 h-0.5 bg-gray-200 top-1/2 -translate-y-1/2 z-0"></div>
    <div 
      className="absolute left-0 h-0.5 bg-red-500 top-1/2 -translate-y-1/2 z-0 transition-all duration-500"
      style={{ width: `${((responseData.calculated_phase - 1) / 4) * 100}%` }}
    ></div>
    
    {[1, 2, 3, 4, 5].map((phase) => (
      <div key={phase} className="flex flex-col items-center relative z-10">
        <div className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
          phase < responseData.calculated_phase 
            ? 'bg-red-500 text-white shadow-md'
            : phase === responseData.calculated_phase
            ? 'bg-red-500 text-white ring-2 ring-red-300 ring-offset-2 shadow-lg scale-110'
            : 'bg-white text-gray-400 border-2 border-gray-300'
        }`}>
          {phase < responseData.calculated_phase ? (
            <CheckCircle2 className="w-4 h-4" />
          ) : (
            phase
          )}
        </div>
        <span className={`mt-2 text-xs transition-all ${
          phase === responseData.calculated_phase 
            ? 'font-bold text-gray-900' 
            : phase < responseData.calculated_phase
            ? 'font-medium text-gray-600'
            : 'text-gray-400'
        }`}>
          P{phase}
        </span>
      </div>
    ))}
  </div>
  
  {/* Current Phase Info */}
  <div className="py-4 bg-gradient-to-r from-red-50 to-red-100 rounded-lg p-3 border border-red-200">
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
      <div className="w-3.5 h-3.5 border-2 border-red-300 bg-red-500 rounded-full animate-pulse"></div>
        <span className="text-xs font-semibold text-gray-900">
          Phase {responseData.calculated_phase}
        </span>
      </div>
      <span className="px-2 py-0.5 bg-red-500 text-white rounded-full text-xs font-bold uppercase tracking-wide">
        Active
      </span>
    </div>
  </div>
</div>

                {/*                
                <div className="space-y-2 mb-4">
                  {[1, 2, 3, 4, 5].map((phase) => (
                    <div key={phase} className="flex items-center">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold ${
                        phase < responseData.calculated_phase 
                          ? 'bg-gray-200 text-gray-400'
                          : phase === responseData.calculated_phase
                          ? 'bg-red-500 text-white ring-4 ring-red-100 shadow-lg'
                          : 'bg-gray-100 text-gray-400 border-2 border-gray-200'
                      }`}>
                        {phase}
                      </div>
                      <div className={`ml-3 flex-1 text-xs ${
                        phase === responseData.calculated_phase ? 'font-semibold text-gray-900' : 'text-gray-500'
                      }`}>
                        Phase {phase}
                        {phase === responseData.calculated_phase && (
                          <span className="ml-2 px-2 py-0.5 bg-red-100 text-red-700 rounded-full text-xs font-bold">
                            ACTIVE
                          </span>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              */}  
                <div className="mt-20 p-3 bg-blue-50 rounded-lg border border-blue-200 hover:border-blue-300">

                  {/*
                  <p className="text-xs text-blue-700">
                    <ChevronRight className="w-4 h-4 inline mr-1" />
                    Next: {phaseData.likely_next_stage}
                  </p>
                  */}
                  
                    <div className="flex items-center space-x-2">
                        <div className={`p-2 bg-blue-100 rounded-lg`}>
                          <Ambulance className="w-4 h-4 font-normal text-blue-700" />
                        </div>
                     <div>
                       <TooltipExtended text={`⚡${phaseData?.docs_needed}`}>
                        <h3 className="text-xs text-blue-700 flex items-center"> 
                          Next Stage : {phaseData?.likely_next_stage}
                        </h3>
                       </TooltipExtended>  
                     </div>
                 </div>
                  
                </div>
              </div>
            </div>
          </div>

                    {/* Critical Legal Document Alert */}
          {responseData.raw_answers[5] && (() => {
            const poaStatus = getLegalPOAStatus(responseData.raw_answers[5]);
            const StatusIcon = poaStatus.icon;
            
            return (
              //<div className={`rounded-xl shadow-lg border-2 ${poaStatus.borderColor} ${poaStatus.bgColor} p-6 mb-8 relative overflow-hidden`}>

            <div className={`rounded-xl shadow-lg border-2 ${poaStatus.borderColor} p-6 mb-8 relative overflow-hidden`}>
                
                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center">
                      {/*<div className={`p-3 rounded-xl ${poaStatus.bgColor} border-2 ${poaStatus.borderColor} mr-4`}>*/}
                      <div className={`p-3 rounded-xl ${poaStatus.bgIconColor} mr-4`}>
                        
                        <Scale className={`w-8 h-8 ${poaStatus.color}`} />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-gray-900 mb-1">
                          Legal Power of Attorney
                        </h3>
                        <p className="text-sm text-gray-600">
                          Critical Legal Document Status
                        </p>
                      </div>
                    </div>
                    
                    <div className={`flex items-center px-4 py-2 rounded-lg border-2 ${poaStatus.borderColor} ${poaStatus.bgColor}`}>
                      <StatusIcon className={`w-6 h-6 ${poaStatus.color} mr-2`} />
                      <span className={`font-bold text-lg ${poaStatus.color} uppercase tracking-wide`}>
                        {poaStatus.status}
                      </span>
                    </div>
                  </div>
                  
                  <div className={`p-4 rounded-lg border ${poaStatus.borderColor} ${poaStatus.bgColor} bg-opacity-50 backdrop-blur-sm`}>
                    <div className="flex items-start ">
                      <AlertTriangle className={`w-5 h-5 ${poaStatus.color} mr-3 mt-0.5 flex-shrink-0`} />
                      <div className="flex-1">
                        <p className={`text-base font-semibold ${poaStatus.color} mb-2`}>
                          {poaStatus.message}
                        </p>
                        <p className="text-sm text-gray-700">
                          <strong>Your Answer:</strong> {responseData.raw_answers[5]}
                        </p>
                      </div>
                    </div>
                  </div>
                  
                  {poaStatus.level !== 'green' && (
                    <button 
                      onClick={openCommunityModal}
                      className="mt-4 w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md">
                      <div className="flex items-center">
                        <Zap className="w-5 h-5 text-red-500 mr-3" />
                        <p className="text-sm font-semibold text-gray-900">
                          Poetiq can help you {poaStatus.level === 'red' ? 'fix' : 'organize'} this immediately
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-gray-400" />
                    </button>
                  )}

                  {poaStatus.level == 'green' && (
                    <button 
                      onClick={openCommunityModal}
                      className="mt-4 w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md">
                      <div className="flex items-center">
                        <ShieldCheck className="w-5 h-5 text-green-700 mr-3" />
                        <p className="text-sm font-semibold text-gray-700">
                          Store legal document safely with Poetiq!
                        </p>
                      </div>
                      <ChevronRight className="w-5 h-5 text-green-700" />
                    </button>
                  )}
                </div>
              </div>
            );
          })()}



          {/* --------------------------- End Critical Legal Document ALert --------------------------- */}

          {/* Logistics Readiness Matrix */}
          {/*
          <div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
            <div className="flex items-center mb-6">
              <div className={`p-3 bg-gray-50 rounded-xl mr-4`}>
                <CheckCircle2 className={`w-8 h-8 text-gray-500`} />        
              </div>  
     
                <div>
                  <h3 className="text-xl font-bold text-gray-900">
                    Phase Readiness Checklist
                  </h3>
                    <p className="text-sm text-gray-600 mt-1">Critical action items for Phase {responseData.calculated_phase}</p>
                </div>  
            </div>     
          */}

          {/* Logistics Readiness Matrix */}
<div className="bg-white rounded-xl shadow-lg border border-gray-200 p-6 mb-8">
  <div className="flex items-center mb-6">
    {(() => {
      // Calculate overall checklist status
      const statuses = checklistItems.map(item => getChecklistStatus(item));
      const missingCount = statuses.filter(s => s === 'missing').length;
      const partialCount = statuses.filter(s => s === 'partial').length;
      const completeCount = statuses.filter(s => s === 'complete').length;
      const totalCount = checklistItems.length;
      
      // Determine overall status and styling
      let statusConfig;
      if (totalCount === 0) {
        statusConfig = {
          icon: CheckCircle2,
          bgColor: 'bg-gray-50',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-900',
          statusText: 'Phase Readiness Checklist',
          subtitle: `Critical action items for Phase ${responseData.calculated_phase}`
        };
      } else if (completeCount === totalCount) {
        statusConfig = {
          icon: CheckCircle2,
          bgColor: 'bg-green-100',
          iconColor: 'text-green-600',
          titleColor: 'text-green-900',
          statusText: 'Phase Readiness Complete',
          subtitle: `All ${totalCount} items completed for Phase ${responseData.calculated_phase}`
        };
      } else if (missingCount > 0) {
        statusConfig = {
          icon: XCircle,
          bgColor: 'bg-red-100',
          iconColor: 'text-red-600',
          titleColor: 'text-red-900',
          statusText: 'Critical Gaps Detected',
          subtitle: `${missingCount} missing, ${partialCount} partial, ${completeCount} complete`
        };
      } else if (partialCount > 0) {
        statusConfig = {
          icon: AlertCircle,
          bgColor: 'bg-yellow-100',
          iconColor: 'text-yellow-600',
          titleColor: 'text-yellow-900',
          statusText: 'In Progress',
          subtitle: `${partialCount} partial, ${completeCount} complete of ${totalCount} items`
        };
      } else {
        statusConfig = {
          icon: CheckCircle2,
          bgColor: 'bg-gray-50',
          iconColor: 'text-gray-500',
          titleColor: 'text-gray-900',
          statusText: 'Phase Readiness Checklist',
          subtitle: `Critical action items for Phase ${responseData.calculated_phase}`
        };
      }
      
      const StatusIcon = statusConfig.icon;
      
      return (
        <>
          <div className={`p-3 ${statusConfig.bgColor} rounded-xl mr-4 transition-all duration-300`}>
            <StatusIcon className={`w-8 h-8 ${statusConfig.iconColor}`} />        
          </div>  
          <div>
            <h3 className={`text-xl font-bold text-gray-900 transition-colors duration-300`}>
              {/*{statusConfig.statusText}*/}
              Readiness Checklist
            </h3>
            <p className="text-sm text-gray-600 mt-1">
              
              {statusConfig.subtitle}
            </p>
          </div>
        </>
      );
    })()}
  </div>

            
            
            {checklistItems.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {checklistItems.map((item) => {
                  const status = getChecklistStatus(item);
                  const statusConfig = {
                    missing: {
                      icon: XCircle,
                      color: 'text-red-600',
                      bgColor: 'bg-red-50',
                      borderColor: 'border-red-300',
                      label: 'MISSING',
                      iconBg: 'bg-red-100',
                      labelText: '⚡Fix Now'
                    },
                    partial: {
                      icon: AlertCircle,
                      color: 'text-yellow-600',
                      bgColor: 'bg-yellow-50',
                      borderColor: 'border-yellow-300',
                      label: 'PARTIAL',
                      iconBg: 'bg-yellow-100',
                      labelText: '⚡Fix Now'
                    },
                    complete: {
                      icon: CheckCircle2,
                      color: 'text-green-600',
                      bgColor: 'bg-green-50',
                      borderColor: 'border-green-300',
                      label: 'COMPLETE',
                      iconBg: 'bg-green-100',
                      labelText: '⚡All Done'
                    }
                  };
                  
                  const config = statusConfig[status];
                  const StatusIcon = config.icon;
                  
                  // Icon mapping for checklist types
                  const typeIconMap: { [key: string]: any } = {
                    'legal': Scale,
                    'financial': DollarSign,
                    'medical': Heart,
                    'care': Users,
                    'documents': FileText,
                    'facility': Building2,
                    'home': Home,
                    'default': Shield
                  };
                  
                  const TypeIcon = typeIconMap[item.checklist_type.toLowerCase()] || typeIconMap['default'];
                  
                  return (
                    <div 
                      onClick={openCommunityModal}
                      key={item.id}
                      className={`group relative rounded-xl p-5 border-2 ${config.borderColor} ${config.bgColor} hover:shadow-xl transition-all duration-300 cursor-pointer transform hover:-translate-y-1 flex flex-col h-full min-h-[240px]`}
                    >
                      <div className="flex items-start justify-between mb-3">
                       
                        <div className={`p-2 rounded-lg ${config.iconBg}`}>
                          <TypeIcon className={`w-5 h-5 ${config.color}`} />
                        </div>
                        <StatusIcon className={`w-5 h-5 ${config.color}`} />
                      </div>
                      
                      <h4 className="text-sm font-bold text-gray-900 mb-1 uppercase tracking-wide">
                        {item.checklist_type}
                      </h4>
                      <p className="text-sm text-gray-700 mb-3 line-clamp-2 min-h-[2.5rem]">
                        {item.checklist}
                      </p>

               
                  <div className="inline-block">
                      <TooltipHelp text={`${config.labelText}`} >
                      <div className={`inline-flex items-center px-2 py-1 rounded 
                      text-xs font-bold ${config.color} ${config.bgColor} border ${config.borderColor}`}>
                          {config.label}                
                      </div>
                      </TooltipHelp>
                  </div>

                      {/*</TooltipHelp>*/}
                      
                      {status === 'missing' && (
                        <div className="mt-3 pt-3 border-t border-red-200">
                          <p className="text-xs text-red-600 font-medium">
                            <Zap className="w-3 h-3 inline mr-1" />
                            Unlock Poetiq to resolve now
                          </p>
                        </div>
                      )}

                       {status === 'complete' && (
                        <div className="mt-3 pt-3 border-t border-green-200">
                          <p className="text-xs text-green-700 font-medium">
                            <ShieldCheck className="w-5 h-5 text-white fill-green-600 inline mr-1" />
                             Store document safely with Poetiq
                          </p>
                        </div>
                      )}

                       {status === 'partial' && (
                        <div className="mt-3 pt-3 border-t border-yellow-200">
                          <p className="text-xs text-yellow-600 font-medium">
                            <Zap className="w-3 h-3 inline mr-1" />
                            Unlock Poetiq to complete this task
                          </p>
                        </div>
                      )}
                      
                    </div>
                  );
                })}
              </div>
                 
            ) : (
              <div className="text-center py-12 text-gray-500">
                <FileText className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                <p>No checklist items found for this phase.</p>
              </div>
            )}
          </div>
                                    
          {/* Additional Context Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            
            {/* Current Situation */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-200 p-6">

             <div className="flex items-center space-x-2 mb-4">
                <div className={`p-2 bg-gray-100 rounded-xl`}>
                  <HeartPulse className="w-5 h-5 text-gray-600" />
                </div>
               <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center"> 
                    Current Situation
                  </h3>
               </div>
             </div>
               
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-gray-600">Location:</span>
                  <span className="font-semibold text-gray-900">{phaseData.current_location}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Country:</span>
                  <span className="font-semibold text-gray-900">{responseData.country}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-600">Relationship:</span>
                  <span className="font-semibold text-gray-900 capitalize">{responseData.relation}</span>
                </div>
              </div>
            </div>

            {/* Required Documentation */}
            <div className="bg-gradient-to-br from-gray-50 to-white rounded-xl shadow-md border border-gray-200 p-6">

              <div className="flex items-center space-x-2 mb-4">
                <div className={`p-2 bg-gray-100 rounded-xl`}>
                  <Ambulance className="w-5 h-5 font-normal text-gray-600" />
                </div>
               <div>
                  <h3 className="text-lg font-bold text-gray-900 flex items-center"> 
                    Next Care Stage
                  </h3>
               </div>
             </div>

               <p className="flex items-center text-sm text-gray-700 leading-relaxed mb-4">
                  {phaseData.likely_next_stage} 
                 {/*<ArrowBigRightDash className="fill-green-500 text-green-500 ml-2 w-4 h-4"/>*/}
                 <div className="ml-2 w-3.5 h-3.5 border-2 border-red-300 bg-red-500 rounded-full animate-pulse"></div>
                </p>
                 <p className="text-xs text-gray-700 leading-relaxed">
                <b>Important Note: </b>{phaseData.next_stage_must_have}
              </p>


              {/*
              
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center">
                <Ambulance className="w-5 h-5 mr-2 font-normal text-gray-600" />
                Next Eldercare Stage
              </h3>
              <p className="text-sm text-gray-700 leading-relaxed mb-4">
                {phaseData.likely_next_stage}
              </p>

              <p className="text-xs text-gray-700 leading-relaxed">
                <b>Important: </b>{phaseData.next_stage_must_have}
              </p>
              */}
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-xl shadow-lg p-8 text-white text-center">
            <Zap className="w-12 h-12 mx-auto mb-4" />
            <h3 className="text-2xl font-bold mb-3">Ready to Close the Gaps?</h3>
            <p className="text-red-100 mb-6 max-w-2xl mx-auto">
              Poetiq can help you generate the missing documentation, organize your legal affairs, 
              and reduce your cognitive load by up to {dragPercentage}%.
            </p>
            <button 
              onClick={openCommunityModal}
              className="bg-white text-red-600 px-8 py-4 rounded-lg font-bold text-lg hover:bg-red-50 transition-colors shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all">
              Get Started with Poetiq
              <ChevronRight className="w-5 h-5 inline ml-2" />
            </button>
          </div>
        </div>
      </div>

      <WaitlistModal
        isOpen={isWaitlistModalOpen}
        onClose={closeWaitlistModal}
      />

    <CommunityModal
        isOpen={isCommunityModalOpen}
        onClose={closeCommunityModal}
      />
    </div>
  );
}
