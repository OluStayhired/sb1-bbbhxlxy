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
  Building2,
  ClipboardCheck,
  //Link as LinkIcon,
  LinkIcon,
  Brain,
  PhoneCall,
  FileText,
  Activity,
  BarChart3,
  Handshake,
  ShieldCheck,
  Rocket,
  DatabaseZap,
  CircleDollarSign,
  Scale,
  Headset,
  Layers,
  AlertCircle,
  BookOpen,
  Microscope,
  LineChart,
  Lock,
  TrendingDown,
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';
import { PartnerRegisterModal } from '../components/PartnerRegisterModal';
import { SPACoPilotPillModal } from '../components/SPACoPilotPillModal.tsx';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { EldercareGapDashboardModal } from '../components/EldercareGapDashboardModal';

export function EldercarePartnerPage() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isPartnerRegisterModalOpen, setIsPartnerRegisterModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);

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

  const openDashboardModal = () => {
    setIsDashboardModalOpen(true);
  };

  const closeDashboardModal = () => {
    setIsDashboardModalOpen(false);
  };

  const getSessionId = (): string => {
    return sessionStorage.getItem('eldercare_session_id') || '';
  };

  return (
    <>
      <div className="min-h-screen bg-white">
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
          <section className="py-16 bg-gradient-to-b from-red-50 via-red-50 to-white rounded-3xl mt-8">
            <div className="max-w-5xl mx-auto text-center px-4">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border-2 border-red-200 mb-6 shadow-sm">
                <Handshake className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Poetiq Partner Program</span>
              </div>
              {/*
              <h1 className="text-3xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Automate {' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="sm:hidden"/>
                   Case Research Forever
                </span>
              </h1>
              */}

                <h1 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-6 leading-tight">
                  {/*Senior Placement Intelligence{' '}*/}
                Get Faster Diligent Answers {' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden text-5xl sm:inline-block sm:mt-2">with AI-Driven Tools</span>
                  <br className="sm:hidden"/>
                    <span className="sm:hidden inline text-2xl">with AI-Driven Tools</span>
                </span>
              </h1>

               <h1 className="sm:hidden text-3xl sm:text-4xl md:text-5xl font-bold text-gray-700 mb-6 leading-tight">
                  {/*Senior Placement Intelligence{' '}*/}
                Get Faster Answers {' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden text-5xl sm:inline-block sm:mt-2">with AI-Driven Tools</span>
                  <br className="sm:hidden"/>
                    <span className="sm:hidden inline text-2xl">with AI-Driven Tools</span>
                </span>
              </h1>

              <p className="hidden sm:inline text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
                {/*The Clinical Intelligence Partner for Professionals Who Handle the "Messy Middle" of Long-Term Care.*/}
                We provide the clinical intelligence. You provide the expert guidance. Together, we move families from crisis to action quicker. Gain full access to solutions like Ellie when you join Poetiq. 👇  
              </p>

              <p className="sm:hidden text-base sm:text-lg text-gray-700 mb-6 max-w-3xl mx-auto leading-relaxed">
                {/*The Clinical Intelligence Partner for Professionals Who Handle the "Messy Middle" of Long-Term Care.*/}
                We provide the clinical intelligence. You provide the expert guidance. Together, we move families from crisis to action effortlessly.   
              </p>

              <p className="text-base sm:text-lg text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                {/*
                High-demand markets don't lack leads, they lack Lead Readiness. Join a network of Placement Agents, Elder Law Attorneys, and LTC Specialists who use Poetiq to automate clinical vetting, resolve family deadlock, and move families from "crisis" to "action" in record time.
                */}
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openPartnerRegisterModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  <span className="hidden sm:inline font-semibold">Apply for the Early Partner Program</span>
                  <span className="sm:hidden font-semibold">Become a Partner</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>
              </div>
            </div>
          </section>

          {/*<section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">*/}
          <section className="py-20 bg-gradient-to-b from-white via-red-50/50 to-red-50/30 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                <Layers className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Simple Integration Process</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                Become a  {' '}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                 Poetiq Partner in 3 Steps
                </span>
                
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Seamlessly integrate Poetiq's clinical intelligence into your workflow
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<LinkIcon className="w-8 h-8 text-white" />}
                title="Claim Your Partner Link"
                //description="Click the application link below to register your agency. We'll generate your unique Care Gap Finder link immediately."
                description="Click to jon the program and get your unique Care Gap Finder link."
              />

              <ProcessStep
                number="2"
                icon={<PhoneCall className="w-8 h-8 text-white" />}
                title="Join the Onboarding Call"
                //description="We'll hop on a brief call to align on your specific 'Ready-to-Move' criteria. We want to ensure that when we refer families back to you, they fit your exact expertise and zip code."
                description="Attend a brief partner call to align on your specific 'Ready-to-Move' criteria."
              />

              <ProcessStep
                number="3"
                icon={<FileCheck className="w-8 h-8 text-white" />}
                title="Get 'Placement-Ready' Families"
                //description="Stop playing 'Document Detective.' Receive a digital dossier for every family, complete with identified legal gaps, clinical safety audits, and resolved stakeholder conflicts."
                description="Receive a digital dossier for every family, complete with identified care gaps."
              />
            </div>
          </section>

         <section className="py-20">
  <div className="text-center mb-16 px-4">
    <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
      <Target className="w-5 h-5 text-red-500" />
      <span className="text-sm font-semibold text-red-600">Professional Advantage</span>
    </div>

    <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
      Find out{' '}
      <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
        what's in it for You?
      </span>
    </h2>
    <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
      
      In a market defined by High Demand and Complex Care, your reputation is your only scaleable asset. Poetiq provides the "Clinical Shield" you need to thrive.
    </p>
  </div>

  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
    <AdvantageCard
      icon={<Clock className="w-10 h-10 text-red-500" />}
      badge="TIME SAVINGS"
      title="Eliminate 'Unpaid Labor'"
      description="Let our Care Gap Finder do the 4-hour forensic audit of medical and legal records in 3 minutes. By automating clinical vetting, you shift your energy from 'unpaid researcher' to 'high-volume closer.'"
      metric="4 hrs → 3 mins"
    />

    <AdvantageCard
      icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
      badge="TRUST BUILDER"
      title="Neutralize Liability"
      description="Use our Nursing Home Auditor to back your recommendations with independent Department of Health data on 14,700+ facilities. It's not just your opinion; it's a clinical fact."
      metric="14,700+ Facilities"
    />

    <AdvantageCard
      icon={<Users className="w-10 h-10 text-red-500" />}
      badge="DEAL VELOCITY"
      title="Unfreeze Stalled Deals"
      description="Use the Family Conflict Advisor to handle sibling friction, allowing you to remain the 'Trusted Advisor' while we handle the 'Emotional Logistics.' Stop mediating and start closing."
      metric="30% Faster Close"
    />
  </div>
</section>


                <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-white border border-red-200 rounded-full px-6 py-3 mb-6 shadow-sm">
                <Rocket className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Workflow Integration</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                Learn how to  {' '}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  integrate Poetiq
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Don't "sell" Poetiq. Use Poetiq to sell your own services more effectively.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <WorkflowIntegrationCard
                icon={<LinkIcon className="w-12 h-12 text-red-500" />}
                //title="The 'Intake Alpha' Link"
                title="Use the Care Gap Link"
                description="Add your personal Care Gap Finder link to your website's 'Get Started' button. Families arrive at your first meeting organized and logistics-ready."
                features={[
                  "Website Integration: Embed seamlessly into your 'Get Started' or 'Contact Us' pages",
                  "Email Signatures: Share your unique link in every client communication",
                  "Social Media: Post to LinkedIn, Facebook, or professional profiles for instant reach",
                  "Consultation Forms: Pre-qualify leads before they book your time"
                ]}
              />

              <WorkflowIntegrationCard
                icon={<BookOpen className="w-12 h-12 text-red-500" />}
                //title="The 'Expert Voice' Newsletter"
                title="Share Facility Audits"
                description="Feature our Nursing Home Auditor data in your blogs or newsletters. Position yourself as the only local expert using federal-grade safety analytics."
                features={[
                  "Data-Backed Insights: Access facility safety scores and staffing metrics updated monthly",
                  "Thought Leadership: Publish exclusive industry analysis your competitors can't match",
                  "Trend Analysis: Show families how local facilities compare to national standards",
                  "Trust Building: Reference 14,700+ facilities with Department of Health data"
                ]}
              />

              <WorkflowIntegrationCard
                icon={<Sparkles className="w-12 h-12 text-red-500" />}
                //title="The 'Tech-Enabled' Outcome"
                title="Become the Local Expert"
                description="Transform from a traditional service provider into a tech-enabled family office that handles more volume with less burnout."
                features={[
                  "Higher Volume: Process 3x more families with the same team size",
                  "Faster Close Rates: Move from initial call to signed agreement 40% faster",
                  "Premium Positioning: Command higher fees as the 'data-driven' local expert",
                  "Reduced Burnout: Automate intake chaos so you focus on high-value advisory work"
                ]}
              />
            </div>
          </section>


                    <section className="py-20">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                <UserCheck className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Partner Profiles</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-600 mb-4">
                You are an {' '}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  ideal Poetiq Partner
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Join a network of Placement Agents, Elder Law Attorneys, and Long-Term Care Professionals effortlessly moving families from Crisis to Clarity
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-7xl mx-auto px-4">
              <ProfileCard
                icon={<Building2 className="w-10 h-10 text-red-500" />}
                title="The Senior Placement Agency"
                description="You have the leads, but your agents are drowning in manual intake. You need a standardized, clinical vetting process to scale."
                highlight="Standardize intake at scale"
                //learn="Click for Placement Partnerships"
              />

              <ProfileCard
                icon={<Scale className="w-10 h-10 text-red-500" />}
                title="The Elder Law Attorney"
                description="You are the architect of the MPOA/LPOA, but the 'Medical Chaos' is stalling the legal spend-down. We bridge the gap between the law and the bedside."
                highlight="Bridge law and clinical care"
              />

              <ProfileCard
                icon={<Shield className="w-10 h-10 text-red-500" />}
                title="The LTC Insurance Specialist"
                description="You need to 'trigger' a policy. We provide the clinical audit that proves the facility meets the carrier's safety and staffing requirements."
                highlight="Trigger policies faster"
              />

              <ProfileCard
                icon={<FileText className="w-10 h-10 text-red-500" />}
                title="The VA & Medicaid Consultant"
                description="You're navigating Non-MAGI/ABD rules. We ensure unspent income and assets don't disqualify the family at the turn of the month."
                highlight="Navigate complex eligibility"
              />

              <ProfileCard
                icon={<HeartHandshake className="w-10 h-10 text-red-500" />}
                title="The Geriatric Care Manager"
                description="You coordinate care across multiple providers but lack real-time visibility into facility quality metrics. We arm you with federal safety data families trust."
                highlight="Coordinate with confidence"
              />

              <ProfileCard
                icon={<CircleDollarSign className="w-10 h-10 text-red-500" />}
                title="The Financial Advisor & Estate Planner"
                description="Your clients need asset protection strategies that account for LTC costs. We provide the clinical clarity to model spend-down scenarios accurately."
                highlight="Model costs with precision"
              />
            </div>
          </section>

           {/* Bottom CTA */}
              <div className="mt-8 text-center">
                <div className="bg-gradient-to-br from-red-50 via-white to-red-100/40 rounded-3xl p-10">
                  <h3 className="text-2xl sm:text-3xl font-bold text-gray-700 mb-4">
                    {/*Ready to Build a Better Workflow*/}
                    Start Closing Deals Faster with Poetiq
                  </h3>
                  <p className="text-lg text-gray-700 mb-8 max-w-2xl mx-auto">
                    {/*Join placement agents who are closing deals faster with Poetiq's partnership tools.*/}
                    Integrate Poetiq's partnership tools into your workflow and transform your business.
                  </p>
                  <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full max-w-4xl mx-auto">

                  <button
                    onClick={openPartnerRegisterModal}
                    className="w-full sm:w-auto group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg"
                  >
                    <Handshake className="w-6 h-6" />
                    <span className="hidden sm:inline">Become a Partner Today</span>
                    <span className="sm:hidden">Become a Partner</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </button>

                  <Link 
                    to="/senior-placement-agent-partner" 
                    //onClick={openPartnerRegisterModal}
                    className="w-full sm:w-auto group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-500 rounded-xl hover:from-red-50 hover:to-red-100 border-2 border-red-500 transition-all shadow-xl hover:shadow-2xl hover:-translate-y-1 font-bold text-lg"
                  >
                    <Building2 className="w-6 h-6" />
                    <span className="hidden sm:inline">For Placement Partnerships</span>
                    <span className="sm:hidden">Placement Partnerships</span>
                    <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform" />
                  </Link>
                  </div>
                  
                </div>
              </div>


          <section id="solutions" className="py-24 bg-gradient-to-b from-white via-red-50/30 to-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                  <Zap className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-red-600">Core Solutions</span>
                </div>

                <h2 className="text-3xl sm:text-4xl font-bold text-gray-700 mb-4">
                  3 Tools to Transform{' '}
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    Your Practice
                  </span>
                </h2>

                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Automate your intake, verify your integrity, and close families faster.
                </p>
              </div>

              <div className="mb-16 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
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

                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      Care Gap Finder
                    </h3>

                    <p className="text-xl font-semibold text-red-600 mb-6">
                      Organize Critical Documents in Minutes
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Stop chasing fragmented medical records and legal gaps. Provide every inquiry with a personalized Care Gap Finder link that builds a forensic "Ready-to-Move" dossier in minutes, not weeks.
                    </p>

                    {/*<div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-5 mb-8">*/}
                      <div className="bg-gray-100 border-l-4 border-gray-400/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <TrendingUp className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-gray-700 font-medium leading-relaxed">
                            Walk into the first tour with a complete clinical and financial profile, eliminating discovery drag and shortening your sales cycle.
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      onClick={openPartnerRegisterModal}
                    >
                      <LinkIcon className="w-5 h-5" />
                      <span>Get Your Intake Link</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">BEFORE</div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-full">
                            <Clock className="w-7 h-7 text-red-500" />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-2">Average Document Collection</div>
                        <div className="text-4xl font-bold text-red-600">2-4 weeks</div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
                          <div className="text-xs font-bold text-green-600 bg-green-50 p-3 rounded-full">
                            <Sparkles className="w-7 h-7 text-green-600" />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-3">With Care Gap Finder</div>
                        <div className="text-4xl font-bold text-green-600 mb-4">3 minutes</div>

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
                    </div>
                  </div>
                </div>
              </div>

              <div className="mb-16 bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
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

                    <h3 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      Nursing Home Auditor
                    </h3>

                    <p className="text-xl font-semibold text-red-600 mb-6">
                      Access 14,700+ Independent Facility Audits
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Families are naturally wary of "free" referral services. Break through the skepticism by backing your recommendations with hard data on staffing ratios, safety violations, and clinical performance that marketing brochures hide.
                    </p>

                    {/*<div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-5 mb-8">*/}
                    <div className="bg-gray-100 border-l-4 border-gray-400/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <Award className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-gray-700 font-medium leading-relaxed">
                            Shift from "Salesperson" to "Trusted Advisor." Use objective due diligence reports to win over high-net-worth families and professional referral sources.
                          </p>
                        </div>
                      </div>
                    </div>

                    <Link
                      className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      to="/nursing-home"
                    >
                      <Microscope className="w-5 h-5" />
                      <span>Try Nursing Home Auditor</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </Link>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-2">
                          <div className="text-xs border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">
                            DATABASE ACCESS
                          </div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-full">
                            <DatabaseZap className="w-7 h-7 text-red-500" />
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

                      <div className="bg-white rounded-2xl p-6 text-green-500 text-center border-2 border-green-400 shadow-xl">
                        <div className="text-5xl font-bold mb-2 text-green-600">100%</div>
                        <div className="text-sm font-semibold uppercase tracking-wide opacity-90 text-green-600">Data Transparency</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-3xl shadow-2xl overflow-hidden border-2 border-red-100 hover:border-red-300 transition-all">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-0">
                  <div className="p-10 lg:p-12 flex flex-col justify-center">
                    <div className="flex items-center space-x-3 mb-6">
                      <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center text-white font-bold text-xl shadow-lg">
                        3
                      </div>
                      <div className="h-8 w-1 bg-red-200"></div>
                      <div className="flex items-center space-x-2 bg-red-50 px-4 py-2 rounded-full border border-red-200">
                        <Zap className="w-4 h-4 text-red-600" />
                        <span className="text-xs font-bold text-red-600 uppercase tracking-wide">Efficiency</span>
                      </div>
                    </div>

                    <h3 className="hidden sm:inline text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      LTC Assistant - Ellie
                    </h3>

                    <h3 className="sm:hidden text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                      LTC Assistant
                    </h3>

                    <p className="text-xl font-semibold text-red-600 mb-6">
                      Generate Eligibility Summaries in 60 Seconds with Ellie
                    </p>

                    <p className="text-gray-700 leading-relaxed mb-6">
                      Don't lose your afternoon on hold with the VA or buried in Medicaid manuals. Ask Ellie the LTC Assistant for instant clarity on complex state rules and financial roadblocks for every lead.
                    </p>

                    {/*<div className="bg-gradient-to-r from-green-50 to-green-100 border-l-4 border-green-500 rounded-lg p-5 mb-8">*/}
                    <div className="bg-gray-100 border-l-4 border-gray-400/80 rounded-lg p-5 mb-8">
                      <div className="flex items-start space-x-3">
                        <Sparkles className="w-6 h-6 text-gray-700 flex-shrink-0 mt-1" />
                        <div>
                          <div className="text-xs font-bold text-gray-700 uppercase tracking-wide mb-2">The Payoff</div>
                          <p className="text-gray-700 font-medium leading-relaxed">
                            Reclaim 4+ hours of admin per inquiry. By automating the financial due diligence, you shift your energy from "unpaid researcher" to "high-volume closer."
                          </p>
                        </div>
                      </div>
                    </div>

                    <button
                      className="group w-full sm:w-auto inline-flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg hover:shadow-xl hover:-translate-y-0.5 font-semibold"
                      onClick={openPartnerRegisterModal}
                    >
                      <Headset className="w-5 h-5" />
                      <span>Ask LTC Assistant</span>
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>

                  <div className="bg-gradient-to-br from-red-50 to-red-100 p-10 lg:p-12 flex flex-col justify-center border-l-2 border-red-200">
                    <div className="space-y-6">
                      <div className="bg-white rounded-2xl p-6 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border-4 border-red-100 font-bold text-red-600 bg-red-50 px-3 py-1 rounded-full">BEFORE</div>
                          <div className="text-xs font-bold text-red-600 bg-red-50 p-3 rounded-full">
                            <PhoneCall className="w-7 h-7 text-red-500" />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-2">Manual Research Time</div>
                        <div className="text-4xl font-bold text-red-600">4+ hours</div>
                        <div className="text-xs text-gray-500 mt-2">Per inquiry</div>
                      </div>

                      <div className="flex justify-center">
                        <ArrowRight className="w-8 h-8 text-red-500 transform rotate-90" />
                      </div>

                      <div className="bg-white rounded-2xl p-6 shadow-lg border-2 border-green-400">
                        <div className="flex items-center justify-between mb-4">
                          <div className="text-xs border-4 border-green-100 font-bold text-green-600 bg-green-50 px-3 py-1 rounded-full">AFTER</div>
                          <div className="text-xs font-bold text-green-600 bg-green-50 p-3 rounded-full">
                            <Sparkles className="w-7 h-7 text-green-600" />
                          </div>
                        </div>
                        <div className="text-gray-600 text-sm mb-3">With LTC Assistant</div>
                        <div className="text-4xl font-bold text-green-600 mb-4">60 seconds</div>

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
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <div className="inline-flex items-center space-x-2 bg-white border border-red-200 rounded-full px-6 py-3 mb-6 shadow-sm">
                <Award className="w-5 h-5 text-red-500" />
                <span className="text-sm font-semibold text-red-600">Partnership Benefits</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Professionals{' '}
                <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                  Choose Poetiq
                </span>
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                A complete partnership ecosystem designed for your success
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<FileCheck className="w-10 h-10 text-red-500" />}
                title="Document Readiness"
                description="No more stalled placements waiting for families to 'find the paperwork.' Our Care Gap Finder ensures readiness from day one."
              />

              <BenefitCard
                icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
                title="Ethical Transparency"
                description="Independent facility audits remove any perception of conflict of interest and build family confidence in your recommendations."
              />

              <BenefitCard
                icon={<Clock className="w-10 h-10 text-red-500" />}
                title="Reduced Sales Cycle"
                description="Automated conflict resolution and document prep cuts weeks off your average placement timeline, increasing throughput."
              />

              <BenefitCard
                icon={<Brain className="w-10 h-10 text-red-500" />}
                title="Clinical Intelligence"
                description="Cognitive assessments and safety data help you match families with facilities that truly meet their complex needs."
              />

              <BenefitCard
                icon={<HeartHandshake className="w-10 h-10 text-red-500" />}
                title="Family Satisfaction"
                description="When families feel supported through the process, they refer others and leave glowing reviews that compound your growth."
              />

              <BenefitCard
                icon={<BarChart3 className="w-10 h-10 text-red-500" />}
                title="Performance Analytics"
                description="Track your conversion rates, placement times, and client satisfaction with real-time dashboards tailored to your workflow."
              />
            </div>
          </section>

          <section className="py-24 bg-white">
            <div className="max-w-7xl mx-auto px-4">
              <div className="text-center mb-16">
                <div className="inline-flex items-center space-x-2 bg-red-50 border border-red-200 rounded-full px-6 py-3 mb-6">
                  <Sparkles className="w-5 h-5 text-red-500" />
                  <span className="text-sm font-semibold text-red-600">The Paradigm Shift</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                  The Old Way vs.{' '}
                  <span className="bg-gradient-to-r from-red-500 to-red-600 bg-clip-text text-transparent">
                    The Poetiq Way
                  </span>
                </h2>
                <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  Senior placement is changing. Choose which side of history you want to be on.
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-6">
                {/* Old Way - Left Side */}
                <div className="bg-gray-50 border-2 border-gray-200 rounded-3xl p-10 relative overflow-hidden">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-gray-200/30 rounded-full -mr-16 -mt-16"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center space-x-2 bg-gray-200 rounded-full px-4 py-2 mb-6">
                      <TrendingDown className="w-5 h-5 text-gray-600" />
                      <span className="text-sm font-bold text-gray-700 uppercase tracking-wide">The Old Way</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Manual, Biased, and Slow
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <Clock className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Manual Intake</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Hours of phone calls, scattered documents, and endless back-and-forth with families who don't know what they need.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <AlertCircle className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Biased Recommendations</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Families question if you're recommending the best facility or the one that pays the highest commission.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gray-200 rounded-xl flex items-center justify-center flex-shrink-0">
                          <TrendingDown className="w-6 h-6 text-gray-600" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Slow Conversions</h4>
                          <p className="text-gray-600 leading-relaxed">
                            Weeks of sales cycles, stalled placements, and families who ghost because they're overwhelmed by the process.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Poetiq Way - Right Side */}
                <div className="bg-gradient-to-br from-red-50 via-white to-red-50 border-2 border-red-200 rounded-3xl p-10 relative overflow-hidden shadow-xl">
                  <div className="absolute top-0 right-0 w-32 h-32 bg-red-200/20 rounded-full -mr-16 -mt-16"></div>
                  <div className="absolute bottom-0 left-0 w-24 h-24 bg-red-300/10 rounded-full -ml-12 -mb-12"></div>
                  
                  <div className="relative">
                    <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-red-500 to-red-600 rounded-full px-4 py-2 mb-6 shadow-lg">
                      <Zap className="w-5 h-5 text-white" />
                      <span className="text-sm font-bold text-white uppercase tracking-wide">The Poetiq Way</span>
                    </div>

                    <h3 className="text-2xl font-bold text-gray-900 mb-8">
                      Clinical, Transparent, and Built for Speed
                    </h3>

                    <div className="space-y-6">
                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <Rocket className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Automated Clinical Intake</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Our Care Gap Finder collects, organizes, and analyzes all medical, legal, and financial data before you even speak to the family.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <ShieldCheck className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Independent Transparency</h4>
                          <p className="text-gray-700 leading-relaxed">
                            Federal safety data and facility audits remove bias. Families trust your recommendations because they're backed by objective evidence.
                          </p>
                        </div>
                      </div>

                      <div className="flex items-start space-x-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-red-500 to-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-md">
                          <TrendingUp className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <h4 className="font-bold text-gray-900 mb-2">Accelerated Placements</h4>
                          <p className="text-gray-700 leading-relaxed">
                            LTC-Ready families arrive pre-vetted, documents organized, and ready to commit. Close placements in days, not weeks.
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Bottom Call-to-Action Banner */}
              {/*
              <div className="bg-gradient-to-r from-gray-900 via-gray-800 to-gray-900 rounded-2xl p-8 sm:p-12 text-center relative overflow-hidden">
              
                <div className="absolute inset-0 bg-gradient-to-r from-red-500/10 via-red-600/10 to-red-500/10"></div>
                
                <div className="relative">
                  <div className="flex items-center justify-center space-x-3 mb-6">
                    <div className="h-px w-12 bg-gradient-to-r from-transparent to-red-500"></div>
                    <Handshake className="w-8 h-8 text-red-500" />
                    <div className="h-px w-12 bg-gradient-to-l from-transparent to-red-500"></div>
                  </div>

                  <h3 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-4 leading-tight">
                    Join Our Early-Partner Program Today
                  </h3>
                  
                  <p className="text-lg sm:text-xl text-gray-300 mb-8 max-w-3xl mx-auto leading-relaxed">
                    Start receiving <span className="text-red-400 font-semibold">"LTC-Ready"</span> executive families in your region who are pre-vetted, organized, and ready to move forward.
                  </p>

                  <div className="flex flex-wrap items-center justify-center gap-6 text-sm text-gray-400">
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      <span>No upfront costs</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      <span>Immediate partner benefits</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <CheckCircle2 className="w-5 h-5 text-red-500" />
                      <span>Exclusive territory access</span>
                    </div>
                  </div>
                  
                </div>
                
              </div>
              */}
            </div>
          </section>


          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-10 sm:p-16 text-center text-white shadow-2xl">
              <div className="max-w-4xl mx-auto">
                <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm border border-white/20 rounded-full px-6 py-3 mb-8">
                  <Rocket className="w-5 h-5 text-white" />
                  <span className="text-sm font-semibold text-white">Limited Availability</span>
                </div>

                <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 leading-tight">
                  Join the Future of Logistical Care.
                </h2>

                <p className="text-lg sm:text-xl mb-4 opacity-95 leading-relaxed">
                  We are currently accepting a limited number of Early Adopter Partners for our 2026 Referral Launch.
                </p>

                {/*<p className="text-base sm:text-lg mb-10 opacity-90 leading-relaxed max-w-3xl mx-auto">
                  The "Old Way" of senior placement is manual, biased, and slow. The "Poetiq Way" is clinical, transparent, and built for speed. Join the program today to claim your "Verified Partner" status and start receiving "Logistics-Ready" executive families in your region.
                </p>*/}

                <button
                  onClick={openPartnerRegisterModal}
                  className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
                >
                  <Handshake className="w-6 h-6" />
                  <span className="hidden sm:inline">Become a Poetiq Partner Today</span>
                  <span className="sm:hidden">Become a Partner</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <p className="mt-8 text-sm opacity-90 font-semibold">
                  Join 250+ professionals redefining the LTC transition journey.
                </p>

                <p className="mt-4 text-xs opacity-80">
                  No upfront costs. Partnership benefits start immediately.
                </p>
              </div>
            </div>
          </section>

        </main>

        <PageFooter
          onOpenOnboardingModal={openOnboardingModal}
        />

        <CommunityModal
          isOpen={isCommunityModalOpen}
          onClose={closeCommunityModal}
        />

        <PartnerRegisterModal
          isOpen={isPartnerRegisterModalOpen}
          onClose={closePartnerRegisterModal}
        />

        <EldercareGapDashboardModal
          isOpen={isDashboardModalOpen}
          onClose={closeDashboardModal}
          sessionId={getSessionId()}
        />

        <OnboardingQuestionsModal
          isOpen={isOnboardingModalOpen}
          onClose={closeOnboardingModal}
          onDashboardOpen={openDashboardModal}
        />

        <SPACoPilotPillModal />

      </div>
    </>
  );
}

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

function AdvantageCard({
  icon,
  badge,
  title,
  description,
  metric
}: {
  icon: React.ReactNode;
  badge: string;
  title: string;
  description: string;
  metric: string;
}) {
  return (
    <div className="relative bg-white rounded-2xl p-8 pb-20 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="flex items-start justify-between mb-6">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-16 h-16 flex items-center justify-center shadow-sm">
          {icon}
        </div>
        <span className="bg-red-500 text-white text-xs font-bold px-3 py-1 rounded-full">{badge}</span>
      </div>

      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      {/* Metric Badge - Absolute positioned at bottom */}
      <div className="absolute bottom-6 left-8 right-8 bg-gradient-to-r from-red-500 to-red-600 rounded-xl p-2 sm:p-4 text-white text-center shadow-lg">
        <div className="text-lg sm:text-2xl font-bold">{metric}</div>
      </div>
    </div>
  );
}

function ProfileCard({
  icon,
  title,
  description,
  highlight,
  learn
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
  learn?: string
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 flex flex-col h-full">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4 flex-grow">{description}</p>

      {learn && (
      <Link 
        to="/senior-placement-agent-partner" 
        //className="group inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-semibold text-sm mb-4">
        
className="group inline-flex items-center justify-center space-x-2 px-6 py-3 bg-gradient-to-r from-red-300 to-red-400 text-white rounded-xl hover:from-red-400 hover:to-red-600 transition-all shadow-md hover:shadow-lg hover:-translate-y-0.5 font-semibold text-sm mb-4"
      >
        <span>{learn}</span>
        <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
      </Link>
      )}



      
      <div className="flex items-center space-x-2 pt-4 border-t border-red-100 mt-auto">
        <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-red-600">{highlight}</span>
        
      </div>
    </div>
  );
}


{/*
function ProfileCard({
  icon,
  title,
  description,
  highlight
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  highlight: string;
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-4">{description}</p>

      <div className="flex items-center space-x-2 pt-4 border-t border-red-100">
        <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0" />
        <span className="text-sm font-semibold text-red-600">{highlight}</span>
      </div>
    </div>
  );
}
*/}

function IntegrationCard({
  icon,
  title,
  description,
  features
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-16 h-16 flex items-center justify-center mb-6 shadow-sm">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      <div className="space-y-3">
        {features.map((feature, index) => (
          <div key={index} className="flex items-center space-x-3">
            <div className="w-2 h-2 bg-red-500 rounded-full flex-shrink-0"></div>
            <span className="text-sm text-gray-700">{feature}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function WorkflowIntegrationCard({
  icon,
  title,
  description,
  features
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  features: string[];
}) {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed mb-6">{description}</p>

      <div className="space-y-4">
        {features.map((feature, index) => {
          const [boldPart, ...rest] = feature.split(':');
          return (
            <div key={index} className="flex items-start space-x-3">
              <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-1" />
              <p className="text-gray-700 text-sm leading-relaxed">
                <span className="font-bold text-gray-900">{boldPart}:</span>
                {rest.join(':')}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}



function BenefitCard({
  icon,
  title,
  description
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
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

export default EldercarePartnerPage;
