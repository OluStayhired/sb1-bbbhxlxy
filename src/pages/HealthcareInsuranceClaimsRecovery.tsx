import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileX,
  RotateCcw,
  Shield,
  AlertCircle,
  CheckCircle2,
  ArrowRight,
  Scan,
  FileSearch,
  Zap,
  Scale,
  Clock,
  Target,
  TrendingUp,
  FileCheck,
  AlertTriangle,
  DollarSign,
  ShieldCheck,
  FileWarning,
  SearchCheck,
  FileText,
  Gavel,
  Users,
  BadgeCheck,
  ScanLine,
  FileQuestion,
  Layers,
  Lock,
  Award,
  Timer,
  //CircleAlert,
  CheckCircle,
  CalendarClock,
  FolderSync,
  Wrench,
  Sparkles,
  CircleDollarSign,
  BrainCircuit,
  ShieldAlert,
  FileScan,
  SearchX,
  FileEdit,
  Send,
  Briefcase,
  Eye,
  Percent,
  TrendingDown
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { EldercareGapDashboardModal } from '../components/EldercareGapDashboardModal';  // ADD THIS LINE  

export function HealthcareInsuranceClaimsRecovery() {
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
                <RotateCcw className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Claims Recovery Engine</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Overturn Denials{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden sm:inline-block sm:mt-2">Recover Your Benefits</span>
                  <span className="inline sm:hidden">Recover Your Benefits</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                 Use our Claims Recovery Engine to scan denial letters, identify look-back errors, and automate the appeals process to secure the right coverage for Mom and Dad.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  {/*<span className="font-bold">Scan Denial Letter</span>*/}
                  <span className="font-semibold">Join Our Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#services'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
                >
                  See How It Works
                </button>
              </div>
            </div>
          </section>

          {/* Problem Statement Section with Recovery Stats */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {/*Stop Funding Unfair Denials*/}
                Never Accept the First Denial
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
          
75% of insurance appeals succeed when properly documented, yet 99% of families never fight back. We automate the appeal to stop you from paying out of pocket.                
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProblemStatCard
                  icon={<Award className="w-10 h-10 text-red-500" />}
                  stat="at least 75%"
                  label="Of Medicare Advantage appeals are overturned when properly filed"
                />
                <ProblemStatCard
                  icon={<TrendingDown className="w-10 h-10 text-red-500" />}
                  stat="less than 1%"
                  label="Of families with denied claims actually bother to file an appeal"
                />
                <ProblemStatCard
                  icon={<AlertCircle className="w-10 h-10 text-red-500" />}
                  stat="more than 69%"
                  label="Of insured adults are unaware they have the right to appeal a rejection"
                />
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Mechanics of an Unstoppable Appeal
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We don't just resubmit paperwork, we use forensic logic to close the documentation gaps regularly used by insurance companies to justify denials.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Forensic Denial Analysis */}
              <ServicePillarCard
                icon={<BrainCircuit className="w-12 h-12 text-red-500" />}
                title="Forensic Denial Analysis"
                features={[
                  "Look-Back Error Detection: Identifying miscategorized transfers that the insurance company labeled as 'gifting' to trigger a denial",
                  "Technical Gap Scanning: Scrutinizing denial letters to find the specific administrative 'miss' that the insurer used to reject the claim",
                  "Asset Categorization Audit: Re-evaluating financial records to ensure protected assets weren't used to disqualify your parent"
                ]}
              />

              {/* Automated Appeal Engineering */}
              <ServicePillarCard
                icon={<Wrench className="w-12 h-12 text-red-500" />}
                title="Automated Appeal Engineering"
                features={[
                  "Logic-Based Filing: Automatically generating a comprehensive appeal packet that addresses the insurer's specific denial code with precision",
                  "Record Harmonization: Syncing missing medical evidence or care logs into the appeal to eliminate 'incomplete record' rejections",
                  "Deadline Management: Strategic tracking of appeal windows to ensure you never lose your right to recover benefits on a technicality"
                ]}
              />

              {/* Strategic Legal Escalation */}
              <ServicePillarCard
                icon={<Gavel className="w-12 h-12 text-red-500" />}
                title="Strategic Legal Escalation"
                features={[
                  "Elder Attorney Integration: Instant access to pre-vetted legal counsel for cases requiring high-level statutory interpretation",
                  "Preferred Executive Rates: Benefit from Poetiq's network of Elder Attorneys at a discounted rate for final-stage appeals",
                  "Counsel Briefing Reports: We prepare the forensic evidence so your attorney can move straight to the resolution, saving you hours in billable time"
                ]}
              />
            </div>
          </section>

          {/* Recovery Engine in Action Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Recovery Engine in Action
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real-world examples of how we overturn rejections to protect your family's capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <RecoveryActionCard
                icon={<DollarSign className="w-8 h-8 text-red-500" />}
                text="Scanned the $15,000 LTC denial; identified that the insurer miscalculated the look-back window. Appeal filed and overturned in 14 days."
              />

              <RecoveryActionCard
                icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                text="Detected a gifting error on the Medicaid application that would have cost $22,000 in penalties. Corrected the record and secured approval."
              />

              <RecoveryActionCard
                icon={<FolderSync className="w-8 h-8 text-red-500" />}
                text="Automated the appeal for a 'medically unnecessary' home-care denial by syncing 3 months of nurse logs the insurer claimed were missing."
              />

              <RecoveryActionCard
                icon={<SearchCheck className="w-8 h-8 text-red-500" />}
                text="Identified a logic gap in a drug-coverage denial. Drafted the rebuttal and secured a retrospective reimbursement for $3,200."
              />

              <RecoveryActionCard
                icon={<Briefcase className="w-8 h-8 text-red-500" />}
                text="Routed a complex asset-transfer case to a partner attorney with a full forensic brief. Secured the benefit at a 20% lower legal fee."
              />

              <RecoveryActionCard
                icon={<Zap className="w-8 h-8 text-red-500" />}
                text="Found the 'clerical ghosting' in the insurer's system that led to a 3-month claim delay. Forced the payment without you making a single phone call."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*The Path to Recovered Capital*/}
                The Path from Denied to Approved
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Shift from "Appeal Denied" to "Reimbursement Approved" in 3 simple steps
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<FileScan className="w-8 h-8 text-white" />}
                title="Denial Scan"
                description="Upload your denial letter. Our engine identifies the exact 'logic trigger' the insurance company used to reject the claim."
              />

              <ProcessStep
                number="2"
                icon={<FileEdit className="w-8 h-8 text-white" />}
                title="Forensic Correction"
                description="We identify the missing data or gifting errors and build a bulletproof rebuttal packet."
              />

              <ProcessStep
                number="3"
                icon={<Send className="w-8 h-8 text-white" />}
                title="Strategic Filing"
                description="We file the appeal or, if necessary, connect you with discounted legal counsel to finalize the recovery."
              />
            </div>
          </section>

          {/* Why Choose Section - Overcoming the 1% Barrier */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Executives Trust the Recovery Engine
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We treat every insurance appeal like a corporate litigation. Focused on evidence, accuracy, and the recovery of funds. All handled by your Poetiq VA. 
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<Shield className="w-10 h-10 text-red-500" />}
                title="Financial Protection"
                description="Our priority is ensuring the insurance company pays its share before you touch your personal savings."
              />

              <BenefitCard
                icon={<Percent className="w-10 h-10 text-red-500" />}
                title="Overcoming the 1% Odds"
                description="Only 1% of people bother to appeal. We provide the automation that makes you part of the winning minority with 75% success rates."
              />

              <BenefitCard
                icon={<SearchX className="w-10 h-10 text-red-500" />}
                title="Forensic Error Detection"
                description="We find the gifting and look-back mistakes that manual reviews miss 75% of the time."
              />

              <BenefitCard
                icon={<Scale className="w-10 h-10 text-red-500" />}
                title="Attorney-Managed Strategy"
                description="We don't just guess at the law; we provide a bridge to legal experts at executive-level discounts."
              />

              <BenefitCard
                icon={<Layers className="w-10 h-10 text-red-500" />}
                title="Managed Execution"
                description="Your Poetiq VA handles the 'paperwork grind' of the appeal, leaving you only to sign off on the final strategy."
              />

              <BenefitCard
                icon={<BadgeCheck className="w-10 h-10 text-red-500" />}
                title="Zero Margin for Error"
                description="We harmonize every medical and financial record to ensure the insurer has no 'technical' excuse to deny you again."
              />
            </div>
          </section>

          {/* Statistics Trust Section */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                The Numbers Behind the Recovery
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Industry data proves that appeals work, but only when families know they exist and have the tools to execute them.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              <TrustIndicator
                icon={<TrendingUp className="w-8 h-8 text-red-500" />}
                stat="40-90%"
                label="Success rate for properly filed appeals"
              />
              <TrustIndicator
                icon={<Award className="w-8 h-8 text-red-500" />}
                stat="75%"
                label="Medicare Advantage overturn rate"
              />
              <TrustIndicator
                icon={<Clock className="w-8 h-8 text-red-500" />}
                stat="14 Days"
                label="Average time to overturn with complete records"
              />
              <TrustIndicator
                icon={<Eye className="w-8 h-8 text-red-500" />}
                stat="80%"
                label="Find the system too difficult without help"
              />
            </div>
          </section>

          {/* Awareness Gap Section */}
          <section className="py-20">
            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="text-center mb-12">
                <AlertTriangle className="w-16 h-16 text-red-500 mx-auto mb-6" />
                <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                  The Awareness Gap is Costing Families Thousands
                </h2>
                <p className="text-lg text-gray-600 max-w-3xl mx-auto leading-relaxed">
                  69% of insured adults don't know they have a legal right to appeal. 80% who do find the process too complex. We eliminate both barriers by automating the entire recovery workflow.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AwarenessCard
                  stat="69%"
                  label="Unaware of appeal rights"
                  description="We notify you immediately when a denial is appealable"
                />
                <AwarenessCard
                  stat="80%"
                  label="Find system too complex"
                  description="We automate the forensic analysis and filing process"
                />
              </div>
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Take Your Personal Savings Off the Table
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join 120+ leaders who refused to accept "No" from insurance companies and reclaimed their parent's benefits.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <RotateCcw className="w-6 h-6" />
                <span>Scan Mom's Denial Letter</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No credit card required. Start recovering your parent's benefits today.
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

// Recovery Action Card Component - Speech Bubble Style
function RecoveryActionCard({ icon, text }: { icon: React.ReactNode; text: string }) {
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

// Awareness Card Component
function AwarenessCard({ stat, label, description }: { stat: string; label: string; description: string }) {
  return (
    <div className="bg-white rounded-2xl p-8 border-2 border-red-200 hover:border-red-400 hover:shadow-xl transition-all duration-300">
      <div className="text-4xl font-bold text-red-500 mb-2">{stat}</div>
      <div className="text-lg font-bold text-gray-900 mb-3">{label}</div>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default HealthcareInsuranceClaimsRecovery;
