import {
    AlertTriangle,
    ArrowRight,
    Calculator,
    CheckCircle2,
    Compass,
    FileX,
    HeartHandshake,
    Info,
    Lightbulb,
    TrendingDown,
    UserRound,
    X,
  } from 'lucide-react';
  import { useRevealOnScroll } from './AffordabilitySections';
  
  const reveal = (v: boolean, from = 'translate-y-6') => (v ? 'opacity-100 translate-y-0' : `opacity-0 ${from}`);
  
  const CLIFF_BEFORE = [
    { title: 'Private pay', body: 'The family hires you to coordinate care, legal and medical.' },
    { title: 'Savings shrink', body: 'Nobody has mapped the money, so nobody sees the drop coming.' },
    { title: 'The cliff', body: 'Cash runs low. Your hours are the first thing cut.' },
    { title: 'Medicaid chaos', body: 'The family applies alone, misses a gift, and triggers a penalty.' },
  ];
  
  const CLIFF_AFTER = [
    { title: 'See the cliff early', body: 'Poetiq forecasts the month private funds run out.' },
    { title: 'Plan while still paid', body: 'You build the Medicaid roadmap as a billable deliverable.' },
    { title: 'Attorney gets the brief', body: 'Legal work goes to an elder law attorney, already organized.' },
    { title: 'You stay on as the guide', body: 'The family keeps you through the move to Medicaid.' },
  ];
  
  export function MedicaidCliffSection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  
    return (
      <section ref={ref} className="relative bg-slate-50 border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 lg:py-32">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              <TrendingDown className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>The Medicaid cliff</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight text-balance">
              Families let their Care Manager go{' '}
              <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
                the moment they need one most.
              </span>
            </h2>
            <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed text-pretty">
              Private pay runs dry right before families move to Medicaid. Poetiq warns you when it's coming and helps you plan for it.
            </p>
          </div>
  
          <div className="mt-10 sm:mt-16 grid gap-6 lg:grid-cols-2">
            <CliffTimeline
              tone="before"
              label="Without a plan"
              items={CLIFF_BEFORE}
              isVisible={isVisible}
              delay={150}
            />
            <CliffTimeline tone="after" label="With Poetiq" items={CLIFF_AFTER} isVisible={isVisible} delay={300} />
          </div>
  
          <div className={`mt-10 sm:mt-12 max-w-4xl mx-auto transition-all duration-[1000ms] delay-500 ease-out ${reveal(isVisible)}`}>
            <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 shadow-lg shadow-teal-600/5 p-6 sm:p-8">
              <div className="absolute inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-teal-500 to-teal-600" />
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20">
                  <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <p className="text-teal-900 text-base sm:text-xl font-semibold leading-relaxed text-pretty">
                  Turn the moment you'd get cut into the moment you're needed most.
                </p>
              </div>
            </div>
            <p className="mt-6 max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed text-center text-pretty">
              <Info className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 -mt-0.5 align-middle" />
              Poetiq is an education and organization tool. Eligibility is decided by your state's Medicaid office, and
              asset planning by a licensed attorney.
            </p>
          </div>
        </div>
      </section>
    );
  }
  
  function CliffTimeline({
    tone,
    label,
    items,
    isVisible,
    delay,
  }: {
    tone: 'before' | 'after';
    label: string;
    items: { title: string; body: string }[];
    isVisible: boolean;
    delay: number;
  }) {
    const before = tone === 'before';
    return (
      <div
        style={{ transitionDelay: `${delay}ms` }}
        className={`rounded-2xl border-2 p-6 sm:p-8 transition-all duration-700 ease-out ${
          before ? 'bg-white border-slate-200' : 'bg-teal-50/60 border-teal-200'
        } ${reveal(isVisible, 'translate-y-8')}`}
      >
        <span
          className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border ${
            before ? 'bg-rose-100 border-rose-200 text-rose-600' : 'bg-teal-100 border-teal-200 text-teal-800'
          }`}
        >
          {before ? <X className="w-3.5 h-3.5 mr-1.5" /> : <CheckCircle2 className="w-3.5 h-3.5 mr-1.5" />}
          {label}
        </span>
        <ol className="mt-6 space-y-5">
          {items.map((item, i) => {
            const isCliff = before && i === 2;
            return (
              <li key={item.title} className="relative flex gap-4">
                {i < items.length - 1 && (
                  <span
                    className={`absolute left-[15px] top-8 bottom-[-20px] w-px ${before ? 'bg-slate-200' : 'bg-teal-200'}`}
                  />
                )}
                <span
                  className={`relative flex h-8 w-8 shrink-0 items-center justify-center rounded-full text-xs font-bold ${
                    isCliff
                      ? 'bg-rose-500 text-white shadow-md shadow-rose-500/30'
                      : before
                        ? 'bg-slate-100 text-slate-500'
                        : 'bg-teal-600 text-white'
                  }`}
                >
                  {isCliff ? <AlertTriangle className="w-4 h-4" /> : i + 1}
                </span>
                <div>
                  <p className={`text-sm font-bold ${isCliff ? 'text-rose-600' : before ? 'text-slate-700' : 'text-teal-800'}`}>
                    {item.title}
                  </p>
                  <p className="mt-0.5 text-sm text-slate-500 leading-relaxed">{item.body}</p>
                </div>
              </li>
            );
          })}
        </ol>
      </div>
    );
  }
  
  const PERSONAS = [
    { role: 'Geriatric Care Manager', pain: 'Asset mapping eats your evenings and your weekends.', help: 'Map the money in minutes.' },
    { role: 'Aging Life Care Professional', pain: 'Standards of practice, no legal training.', help: 'Get education not advice.' },
    { role: 'Certified Senior Advisor', pain: 'Families ask Medicaid questions you can\'t answer.', help: 'State rules in plain language.' },
    { role: 'Nurse Care Manager', pain: 'Clinical expert, not a forensic accountant.', help: 'One view for care & funding.' },
    { role: 'Social Worker Care Manager', pain: 'Manually navigating complex benefits case by case.', help: 'Repeatable Medicaid roadmap.' },
    { role: 'Senior Living Advisor', pain: 'Placements stall when private pay families run out of funds.', help: 'Know the runway in advance.' },
    { role: 'Senior Care Advisor', pain: 'Families ask "Can we afford this?" with no real answer.', help: 'Show the path on the first visit.' },
    { role: 'Daily Money Manager', pain: 'You see the drop but can\'t plan the legal side.', help: 'Flag it. Connect an attorney.' },
  ];
  
  export function PersonasSection() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.1);
  
    return (
      <section ref={ref} className="relative bg-white border-t border-slate-200">
        <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24">
          <div className={`text-center max-w-3xl mx-auto transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
              <Compass className="w-4 h-4 mr-2 flex-shrink-0" />
              <span>Built for every Aging Care Professional</span>
            </div>
            <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight text-balance">
              Different titles.{' '}
              <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">Same cliff.</span>
            </h2>
          </div>
  
          <div className="mt-10 sm:mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {PERSONAS.map((p, i) => (
              <div
                key={p.role}
                style={{ transitionDelay: `${100 + i * 60}ms` }}
                className={`group rounded-2xl border border-slate-200 bg-white p-5 transition-all duration-700 ease-out hover:-translate-y-1 hover:border-teal-300 hover:shadow-lg hover:shadow-teal-600/5 ${reveal(isVisible)}`}
              >
                <p className="text-sm font-bold text-slate-800">{p.role}</p>
                <p className="mt-3 text-sm text-slate-500 leading-relaxed">{p.pain}</p>
                <p className="mt-3 flex items-start gap-1.5 text-sm font-semibold text-teal-700">
                  <ArrowRight className="w-4 h-4 mt-0.5 flex-shrink-0 transition-transform group-hover:translate-x-0.5" />
                  {p.help}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  
  const FIRST_VISIT_POINTS = [
    {
      icon: UserRound,
      title: 'First names only',
      description: 'No Social Security numbers, account numbers or full client records needed.',
    },
    {
      icon: Calculator,
      title: 'Rough numbers are fine',
      description: '~$250,000 in savings or about $3,100 a month is enough for a clear first map.',
    },
    {
      icon: FileX,
      title: 'No statements, no spreadsheets',
      description: 'Skip the bank-statement deep dive. The attorney confirms details later.',
    },
  ];
  
  export function FirstVisitBand() {
    const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);
  
    return (
      <section ref={ref} className="relative bg-slate-900 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute -top-24 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
          <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
        </div>
        <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
          <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10 sm:mb-12 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
            <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
              <Lightbulb className="w-6 h-6 text-teal-300" />
            </div>
            <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
              Map the money at the first visit.{' '}
              <br className="sm:hidden" />
              <span className="text-teal-300">Not over the weekend.</span>
            </h2>
          </div>
  
          <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
            {FIRST_VISIT_POINTS.map((point, i) => (
              <div
                key={point.title}
                style={{ transitionDelay: `${150 + i * 120}ms` }}
                className={`group border-t border-slate-700 hover:border-teal-400 pt-6 transition-all duration-700 ease-out ${reveal(isVisible)}`}
              >
                <point.icon className="w-6 h-6 text-teal-300 mb-4 transition-transform duration-300 group-hover:-translate-y-0.5" />
                <h3 className="text-lg font-semibold text-white">{point.title}</h3>
                <p className="mt-2 text-slate-300 leading-relaxed">{point.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }
  