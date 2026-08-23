import { useState, useEffect, useRef } from 'react';
import {
  ArrowRight,
  HeartPulse,
  CircleDollarSign,
  Search,
  Star,
  Sparkles,
  ShieldCheck,
  CheckCircle2,
  X,
  Heart,
  Clock,
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { EldercareModalPopUpSmall } from '../components/EldercareModalPopUpSmall';
import { EligibilityModal } from '../components/EligibilityModal';
import { StressCoachModal } from '../components/StressCoachModal';
import { AuthModal } from '../components/AuthModal';
import { PageFooter } from '../components/PageFooter';
import { PageMenuNav } from '../components/PageMenuNav';

function LandingPage() {
  useAuth();

  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);
  const [isEldercareSmallModalOpen, setIsEldercareSmallModalOpen] = useState(false);
  const [isEligibilityModalOpen, setIsEligibilityModalOpen] = useState(false);
  const [isStressCoachModalOpen, setIsStressCoachModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsEldercareSmallModalOpen(true);
    }, 3000);
    return () => clearTimeout(timer);
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
  const closeEligibilityModal = () => setIsEligibilityModalOpen(false);
  const closeStressCoachModal = () => setIsStressCoachModalOpen(false);
 
  return (
    <>
      <div id="top_page" className="min-h-screen bg-white">
        {/* Navigation */}
        <div className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
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

        {/* ===================== HERO SECTION ===================== */}
        <HeroSection
          onStartAssessment={openOnboardingModal}
        />

        {/* ===================== THREE PILLARS ===================== */}
        <ThreePillarsSection />

        {/* ===================== BEFORE & AFTER ===================== */}
        <BeforeAfterSection />

        {/* ===================== SOCIAL PROOF ===================== */}
        <SocialProofSection onJoinCommunity={openCommunityModal} />

        {/* ===================== FAQ ===================== */}
        <FAQSection />

        {/* ===================== FINAL CTA ===================== */}
        <FinalCTASection onStartAssessment={openOnboardingModal} />

        {/* Footer */}
        <PageFooter onOpenOnboardingModal={openOnboardingModal} />
      </div>

      {/* Modals */}
      <AuthModal isOpen={isAuthModalOpen} onClose={() => setIsAuthModalOpen(false)} />
      <CommunityModal isOpen={isCommunityModalOpen} onClose={closeCommunityModal} />
      <OnboardingQuestionsModal isOpen={isOnboardingModalOpen} onClose={closeOnboardingModal} />
      {/*
      <EldercareModalPopUpSmall
        isOpen={isEldercareSmallModalOpen}
        onClose={() => setIsEldercareSmallModalOpen(false)}
        onStartOnboarding={() => {
          setIsEldercareSmallModalOpen(false);
          openOnboardingModal();
        }}
      />
      */}
      <EligibilityModal isOpen={isEligibilityModalOpen} onClose={closeEligibilityModal} />
      <StressCoachModal isOpen={isStressCoachModalOpen} onClose={closeStressCoachModal} />
    </>
  );
}

{/* ================================================================
   HERO SECTION
   ================================================================ */}
function HeroSection({ onStartAssessment }: { onStartAssessment: () => void }) {
   const loginUrl = 'https://app.poetiq.io/login';   
   const headingRef = useRef<HTMLHeadingElement>(null);
   const [headingVisible, setHeadingVisible] = useState(false);
 
   useEffect(() => {
     // Small delay so the fade feels intentional, not just a loading flash
     const timer = setTimeout(() => setHeadingVisible(true), 150);
     return () => clearTimeout(timer);
   }, []);

const handleGetStartedClick = () => {
   window.location.href = loginUrl;
 };
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-red-50/40 via-white to-white">
      <div className="max-w-5xl mx-auto px-6 pt-20 pb-8 sm:pt-32 sm:pb-12 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-red-50 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-8">
          <HeartPulse className="w-4 h-4 mr-2" />
          <span>Serving family carers nationwide</span>
        </div>

        <h1
          ref={headingRef}
          className={`text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold text-slate-700 leading-tight tracking-tight transition-all duration-[1200ms] ease-out ${
            headingVisible
              ? 'opacity-100 translate-y-0'
              : 'opacity-0 translate-y-4'
          }`}
        >
          Care{' '}
          <span className="bg-gradient-to-r from-red-500 to-red-400 text-transparent bg-clip-text">
            Operating System
          </span>{' '}
          <br/>
          <span
            className={`inline-block transition-all duration-[1400ms] ease-out delay-300 ${
              headingVisible
                ? 'opacity-100 translate-y-0'
                : 'opacity-0 translate-y-3'
            }`}
          >
            for family caregivers
          </span>
        </h1>

          {/* WHAT -- product positioning statement */}
          <p className="mt-6 sm:mt-8 text-xl sm:text-2xl md:text-3xl text-slate-600 max-w-3xl mx-auto leading-snug font-semibold tracking-tight">
          {/*The Only Care Operating System for Family Caregivers*/}
          We bring order to the chaos of elder care
        </p>

        {/* HOW -- supporting value proposition */}
        <p className="mt-3 sm:mt-4 text-base sm:text-lg md:text-xl text-gray-500 max-w-2xl mx-auto leading-relaxed font-normal">
          Close care gaps, qualify for Medicaid and seamlessly <br/> manage
          your parent's care journey. All in one place.
        </p>

        <div className="mt-10 sm:mt-12">
          <button
            //onClick={onStartAssessment}
            onClick={handleGetStartedClick}
            className="group inline-flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Start Your Free Assessment</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          {/*<p className="mt-4 text-sm text-gray-500">
            Free &middot; 3 minutes &middot; No account required
          </p>
          */}

   {/* Trust Indicators */}
    <div className="hidden sm:flex flex-wrap items-center justify-center gap-6 mt-8 text-sm text-gray-600">
      
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-teal-500" />
        <span>No Upfront Costs</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-teal-500" />
        <span>Uncover Care Gaps</span>
      </div>
      <div className="flex items-center space-x-2">
        <CheckCircle2 className="w-5 h-5 text-teal-500" />
        <span>Download Action Plan</span>
      </div>
  </div>
        {/*End Trust Indicators*/}


          
        </div>
      </div>

      {/* Product Hero Image -- outside the text container for full-width presence */}
      <div className="max-w-6xl mx-auto px-6 pb-20 sm:pb-32">
        <div className="relative overflow-hidden rounded-2xl shadow-2xl shadow-red-200/60 transform transition-all duration-300 hover:scale-[1.01] border border-red-100 hover:border-red-300 hover:shadow-red-300/50">
          <img
            //src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v2.png"
            src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq_hero_v3.png"
            alt="Poetiq Dashboard"
            className="w-full h-auto object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/5 to-transparent pointer-events-none" />
        </div>
      </div>
    </section>
  );
}


/* ================================================================
   THREE PILLARS SECTION
   ================================================================ */
   function ThreePillarsSection() {
    const pillars = [
      {
        icon: HeartPulse,
        hook: 'Uncover the blind spots.',
        title: 'Manage Care',
        description:
          'Identify missing legal & medical documents, calculate your readiness score, and collaborate with your siblings to share the load.',
        iconColor: 'text-red-500',
        bgColor: 'bg-red-50 group-hover:bg-red-100',
      },
      {
        icon: CircleDollarSign,
        hook: "Protect your family's assets.",
        title: 'Manage Money',
        description:
          'Navigate state-specific Medicaid rules, evaluate Miller Trusts, and avoid devastating unspent income traps before the turn of the month.',
        iconColor: 'text-green-500',
        bgColor: 'bg-green-50 group-hover:bg-green-100'
      },
      {
        icon: Search,
        hook: 'Source trusted help.',
        title: 'Find Services',
        description:
          'In 60secs, you can source in-home care, adult family living homes, and residential facilities, then audit them for quality & value with 1-click.',
        iconColor: 'text-amber-600',
        bgColor: 'bg-amber-50 group-hover:bg-amber-100'
      },
    ];
  
    return (
      <section id="HowItWorks" className="scroll-mt-24 py-20 sm:py-32 bg-gray-50/50">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
            <h2 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-normal">
              3 hardest parts of elder care,{' '}
              <span className="text-red-500">finally simplified.</span>
            </h2>
  
            <h2 className="sm:hidden text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight">
              The three hardest parts of elder care,{' '}
              <span className="text-red-500">finally simplified.</span>
            </h2>
            
            <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
              Whether you are untangling medical paperwork, figuring out Medicaid asset rules, or
              sourcing local care, Poetiq keeps your entire family aligned across three core
              modules.
            </p>
          </div>
  
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {pillars.map((pillar) => (
              <div
                key={pillar.title}
                className="group bg-white border-2 border-gray-100 hover:border-red-300 rounded-2xl p-8 sm:p-10 shadow-sm hover:shadow-xl hover:shadow-red-500/10 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`flex items-center justify-center w-14 h-14  rounded-2xl mb-6 ${pillar.bgColor} transition-colors duration-300`}>
                  <pillar.icon className={`w-7 h-7 ${pillar.iconColor}`} />
                </div>
                <p className="text-slate-400 font-bold text-lg mb-2">{pillar.hook}</p>
                <h3 className="text-2xl font-bold text-slate-700 mb-4">{pillar.title}</h3>
                <p className="text-gray-600 leading-relaxed">{pillar.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

/* ================================================================
   BEFORE & AFTER SECTION
   ================================================================ */
function BeforeAfterSection() {
  const comparisons = [
    {
      before:
        'Scrambling through scattered paperwork and endless Google tabs at midnight.',
      after:
        'A structured, real-time Care readiness assessment completed in 3 minutes.',
    },
    {
      before:
        //'Arguing with siblings over who is doing what, missing crucial deadlines.',
        'Arguing with siblings over what to prioritize next, and who is doing what',
      after:
        'Coordinating tasks seamlessly with shared action plans and real-time AI Support.',
    },
    {
      before:
        'Terrified of making a costly mistake with Medicaid forms and asset spend-down.',
      after:
        'Using state-specific intelligence to optimize filing dates and protect assets safely.',
    },
  ];

  return (
    <section id="BeforeAfter" className="scroll-mt-24 py-20 sm:py-32">
      <div className="max-w-5xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto mb-16 sm:mb-20">
        <h2 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-relaxed">
            From midnight guesswork{' '}<br/>
            <span className="text-teal-500">to complete clarity.</span>
          </h2>

          <h2 className="sm:hidden text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight">
            From midnight guesswork{' '}<br/>
            <span className="text-teal-500">to complete clarity.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed">
            See the difference between piecing things together alone at 2 AM and having a
            complete, structured roadmap for your family.
          </p>
        </div>

        {/* Column headers */}
        <div className="hidden sm:grid grid-cols-2 gap-6 mb-6">
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 bg-gray-100 border border-gray-200 rounded-full text-gray-600 font-semibold text-sm">
              <X className="w-4 h-4 text-gray-400 mr-2" />
              The Hard Way (Doing It Alone)
            </span>
          </div>
          <div className="text-center">
            <span className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-600 font-semibold text-sm">
              <CheckCircle2 className="w-4 h-4 text-teal-500 mr-2" />
              The Poetiq Way
            </span>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {comparisons.map((row, i) => (
            <div key={i} className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Before */}
              <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 sm:p-8">
                <div className="sm:hidden mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-gray-100 border border-gray-200 rounded-full text-gray-500 font-medium text-xs">
                    <X className="w-3 h-3 mr-1" />
                    Doing It Alone
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <X className="hidden sm:block w-5 h-5 text-gray-400 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-600 leading-relaxed">{row.before}</p>
                </div>
              </div>
              {/* After */}
              <div className="bg-teal-50/60 border border-teal-200 rounded-xl p-6 sm:p-8">
                <div className="sm:hidden mb-3">
                  <span className="inline-flex items-center px-3 py-1 bg-teal-50 border border-teal-200 rounded-full text-teal-600 font-medium text-xs">
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    The Poetiq Way
                  </span>
                </div>
                <div className="flex items-start space-x-3">
                  <CheckCircle2 className="hidden sm:block w-5 h-5 text-teal-500 flex-shrink-0 mt-0.5" />
                  <p className="text-gray-800 leading-relaxed font-medium">{row.after}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   SOCIAL PROOF / EMPATHY SECTION
   ================================================================ */
function SocialProofSection({ onJoinCommunity }: { onJoinCommunity: () => void }) {

     const loginUrl = 'https://app.poetiq.io/login';   

const handleGetStartedClick = () => {
    // This will trigger a full page reload to the specified URL.
    window.location.href = loginUrl;
  };
  return (
    <section id="SocialProof" className="scroll-mt-24 py-20 sm:py-32 bg-gray-50/50">
      <div className="max-w-4xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
        <h2 className="hidden sm:block text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-loose">
            Trusted by families navigating the{' '}
            <span className="text-red-500 mt-2">weight of caregiving.</span>
          </h2>
          <h2 className="sm:hidden text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight">
            Trusted by families navigating the{' '}
            <span className="text-red-500 mt-2">weight of caregiving.</span>
          </h2>
          <p className="mt-6 text-lg sm:text-xl text-gray-600 leading-relaxed max-w-2xl mx-auto">
            Read how families like yours used Poetiq to replace midnight panic with a clear,
            step-by-step roadmap.
          </p>
        </div>

        {/* Testimonial card */}
        <div className="relative bg-white border-2 border-red-100 rounded-2xl p-8 sm:p-12 shadow-lg shadow-red-500/5 max-w-3xl mx-auto">
          {/* Decorative quote mark */}
          <svg
            className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 text-red-100"
            fill="currentColor"
            viewBox="0 0 32 32"
          >
            <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
          </svg>

          <blockquote className="relative z-10">
            <p className="text-lg ml-4 sm:text-xl md:text-2xl text-gray-700 italic leading-relaxed pl-4 sm:pl-8">
              "I was trying to coordinate care for Dad from three states away while my sister
              was drowning in daily caregiving. Poetiq gave us a single source of truth so we
              finally stopped guessing and started executing."
            </p>
            <footer className="mt-8 pl-4 sm:pl-8">
              <p className="text-red-500 font-bold text-lg">— A Family Caregiver's Journey</p>
              <p className="text-gray-500 text-sm mt-1">
                Multi-state family coordination, 2024
              </p>
            </footer>
          </blockquote>
        </div>

        <div className="text-center mt-12">
          <button
            onClick={handleGetStartedClick}
            className="group inline-flex items-center space-x-2 border-2 border-red-400 text-red-500 hover:bg-red-500 hover:text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-300 shadow-sm hover:shadow-lg hover:shadow-red-500/20"
          >
            <span>Get Started for Free</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FAQ SECTION
   ================================================================ */
function FAQSection() {
  const faqs = [
    {
      question: 'What do I actually get with the free Care Pulse assessment?',
      answer:
        'A 3-minute readiness score that reveals missing legal and medical documents, highlights financial vulnerabilities, and surfaces a burnout risk summary for your specific caregiving situation, all before you spend a cent.',
    },
    {
      question: 'How does the token and pass system work?',
      answer:
        'Poetiq uses flexible daily care passes and pay-as-you-go care tokens so you only pay for what you use. There is no rigid enterprise lock-in, scale up on busy days and scale down when things are quiet.',
    },
    {
      question: 'How does Spend Down Genius help with Medicaid?',
      answer:
        'Our state-specific rules engine calculates Medicaid asset thresholds, evaluates whether a Miller Trust applies in your state for your specific situation, and alerts you to unspent income traps before the turn of the month, all in plain language.',
    },
    {
      question: 'Is our family\'s medical and financial data secure?',
      answer:
        'Absolutely. All sensitive documents stored in the Spend Down Planner Vault are protected with HIPAA approved encryption. Only authorized family members can access the information.',
    },
    {
      question: 'How do I share information with out-of-town siblings?',
      answer:
        'Every report and assessment can be downloaded as a professional PDF and emailed directly to siblings, financial planners, or elder law attorneys, keeping everyone aligned without extra phone calls.',
    },
  ];

  return (
    <section id="FAQ" className="scroll-mt-24 py-20 sm:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12 sm:mb-16">
          <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-red-500 to-red-400 text-white rounded-full text-sm font-medium mb-6">
            <Sparkles className="w-4 h-4 mr-2" />
            <span>Frequently Asked Questions</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight">
            Have Questions?
          </h2>
          <p className="mt-4 text-lg sm:text-xl text-gray-600 leading-relaxed">
            Everything you need to know about how Poetiq supports your family.
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, i) => (
            <details
              key={i}
              className="group bg-white rounded-xl shadow-sm border border-gray-200 hover:border-red-400 overflow-hidden transition-colors duration-200"
            >
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-gray-800 hover:bg-gray-50 transition-colors hover:text-red-500 select-none">
                <span className="pr-4">{faq.question}</span>
                <div className="relative w-6 h-6 flex-shrink-0">
                  <svg
                    className="absolute inset-0 w-6 h-6 text-red-500 group-open:hidden transition-opacity duration-300"
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
                    className="absolute inset-0 w-6 h-6 text-red-500 hidden group-open:block transition-opacity duration-300"
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
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-gray-600 leading-relaxed">
                <p>{faq.answer}</p>
              </div>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ================================================================
   FINAL CTA SECTION
   ================================================================ */
function FinalCTASection({ onStartAssessment }: { onStartAssessment: () => void }) {

       const loginUrl = 'https://app.poetiq.io/login';   

const handleGetStartedClick = () => {
    // This will trigger a full page reload to the specified URL.
    window.location.href = loginUrl;
  };
  
  return (
    //<section className="relative py-24 sm:py-36 overflow-hidden bg-gradient-to-b from-gray-50 via-red-50/60 to-red-50/80 to-red-50/60 to-red-50/40 to-white">
    <section className="relative py-24 sm:py-36 overflow-hidden bg-gradient-to-b from-gray-50 via-red-50/60 to-white">
    
      {/* Decorative soft glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-red-200/20 rounded-full blur-3xl" />
      </div>

      <div className="relative max-w-5xl mx-auto px-6 text-center">
        {/* Pill badge -- mirrors the hero badge style */}
        <div className="inline-flex items-center px-4 py-2 bg-white/80 border border-red-200 rounded-full text-red-600 text-sm font-medium mb-8 shadow-sm">
          <Clock className="w-4 h-4 mr-2" />
          <span>Get Clarity in 60 seconds</span>
        </div>

        <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight">
          Your family deserves{' '}
          <span className="bg-gradient-to-r from-red-500 to-red-400 text-transparent bg-clip-text">
            clarity.
          </span>
        </h2>

        <p className="mt-6 text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
          See exactly where your care plan stands, uncover hidden gaps, and get a
          step-by-step roadmap. All from a single free assessment.
        </p>

        {/* Benefit pills -- horizontal on desktop, stacked on mobile */}
        <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
          {[
            { icon: HeartPulse, label: 'Close care gaps' },
            { icon: ShieldCheck, label: 'Protect assets' },
            { icon: Search, label: 'Find trusted care' },
          ].map((item, i) => (
            <div
              key={i}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-red-100 rounded-xl text-gray-700 text-sm font-medium shadow-sm"
            >
              <item.icon className="w-4 h-4 text-red-500 flex-shrink-0" />
              <span>{item.label}</span>
            </div>
          ))}
        </div>

        {/* CTA button */}
        <div className="mt-12">
          <button
            onClick={handleGetStartedClick}
            className="group inline-flex items-center space-x-3 bg-red-500 hover:bg-red-600 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-red-500/30 hover:shadow-xl hover:shadow-red-500/40 transition-all duration-300 hover:-translate-y-0.5"
          >
            <span>Start Your Free Assessment</span>
            <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
          </button>
          <p className="mt-4 text-sm text-gray-500">
            {/*Free &middot; No account required*/}
            Instant relief for family caregivers
          </p>
        </div>
      </div>
    </section>
  );
}



export default LandingPage;