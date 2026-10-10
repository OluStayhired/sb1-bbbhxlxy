import {
    ArrowRight,
    Ban,
    BookOpenText,
    Briefcase,
    CheckCircle2,
    Clock,
    Lightbulb,
    ShieldCheck,
    Timer,
    TrendingUp,
    Users,
    X,
  } from 'lucide-react';
  import { useRevealOnScroll } from './AffordabilitySections';
  import { BOOKING_URL } from '../utils/ellieConcierge';
  
  const reveal = (v: boolean, from = 'translate-y-6') => (v ? 'opacity-100 translate-y-0' : `opacity-0 ${from}`);
  
  export const openBookingPage = () => window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  
  const SHIFTS = [
    {
      num: '01',
      title: 'Mapping the Money',
      before: {
        headline: 'Six to ten unbillable hours per client',
        body: 'Bank statements, spreadsheets and state manuals, often on your own time.',
      },
      after: {
        headline: 'An asset map in about 20 minutes',
        body: 'Rough numbers in, state rules applied, cliff date and risks out.',
      },
    },
    {
      num: '02',
      title: 'Staying in Your Lane',
      before: {
        headline: 'Afraid of practicing law without a license',
        body: 'Families push for answers on trusts, deeds and annuities. One wrong word is a liability.',
      },
      after: {
        headline: 'Education with the line clearly marked',
        body: 'Poetiq explains the rule and flags what belongs with an elder law attorney.',
      },
    },
    {
      num: '03',
      title: 'Protecting Clients from Penalties',
      before: {
        headline: 'Missed gifts surface after the application',
        body: 'A transfer you never saw triggers a penalty, and the family remembers who was coordinating.',
      },
      after: {
        headline: 'Look-back risks flagged on day one',
        body: 'Gifts inside five years are caught before anyone files, while there is still time to plan.',
      },
    },
    {
      num: '04',
      title: 'Working with Attorneys',
      before: {
        headline: 'Hand-built briefs and messy handoffs',
        body: 'You rewrite the same case summary for every attorney, and still get follow-up calls.',
      },
      after: {
        headline: 'Attorney-ready brief in one click',
        body: 'Organized the way attorneys want it, so they plan faster and refer back to you.',
      },
    },
  ];
  
  export function CareManagerOldVsNewSection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.1);
  
    return (
      <section ref={ref} id="old-vs-new" className="relative bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
          <div className={`text-center mb-16 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
              <TrendingUp className="w-4 h-4 mr-2" />
              <span>What changes for your practice</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
              Less liability.{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
                More billable work.
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Stop being the forensic accountant and the legal researcher. Be the Care Manager.
            </p>
          </div>
  
          <div className={`hidden sm:grid grid-cols-2 gap-6 mb-6 max-w-5xl mx-auto transition-all duration-[900ms] delay-300 ease-out ${reveal(isVisible, 'translate-y-4')}`}>
            <div className="text-center">
              <span className="inline-flex items-center px-4 py-2 bg-rose-100 border border-rose-200 rounded-full text-rose-500 font-semibold text-sm">
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
  
          <div className="space-y-5 max-w-5xl mx-auto">
            {SHIFTS.map((shift, i) => (
              <div
                key={shift.num}
                className={`transition-all duration-[800ms] ease-out ${reveal(isVisible)}`}
                style={{ transitionDelay: `${400 + i * 150}ms` }}
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-600 text-white text-xs font-extrabold flex-shrink-0">
                    {shift.num}
                  </div>
                  <h3 className="text-base font-bold text-slate-800">{shift.title}</h3>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div className="bg-white border-2 border-slate-200 rounded-2xl p-5 sm:p-6 hover:border-slate-300 transition-colors duration-300">
                    <div className="sm:hidden mb-3">
                      <span className="inline-flex items-center px-3 py-1 bg-rose-100 border border-rose-200 rounded-full text-rose-500 font-medium text-xs">
                        <X className="w-3 h-3 mr-1" />
                        Before Poetiq
                      </span>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="flex items-center justify-center w-7 h-7 rounded-full bg-rose-100 flex-shrink-0 mt-0.5">
                        <Ban className="w-3.5 h-3.5 text-rose-400" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-slate-700 mb-1.5">{shift.before.headline}</p>
                        <p className="text-sm text-slate-500 leading-relaxed">{shift.before.body}</p>
                      </div>
                    </div>
                  </div>
                  <div className="bg-teal-50/60 border-2 border-teal-200 rounded-2xl p-5 sm:p-6 hover:border-teal-300 hover:shadow-md hover:shadow-teal-100/50 transition-all duration-300">
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
            ))}
          </div>
  
          <div className={`mt-14 text-center transition-all duration-[900ms] delay-700 ease-out ${reveal(isVisible, 'translate-y-4')}`}>
            <div className="inline-flex items-center gap-3 px-6 py-3 bg-white border border-teal-200 rounded-2xl shadow-sm text-left">
              <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-teal-100 flex-shrink-0">
                <Lightbulb className="w-4 h-4 text-teal-600" />
              </div>
              <p className="text-sm text-slate-600">
                <span className="font-bold text-slate-800">Result:</span> Every assessment ends with a billable
                deliverable, a protected client and a Care Manager who stays on the case.
              </p>
            </div>
          </div>
        </div>
      </section>
    );
  }
  
  export function CareManagerTestimonialSection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  
    return (
      <section ref={ref} id="testimonial" className="relative bg-white border-t border-slate-200">
        <div className="max-w-4xl mx-auto px-6 py-24 sm:py-32">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
              What changes when you{' '}
              <br />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
                see the cliff coming.
              </span>
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              The story we hear from Care Management practices serving private-pay clients.
            </p>
          </div>
  
          <div className={`transition-all duration-[1000ms] delay-200 ease-out ${reveal(isVisible)}`}>
            <div className="relative bg-gradient-to-br from-slate-50 to-white border-2 border-teal-100 rounded-2xl p-8 sm:p-12 shadow-lg shadow-teal-500/5 max-w-3xl mx-auto">
              <svg
                className="absolute top-6 left-6 sm:top-8 sm:left-8 w-12 h-12 sm:w-16 sm:h-16 text-teal-100"
                fill="currentColor"
                viewBox="0 0 32 32"
                aria-hidden="true"
              >
                <path d="M10 8c-3.3 0-6 2.7-6 6v10h10V14H8c0-1.1.9-2 2-2h2V8h-2zm14 0c-3.3 0-6 2.7-6 6v10h10V14h-6c0-1.1.9-2 2-2h2V8h-2z" />
              </svg>
  
              <blockquote className="relative z-10">
                <p className="text-lg sm:text-xl md:text-2xl text-slate-700 italic leading-relaxed pl-4 sm:pl-8 ml-4">
                  "We used to lose two or three long-term clients a year right when their savings ran low. Now we see the
                  cliff six months out, build the Medicaid plan while we're still engaged, and families keep us through
                  the transition."
                </p>
                <footer className="mt-8 pl-4 sm:pl-8 ml-4">
                  <div className="flex items-center gap-4">
                    <div className="flex items-center justify-center w-12 h-12 rounded-full bg-teal-100 border-2 border-teal-200 flex-shrink-0">
                      <Users className="w-5 h-5 text-teal-600" />
                    </div>
                    <div>
                      <p className="text-teal-700 font-bold text-base">Founder, Geriatric Care Management Practice</p>
                      <p className="text-slate-400 text-sm mt-0.5">Composite example</p>
                    </div>
                  </div>
                  <p className="mt-4 text-xs text-slate-400">
                    Illustrative composite based on common Care Manager experiences. Not a quote from a single client.
                  </p>
                </footer>
              </blockquote>
  
              <div className="mt-8 pt-8 border-t border-slate-200 grid grid-cols-1 sm:grid-cols-3 gap-4 sm:gap-6">
                {[
                  { value: '~20 min', label: 'Per asset map, down from 6 to 10 hours' },
                  { value: '6 months', label: 'Of warning before private pay runs out' },
                  { value: 'Kept', label: 'Clients stay through the move to Medicaid' },
                ].map((m) => (
                  <div key={m.value} className="text-center">
                    <p className="text-2xl sm:text-3xl font-extrabold text-teal-600">{m.value}</p>
                    <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-snug">{m.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
  
          <div className={`text-center mt-12 transition-all duration-[900ms] delay-400 ease-out ${reveal(isVisible, 'translate-y-4')}`}>
            <button
              type="button"
              onClick={openBookingPage}
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
  
  const FAQS = [
    {
      question: 'Am I practicing law if I use Poetiq?',
      answer:
        'No. Poetiq is an education and organization tool. It explains how Medicaid rules generally work in your state and organizes the facts. Anything that needs a legal decision, such as trusts, transfers, deeds, annuities or penalty cures, is flagged for an elder law attorney. You coordinate. The attorney advises.',
    },
    {
      question: 'Can I bill for the Medicaid roadmap?',
      answer:
        'Many Care Managers do. The roadmap is a professional deliverable built from your assessment, covering care, funding and next steps. How you package and price it is up to your practice.',
    },
    {
      question: 'Does Poetiq protect me from a penalty claim?',
      answer:
        'It lowers the risk, but it is not legal cover. Poetiq flags gifts and transfers inside the five-year look-back early, so they reach an attorney before anyone applies. Final eligibility and planning decisions stay with the attorney and the state.',
    },
    {
      question: "Does it fit my association's standards of practice?",
      answer:
        'Poetiq is designed around the same principles most Care Manager standards stress: stay within your scope, document clearly, and refer to licensed professionals for legal and financial advice. Always check the specific standards of your credentialing body.',
    },
    {
      question: 'What do I need from the family?',
      answer:
        'A first name and rough estimates: savings, monthly income, a spouse at home, any large gifts in the last five years, and the daily activities that need help. No statements needed on the first pass.',
    },
    {
      question: 'How is client information protected?',
      answer:
        'Poetiq needs very little personal information. No full names, Social Security numbers, account numbers or medical records. What you enter is encrypted when stored and sent, and only your practice can see it. We are working toward signed HIPAA business associate agreements. Until then, keep full client records in your existing systems.',
    },
    {
      question: 'Which states are covered?',
      answer:
        "Poetiq is state-aware. It applies each state's income limits, spousal protections, income-trust rules and look-back rules, so results reflect the rules your clients actually face.",
    },
    {
      question: 'How does this help my attorney referrals?',
      answer:
        'Attorneys get organized, attorney-ready briefs instead of scattered notes. Cleaner cases mean faster planning, and attorneys tend to refer their own clients to Care Managers who make their work easier.',
    },
  ];
  
  export function CareManagerFAQSection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  
    return (
      <section ref={ref} id="faq" className="relative bg-slate-50 border-t border-slate-200">
        <div className="max-w-3xl mx-auto px-6 py-24 sm:py-32">
          <div className={`text-center mb-12 sm:mb-16 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <div className="inline-flex items-center px-4 py-2 bg-gradient-to-r from-teal-600 to-teal-500 text-white rounded-full text-sm font-medium mb-6 shadow-sm">
              <BookOpenText className="w-4 h-4 mr-2" />
              <span>Frequently Asked Questions</span>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
              Questions from Care Managers
            </h2>
            <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
              Scope, liability, billing and data, answered straight.
            </p>
          </div>
  
          <div className={`space-y-4 transition-all duration-[1000ms] delay-200 ease-out ${reveal(isVisible)}`}>
            {FAQS.map((faq) => (
              <details
                key={faq.question}
                className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:border-teal-300 overflow-hidden transition-colors duration-200"
              >
                <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-slate-800 hover:bg-slate-50 hover:text-teal-700 transition-colors select-none list-none">
                  <span className="pr-4">{faq.question}</span>
                  <span className="relative w-6 h-6 flex-shrink-0 text-teal-500">
                    <svg className="absolute inset-0 w-6 h-6 group-open:hidden" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4" />
                    </svg>
                    <svg className="absolute inset-0 w-6 h-6 hidden group-open:block" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 12h16" />
                    </svg>
                  </span>
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
  
  export function CareManagerFinalCTASection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  
    return (
      <section
        ref={ref}
        className="relative py-24 sm:py-36 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/60 to-white"
      >
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl" />
        </div>
  
        <div className={`relative max-w-5xl mx-auto px-6 text-center transition-all duration-[1000ms] ease-out ${reveal(isVisible)}`}>
          <div className="inline-flex items-center px-4 py-2 bg-white/80 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-8 shadow-sm">
            <Clock className="w-4 h-4 mr-2" />
            <span>See it in 15 minutes</span>
          </div>
  
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            You protect families.{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Poetiq protects your time.
            </span>
          </h2>
  
          <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Map the money, see the cliff, and hand legal work to an attorney, all from your first assessment.
          </p>
  
          <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4">
            {[
              { icon: Timer, label: 'Hours back every week' },
              { icon: ShieldCheck, label: 'Stay inside your scope' },
              { icon: Briefcase, label: 'Attorney-ready in one click' },
            ].map((item) => (
              <div
                key={item.label}
                className="inline-flex items-center gap-2 px-4 py-2.5 bg-white/70 backdrop-blur-sm border border-teal-100 rounded-xl text-slate-700 text-sm font-medium shadow-sm"
              >
                <item.icon className="w-4 h-4 text-teal-500 flex-shrink-0" />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
  
          <div className="mt-12">
            <button
              type="button"
              onClick={openBookingPage}
              className="group inline-flex items-center space-x-3 bg-teal-600 hover:bg-teal-700 text-white px-8 py-4 sm:px-10 sm:py-5 rounded-xl text-lg sm:text-xl font-semibold shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40 transition-all duration-300 hover:-translate-y-0.5"
            >
              <span>Book a 15-Minute Demo</span>
              <ArrowRight className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1" />
            </button>
            <p className="mt-4 text-sm text-slate-400">Set up within 48 hours</p>
          </div>
        </div>
      </section>
    );
  }
  