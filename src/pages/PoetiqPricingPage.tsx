import { useState, useEffect, type ReactNode } from 'react';
import {
  ArrowRight,
  Check,
  X,
  Users,
  Receipt,
  BatteryCharging,
  Building2,
  Handshake,
  Sparkles,
  Clock,
  MonitorSmartphone,
  FileDown,
  ShieldCheck,
  MapPin,
  CalendarCheck,
  FileSignature,
  Award,
  FileSearch,
  HeartHandshake,
  LayoutDashboard,
  History,
  Info,
} from 'lucide-react';
import { CommunityModal } from '../components/CommunityModal';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { PageFooter } from '../components/PageFooter';
import { PageMenuNavIntake } from '../components/PageMenuNavIntake';
import { LockedBriefPreview } from '../components/LockedBriefPreview';

const DEMO_URL = 'https://meetings.hubspot.com/olu-adedeji';
const SOURCE_URL = 'https://www.longtermcarepoll.org/long-term-caregiving-the-true-costs-of-caring-for-aging-adults/';

const bookDemo = () => window.open(DEMO_URL, '_blank');

type Billing = 'monthly' | 'annual';

const fmt = (n: number) =>
  n.toLocaleString('en-US', { minimumFractionDigits: n % 1 === 0 ? 0 : 2, maximumFractionDigits: 2 });

export function PoetiqPricingPage() {
  const [billing, setBilling] = useState<Billing>('annual');
  const [isCommunityModalOpen, setIsCommunityModalOpen] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const navProps = {
    onOpenCommunityModal: () => setIsCommunityModalOpen(true),
    onOpenOnboardingModal: () => setIsOnboardingModalOpen(true),
  };

  return (
    <>
      <div className="min-h-screen bg-white">
        <div className="hidden sm:block sticky top-0 z-50 bg-white/80 backdrop-blur-md shadow-sm">
          <PageMenuNavIntake {...navProps} />
        </div>
        <div className="sm:hidden">
          <PageMenuNavIntake {...navProps} />
        </div>

        <PricingHero />
        <PlansSection billing={billing} onBillingChange={setBilling} />
        <WhyProSection />
        <CapacitySection />
        <IncludedSection />
        <PricingFAQ />
        <PricingFinalCTA />

        <PageFooter onOpenOnboardingModal={navProps.onOpenOnboardingModal} />
      </div>

      <CommunityModal isOpen={isCommunityModalOpen} onClose={() => setIsCommunityModalOpen(false)} />
      <OnboardingQuestionsModal isOpen={isOnboardingModalOpen} onClose={() => setIsOnboardingModalOpen(false)} />
    </>
  );
}

function DemoButton({ label = 'Book a Demo', variant = 'primary' }: { label?: string; variant?: 'primary' | 'outline' | 'dark' }) {
  const styles = {
    primary: 'bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/30 hover:shadow-xl hover:shadow-teal-600/40',
    outline: 'bg-white text-slate-700 border border-slate-300 hover:border-teal-400 hover:text-teal-700',
    dark: 'bg-slate-900 hover:bg-slate-800 text-white shadow-lg shadow-slate-900/20',
  }[variant];
  return (
    <button
      onClick={bookDemo}
      className={`group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5 ${styles}`}
    >
      <span>{label}</span>
      <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
    </button>
  );
}

function SectionPill({ icon: Icon, children }: { icon: typeof Sparkles; children: ReactNode }) {
  return (
    <div className="inline-flex items-center px-4 py-2 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-sm font-medium">
      <Icon className="w-4 h-4 mr-2" />
      <span>{children}</span>
    </div>
  );
}

// ─── Hero ────────────────────────────────────────────────────────────────────

function PricingHero() {
  const stats = [
    { value: '8 in 10', label: 'family caregivers pay for care out of their own pocket' },
    { value: '43%', label: 'have dipped into their savings to cover care costs' },
    { value: '~1 in 4', label: 'provide care equal to a full-time job' },
  ];

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-teal-50/40 via-white to-white">
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[900px] h-[500px] bg-teal-100/30 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-6xl mx-auto px-6 pt-20 pb-16 sm:pt-28 text-center">
        <SectionPill icon={Receipt}>Simple pricing for home care agencies</SectionPill>
        <h1 className="mt-8 text-4xl sm:text-5xl md:text-6xl font-bold text-slate-700 leading-tight tracking-tight">
          When families hear your price,{' '}
          <br className="hidden md:block" />
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
            they need a plan, not a no.
          </span>
        </h1>
        <p className="mt-6 text-lg sm:text-xl text-slate-500 max-w-2xl mx-auto leading-relaxed">
          Poetiq helps your intake team show families how they can pay for care, right on the first call.
          One flat monthly price. No surprises.
        </p>

        <div className="mt-12 grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {stats.map((s) => (
            <div key={s.value} className="bg-white rounded-2xl border border-slate-200 p-6 shadow-sm text-left hover:border-teal-300 hover:shadow-md transition-all duration-300">
              <p className="text-3xl font-bold text-teal-600">{s.value}</p>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{s.label}</p>
            </div>
          ))}
        </div>
        <p className="mt-4 text-xs text-slate-400">
          Source:{' '}
          <a href={SOURCE_URL} target="_blank" rel="noopener noreferrer" className="underline hover:text-teal-600">
            AP-NORC Long-Term Care Poll, 2018
          </a>
        </p>

        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-sm text-slate-600">
          {[
            { icon: Users, label: 'Your whole team, no per-seat fees' },
            { icon: Receipt, label: 'Billed by invoice' },
            { icon: BatteryCharging, label: 'Top up anytime' },
          ].map((r) => (
            <span key={r.label} className="inline-flex items-center gap-2">
              <r.icon className="w-4 h-4 text-teal-500" />
              {r.label}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Plans ───────────────────────────────────────────────────────────────────

const STARTER_FEATURES = [
  'Guided care funding assessment on every intake call',
  'Spend-down planner that shows families a funding path',
  'Instant answers to tough family questions',
  'Nursing home, assisted living and memory care finders',
  'Family tasks, milestones and care calendar',
  'Caregiver dashboard for your team',
];

function PlansSection({ billing, onBillingChange }: { billing: Billing; onBillingChange: (b: Billing) => void }) {
  const annual = billing === 'annual';

  return (
    <section id="plans" className="relative bg-white pb-24">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex flex-col items-center">
          <div className="relative inline-flex p-1 bg-slate-100 rounded-xl border border-slate-200">
            {(['monthly', 'annual'] as const).map((b) => (
              <button
                key={b}
                onClick={() => onBillingChange(b)}
                className={`relative px-6 py-2.5 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  billing === b ? 'bg-white text-slate-800 shadow-sm' : 'text-slate-500 hover:text-slate-700'
                }`}
              >
                {b === 'monthly' ? 'Monthly' : 'Annual'}
                {b === 'annual' && (
                  <span className="ml-2 px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 text-[11px] font-semibold">
                    2 months free
                  </span>
                )}
              </button>
            ))}
          </div>
          <p className="mt-3 text-sm text-slate-400">
            {annual ? 'Paid upfront once a year. You pay for 10 months, get 12.' : 'Billed monthly. Switch to annual anytime.'}
          </p>
        </div>

        <div className="mt-14 grid lg:grid-cols-3 gap-6 lg:gap-8 items-stretch">
          <PlanCard
            name="Starter"
            tagline="Win more families on the call"
            monthly={199}
            annualTotal={1990}
            annual={annual}
            capacity="Up to ~15 intakes / month"
            features={STARTER_FEATURES}
            excluded="Downloadable Attorney-Ready Briefs"
          />
          <PlanCard
            name="Pro"
            tagline="Turn the families you can't serve into referral partners"
            monthly={299}
            annualTotal={2990}
            annual={annual}
            capacity="Up to ~40 intakes / month"
            highlight
            features={['Downloadable Attorney-Ready Briefs', 'Everything in Starter', 'Double the intake capacity, so top-ups are rarely needed']}
          />
          <EnterpriseCard />
        </div>

        <p className="mt-8 text-center text-xs text-slate-400">
          Intake capacity is an estimate. Starter includes 10M care tokens per month and Pro includes 20M; a typical intake uses 600k–750k.
        </p>
      </div>
    </section>
  );
}

interface PlanCardProps {
  name: string;
  tagline: string;
  monthly: number;
  annualTotal: number;
  annual: boolean;
  capacity: string;
  features: string[];
  excluded?: string;
  highlight?: boolean;
}

function PlanCard({ name, tagline, monthly, annualTotal, annual, capacity, features, excluded, highlight }: PlanCardProps) {
  const perMonth = annual ? annualTotal / 12 : monthly;
  const saving = monthly * 12 - annualTotal;

  return (
    <div
      className={`relative flex flex-col rounded-2xl p-8 transition-all duration-300 ${
        highlight
          ? 'bg-white border-2 border-teal-500 shadow-2xl shadow-teal-600/15 lg:-translate-y-4 hover:shadow-teal-600/25'
          : 'bg-white border border-slate-200 shadow-xl shadow-slate-200/40 hover:border-slate-300'
      }`}
    >
      {highlight && (
        <div className="absolute -top-4 left-1/2 -translate-x-1/2 whitespace-nowrap px-4 py-1.5 bg-teal-600 text-white text-xs font-semibold rounded-full shadow-md">
          Best value for growing agencies
        </div>
      )}
      <h3 className="text-xl font-bold text-slate-800">{name}</h3>
      <p className="mt-2 text-slate-500 leading-snug min-h-[48px]">{tagline}</p>

      <div className="mt-6 flex items-end gap-1">
        <span className="text-5xl font-bold text-slate-800 tracking-tight">${fmt(perMonth)}</span>
        <span className="pb-1.5 text-slate-500">/mo</span>
      </div>
      <div className="mt-2 min-h-[44px] text-sm">
        {annual ? (
          <>
            <p className="text-slate-500">${annualTotal.toLocaleString('en-US')} billed annually upfront</p>
            <p className="font-semibold text-emerald-600">You save ${saving} a year</p>
          </>
        ) : (
          <p className="text-slate-500">Billed monthly by invoice</p>
        )}
      </div>

      <div className={`mt-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold ${highlight ? 'bg-teal-50 text-teal-800' : 'bg-slate-50 text-slate-700'}`}>
        <Clock className="w-4 h-4 text-teal-600" />
        {capacity}
      </div>

      <div className="mt-6">
        <DemoButton variant={highlight ? 'primary' : 'outline'} />
      </div>

      <ul className="mt-8 space-y-3.5 flex-1">
        {features.map((f, i) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className={`mt-0.5 flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center ${highlight && i === 0 ? 'bg-teal-600' : 'bg-teal-100'}`}>
              <Check className={`w-3 h-3 ${highlight && i === 0 ? 'text-white' : 'text-teal-700'}`} />
            </span>
            <span className={highlight && i === 0 ? 'font-semibold text-slate-800' : 'text-slate-600'}>{f}</span>
          </li>
        ))}
        {excluded && (
          <li className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-slate-100 flex items-center justify-center">
              <X className="w-3 h-3 text-slate-400" />
            </span>
            <span className="text-slate-400">
              <span className="line-through">{excluded}</span>
              <span className="ml-2 text-xs font-semibold text-teal-700">Pro only</span>
            </span>
          </li>
        )}
      </ul>
    </div>
  );
}

function EnterpriseCard() {
  const features = [
    'Briefs branded with your agency',
    'Multi-location setup',
    'Workflows tailored to your states and process',
    'Hands-on onboarding for your team',
    'A dedicated point of contact',
    'Security and compliance paperwork',
  ];
  return (
    <div className="relative flex flex-col rounded-2xl p-8 bg-slate-900 text-white shadow-xl shadow-slate-900/20">
      <h3 className="text-xl font-bold">Enterprise</h3>
      <p className="mt-2 text-slate-300 leading-snug min-h-[48px]">Built around your organization</p>
      <div className="mt-6 flex items-end">
        <span className="text-5xl font-bold tracking-tight">Let's talk</span>
      </div>
      <p className="mt-2 min-h-[44px] text-sm text-slate-400">Pricing shaped to your locations and volume</p>
      <div className="mt-6 flex items-center gap-2 px-4 py-3 rounded-xl text-sm font-semibold bg-white/10 text-white">
        <Building2 className="w-4 h-4 text-teal-300" />
        Capacity sized to your organization
      </div>
      <div className="mt-6">
        <button
          onClick={bookDemo}
          className="group w-full inline-flex items-center justify-center gap-2 px-6 py-3.5 rounded-xl font-semibold bg-white text-slate-900 hover:bg-teal-50 transition-all duration-300 hover:-translate-y-0.5"
        >
          <span>Talk to us</span>
          <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" />
        </button>
      </div>
      <p className="mt-8 text-sm font-semibold text-slate-300">Everything in Pro, plus:</p>
      <ul className="mt-4 space-y-3.5 flex-1">
        {features.map((f) => (
          <li key={f} className="flex items-start gap-3 text-sm">
            <span className="mt-0.5 flex-shrink-0 w-5 h-5 rounded-full bg-teal-500/20 flex items-center justify-center">
              <Check className="w-3 h-3 text-teal-300" />
            </span>
            <span className="text-slate-200">{f}</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

// ─── Why Pro ─────────────────────────────────────────────────────────────────

function WhyProSection() {
  return (
    <section className="relative bg-slate-50 border-y border-slate-200 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-3xl mx-auto">
          <SectionPill icon={Handshake}>Why most agencies choose Pro</SectionPill>
          <h2 className="mt-6 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-700 leading-tight tracking-tight">
            Not every family is your client.{' '}
            <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">
              Every family can be a referral.
            </span>
          </h2>
          <p className="mt-5 text-lg text-slate-500 leading-relaxed">
            Some families need legal planning before they can start care. Pro lets you hand that case to an elder law attorney,
            so the relationship keeps working for you after the call ends.
          </p>
        </div>

        <div className="mt-16 grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 bg-white p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">With Starter</p>
              <div className="mt-3 flex items-start gap-3">
                <MonitorSmartphone className="w-5 h-5 text-slate-400 mt-0.5 flex-shrink-0" />
                <p className="text-slate-600 leading-relaxed">
                  Your team reviews the case on screen and guides the family. When the call ends, the opportunity ends there.
                </p>
              </div>
            </div>
            <div className="rounded-2xl border-2 border-teal-500 bg-white p-6 shadow-lg shadow-teal-600/10">
              <p className="text-xs font-semibold uppercase tracking-wider text-teal-600">With Pro</p>
              <div className="mt-3 flex items-start gap-3">
                <FileDown className="w-5 h-5 text-teal-600 mt-0.5 flex-shrink-0" />
                <p className="text-slate-700 leading-relaxed">
                  The case is packaged into a ready-to-send brief for an elder law attorney. They save hours of discovery,
                  and they now have a reason to send families back to you.
                </p>
              </div>
            </div>

            <div className="grid sm:grid-cols-2 gap-4 pt-2">
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <p className="text-3xl font-bold text-slate-800">≈ $3<span className="text-lg text-slate-500 font-medium">/day</span></p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">The difference between Starter and Pro (+$100/mo).</p>
              </div>
              <div className="rounded-2xl bg-white border border-slate-200 p-6">
                <p className="text-3xl font-bold text-slate-800">$249<span className="text-lg text-slate-500 font-medium">/mo</span></p>
                <p className="mt-2 text-sm text-slate-500 leading-relaxed">Pro on annual billing. Just $50 more than Starter monthly.</p>
              </div>
            </div>
            <p className="text-sm text-slate-500 leading-relaxed">
              If a single attorney referral becomes a client, Pro has paid for itself.
            </p>
          </div>

          <LockedBriefPreview />
        </div>
      </div>
    </section>
  );
}

// ─── Capacity ────────────────────────────────────────────────────────────────

function CapacitySection() {
  return (
    <section className="bg-white py-24">
      <div className="max-w-4xl mx-auto px-6">
        <div className="rounded-3xl border border-slate-200 bg-gradient-to-br from-white to-teal-50/50 p-8 sm:p-12 shadow-xl shadow-slate-200/40">
          <div className="flex items-center gap-3">
            <div className="w-11 h-11 rounded-xl bg-teal-100 flex items-center justify-center">
              <BatteryCharging className="w-5 h-5 text-teal-700" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-slate-700">Capacity, in plain words</h2>
          </div>
          <p className="mt-5 text-slate-500 leading-relaxed text-lg">
            Each plan covers a generous number of intakes every month. Most agencies never reach the limit, and if you do,
            you'll never be cut off mid-call. Top up anytime with pay-as-you-go.
          </p>
          <div className="mt-8 grid sm:grid-cols-2 gap-4">
            {[
              { plan: 'Starter', value: '~15', note: 'intakes per month' },
              { plan: 'Pro', value: '~40', note: 'intakes per month, so you rarely think about top-ups' },
            ].map((c) => (
              <div key={c.plan} className="rounded-2xl bg-white border border-slate-200 p-6">
                <p className="text-sm font-semibold text-slate-500">{c.plan}</p>
                <p className="mt-1 text-4xl font-bold text-slate-800">{c.value}</p>
                <p className="mt-1 text-sm text-slate-500">{c.note}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
            <Info className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            Usage is measured in care tokens. A typical intake uses 600k–750k tokens. Starter includes 10M per month, Pro includes 20M.
          </p>
        </div>
      </div>
    </section>
  );
}

// ─── Included ────────────────────────────────────────────────────────────────

const INCLUDED = [
  { icon: MapPin, title: 'Find the right setting', body: 'Search nursing homes, assisted living, memory care, long-term care hospitals and home care agencies, and export a PDF for the family.' },
  { icon: CalendarCheck, title: 'Keep families moving', body: 'Tasks, milestones and a shared care calendar so families know their next step after the call.' },
  { icon: FileSignature, title: 'Personal Care Agreements', body: 'Help families put paid family caregiving on paper the right way.' },
  { icon: Award, title: 'Veterans benefits', body: 'Guide eligible families through VA Aid & Attendance and other benefit applications.' },
  { icon: FileSearch, title: 'Contract Analyzer', body: 'Spot risky clauses in facility admission contracts before families sign.' },
  { icon: HeartHandshake, title: 'Caregiver stress support', body: 'A calm, always-available space for overwhelmed family caregivers.' },
  { icon: LayoutDashboard, title: 'Caregiver dashboard', body: 'One place for your team to see every family and where they stand.' },
  { icon: History, title: 'Saved assessment history', body: 'Pick up any case where you left off. Nothing gets re-asked.' },
];

function IncludedSection() {
  return (
    <section className="bg-slate-50 border-y border-slate-200 py-24 sm:py-32">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center max-w-2xl mx-auto">
          <SectionPill icon={Sparkles}>Included in every plan</SectionPill>
          <h2 className="mt-6 text-3xl sm:text-4xl font-bold text-slate-700 leading-tight tracking-tight">
            More than an intake tool
          </h2>
          <p className="mt-4 text-lg text-slate-500 leading-relaxed">
            The things families ask about after the call are already built in.
          </p>
        </div>
        <div className="mt-14 grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {INCLUDED.map((item) => (
            <div key={item.title} className="group rounded-2xl bg-white border border-slate-200 p-6 hover:border-teal-300 hover:shadow-lg hover:shadow-slate-200/60 hover:-translate-y-1 transition-all duration-300">
              <div className="w-11 h-11 rounded-xl bg-teal-50 flex items-center justify-center group-hover:bg-teal-100 transition-colors">
                <item.icon className="w-5 h-5 text-teal-600" />
              </div>
              <h3 className="mt-4 font-semibold text-slate-800">{item.title}</h3>
              <p className="mt-2 text-sm text-slate-500 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── FAQ ─────────────────────────────────────────────────────────────────────

const FAQS = [
  { q: 'How do we pay?', a: 'We bill by invoice, monthly or annually. No credit card needed to get started.' },
  { q: 'How does annual billing work?', a: 'Pay for the year upfront and get 2 months free. Starter is $1,990 a year and Pro is $2,990 a year.' },
  { q: 'What if we use up our monthly capacity?', a: "You'll never be cut off mid-call. You can top up anytime on a pay-as-you-go basis. Top-ups only add capacity, so there is nothing else to upgrade." },
  { q: 'How many team members can use Poetiq?', a: 'Your whole team. There are no per-seat fees on any plan.' },
  { q: 'Which states do you cover?', a: 'Poetiq applies state-specific care funding rules, so your team gets guidance that matches where the family lives.' },
  { q: 'Is family data kept private?', a: 'Yes. Data is encrypted at rest and in transit, and only your team can see your families.' },
  { q: 'Does our team need training?', a: 'No. Poetiq walks your intake coordinator through each step during the call. Your account is ready within 48 hours.' },
  { q: 'When does Enterprise make sense over Pro?', a: 'If you run multiple locations, want briefs branded with your agency, or need workflows and security paperwork tailored to your organization.' },
];

function PricingFAQ() {
  return (
    <section className="bg-white py-24 sm:py-32">
      <div className="max-w-3xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-slate-800 leading-tight tracking-tight">Pricing questions, answered</h2>
        </div>
        <div className="space-y-4">
          {FAQS.map((faq) => (
            <details key={faq.q} className="group bg-white rounded-xl shadow-sm border border-slate-200 hover:border-teal-300 overflow-hidden transition-colors duration-200">
              <summary className="flex items-center justify-between p-5 sm:p-6 cursor-pointer font-semibold text-base sm:text-lg text-slate-800 hover:bg-slate-50 hover:text-teal-700 transition-colors select-none list-none [&::-webkit-details-marker]:hidden">
                <span className="pr-4">{faq.q}</span>
                <span className="relative w-5 h-5 flex-shrink-0">
                  <span className="absolute top-1/2 left-0 w-5 h-0.5 -translate-y-1/2 bg-teal-500 rounded" />
                  <span className="absolute left-1/2 top-0 h-5 w-0.5 -translate-x-1/2 bg-teal-500 rounded transition-transform duration-300 group-open:scale-y-0" />
                </span>
              </summary>
              <div className="px-5 sm:px-6 pb-5 sm:pb-6 text-slate-600 leading-relaxed">
                <p>{faq.a}</p>
              </div>
            </details>
          ))}
        </div>
        <p className="mt-10 flex items-start gap-2 text-xs text-slate-400 leading-relaxed">
          <ShieldCheck className="w-4 h-4 flex-shrink-0" />
          Poetiq supports intake teams with care funding guidance. It is not legal or financial advice. Families should confirm their options with a qualified professional.
        </p>
      </div>
    </section>
  );
}

// ─── Final CTA ───────────────────────────────────────────────────────────────

function PricingFinalCTA() {
  return (
    <section className="relative py-24 sm:py-32 overflow-hidden bg-gradient-to-b from-slate-50 via-teal-50/60 to-white">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-teal-200/20 rounded-full blur-3xl pointer-events-none" />
      <div className="relative max-w-3xl mx-auto px-6 text-center">
        <div className="inline-flex items-center px-4 py-2 bg-white/80 border border-teal-200 rounded-full text-teal-700 text-sm font-medium shadow-sm">
          <Clock className="w-4 h-4 mr-2" />
          15 minutes
        </div>
        <h2 className="mt-8 text-3xl sm:text-4xl md:text-5xl font-bold text-slate-800 leading-tight tracking-tight">
          See a real intake from your state,{' '}
          <span className="bg-gradient-to-r from-teal-600 to-teal-500 text-transparent bg-clip-text">live.</span>
        </h2>
        <p className="mt-6 text-lg text-slate-500 leading-relaxed">
          Bring a recent family scenario. We'll walk through it together and you can decide which plan fits.
        </p>
        <div className="mt-10 max-w-xs mx-auto">
          <DemoButton />
        </div>
      </div>
    </section>
  );
}
