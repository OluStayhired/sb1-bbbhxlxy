import { useState, useEffect, useRef } from 'react';
import {
  PhoneCall,
  Eye,
  Scale,
  ArrowRight,
  Info,
  UserRound,
  Calculator,
  HeartHandshake,
  FileX, Lightbulb, Phone, Speech,
} from 'lucide-react';

function useRevealOnScroll<T extends Element>(threshold = 0.15) {
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

const AFFORDABILITY_STEPS = [
  {
    icon: PhoneCall,
    title: 'You screen the family',
    description:
      'During the first call, your coordinator enters a first name and rough estimates. Poetiq applies your state\'s Medicaid rules in real time.',
  },
  {
    icon: Eye,
    title: 'The family sees what\'s possible',
    description:
      'Instead of "full price until the money runs out," they hear how much of a spouse\'s savings may be protected and whether they may qualify for Medicaid.',
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
    <section ref={ref} className="relative bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 py-24 sm:py-32">
        <div className={`text-center max-w-3xl mx-auto transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Speech className="w-4 h-4 mr-2" />
            <span>The conversation most families never get to have</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            {/*Between "full price" and "drain everything,"{' '}*/}
            Between paying full price and draining your entire savings,{' '}<br/>
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              there's a third option.
            </span>
          </h2>
          <p className="mt-6 text-lg text-slate-500 leading-relaxed">
            {/*Most families believe they have two choices: pay for care until their savings are gone, or go without.
            Many don't know that with proper legal planning, they may qualify for Medicaid while a spouse keeps much
            of what they've saved. Poetiq helps your team open that conversation on the very first call.*/}
            Instead of letting families walk away thinking they have to spend it all, Poetiq provides the clarity that helps you open that conversation on the very first call. 
          </p>
        </div>

        <div className="mt-16 grid gap-6 md:grid-cols-3 relative">
          {AFFORDABILITY_STEPS.map((step, i) => (
            <div
              key={step.title}
              style={{ transitionDelay: `${150 + i * 150}ms` }}
              className={`group relative bg-slate-50 hover:bg-white border border-slate-200 hover:border-teal-300 rounded-2xl p-8 transition-all duration-700 ease-out hover:shadow-lg hover:shadow-teal-600/5 hover:-translate-y-1 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'}`}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="w-12 h-12 rounded-xl bg-teal-600 text-white flex items-center justify-center shadow-md shadow-teal-600/20 transition-transform duration-300 group-hover:scale-105">
                  <step.icon className="w-6 h-6" />
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

        <div className={`mt-12 max-w-4xl mx-auto transition-all duration-[1000ms] delay-500 ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="rounded-2xl bg-gradient-to-r from-teal-600 to-teal-500 p-6 sm:p-8 text-center shadow-lg shadow-teal-600/20">
            <p className="text-white text-lg sm:text-xl font-medium leading-relaxed">
              The family gets an affordable path to care. Your agency gets a client, whether care starts as
              private-pay while the application is processed or is covered by Medicaid once they qualify.
            </p>
          </div>
          <p className="mt-6 flex items-start justify-center gap-2 text-sm text-slate-400 text-center">
            <Info className="w-4 h-4 mt-0.5 flex-shrink-0" />
            <span>
              Poetiq is a screening and education tool. Eligibility and asset planning are decided by your state's
              Medicaid office and a licensed attorney.
            </span>
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
    //icon: HeartHandshake,   
    //title: 'Families stay comfortable',
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
      <div className="relative max-w-6xl mx-auto px-6 py-16 sm:py-20">
        <div className={`flex flex-col md:flex-row md:items-center gap-4 md:gap-8 mb-12 transition-all duration-[900ms] ease-out ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-6'}`}>
          <div className="w-12 h-12 rounded-xl bg-teal-500/15 border border-teal-400/30 flex items-center justify-center flex-shrink-0">
            {/*<FileX className="w-6 h-6 text-teal-300" />*/}
            <Lightbulb className="w-6 h-6 text-teal-300" />
          </div>
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white leading-tight tracking-tight">
            Get clarity on the first call.{' '}
            <span className="text-teal-300">No paperwork required.</span>
          </h2>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
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
