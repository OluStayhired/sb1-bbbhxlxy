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
  // ADD THESE NEW ONES:
  Phone,
  Activity,
  FileText,
  MessageCircle,
  ChevronRight,
  // NEW for Features section:
  Sliders,
  TrendingUp,
  AlertTriangle,
  CheckCircle2,
  Sparkles,
  Compass,
  Target,
  Handshake,
  // NEW for Old Way / New Way:
  X,
  Ban,
  Timer,
  Megaphone,
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



// ═══════════════════════════════════════════════════════════════════════════════
// CAROUSEL DATA
// ═══════════════════════════════════════════════════════════════════════════════

const CAROUSEL_PILLS = [
  { label: 'CSRA Calculation',    tooltip: 'Protects spouse savings limits',            icon: ShieldCheck },
  { label: 'Miller Trust',        tooltip: 'Resolves monthly income caps',              icon: Scale },
  { label: 'Spend-Down Math',     tooltip: 'Converts assets to exempt care',            icon: Calculator },
  { label: 'Care Gap',            tooltip: 'Validates 3+ ADL state rules',              icon: HeartPulse },
  { label: 'Look-Back Penalties', tooltip: 'Calculates gift ineligibility periods',     icon: Clock },
  { label: 'Spousal Diversion',   tooltip: 'Fills MMMNA income shortfalls',             icon: Users },
  { label: 'Home Exemptions',     tooltip: 'Applies caregiver child rules',             icon: Home },
  { label: 'VA Benefits',         tooltip: 'Integrates Aid & Attendance funds',         icon: Star },
  { label: 'Attorney Briefs',     tooltip: 'Packages files for referral partners',      icon: Briefcase },
  { label: 'Intake Triage',       tooltip: 'Automates 3-minute live screening',         icon: Zap },
  { label: 'AI Co-Pilot',         tooltip: 'Answers every complicated question',        icon: BrainCircuit },
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
          <span>The Financial Triage AI-Assistant</span>
        </div>

        {/* Headline */}
        <h1
          ref={headingRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-700 leading-tight tracking-tight transition-all duration-[1200ms] ease-out ${
            headingVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          Family Intake{' '}
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
            Intelligence
          </span>
          <br />
          <span
            className={`inline-block transition-all duration-[1400ms] ease-out delay-300 ${
              headingVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            for Home Care Agencies
          </span>
        </h1>

        {/* Sub-Headline */}
        {/*
        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal">
          Turn discovery calls into signed contracts and attorney referrals.
          <br className="hidden sm:block" />{' '}
          Poetiq unlocks hidden care funds using real-time{' '}
          <span className="font-semibold text-slate-600">Non-MAGI triage</span>.
        </p> */}

        <p className="mt-6 sm:mt-8 text-lg sm:text-xl md:text-2xl text-slate-500 max-w-3xl mx-auto leading-relaxed font-normal">
          Poetiq makes it easy for agency care teams to unlock hidden care funds 
          <br className="hidden sm:block" />{' '}
          for desperate families on the very first discovery call 
        </p>

        {/* CTA Button */}
        <div className="mt-10 sm:mt-12">
          <button
            onClick={handleBookDemo}
            className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Book a Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>

          {/* Trust Indicators */}
          <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-500">
            <div className="flex items-center space-x-2">
              <FileSearch className="w-4 h-4 text-teal-500" />
              <span>3-Minute Intake Screening</span>
            </div>
            <div className="flex items-center space-x-2">
              <CircleDollarSign className="w-4 h-4 text-teal-500" />
              <span>Unlock Hidden Care Funds</span>
            </div>
            <div className="flex items-center space-x-2">
              <Briefcase className="w-4 h-4 text-teal-500" />
              <span>Auto-Generate Attorney Briefs</span>
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
        What Poetiq delivers in Real-Time 👇
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
    tab: 'Screen Care Needs',
    tabIcon: Activity,
    title: 'Screen the care needs live',
    description: 'Validate ADL requirements (bathing, dressing, mobility) and flag financial care gaps in 60 seconds.',
    accent: 'teal',
  },
  {
    id: 'triage',
    num: '02',
    tab: 'Run Non-MAGI Triage',
    tabIcon: Calculator,
    title: 'Run real-time Non-MAGI triage',
    description: 'Calculate asset spend-downs using state-specific rules for CSRA protection and Miller Trust income caps.',
    accent: 'teal',
  },
  {
    id: 'brief',
    num: '03',
    tab: 'Generate Attorney Brief',
    tabIcon: FileText,
    title: 'Generate the attorney-ready brief',
    description: 'Secure high-ticket private-pay referrals from elder law firms with actionable diagnostic reports.',
    accent: 'teal',
  },
  {
    id: 'ellie',
    num: '04',
    tab: 'Consult Ellie AI',
    tabIcon: MessageCircle,
    title: 'Consult Ellie AI on the fly',
    description: 'Stuck on a tricky 60-month look-back penalty or asset transfer? Ask now, answer now.',
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
            {/*<span>Built for Home Care Intake Teams</span>*/}
            <span>What family intake intelligence does</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            {/*} How Poetiq Transforms Your{' '}*/}
            Resolves Complex Financial Gaps {' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              {/*Intake Calls in 3 Minutes*/}
              Answers Tricky Non-MAGI Questions
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            {/*Stop losing prospects to price sticker shock. Turn complex financial roadblocks into clear care funding opportunities.*/}
            Family intake teams feel empowered. Financial roadblocks get unblocked. Families uncover care funding opportunities. Home Care Agencies generate more revenue.
          </p>
        </div>

        {/* Flow Arrow Bar */}
        <div className={`hidden md:flex items-center justify-center gap-0 mb-14 transition-all duration-[1000ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          {[
            { label: 'Family Call', icon: Phone },
            { label: 'Screen Care Needs', icon: Activity },
            { label: 'Run Non-MAGI Triage', icon: Calculator },
            { label: 'Generate Brief', icon: FileText },
            { label: 'Consult Ellie AI', icon: MessageCircle },
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
                      Step 4 &middot; Consult Ellie AI
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
                      Step 3 &middot; Generate Attorney Brief
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
                      Step 2 &middot; Non-MAGI Triage
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
                      Step 1 &middot; Screen Care Needs
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
    headline: 'Accelerated Intake Triage',
    subheadline: 'Empower non-technical intake coordinators to conduct sophisticated financial triage and convert more families during an intake call.',
    label: 'How the Spend Down Planner Works for Your Intake Team',
    items: [
      {
        icon: ShieldCheck,
        title: 'Instant Spousal Asset Protection',
        badge: 'CSRA Active',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Automatically calculates the Community Spouse Resource Allowance asset shield and income floor, instantly reassuring families that a healthy spouse can retain savings without facing impoverishment.',
      },
      {
        icon: TrendingUp,
        title: 'Real-Time Income Spillage & Trust Analysis',
        badge: 'Miller Trust',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Instantly identifies when applicant income exceeds state caps, mapping out precise Miller Trust requirements and computing exact spousal income diversions to resolve financial shortfalls on the spot.',
      },
      {
        icon: Clock,
        title: 'Automated Exemption & Look-Back Tracking',
        badge: 'Penalty Detection',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Evaluates complex rules in seconds. For example, validating multi-year child caregiver co-residence exemptions and calculating exact look-back penalty months from past asset transfers.',
      },
      {
        icon: Sliders,
        title: 'Interactive What-If Scenario Sandbox',
        badge: 'Live Modeling',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Allows your team to model alternative spend-down strategies live on the call. Adjusting direct medical expenses, prepaid burial plans, and home accessibility repairs to instantly update remaining allocation targets.',
      },
    ],
  },
  {
    id: 'ask-ellie',
    image: 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_spend_v2.png',
    headline: 'Answers to Complex Family Inquiries',
    subheadline: 'Never get stuck on tricky Non-MAGI rules again. Get context-aware guidance on every financial scenario and close more care contracts on autopilot.',
    label: 'How Ellie Empowers Your Intake Team',
    items: [
      {
        icon: Users,
        title: 'Eliminate Guesswork on Spousal Protections',
        badge: 'CSRA & MMMNA',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Instantly clarify complex rules around Community Spouse Resource Allowances (CSRA) and income floors (MMMNA) so your staff can answer family questions with absolute authority.',
      },
      {
        icon: Scale,
        title: 'Instant Clarity on Income Spillage & Trusts',
        badge: 'State-Specific',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Get immediate, state-specific breakdowns on Miller Trust caps and spillage diversions, turning confusing financial hurdles into reassuring talking points.',
      },
      {
        icon: AlertTriangle,
        title: 'Navigate Look-Back Penalties with Ease',
        badge: 'Risk Mitigation',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Instantly evaluate look-back transfer penalties, asset gifts, and child caregiver exemptions on the fly without needing an elder law attorney on speed dial.',
      },
      {
        icon: Target,
        title: 'Turn Hesitation into Signed Contracts',
        badge: 'Conversion Boost',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Equip every intake coordinator with veteran-level knowledge, keeping distressed families engaged and dramatically increasing your discovery-call conversion rates.',
      },
    ],
  },
  {
    id: 'care-pilot',
    image: 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_pilot_v1.png',
    headline: 'Instant Care Gap Intelligence',
    subheadline: 'Transform messy family care inquiries into structured medical, legal, and financial action plans in 60 seconds. Guide families with absolute clarity.',
    label: 'How the Care Pilot Assessment Drives Agency Revenue',
    items: [
      {
        icon: Activity,
        title: 'Immediate Clinical & ADL Validation',
        badge: 'Care Needs',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Instantly evaluates a prospective client\'s care needs. For example, critical deficits in eating, bathing, and toileting to confirm immediate in-home care urgency and service fit.',
      },
      {
        icon: FileSearch,
        title: 'Automated Look-Back & Legal Flagging',
        badge: 'Compliance',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Detects complex financial hurdles, such as past asset transfers triggering Medicaid look-back penalty periods, so your team can proactively route families to qualified legal support.',
      },
      {
        icon: CircleDollarSign,
        title: 'Actionable Financial & Spend-Down Roadmaps',
        badge: 'Asset Strategy',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Flags high-asset scenarios exceeding standard limits (such as assets up to $150,000) and outlines precise legal spend-down strategies before families get overwhelmed.',
      },
      {
        icon: Handshake,
        title: 'Built-In Attorney Referral Network',
        badge: 'Revenue Pipeline',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Seamlessly connects families with local elder law specialists to package unconvertible financial cases into high-value reciprocal private-pay referral partnerships.',
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
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Platform Features</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            What You Get with{' '}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Poetiq
            </span>
          </h2>
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
      headline: 'Inquiries die at "we can\'t afford care"',
      body: 'Intake staff cannot navigate complex Non-MAGI limits, CSRA spousal asset shields, or Miller Trust caps. Families hang up assuming care is out of reach.',
    },
    after: {
      headline: '3-minute financial triage, live on the call',
      body: 'Your intake team proves care is fully achievable without risking spousal impoverishment, turning sticker shock into signed service agreements.',
    },
  },
  {
    num: '02',
    title: 'Diagnosing Care Gaps & Penalties',
    icon: Activity,
    before: {
      headline: 'Hours lost untangling ADL deficits',
      body: 'Staff spend hours manually checking medical needs while missing hidden financial traps like past asset transfers and look-back penalty periods.',
    },
    after: {
      headline: 'ADLs validated, penalties flagged in 60 seconds',
      body: 'The Care Pilot instantly validates care needs (eating, bathing, toileting deficits) and flags look-back transfer penalties automatically.',
    },
  },
  {
    num: '03',
    title: 'Turning Dead Leads Into Referrals',
    icon: Briefcase,
    before: {
      headline: 'Cold leads sit in your CRM as wasted spend',
      body: 'Price-sensitive inquiries never yield a return because no one packages them into anything an elder law attorney would act on.',
    },
    after: {
      headline: 'Attorney-ready briefs generated instantly',
      body: 'Complex spend-down and transfer cases are packaged into diagnostic reports that secure high-ticket private-pay referral partnerships with local elder law firms.',
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
            <span>Your Home Care Agency Transformation</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            From Stalled Inquiries to{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Successful Referral Partnerships
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            See how leading home care agencies replace manual financial guesswork with instant, real-time intake intelligence that attracts high-ticket attorneys.
          </p>
        </div>

        {/* Sub-label */}
        <div className={`text-center mb-10 transition-all duration-[900ms] delay-200 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
          <p className="text-xs font-bold text-slate-400 uppercase tracking-[0.2em]">
            The Three Shifts That Change Everything
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
              <Sparkles className="w-4 h-4 text-teal-600" />
            </div>
            <p className="text-sm text-slate-600">
              <span className="font-bold text-slate-800">Result:</span>{' '}
              Every family intake call becomes a conversion opportunity or a paid attorney referral.
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
            Trusted by agencies turning{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              intake calls into revenue.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Hear how this home care agency replaced financial guesswork with real-time triage and unlocked a high-ticket referral pipeline.
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
                "We were losing 40% of our inbound calls the moment families heard the cost of care. Our intake team had no way to explain Medicaid asset rules or spousal protections on the spot. With Poetiq, our coordinators now run a live financial triage in under three minutes. Families stay on the line, and we have closed more service agreements in one quarter than in the entire previous year. The attorney referral briefs alone have opened a private-pay pipeline we never knew existed."
              </p>

              <footer className="mt-8 pl-4 sm:pl-8 ml-4">
                <div className="flex items-center gap-4">
                  {/* Avatar placeholder */}
                  <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 border-2 border-teal-200 flex-shrink-0">
                    <Users className="w-5 h-5 text-teal-600" />
                  </div>
                  <div>
                    <p className="text-teal-700 font-bold text-base">
                      Sales Director, Regional Home Care Agency
                    </p>
                    <p className="text-slate-400 text-sm mt-0.5">
                      Multi-branch agency, Southeast U.S.
                    </p>
                  </div>
                </div>
              </footer>
            </blockquote>

            {/* Outcome Metrics */}
            <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
              {[
                { value: '3 min', label: 'Live financial triage per call' },
                { value: '40%', label: 'Fewer lost intake inquiries' },
                { value: 'New', label: 'Attorney referral revenue stream' },
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
            <span>Book a Demo</span>
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
        'Not at all. Poetiq is purpose-built for non-technical intake coordinators. The Spend Down Planner and Care Pilot walk your staff through every step with plain-language prompts. No knowledge of CSRA calculations, Miller Trust caps, or look-back rules required. Your team simply enters the family details and Poetiq does the financial reasoning in real time.',
    },
    {
      question: 'How will the attorney referral brief generate revenue for my agency?',
      answer:
        'When a family inquiry involves complex asset transfers or spend-down scenarios your agency cannot resolve alone, Poetiq packages the financial diagnostic into a professional, attorney-ready brief. You share that brief with a partnered elder law firm, who then converts the case into a private-pay engagement. In return, attorneys reciprocate with high-value referrals back to your agency, turning what used to be a dead lead into a recurring revenue partnership.',
    },
    {
      question: 'What does a "3-minute financial triage" look like during a live intake call?',
      answer:
        'While your intake coordinator is on the phone with a prospective family, they enter basic household and financial information into the Spend Down Planner. Poetiq instantly calculates spousal asset protections, flags income cap issues requiring a Miller Trust, checks for look-back penalties, and surfaces a clear spend-down roadmap. All before the family has time to say "we can\'t afford it." The entire process takes under three minutes and keeps families engaged on the call.',
    },
    {
      question: 'Is client data secure and compliant with healthcare privacy standards?',
      answer:
        'Yes. All client financial and medical data entered into Poetiq is protected with encryption at rest and in transit. Access is restricted to authorized team members within your agency. Poetiq is built on enterprise-grade infrastructure designed for healthcare data handling, so your compliance team can adopt it with confidence.',
    },
    {
      question: 'Can Poetiq handle state-specific Medicaid rules, or is it one-size-fits-all?',
      answer:
        'Poetiq is state-aware. The rules engine adapts to your state\'s specific Medicaid income caps, Community Spouse Resource Allowance thresholds, Miller Trust requirements, and look-back penalty calculations. Whether your agency operates in a single state or across multiple regions, the triage output reflects the exact regulatory landscape your families are subject to.',
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
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            Questions from Agency Leaders
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Everything your team needs to know about how Poetiq transforms your intake process.
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
          <span>See it in action in 15 minutes</span>
        </div>

        {/* Headline */}
        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
          Families Deserve Clarity.{' '}
          <br className="hidden sm:block" />
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
            Your Agency Deserves the Revenue.
          </span>
        </h2>

        {/* Sub-headline */}
        <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Uncover care funding, eliminate price objections,
          and turn more family discovery calls into signed care plans
          with intelligent Non-MAGI triage.
        </p>

        {/* Benefit pills */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {[
            { icon: HeartPulse, label: 'Close care gaps on the call' },
            { icon: ShieldCheck, label: 'Protect spousal assets instantly' },
            { icon: Briefcase, label: 'Generate attorney referral briefs' },
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
            <span>Book a Demo</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-sm text-slate-400">
            {/*Quick setup &middot; No commitment required*/}
            Quick setup &middot; Ready for you in 48hrs!
          </p>
        </div>
      </div>
    </section>
  );
}


export default LandingPage;