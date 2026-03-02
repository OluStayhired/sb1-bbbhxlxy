import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Database,
  Lock,
  Search,
  Zap,
  Shield,
  CheckCircle2,
  ArrowRight,
  Clock,
  FolderLock,
  FileText,
  AlertCircle,
  FileCheck,
  ShieldCheck,
  HardDrive,
  FileSearch,
  FileLock,
  FileStack,
  ScrollText,
  Landmark,
  FolderKey,
  Activity,
  Pill,
  Syringe,
  HeartPulse,
  MapPin,
  Eye,
  Share2,
  Tags,
  Timer,
  DollarSign,
  Folder,
  Upload,
  ScanSearch,
  FileWarning,
  Building2,
  CheckCircle,
  KeyRound,
  FileArchive,
  ShieldAlert,
  Sparkles,
  ScanLine,
  Users
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';

export function EldercareDataVault() {
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
                <FolderLock className="w-4 h-4 text-red-500" />
                <span className="text-sm font-bold text-gray-700">Secure Eldercare Data Vault</span>
              </div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Instantly Searchable{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden sm:inline-block sm:mt-2">Critical Care Records</span>
                  <span className="inline sm:hidden">Critical Care Records</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto leading-relaxed">
            
                Respond to insurance audits and facility admissions in seconds. We migrate your parent's fragmented medical and legal data into one secure, centralized vault.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-gradient-to-r from-red-500 to-red-600 text-white rounded-xl hover:from-red-600 hover:to-red-700 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60 hover:-translate-y-0.5"
                >
                  {/*<span className="font-bold">Build Mom's Data Vault</span>*/}
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
                Eliminate the Document Retrieval Crisis
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Stop losing thousands in insurance denials because you can't find the right certificate or medical log when the clock is ticking.
              </p>
            </div>

            <div className="bg-gradient-to-br from-red-50 to-white rounded-3xl p-12 border-2 border-red-100 shadow-xl max-w-5xl mx-auto">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <ProblemStatCard
                  icon={<FileWarning className="w-10 h-10 text-red-500" />}
                  stat="$4,500"
                  label="Average claim lost due to missing documentation"
                />
                <ProblemStatCard
                  icon={<Timer className="w-10 h-10 text-red-500" />}
                  stat="6+ Hours"
                  label="Wasted per week searching for scattered records"
                />
                <ProblemStatCard
                  icon={<AlertCircle className="w-10 h-10 text-red-500" />}
                  stat="73%"
                  label="Of families unprepared for emergency care decisions"
                />
              </div>
            </div>
          </section>

          {/* Core Services Section */}
          <section id="services" className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
              
                The Centralized Records Management Service
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                
                We don't just store documents, we categorize and tag every record so you can find clinical evidence and legal authority the moment a crisis hits.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
              {/* Claim-Ready Evidence */}
              <ServicePillarCard
                icon={<FileStack className="w-12 h-12 text-red-500" />}
                title="Claim-Ready Evidence"
                features={[
                  "LTC Proof of Care: Instant access to the specific medical logs and care-hour tracking required for insurance reimbursement",
                  "Denial Rebuttal Archives: A centralized history of past claims and provider correspondence to win appeals faster",
                  "Historical Medical Logs: Decades of records indexed and ready for physician or insurance review"
                ]}
              />

              {/* Legal & Financial Fortress */}
              <ServicePillarCard
                icon={<Landmark className="w-12 h-12 text-red-500" />}
                title="Legal & Financial Fortress"
                features={[
                  "Verified Authority Documents: Secure, instant sharing of POAs, Trust documents, and Living Wills with hospital staff",
                  "Asset & Income Records: Centralized bank statements and tax certificates required for spend-down audits or facility admissions",
                  "Property & Insurance Deeds: One-click access to long-term care policies, house deeds, and life insurance certificates"
                ]}
              />

              {/* Real-Time Clinical Access */}
              <ServicePillarCard
                icon={<Activity className="w-12 h-12 text-red-500" />}
                title="Real-Time Clinical Access"
                features={[
                  "Dynamic Medication Lists: A constantly updated master list of prescriptions to prevent adverse drug interactions in emergencies",
                  "Immunization & Allergy History: Crucial clinical data available for new specialist intakes or hospital admissions",
                  "Provider Directory: A searchable map of every doctor, pharmacy, and therapist your parent has seen in the last 5 years"
                ]}
              />
            </div>
          </section>

          {/* Real-World Vault Action Section */}
          <section className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*The Vault in Action*/}
                Clients Share Their Data Vault Experience
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Real examples of how the Data Vault turns panicked requests into time efficient responses.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-6xl mx-auto px-4">
              <VaultActionCard
                icon={<DollarSign className="w-8 h-8 text-red-500" />}
                text="Insurance requested the 2022 nursing notes to approve the $4,500 claim. I retrieved them from the Vault and submitted them in 6 minutes."
              />

              <VaultActionCard
                icon={<HeartPulse className="w-8 h-8 text-red-500" />}
                text="Mom was admitted to the ER; I sent the attending physician the secure link to her DNR and current medication list before you even arrived."
              />

              <VaultActionCard
                icon={<ScrollText className="w-8 h-8 text-red-500" />}
                text="The facility asked for the original trust documents for the admission audit. I pulled them from the legal folder and uploaded them instantly."
              />

              <VaultActionCard
                icon={<ScanSearch className="w-8 h-8 text-red-500" />}
                text="I've indexed 5 years of Mom's lab results; you can now search 'Blood Pressure' to see the trend across three different specialists."
              />

              <VaultActionCard
                icon={<ShieldAlert className="w-8 h-8 text-red-500" />}
                text="The LTC carrier claimed 'missing evidence.' I found the missing certification in the 2023 archive and forced a claim reversal today."
              />

              <VaultActionCard
                icon={<FileArchive className="w-8 h-8 text-red-500" />}
                text="Uploaded the tax records required for the Medicaid spend-down. The state auditor has confirmed the file is complete."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                
                How We Index Your Parent's Care Records
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                We move you from fragmented "shoebox" storage into a structured, searchable digital vault.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto px-4">
              <ProcessStep
                number="1"
                icon={<ScanLine className="w-8 h-8 text-white" />}
                title="The Data Audit"
                description="We identify where the critical information is currently hiding from portals to paper files and what is missing."
              />

              <ProcessStep
                number="2"
                icon={<HardDrive className="w-8 h-8 text-white" />}
                title="Digital Architecture"
                description="Our specialists scan, index, and organize every record into a structured, searchable, and HIPAA-compliant dashboard."
              />

              <ProcessStep
                number="3"
                icon={<Sparkles className="w-8 h-8 text-white" />}
                title="Managed Maintenance"
                description="Your Poetiq VA keeps the Vault updated in real-time, ensuring new records are never lost and the 'shoebox' never returns."
              />
            </div>
          </section>

          {/* Why Choose Section */}
          <section className="py-20">
            <div className="text-center mb-16 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*A Fully Managed Extension of Your Care Team*/}
                An Audit-Ready Eldercare Data Vault
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Skip the filing and organizing. We provide the secure infrastructure that ensures your parent's "administrative life" is always audit-ready.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
              <BenefitCard
                icon={<ShieldCheck className="w-10 h-10 text-red-500" />}
                title="Panic Prevention"
                description="No more frantic searching during a crisis. Every certificate and log is one click away."
              />

              <BenefitCard
                icon={<Zap className="w-10 h-10 text-red-500" />}
                title="Insurance Recovery Speed"
                description="Fast evidence submission means claims get paid, preventing unnecessary out-of-pocket costs."
              />

              <BenefitCard
                icon={<Lock className="w-10 h-10 text-red-500" />}
                title="HIPAA-Grade Security"
                description="Your family's most sensitive data is protected by professional encryption, not sitting in an unencrypted folder."
              />

              <BenefitCard
                icon={<Search className="w-10 h-10 text-red-500" />}
                title="Searchable Intelligence"
                description="Use keywords to find specific medical mentions or financial transactions across years of records."
              />

              <BenefitCard
                icon={<Share2 className="w-10 h-10 text-red-500" />}
                title="Permissioned Sharing"
                description="Grant instant, time-limited access to doctors, facilities, or siblings without compromising the master file."
              />

              <BenefitCard
                icon={<Tags className="w-10 h-10 text-red-500" />}
                title="Professional Indexing"
                description="We don't just 'upload' files; we tag and categorize them so they are actually useful when you need them."
              />
            </div>
          </section>

          {/* Trust Indicators Section */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-12 px-4">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Built on HIPAA Compliant Secure Infrastructure
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                The same security standards trusted by healthcare institutions, now available for your family.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto px-4">
              <TrustIndicator
                icon={<Shield className="w-8 h-8 text-red-500" />}
                stat="HIPAA"
                label="Compliant encryption & storage"
              />
              <TrustIndicator
                icon={<Clock className="w-8 h-8 text-red-500" />}
                stat="< 60 Sec"
                label="Average document retrieval time"
              />
              <TrustIndicator
                icon={<CheckCircle className="w-8 h-8 text-red-500" />}
                stat="99.9%"
                label="Uptime guarantee for 24/7 access"
              />
              <TrustIndicator
                icon={<Users className="w-8 h-8 text-red-500" />}
                stat="Unlimited"
                label="Secure shares with family & providers"
              />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white shadow-2xl">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                Protect Mom and Dad's Care Records
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-95 leading-relaxed">
                Join 120+ leaders who have traded "shoebox" chaos for a secure, HIPAA-Compliant Data Vault.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-10 py-5 bg-white text-red-600 rounded-xl hover:bg-gray-50 transition-all shadow-2xl hover:shadow-3xl font-bold text-lg hover:-translate-y-1"
              >
                <FolderLock className="w-6 h-6" />
                <span>Build a Data Vault For Mom </span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>

              <p className="mt-6 text-sm opacity-90">
                No credit card required. Start organizing your parent's critical records today.
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

// Vault Action Card Component - Speech Bubble Style
function VaultActionCard({ icon, text }: { icon: React.ReactNode; text: string }) {
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

export default EldercareDataVault;
