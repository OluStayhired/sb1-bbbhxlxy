import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { 
  Target,
  TrendingUp,
  Shield,
  Clock,
  Users,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Award,
  HeartHandshake,
  Briefcase,
  FileCheck,
  UserCheck,
  Zap,
  Search,
  Building2,
  ClipboardCheck,
  BadgeCheck,
  Link as LinkIcon,
  Brain,
  PhoneCall,
  FileText,
  DollarSign,
  Activity,
  BarChart3,
  Handshake,
  Lightbulb,
  ShieldCheck,
  Timer,
  TrendingDown,
  AlertCircle,
  FileSearch,
  Layers,
  Rocket,
  DatabaseZap,
  Ambulance,
  Headset,
  CircleDollarSign,
  Scale,
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';
import { PartnerRegisterModal } from '../components/PartnerRegisterModal';
import { SPACoPilotPillModal } from '../components/SPACoPilotPillModal.tsx';

export function SeniorPlacementAgentPartners() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isPartnerResisterModalOpen, setIsPartnerRegisterModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const openCommunityModal = () => {
    setIsCommunityModalOpen(true);
  };

  const closeCommunityModal = () => {
    setIsCommunityModalOpen(false);
  };

  const openOnboardingModal = () => {
    setIsOnboardingModalOpen(true);
  };

  const closeOnboardingModal = () => {
    setIsOnboardingModalOpen(false);
  };

  const openPartnerRegisterModal = () => {
    setIsPartnerRegisterModalOpen(true);
  };
  const closePartnerRegisterModal = () => {
    setIsPartnerRegisterModalOpen(false);
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="hidden sm:block sticky top-0 z-50 bg-white/50 backdrop-blur-sm shadow-sm">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        <div className="sm:hidden">
          <PageMenuNav 
            onOpenCommunityModal={openCommunityModal} 
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        <main className="max-w-7xl mx-auto px-6 pb-32">
          {/* Hero Section */}
          <section className="py-16 bg-gradient-to-b from-red-50 via-red-50 to-white rounded-3xl mt-8">
            <div className="max-w-5xl mx-auto text-center px-4">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border-2 border-red-200 mb-6 shadow-sm">
                <Handshake className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Strategic Partnership Program</span>
              </div>

              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Place More Seniors{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden text-5xl sm:inline-block sm:mt-2">Without Admin Fatigue</span>
                  <br className="sm:hidden"/>
                    <span className="sm:hidden inline text-2xl">Without Admin Fatigue</span>
                </span>
                {/*
                <br />
                <span className="text-3xl sm:text-4xl md:text-5xl text-gray-600">Zero Conflict of Interest.</span>
                */}
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                The only logistics and clinical intelligence platform built to help Senior Placement Agents navigate complex care needs and close high-acuity placements <span className="font-bold text-red-600">30% faster</span>.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openPartnerRegisterModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  <span className="font-semibold">Become a Partner</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#solutions'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
                >
                  Explore Solutions
                </button>
              </div>
            </div>
          </section>

        {/* Challenge vs Solution Matrix - IMPROVED */}
<section className="py-20">
  <div className="text-center mb-16">
    <h2 className="hidden sm:inline text-3xl sm:text-4xl font-bold text-gray-700 mb-6">
      {/*How We Move Your Metrics*/}
      How Poetiq Scales Your Business
    </h2>
    <h2 className="sm:hidden text-3xl sm:text-4xl font-bold text-gray-700 mb-6">
      {/*How We Move Your Metrics*/}
      How Poetiq Scales Businesses
    </h2>
    <p className="hidden sm:block mt-4 text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      {/*Focusing on the Senior Placement Agent's bottom line*/}
      We automate clinical vetting and stakeholder alignment to help you <br/>handle more leads faster, safer and at scale.
    </p>

    <p className="sm:hidden text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
      {/*Focusing on the Senior Placement Agent's bottom line*/}
      We automate clinical vetting and stakeholder alignment to help you<br/> handle more leads faster
    </p>
  </div>

  <div className="max-w-6xl mx-auto px-4">
    {/* Desktop: Comparison Table */}
    {/*<div className="hidden lg:block bg-white rounded-3xl shadow-2xl border-2 border-red-100 overflow-hidden">*/}
    <div className="hidden lg:block bg-white rounded-3xl shadow-2xl shadow-red-200 overflow-hidden">
      {/* Table Header */}
      {/*<div className="grid grid-cols-4 bg-gradient-to-r from-red-500 to-red-600 text-white">*/}
      <div className="grid grid-cols-4 bg-gradient-to-r from-red-100 to-red-200 text-red-500">
        <div className="p-6 border-r border-gray-200">
          <div className="flex items-center space-x-3">
            <AlertCircle className="w-6 h-6" />
            <h3 className="text-lg font-bold">Challenges</h3>
          </div>
        </div>
        <div className="p-6 border-r border-gray-200 bg-green-100">
          <div className="flex items-center space-x-3 ">
            <Sparkles className="w-6 h-6 text-green-600" />
            
            
              <h3 className="text-lg font-bold text-green-600">Solution</h3>
            
          </div>
        </div>
        <div className="p-6 border-r border-gray-200 bg-gray-100">
          <div className="flex items-center space-x-3">
            <Target className="w-6 h-6 text-gray-700" />
            <h3 className="text-lg font-bold text-gray-700">Business Impact</h3>
          </div>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">
          <div className="flex items-center space-x-3">
            <TrendingUp className="w-6 h-6 text-white" />
            <h3 className="text-lg font-bold text-white">Key Metric</h3>
          </div>
        </div>
      </div>

      {/* Row 1: Complex Care Needs */}
      <div className="grid grid-cols-4 border-b border-gray-200 hover:bg-red-50/30 transition-colors">
        <div className="p-6 border-r border-gray-200 bg-red-50/40">
          <div className="flex items-start space-x-3">
            <span className="w-8 h-8 items-center justify-center bg-red-100 rounded-full p-2 flex-shrink-0">
                <Brain className="w-4 h-4 text-red-600" />
            </span>
            
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Complex Care Needs</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Navigating increasingly complex medical, behavioral, and cognitive health needs
              </p>
            </div>
          </div>
        </div>

        <div className="p-6 border-r border-gray-200 bg-green-50/40">
          <h4 className="font-bold text-gray-900 mb-2">Cognitive Baseline Integration</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Use validated AD8/GPCOG tools to identify memory care needs before the tour
          </p>
        </div>
        <div className="p-6 border-r border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            Avoid premature relocations due to poor initial assessment
          </p>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{/*+40%*/} Higher</div>
            <div className="text-xs text-red-50 font-semibold uppercase tracking-wide">Resident Retention</div>
          </div>
        </div>
      </div>

      {/* Row 2: Ethical Pressure */}
      <div className="grid grid-cols-4 border-b border-gray-200 hover:bg-red-50/30 transition-colors">
        <div className="p-6 border-r border-gray-200 bg-red-50/40">
          <div className="flex items-start space-x-3">
            
            <span className="w-8 h-8 items-center justify-center bg-red-100 rounded-full p-2 flex-shrink-0">
                <ShieldCheck className="w-4 h-4 text-red-600" />
            </span>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Ethical Pressure</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Potential conflict of interest between commission incentives and best-fit recommendations
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border-r border-gray-200 bg-green-50/40">
          <h4 className="font-bold text-gray-900 mb-2">Independent Auditor Data</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            Access federal-grade safety and staffing data with 100% transparency
          </p>
        </div>
        <div className="p-6 border-r border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            Build trust by proving recommendations are data-backed, not commission-driven
          </p>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">        
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{/*+55%*/} Higher</div>
            <div className="text-xs text-white font-semibold uppercase tracking-wide">Client Satisfaction</div>
          </div>
        </div>
      </div>

      {/* Row 3: Inefficient Sales */}
      <div className="grid grid-cols-4 hover:bg-red-50/30 transition-colors">
        <div className="p-6 border-r border-gray-200 bg-red-50/40">
          <div className="flex items-start space-x-3">
             <span className="w-8 h-8 items-center justify-center bg-red-100 rounded-full p-2 flex-shrink-0">
                <Zap className="w-4 h-4 text-red-600" />
            </span>
            <div>
              <h4 className="font-bold text-gray-900 mb-2">Inefficient Sales Process</h4>
              <p className="text-sm text-gray-700 leading-relaxed">
                Fragmented systems and emotionally charged family conflicts stall placements
              </p>
            </div>
          </div>
        </div>
        <div className="p-6 border-r border-gray-200 bg-green-50/40">
          <h4 className="font-bold text-gray-900 mb-2">Family Conflict Advisor</h4>
          <p className="text-sm text-gray-700 leading-relaxed">
            AI-powered mediation resolves sibling disputes that stall placements for weeks
          </p>
        </div>
        <div className="p-6 border-r border-gray-200">
          <p className="text-sm text-gray-700 leading-relaxed">
            Reduce emotional friction that kills deal momentum and extends sales cycles
          </p>
        </div>
        <div className="p-6 bg-gradient-to-br from-red-500 to-red-600">
          <div className="text-center">
            <div className="text-3xl font-bold text-white mb-1">{/*-30%*/} Faster</div>
            <div className="text-xs text-red-50 font-semibold uppercase tracking-wide">Placement Time</div>
          </div>
        </div>
      </div>
    </div>

    {/* Mobile/Tablet: Stacked Flow Cards */}
    <div className="lg:hidden space-y-8">
      {/* Challenge 1 */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center space-x-3">
            
              <span className="w-12 h-12 bg-red-400 rounded-full p-2">
                <Brain className="w-8 h-8" />
              </span>
            
            <h3 className="text-lg font-bold">Complex Care Needs</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Challenge</span>
            </div>
            <p className="text-sm text-gray-700">
              Navigating increasingly complex medical, behavioral, and cognitive health needs
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Solution</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Cognitive Baseline Integration</h4>
            <p className="text-sm text-gray-700">
              Use validated AD8/GPCOG tools to identify memory care needs before the tour
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">+40%</div>
            <div className="text-sm font-semibold uppercase tracking-wide flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Resident Retention</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge 2 */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center space-x-3">
            <span className="w-12 h-12 bg-red-400 rounded-full p-2">
            <ShieldCheck className="w-8 h-8"/>
            </span>
            <h3 className="text-lg font-bold">Ethical Pressure</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Challenge</span>
            </div>
            <p className="text-sm text-gray-700">
              Potential conflict of interest between commission incentives and best-fit recommendations
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Solution</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Independent Auditor Data</h4>
            <p className="text-sm text-gray-700">
              Access federal-grade safety and staffing data with 100% transparency
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">+55%</div>
            <div className="text-sm font-semibold uppercase tracking-wide flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Client Satisfaction</span>
            </div>
          </div>
        </div>
      </div>

      {/* Challenge 3 */}
      <div className="bg-white rounded-3xl shadow-xl border-2 border-red-100 overflow-hidden">
        <div className="bg-gradient-to-r from-red-500 to-red-600 p-4 text-white">
          <div className="flex items-center space-x-3">
            <span className="w-12 h-12 bg-red-400 rounded-full p-2">
            <Zap className="w-8 h-8" />
            </span>  
            <h3 className="text-lg font-bold">Inefficient Sales Process</h3>
          </div>
        </div>
        
        <div className="p-6 space-y-4">
          <div className="bg-red-50 rounded-xl p-4 border-l-4 border-red-500">
            <div className="text-xs font-bold text-red-600 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <AlertCircle className="w-4 h-4" />
              <span>Challenge</span>
            </div>
            <p className="text-sm text-gray-700">
              Fragmented systems and emotionally charged family conflicts stall placements
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-green-50 rounded-xl p-4 border-l-4 border-green-500">
            <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2 flex items-center space-x-2">
              <Sparkles className="w-4 h-4" />
              <span>Solution</span>
            </div>
            <h4 className="font-bold text-gray-900 mb-2">Family Conflict Advisor</h4>
            <p className="text-sm text-gray-700">
              AI-powered mediation resolves sibling disputes that stall placements for weeks
            </p>
          </div>

          <div className="flex justify-center">
            <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
          </div>

          <div className="bg-gradient-to-br from-red-500 to-red-600 rounded-xl p-6 text-white text-center">
            <div className="text-4xl font-bold mb-2">-30%</div>
            <div className="text-sm font-semibold uppercase tracking-wide flex items-center justify-center space-x-2">
              <TrendingUp className="w-5 h-5" />
              <span>Placement Time</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


          {/* Metrics Impact Section */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-white border-2 border-red-200 rounded-full px-6 py-3 mb-6 shadow-sm">
                <BarChart3 className="w-5 h-5 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Proven Business Impact</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                Boost Your Agency Performance
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real metrics improvements from placement agents partnering with Poetiq
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4 max-w-6xl mx-auto">
              <MetricCard
                icon={<TrendingUp className="w-12 h-12 text-red-500" />}
                metric="35%"
                label="Higher Move-In Conversion"
                description="Families arrive with all medical and legal records in hand. No more 'waiting on paperwork' while the lead goes cold."
                tool="Care Gap Finder"
              />

              <MetricCard
                icon={<UserCheck className="w-12 h-12 text-red-500" />}
                metric="40%"
                label="Improved Resident Retention"
                description="Professional-grade due diligence on staffing ratios and clinical safety scores ensures expectations meet capabilities."
                tool="Nursing Home Auditor"
              />

              <MetricCard
                icon={<Timer className="w-12 h-12 text-red-500" />}
                metric="30%"
                label="Faster Lead-to-Placement"
                description="Stop playing social worker. Let our Family Conflict Advisor handle the sibling drama while you focus on logistics."
                tool="Conflict Advisor"
              />
            </div>

            {/* CTA After Metrics */}
            <div className="text-center mt-12">
              <button
                onClick={openPartnerRegisterModal}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5 inline-flex items-center space-x-3 font-semibold"
              >
                <span>Join Our Partner Network</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

                    {/* Strategic Partnership Tools - REDESIGNED */}
          <section id="solutions" className="py-24 bg-gradient-to-b from-white via-red-50/30 to-white">
            <div className="max-w-7xl mx-auto px-4">
              {/* Section Header */}
              <div className="text-center mb-12">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                <Zap className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Accelerate Your Pipeline</span>
              </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                  Optimize Your{' '}
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    Placement Velocity
                  </span>
                </h2>
                
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Three tools to automate your intake, verify your integrity, and close families faster.
                </p>
              </div>

              {/* Tool 1: Accelerate the Move-In */}
              <div className="mb-16 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        1
                      </div>
                      <div className="h-8 w-1 bg-red-200"></div>
                      <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                        <Rocket className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Speed</span>
                      </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                      Accelerate the Move-In
                    </h3>
                    
                    <p className="text-xl font-semibold text-gray-500 mb-6">
                      Organize Critical Care Documents Faster
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Stop chasing fragmented medical records and legal gaps. Provide every inquiry with a personalized Care Gap Finder link that builds a forensic "Ready-to-Move" dossier in minutes, not weeks.
                    </p>

                    <div className="bg-green-50 border-l-4 border-green-200/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-green-700 font-normal leading-relaxed">
                            Walk into the first tour with a complete clinical and financial profile, eliminating discovery drag and shortening your sales cycle.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      onClick={openPartnerRegisterModal}
                      >
                      <LinkIcon className="w-5 h-5" />
                      <span className="hidden sm:inline">Get Your Intake Link</span>
                      <span className="sm:hidden">Get Link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  {/* Right: Visual Stats */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          
                
                        <div className="text-xs border border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">BEFORE</div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-1 sm:p-3 rounded-full">
                          <FileSearch className="sm:w-7 sm:h-7 w-5 h-5 text-red-500" />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-2">Average Document Collection</div>
                        <div className="text-4xl font-bold text-red-600">2-4 weeks</div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
                      </div>
                      
                      {/*------------  The After Section of the first Half ----------------- */}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
                          
                              <div className="text-xs font-bold text-green-600 bg-green-50 p-1 sm:p-3 rounded-full">
                                  <ShieldCheck className="sm:w-7 sm:h-7 w-5 h-5 text-green-600" />
                              </div>
                          </div>
                          <div className="text-gray-600 text-sm mb-3">With Care Gap Finder</div>
                          <div className="hidden sm:block text-4xl font-bold text-green-600 mb-4">3 minutes</div>
                          <div className="sm:hidden text-4xl font-bold text-green-600 mb-4">3 mins</div>
                      
  
                          {/* What Gets Delivered */}
                          <div className="space-y-2 pt-3 border-t border-green-200">
                            <div className="flex items-center space-x-2">
                              <Brain className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Cognitive load assessment</span>
                            </div>
                            <div className="flex items-center space-x-2">
                              <CircleDollarSign className="w-4 h-4 text-green-600 flex-shrink-0" />
                              <span className="text-xs text-gray-700">Financial burn rate analysis</span>
                            </div>
                          <div className="flex items-center space-x-2">
                            <Scale className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs text-gray-700">Legal POA status verification</span>
                          </div>
                          <div className="flex items-center space-x-2">
                            <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
                            <span className="text-xs text-gray-700">Phase-based readiness checklist</span>
                          </div>
                        </div>
                    </div>
                      

                      {/*
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                          
                          <div className="text-xs border border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
                          <div className="text-xs font-bold text-red-600 bg-green-50 p-1 sm:p-3 rounded-full">
                          <CheckCircle2 className="sm:w-7 sm:h-7 w-5 h-5 text-green-600" />
                          </div>
                          
                        </div>
                        <div className="text-gray-600 text-sm mb-2">With Care Gap Finder</div>
                        <div className="hidden sm:block text-4xl font-bold text-green-600">3 minutes</div>
                        <div className="sm:hidden text-4xl font-bold text-green-600">3 mins</div>
                      </div>

                      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white text-center shadow-xl">
                        <div className="text-5xl font-bold mb-2">85%</div>
                        <div className="text-sm font-semibold uppercase tracking-wide opacity-90">Faster Document Turnaround</div>
                      </div>
                      */}
                {/*------------  End The After Section of the first Half ----------------- */}

                      
                    </div>
                     
                  </div>
                 
                </div>
                
              </div>
              
                      
              {/* Tool 2: Close the Trust Gap */}
              <div className="mb-16 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        2
                      </div>
                      <div className="h-8 w-1 bg-red-200"></div>
                      <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                        <Shield className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Trust</span>
                      </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                      Close the Trust Gap
                    </h3>
                    
                    <p className="text-xl font-semibold text-gray-500 mb-6">
                      Access 14,700+ Independent Facility Audits
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Families are naturally wary of "free" referral services. Break through the skepticism by backing your recommendations with hard data on staffing ratios, safety violations, and clinical performance that marketing brochures hide.
                    </p>

                    <div className="bg-green-50 border-l-4 border-green-200/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <Award className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-green-700 font-normal leading-relaxed">
                            Shift from "Salesperson" to "Trusted Advisor." Use objective due diligence reports to win over high-net-worth families and professional referral sources.
                          </p>
                        </div>
                      </div>
                    </div>

                    {/*<button className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-green-200 to-green-300 text-green-700 rounded-xl hover:from-green-300 hover:to-green-400 transition-all hover:-translate-y-0.5 border-4 border-green-100 font-semibold"> */}
                    <Link className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      to="/nursing-home"
                      >
                      <Ambulance className="w-5 h-5" />
                      <span className="hidden sm:inline">Try Nursing Home Auditor</span>
                      <span className="sm:hidden">Try Auditor</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Visual Stats */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between space-x-3 mb-2">
                          <div className="text-xs border border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            DATABASE ACCESS</div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-1 sm:p-3 rounded-full">
                          <DatabaseZap className="sm:w-7 sm:h-7 w-5 h-5 text-red-500" />
                          </div>
                          
                        </div>
                        <div className="text-gray-600 text-sm mb-2">Independent Facility Audits</div>
                        <div className="text-4xl font-bold text-gray-900">14,700+</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all group">
    <div className="flex items-center justify-between mb-3">
      <Activity className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      <div className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">
        LIVE DATA
      </div>
    </div>
    <div className="text-sm font-bold text-gray-900 mb-2">Staffing Ratios</div>
    <div className="text-xs text-gray-600 mb-3">RN-to-resident coverage</div>
    <div className="flex items-baseline space-x-1">
      <div className="text-2xl font-bold text-gray-900">1:8</div>
      <div className="text-xs text-gray-500">avg ratio</div>
    </div>
  </div>
  
  <div className="bg-white rounded-xl p-5 shadow-md hover:shadow-xl transition-all group">
    <div className="flex items-center justify-between mb-3">
      <ShieldCheck className="w-7 h-7 text-red-500 group-hover:scale-110 transition-transform" />
      <div className="bg-red-50 text-red-600 text-xs font-bold px-2 py-1 rounded">
        VERIFIED
      </div>
    </div>
    <div className="text-sm font-bold text-gray-900 mb-2">Safety Score</div>
    <div className="text-xs text-gray-600 mb-3">Federal inspection data</div>
    <div className="flex items-baseline space-x-1">
      <div className="text-2xl font-bold text-gray-900">4.2</div>
      <div className="text-xs text-gray-500">/ 5.0</div>
    </div>
  </div>
</div>

                      {/*
                      <div className="grid grid-cols-2 gap-4">
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <Activity className="w-6 h-6 text-red-500 mx-auto mb-2" />
                          <div className="text-sm text-gray-600 mb-1">Staffing Ratios</div>
                          <div className="text-2xl font-bold text-gray-900">✓</div>
                        </div>
                        <div className="bg-white rounded-xl p-4 shadow-md text-center">
                          <ShieldCheck className="w-6 h-6 text-red-500 mx-auto mb-2" />
                          <div className="text-sm text-gray-600 mb-1">Safety Data</div>
                          <div className="text-2xl font-bold text-gray-900">✓</div>
                        </div>
                      </div>
                      */}
                      {/*<div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white text-center shadow-xl">*/}
                      <div className="bg-gradient-to-r from-red-300 via-red-100 via-red-200 to-red-300 rounded-2xl p-6 text-red-500 text-center border-2 border-red-500 shadow-xl">
                        <div className="text-5xl font-bold mb-2 text-red-600">100%</div>
                        <div className="text-sm font-semibold uppercase tracking-wide opacity-90 text-red-600">Data Transparency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              


              {/* Tool 3: Stop the Unpaid Research */}
              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  {/* Left: Content */}
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        3
                      </div>
                      <div className="h-8 w-1 bg-red-200"></div>
                      <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                        <Clock className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Efficiency</span>
                      </div>
                    </div>

                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                      Stop the Unpaid Research
                    </h3>
                    
                    <p className="text-xl font-semibold text-gray-500 mb-6">
                      Generate Eligibility Summaries in 60 Seconds
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Don't lose your afternoon on hold with the VA or buried in Medicaid manuals. Use the LTC Assistant to get instant clarity on complex state rules and financial roadblocks for every lead.
                    </p>

                    <div className="bg-green-50 border-l-4 border-green-200/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-green-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-green-700 font-normal leading-relaxed">
                            Reclaim 4+ hours of admin per inquiry. By automating the financial due diligence, you shift your energy from "unpaid researcher" to "high-volume closer."
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      to="/medicaid-co-pilot">
                      
                      <Headset className="w-5 h-5" />
                        <span className="hidden sm:inline">Ask LTC Assistant</span>
                      <span className="sm:hidden">Ask Assistant</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  {/* Right: Visual Stats */}
                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">BEFORE</div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-1 sm:p-3 rounded-full">
                          <PhoneCall className="sm:w-7 sm:h-7 w-5 h-5 text-red-500" />
                          </div>
                          
                        </div>
                        <div className="text-gray-600 text-sm mb-2">Manual Research Time</div>
                        <div className="text-4xl font-bold text-red-600">4+ hours</div>
                        <div className="text-xs text-gray-500 mt-2">Per inquiry</div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
                      </div>

                      

                      {/*------------------- Start Ask the LTC Assistant Section --------------------------*/}
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
  <div className="flex items-center justify-between mb-4">
    <div className="text-xs border border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
    <div className="text-xs font-bold text-green-600 bg-green-50 p-1 sm:p-3 rounded-full">
      <Sparkles className="sm:w-7 sm:h-7 w-5 h-5 text-green-600" />
    </div>
  </div>
  <div className="text-gray-600 text-sm mb-3">With LTC Assistant</div>
  <div className="hidden sm:block text-4xl font-bold text-green-600 mb-4">60 seconds</div>
  <div className="sm:hidden text-4xl font-bold text-green-600 mb-4">60 secs</div>
  
  {/* What Gets Delivered */}
  <div className="space-y-2 pt-3 border-t border-green-200">
    <div className="flex items-center space-x-2">
      <FileText className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-xs text-gray-700">State-specific Medicaid forms</span>
    </div>
    <div className="flex items-center space-x-2">
      <CheckCircle2 className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-xs text-gray-700">Pre-existing condition answers</span>
    </div>
    <div className="flex items-center space-x-2">
      <Shield className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-xs text-gray-700">VA benefits eligibility checks</span>
    </div>
    <div className="flex items-center space-x-2">
      <Brain className="w-4 h-4 text-green-600 flex-shrink-0" />
      <span className="text-xs text-gray-700">Expert LTCI policy guidance</span>
    </div>
  </div>
</div>

                      {/*
                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
                          <div className="text-xs font-bold text-red-600 bg-green-50 p-1 sm:p-3 rounded-full">
                          <Zap className="sm:w-7 sm:h-7 w-5 h-5 text-green-600" />
                          </div>
                          
                        </div>
                        <div className="text-gray-600 text-sm mb-2">With LTC Assistant</div>
                        <div className="hidden sm:block text-4xl font-bold text-green-600">60 seconds</div>
                        <div className="sm:hidden text-4xl font-bold text-green-600">60 secs</div>
                        <div className="text-xs text-gray-500 mt-2">Instant answers</div>
                      </div>
                      

                      <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-2xl p-6 text-white text-center shadow-xl">
                        <div className="text-5xl font-bold mb-2">240x</div>
                        <div className="text-sm font-semibold uppercase tracking-wide opacity-90">Faster Eligibility Checks</div>
                      </div>
                      */}
                      {/*------------------------------------ End the LTC Assistant Section ------------------------- */}
                      
                      
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>


          {/* How It Works - Partnership Integration */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
               Integrate Seamlessly Into Your Workflow
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                From partnership to performance in three simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<ClipboardCheck className="w-8 h-8 text-white" />}
                title="Partner Onboarding"
                description="Quick 30-minute setup call. We integrate our tools into your existing sales process without disrupting your workflow."
              />

              <ProcessStep
                number="2"
                icon={<Users className="w-8 h-8 text-white" />}
                title="Client Connection"
                description="Share your personalized Intake Link with families. They complete their Care Gap Finder before meeting you."
              />

              <ProcessStep
                number="3"
                icon={<Activity className="w-8 h-8 text-white" />}
                title="Performance Tracking"
                description="Access real-time analytics on conversion rates, placement times, and client satisfaction scores."
              />
            </div>
          </section>

          {/* Bottom CTA */}
              <div className="mt-16 text-center">
                <div className="bg-gradient-to-r from-red-50 to-red-100 rounded-3xl p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">
                    Ready to Build a Better Workflow
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    Join placement agents who are closing deals faster with Poetiq's partnership tools.
                  </p>
                  <button
                    onClick={openPartnerRegisterModal}
                    className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg"
                  >
                    <Handshake className="w-6 h-6" />
                    <span>Become a Partner Today</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>

          {/* Real-World Success Stories */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                <Award className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Partner Success Stories</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                {/*Real Agents, Real Results*/}
                Read What Agents Have to Say
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Placement professionals who transformed their business with Poetiq
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <TestimonialCard
                quote="The Qualified Intake Link changed everything. Families now arrive at consultations with their documents organized. My lead-to-placement time dropped from 6 weeks to 4 weeks."
                author="Danielle Mitchell"
                role="Senior Placement Advisor"
                location="Phoenix, AZ"
                metric="33% faster placements"
                //image="https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=400"
                image="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq-dani-spa.png"
              />

              <TestimonialCard
                //quote="The Verified Ethics Badge has been incredible for trust-building. Families can see that my recommendations are backed by independent safety data, not commission incentives."
                quote="The Nursing Home Auditor is the ultimate trust-builder. Families can see my recommendations are backed by independent clinical safety data, not commission incentives."
                author="Michael Ward"
                role="Aging Life Care Professional"
                location="San Diego, CA"
                metric="45% more referrals"
                //image="https://images.unsplash.com/photo-1556157382-97eda2d62296?w=400"
                image="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_michael.png"
              />

              <TestimonialCard
                quote="I used to waste entire days navigating VA benefits for veteran families. Now the LTC Assistant gives me instant eligibility summaries. It's like having an expert on staff."
                author="Jennifer Rodriguez"
                role="Senior Living Advisor"
                location="Austin, TX"
                metric="40% time savings"
                //image="https://images.unsplash.com/photo-1580489944761-15a19d654956?w=400"
                image="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_jennifer.png"
              />

              <TestimonialCard
                quote="The Family Conflict Advisor is a game-changer. Instead of mediating sibling disputes for weeks, the AI handles it while I focus on finding the perfect community fit."
                author="David Thompson"
                role="Care Transition Specialist"
                location="Seattle, WA"
                metric="50% less friction"
                //image="https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=400"
                image="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_david.png"
              />
            </div>
          </section>

          {/* Partnership Benefits Section */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                Why Senior Placement Agents Choose Poetiq
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A complete partnership ecosystem designed for your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<FileCheck className="w-10 h-10 text-red-500" />}
                title="Document Readiness"
                description="No more stalled placements waiting for families to 'find the paperwork.' Our Care Gap Finder ensures readiness."
              />

              <BenefitCard
                icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
                title="Ethical Transparency"
                description="Independent facility audits remove any perception of conflict of interest and build family confidence."
              />

              <BenefitCard
                icon={<Clock className="w-10 h-10 text-red-500" />}
                title="Reduced Sales Cycle"
                description="Automated conflict resolution and document prep cuts weeks off your average placement timeline."
              />

              <BenefitCard
                icon={<Search className="w-10 h-10 text-red-500" />}
                title="Clinical Intelligence"
                description="Cognitive assessments and safety data help you match families with facilities that truly meet their needs."
              />

              <BenefitCard
                icon={<HeartHandshake className="w-10 h-10 text-red-500" />}
                title="Family Satisfaction"
                description="When families feel supported through the process, they refer others and leave glowing reviews."
              />

              <BenefitCard
                icon={<Target className="w-10 h-10 text-red-500" />}
                title="Performance Analytics"
                description="Track your conversion rates, placement times, and client satisfaction with real-time dashboards."
              />
            </div>

            {/* CTA After Benefits */}
            <div className="text-center mt-12">
              <button
                onClick={openPartnerRegisterModal}
                className="group px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5 inline-flex items-center space-x-3 font-semibold"
              >
                <span>Start Your Partnership Today</span>
                <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </button>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Ready to Transform Your Placement Business?
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join the placement professionals who are closing deals faster, building deeper trust, and delivering better outcomes for families.
              </p>

              <button
                onClick={openPartnerRegisterModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <Handshake className="w-6 h-6" />
                <span>Become a Poetiq Partner</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No upfront costs. Partnership benefits start immediately.
              </p>
            </div>
          </section>

        </main>

        {/* Footer */}
        <PageFooter 
          onOpenOnboardingModal={openOnboardingModal}
        />  

        {/* Modals */}
        <CommunityModal
          isOpen={isCommunityModalOpen}
          onClose={closeCommunityModal}
        />

        <PartnerRegisterModal
          isOpen={isPartnerResisterModalOpen}
          onClose={closePartnerRegisterModal}
        />

        {/* Ellie SPA Pill Chatbot - Always Available */}
            <SPACoPilotPillModal />
      </div>
    </>
  );
}

// Challenge Card Component
function ChallengeCard({ 
  icon, 
  challenge, 
  solution, 
  solutionDetail, 
  impact, 
  impactDetail 
}: { 
  icon: React.ReactNode; 
  challenge: string; 
  solution: string; 
  solutionDetail: string; 
  impact: string; 
  impactDetail: string; 
}) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300">
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-16 h-16 flex items-center justify-center shadow-md">
          {icon}
        </div>
      </div>

      {/* Challenge */}
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">The Challenge</div>
        <h3 className="text-lg font-bold text-gray-900">{challenge}</h3>
      </div>

      {/* Solution */}
      <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-200">
        <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">Poetiq Solution</div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">{solution}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{solutionDetail}</p>
      </div>

      {/* Impact */}
      <div className="bg-red-50 rounded-lg p-3 border border-red-200">
        <div className="text-xs font-bold text-red-600 uppercase tracking-wider mb-1">Metric Impact</div>
        <h4 className="text-sm font-bold text-gray-900 mb-1">{impact}</h4>
        <p className="text-xs text-gray-600 leading-relaxed">{impactDetail}</p>
      </div>
    </div>
  );
}

// Metric Card Component
function MetricCard({ 
  icon, 
  metric, 
  label, 
  description, 
  tool 
}: { 
  icon: React.ReactNode; 
  metric: string; 
  label: string; 
  description: string; 
  tool: string; 
}) {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md mx-auto">
        {icon}
      </div>

      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-red-600 mb-2">{metric}</div>
        <div className="text-xl font-bold text-gray-900 mb-4">{label}</div>
      </div>

      <p className="text-gray-700 text-sm leading-relaxed mb-4">{description}</p>

      <div className="flex items-center justify-center space-x-2 bg-red-50 rounded-lg px-3 py-2 border border-red-200">
        <Sparkles className="w-4 h-4 text-red-500" />
        <span className="text-xs font-bold text-red-600">{tool}</span>
      </div>
    </div>
  );
}

// Partnership Tool Card Component
function PartnershipToolCard({ 
  icon, 
  badge, 
  title, 
  subtitle, 
  howItWorks, 
  result, 
  solves, 
  ctaText 
}: { 
  icon: React.ReactNode; 
  badge: string; 
  title: string; 
  subtitle: string; 
  howItWorks: string; 
  result: string; 
  solves: string; 
  ctaText: string; 
}) {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      {/* Icon and Badge */}
      <div className="flex items-start justify-between mb-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-16 h-16 flex items-center justify-center shadow-md">
          {icon}
        </div>
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{badge}</span>
      </div>

      {/* Title */}
      <h3 className="text-2xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-sm text-red-600 font-semibold mb-6">{subtitle}</p>

      {/* How It Works */}
      <div className="mb-4">
        <div className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">How It Works</div>
        <p className="text-sm text-gray-700 leading-relaxed">{howItWorks}</p>
      </div>

      {/* Result */}
      <div className="mb-4 bg-green-50 rounded-lg p-3 border border-green-200">
        <div className="text-xs font-bold text-green-700 uppercase tracking-wider mb-1">The Result</div>
        <p className="text-sm text-gray-700 leading-relaxed">{result}</p>
      </div>

      {/* Solves */}
      <div className="flex items-center space-x-2 mb-6">
        <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
        <span className="text-sm text-gray-600">Solves: <span className="font-bold">{solves}</span></span>
      </div>

      {/* CTA */}
      <button className="w-full py-3 bg-red-500 text-white font-semibold rounded-lg hover:bg-red-600 transition-all shadow-md hover:shadow-lg">
        {ctaText}
      </button>
    </div>
  );
}

// Process Step Component
function ProcessStep({ number, icon, title, description }: { number: string; icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="relative text-center">
      <div className="mx-auto w-20 h-20 bg-gradient-to-br from-red-500 to-red-600 rounded-2xl flex flex-col items-center justify-center text-white mb-6 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1">
        <div className="text-xs font-bold mb-1">STEP {number}</div>
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-3">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

// Testimonial Card Component with Image
function TestimonialCard({ 
  quote, 
  author, 
  role, 
  location, 
  metric, 
  image 
}: { 
  quote: string; 
  author: string; 
  role: string; 
  location: string; 
  metric: string; 
  image: string; 
}) {
  return (
    <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl p-6 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300">
      <div className="flex items-start space-x-4 mb-4">
        <img 
          src={image} 
          alt={author} 
          className="w-16 h-16 rounded-full object-cover border-4 border-red-100 flex-shrink-0"
        />
        <div className="flex-1">
          <blockquote className="text-gray-700 leading-relaxed italic mb-4">
            "{quote}"
          </blockquote>
        </div>
      </div>

      <div className="flex items-center justify-between border-t border-red-100 pt-4">
        <div>
          <div className="text-sm font-bold text-gray-900">{author}</div>
          <div className="text-xs text-gray-600">{role}</div>
          <div className="text-xs text-gray-500">{location}</div>
        </div>
        <div className="bg-red-500 text-white text-xs font-bold px-3 py-2 rounded-lg">
          {metric}
        </div>
      </div>
    </div>
  );
}

// Benefit Card Component
function BenefitCard({ icon, title, description }: { icon: React.ReactNode; title: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default SeniorPlacementAgentPartners;
