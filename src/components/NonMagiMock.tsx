// src/components/NonMagiMock.tsx
import { useState, useEffect, useRef } from 'react';
import {
  MapPin,
  CheckCircle2,
  Info,
  DollarSign,
  ShieldCheck,
  Clock,
  Scale,
  TrendingDown,
  ChevronDown,
  ChevronRight,
  AlertTriangle,
  Activity,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC STATE DATA (6 representative states -- no API calls)
// ═══════════════════════════════════════════════════════════════════════════════

interface MockState {
  abbr: string;
  name: string;
  assetLimit: number;
  csraMax: number;
  csraMin: number;
  csraPercent: number;
  mmmnaBase: number;
  lookbackMonths: number;
  avgNhCost: number;
  notes: string;
}

const MOCK_STATES: MockState[] = [
  {
    abbr: 'FL',
    name: 'Florida',
    assetLimit: 2_000,
    csraMax: 154_140,
    csraMin: 30_828,
    csraPercent: 0.5,
    mmmnaBase: 2_465,
    lookbackMonths: 60,
    avgNhCost: 10_718,
    notes: 'Income cap state -- requires Qualified Income Trust (Miller Trust) when income exceeds $2,829/mo. 60-month look-back applies to all transfers.',
  },
  {
    abbr: 'NY',
    name: 'New York',
    assetLimit: 31_175,
    csraMax: 154_140,
    csraMin: 30_828,
    csraPercent: 0.5,
    mmmnaBase: 2_465,
    lookbackMonths: 60,
    avgNhCost: 13_884,
    notes: 'Medically needy state with higher asset limit. Supplemental needs trusts widely used. 30-month look-back for HCBS.',
  },
  {
    abbr: 'TX',
    name: 'Texas',
    assetLimit: 2_000,
    csraMax: 154_140,
    csraMin: 30_828,
    csraPercent: 0.5,
    mmmnaBase: 2_465,
    lookbackMonths: 60,
    avgNhCost: 6_692,
    notes: 'Income cap state. STAR+PLUS Medicaid managed care covers HCBS. Miller Trust required above $2,829/mo income.',
  },
  {
    abbr: 'CA',
    name: 'California',
    assetLimit: 130_000,
    csraMax: 154_140,
    csraMin: 30_828,
    csraPercent: 1.0,
    mmmnaBase: 2_465,
    lookbackMonths: 30,
    avgNhCost: 11_946,
    notes: '100% CSRA state -- community spouse keeps all countable assets up to the federal cap. Asset limit increased significantly in 2024.',
  },
  {
    abbr: 'IL',
    name: 'Illinois',
    assetLimit: 2_000,
    csraMax: 109_560,
    csraMin: 109_560,
    csraPercent: -1,
    mmmnaBase: 2_465,
    lookbackMonths: 60,
    avgNhCost: 7_756,
    notes: 'Fixed-figure CSRA state -- spouse always keeps $109,560 regardless of total assets. No income cap; medically needy pathway.',
  },
  {
    abbr: 'PA',
    name: 'Pennsylvania',
    assetLimit: 2_000,
    csraMax: 154_140,
    csraMin: 30_828,
    csraPercent: 0.5,
    mmmnaBase: 2_465,
    lookbackMonths: 60,
    avgNhCost: 11_500,
    notes: 'Standard 50% CSRA state. Estate recovery includes all probate assets. DRA-compliant penalty divisor updated annually.',
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });

function csraLabel(s: MockState): string {
  if (s.csraPercent === -1) return `Fixed ${fmt(s.csraMax)} (flat-figure rule)`;
  if (s.csraPercent === 1.0) return `100% of assets up to ${fmt(s.csraMax)}`;
  return `${s.csraPercent * 100}% of assets (${fmt(s.csraMin)} - ${fmt(s.csraMax)})`;
}

// ═══════════════════════════════════════════════════════════════════════════════
// COLLAPSIBLE SECTION (matches AttorneyBriefMock pattern)
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
// REVEAL ANIMATION
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

export function NonMagiMock() {
  const [selected, setSelected] = useState<MockState>(MOCK_STATES[0]);
  const [hovered, setHovered] = useState<MockState | null>(null);
  const revealed = useRevealAnimation(4, 400);

  const preview = hovered || selected;
  const isConfirmed = !hovered || hovered.abbr === selected.abbr;

  return (
    <div className="w-full max-w-md mx-auto flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">

      {/* ── Header ── */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-800 to-slate-700 text-white">
        <div className="flex items-center gap-2 mb-1">
          <TrendingDown className="w-4 h-4 text-teal-400" />
          <span className="text-xs font-bold tracking-wide">Non-MAGI Triage</span>
          <span className="ml-auto text-[9px] font-medium bg-teal-500/20 text-teal-300 border border-teal-500/30 rounded-full px-1.5 py-0.5 leading-none">
            LIVE DEMO
          </span>
        </div>
        <p className="text-[10px] text-slate-300 leading-relaxed">
          Select a state to preview Medicaid asset rules instantly
        </p>
      </div>

      {/* ── Scrollable body ── */}
      <div
        className="flex-1 overflow-y-auto px-3 py-3 space-y-2.5 bg-slate-50"
        style={{ maxHeight: '420px', minHeight: '280px' }}
      >

        {/* 1 ── State Pill Grid ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Select Applicant State" icon={MapPin} defaultOpen={true} accentColor="teal">
            <p className="text-[9px] text-slate-400 mb-2 font-medium uppercase tracking-wide">
              6 Sample States
            </p>
            <div className="grid grid-cols-6 gap-1.5">
              {MOCK_STATES.map((st) => (
                <button
                  key={st.abbr}
                  onClick={() => setSelected(st)}
                  onMouseEnter={() => setHovered(st)}
                  onMouseLeave={() => setHovered(null)}
                  title={st.name}
                  className={`relative inline-flex items-center justify-center h-9 rounded-lg text-[10px] font-bold transition-all duration-100 ${
                    selected.abbr === st.abbr
                      ? 'bg-teal-600 text-white shadow-md scale-110 ring-2 ring-teal-300'
                      : hovered?.abbr === st.abbr
                      ? 'bg-teal-100 text-teal-700 border border-teal-300 scale-105'
                      : 'bg-slate-100 text-slate-600 border border-slate-200 hover:bg-slate-200'
                  }`}
                >
                  {st.abbr}
                </button>
              ))}
            </div>
            <p className="text-[8px] text-slate-400 mt-1.5">
              Click to lock a state. Hover to preview.
            </p>
          </Section>
        </div>

        {/* 2 ── State Snapshot Panel ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title={`${preview.name} Medicaid Snapshot`} icon={Activity} defaultOpen={true} accentColor={isConfirmed ? 'teal' : 'slate'}>
            {/* Header row */}
            <div className="flex items-center justify-between mb-2">
              <div className="flex items-center gap-1.5">
                <span className="text-[11px] font-bold text-slate-800">{preview.name}</span>
                {isConfirmed && <CheckCircle2 className="w-3 h-3 text-teal-500" />}
              </div>
              <span className={`text-[8px] font-semibold rounded-full px-1.5 py-0.5 ${
                isConfirmed
                  ? 'text-teal-700 bg-teal-100 border border-teal-200'
                  : 'text-slate-500 bg-slate-100 border border-slate-200'
              }`}>
                {isConfirmed ? 'Selected' : 'Preview'}
              </span>
            </div>

            {/* 2x2 metrics grid */}
            <div className="grid grid-cols-2 gap-2 mb-2">
              <div className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">Asset Limit</p>
                <p className="text-[11px] font-bold text-slate-800 mt-0.5">{fmt(preview.assetLimit)}</p>
              </div>
              <div className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">Avg NH Cost</p>
                <p className="text-[11px] font-bold text-slate-800 mt-0.5">{fmt(preview.avgNhCost)}/mo</p>
              </div>
              <div className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">MMMNA Floor</p>
                <p className="text-[11px] font-bold text-slate-800 mt-0.5">{fmt(preview.mmmnaBase)}/mo</p>
              </div>
              <div className="rounded-md bg-slate-50 border border-slate-100 px-2 py-1.5">
                <p className="text-[8px] font-semibold uppercase tracking-wide text-slate-400">Look-Back</p>
                <p className="text-[11px] font-bold text-slate-800 mt-0.5">{preview.lookbackMonths} months</p>
              </div>
            </div>

            {/* CSRA row */}
            <div className="rounded-md bg-teal-50 border border-teal-100 px-2 py-1.5 mb-2">
              <p className="text-[8px] font-semibold uppercase tracking-wide text-teal-500">CSRA Formula</p>
              <p className="text-[10px] font-semibold text-teal-800 mt-0.5 leading-snug">{csraLabel(preview)}</p>
            </div>

            {/* Notes */}
            <div className="flex items-start gap-1.5 rounded-md border border-slate-200 bg-white px-2 py-1.5">
              <Info className="w-3 h-3 text-slate-400 flex-none mt-0.5" />
              <p className="text-[9px] text-slate-500 leading-relaxed">{preview.notes}</p>
            </div>
          </Section>
        </div>

        {/* 3 ── What This Means (quick insight) ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Why This Matters for Your Intake" icon={ShieldCheck} accentColor="green">
            <div className="space-y-2">
              <div className="flex gap-2">
                <DollarSign className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-700 leading-snug">Asset Spend-Down Target</p>
                  <p className="text-[9px] text-slate-500 leading-snug">
                    The family must reduce countable assets to {fmt(preview.assetLimit)} in {preview.name}. 
                    Every dollar above this threshold must be strategically allocated to exempt categories.
                  </p>
                </div>
              </div>
              <div className="flex gap-2">
                <Scale className="w-3.5 h-3.5 text-green-600 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="text-[10px] font-bold text-slate-700 leading-snug">Spousal Protection</p>
                  <p className="text-[9px] text-slate-500 leading-snug">
                    Under {preview.name}'s CSRA rules, the community spouse can protect up to {fmt(preview.csraMax)} in assets -- 
                    {preview.csraPercent === 1.0 ? ' the full amount of countable assets up to that cap.' 
                     : preview.csraPercent === -1 ? ` a fixed ${fmt(preview.csraMax)} regardless of total assets.`
                     : ` ${preview.csraPercent * 100}% of joint countable assets.`}
                  </p>
                </div>
              </div>
              {preview.avgNhCost > 10_000 && (
                <div className="flex gap-2">
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-[10px] font-bold text-slate-700 leading-snug">High-Cost State Alert</p>
                    <p className="text-[9px] text-slate-500 leading-snug">
                      At {fmt(preview.avgNhCost)}/mo average nursing home cost, transfer penalties 
                      in {preview.name} result in shorter ineligibility periods -- but the monthly 
                      burn rate makes every month of delay costly.
                    </p>
                  </div>
                </div>
              )}
            </div>
          </Section>
        </div>

        {/* 4 ── Quick Triage Checklist ── */}
        <div
          className={`transition-all duration-500 ${
            revealed >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
          }`}
        >
          <Section title="Intake Triage Checklist" icon={Clock} accentColor="slate">
            <div className="space-y-1.5">
              {[
                `Confirm ${preview.name} residency and county of application`,
                `Ask: Does monthly income exceed ${fmt(2_829)}? (Miller Trust trigger)`,
                'Document 3+ ADL deficits for nursing facility level of care',
                `Verify no gifts in the last ${preview.lookbackMonths} months`,
                'Identify community spouse for CSRA and MMMNA calculations',
              ].map((item, i) => (
                <div key={i} className="flex gap-2 items-start">
                  <div className="w-3.5 h-3.5 mt-0.5 rounded border border-slate-300 flex-shrink-0" />
                  <p className="text-[9px] text-slate-600 leading-snug">{item}</p>
                </div>
              ))}
            </div>
          </Section>
        </div>

      </div>

      {/* ── Footer ── */}
      <div className="px-4 py-2.5 bg-white border-t border-slate-200">
        <p className="text-[9px] text-slate-400 text-center leading-relaxed">
          Figures shown are federal or state-specific baselines. Always verify with current state Medicaid policy.
        </p>
        <p className="text-[9px] text-teal-500 font-semibold text-center mt-0.5">
          Powered by Poetiq
        </p>
      </div>
    </div>
  );
}

export default NonMagiMock;
