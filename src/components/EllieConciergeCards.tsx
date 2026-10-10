import { useState, type FormEvent } from 'react';
import { Link } from 'react-router-dom';
import {
  AlertTriangle,
  ArrowRight,
  Calculator,
  CalendarCheck,
  Clock,
  CheckCircle2,
  ClipboardList,
  FileText,
  HeartHandshake,
  Loader2,
  Scale,
  Shield,
  TrendingDown,
  TrendingUp,
} from 'lucide-react';
import {
  PLAN_PRICES,
  SAMPLE_STATES,
  formatMoney,
  type Audience,
  type CalculatorResult,
  type CliffResult,
  type SampleScreening,
  type SampleStateAbbr,
} from '../utils/ellieConcierge';

export type StarterId = 'calculator' | 'sample' | 'partner' | 'family';

type Starter = { id: StarterId; label: string; icon: typeof Calculator };

const STARTERS: Record<Audience, Starter[]> = {
  agency: [
    { id: 'calculator', label: 'What is price shock costing my agency?', icon: Calculator },
    { id: 'sample', label: 'Show me a 60-second sample screening', icon: ClipboardList },
    { id: 'partner', label: "I'm an elder law attorney or estate planner", icon: Scale },
    { id: 'family', label: "I'm looking for care for a family member", icon: HeartHandshake },
  ],
  care_manager: [
    { id: 'calculator', label: 'What is the Medicaid cliff costing my practice?', icon: Calculator },
    { id: 'sample', label: 'Show me a 60-second asset map', icon: ClipboardList },
    { id: 'partner', label: "I'm an elder law attorney or estate planner", icon: Scale },
    { id: 'family', label: "I'm a family member with a Care Manager", icon: HeartHandshake },
  ],
};

export function StarterChoices({
  onPick,
  active,
  audience = 'agency',
}: {
  onPick: (id: StarterId) => void;
  active: boolean;
  audience?: Audience;
}) {
  return (
    <div className="flex flex-col gap-2">
      {STARTERS[audience].map(({ id, label, icon: Icon }, i) => (
        <button
          key={id}
          type="button"
          disabled={!active}
          onClick={() => onPick(id)}
          style={{ animationDelay: `${i * 60}ms` }}
          className="group flex items-center gap-3 rounded-xl border border-teal-100 bg-white px-3 py-2.5 text-left text-sm font-medium text-slate-700 shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:border-teal-300 hover:bg-teal-50 hover:shadow-md disabled:pointer-events-none disabled:opacity-50 animate-fade-in"
        >
          <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-teal-50 text-teal-600 transition-colors group-hover:bg-teal-600 group-hover:text-white">
            <Icon className="h-4 w-4" />
          </span>
          <span className="flex-1 leading-snug">{label}</span>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
        </button>
      ))}
    </div>
  );
}

export interface CalcStep {
  key:
    | 'intakeCalls'
    | 'lostOnPrice'
    | 'clientValue'
    | 'acceptsMedicaid'
    | 'privateClients'
    | 'monthlyBilling'
    | 'lostPerYear'
    | 'researchHours';
  chips: { label: string; value: number }[];
  prefix?: string;
  allowCustom: boolean;
}

export function CalcStepCard({
  step,
  active,
  onAnswer,
}: {
  step: CalcStep;
  active: boolean;
  onAnswer: (value: number, label: string) => void;
}) {
  const [custom, setCustom] = useState('');

  const submitCustom = (e: FormEvent) => {
    e.preventDefault();
    const n = Number(custom.replace(/[^0-9.]/g, ''));
    if (!Number.isFinite(n) || n <= 0) return;
    onAnswer(Math.round(n), `${step.prefix ?? ''}${Math.round(n).toLocaleString('en-US')}`);
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-2">
        {step.chips.map((c) => (
          <button
            key={c.label}
            type="button"
            disabled={!active}
            onClick={() => onAnswer(c.value, c.label)}
            className="rounded-full border border-teal-200 bg-white px-3.5 py-1.5 text-sm font-medium text-teal-700 transition-all hover:border-teal-500 hover:bg-teal-600 hover:text-white disabled:pointer-events-none disabled:opacity-50"
          >
            {c.label}
          </button>
        ))}
      </div>
      {step.allowCustom && active && (
        <form onSubmit={submitCustom} className="flex items-center gap-2">
          <div className="relative flex-1">
            {step.prefix && (
              <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-slate-400">
                {step.prefix}
              </span>
            )}
            <input
              inputMode="numeric"
              value={custom}
              onChange={(e) => setCustom(e.target.value)}
              placeholder="Or type a number"
              aria-label="Type a number"
              className={`w-full rounded-lg border border-slate-200 bg-white py-1.5 pr-3 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 ${step.prefix ? 'pl-6' : 'pl-3'}`}
            />
          </div>
          <button
            type="submit"
            className="rounded-lg bg-slate-800 px-3 py-1.5 text-sm font-medium text-white transition hover:bg-slate-900"
          >
            OK
          </button>
        </form>
      )}
    </div>
  );
}

export function CalcResultCard({ r }: { r: CalculatorResult }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3.5 text-white">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-red-300">
          <TrendingDown className="h-3.5 w-3.5" /> Walking out the door
        </div>
        <div className="mt-1 text-2xl font-bold">
          {formatMoney(r.monthlyLost)}
          <span className="text-sm font-medium text-slate-300"> / month</span>
        </div>
        <div className="text-xs text-slate-300">{formatMoney(r.annualLost)} a year in care you never deliver</div>
      </div>
      <div className="space-y-3 px-4 py-3.5">
        <div className="flex items-start gap-2.5">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
          <div className="text-sm text-slate-700">
            If Poetiq helps just <strong>{r.recoveredFamilies}</strong>{' '}
            {r.recoveredFamilies === 1 ? 'family' : 'families'} a month find a way to pay, that's{' '}
            <strong className="text-teal-700">{formatMoney(r.monthlyRecovered)}/month</strong> back.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-teal-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-teal-700">Pro plan</div>
            <div className="text-sm font-semibold text-slate-800">{formatMoney(PLAN_PRICES.pro)}/mo</div>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-emerald-700">Return</div>
            <div className="text-sm font-semibold text-slate-800">
              {r.proMultiple >= 1 ? `${r.proMultiple}x the cost` : 'Pays for itself fast'}
            </div>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Estimate assumes {Math.round(r.recoveryRate * 100)}% of price-lost families can be helped
          {r.acceptsMedicaid ? ' with Medicaid, VA and savings planning' : ' with VA, insurance and savings planning'}.
          Your results will vary.
        </p>
      </div>
    </div>
  );
}

export function CliffResultCard({ r }: { r: CliffResult }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="bg-gradient-to-br from-slate-800 to-slate-900 px-4 py-3.5 text-white">
        <div className="flex items-center gap-1.5 text-xs font-medium uppercase tracking-wide text-red-300">
          <TrendingDown className="h-3.5 w-3.5" /> Lost at the Medicaid cliff
        </div>
        <div className="mt-1 text-2xl font-bold">
          {formatMoney(r.annualLost)}
          <span className="text-sm font-medium text-slate-300"> / year</span>
        </div>
        <div className="text-xs text-slate-300">
          {r.lostPerYear} {r.lostPerYear === 1 ? 'client' : 'clients'} let go right when Medicaid planning starts
        </div>
      </div>
      <div className="space-y-3 px-4 py-3.5">
        <div className="flex items-start gap-2.5">
          <Clock className="mt-0.5 h-4 w-4 shrink-0 text-amber-600" />
          <div className="text-sm text-slate-700">
            Plus <strong>{r.researchHours * 12} unbillable hours</strong> a year on Medicaid research, about{' '}
            <strong>{formatMoney(r.unbillableValue)}</strong> of your time.
          </div>
        </div>
        <div className="flex items-start gap-2.5">
          <TrendingUp className="mt-0.5 h-4 w-4 shrink-0 text-teal-600" />
          <div className="text-sm text-slate-700">
            Keep just <strong>{r.retainedClients}</strong> {r.retainedClients === 1 ? 'client' : 'clients'} through the
            transition and that's <strong className="text-teal-700">{formatMoney(r.annualRetained)}/year</strong> back.
          </div>
        </div>
        <div className="grid grid-cols-2 gap-2">
          <div className="rounded-xl bg-teal-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-teal-700">Hours back</div>
            <div className="text-sm font-semibold text-slate-800">~{r.hoursBack} a month</div>
          </div>
          <div className="rounded-xl bg-emerald-50 px-3 py-2">
            <div className="text-[11px] font-medium uppercase tracking-wide text-emerald-700">Return</div>
            <div className="text-sm font-semibold text-slate-800">
              {r.proMultiple >= 1 ? `${r.proMultiple}x the cost` : 'Pays for itself fast'}
            </div>
          </div>
        </div>
        <p className="text-[11px] leading-relaxed text-slate-400">
          Estimate assumes a kept client stays about 12 more months, half of cliff losses can be kept, and your time is
          worth {formatMoney(r.hourlyRate)}/hour. Your results will vary.
        </p>
      </div>
    </div>
  );
}

export function StatePicker({ active, onPick }: { active: boolean; onPick: (abbr: SampleStateAbbr) => void }) {
  return (
    <div className="grid grid-cols-3 gap-2">
      {SAMPLE_STATES.map((s) => (
        <button
          key={s.abbr}
          type="button"
          disabled={!active}
          onClick={() => onPick(s.abbr)}
          className="rounded-xl border border-slate-200 bg-white px-2 py-2 text-xs font-medium text-slate-700 transition-all hover:-translate-y-0.5 hover:border-teal-400 hover:bg-teal-50 hover:text-teal-800 disabled:pointer-events-none disabled:opacity-50"
        >
          {s.name}
        </button>
      ))}
    </div>
  );
}

function Row({ label, value, tone = 'default' }: { label: string; value: string; tone?: 'default' | 'good' }) {
  return (
    <div className="flex items-center justify-between gap-3 py-1.5 text-sm">
      <span className="text-slate-500">{label}</span>
      <span className={`font-semibold ${tone === 'good' ? 'text-teal-700' : 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

function Flag({ tone, children }: { tone: 'warn' | 'ok'; children: React.ReactNode }) {
  const styles =
    tone === 'warn' ? 'bg-amber-50 text-amber-800 border-amber-100' : 'bg-emerald-50 text-emerald-800 border-emerald-100';
  const Icon = tone === 'warn' ? AlertTriangle : CheckCircle2;
  return (
    <div className={`flex items-start gap-2 rounded-lg border px-2.5 py-2 text-xs leading-relaxed ${styles}`}>
      <Icon className="mt-0.5 h-3.5 w-3.5 shrink-0" />
      <span>{children}</span>
    </div>
  );
}

export function ScreeningCard({ s }: { s: SampleScreening }) {
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <div className="mb-2 flex items-center gap-2 text-xs font-semibold uppercase tracking-wide text-teal-700">
        <Shield className="h-3.5 w-3.5" /> Screening result, {s.stateName}
      </div>
      <div className="divide-y divide-slate-100">
        <Row label="Countable savings" value={formatMoney(s.savings)} />
        <Row label="Protected for Frank" value={formatMoney(s.protectedForFrank)} tone="good" />
        <Row label="Margaret may keep" value={formatMoney(s.margaretAllowance)} />
        <Row label="Left to plan around" value={formatMoney(s.amountToPlan)} />
      </div>
      <div className="mt-3 space-y-2">
        {s.overIncomeCap ? (
          <Flag tone="warn">
            Income {formatMoney(s.income)}/mo is over {s.stateName}'s {formatMoney(s.incomeCap)} cap. A Miller trust
            (income trust) is likely needed.
          </Flag>
        ) : s.usesIncomeCap ? (
          <Flag tone="ok">Income is under {s.stateName}'s cap. No income trust needed.</Flag>
        ) : (
          <Flag tone="ok">
            {s.stateName} has no hard income cap. Extra income goes toward a monthly share of cost instead.
          </Flag>
        )}
        <Flag tone="warn">
          A {formatMoney(s.giftAmount)} gift to a grandson falls inside the 5-year look-back and may cause a penalty
          period.
        </Flag>
      </div>
    </div>
  );
}

export function BriefCard({ s }: { s: SampleScreening }) {
  const items = [
    ['Household', 'Margaret, 82 (applicant). Frank, spouse at home.'],
    ['Care need', 'Help with bathing and dressing (2 daily activities)'],
    ['Assets', `${formatMoney(s.savings)} countable; ${formatMoney(s.protectedForFrank)} protected for spouse`],
    ['Income', s.overIncomeCap ? 'Over cap: income trust needed' : 'No income trust needed'],
    ['Look-back', `${formatMoney(s.giftAmount)} gift (2022) needs review`],
    ['Next steps', 'Spend-down plan, gift cure options, application timing'],
  ];
  return (
    <div className="relative overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
      <div className="flex items-center justify-between border-b border-slate-100 bg-slate-50 px-4 py-2.5">
        <div className="flex items-center gap-2 text-xs font-semibold text-slate-700">
          <FileText className="h-3.5 w-3.5 text-teal-600" /> Attorney case brief
        </div>
        <span className="rounded-full bg-teal-100 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-teal-800">
          Preview
        </span>
      </div>
      <dl className="space-y-2 px-4 py-3">
        {items.map(([k, v]) => (
          <div key={k} className="grid grid-cols-[80px_1fr] gap-2 text-xs">
            <dt className="font-medium text-slate-400">{k}</dt>
            <dd className="text-slate-700">{v}</dd>
          </div>
        ))}
      </dl>
      <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-white" />
    </div>
  );
}

export function DemoButton({
  label,
  note,
  onClick,
}: {
  label: string;
  note: string;
  onClick: () => Promise<void>;
}) {
  const [busy, setBusy] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handle = async () => {
    setBusy(true);
    await onClick();
    setBusy(false);
    setClicked(true);
  };

  return (
    <div className="space-y-1.5">
      <button
        type="button"
        onClick={handle}
        disabled={busy}
        className="group flex w-full items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-teal-600 to-emerald-600 px-4 py-3 text-sm font-semibold text-white shadow-lg shadow-teal-600/20 transition-all hover:-translate-y-0.5 hover:shadow-xl hover:shadow-teal-600/30 disabled:opacity-70"
      >
        {busy ? <Loader2 className="h-4 w-4 animate-spin" /> : <CalendarCheck className="h-4 w-4" />}
        {label}
        <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
      </button>
      <p className="text-center text-[11px] text-slate-400">
        {clicked ? 'Booking page opened in a new tab.' : note}
      </p>
    </div>
  );
}

export function FamilyLinks() {
  const links = [
    { to: 'https://app.poetiq.io/elder-care-checklist', title: 'Elder care checklist', sub: 'What to sort out first' },
    { to: 'https://app.poetiq.io/personal-care-agreement', title: 'Personal care agreement', sub: 'Paying a family caregiver the right way' },
  ];
  return (
    <div className="flex flex-col gap-2">
      {links.map((l) => (
        <Link
          key={l.to}
          to={l.to}
          className="group flex items-center justify-between rounded-xl border border-slate-200 bg-white px-3 py-2.5 transition-all hover:border-teal-300 hover:bg-teal-50"
        >
          <span>
            <span className="block text-sm font-medium text-slate-800">{l.title}</span>
            <span className="block text-xs text-slate-500">{l.sub}</span>
          </span>
          <ArrowRight className="h-4 w-4 text-slate-300 transition-transform group-hover:translate-x-0.5 group-hover:text-teal-600" />
        </Link>
      ))}
    </div>
  );
}

const REFERRAL_COPY: Record<Audience, { field: string; missing: string; note: string }> = {
  agency: {
    field: 'Agency name and city',
    missing: "Please add the agency's name.",
    note: "We'll reach out to the agency, not sell to you.",
  },
  care_manager: {
    field: "Care Manager's name, practice and city",
    missing: "Please add your Care Manager's name or practice.",
    note: "We'll reach out to your Care Manager, not sell to you.",
  },
};

export function FamilyReferralForm({
  active,
  onSubmit,
  audience = 'agency',
}: {
  active: boolean;
  onSubmit: (agencyName: string, email: string) => Promise<boolean>;
  audience?: Audience;
}) {
  const copy = REFERRAL_COPY[audience];
  const [agency, setAgency] = useState('');
  const [email, setEmail] = useState('');
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState('');

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    if (!agency.trim()) {
      setError(copy.missing);
      return;
    }
    if (email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) {
      setError('That email does not look quite right.');
      return;
    }
    setError('');
    setBusy(true);
    const ok = await onSubmit(agency.trim(), email.trim());
    setBusy(false);
    if (!ok) setError('We could not send that just now. Please try again.');
  };

  return (
    <form onSubmit={submit} className="space-y-2 rounded-2xl border border-slate-200 bg-white p-3 shadow-sm">
      <input
        value={agency}
        onChange={(e) => setAgency(e.target.value)}
        disabled={!active || busy}
        maxLength={150}
        placeholder={copy.field}
        aria-label={copy.field}
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50"
      />
      <input
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        disabled={!active || busy}
        type="email"
        maxLength={200}
        placeholder="Your email (optional)"
        aria-label="Your email (optional)"
        className="w-full rounded-lg border border-slate-200 px-3 py-2 text-sm text-slate-800 outline-none transition focus:border-teal-500 focus:ring-2 focus:ring-teal-100 disabled:bg-slate-50"
      />
      {error && <p className="text-xs text-red-600">{error}</p>}
      <button
        type="submit"
        disabled={!active || busy}
        className="flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-3 py-2 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:opacity-60"
      >
        {busy && <Loader2 className="h-4 w-4 animate-spin" />}
        Let them know about Poetiq
      </button>
      <p className="text-[11px] leading-relaxed text-slate-400">
        {copy.note} Please don't include your loved one's name.
      </p>
    </form>
  );
}
