import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { 
  Calendar, 
  Clock, 
  FileText, 
  Phone, 
  ClipboardList, 
  UserCheck, 
  Shield, 
  CheckCircle, 
  ArrowRight, 
  HeartPulse, 
  Stethoscope, 
  FileCheck, 
  DollarSign, 
  Building2, 
  FolderOpen, 
  Target,
  Headset,
  CheckCircle2,
  CircleDollarSign,
  CalendarClock,
  LayoutList,
  Layers,
  CalendarCheck,
  TextSearch,
  Ambulance,
  Briefcase,
  Scan,
  ArrowRightLeft,
  ClipboardPen,
  ClipboardCheck,
  ClipboardCopy
} from 'lucide-react';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageFooter } from '../components/PageFooter';
import { CommunityModal } from '../components/CommunityModal';

export function VirtualHealthCareAssistant() {
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
          <section className="py-16 bg-gradient-to-b from-red-50 to-white rounded-3xl mt-8">
            <div className="max-w-5xl mx-auto text-center px-4">
              <div className="inline-flex items-center space-x-2 bg-white px-4 py-2 rounded-full border border-red-200 mb-6">
                <Headset className="w-4 h-4 text-red-500" />
                <span className="text-sm font-semibold text-gray-700">Healthcare Virtual Assistant</span>
              </div>

              {/*
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Hire HIPAA-Trained{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/> Virtual Assistants
                </span>
              </h1>
              */}

              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-gray-700 mb-6 leading-tight">
                Hire HIPAA-Trained{' '}
                <span className="bg-gradient-to-r from-red-400 via-red-500 to-red-600 bg-clip-text text-transparent">
                  <br className="hidden sm:inline"/>
                  <span className="hidden sm:inline-block sm:mt-2">Virtual Assistants</span>
                  <span className="inline sm:hidden">Virtual Assistants</span>
                </span>
              </h1>

              <p className="text-lg sm:text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
                Delegate the insurance phone marathons, provider coordination, and claims disputes to elder care specialists who navigate the healthcare bureaucracy for you.
              </p>

              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button
                  onClick={openCommunityModal}
                  className="group flex items-center justify-center space-x-2 px-8 py-4 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-all shadow-lg shadow-red-500/50 hover:shadow-xl hover:shadow-red-500/60"
                >
                  {/*<span className="font-semibold">Get Started Today</span>*/}
                  <span className="font-semibold">Join Our Waitlist</span>
                  <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
                </button>

                <button
                  onClick={() => window.location.href = '#services'}
                  className="px-8 py-4 bg-white text-gray-900 border-2 border-gray-300 rounded-lg hover:border-red-500 hover:text-red-500 transition-all font-semibold"
                >
                  Explore Services
                </button>
              </div>
            </div>
          </section>

          {/* Healthcare Tasks Section */}
          <section id="services" className="py-20">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Outsource the Healthcare Time Drain
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Let specialists manage the high-friction tasks that require professional persistence.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {/* Patient Scheduling & Support */}
              <ServiceCard
                icon={<CircleDollarSign className="w-10 h-10 text-red-500" />}
                //title="Patient Scheduling & Support"
                title = "Insurance & Claims Recovery"
                tasks={[
                  "LTC & Benefit Verification",
                  "Claims Dispute Management",
                  "Reimbursement Tracking"
                ]}
              />

              {/* Medical Admin & EMR */}
              <ServiceCard
                icon={<CalendarClock className="w-10 h-10 text-red-500" />}
                //title="Medical Admin & EMR"
                title="Clinical Care Coordination"
                tasks={[
                  "Calendar Conflict Resolutions",
                  "Provider Communication Flow",
                  "Pharmacy & Lab Follow-Ups"
                ]}
              />

              {/* Administrative Logistics */}
              <ServiceCard
                icon={<LayoutList className="w-10 h-10 text-red-500" />}
                //title="Billing & Insurance"
                title="Administrative Logistics"
                tasks={[
                  "Centralize Medical Records",
                  "Facility Admission Coordination",
                  "Care Team Comms Management"
                ]}
              />

            </div>
            
          </section>

          {/* Daily Tasks Showcase */}
          <section className="py-20 bg-gradient-to-b from-white to-red-50 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                Day in the Life of Your Care Assistant
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                {/*Real examples of tasks completed by our virtual assistants for healthcare practices.*/}
                Real examples of how our VAs navigate the healthcare system to reclaim time for our clients.
              </p>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto">
              <DailyTaskCard
                icon={<DollarSign className="w-8 h-8 text-red-500" />}
                text="I successfully disputed the denied LTC claim from November. After 6 follow-up calls, the $3,200 reimbursement has been approved."
              />

              <DailyTaskCard
                icon={<CalendarCheck className="w-8 h-8 text-red-500" />}
                text="I bypassed the 4-month neurology waitlist to secure an opening this Friday and arranged all transportation."
              />

              <DailyTaskCard
                icon={<TextSearch className="w-8 h-8 text-red-500" />}
                
                text="I’ve centralized 10 years of your Mom's paper records into a searchable digital dashboard for quicker access."
              />

              <DailyTaskCard
                icon={<Ambulance className="w-8 h-8 text-red-500" />}
                
                text="I resolved a prescription conflict between the PCP and Cardiologist. I've just updated the pharmacy delivery."
              />

              <DailyTaskCard
                icon={<ClipboardList className="w-8 h-8 text-red-500" />}
                
                text="I’ve completed the 40-page facility application and verified their staffing ratios for your final signature."
              />

              <DailyTaskCard
                icon={<Briefcase className="w-8 h-8 text-red-500" />}
                
                text="I addressed 12 logistical issues with the home care agency today no action is required from you."
              />
            </div>
          </section>

          {/* How It Works Section */}
          <section className="py-20">
            <div className="p-4 text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*The Path to Seamless Delegation*/}
                Delegate Seamlessly and Get More Done
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">
                Shift the administrative load from your desk to ours with an effortless VA integration process.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <ProcessStep
                number="1"
                 icon={<ClipboardCheck className="w-8 h-8 text-white" />}
                title="Targeted Audits"
                description="We identify your primary time drains and define your assistant’s immediate priorities."
              />

              <ProcessStep
                number="2"
                 icon={<ArrowRightLeft className="w-8 h-8 text-white" />}
                title="Quick Transitions"
                description="We take over the phone marathons and heavy-lifting, becoming your single point of contact."
              />

              <ProcessStep
                number="3"
                 icon={<ClipboardCopy className="w-8 h-8 text-white" />}
                title="Regular Updates"
                description="Receive daily and weekly summaries that keep you in the loop on every resolution."
              />

            </div>
          </section>

          {/* Why Choose Healthcare VAs Section */}
          <section className="py-20 bg-gradient-to-br from-red-50 via-white to-red-50 rounded-3xl">
            <div className="text-center mb-16">
              <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
                {/*Why Choose Healthcare Virtual Assistants*/}
                A Fully Managed Extension of Your Care Team
              </h2>
              <p className="text-lg text-gray-600 max-w-3xl mx-auto">

          Skip the hiring, training, and oversight. We provide a plug-and-play partnership that handles the operational "grind" of eldercare from day one.
              </p>
            </div>

            <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <BenefitCard
                icon={<Layers className="w-10 h-10 text-red-500" />}
                title="Bureaucracy Management"
                description="We handle the hours of hold time and persistent follow-ups required to resolve insurance denials and specialist scheduling."
              />

              <BenefitCard
                icon={<FileText className="w-10 h-10 text-red-500" />}
                title="Records Centralization"
                description="We migrate medical history from shoeboxes and scattered portals into a single, searchable digital dashboard for instant access."
              />

              <BenefitCard
                icon={<Target className="w-10 h-10 text-red-500" />}
                title="Primary Point of Contact"
                description="We manage the daily influx of provider and insurer inquiries, filtering the noise so you only handle the final decisions."
              />

              <BenefitCard
                icon={<Stethoscope className="w-10 h-10 text-red-500" />}
                title="Healthcare Specialization"
                description="Our VAs are pre-trained in LTC benefits and medical terminology, eliminating the need for you to onboard, train, or manage them."
              />

              <BenefitCard
                icon={<Clock className="w-10 h-10 text-red-500" />}
                title="Guaranteed Continuity"
                description="We provide managed oversight and backup coverage so your parent’s administration remains operational even when you are traveling."
              />

              <BenefitCard
                icon={<UserCheck className="w-10 h-10 text-red-500" />}
                title="Executive Updates"
                description="Stay informed through structured, scannable summaries that provide total visibility without the mental load of managing the process."
              />
            </div>
          </section>

          {/* Final CTA Section */}
          <section className="py-20">
            <div className="bg-gradient-to-r from-red-500 via-red-600 to-red-500 rounded-3xl p-12 text-center text-white">
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6">
                {/*Ready to Streamline Your Healthcare Practice?*/}
                Take Healthcare Admin Off Your Desk
              </h2>
              <p className="text-lg sm:text-xl mb-8 max-w-2xl mx-auto opacity-90">

                Join 120+ leaders who have delegated the burden to Poetiq and reclaimed their weekends for quality time with Mom.
              </p>

              <button
                onClick={openCommunityModal}
                className="group inline-flex items-center justify-center space-x-2 px-8 py-4 bg-white text-red-500 rounded-lg hover:bg-gray-100 transition-all shadow-xl hover:shadow-2xl font-semibold text-lg"
              >
                <span>Get Your Healthcare VA Today</span>
                <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
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

// Service Card Component
function ServiceCard({ icon, title, tasks }: { icon: React.ReactNode; title: string; tasks: string[] }) {
  return (
    <div className="group bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 hover:-translate-y-1">
      <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-6 group-hover:bg-red-100 transition-colors">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4 group-hover:text-red-500 transition-colors">
        {title}
      </h3>
      <ul className="space-y-3">
        {tasks.map((task, index) => (
          <li key={index} className="flex items-start space-x-2">
            <CheckCircle2 className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
            <span className="text-gray-600">{task}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// Daily Task Card Component - Modern Chat-Style Speech Bubble
function DailyTaskCard({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <div className="relative pl-2">
      {/* Speech Bubble Container */}
      <div className="bg-gradient-to-br from-white to-red-50 rounded-2xl rounded-bl-sm p-6 border border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300 relative">
        <div className="flex items-start space-x-4">
          <div className="bg-red-100 rounded-lg p-3 flex-shrink-0 shadow-sm">
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
    <div className="bg-white rounded-2xl p-8 border-2 border-red-100 hover:border-red-300 hover:shadow-xl transition-all duration-300">
      <div className="bg-red-50 rounded-full w-16 h-16 flex items-center justify-center mb-6">
        {icon}
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-4">{title}</h3>
      <p className="text-gray-600 leading-relaxed">{description}</p>
    </div>
  );
}

export default VirtualHealthCareAssistant;
