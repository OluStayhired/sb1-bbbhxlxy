import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  FileSearch,
  AlertTriangle,
  Shield,
  DollarSign,
  FileText,
  CheckCircle2,
  ArrowRight,
  Target,
  Clock,
  Eye,
  Lock,
  Search,
  ShieldAlert,
  FileWarning,
  FileCheck,
  TrendingUp,
  Layers,
  AlertCircle,
  ClipboardCheck,
  Scale,
  BadgeAlert,
  ScanEye,
  FileX,
  Upload,
  Microscope,
  FileSignature,
  Handshake,
  XCircle,
  Ban,
  Gavel,
  Receipt,
  ShieldCheck,
  FileQuestion,
  CircleAlert
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';

export function NursingHomeContractAnalyzer() {
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
                <FileSearch className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Contract Analyzer AI</span>
              </div>


            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Never Get Blindsided by{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden sm:inline-block sm:mt-2">Hidden Contract Terms</span>
                  <span className="inline sm:hidden">Hidden Contract Terms</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            Our Contract Analyzer will detect predatory contract terms that inflate monthly care bills passed on to patients shortly after admission. 
                
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  {/*<span className="font-bold">Launch Contract Analyzer</span>*/}
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

          {/* Problem Statement Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-6">
                Avoid the Post-Admission Price Increase
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                We audit facility contracts for vague clauses that allow providers to unilaterally mandate higher levels
                of care resulting in unplanned price hikes.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProblemStatCard
                  icon={<DollarSign className="w-10 h-10 text-red-500" />}
                  stat="$2,400/mo"
                  label="Average surprise fee after initial admission"
                />
                <ProblemStatCard
                  icon={<Clock className="w-10 h-10 text-red-500" />}
                  stat="14 Days"
                  label="Typical window before facility increases level-of-care required"
                />
                <ProblemStatCard
                  icon={<AlertTriangle className="w-10 h-10 text-red-500" />}
                  stat="73%"
                  label="Of families hit with unexpected care upgrades"
                />
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Get Full Protection Across Facility Agreements
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Our Contract Analyzer provides comprehensive protection across every aspect of nursing home and care home agreements.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Forensic Contract Audit */}
              <ServicePillarCard
                icon={<Microscope className="w-12 h-12 text-red-500" />}
                title="Forensic Contract Audit"
                features={[
                  "Surcharge Detection: Pinpointing 'Level of Care' adjustments that allow facilities to hike rates based on subjective observations",
                  "Hidden Fee Exposure: Identifying unbundled costs for medication management, 'enhanced' monitoring, and specialized support",
                  "Price Guarantee Verification: Confirming the duration of your 'Standard Rate' before the facility can re-evaluate your parent's needs"
                ]}
              />

              {/* Clinical Leveling Analysis */}
              <ServicePillarCard
                icon={<ScanEye className="w-12 h-12 text-red-500" />}
                title="Clinical Leveling Analysis"
                features={[
                  "Care-Hour Benchmarking: Comparing the facility's 'Standard Care' hours against your parent's actual clinical chart to prevent immediate upsells",
                  "Admission Bait-and-Switch: Detecting clauses that allow facilities to admit a resident on a low tier, only to 'discover' higher needs 14 days later",
                  "Staffing Ratio Scrutiny: Cross-referencing promised care hours with actual staffing availability to ensure you aren't paying for 'ghost' support"
                ]}
              />

              {/* Financial Risk Mitigation */}
              <ServicePillarCard
                icon={<ShieldCheck className="w-12 h-12 text-red-500" />}
                title="Financial Risk Mitigation"
                features={[
                  "Ancillary Cost Caps: Flagging open-ended costs for supplies, transportation, and third-party provider access",
                  "Exit Clause Clarity: Auditing the 'Termination' sections to ensure you aren't locked in if the care quality drops",
                  "Billing Dispute Roadmap: Providing the exact contractual language needed to challenge 'level-of-care' spikes during the first 90 days"
                ]}
              />
            </div>
          </section>

          {/* Real-World Protection Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Real-World Surcharge Prevention
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Examples of how our Analyzer protects our clients from the "Care-Level" trap.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <ProtectionCard
                icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                text="Flagged an 'Enhanced Supervision' clause that would have added $2,400/month starting just 14 days after admission."
              />

              <ProtectionCard
                icon={<BadgeAlert className="w-8 h-8 text-red-500" />}
                text="Detected a bait-and-switch in the 'Mobility Support' section, preventing an unplanned $900 monthly surcharge."
              />

              <ProtectionCard
                icon={<Receipt className="w-8 h-8 text-red-500" />}
                text="Identified a hidden fee for 'Medication Management' that was advertised as an inclusive service during the initial facility tour."
              />

              <ProtectionCard
                icon={<FileWarning className="w-8 h-8 text-red-500" />}
                text="Exposed a clause that allowed the facility to re-level care based on 'subjective observation' without a doctor's sign-off."
              />

              <ProtectionCard
                icon={<DollarSign className="w-8 h-8 text-red-500" />}
                text="Corrected the 'Care Continuity' fee structure, saving your Mom $1,200 in monthly administrative surcharges. A reimbursement will arrive in her account tomorrow"
              />

              <ProtectionCard
                icon={<Lock className="w-8 h-8 text-red-500" />}
                text="Negotiated a 6-month price freeze on 'Level 2' care, preventing the facility from hiking rates immediately after admission."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Decode your Care Contract Faster
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {/*Move from a "Take-it-or-Leave-it" agreement to a managed financial partnership.*/}
                Expose hidden fees and "Care-Level" traps before they hit your bank account.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<Upload className="w-8 h-8 text-white" />}
                title="Contract Upload"
                description="Upload the proposed agreement for a forensic audit of the fine print and fee structures."
              />

              <ProcessStep
                number="2"
                icon={<Search className="w-8 h-8 text-white" />}
                title="Surcharge Audit"
                description="We cross-reference the contract with your parent's medical reality to find 'Care-Level' traps."
              />

              <ProcessStep
                number="3"
                icon={<FileCheck className="w-8 h-8 text-white" />}
                title="Executive Updates"
                description="Receive a scannable report of every 'Red Flag' and the specific questions to ask the facility before you sign."
              />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Why Executives Trust the Poetiq Analyzer
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We provide the forensic oversight needed to protect your parent's care and your family's capital.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<Microscope className="w-10 h-10 text-red-500" />}
                title="Forensic Precision"
                description="We look for the 'absent' language, the things they didn't say that usually lead to surprise billings."
              />

              <BenefitCard
                icon={<AlertCircle className="w-10 h-10 text-red-500" />}
                title="Bait-and-Switch Protection"
                description="We identify facilities that consistently 're-level' residents shortly after move-in to pad their margins."
              />

              <BenefitCard
                icon={<FileText className="w-10 h-10 text-red-500" />}
                title="Clinical Context"
                description="Our analyzer understands medical terminology, ensuring the 'Level of Care' matches the actual clinical needs."
              />

              <BenefitCard
                icon={<Handshake className="w-10 h-10 text-red-500" />}
                title="Managed Negotiation"
                description="We provide the exact scripts and data points your VA can use to challenge predatory clauses."
              />

              <BenefitCard
                icon={<Clock className="w-10 h-10 text-red-500" />}
                title="Zero-Management Effort"
                description="Simply upload the PDF, we do the 'legal' and clinical legwork for you."
              />

              <BenefitCard
                icon={<Eye className="w-10 h-10 text-red-500" />}
                title="Total Transparency"
                description="Know your 'Worst-Case Monthly Cost' before Mom ever packs a suitcase."
              />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Sign with Certainty, Not Stress
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join 120+ career professionals who have used Poetiq to detect predatory clauses and lock in fair care rates for their parents.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <FileSearch className="w-6 h-6" />
                <span>Analyze Mom's Care Home Contract</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No credit card required. Upload your contract and get your forensic report within 24 hours.
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

// Protection Card Component - Speech Bubble Style
function ProtectionCard({ icon, text }: { icon: React.ReactNode; text: string }) {
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

export default NursingHomeContractAnalyzer;
