import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calculator,
  TrendingDown,
  Shield,
  AlertCircle,
  DollarSign,
  Calendar,
  FileText,
  CheckCircle2,
  ArrowRight,
  Target,
  Clock,
  BarChart3,
  Eye,
  Lock,
  Bell,
  Wallet,
  Home,
  Landmark,
  PiggyBank,
  CreditCard,
  Receipt,
  BookOpen,
  Activity,
  Briefcase,
  ShieldCheck,
  FileCheck,
  TrendingUp,
  Layers,
  BellRing,
  Map,
  ClipboardCheck,
  AlertTriangle,
  LineChart,
  FolderOpen
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';

export function MedicaidSpenddownCalculator() {
  const navigate = useNavigate();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
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
                <Calculator className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Medicaid Spend-Down Calculator</span>
              </div>

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Protect{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  Your Personal Savings
                  <br className="hidden sm:inline"/>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
                Use our spend-down calculator to pinpoint exactly when and how to secure Mom's long-term care without depleting your capital.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  {/*<span className="font-bold">Launch Calculator</span>*/}
                  <span className="font-semibold">Join Our Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#services'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-xl hover:border-red-500 hover:text-red-500 transition-all font-semibold shadow-sm"
                >
                  Explore Features
                </button>
              </div>
            </div>
          </section>

          {/* Problem Statement Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                {/*Eliminate the Financial Guesswork*/}
                {/*Know When Financial Support Gets Triggered*/}
                Know Exactly When Financial Help Arrives
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Get a data-driven forecast. Discover when to stop draining your personal savings.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProblemStatCard
                  icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
                  stat="$150K+"
                  label="Average family spend before Medicaid kicks in"
                />
                <ProblemStatCard
                  icon={<Clock className="w-10 h-10 text-red-500" />}
                  stat="18 Months"
                  label="Typical delay from confusion over eligibility timing"
                />
                <ProblemStatCard
                  icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
                  stat="87%"
                  label="Of families who miss asset protection opportunities"
                />
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Use the Calculator for Better Financial Planning
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Get detailed tracking across all aspects of Medicaid eligibility with the Spend-Down Calculator.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Asset & Threshold Tracking */}
              <ServicePillarCard
                icon={<BarChart3 className="w-12 h-12 text-red-500" />}
                title="Asset & Threshold Tracking"
                features={[
                  "Spend-Down Forecasting: Real-time visibility into how current LTC costs are impacting asset limits",
                  "Exempt Asset Isolation: Clearly separating protected assets (like a primary home) from countable resources",
                  "Gift & Transfer Monitoring: Tracking the look-back window to avoid eligibility penalties"
                ]}
              />

              {/* Income Stream Auditing */}
              <ServicePillarCard
                icon={<Activity className="w-12 h-12 text-red-500" />}
                title="Income Stream Auditing"
                features={[
                  "Benefit Integration: Factoring in Social Security, pensions, and annuities against monthly care costs",
                  "Cost-of-Care Adjustments: Accounting for annual rate hikes in nursing homes or home care agencies",
                  "Monthly Burn-Rate Analysis: Visualizing the exact timeline until you hit the state-mandated trigger"
                ]}
              />

              {/* Eligibility Preparation */}
              <ServicePillarCard
                icon={<ClipboardCheck className="w-12 h-12 text-red-500" />}
                title="Eligibility Preparation"
                features={[
                  "Documentation Checklist: Centralizing the financial records required for the eventual application",
                  "Trigger Alerts: Proactive notifications when assets approach the threshold to begin the filing process",
                  "State-Specific Modeling: Adjusting calculations based on the specific Medicaid or state-aid rules of your parent's residence"
                ]}
              />
            </div>
          </section>

          {/* Real-Time Insights Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Get Strategic Insights in Real-Time
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Protect Mom and Dad's assets with Spend-Down insights focused on Saving Money
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <InsightCard
                icon={<Target className="w-8 h-8 text-red-500" />}
                text="We have reached 85% of the asset threshold; it is time to initiate the secondary document review."
              />

              <InsightCard
                icon={<TrendingUp className="w-8 h-8 text-red-500" />}
                text="The recent $1,200 increase in monthly facility costs has moved your eligibility date up to October 2026."
              />

              <InsightCard
                icon={<Wallet className="w-8 h-8 text-red-500" />}
                text="Dad's pension exceeds the monthly income limit by $400. Initiating the Qualified Income Trust (QIT) protocol."
              />

              <InsightCard
                icon={<Calendar className="w-8 h-8 text-red-500" />}
                text="The 5-year look-back clock on the 2021 asset transfer has cleared, removing $50,000 from your risk profile."
              />

              <InsightCard
                icon={<Receipt className="w-8 h-8 text-red-500" />}
                text="Tracked the $15,000 medical deductible, you have officially triggered the next tier of state-level support."
              />

              <InsightCard
                icon={<Shield className="w-8 h-8 text-red-500" />}
                text="Current burn-rate shows asset protection for the next 18 months; no immediate financial shifts required."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Move Closer to Financial Clarity
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Move from financial anxiety to a managed roadmap with our 3-step solution.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<FolderOpen className="w-8 h-8 text-white" />}
                title="Financial Inventory"
                description="We audit your parent's current holdings, income sources, and care costs to establish your baseline."
              />

              <ProcessStep
                number="2"
                icon={<Map className="w-8 h-8 text-white" />}
                title="Threshold Mapping"
                description="Your calculator is calibrated to your state's specific eligibility rules, setting the tripwires for financial aid."
              />

              <ProcessStep
                number="3"
                icon={<BellRing className="w-8 h-8 text-white" />}
                title="Monthly Monitoring"
                description="Receive automated updates on your spend-down progress, ensuring you never miss the window to apply for support."
              />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*A High-Precision Financial Safeguard*/}
                Why Career Professionals Trust Poetiq's Approach
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We simplify the complexity of eldercare finance with a high-precision spend-down calculator.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<BookOpen className="w-10 h-10 text-red-500" />}
                title="Regulatory Precision"
                description="State rules change. Our tool is updated to reflect current asset limits and look-back regulations, so your data is never obsolete."
              />

              <BenefitCard
                icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
                title="Proactive Risk Mitigation"
                description="We identify potential look-back violations before they become denials, protecting you from costly eligibility delays."
              />

              <BenefitCard
                icon={<LineChart className="w-10 h-10 text-red-500" />}
                title="Executive Roadmaps"
                description="Skip the complex spreadsheets. Receive clean, visual charts that show exactly where the money is going and when the help kicks in."
              />

              <BenefitCard
                icon={<Layers className="w-10 h-10 text-red-500" />}
                title="Managed Coordination"
                description="The calculator doesn't just show numbers, it triggers your VA to start gathering specific paperwork required for the next care phase."
              />

              <BenefitCard
                icon={<Eye className="w-10 h-10 text-red-500" />}
                title="Total Visibility"
                description="Know to the penny how much is being spent and how much is being saved, giving you the confidence to make long-term care decisions."
              />

              <BenefitCard
                icon={<Lock className="w-10 h-10 text-red-500" />}
                title="Legacy Protection"
                description="Our primary goal is to ensure your parents get the care they need without unnecessarily depleting the family's protected assets."
              />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {/*Take the Math Out of Mom's Care*/}
                Put Financial Clarity into Mom's Care
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join 120+ leaders who have replaced financial uncertainty with a clear, managed spend-down roadmap.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <Calculator className="w-6 h-6" />
                <span>Get Your Spend-Down Roadmap</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No credit card required. Start protecting your family's assets today.
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

// Insight Card Component - Speech Bubble Style
function InsightCard({ icon, text }: { icon: React.ReactNode; text: string }) {
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

export default MedicaidSpenddownCalculator;
