import { useEffect, useRef, useState } from 'react';
import {
  AlertTriangle,
  ArrowRight,
  BrainCircuit,
  Briefcase,
  CalendarClock,
  Calculator,
  FileSearch,
  HeartPulse,
  Home,
  Route,
  Scale,
  ShieldCheck,
  Star,
  Zap,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { PageFooter } from '../components/PageFooter';
import { PageMenuNavIntake } from '../components/PageMenuNavIntake';
import { TooltipHelp } from '../utils/TooltipHelp';
import { IntakeWorkflow } from '../components/IntakeWorkflow';
import EllieConcierge from '../components/EllieConcierge';
import { FirstVisitBand, MedicaidCliffSection, PersonasSection } from '../components/CareManagerStorySections';
import { CareManagerFeaturesSection, CareManagerHowItWorksSection } from '../components/CareManagerProductSections';
import {
  CareManagerFAQSection,
  CareManagerFinalCTASection,
  CareManagerOldVsNewSection,
  CareManagerTestimonialSection,
  openBookingPage,
} from '../components/CareManagerProofSections';

const CAROUSEL_PILLS = [
  { label: 'Medicaid Cliff Forecast', tooltip: 'The month private-pay funds run out', icon: CalendarClock },
  { label: 'Penalty Risk Flags (Look-Back)', tooltip: 'Gifts and transfers in the last five years', icon: AlertTriangle },
  { label: 'Scope-of-Practice Guardrails', tooltip: 'Marks what belongs with an attorney', icon: ShieldCheck },
  { label: 'Client-Ready Medicaid Roadmap', tooltip: 'A billable plan from private pay to Medicaid', icon: Route },
  { label: 'Spouse Savings Protection (CSRA)', tooltip: 'How much the spouse at home can keep', icon: ShieldCheck },
  { label: 'Income Over the Limit (Miller Trust)', tooltip: 'Flags income above the cap', icon: Scale },
  { label: 'Spend-Down Calculator', tooltip: 'How much must be spent before qualifying', icon: Calculator },
  { label: 'Care Needs Check (ADLs)', tooltip: "Your state's care-need requirements", icon: HeartPulse },
  { label: 'Home & Caregiver-Child Exemptions', tooltip: 'Rules that can protect the family home', icon: Home },
  { label: 'VA Aid & Attendance', tooltip: 'A benefit many veteran families never claim', icon: Star },
  { label: 'Attorney-Ready Case Brief', tooltip: 'Organized facts for an elder law attorney', icon: Briefcase },
  { label: 'Ask Ellie, Your AI Helper', tooltip: 'Plain-language answers, line clearly marked', icon: BrainCircuit },
];

export default function CareManagerLandingPage() {
  useAuth();
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
    if (!window.location.hash) return;
    const t = setTimeout(() => {
      document.getElementById(window.location.hash.substring(1))?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }, 100);
    return () => clearTimeout(t);
  }, []);

  const nav = (
    <PageMenuNavIntake
      onOpenCommunityModal={() => setIsCommunityModalOpen(true)}
      onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)}
    />
  );

  return (
    <>
      <div id="top_page" className="min-h-screen bg-white">
        <div className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">{nav}</div>
        <div className="sm:hidden">{nav}</div>

        <HeroSection />
        <MedicaidCliffSection />
        <PersonasSection />
        <FirstVisitBand />
        <CareManagerHowItWorksSection />
        <CareManagerFeaturesSection />
        <CareManagerOldVsNewSection />
        <CareManagerTestimonialSection />
        <CareManagerFAQSection />
        <CareManagerFinalCTASection />

        <PageFooter onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)} />
      </div>

      <CommunityModal isOpen={isCommunityModalOpen} onClose={() => setIsCommunityModalOpen(false)} />
      <OnboardingQuestionsModal isOpen={isOnboardingModalOpen} onClose={() => setIsOnboardingModalOpen(false)} />
      <EllieConcierge audience="care_manager" />
    </>
  );
}

function HeroSection() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const t = setTimeout(() => setVisible(true), 150);
    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-8">
          <BrainCircuit className="w-4 h-4 mr-2 flex-shrink-0" />
          <span className="hidden sm:block">For Geriatric Care Managers & Aging Life Care Professionals</span>
          <span className="sm:hidden">For Geriatric Care Managers & Senior Advisors</span>
        </div>

        <h1
          className={`text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-700 leading-tight tracking-tight transition-all duration-[1200ms] ease-out ${
            visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'
          }`}
        >
          Don't get cut at the Medicaid cliff.
          <br />
          <span
            className={`inline-block transition-all duration-[1400ms] ease-out delay-300 ${
              visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Lead the transition instead.
            </span>
          </span>
        </h1>

        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed">
          {/*Poetiq maps the money in minutes, so you guide families from private pay to Medicaid without forensic
          accounting, legal research or crossing into the practice of law.*/}

          Poetiq maps the money in minutes, allowing you to guide families from private pay to Medicaid without 
          forensic accounting, legal research, or crossing into the practice of law.
        </p>

        <div className="mt-10 sm:mt-12">
          <button
            type="button"
            onClick={openBookingPage}
            className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Book a 15-Minute Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-slate-500">
            {[
              { icon: ShieldCheck, label: 'Education, never legal advice' },
              { icon: FileSearch, label: "Your state's Medicaid rules" },
              { icon: Briefcase, label: 'Attorney-ready brief in one click' },
            ].map((t) => (
              <div key={t.label} className="flex items-center space-x-2">
                <t.icon className="w-4 h-4 text-teal-500" />
                <span>{t.label}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 pb-6 sm:pb-10">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-teal-200/50 border border-teal-100 bg-gradient-to-br from-slate-50 to-white">
          <IntakeWorkflow />
        </div>
      </div>

      <CapabilitiesCarousel />
    </section>
  );
}

function CapabilitiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const pills = [...CAROUSEL_PILLS, ...CAROUSEL_PILLS];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;
    let id = 0;
    let pos = 0;
    const step = () => {
      pos += 0.4;
      if (pos >= container.scrollWidth / 2) pos = 0;
      container.scrollLeft = pos;
      id = requestAnimationFrame(step);
    };
    id = requestAnimationFrame(step);
    const pause = () => cancelAnimationFrame(id);
    const resume = () => {
      id = requestAnimationFrame(step);
    };
    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);
    return () => {
      cancelAnimationFrame(id);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20 sm:pb-28">
      <p className="flex items-center justify-center gap-2 text-xs font-semibold tracking-widest text-slate-400 mb-5">
        <Zap className="w-3.5 h-3.5" /> What Poetiq maps in your first assessment
      </p>
      <div ref={scrollRef} className="flex gap-3 overflow-x-hidden">
        {pills.map((pill, i) => (
          <TooltipHelp key={`${pill.label}-${i}`} text={pill.tooltip}>
            <div className="flex-shrink-0 flex items-center gap-2 px-4 py-2.5 bg-white border border-slate-200 hover:border-teal-300 rounded-full shadow-sm hover:shadow-md hover:shadow-teal-100/50 transition-all duration-200 cursor-default select-none">
              <pill.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{pill.label}</span>
            </div>
          </TooltipHelp>
        ))}
      </div>
    </div>
  );
}
