import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  BrainCircuit,
  ShieldCheck,
  Calculator,
  HeartPulse,
  Scale,
  Clock,
  CircleDollarSign,
  FileSearch,
  Home,
  Star,
  Users,
  Briefcase,
  Zap,
  BookOpenText,
  // ADD THESE NEW ONES:
  Phone,
  Activity,
  FileText,
  MessageCircle,
  ChevronRight,
  Package,
  // NEW for Features section:
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Compass,
  Handshake,
  // NEW for Old Way / New Way:
  X,
  Ban,
  Timer,
  Megaphone,
  Lightbulb,
  // NEW for Testimonial:
  Quote,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { PageFooter } from '../components/PageFooter';
import { PageMenuNav } from '../components/PageMenuNav';
import { PageMenuNavIntake } from '../components/PageMenuNavIntake';
import { TooltipHelp } from '../utils/TooltipHelp';
import { IntakeWorkflow } from '../components/IntakeWorkflow';
import { SpendDownPillModalMock } from '../components/SpendDownPillModalMock';
import { AttorneyBriefMock } from '../components/AttorneyBriefMock';
import { NonMagiMock } from '../components/NonMagiMock';
import { ScreenCareNeedsMock } from '../components/ScreenCareNeedsMock';
import { HowCareBecomesAffordableSection, NoPaperworkBand } from '../components/AffordabilitySections';



// ═══════════════════════════════════════════════════════════════════════════════
// CAROUSEL DATA
// ═══════════════════════════════════════════════════════════════════════════════

const CAROUSEL_PILLS = [
  { label: 'Spouse Savings Protection (CSRA)',     tooltip: 'How much the spouse at home can keep',                 icon: ShieldCheck },
  { label: 'Income Over the Limit (Miller Trust)', tooltip: 'Flags income above the cap and the trust that fixes it', icon: Scale },
  { label: 'Spend-Down Calculator',                tooltip: 'How much must be spent before qualifying',             icon: Calculator },
  { label: 'Care Needs Check (ADLs)',              tooltip: "Checks your state's care-need requirements",          icon: HeartPulse },
  { label: 'Past Gifts & Penalties (Look-Back)',   tooltip: 'Reviews gifts made in the last five years',            icon: Clock },
  { label: 'Spouse Income Top-Up (MMMNA)',         tooltip: 'Minimum monthly income the spouse at home can keep',   icon: Users },
  { label: 'Home & Caregiver-Child Exemptions',    tooltip: 'Rules that can protect the family home',               icon: Home },
  { label: 'VA Aid & Attendance',                  tooltip: 'Monthly benefit many veteran families never claim',    icon: Star },
  { label: 'Attorney-Ready Case Summary',          tooltip: 'Organized facts for an elder law attorney',            icon: Briefcase },
  { label: '3-Minute Intake Screen',               tooltip: 'First names and rough estimates only',                 icon: Zap },
  { label: 'Ask Ellie, Your AI Helper',            tooltip: 'Plain-language answers to tricky questions',           icon: BrainCircuit },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN PAGE COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function LandingPage() {
  useAuth();

  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    if (window.location.hash) {
      const timeoutId = setTimeout(() => {
        const id = window.location.hash.substring(1);
        const element = document.getElementById(id);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
      return () => clearTimeout(timeoutId);
    }
  }, []);

  const openCommunityModal = () => setIsCommunityModalOpen(true);
  const closeCommunityModal = () => setIsCommunityModalOpen(false);
  const openOnboardingModal = () => setIsOnboardingModalOpen(true);
  const closeOnboardingModal = () => setIsOnboardingModalOpen(false);

  return (
    <>
      <div id="top_page" className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <PageMenuNavIntake
            onOpenCommunityModal={openCommunityModal}
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>
        <div className="sm:hidden">
          <PageMenuNavIntake
            onOpenCommunityModal={openCommunityModal}
            onOpenOnboardingModal={openOnboardingModal}
          />
        </div>

        {/* ===================== HERO SECTION ===================== */}
        <HeroSection />

        <HowCareBecomesAffordableSection />

        <NoPaperworkBand />

        {/* ===================== HOW IT WORKS ===================== */}
        <HowItWorksSection />

        {/* ===================== FEATURES ===================== */}
        <FeaturesSection />

        {/* ===================== OLD WAY vs NEW WAY ===================== */}
        <OldVsNewSection />

        {/* ===================== TESTIMONIAL ===================== */}
        <TestimonialSection />

        {/* ===================== FAQ ===================== */}
        <FAQSection />

        {/* ===================== FINAL CTA ===================== */}
        <FinalCTASection />



        {/* Footer */}
        <PageFooter onOpenOnboardingModal={openOnboardingModal} />
      </div>

      {/* Modals */}
      <CommunityModal isOpen={isCommunityModalOpen} onClose={closeCommunityModal} />
      <OnboardingQuestionsModal isOpen={isOnboardingModalOpen} onClose={closeOnboardingModal} />
    </>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// HERO SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function HeroSection() {
  const headingRef = useRef<HTMLHeadingElement>(null);
  const [headingVisible, setHeadingVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setHeadingVisible(true), 150);
    return () => clearTimeout(timer);
  }, []);

  const handleBookDemo = () => {
    // Replace with your actual demo booking URL or modal trigger
    window.open('https://meetings.hubspot.com/olu-adedeji', '_blank');
  };

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-8 sm:pt-32 sm:pb-12 text-center">

        {/* Top Pill */}
        <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-8">
          <BrainCircuit className="w-4 h-4 mr-2" />
          <span className="sm:block hidden">For home care agencies that accept private-pay & Medicaid</span>
          <span className="sm:hidden">For home care agencies open to private-pay & Medicaid</span>
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className={`text-3xl sm:text-5xl lg:text-6xl font-bold text-slate-700 leading-tight tracking-tight transition-all duration-[1200ms] ease-out ${
            headingVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          <span className="spoken-voice">We can’t afford care</span> is often{' '}
          {/*<br className='hidden sm:in-line' />*/}
          <br/>
          <span
            className={`inline-block transition-all duration-[1400ms] ease-out delay-300 ${
              headingVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              not the final answer.
            </span>
          </span>
        </h1>

        {/* Sub-Headline */}
        <p className="sm:block hidden mt-6 sm:mt-8 text-lg sm:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal">
          {/*When families hear the price of care, most assume they'll have to drain their savings.
          With just a first name and rough estimates, Poetiq shows your coordinator in about three
          minutes whether, with proper legal planning, the family may qualify for Medicaid while
          protecting much of what they've saved.*/}
          Poetiq makes it easy for you to show private-pay families how to qualify for Medicaid and protect their life savings.
        </p>

        <p className="sm:hidden mt-6 sm:mt-8 text-lg sm:text-xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal"> 
          Poetiq makes it easy for you to show private-pay families how to qualify for Medicaid and protect their life savings.
        </p>

        {/* CTA Button */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={handleBookDemo}
            className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Book a 15-Minute Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Trust Indicators */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FileSearch className="w-4 h-4 text-teal-500" />
              <span>First names and rough estimates only</span>
            </div>
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="w-4 h-4 text-teal-500" />
              <span>Uses your state's Medicaid rules</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-teal-500" />
              <span>Prepares families for an elder law attorney</span>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Intake Workflow Demo */}
      <div className="max-w-6xl mx-auto px-6 pb-6 sm:pb-10">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-teal-200/50 border border-teal-100 bg-gradient-to-br from-slate-50 to-white">
          <IntakeWorkflow />
        </div>
      </div>

      {/* ─── Carousel: Capabilities ─── */}
      <CapabilitiesCarousel />
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// CAPABILITIES CAROUSEL
// ═══════════════════════════════════════════════════════════════════════════════

function CapabilitiesCarousel() {
  const scrollRef = useRef<HTMLDivElement>(null);

  // Duplicate the pills array so the marquee loops seamlessly
  const pills = [...CAROUSEL_PILLS, ...CAROUSEL_PILLS];

  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationId: number;
    let scrollPos = 0;
    const speed = 0.4; // px per frame

    const step = () => {
      scrollPos += speed;
      // When we've scrolled past the first full set, jump back to create infinite loop
      const halfWidth = container.scrollWidth / 2;
      if (scrollPos >= halfWidth) {
        scrollPos = 0;
      }
      container.scrollLeft = scrollPos;
      animationId = requestAnimationFrame(step);
    };

    animationId = requestAnimationFrame(step);

    // Pause on hover
    const pause = () => cancelAnimationFrame(animationId);
    const resume = () => { animationId = requestAnimationFrame(step); };

    container.addEventListener('mouseenter', pause);
    container.addEventListener('mouseleave', resume);

    return () => {
      cancelAnimationFrame(animationId);
      container.removeEventListener('mouseenter', pause);
      container.removeEventListener('mouseleave', resume);
    };
  }, []);

  return (
    <div className="max-w-6xl mx-auto px-6 pb-20 sm:pb-28">
      <p className="text-center text-xs font-semibold tracking-widest text-slate-400 mb-5">
        What Poetiq checks during a call
      </p>

      <div
        ref={scrollRef}
        className="flex gap-3 overflow-x-hidden"
        style={{ scrollBehavior: 'auto' }}
      >
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

// ═══════════════════════════════════════════════════════════════════════════════
// HOW IT WORKS SECTION
// ═══════════════════════════════════════════════════════════════════════════════

const HOW_IT_WORKS_STEPS = [
  {
    id: 'screen',
    num: '01',
    tab: 'Check Care Needs',
    tabIcon: Activity,
    title: 'Check care needs',
    description: "Confirm which daily activities need help (bathing, dressing, eating, moving around) and whether your loved one likely meets your state's care-need requirement. About 60 seconds.",
    accent: 'teal',
  },
  {
    id: 'triage',
    num: '02',
    tab: 'Map the Money',
    tabIcon: Calculator,
    title: 'Map the money',
    description: 'Enter rough estimates of savings, income, and any gifts made in the last five years. No statements needed. Poetiq applies your state\'s Medicaid rules for older adults (known as "Non-MAGI" Medicaid) to show what\'s likely protected, what\'s over the limit, and what an attorney may be able to restructure.',
    accent: 'teal',
  },
  {
    id: 'brief',
    num: '03',
    tab: 'Hand Off to an Attorney',
    tabIcon: FileText,
    title: 'Hand off to an attorney',
    description: 'When planning is needed, create an attorney-ready brief with the family\'s situation already organized. The family walks into their first legal meeting prepared.',
    accent: 'teal',
  },
  {
    id: 'ellie',
    num: '04',
    tab: 'Get Unstuck Anytime',
    tabIcon: MessageCircle,
    title: 'Get unstuck anytime with Ellie',
    description: 'A family asks, "Mom gave my brother $20,000 three years ago. Does that matter?" Ask Ellie and get a plain-language answer about the five-year look-back, specific to your state.',
    accent: 'teal',
  },
];

function HowItWorksSection() {
  const [activeStep, setActiveStep] = useState(0);
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Intersection observer for entrance animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const currentStep = HOW_IT_WORKS_STEPS[activeStep];

  return (
    <section
      ref={sectionRef}
      id="how-it-works"
      className="relative bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Phone className="w-4 h-4 mr-2" />
            <span>How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            {/*Four steps your coordinator can run{' '}*/}
            4 steps to turn price objections{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              {/*while the family is still on the phone.*/}
              into a clear plan to pay for care. 
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {/*No finance or legal background needed. Poetiq asks the questions, applies your state's rules, and gives your coordinator plain-language answers to share.*/}
            No legal or financial background needed. Poetiq asks the questions, applies your state's rules, and gives you plain-language answers to share before the call ends.         
          </p>
        </div>

        {/* Flow Arrow Bar */}
        <div className={`hidden md:flex items-center justify-center gap-0 mb-14 transition-all duration-[1000ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Family Call', icon: Phone },
            { label: 'Care Needs', icon: Activity },
            { label: 'Funding Check', icon: Calculator },
            { label: 'Attorney Brief', icon: FileText },
            { label: 'Ask Ellie Anytime', icon: MessageCircle },
          ].map((item, i, arr) => (
            <div key={item.label} className="flex items-center">
              <div
                onClick={() => { if (i > 0) setActiveStep(i - 1); }}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i === 0
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-200/50 cursor-default'
                    : i - 1 === activeStep
                    ? 'bg-teal-100 text-teal-800 border border-teal-300 shadow-sm cursor-pointer'
                    : 'bg-white text-slate-500 border border-slate-200 hover:border-teal-200 hover:text-teal-700 cursor-pointer'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </div>
              {i < arr.length - 1 && (
                <ChevronRight className="w-4 h-4 text-slate-300 mx-1 flex-shrink-0" />
              )}
            </div>
          ))}
        </div>

        {/* Main Content: Left Interactive + Right Image */}
        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start transition-all duration-[1000ms] delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

          {/* LEFT: Interactive Step Selector */}
          <div className="space-y-3">
            {HOW_IT_WORKS_STEPS.map((step, i) => {
              const isActive = i === activeStep;
              const Icon = step.tabIcon;
              return (
                <button
                  key={step.id}
                  onClick={() => setActiveStep(i)}
                  className={`group w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'border-teal-300 bg-white shadow-lg shadow-teal-100/50'
                      : 'border-slate-200 bg-white/60 hover:border-teal-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  {/* Tab Header */}
                  <div className="flex items-center gap-4 px-5 py-4">
                    {/* Step Number */}
                    <div className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-extrabold transition-colors duration-300 ${
                      isActive
                        ? 'bg-teal-600 text-white'
                        : 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600'
                    }`}>
                      {step.num}
                    </div>

                    {/* Tab Label + Icon */}
                    <div className="flex items-center gap-2 flex-1">
                      <Icon className={`w-4.5 h-4.5 transition-colors duration-300 ${
                        isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-teal-500'
                      }`} />
                      <span className={`text-sm font-bold transition-colors duration-300 ${
                        isActive ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'
                      }`}>
                        {step.tab}
                      </span>
                    </div>

                    {/* Active Indicator */}
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${
                      isActive ? 'bg-teal-500 scale-100' : 'bg-transparent scale-0'
                    }`} />
                  </div>

                  {/* Expanded Content (only when active) */}
                  <div className={`transition-all duration-300 ease-out overflow-hidden ${
                    isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-5 pb-5 pl-[4.75rem]">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">
                        {step.title}
                      </h3>
                      <p className="text-sm text-slate-500 leading-relaxed">
                        {step.description}
                      </p>

                      {/* Progress Bar */}
                      <div className="mt-4 flex items-center gap-2">
                        {HOW_IT_WORKS_STEPS.map((_, j) => (
                          <div
                            key={j}
                            className={`h-1 rounded-full flex-1 transition-colors duration-300 ${
                              j <= i ? 'bg-teal-500' : 'bg-slate-200'
                            }`}
                          />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          {/* RIGHT: Step Visual or Ellie Mock */}
          <div className="hidden lg:block">
            <div className="sticky top-32">

              {/* ── Step 4: Live Ellie Mock ── */}
              {activeStep === 3 ? (
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 overflow-hidden max-h-[620px]">
                  {/* Step badge */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
                    <MessageCircle className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-teal-700">
                      Step 4 &middot; Ask Ellie Anytime
                    </span>
                  </div>

                  {/* The mock chat component */}
                  <div className="p-4">
                    <SpendDownPillModalMock />
                  </div>
                </div>

              ): activeStep === 2 ? (
                /* ── Step 3: Attorney Brief Mock ── */
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 overflow-hidden max-h-[620px]">
                  {/* Step badge */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
                    <FileText className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-teal-700">
                      Step 3 &middot; Hand Off to an Attorney
                    </span>
                  </div>

                  {/* The attorney brief mock component */}
                  <div className="p-4">
                    <AttorneyBriefMock />
                  </div>
                </div>

                    ): activeStep === 1 ? (
                /* ── Step 2: Non-Magi Triage Mock ── */
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 overflow-hidden max-h-[620px]">
                  {/* Step badge */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
                    <Calculator className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-teal-700">
                      Step 2 &middot; Map the Money
                    </span>
                  </div>

                  {/* The Non-MAGI Triage mock component */}
                  <div className="p-4">
                    <NonMagiMock />
                  </div>
                </div>

              ): activeStep === 0 ? (
                /* ── Step 1: Screen the Care Needs Mock ── */
                <div className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 overflow-hidden max-h-[620px]">
                  {/* Step badge */}
                  <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
                    <Activity className="w-4 h-4 text-teal-600" />
                    <span className="text-xs font-bold text-teal-700">
                      Step 1 &middot; Check Care Needs
                    </span>
                  </div>

                  {/* Screen the Care Needs Mock component */}
                  <div className="p-4">
                    <ScreenCareNeedsMock />
                  </div>
                </div>      
              ) : (
      
                /* ── Steps 1-3: Original placeholder visual ── */
                <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/40 overflow-hidden aspect-[4/3]">
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-8 transition-all duration-500">
                    <div className="flex items-center gap-2 px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-xs font-semibold mb-5">
                      <currentStep.tabIcon className="w-3.5 h-3.5" />
                      <span>Step {currentStep.num} of 04</span>
                    </div>
                    <div className="w-20 h-20 rounded-2xl bg-teal-100/80 flex items-center justify-center mb-5 transition-all duration-300">
                      <currentStep.tabIcon className="w-10 h-10 text-teal-600" />
                    </div>
                    <h4 className="text-lg font-bold text-slate-800 text-center mb-2">
                      {currentStep.title}
                    </h4>
                    <p className="text-sm text-slate-500 text-center max-w-xs leading-relaxed">
                      {currentStep.description}
                    </p>
                    <div className="mt-6 px-4 py-2 bg-slate-100 rounded-lg border border-slate-200">
                      <p className="text-[11px] text-slate-400 font-medium">Product screenshot for this step goes here</p>
                    </div>
                  </div>
                  <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
                </div>
              )}

            </div>
          </div>


        </div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES SECTION DATA
// ═══════════════════════════════════════════════════════════════════════════════

const FEATURES = [
  {
    id: 'spend-down',
    image: 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v3.png',
    headline: 'The Numbers, in Minutes',
    subheadline: 'Your coordinator enters rough estimates. Poetiq applies your state\'s Medicaid rules and shows the family what\'s possible, live on the call.',
    label: 'What the Spend Down Planner Shows Your Team',
    items: [
      {
        icon: ShieldCheck,
        title: 'Protect the Healthy Spouse\'s Savings',
        badge: 'CSRA',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Calculates how much the spouse at home can keep under your state\'s rules, plus the minimum monthly income they\'re entitled to. This is usually the moment a worried spouse relaxes.',
      },
      {
        icon: TrendingUp,
        title: 'Spot Income Over the Medicaid Limit',
        badge: 'Miller Trust',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Flags when monthly income is too high to qualify in states with an income cap, and explains the special trust that solves it, so the family knows it\'s fixable.',
      },
      {
        icon: Clock,
        title: 'Catch Past Gifts Before They Cause a Penalty',
        badge: '5-Year Look-Back',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Checks money given away in the last five years, estimates any waiting period, and checks exceptions, such as a child who lived at home as a caregiver.',
      },
      {
        icon: Sliders,
        title: 'Try "What If" Options Live',
        badge: 'Scenario Planning',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Show how a prepaid funeral, home safety changes, or months of in-home care change what\'s left to spend down, while the family is still listening.',
      },
    ],
  },
  {
    id: 'ask-ellie',
    image: 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_spend_v3.png',
    headline: 'Answers, in plain language',
    subheadline: 'Families ask hard questions on the first call. Ellie explains the rule in plain language, applies your state\'s numbers, and suggests when to bring in an attorney.',
    label: 'Questions Ellie Helps Your Team Answer',
    items: [
      {
        icon: Home,
        title: 'Will my dad lose the house?',
        badge: 'Home Exemptions',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Ellie explains when the family home is protected, including rules for a spouse or caregiver child still living there.',
      },
      {
        icon: Scale,
        title: 'Mom\'s pension is $3k a month. Is that too much?',
        badge: 'Income Limits',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Ellie compares income to your state\'s limit and explains, in everyday words, how families in income-cap states still qualify.',
      },
      {
        icon: AlertTriangle,
        title: 'We gave the grandkids money last year. Does it matter?',
        badge: '5-Year Look-Back',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Ellie explains how past gifts are reviewed, what a waiting period means, and when it\'s time to involve an elder law attorney.',
      },
      {
        icon: Users,
        title: 'Can we pay my sister for caregiving?',
        badge: 'Family Caregivers',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Ellie outlines how families can document paid caregiving properly, so it\'s treated as care rather than a gift.',
      },
    ],
  },
  {
    id: 'care-pilot',
    image: 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_pilot_v1.png',
    //headline: 'Clear plan, from messy calls',
    headline: 'Clear plan, on the 1st call',
    subheadline: 'Turn a worried family\'s story into a step-by-step plan across care, legal documents, and funding, so everyone knows what happens next.',
    label: 'What the Care Pilot Gives Your Team and the Family',
    items: [
      {
        icon: Activity,
        title: 'Confirm Care Needs and Urgency',
        badge: 'Care Needs',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Records which daily activities need help, such as eating, bathing, or toileting, and whether in-home care fits now.',
      },
      {
        icon: FileSearch,
        title: 'Flag Issues That Need a Professional',
        badge: 'Legal Flags',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Spots situations, like large past gifts or savings well above the limit, that need an elder law attorney, so families get help early instead of hitting a wall later.',
      },
      {
        icon: CircleDollarSign,
        title: 'Give Families a Step-by-Step Plan',
        badge: 'Family Plan',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Turns the call into a clear checklist across care, legal documents, and funding, so families leave knowing exactly what to do next.',
      },
      {
        icon: Handshake,
        title: 'Find a Local Elder Law Attorney',
        badge: 'Referrals',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Helps you connect the family with a local specialist and send the organized case summary ahead of time.',
      },
    ],
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURES SECTION COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

function FeaturesSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="features"
      className="relative bg-white border-t border-slate-200"
    >
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">

        {/* Section Header */}
        <div className={`text-center mb-20 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Package className="w-4 h-4 mr-2" />
            <span>Three tools, one intake call</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            What you get with{' '}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Poetiq
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Spend Down Planner does the math. Ellie explains it. Care Pilot turns it into a plan.
          </p>
        </div>

        {/* Feature Blocks -- Zigzag Layout */}
        <div className="space-y-24 sm:space-y-32">
          {FEATURES.map((feature, featureIdx) => (
            <FeatureBlock
              key={feature.id}
              feature={feature}
              reversed={featureIdx % 2 !== 0}
              isVisible={isVisible}
              delay={featureIdx * 150}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FEATURE BLOCK (single zigzag row)
// ═══════════════════════════════════════════════════════════════════════════════

function FeatureBlock({
  feature,
  reversed,
  isVisible,
  delay,
}: {
  feature: typeof FEATURES[number];
  reversed: boolean;
  isVisible: boolean;
  delay: number;
}) {
  const [openItem, setOpenItem] = useState(0);

  const contentSide = (
    <div className="space-y-6">
      {/* Headline + Subheadline */}
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug tracking-tight">
          {feature.headline}
        </h3>
        <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-lg">
          {feature.subheadline}
        </p>
      </div>

      {/* Sub-label */}
      <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">
        {feature.label}
      </p>

      {/* Accordion Items */}
      <div className="space-y-2.5">
        {feature.items.map((item, i) => {
          const isOpen = i === openItem;
          const Icon = item.icon;
          return (
            <button
              key={i}
              onClick={() => setOpenItem(isOpen ? -1 : i)}
              className={`group w-full text-left rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-teal-200 bg-white shadow-lg shadow-teal-100/40'
                  : 'border-slate-200 bg-slate-50/50 hover:border-teal-200 hover:bg-white hover:shadow-sm'
              }`}
            >
              {/* Item Header */}
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-colors duration-300 ${
                  isOpen
                    ? 'bg-teal-100 text-teal-600'
                    : 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-500'
                }`}>
                  <Icon className="w-4 h-4" />
                </div>

                <span className={`text-sm font-semibold flex-1 transition-colors duration-300 ${
                  isOpen ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'
                }`}>
                  {item.title}
                </span>

                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all duration-300 ${
                  isOpen ? item.badgeColor : 'bg-slate-100 text-slate-400 border-slate-200'
                }`}>
                  {item.badge}
                </span>

                <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${
                  isOpen ? 'rotate-90' : ''
                }`} />
              </div>

              {/* Expanded Detail */}
              <div className={`transition-all duration-300 ease-out overflow-hidden ${
                isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
              }`}>
                <div className="px-4 pb-4 pl-[3.25rem]">
                  <p className="text-sm text-slate-500 leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const imageSide = (
    <div className="hidden lg:block">
      <div className="sticky top-32">
        {/*<div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/40 overflow-hidden aspect-[4/3]">*/}

          <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/40 overflow-hidden">

          {/* Default Feature Image */}
          {feature.image && (
            <img
              src={feature.image}
              alt={feature.headline}
              //className="absolute object-cover inset-0 w-full h-full transition-opacity duration-500"
              className="w-full h-auto block transition-opacity duration-500"
            />
          )}

          {/* Subtle bottom gradient for polish */}
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start transition-all duration-[1000ms] ease-out ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
      }`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {reversed ? (
        <>
          {imageSide}
          {contentSide}
        </>
      ) : (
        <>
          {contentSide}
          {imageSide}
        </>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// OLD WAY vs NEW WAY DATA
// ═══════════════════════════════════════════════════════════════════════════════

const SHIFTS = [
  {
    num: '01',
    title: 'Overcoming Price Objections',
    icon: CircleDollarSign,
    before: {
      headline: 'Families hang up at the price',
      body: 'They assume paying for care means spending every dollar they\'ve saved, and your coordinator has no way to show them otherwise.',
    },
    after: {
      headline: 'They hear about a path they didn\'t know existed',
      body: 'Your coordinator shows how much of their savings may be protected and that Medicaid may be within reach with proper planning.',
    },
  },
  {
    num: '02',
    title: 'Spotting Care Needs & Hidden Hurdles',
    icon: Activity,
    before: {
      headline: 'Hours lost piecing together the situation',
      body: 'Staff spend time manually checking care needs and often miss hurdles like large past gifts that can delay Medicaid.',
    },
    after: {
      headline: 'Care needs checked, hurdles flagged in minutes',
      body: 'The Care Pilot records which daily activities need help and flags past gifts that may need an attorney\'s attention.',
    },
  },
  {
    num: '03',
    title: 'Giving Complex Cases a Next Step',
    icon: Briefcase,
    before: {
      headline: 'Complex cases go nowhere',
      body: 'When a family needs legal planning, there\'s no easy way to hand them off, so the inquiry quietly goes cold.',
    },
    after: {
      headline: 'An organized brief for an elder law attorney',
      body: 'Complex cases become organized attorney briefs, so the family gets legal help and your agency stays their care provider.',
    },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// OLD WAY vs NEW WAY SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function OldVsNewSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="old-vs-new"
      className="relative bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">

        {/* Section Header */}
        <div className={`text-center mb-16 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <TrendingUp className="w-4 h-4 mr-2" />
            <span>What changes for your agency</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            {/*From "we can't afford it"{' '}*/}
            Transform financial roadblocks{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              {/*to a clear next step.*/}
              into planned next steps.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See how agencies replace guesswork on the phone with real answers, live.
          </p>
        </div>

        {/* Sub-label */}
        <div className={`text-center mb-10 transition-all duration-[900ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            Three shifts on every intake call
          </p>
        </div>

        {/* Column Headers -- desktop only */}
        <div className={`hidden sm:grid grid-cols-[1fr_1fr] gap-6 mb-6 max-w-5xl mx-auto transition-all duration-[900ms] delay-300 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="text-center">
            {/*<span className="inline-flex items-center px-4 py-2 bg-slate-100 border border-slate-200 rounded-full text-slate-500 font-semibold text-sm">*/}
<span className="inline-flex items-center px-4 py-2 bg-rose-100 border border-rose-200 rounded-full text-rose-500 font-semibold text-sm">              
              {/*<X className="w-4 h-4 text-slate-400 mr-2" />*/}
              <X className="w-4 h-4 text-rose-400 mr-2" />
              Before Poetiq
            </span>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 font-semibold text-sm">              
              <CheckCircle2 className="w-4 h-4 text-teal-500 mr-2" />
              With Poetiq
            </span>
          </div>
        </div>

        {/* Shift Cards */}
        <div className="space-y-5 max-w-5xl mx-auto">
          {SHIFTS.map((shift, i) => {
            const Icon = shift.icon;
            return (
              <div
                key={shift.num}
                className={`transition-all duration-[800ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
              >
                {/* Shift Title Bar */}
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white text-xs font-extrabold flex-shrink-0">
                    {shift.num}
                  </div>
                  {/*<Icon className="w-4.5 h-4.5 text-teal-600" />*/}
                  <h3 className="text-base font-bold text-slate-800">{shift.title}</h3>
                </div>

                {/* Before / After Row */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Before */}
                  {/*<div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-slate-300 transition-colors duration-300">*/}
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-slate-300 transition-colors duration-300">
                    {/* Subtle red accent line */}
                    {/*<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-rose-300 to-rose-200" />*/}

                    <div className="sm:hidden mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-slate-100 border border-slate-200 rounded-full text-slate-500 font-medium text-xs">
                        <X className="w-3 h-3 mr-1" />
                        Before Poetiq
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 flex-shrink-0 mt-0.5">
                        {/*<Ban className="w-3.5 h-3.5 text-slate-400" />*/}
                        <Ban className="w-3.5 h-3.5 text-rose-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-1.5">{shift.before.headline}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{shift.before.body}</p>
                      </div>
                    </div>
                  </div>

                  {/* After */}
                  <div className="bg-teal-50/60 border-2 border-teal-200 rounded-2xl p-5 sm:p-6 relative overflow-hidden group hover:border-teal-300 hover:shadow-md hover:shadow-teal-100/50 transition-all duration-300">
                    {/* Teal accent line */}
                    {/*<div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-teal-500 to-teal-400" />*/}

                    <div className="sm:hidden mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-teal-700 font-medium text-xs">
                        <CheckCircle2 className="w-3 h-3 mr-1" />
                        With Poetiq
                      </span>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-teal-100 flex-shrink-0 mt-0.5">
                        <CheckCircle2 className="w-3.5 h-3.5 text-teal-600" />
                      </div>
                      <div>
                        <p className="text-sm font-bold text-teal-800 mb-1.5">{shift.after.headline}</p>
                        <p className="text-sm text-slate-600 leading-relaxed">{shift.after.body}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Bottom Accent -- a simple summary line */}
        <div className={`mt-14 text-center transition-all duration-[900ms] delay-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-teal-200 rounded-2xl shadow-sm">
            <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100">
              <Lightbulb className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-800">Result:</span>{' '}
              Every intake call ends with a next step: a care start date, a clear funding path, or a warm handoff to an elder law attorney.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// TESTIMONIAL SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function TestimonialSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleBookDemo = () => {
    //window.open('https://calendly.com', '_blank');
     window.open('https://meetings.hubspot.com/olu-adedeji', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      id="testimonial"
      className="relative bg-white border-t border-slate-200"
    >
      <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">

        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            What one agency saw{' '}
            {/*<br className="hidden sm:block" />*/}
            <br/>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              after making the switch.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            A multi-branch agency that accepts both private-pay and Medicaid clients shares what changed on their intake calls after 4 weeks.
          </p>
        </div>

        {/* Testimonial Card */}
        <div className={`transition-all duration-[1000ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="relative bg-gradient-to-br from-slate-50 to-white border-2 border-teal-100 rounded-2xl p-8 sm:p-12 shadow-lg shadow-teal-500/5 max-w-3xl mx-auto">

            {/* Decorative quote mark */}
            <svg
              className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 text-teal-100"
              fill="currentColor"
              viewBox="0 0 32 32"
            >
              <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
            </svg>

            <blockquote className="relative z-10">
              <p className="text-lg sm:text-xl md:text-2xl text-slate-700 italic leading-relaxed pl-4 sm:pl-8 ml-4">
                "We were losing roughly four out of ten calls the moment families heard the cost of care. Our coordinators couldn't explain Medicaid or how a spouse's savings are protected. Now they run a live screening in under three minutes, families stay on the line, and we've signed more service agreements in one quarter than in the whole previous year."
              </p>

              <footer className="mt-8 pl-4 sm:pl-8 ml-4">
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 border-2 border-teal-200 flex-shrink-0">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-teal-700 font-bold text-base">
                      Sales Director, Multi-Branch Home Care Agency
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      Southeast U.S.
                    </p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-slate-400">
                  Agency name withheld at their request. Results as reported by the agency.
                </p>
              </footer>
            </blockquote>

            {/* Outcome Metrics */}
            <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { value: 'Under 3 min', label: 'Live screening per call' },
                { value: '4 in 10', label: 'Calls lost at the price conversation before Poetiq (agency-reported)' },
                { value: '1 quarter', label: 'To beat the previous year\'s signed agreements (agency-reported)' },
              ].map((metric, i) => (
                <div key={i} className="text-center">
                  <p className="text-2xl sm:text-3xl font-extrabold text-teal-600">{metric.value}</p>
                  <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className={`text-center mt-12 transition-all duration-[900ms] delay-400 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <button
            onClick={handleBookDemo}
            className="group inline-flex items-center space-x-2 border-2 border-teal-500 text-teal-600 hover:bg-teal-600 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-teal-600/20"
          >
            <span>Book a 15-Minute Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// FAQ SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function FAQSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const faqs = [
    {
      question: 'Does my intake team need any financial or clinical training to use Poetiq?',
      answer:
        'Not at all. Poetiq is built for non-technical intake coordinators. The Spend Down Planner and Care Pilot walk your staff through every step with plain-language prompts. No knowledge of Medicaid rules is required. Your team enters rough estimates from the family, and Poetiq applies your state\'s rules in real time.',
    },
    {
      question: 'What does my coordinator need from the family to run a screening?',
      answer:
        'Just a first name and rough estimates: approximate savings, monthly income, whether there\'s a spouse at home, any large gifts in the past five years, and which daily activities need help. Families don\'t need documents in front of them. Poetiq gives a clear first picture on the very first call, and the details are confirmed later with an elder law attorney.',
    },
    {
      question: 'Does Poetiq help with both private-pay and Medicaid families?',
      answer:
        'Yes. Many families who call assume they\'ll pay full price until their savings are gone. Poetiq helps your coordinator see whether they may qualify for Medicaid with proper legal planning, while protecting much of their savings. Some families start care as private-pay while their application is processed, and others are covered once they qualify. Either way, they stay with your agency instead of hanging up.',
    },
    {
      question: 'What does a 3-minute screening look like during a live intake call?',
      answer:
        'While your coordinator is on the phone, they enter rough household and financial estimates into the Spend Down Planner. Poetiq shows how much of the spouse\'s savings may be protected, flags income that\'s over your state\'s limit, checks for past gifts that could cause a waiting period, and outlines a clear next step. The whole process takes under three minutes and keeps families engaged on the call.',
    },
    {
      question: 'Is this legal or financial advice?',
      answer:
        'No. Poetiq is a screening and education tool. It helps your team understand a family\'s likely options and prepares an organized brief for an elder law attorney, who handles the actual planning. Because screenings use rough estimates, results are a starting point for the conversation, not a final eligibility decision.',
    },
    {
      question: 'Why does Poetiq create an attorney brief?',
      answer:
        'Protecting savings while qualifying for Medicaid takes careful legal planning. Poetiq organizes the family\'s situation into a clear brief, so a local elder law attorney can help them faster. Attorneys who receive well-prepared cases often think of your agency when their own clients need in-home care.',
    },
    {
      question: 'How is family information protected?',
      answer:
        'Poetiq is designed to need very little personal information. A screening runs on a first name and rough estimates, with no full names, Social Security numbers, account numbers, or medical records. What you do enter is encrypted when stored and when sent, and only authorized members of your agency can see it. We\'re working toward offering signed HIPAA business associate agreements. Until then, we recommend keeping full client records in your existing systems.',
    },
    {
      question: 'Can Poetiq handle state-specific Medicaid rules, or is it one-size-fits-all?',
      answer:
        'Poetiq is state-aware. It applies your state\'s income limits, protected savings amounts for spouses, income-cap trust requirements, and look-back rules. Whether your agency operates in one state or several, results reflect the rules your families actually face.',
    },
  ];

  return (
    <section
      ref={sectionRef}
      id="faq"
      className="relative bg-slate-50 border-t border-slate-200"
    >
      <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">

        {/* Section Header */}
        <div className={`text-center mb-12 sm:mb-16 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full text-sm font-medium mb-6 shadow-sm">
            <BookOpenText className="w-4 h-4 mr-2" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            Questions from agency leaders
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything you need to know before your first screening.
          </p>
        </div>

        {/* FAQ Accordion */}
        <div className={`space-y-4 transition-all duration-[1000ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:border-teal-300 overflow-hidden transition-colors duration-200"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-slate-800 hover:bg-slate-50 transition-colors hover:text-teal-700 select-none">
                <span className="pr-4">{faq.question}</span>
                <div className="relative w-6 h-6 flex-shrink-0">
                  <svg
                    className="absolute inset-0 w-6 h-6 text-teal-500 group-open:hidden transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M12 4v16m8-8H4"
                    />
                  </svg>
                  <svg
                    className="absolute inset-0 w-6 h-6 text-teal-500 hidden group-open:block transition-opacity duration-300"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M4 12h16"
                    />
                  </svg>
                </div>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}
// ═══════════════════════════════════════════════════════════════════════════════
// FINAL CTA SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function FinalCTASection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const handleBookDemo = () => {
    //window.open('https://calendly.com', '_blank');
    window.open('https://meetings.hubspot.com/olu-adedeji', '_blank');
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-24 sm:py-36 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/60 to-white"
    >
      {/* Decorative soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl" />
      </div>

      <div className={`relative max-w-5xl mx-auto px-6 text-center transition-all duration-[1000ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>

        {/* Pill badge */}
        <div className="inline-flex items-center px-4 py-2 bg-white/80 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-8 shadow-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>See it in 15 minutes</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
          Families deserve to know their options.{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
            You deserve the tools to show them.
          </span>
        </h2>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Screen care needs, show families how care can become affordable,
          and hand off planning to an elder law attorney, all on the first call.
        </p>

        {/* Benefit pills */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {[
            { icon: FileSearch, label: 'First names and rough estimates only' },
            { icon: ShieldCheck, label: 'Show what savings may be protected' },
            { icon: Briefcase, label: 'Prepare attorney-ready cases' },
          ].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-teal-100 rounded-xl text-slate-700 text-sm font-medium shadow-sm"
            >
              <item.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-12">
          <button
            onClick={handleBookDemo}
            className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Book a 15-Minute Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-sm text-slate-400">
            Set up within 48 hours
          </p>
        </div>
      </div>
    </section>
  );
}


export default LandingPage;