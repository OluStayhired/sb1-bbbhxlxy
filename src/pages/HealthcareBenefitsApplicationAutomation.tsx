import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileStack,
  Bot,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  Target,
  FileText,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  Network,
  Workflow,
  BrainCircuit,
  ScanSearch,
  DatabaseZap,
  ClipboardCheck,
  FileSignature,
  FileClock,
  FileWarning,
  AlertTriangle,
  BookCheck,
  MapPin,
  Route,
  Layers,
  Sparkles,
  Eye,
  Lock,
  TrendingUp,
  GraduationCap,
  Search,
  FileX,
  CheckCircle,
  BadgeCheck,
  ListChecks,
  ShieldAlert,
  Scan,
  Binary,
  Cpu
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { EldercareGapDashboardModal } from '../components/EldercareGapDashboardModal';  // ADD THIS LINE  





export function HealthcareBenefitsApplicationAutomation() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isDashboardModalOpen, setIsDashboardModalOpen] = useState(false);  // ADD THIS LINE

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

  const openDashboardModal = () => {
  setIsDashboardModalOpen(true);
};

const closeDashboardModal = () => {
  setIsDashboardModalOpen(false);
};  

  // GET SESSION ID FROM SESSION STORAGE
const getSessionId = (): string => {
  return sessionStorage.getItem('eldercare_session_id') || '';
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
                <BrainCircuit className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">AI-Powered Benefits Automator</span>
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Auto-Fill Complex{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden sm:inline-block sm:mt-2">Care Benefits Forms</span>
                  <span className="inline sm:hidden">Care Benefits Forms</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Stop guessing which forms to file. Automatically search, map, and pre-fill complex care benefit applications with the precision of an experienced healthcare official.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  {/*<span className="font-bold">Launch Benefits Automator</span>*/}
                  <span className="font-semibold">Join Our Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#services'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
                >
                  See How AI Works
                </button>
              </div>
            </div>
          </section>

          {/* Problem Statement Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Crack the Code of Benefit Eligibility
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Use our highly tuned AI platform to identify the hidden inter-dependencies that lead to care benefits application denials.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProblemStatCard
                  icon={<FileX className="w-10 h-10 text-red-500" />}
                  stat="64%"
                  label="Of care benefit applications rejected on first submission"
                />
                <ProblemStatCard
                  icon={<Clock className="w-10 h-10 text-red-500" />}
                  stat="90+ Days"
                  label="Average delay from missing supplemental forms"
                />
                <ProblemStatCard
                  icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
                  stat="$12K+"
                  label="Out-of-pocket costs during application delays"
                />
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Three-Layer Automation Engine
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our AI-powered system provides comprehensive automation across every aspect of care benefit applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Intelligent Form Mapping */}
              <ServicePillarCard
                icon={<Network className="w-12 h-12 text-red-500" />}
                title="Intelligent Form Mapping"
                features={[
                  "Dependency Logic: Automatically identifies which supplemental forms (like DOH-5178A) are triggered by your parent's specific age, state, and asset profile",
                  "Pre-requisite Sequencing: Ensures 'foundational' approvals (like DOH-5247) are secured before downstream applications are initiated",
                  "Clinical Trigger Detection: Includes secondary filings (like DOH-5147) based on clinical status to ensure the application is comprehensive on day one"
                ]}
              />

              {/* Verified Pre-Filling */}
              <ServicePillarCard
                icon={<DatabaseZap className="w-12 h-12 text-red-500" />}
                title="Verified Pre-Filling"
                features={[
                  "Tacit Knowledge Integration: Leverages AI trained on thousands of successful filings to use the exact terminology government adjusters are looking for",
                  "Data Harmonization: Syncs information across multiple documents to eliminate the 'conflicting data' errors that trigger manual audits",
                  "Legal Attachment Mapping: Identifies exactly where and when to attach PoAs, trust documents, and medical records for a seamless review"
                ]}
              />

              {/* Submission Risk Mitigation */}
              <ServicePillarCard
                icon={<ShieldCheck className="w-12 h-12 text-red-500" />}
                title="Submission Risk Mitigation"
                features={[
                  "Denial-Pattern Scanning: Audits your completed packet for common 'Red Flags' that typically lead to immediate rejections",
                  "State-Specific Compliance: Calibrates your entire workflow to the unique, ever-changing requirements of your parent's resident state",
                  "Filing Roadmap: Generates a step-by-step submission guide so you know exactly where to send the digital or physical copies"
                ]}
              />
            </div>
          </section>

          {/* Real-World Automation Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Automator in Action
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real-world examples of how we navigate the "Tacit Knowledge" gaps in benefit applications.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <AutomationCard
                icon={<Search className="w-8 h-8 text-red-500" />}
                text="Identified that your Mom's age triggered a mandatory DOH-5178A supplement that wasn't listed on the primary application site."
              />

              <AutomationCard
                icon={<Workflow className="w-8 h-8 text-red-500" />}
                text="Flagged that the DOH-5247 must be approved before the POA could be legally attached, preventing a 30-day processing delay."
              />

              <AutomationCard
                icon={<ScanSearch className="w-8 h-8 text-red-500" />}
                text="Automatically mapped DOH-5147 into the workflow after detecting Mom's 'Incapacitated' status in the initial clinical scan."
              />

              <AutomationCard
                icon={<BadgeCheck className="w-8 h-8 text-red-500" />}
                text="Harmonized financial data across 5 separate forms to ensure the 'Asset Look-back' remained consistent and audit-proof."
              />

              <AutomationCard
                icon={<FileWarning className="w-8 h-8 text-red-500" />}
                text="Detected a missing signature field on the third-party release form that would have triggered an automatic denial."
              />

              <AutomationCard
                icon={<MapPin className="w-8 h-8 text-red-500" />}
                text="Verified the specific 'New York' filing order, ensuring the DOH-4220 reached the correct local district office on the first attempt."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                From Paperwork to Guaranteed Submissions
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Move from a box of paperwork to a completed application in three quick steps.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<Scan className="w-8 h-8 text-white" />}
                title="Contextual Scan"
                description="We audit your parent's state, age, and health status to identify the 'Master List' of required filings."
              />

              <ProcessStep
                number="2"
                icon={<Route className="w-8 h-8 text-white" />}
                title="Logic Mapping"
                description="Our AI builds the specific sequence of forms and supplements needed to navigate complex dependencies."
              />

              <ProcessStep
                number="3"
                icon={<FileSignature className="w-8 h-8 text-white" />}
                title="Final Pre-Fill"
                description="The system generates a ready-to-sign, verified application packet with a 98% reduction in 'Manual Error' risk."
              />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Expert Logic Your Application Needs
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We replace the "trial and error" of government filings with a managed, AI-driven workflow.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<GraduationCap className="w-10 h-10 text-red-500" />}
                title="Bureaucratic Expertise"
                description="Our tool captures the tacit knowledge of an experienced healthcare official, so you don't have to learn the rules."
              />

              <BenefitCard
                icon={<Target className="w-10 h-10 text-red-500" />}
                title="Zero Guesswork"
                description="We eliminate the 'Which form comes first?' anxiety by mapping the exact order of operations."
              />

              <BenefitCard
                icon={<ShieldAlert className="w-10 h-10 text-red-500" />}
                title="Denial Prevention"
                description="We focus on the why behind rejections, ensuring your packet is 'clean' before it ever hits a reviewer's desk."
              />

              <BenefitCard
                icon={<ListChecks className="w-10 h-10 text-red-500" />}
                title="Managed Coordination"
                description="The Automator signals your Poetiq VA when a form is ready for signature or when a specific attachment is missing."
              />

              <BenefitCard
                icon={<Zap className="w-10 h-10 text-red-500" />}
                title="High-Bandwidth Efficiency"
                description="What takes a family weeks to research, our engine completes in minutes."
              />

              <BenefitCard
                icon={<Eye className="w-10 h-10 text-red-500" />}
                title="Full Visibility"
                description="Track every dependency and attachment in a single dashboard, so you know exactly where the application stands."
              />
            </div>
          </section>

          {/* Trust Indicators Section */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Built on Insights from Successful Applicants
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our AI understands the nuances that separate approved applications from rejected ones..
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              <TrustIndicator
                icon={<Cpu className="w-8 h-8 text-red-500" />}
                stat="10,000+"
                label="Successful filings analyzed"
              />
              <TrustIndicator
                icon={<CheckCircle className="w-8 h-8 text-red-500" />}
                stat="98%"
                label="First-submission approval rate"
              />
              <TrustIndicator
                icon={<Clock className="w-8 h-8 text-red-500" />}
                stat="15 Minutes"
                label="Average automation time"
              />
              <TrustIndicator
                icon={<Shield className="w-8 h-8 text-red-500" />}
                stat="50 States"
                label="Compliance coverage"
              />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {/*Take the Bureaucracy Off Your Desk*/}
                Unlock Error-Free Financial Aid
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join 120+ leaders who have replaced the form-filling nightmare with a clear, automated roadmap to financial aid.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <BrainCircuit className="w-6 h-6" />
                <span>Automate Mom's Benefits Application</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No credit card required. Get your personalized filing roadmap in under 15 minutes.
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

        <EldercareGapDashboardModal
            isOpen={isDashboardModalOpen}
            onClose={closeDashboardModal}
            sessionId={getSessionId()}
          />   

            {/* Onboarding Questions Modal */}
        <OnboardingQuestionsModal
          isOpen={isOnboardingModalOpen}
          onClose={closeOnboardingModal}
          onDashboardOpen={openDashboardModal} 
          />
      </div>
    </>
  );
}

// Problem Stat Card Component
function ProblemStatCard({ icon, stat, label }: { icon: React.ReactNode; stat: string; label: string }) {
  return (
    <div className="text-center">
      <div className="flex justify-center mb-4">
        {icon}
      </div>
      <div className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">{stat}</div>
      <div className="text-sm text-gray-600 leading-snug">{label}</div>
    </div>
  );
}

// Service Pillar Card Component
function ServicePillarCard({ icon, title, features }: { icon: React.ReactNode; title: string; features: string[] }) {
  return (
    <div className="bg-white rounded-3xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-2xl transition-all duration-300 hover:-translate-y-2">
      <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-2xl w-20 h-20 flex items-center justify-center mb-6 shadow-md">
        {icon}
      </div>
      <h3 className="text-2xl font-bold text-gray-900 mb-6">{title}</h3>
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

// Automation Card Component - Speech Bubble Style
function AutomationCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="relative pl-2">
      <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl rounded-bl-sm p-6 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 relative">
        <div className="flex items-start space-x-4">
          <div className="bg-gradient-to-br from-red-100 to-red-200 rounded-xl p-3 flex-shrink-0 shadow-sm">
            {icon}
          </div>
          <p className="text-gray-700 leading-relaxed font-medium italic">{text}</p>
        </div>
      </div>
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

// Trust Indicator Component
function TrustIndicator({ icon, stat, label }: { icon: React.ReactNode; stat: string; label: string }) {
  return (
    <div className="bg-white rounded-2xl p-6 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 text-center">
      <div className="flex justify-center mb-4">
        <div className="bg-gradient-to-br from-red-50 to-red-100 rounded-xl w-14 h-14 flex items-center justify-center">
          {icon}
        </div>
      </div>
      <div className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">{stat}</div>
      <div className="text-sm text-gray-600 leading-snug">{label}</div>
    </div>
  );
}

export default HealthcareBenefitsApplicationAutomation;
