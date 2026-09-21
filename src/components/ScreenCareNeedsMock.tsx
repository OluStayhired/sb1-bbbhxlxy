// src/components/ScreenCareNeedsMock.tsx
import { useState, useEffect, useRef } from 'react';
import {
  Activity,
  Users,
  Scale,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  DollarSign,
  Sliders,
  Home,
  BookOpen,
  ChevronDown,
  ChevronRight,
  User,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// HARDCODED DATA — Margaret Chen, Florida (mirrors IntakeWorkflow exactly)
// ═══════════════════════════════════════════════════════════════════════════════

const STATE = {
  abbr: 'FL',
  name: 'Florida',
  assetLimit: 2_000,
  csraMax: 154_140,
  csraMin: 30_828,
  csraPercent: 0.5,
  mmmnaBase: 3_520,
  lookbackMonths: 60,
  avgNhCost: 9_485,
  incomeCap: 2_829,
};

const PROFILE = {
  name: 'Margaret Chen',
  age: 81,
  relation: 'Mother',
  adls: { bathing: true, dressing: true, eating: false, toileting: true, transferring: true },
  hasCommunitySpouse: true,
  applicantMonthlyIncome: 3_200,
  spouseMonthlyIncome: 1_850,
  monthlyLivingExpenses: 3_400,
  hasTransfersInLookback: true,
  transferAmount: 75_000,
  transferMonthsAgo: 22,
  isVeteran: false,
  totalCountableAssets: 185_000,
  whatIf: { spendDownAmount: 45_000, trustAmount: 0, prepaidFuneralAmount: 15_000, homeRepairAmount: 12_000 },
};

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATIONS (same formulas as IntakeWorkflow)
// ═══════════════════════════════════════════════════════════════════════════════

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

const ADL_NAMES = (Object.entries(PROFILE.adls) as [string, boolean][])
  .filter(([, v]) => v)
  .map(([k]) => k.charAt(0).toUpperCase() + k.slice(1));
const ADL_COUNT = ADL_NAMES.length;

const CSRA_AMT = Math.min(
  Math.max(PROFILE.totalCountableAssets * STATE.csraPercent, STATE.csraMin),
  STATE.csraMax,
);
const MMMNA_FLOOR = STATE.mmmnaBase;
const SPILLAGE_SHORTFALL = Math.max(0, MMMNA_FLOOR - PROFILE.spouseMonthlyIncome);
const DIVERSION_AMOUNT = Math.min(SPILLAGE_SHORTFALL, PROFILE.applicantMonthlyIncome);
const MILLER_EXCESS = Math.max(0, PROFILE.applicantMonthlyIncome - STATE.incomeCap);
const MILLER_NEEDED = MILLER_EXCESS > 0;
const APPLICANT_COUNTABLE = Math.max(0, PROFILE.totalCountableAssets - CSRA_AMT);
const REMAINING_SPEND_DOWN = Math.max(0, APPLICANT_COUNTABLE - STATE.assetLimit);
const PENALTY_MONTHS = Math.floor(PROFILE.transferAmount / STATE.avgNhCost);

// ═══════════════════════════════════════════════════════════════════════════════
// COLLAPSIBLE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function Section({
  title,
  icon: Icon,
  defaultOpen = false,
  accentColor = 'teal',
  badge,
  badgeColor,
  children,
}: {
  title: string;
  icon: React.ElementType;
  defaultOpen?: boolean;
  accentColor?: string;
  badge?: string;
  badgeColor?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const colors: Record<string, { icon: string; bg: string; border: string }> = {
    teal:  { icon: 'text-teal-600',  bg: 'bg-teal-50/60',  border: 'border-teal-200' },
    green: { icon: 'text-green-600', bg: 'bg-green-50/60', border: 'border-green-200' },
    amber: { icon: 'text-amber-600', bg: 'bg-amber-50/60', border: 'border-amber-200' },
    red:   { icon: 'text-red-600',   bg: 'bg-red-50/60',   border: 'border-red-200' },
    slate: { icon: 'text-slate-600', bg: 'bg-slate-50',    border: 'border-slate-200' },
  };
  const c = colors[accentColor] || colors.teal;

  return (
    <div className={`rounded-xl border ${c.border} overflow-hidden transition-all duration-200`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2.5 ${c.bg} hover:brightness-[0.97] transition-all`}
      >
        <div className="flex items-center gap-2 min-w-0">
          <Icon className={`w-3.5 h-3.5 flex-shrink-0 ${c.icon}`} />
          <span className="text-[11px] font-bold text-slate-700 truncate">{title}</span>
          {badge && (
            <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-full border whitespace-nowrap ${badgeColor || 'bg-teal-100 text-teal-700 border-teal-200'}`}>
              {badge}
            </span>
          )}
        </div>
        {open ? (
          <ChevronDown className="w-3 h-3 text-slate-400 flex-shrink-0" />
        ) : (
          <ChevronRight className="w-3 h-3 text-slate-400 flex-shrink-0" />
        )}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          open ? 'max-h-[800px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 py-2.5 bg-white">{children}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAGGERED REVEAL ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

function useReveal(total: number, intervalMs = 500) {
  const [revealed, setRevealed] = useState(0);
  const timers = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timers.current.forEach(clearTimeout);
    timers.current = [];
    setRevealed(0);

    for (let i = 1; i <= total; i++) {
      const id = setTimeout(() => setRevealed(i), i * intervalMs);
      timers.current.push(id);
    }

    return () => { timers.current.forEach(clearTimeout); };
  }, [total, intervalMs]);

  return revealed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function ScreenCareNeedsMock() {
  const revealed = useReveal(6, 450);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="flex items-center gap-2 mb-0.5">
          <Sliders className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold tracking-wide">Spend-Down Planner</span>
          <span className="ml-auto text-[9px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full px-1.5 py-0.5 leading-none">
            LIVE DEMO
          </span>
        </div>
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5 bg-white/10 rounded-full px-2 py-0.5">
            <User className="w-2.5 h-2.5 text-teal-300" />
            <span className="text-[10px] text-slate-200 font-medium">{PROFILE.name}, {PROFILE.age}</span>
          </div>
          <span className="text-[10px] text-slate-400">{STATE.name} ({STATE.abbr})</span>
        </div>
      </div>

      {/* ── Scrollable body ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-slate-50"
        style={{ maxHeight: '420px', minHeight: '280px' }}
      >

        {/* 1 ── Clinical Level of Care ── */}
        <div className={`transition-all duration-500 ${revealed >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Section
            title="Clinical Level of Care"
            icon={Activity}
            defaultOpen={true}
            accentColor={ADL_COUNT >= 3 ? 'green' : 'red'}
            badge={ADL_COUNT >= 3 ? 'Qualifies' : 'Below Threshold'}
            badgeColor={ADL_COUNT >= 3 ? 'bg-green-100 text-green-700 border-green-200' : 'bg-red-100 text-red-700 border-red-200'}
          >
            <p className="text-[10px] text-slate-600 mb-2">
              <span className="font-bold">{ADL_COUNT}</span> ADL deficits: {ADL_NAMES.join(', ')}
            </p>
            <div className="flex flex-wrap gap-1.5">
              {(['Bathing', 'Dressing', 'Eating', 'Toileting', 'Transferring'] as const).map((name) => {
                const active = ADL_NAMES.includes(name);
                return (
                  <span
                    key={name}
                    className={`text-[9px] font-semibold px-2 py-1 rounded-full border ${
                      active
                        ? 'bg-red-50 text-red-700 border-red-200'
                        : 'bg-green-50 text-green-700 border-green-200'
                    }`}
                  >
                    {name} {active ? '- Deficit' : '- OK'}
                  </span>
                );
              })}
            </div>
          </Section>
        </div>

        {/* 2 ── Spouse Protections (CSRA + MMMNA) ── */}
        <div className={`transition-all duration-500 ${revealed >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Section
            title="Community Spouse Protections"
            icon={Users}
            defaultOpen={true}
            accentColor="green"
            badge="CSRA Active"
            badgeColor="bg-green-100 text-green-700 border-green-200"
          >
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="bg-green-50 rounded-lg p-2 border border-green-100">
                <p className="text-[9px] text-green-700 font-semibold">CSRA (Asset Shield)</p>
                <p className="text-sm font-bold text-green-800">{fmt(CSRA_AMT)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                <p className="text-[9px] text-blue-700 font-semibold">MMMNA (Income Floor)</p>
                <p className="text-sm font-bold text-blue-800">{fmt(MMMNA_FLOOR)}/mo</p>
              </div>
            </div>
            {SPILLAGE_SHORTFALL > 0 && (
              <div className="flex items-center gap-1.5 bg-amber-50 rounded-lg p-2 border border-amber-200 text-[10px] text-amber-800">
                <AlertTriangle className="w-3 h-3 flex-shrink-0" />
                <span>Diversion needed: {fmt(DIVERSION_AMOUNT)}/mo to cover {fmt(SPILLAGE_SHORTFALL)}/mo MMMNA shortfall</span>
              </div>
            )}
          </Section>
        </div>

        {/* 3 ── Miller Trust ── */}
        {MILLER_NEEDED && (
          <div className={`transition-all duration-500 ${revealed >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <Section
              title="Miller Trust (QIT) Required"
              icon={Scale}
              accentColor="amber"
              badge="Income Over Cap"
              badgeColor="bg-amber-100 text-amber-700 border-amber-200"
            >
              <div className="grid grid-cols-3 gap-2">
                <div className="bg-white rounded-lg p-2 border border-amber-100">
                  <p className="text-[9px] text-slate-500 font-semibold">Income</p>
                  <p className="text-[11px] font-bold text-slate-800">{fmt(PROFILE.applicantMonthlyIncome)}/mo</p>
                </div>
                <div className="bg-white rounded-lg p-2 border border-amber-100">
                  <p className="text-[9px] text-slate-500 font-semibold">Cap</p>
                  <p className="text-[11px] font-bold text-slate-800">{fmt(STATE.incomeCap)}/mo</p>
                </div>
                <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                  <p className="text-[9px] text-amber-700 font-semibold">Excess</p>
                  <p className="text-[11px] font-bold text-amber-800">{fmt(MILLER_EXCESS)}/mo</p>
                </div>
              </div>
            </Section>
          </div>
        )}

        {/* 4 ── Look-Back Penalty ── */}
        <div className={`transition-all duration-500 ${revealed >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Section
            title={PROFILE.hasTransfersInLookback ? 'Look-Back Penalty' : 'Look-Back Window - Clean'}
            icon={PROFILE.hasTransfersInLookback ? AlertTriangle : CheckCircle2}
            accentColor={PROFILE.hasTransfersInLookback ? 'red' : 'green'}
            badge={PROFILE.hasTransfersInLookback ? `~${PENALTY_MONTHS}-Mo Penalty` : 'Clean'}
            badgeColor={PROFILE.hasTransfersInLookback ? 'bg-red-100 text-red-700 border-red-200' : 'bg-green-100 text-green-700 border-green-200'}
          >
            <p className="text-[10px] text-slate-600">
              {PROFILE.hasTransfersInLookback
                ? `${fmt(PROFILE.transferAmount)} transfer ${PROFILE.transferMonthsAgo} months ago. Attorney referral recommended.`
                : `No disqualifying transfers in the ${STATE.lookbackMonths}-month window.`}
            </p>
            {PROFILE.hasTransfersInLookback && (
              <div className="flex items-start gap-1.5 mt-2 bg-red-50 rounded-lg p-2 border border-red-200 text-[9px] text-red-800">
                <AlertTriangle className="w-3 h-3 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Penalty Calc:</strong> {fmt(PROFILE.transferAmount)} / {fmt(STATE.avgNhCost)}/mo = {PENALTY_MONTHS}-month ineligibility
                </span>
              </div>
            )}
          </Section>
        </div>

        {/* 5 ── Spend-Down Target Summary ── */}
        <div className={`transition-all duration-500 ${revealed >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Section
            title="Remaining Spend-Down Target"
            icon={ShieldCheck}
            defaultOpen={true}
            accentColor="teal"
          >
            {/* Big target number */}
            <div className="flex items-center justify-between mb-2.5 bg-teal-50 rounded-lg p-2.5 border border-teal-200">
              <span className="text-[10px] font-bold text-teal-800 uppercase tracking-wide">Target Amount</span>
              <span className="text-base font-extrabold text-teal-700">{fmt(REMAINING_SPEND_DOWN)}</span>
            </div>

            {/* Allocation grid */}
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Medical Costs', amount: PROFILE.whatIf.spendDownAmount, icon: DollarSign, color: 'text-green-600' },
                { label: 'Prepaid Funeral', amount: PROFILE.whatIf.prepaidFuneralAmount, icon: BookOpen, color: 'text-blue-600' },
                { label: 'Home Repair', amount: PROFILE.whatIf.homeRepairAmount, icon: Home, color: 'text-blue-600' },
                { label: 'Trust Transfer', amount: PROFILE.whatIf.trustAmount, icon: Scale, color: 'text-amber-600' },
              ].map(item => (
                <div key={item.label} className="bg-white rounded-lg p-2 border border-slate-100 text-center">
                  <item.icon className={`w-3 h-3 mx-auto mb-0.5 ${item.color}`} />
                  <p className="text-[9px] text-slate-500 font-semibold">{item.label}</p>
                  <p className="text-[11px] font-bold text-slate-800">{fmt(item.amount)}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 6 ── State Rules Reference ── */}
        <div className={`transition-all duration-500 ${revealed >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
          <Section
            title={`${STATE.name} Rules Reference`}
            icon={Sliders}
            accentColor="slate"
          >
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Asset Limit', value: fmt(STATE.assetLimit) },
                { label: 'Look-Back', value: `${STATE.lookbackMonths} months` },
                { label: 'Avg NH Cost', value: `${fmt(STATE.avgNhCost)}/mo` },
                { label: 'Income Cap', value: `${fmt(STATE.incomeCap)}/mo` },
              ].map(item => (
                <div key={item.label} className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1.5">
                  <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">{item.label}</p>
                  <p className="text-[11px] font-bold text-slate-800 mt-0.5">{item.value}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200">
        <p className="text-[9px] text-slate-400 text-center leading-relaxed">
          Figures use {STATE.name} Non-MAGI ABD rules. Verify with current state Medicaid policy.
        </p>
        <p className="text-[9px] text-teal-500 font-semibold text-center mt-0.5">
          Powered by Poetiq
        </p>
      </div>
    </div>
  );
}

export default ScreenCareNeedsMock;
