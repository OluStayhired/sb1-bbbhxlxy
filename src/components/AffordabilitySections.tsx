import { useState, useEffect, useRef, type ReactNode } from 'react';
import {
  PhoneCall,
  Eye,
  Scale,
  ArrowRight,
  Info,
  UserRound,
  Calculator,
  FileX, Lightbulb, Speech, Sparkles, HeartHandshake,
} from 'lucide-react';

export function useRevealOnScroll<T extends Element>(threshold = 0.15) {
  const ref = useRef<T>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setIsVisible(true); },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);

  return { ref, isVisible };
}

const AFFORDABILITY_STEPS: { icon: typeof PhoneCall; title: string; description: ReactNode }[] = [
  {
    icon: PhoneCall,
    title: 'You screen the family',
    description:
      'During the first call, your coordinator enters a first name and rough estimates. Poetiq applies your state\'s Medicaid rules in real time.',
  },
  {
    icon: Eye,
    title: 'The family sees what\'s possible',
    description: (
      <>
        Instead of <em className="text-slate-700">full price until the money runs out</em>, they hear how much of a
        spouse's savings may be protected and whether they may qualify for Medicaid.
      </>
    ),
  },
  {
    icon: Scale,
    title: 'An attorney does the planning',
    description:
      'Poetiq prepares an organized brief so a local elder law attorney can structure the family\'s assets properly and help them apply.',
  },
];

export function HowCareBecomesAffordableSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();

  return (
    <section ref={ref} className="relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-6xl mx-auto px-5 sm:px-6 py-16 sm:py-24 lg:py-32">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-xs sm:text-sm font-medium mb-5 sm:mb-6">
            <Speech className="w-4 h-4 mr-2 flex-shrink-0" />
            <span>The conversation most families never get to have</span>
          </div>
          <h2 className="text-[1.75rem] sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight text-balance">
            Between paying full price and draining your entire savings,{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              there's a third option.
            </span>
          </h2>
          <p className="mt-4 text-base sm:text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed text-pretty">
            Instead of letting families walk away thinking they have to spend it all, Poetiq provides the clarity that helps you open that conversation on the very first call.
          </p>
        </div>

        <div className="mt-10 sm:mt-16 grid gap-4 sm:gap-6 md:grid-cols-3 relative">
          {AFFORDABILITY_STEPS.map((step, i) => (
            <div
              key={step.title}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
              className={`group relative bg-white border border-slate-200 hover:border-teal-300 rounded-2xl p-6 sm:p-8 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-teal-600/5 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-between mb-5 sm:mb-6">
                <div className="w-11 h-11 sm:w-12 sm:h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 transition-transform duration-300 group-hover:scale-105">
                  <step.icon className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <span className="text-sm font-semibold text-teal-600/70 tracking-wider">
                  0{i + 1}
                </span>
              </div>
              <h3 className="text-lg font-semibold text-slate-800 leading-snug">{step.title}</h3>
              <p className="mt-3 text-slate-600 leading-relaxed">{step.description}</p>
              {i < AFFORDABILITY_STEPS.length - 1 && (
                <ArrowRight className="hidden md:block absolute top-1/2 -right-5 w-4 h-4 text-teal-400 -translate-y-1/2" />
              )}
            </div>
          ))}
        </div>

        <div className={`mt-10 sm:mt-12 max-w-4xl mx-auto transition-all duration-[1000ms] delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-teal-50 to-white border border-teal-200 shadow-lg shadow-teal-600/5 p-6 sm:p-8">
            <div className="absolute inset-y-0 left-0 w-1 sm:w-1.5 bg-gradient-to-b from-teal-500 to-teal-600" />
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 sm:gap-6">
              <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center flex-shrink-0 shadow-md shadow-teal-600/20">
                <HeartHandshake className="w-5 h-5 sm:w-6 sm:h-6" />
              </div>
              <p className="text-teal-900 text-base sm:text-xl font-semibold leading-relaxed text-pretty">
                The family gets an affordable path to care. Your agency gets a client, whether care starts as
                private-pay while the application is processed or is covered by Medicaid once they qualify.
              </p>
            </div>
          </div>
          <p className="mt-6 max-w-2xl mx-auto text-xs sm:text-sm text-slate-400 leading-relaxed text-center text-pretty">
            <Info className="inline-block w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 -mt-0.5 align-middle" />
            Poetiq is a screening and education tool. Eligibility and asset planning are decided by your state's
            Medicaid office and a licensed attorney.
          </p>
        </div>
      </div>
    </section>
  );
}

const NO_PAPERWORK_POINTS = [
  {
    icon: UserRound,
    title: 'Just a first name',
    description: 'No full names, Social Security numbers, or account numbers needed to run a screening.',
  },
  {
    icon: Calculator,
    title: 'Rough numbers are fine',
    description: ' ~$200,000 in savings or around $2,800 a month is all Poetiq needs to show a clear first picture.',
  },
  {
    icon: FileX,
    title: 'No documents needed',
    description: 'Families share what they know, details confirmed later with an attorney. No stress mid-call. ',
  },
];

export function NoPaperworkBand() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.2);

  return (
    <section ref={ref} className="relative bg-slate-900 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-24 left-1/4 w-96 h-96 bg-teal-500/10 rounded-full blur-3xl" />
        <div className="absolute -bottom-24 right-1/4 w-96 h-96 bg-teal-400/10 rounded-full blur-3xl" />
      </div>
      <div className="relative max-w-6xl mx-auto px-5 sm:px-6 py-14 sm:py-20">
        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-6 mb-10 sm:mb-12 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
            <Lightbulb className="w-6 h-6 text-teal-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Get clarity on the first call.{' '}<br className="sm:hidden" />
            <span className="text-teal-300">No paperwork required.</span>
          </h2>
        </div>

        <div className="grid gap-6 sm:gap-8 md:grid-cols-3">
          {NO_PAPERWORK_POINTS.map((point, i) => (
            <div
              key={point.title}
              style={{ transitionDelay: `${150 + i * 120}ms` }}
              className={`group border-t border-slate-700 hover:border-teal-400 pt-6 transition-all duration-700 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}
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
