import { useState, type ComponentType } from 'react';
import {
  Activity,
  AlertTriangle,
  Calculator,
  CalendarClock,
  ChevronRight,
  CircleDollarSign,
  ClipboardCheck,
  Clock,
  FileText,
  Gavel,
  Handshake,
  Home,
  MessageCircle,
  Package,
  Route,
  Scale,
  ShieldCheck,
  Timer,
  Users,
} from 'lucide-react';
import { useRevealOnScroll } from './AffordabilitySections';
import { ScreenCareNeedsMock } from './ScreenCareNeedsMock';
import { NonMagiMock } from './NonMagiMock';
import { AttorneyBriefMock } from './AttorneyBriefMock';
import { SpendDownPillModalMock } from './SpendDownPillModalMock';

const reveal = (v: boolean, from = 'translate-y-6') => (v ? 'opacity-100 translate-y-0' : `opacity-0 ${from}`);

const STEPS: {
  id: string;
  num: string;
  tab: string;
  icon: typeof Activity;
  title: string;
  description: string;
  Mock: ComponentType;
}[] = [
  {
    id: 'assess',
    num: '01',
    tab: 'Assess Care Needs',
    icon: Activity,
    title: 'Assess care needs',
    description:
      "Record the daily activities your client needs help with and whether they likely meet your state's care-need requirement. Part of the assessment you already do.",
    Mock: ScreenCareNeedsMock,
  },
  {
    id: 'map',
    num: '02',
    tab: 'Map the Money and the Cliff',
    icon: Calculator,
    title: 'Map the money and the cliff date',
    description:
      "Enter rough savings, income and gifts from the last five years. Poetiq applies your state's Medicaid rules, flags penalty risks and shows when private pay runs out.",
    Mock: NonMagiMock,
  },
  {
    id: 'brief',
    num: '03',
    tab: 'Hand Off to an Attorney',
    icon: FileText,
    title: 'Hand off to an attorney',
    description:
      'One click turns your map into an attorney-ready brief. Legal decisions stay with the attorney. You stay the coordinator.',
    Mock: AttorneyBriefMock,
  },
  {
    id: 'ellie',
    num: '04',
    tab: 'Ask Ellie Anytime',
    icon: MessageCircle,
    title: 'Ask Ellie, without crossing the line',
    description:
      '"Dad added my brother to the deed in 2021. Is that a problem?" Ellie explains the rule for your state and tells you when it\'s attorney territory.',
    Mock: SpendDownPillModalMock,
  },
];

const FLOW = [
  { label: 'Assessment', icon: ClipboardCheck },
  { label: 'Care Needs', icon: Activity },
  { label: 'Money & Cliff', icon: Calculator },
  { label: 'Attorney Brief', icon: FileText },
  { label: 'Ask Ellie Anytime', icon: MessageCircle },
];

export function CareManagerHowItWorksSection() {
  const [active, setActive] = useState(0);
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>();
  const current = STEPS[active];

  return (
    <section ref={ref} id="how-it-works" className="relative bg-slate-50 border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className={`text-center mb-16 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Route className="w-4 h-4 mr-2" />
            <span>How it works</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            From unbillable hours{' '}
            <br className="hidden sm:block" />
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              to a billable Medicaid roadmap.
            </span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            No forensic accounting. No legal research. Poetiq applies your state's rules and keeps you inside your
            scope of practice.
          </p>
        </div>

        <div className={`hidden md:flex items-center justify-center mb-14 transition-all duration-[1000ms] delay-200 ease-out ${reveal(isVisible, 'translate-y-4')}`}>
          {FLOW.map((item, i) => (
            <div key={item.label} className="flex items-center">
              <button
                type="button"
                disabled={i === 0}
                onClick={() => setActive(i - 1)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs font-semibold transition-all duration-300 ${
                  i === 0
                    ? 'bg-teal-600 text-white shadow-md shadow-teal-200/50 cursor-default'
                    : i - 1 === active
                      ? 'bg-teal-100 text-teal-800 border border-teal-300 shadow-sm'
                      : 'bg-white text-slate-500 border border-slate-200 hover:border-teal-200 hover:text-teal-700'
                }`}
              >
                <item.icon className="w-3.5 h-3.5" />
                <span>{item.label}</span>
              </button>
              {i < FLOW.length - 1 && <ChevronRight className="w-4 h-4 text-slate-300 mx-1 flex-shrink-0" />}
            </div>
          ))}
        </div>

        <div className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start transition-all duration-[1000ms] delay-300 ease-out ${reveal(isVisible)}`}>
          <div className="space-y-3">
            {STEPS.map((step, i) => {
              const isActive = i === active;
              return (
                <button
                  key={step.id}
                  type="button"
                  onClick={() => setActive(i)}
                  className={`group w-full text-left rounded-2xl border-2 transition-all duration-300 overflow-hidden ${
                    isActive
                      ? 'border-teal-300 bg-white shadow-lg shadow-teal-100/50'
                      : 'border-slate-200 bg-white/60 hover:border-teal-200 hover:bg-white hover:shadow-sm'
                  }`}
                >
                  <div className="flex items-center gap-4 px-5 py-4">
                    <div
                      className={`flex items-center justify-center w-10 h-10 rounded-xl text-sm font-extrabold transition-colors duration-300 ${
                        isActive ? 'bg-teal-600 text-white' : 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-600'
                      }`}
                    >
                      {step.num}
                    </div>
                    <div className="flex items-center gap-2 flex-1">
                      <step.icon className={`w-4 h-4 ${isActive ? 'text-teal-600' : 'text-slate-400 group-hover:text-teal-500'}`} />
                      <span className={`text-sm font-bold ${isActive ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'}`}>
                        {step.tab}
                      </span>
                    </div>
                    <div className={`w-2 h-2 rounded-full transition-all duration-300 ${isActive ? 'bg-teal-500 scale-100' : 'scale-0'}`} />
                  </div>
                  <div className={`transition-all duration-300 ease-out overflow-hidden ${isActive ? 'max-h-48 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <div className="px-5 pb-5 pl-[4.75rem]">
                      <h3 className="text-lg font-bold text-slate-800 mb-2 leading-snug">{step.title}</h3>
                      <p className="text-sm text-slate-500 leading-relaxed">{step.description}</p>
                      <div className="mt-4 flex items-center gap-2">
                        {STEPS.map((s, j) => (
                          <div key={s.id} className={`h-1 rounded-full flex-1 ${j <= i ? 'bg-teal-500' : 'bg-slate-200'}`} />
                        ))}
                      </div>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="hidden lg:block">
            <div className="sticky top-32">
              <div key={current.id} className="relative rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/40 overflow-hidden max-h-[620px] animate-fade-in">
                <div className="flex items-center gap-2 px-5 py-3 bg-gradient-to-r from-teal-50 to-white border-b border-slate-100">
                  <current.icon className="w-4 h-4 text-teal-600" />
                  <span className="text-xs font-bold text-teal-700">
                    Step {active + 1} &middot; {current.tab}
                  </span>
                </div>
                <div className="p-4">
                  <current.Mock />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

const IMG_BASE = 'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage';

const FEATURES = [
  {
    id: 'spend-down',
    image: `${IMG_BASE}/poetiq_hero_v3.png`,
    headline: 'An asset map in minutes.',
    subheadline:
      "Enter rough estimates during the assessment. Poetiq applies your state's Medicaid rules and shows what's protected, what's at risk and when the money runs out.",
    label: 'What the Spend Down Planner maps for you',
    items: [
      {
        icon: CalendarClock,
        title: 'Forecast the Medicaid Cliff',
        badge: 'Cliff Date',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'See the month private pay runs out, so you plan the Medicaid move while you are still engaged.',
      },
      {
        icon: ShieldCheck,
        title: "Protect the Healthy Spouse's Savings",
        badge: 'CSRA',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Calculates what the spouse at home can keep and the monthly income they are entitled to.',
      },
      {
        icon: Clock,
        title: 'Flag Gifts Before They Trigger a Penalty',
        badge: '5-Year Look-Back',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Spots transfers inside the look-back and estimates the penalty period, before anyone files.',
      },
      {
        icon: Scale,
        title: 'Spot Income Over the Limit',
        badge: 'Miller Trust',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Flags income above your state\'s cap and names the trust an attorney can set up to fix it.',
      },
    ],
  },
  {
    id: 'ask-ellie',
    image: `${IMG_BASE}/poetiq_hero_spend_v3.png`,
    headline: 'Medicaid rules, decoded.',
    subheadline:
      'Ellie answers the questions families throw at you in plain language, with your state\'s numbers, and tells you when it\'s time to bring in an attorney.',
    label: 'Questions Ellie helps you answer',
    items: [
      {
        icon: Users,
        title: 'Can we pay my sister for caregiving?',
        badge: 'Care Agreements',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'Explains how a written care agreement keeps payments from being treated as a gift.',
      },
      {
        icon: CircleDollarSign,
        title: 'Should Mom buy an annuity?',
        badge: 'Attorney Territory',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Explains the concept, then flags it as legal planning so you refer instead of advise.',
      },
      {
        icon: Timer,
        title: 'What happens after rehab day 100?',
        badge: 'Medicare to Medicaid',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Walks through when Medicare stops paying and what the family needs ready next.',
      },
      {
        icon: Home,
        title: 'Dad added my brother to the deed. Problem?',
        badge: 'Look-Back',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Explains why it can count as a transfer and why an elder law attorney should review it.',
      },
    ],
  },
  {
    id: 'care-pilot',
    image: `${IMG_BASE}/poetiq_hero_pilot_v1.png`,
    headline: 'Medicaid roadmap for families.',
    subheadline:
      'Turn your assessment into a polished, institutional-grade roadmap across care, legal and funding. A deliverable you can bill for.',
    label: 'What the Care Pilot gives you and the family',
    items: [
      {
        icon: Route,
        title: 'Client-Ready Medicaid Roadmap',
        badge: 'Billable',
        badgeColor: 'bg-teal-100 text-teal-700 border-teal-200',
        description: 'A clear, step-by-step plan from private pay to Medicaid that families understand and value.',
      },
      {
        icon: AlertTriangle,
        title: 'Legal Flags, Not Legal Advice',
        badge: 'Scope Guardrails',
        badgeColor: 'bg-red-100 text-red-700 border-red-200',
        description: 'Marks every item that needs an attorney, so you stay on the right side of practicing law.',
      },
      {
        icon: Gavel,
        title: 'Attorney-Ready Brief in One Click',
        badge: 'Case Brief',
        badgeColor: 'bg-amber-100 text-amber-700 border-amber-200',
        description: 'Assets, income, care needs and look-back flags, organized the way elder law attorneys want them.',
      },
      {
        icon: Handshake,
        title: 'Stronger Attorney Referrals',
        badge: 'Referrals',
        badgeColor: 'bg-green-100 text-green-700 border-green-200',
        description: 'Attorneys who get clean cases from you send clients back to you for care management.',
      },
    ],
  },
];

export function CareManagerFeaturesSection() {
  const { ref, isVisible } = useRevealOnScroll<HTMLElement>(0.08);

  return (
    <section ref={ref} id="features" className="relative bg-white border-t border-slate-200">
      <div className="max-w-7xl mx-auto px-6 py-24 sm:py-32">
        <div className={`text-center mb-20 transition-all duration-[900ms] ease-out ${reveal(isVisible)}`}>
          <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium mb-6">
            <Package className="w-4 h-4 mr-2" />
            <span>Three tools, one assessment</span>
          </div>
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
            What you get with{' '}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">Poetiq</span>
          </h2>
          <p className="mt-4 text-lg text-slate-500 max-w-2xl mx-auto leading-relaxed">
            Spend Down Planner maps the money. Ellie decodes the rules. <br className='hidden sm:block'/> Care Pilot builds the roadmap.
          </p>
        </div>

        <div className="space-y-24 sm:space-y-32">
          {FEATURES.map((feature, i) => (
            <FeatureBlock key={feature.id} feature={feature} reversed={i % 2 !== 0} isVisible={isVisible} delay={i * 150} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureBlock({
  feature,
  reversed,
  isVisible,
  delay,
}: {
  feature: (typeof FEATURES)[number];
  reversed: boolean;
  isVisible: boolean;
  delay: number;
}) {
  const [openItem, setOpenItem] = useState(0);

  const content = (
    <div className="space-y-6">
      <div>
        <h3 className="text-2xl sm:text-3xl font-bold text-slate-800 leading-snug tracking-tight">{feature.headline}</h3>
        <p className="mt-3 text-base text-slate-500 leading-relaxed max-w-lg">{feature.subheadline}</p>
      </div>
      <p className="text-xs font-bold text-teal-600 uppercase tracking-widest">{feature.label}</p>
      <div className="space-y-2.5">
        {feature.items.map((item, i) => {
          const isOpen = i === openItem;
          return (
            <button
              key={item.title}
              type="button"
              onClick={() => setOpenItem(isOpen ? -1 : i)}
              className={`group w-full text-left rounded-xl border transition-all duration-300 overflow-hidden ${
                isOpen
                  ? 'border-teal-200 bg-white shadow-lg shadow-teal-100/40'
                  : 'border-slate-200 bg-slate-50/50 hover:border-teal-200 hover:bg-white hover:shadow-sm'
              }`}
            >
              <div className="flex items-center gap-3 px-4 py-3.5">
                <div
                  className={`flex items-center justify-center w-8 h-8 rounded-lg flex-shrink-0 transition-colors duration-300 ${
                    isOpen ? 'bg-teal-100 text-teal-600' : 'bg-slate-100 text-slate-400 group-hover:bg-teal-50 group-hover:text-teal-500'
                  }`}
                >
                  <item.icon className="w-4 h-4" />
                </div>
                <span className={`text-sm font-semibold flex-1 ${isOpen ? 'text-slate-800' : 'text-slate-600 group-hover:text-slate-800'}`}>
                  {item.title}
                </span>
                <span
                  className={`hidden sm:inline text-[10px] font-bold px-2 py-0.5 rounded-full border transition-all duration-300 ${
                    isOpen ? item.badgeColor : 'bg-slate-100 text-slate-400 border-slate-200'
                  }`}
                >
                  {item.badge}
                </span>
                <ChevronRight className={`w-4 h-4 text-slate-400 flex-shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-90' : ''}`} />
              </div>
              <div className={`transition-all duration-300 ease-out overflow-hidden ${isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'}`}>
                <p className="px-4 pb-4 pl-[3.25rem] text-sm text-slate-500 leading-relaxed">{item.description}</p>
              </div>
            </button>
          );
        })}
      </div>
    </div>
  );

  const image = (
    <div className="hidden lg:block">
      <div className="sticky top-32">
        <div className="relative rounded-2xl border border-slate-200 bg-gradient-to-br from-white to-slate-50 shadow-xl shadow-slate-200/40 overflow-hidden">
          <img src={feature.image} alt={feature.headline} className="w-full h-auto block" />
          <div className="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent pointer-events-none" />
        </div>
      </div>
    </div>
  );

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-start transition-all duration-[1000ms] ease-out ${reveal(isVisible, 'translate-y-8')}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {reversed ? (
        <>
          {image}
          {content}
        </>
      ) : (
        <>
          {content}
          {image}
        </>
      )}
    </div>
  );
}
