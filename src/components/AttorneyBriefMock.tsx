// src/components/AttorneyBriefMock.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  FileText,
  ChevronDown,
  ChevronRight,
  Shield,
  AlertTriangle,
  CheckCircle2,
  Scale,
  DollarSign,
  Users,
  Briefcase,
  Clock,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC MOCK DATA (mirrors a realistic SpendDownPdfExport scenario)
// ═══════════════════════════════════════════════════════════════════════════════

const MOCK = {
  patient: 'Margaret Thompson',
  age: 78,
  state: 'Florida',
  stateAbbr: 'FL',
  date: 'September 19, 2026',
  assetLimit: 2_000,
  avgNhCost: 10_718,
  lookbackMonths: 60,
  totalCountable: 187_400,
  csra: 148_620,
  remainingSpendDown: 36_800,
  monthlyIncome: 3_420,
  incomeCap: 2_829,
  millerExcess: 591,
  penaltyMonths: 0,
  adlCount: 4,
  adls: ['Bathing', 'Dressing', 'Toileting', 'Transferring'],
  allocation: {
    medical: 18_400,
    funeral: 8_500,
    homeRepair: 6_400,
    trust: 3_500,
  },
};

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

// ═══════════════════════════════════════════════════════════════════════════════
// COLLAPSIBLE SECTION
// ═══════════════════════════════════════════════════════════════════════════════

function Section({
  title,
  icon: Icon,
  defaultOpen = false,
  accentColor = 'teal',
  children,
}: {
  title: string;
  icon: React.ElementType;
  defaultOpen?: boolean;
  accentColor?: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(defaultOpen);

  const colors: Record<string, { icon: string; bg: string; border: string }> = {
    teal:  { icon: 'text-teal-600',  bg: 'bg-teal-50',  border: 'border-teal-100' },
    amber: { icon: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100' },
    green: { icon: 'text-green-600', bg: 'bg-green-50', border: 'border-green-100' },
    red:   { icon: 'text-red-600',   bg: 'bg-red-50',   border: 'border-red-100' },
    slate: { icon: 'text-slate-600', bg: 'bg-slate-50', border: 'border-slate-200' },
  };
  const c = colors[accentColor] || colors.teal;

  return (
    <div className={`rounded-lg border ${c.border} overflow-hidden transition-all duration-200`}>
      <button
        onClick={() => setOpen(!open)}
        className={`w-full flex items-center justify-between px-3 py-2 ${c.bg} hover:brightness-[0.97] transition-all`}
      >
        <div className="flex items-center gap-2">
          <Icon className={`w-3.5 h-3.5 ${c.icon}`} />
          <span className="text-[11px] font-bold text-slate-700">{title}</span>
        </div>
        {open ? (
          <ChevronDown className="w-3 h-3 text-slate-400" />
        ) : (
          <ChevronRight className="w-3 h-3 text-slate-400" />
        )}
      </button>
      <div
        className={`transition-all duration-200 ease-in-out overflow-hidden ${
          open ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
        }`}
      >
        <div className="px-3 py-2.5 bg-white">{children}</div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STAT ROW
// ═══════════════════════════════════════════════════════════════════════════════

function Stat({ label, value, color }: { label: string; value: string; color?: string }) {
  return (
    <div className="flex items-center justify-between py-1.5 border-b border-slate-100 last:border-0">
      <span className="text-[10px] text-slate-500">{label}</span>
      <span className={`text-[10px] font-bold ${color || 'text-slate-800'}`}>{value}</span>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// BUILD ANIMATION
// ═══════════════════════════════════════════════════════════════════════════════

function useRevealAnimation(totalSteps: number, intervalMs = 350) {
  const [revealed, setRevealed] = useState(0);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  useEffect(() => {
    timersRef.current.forEach(clearTimeout);
    timersRef.current = [];
    setRevealed(0);

    for (let i = 1; i <= totalSteps; i++) {
      const id = setTimeout(() => setRevealed(i), i * intervalMs);
      timersRef.current.push(id);
    }

    return () => {
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [totalSteps, intervalMs]);

  return revealed;
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function AttorneyBriefMock() {
  const revealed = useRevealAnimation(7, 400);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="flex items-center gap-2 mb-1">
          <FileText className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold tracking-wide">Medicaid Planning Summary</span>
          <span className="ml-auto text-[9px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full px-1.5 py-0.5 leading-none">
            AUTO-GENERATED
          </span>
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed">
          {MOCK.patient}, age {MOCK.age} &middot; {MOCK.state} ({MOCK.stateAbbr}) &middot; {MOCK.date}
        </p>
      </div>

      {/* ── Scrollable body ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2 bg-slate-50"
        style={{ maxHeight: '420px', minHeight: '280px' }}
      >

        {/* 1 ── Executive Insight ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Executive Insight" icon={Briefcase} defaultOpen={true} accentColor="slate">
            <Stat label="Medicaid Status" value="Action Required (Miller Trust + Spend Down)" color="text-amber-600" />
            <Stat label="Spouse Asset Protection (CSRA)" value={`${fmt(MOCK.csra)} Saved`} color="text-green-600" />
            <Stat label="Remaining Spend-Down" value={fmt(MOCK.remainingSpendDown)} />
            <Stat label="Key Action" value={`Establish QIT for ${fmt(MOCK.millerExcess)}/mo`} color="text-amber-600" />
          </Section>
        </div>

        {/* 2 ── Traffic Lights ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <div className="grid grid-cols-3 gap-1.5">
            <div className="rounded-lg border border-green-200 bg-green-50 p-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mb-1.5" />
              <p className="text-[9px] font-bold text-slate-700 leading-tight">Care Needs</p>
              <p className="text-[8px] text-slate-500 leading-snug mt-0.5">
                {MOCK.adlCount} ADLs met
              </p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mb-1.5" />
              <p className="text-[9px] font-bold text-slate-700 leading-tight">Spouse Safe</p>
              <p className="text-[8px] text-slate-500 leading-snug mt-0.5">
                {fmt(MOCK.csra)} kept
              </p>
            </div>
            <div className="rounded-lg border border-green-200 bg-green-50 p-2">
              <div className="w-2 h-2 rounded-full bg-green-500 mb-1.5" />
              <p className="text-[9px] font-bold text-slate-700 leading-tight">No Penalties</p>
              <p className="text-[8px] text-slate-500 leading-snug mt-0.5">
                Clean history
              </p>
            </div>
          </div>
        </div>

        {/* 3 ── Miller Trust Alert ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Income Trust (Miller Trust) Required" icon={AlertTriangle} accentColor="amber">
            <p className="text-[10px] text-slate-600 leading-relaxed">
              Monthly income of <strong>{fmt(MOCK.monthlyIncome)}</strong> exceeds the {MOCK.stateAbbr} cap
              of <strong>{fmt(MOCK.incomeCap)}/mo</strong> by <strong>{fmt(MOCK.millerExcess)}</strong>.
              A Qualified Income Trust must route income monthly.
            </p>
          </Section>
        </div>

        {/* 4 ── Asset Allocation Strategy ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Proposed Asset Allocation" icon={DollarSign} defaultOpen={true} accentColor="teal">
            <Stat label="Medical Care Costs" value={fmt(MOCK.allocation.medical)} />
            <Stat label="Prepaid Funeral Plan" value={fmt(MOCK.allocation.funeral)} />
            <Stat label="Home Safety Modifications" value={fmt(MOCK.allocation.homeRepair)} />
            <Stat label="Protected Trust Transfer" value={fmt(MOCK.allocation.trust)} />
            <div className="flex items-center justify-between mt-1.5 pt-1.5 border-t border-teal-200">
              <span className="text-[10px] font-bold text-teal-700">Total Allocation</span>
              <span className="text-[10px] font-bold text-teal-700">{fmt(MOCK.remainingSpendDown)}</span>
            </div>
          </Section>
        </div>

        {/* 5 ── Attorney Triage Ledger (condensed) ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 5 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Attorney Triage Ledger" icon={Scale} accentColor="slate">
            <div className="space-y-1">
              {[
                { item: 'Total Countable Assets', amt: fmt(MOCK.totalCountable) },
                { item: 'CSRA (Spouse Protection)', amt: `(${fmt(MOCK.csra)})` },
                { item: 'Medical / Care Costs', amt: `(${fmt(MOCK.allocation.medical)})` },
                { item: 'Funeral + Home + Trust', amt: `(${fmt(MOCK.allocation.funeral + MOCK.allocation.homeRepair + MOCK.allocation.trust)})` },
                { item: 'QIT Routing Required', amt: `${fmt(MOCK.millerExcess)}/mo` },
              ].map((row, i) => (
                <div key={i} className={`flex justify-between text-[9px] py-1 px-1.5 rounded ${i % 2 === 0 ? 'bg-slate-50' : ''}`}>
                  <span className="text-slate-600 font-medium">{row.item}</span>
                  <span className="text-slate-800 font-bold">{row.amt}</span>
                </div>
              ))}
              <div className="flex justify-between text-[9px] py-1.5 px-1.5 bg-green-50 rounded border border-green-200 mt-1">
                <span className="text-green-700 font-bold">Estimated Residual</span>
                <span className="text-green-700 font-bold">{fmt(MOCK.assetLimit)}</span>
              </div>
            </div>
          </Section>
        </div>

        {/* 6 ── Family Checklist (top 3 items) ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 6 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Family Action Checklist" icon={CheckCircle2} accentColor="green">
            <div className="space-y-2">
              {[
                { action: 'Gather 5 years of bank statements', why: 'Medicaid reviews 60 months of financial history.' },
                { action: 'Locate the property deed', why: 'Confirms the home exemption.' },
                { action: 'Confirm POA includes gifting authority', why: 'Required to execute spend-down strategy.' },
              ].map((item, i) => (
                <div key={i} className="flex gap-2">
                  <div className="w-3.5 h-3.5 mt-0.5 rounded border border-slate-300 flex-shrink-0" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-700 leading-snug">{item.action}</p>
                    <p className="text-[9px] text-slate-400 leading-snug">{item.why}</p>
                  </div>
                </div>
              ))}
            </div>
          </Section>
        </div>

        {/* 7 ── Attorney Contact ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 7 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Referred Attorney" icon={Users} accentColor="teal">
            <div className="flex items-start gap-2">
              <div className="w-7 h-7 rounded-full bg-teal-100 flex items-center justify-center flex-shrink-0 mt-0.5">
                <Briefcase className="w-3.5 h-3.5 text-teal-600" />
              </div>
              <div>
                <p className="text-[10px] font-bold text-slate-800">Sarah Mitchell, Esq.</p>
                <p className="text-[9px] text-slate-500">Mitchell Elder Law Group</p>
                <p className="text-[9px] text-slate-500">Tel: (561) 555-0142</p>
                <p className="text-[9px] text-teal-600 font-semibold mt-1">
                  Next: Schedule initial Medicaid planning consultation
                </p>
              </div>
            </div>
          </Section>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200">
        <p className="text-[9px] text-slate-400 text-center leading-relaxed">
          For planning purposes only. Verify all outputs with a licensed Medicaid attorney.
        </p>
        <p className="text-[9px] text-teal-500 font-semibold text-center mt-0.5">
          Powered by Poetiq
        </p>
      </div>
    </div>
  );
}

export default AttorneyBriefMock;
