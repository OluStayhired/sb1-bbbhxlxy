import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  MapPin,
  Heart,
  Bath,
  Shirt,
  Utensils,
  User,
  Gift,
  AlertTriangle,
  CheckCircle2,
  ShieldCheck,
  Users,
  Scale,
  DollarSign,
  Home,
  Sliders,
  FileText,
  ArrowRight,
  Play,
  Pause,
  RotateCcw,
  ChevronDown,
  ChevronUp,
  Activity,
  Clock,
  Sparkles,
  BrainCircuit,
  Target,
  BookOpen,
  AlertCircle,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// TYPES
// ═══════════════════════════════════════════════════════════════════════════════

interface ADLState {
  bathing: boolean;
  dressing: boolean;
  eating: boolean;
  toileting: boolean;
  transferring: boolean;
}

interface StateData {
  abbr: string;
  name: string;
  assetLimit: number;
  csraMax: number;
  csraMin: number;
  csraPercent: number;
  mmmnaBase: number;
  lookbackMonths: number;
  avgNhCost: number;
  incomeCap: number;
}

interface ClientProfile {
  name: string;
  age: number;
  relation: string;
  state: StateData;
  adls: ADLState;
  hasCommunitySpouse: boolean;
  applicantMonthlyIncome: number;
  spouseMonthlyIncome: number;
  monthlyLivingExpenses: number;
  hasTransfersInLookback: boolean;
  transferAmount: number;
  transferMonthsAgo: number;
  isVeteran: boolean;
  totalCountableAssets: number;
  whatIf: {
    spendDownAmount: number;
    trustAmount: number;
    prepaidFuneralAmount: number;
    homeRepairAmount: number;
  };
}

// ═══════════════════════════════════════════════════════════════════════════════
// STATE DATA (subset for the demo)
// ═══════════════════════════════════════════════════════════════════════════════

const DEMO_STATES: StateData[] = [
  { abbr: 'FL', name: 'Florida', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 9_485, incomeCap: 2_829 },
  { abbr: 'AZ', name: 'Arizona', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 7_756, incomeCap: 2_829 },
  { abbr: 'TX', name: 'Texas', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 5_536, incomeCap: 2_829 },
  { abbr: 'NY', name: 'New York', assetLimit: 30_182, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 13_586, incomeCap: 0 },
  { abbr: 'CA', name: 'California', assetLimit: 130_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 1.0, mmmnaBase: 3_520, lookbackMonths: 30, avgNhCost: 10_646, incomeCap: 0 },
  { abbr: 'OH', name: 'Ohio', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 7_756, incomeCap: 2_829 },
  { abbr: 'PA', name: 'Pennsylvania', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 10_159, incomeCap: 2_829 },
  { abbr: 'IL', name: 'Illinois', assetLimit: 2_000, csraMax: 109_560, csraMin: 109_560, csraPercent: -1, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 6_693, incomeCap: 0 },
  { abbr: 'GA', name: 'Georgia', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 6_875, incomeCap: 2_829 },
  { abbr: 'NC', name: 'North Carolina', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 8_120, incomeCap: 2_829 },
  { abbr: 'NJ', name: 'New Jersey', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 11_888, incomeCap: 2_829 },
  { abbr: 'VA', name: 'Virginia', assetLimit: 2_000, csraMax: 154_140, csraMin: 30_828, csraPercent: 0.5, mmmnaBase: 3_520, lookbackMonths: 60, avgNhCost: 8_517, incomeCap: 2_829 },
];

const STATE_GRID_ABBRS = ['FL','AZ','TX','NY','CA','OH','PA','IL','GA','NC','NJ','VA'];

// ═══════════════════════════════════════════════════════════════════════════════
// CLIENT PROFILES
// ═══════════════════════════════════════════════════════════════════════════════

const CLIENT_PROFILES: ClientProfile[] = [
  {
    name: 'Margaret Chen',
    age: 81,
    relation: 'Mother',
    state: DEMO_STATES.find(s => s.abbr === 'FL')!,
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
  },
  {
    name: 'Robert Williams',
    age: 78,
    relation: 'Father',
    state: DEMO_STATES.find(s => s.abbr === 'AZ')!,
    adls: { bathing: true, dressing: true, eating: true, toileting: false, transferring: true },
    hasCommunitySpouse: true,
    applicantMonthlyIncome: 2_950,
    spouseMonthlyIncome: 2_100,
    monthlyLivingExpenses: 2_800,
    hasTransfersInLookback: false,
    transferAmount: 0,
    transferMonthsAgo: 0,
    isVeteran: true,
    totalCountableAssets: 142_000,
    whatIf: { spendDownAmount: 38_000, trustAmount: 0, prepaidFuneralAmount: 12_000, homeRepairAmount: 8_000 },
  },
  {
    name: 'Dorothy Harris',
    age: 85,
    relation: 'Mother',
    state: DEMO_STATES.find(s => s.abbr === 'TX')!,
    adls: { bathing: true, dressing: true, eating: true, toileting: true, transferring: false },
    hasCommunitySpouse: false,
    applicantMonthlyIncome: 1_680,
    spouseMonthlyIncome: 0,
    monthlyLivingExpenses: 0,
    hasTransfersInLookback: true,
    transferAmount: 40_000,
    transferMonthsAgo: 14,
    isVeteran: false,
    totalCountableAssets: 95_000,
    whatIf: { spendDownAmount: 52_000, trustAmount: 0, prepaidFuneralAmount: 15_000, homeRepairAmount: 10_000 },
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// CALCULATION HELPERS
// ═══════════════════════════════════════════════════════════════════════════════

function fmt(n: number): string {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

function calcCSRA(totalAssets: number, state: StateData): number {
  if (state.csraPercent === -1) return state.csraMax;
  if (state.csraPercent === 1.0) return Math.min(totalAssets, state.csraMax);
  const share = totalAssets * state.csraPercent;
  return Math.min(Math.max(share, state.csraMin), state.csraMax);
}

function calcPenaltyMonths(amount: number, avgNhCost: number): number {
  if (!avgNhCost || avgNhCost <= 0) return Math.round(amount / 8_000);
  return Math.floor(amount / avgNhCost);
}

function countADLs(adls: ADLState): number {
  return Object.values(adls).filter(Boolean).length;
}

function getADLNames(adls: ADLState): string[] {
  const labels: Record<keyof ADLState, string> = {
    bathing: 'Bathing', dressing: 'Dressing', eating: 'Eating',
    toileting: 'Toileting', transferring: 'Transferring',
  };
  return (Object.keys(adls) as Array<keyof ADLState>).filter(k => adls[k]).map(k => labels[k]);
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP DEFINITIONS
// ═══════════════════════════════════════════════════════════════════════════════

const STEPS = [
  { num: 1, title: 'Select Client State', icon: MapPin, durationMs: 4000 },
  { num: 2, title: 'Assess Care Needs', icon: Activity, durationMs: 5000 },
  { num: 3, title: 'Flag Gift & Look-Back', icon: Gift, durationMs: 5500 },
  { num: 4, title: 'Spend-Down Dashboard', icon: Sliders, durationMs: 7000 },
  { num: 5, title: 'Attorney-Ready PDF', icon: FileText, durationMs: 7000 },
];

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN COMPONENT
// ═══════════════════════════════════════════════════════════════════════════════

export function IntakeWorkflow() {
  const [profileIdx, setProfileIdx] = useState(0);
  const [step, setStep] = useState(0);
  const [subStep, setSubStep] = useState(0); // for internal animations within a step
  const [isPlaying, setIsPlaying] = useState(true);
  const [expandedNarrative, setExpandedNarrative] = useState(true);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const profile = CLIENT_PROFILES[profileIdx];

  // Derived calculations
  const adlCount = countADLs(profile.adls);
  const adlNames = getADLNames(profile.adls);
  const csraAmt = profile.hasCommunitySpouse ? calcCSRA(profile.totalCountableAssets, profile.state) : 0;
  const penaltyMonths = profile.hasTransfersInLookback ? calcPenaltyMonths(profile.transferAmount, profile.state.avgNhCost) : 0;
  const mmmnaFloor = profile.state.mmmnaBase;
  const spillageShortfall = Math.max(0, mmmnaFloor - profile.spouseMonthlyIncome);
  const diversionAmount = Math.min(spillageShortfall, profile.applicantMonthlyIncome);
  const millerExcess = profile.state.incomeCap > 0 ? Math.max(0, profile.applicantMonthlyIncome - profile.state.incomeCap) : 0;
  const millerNeeded = millerExcess > 0;
  const applicantCountable = profile.hasCommunitySpouse ? Math.max(0, profile.totalCountableAssets - csraAmt) : profile.totalCountableAssets;
  const remainingSpendDown = Math.max(0, applicantCountable - profile.state.assetLimit);
  const whatIfTotal = profile.whatIf.spendDownAmount + profile.whatIf.trustAmount + profile.whatIf.prepaidFuneralAmount + profile.whatIf.homeRepairAmount;

  // Auto-play logic
  const advanceStep = useCallback(() => {
    setSubStep(0);
    setStep(prev => {
      if (prev >= STEPS.length - 1) {
        // Move to next profile
        setProfileIdx(pi => (pi + 1) % CLIENT_PROFILES.length);
        return 0;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (!isPlaying) return;
    const duration = STEPS[step]?.durationMs ?? 5000;

    // Animate sub-steps within each step
    const subStepInterval = setInterval(() => {
      setSubStep(s => s + 1);
    }, 800);

    timerRef.current = setTimeout(() => {
      clearInterval(subStepInterval);
      advanceStep();
    }, duration);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
      clearInterval(subStepInterval);
    };
  }, [step, profileIdx, isPlaying, advanceStep]);

  const togglePlay = () => setIsPlaying(p => !p);
  const restart = () => {
    setStep(0);
    setSubStep(0);
    setProfileIdx(0);
    setIsPlaying(true);
  };

  // ═══════════════════════════════════════════════════════════════════════════
  // NARRATIVES per step (the "Why it matters")
  // ═══════════════════════════════════════════════════════════════════════════

  const narratives = [
    `Selecting ${profile.state.name} instantly loads local Non-MAGI and ABD rules, the ${fmt(profile.state.assetLimit)} asset limit, ${profile.state.lookbackMonths}-month look-back window, and ${fmt(profile.state.avgNhCost)}/mo nursing home rates. Every calculation that follows is calibrated to exact state thresholds.`,
    `${profile.name.split(' ')[0]} needs hands-on help with ${adlCount} daily activities: ${adlNames.join(', ')}. This ${adlCount >= 3 ? 'meets' : 'falls below'} the state requirement of 3+ care needs for Medicaid nursing coverage, establishing immediate in-home care urgency while the family is still on the phone.`,
    profile.hasTransfersInLookback
      ? `A past gift of ${fmt(profile.transferAmount)} made ${profile.transferMonthsAgo} months ago triggers a ${penaltyMonths}-month Medicaid look-back penalty. Surfacing this now prevents costly surprises and shows the family your team understands complex legal landmines before they become expensive mistakes.`
      : `No disqualifying gifts or transfers within the ${profile.state.lookbackMonths}-month look-back window. This clean financial history means benefits can proceed without penalty delays — excellent news for the intake timeline.`,
    `The dashboard reveals: ${profile.hasCommunitySpouse ? `${fmt(csraAmt)} protected for the spouse through CSRA, ` : ''}${millerNeeded ? `Miller Trust required for ${fmt(millerExcess)}/mo income spillage, ` : ''}${fmt(remainingSpendDown)} remaining spend-down target. What felt like "we can't afford care" becomes a transparent, manageable financial roadmap.`,
    `One click generates a multi-page professional PDF: Executive Insight, financial triage ledger, attorney-ready diagnostics, and a family action checklist. The family takes home a physical asset to review tonight, and you have a pre-packaged brief ready to forward to your partner elder law firm.`,
  ];

  return (
    <div className="w-full">
      {/* Profile Switcher + Controls */}
      <div className="flex items-center justify-between mb-4 px-1">
        <div className="flex items-center gap-3">
          {CLIENT_PROFILES.map((p, i) => (
            <button
              key={p.name}
              onClick={() => { setProfileIdx(i); setStep(0); setSubStep(0); }}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium transition-all duration-300 ${
                i === profileIdx
                  //? 'bg-teal-600 text-white shadow-md shadow-teal-200'
                  ? 'bg-slate-600 text-white shadow-md shadow-slate-200'
                  : 'bg-slate-100 text-slate-500 hover:bg-slate-200'
              }`}
            >
              <User className="w-3 h-3" />
              <span>{p.name.split(' ')[0]}, {p.age}</span>
            </button>
          ))}
        </div>
        <div className="flex items-center gap-2">
          <button onClick={togglePlay} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button onClick={restart} className="p-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-600 transition-colors">
            <RotateCcw className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* Step Progress */}
      <div className="flex items-center gap-1 mb-5 px-1">
        {STEPS.map((s, i) => (
          <React.Fragment key={s.num}>
            <button
              onClick={() => { setStep(i); setSubStep(0); }}
              className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-xs font-semibold transition-all duration-300 cursor-pointer ${
                i === step
                  ? 'bg-teal-600 text-white shadow-md shadow-teal-200/50'
                  : i < step
                  ? 'bg-teal-50 text-teal-700 border border-teal-200'
                  : 'bg-slate-50 text-slate-400 border border-slate-200'
              }`}
            >
              {i < step ? (
                <CheckCircle2 className="w-3 h-3" />
              ) : (
                <s.icon className="w-3 h-3" />
              )}
              <span className="hidden lg:inline">{s.title}</span>
              <span className="lg:hidden">{s.num}</span>
            </button>
            {i < STEPS.length - 1 && (
              <div className={`flex-1 h-0.5 rounded-full transition-colors duration-500 ${i < step ? 'bg-teal-400' : 'bg-slate-200'}`} />
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Step Content Area */}
      <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-sm">
        {/*<div className="min-h-[380px]">*/}
        <div className="h-[580px] max-h-[580px]">  
          {step === 0 && <StepStateSelect profile={profile} subStep={subStep} />}
          {step === 1 && <StepADLSelect profile={profile} subStep={subStep} />}
          {step === 2 && <StepGiftLookBack profile={profile} subStep={subStep} penaltyMonths={penaltyMonths} />}
          {step === 3 && (
            <StepDashboard
              profile={profile}
              csraAmt={csraAmt}
              millerNeeded={millerNeeded}
              millerExcess={millerExcess}
              mmmnaFloor={mmmnaFloor}
              spillageShortfall={spillageShortfall}
              diversionAmount={diversionAmount}
              remainingSpendDown={remainingSpendDown}
              whatIfTotal={whatIfTotal}
              adlCount={adlCount}
              adlNames={adlNames}
              penaltyMonths={penaltyMonths}
              subStep={subStep}
            />
          )}
          {step === 4 && (
            <StepPdfPreview
              profile={profile}
              csraAmt={csraAmt}
              millerExcess={millerExcess}
              remainingSpendDown={remainingSpendDown}
              adlCount={adlCount}
              adlNames={adlNames}
              penaltyMonths={penaltyMonths}
              mmmnaFloor={mmmnaFloor}
              subStep={subStep}
            />
          )}
        </div>

        {/* Narrative bar */}
        <div className="border-t border-slate-100 bg-slate-50/80">
          <button
            onClick={() => setExpandedNarrative(e => !e)}
            className="flex items-center justify-between w-full px-5 py-3 text-left"
          >
            <div className="flex items-center gap-2">
              <Sparkles className="w-3.5 h-3.5 text-teal-500" />
              <span className="text-xs font-bold text-teal-700 uppercase tracking-wide">Why This Matters</span>
            </div>
            {expandedNarrative ? <ChevronUp className="w-4 h-4 text-slate-400" /> : <ChevronDown className="w-4 h-4 text-slate-400" />}
          </button>
          {expandedNarrative && (
            <div className="px-5 pb-4">
              <p className="text-sm text-slate-600 leading-relaxed">{narratives[step]}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 1: STATE SELECTION
// ═══════════════════════════════════════════════════════════════════════════════

function StepStateSelect({ profile, subStep }: { profile: ClientProfile; subStep: number }) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <MapPin className="w-5 h-5 text-teal-600" />
        <h3 className="text-sm font-bold text-slate-800">Select Client State</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-teal-50 text-teal-700 border border-teal-200">
          Non-MAGI Rules Loaded
        </span>
      </div>

      {/* State Grid */}
      <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 mb-5">
        {STATE_GRID_ABBRS.map((abbr, i) => {
          const isSelected = abbr === profile.state.abbr;
          const isAnimating = subStep >= 1 && isSelected;
          return (
            <div
              key={abbr}
              className={`relative flex items-center justify-center h-11 rounded-lg text-xs font-bold transition-all duration-500 cursor-default ${
                isAnimating
                  ? 'bg-teal-600 text-white shadow-lg shadow-teal-200/60 scale-105 ring-2 ring-teal-400 ring-offset-1'
                  : 'bg-slate-50 text-slate-500 border border-slate-200'
              }`}
              style={{ transitionDelay: isAnimating ? '0ms' : `${i * 30}ms` }}
            >
              {abbr}
              {isAnimating && (
                <div className="absolute -top-1 -right-1 w-4 h-4 rounded-full bg-teal-500 border-2 border-white flex items-center justify-center">
                  <CheckCircle2 className="w-2.5 h-2.5 text-white" />
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* State Details Card */}
      <div className={`rounded-xl border border-teal-200 bg-teal-50/50 p-4 transition-all duration-700 ${subStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-3'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-teal-100 text-teal-700 text-sm font-extrabold">
            {profile.state.abbr}
          </div>
          <div>
            <p className="text-sm font-bold text-slate-800">{profile.state.name}</p>
            <p className="text-xs text-slate-500">Non-MAGI ABD rules active</p>
          </div>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          {[
            { label: 'Asset Limit', value: fmt(profile.state.assetLimit) },
            { label: 'Look-Back', value: `${profile.state.lookbackMonths} months` },
            { label: 'Avg NH Cost', value: `${fmt(profile.state.avgNhCost)}/mo` },
            { label: 'Income Cap', value: profile.state.incomeCap > 0 ? `${fmt(profile.state.incomeCap)}/mo` : 'Medically Needy' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-lg p-2.5 border border-teal-100">
              <p className="text-[10px] text-slate-500 font-semibold uppercase tracking-wide">{item.label}</p>
              <p className="text-sm font-bold text-slate-800 mt-0.5">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 2: ADL SELECTION
// ═══════════════════════════════════════════════════════════════════════════════

const ADL_CONFIG: { key: keyof ADLState; label: string; icon: React.FC<{ className?: string }> }[] = [
  { key: 'bathing', label: 'Bathing', icon: Bath },
  { key: 'dressing', label: 'Dressing', icon: Shirt },
  { key: 'eating', label: 'Eating', icon: Utensils },
  { key: 'toileting', label: 'Toileting', icon: User },
  { key: 'transferring', label: 'Transferring', icon: Activity },
];

function StepADLSelect({ profile, subStep }: { profile: ClientProfile; subStep: number }) {
  const adlCount = countADLs(profile.adls);
  const adlEntries = ADL_CONFIG.map(c => ({ ...c, active: profile.adls[c.key] }));
  const qualifies = adlCount >= 3;

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Activity className="w-5 h-5 text-teal-600" />
        <h3 className="text-sm font-bold text-slate-800">Activities of Daily Living (ADLs)</h3>
      </div>

      <div className="grid grid-cols-5 gap-3 mb-5">
        {adlEntries.map((adl, i) => {
          const revealed = subStep > i;
          const isActive = revealed && adl.active;
          return (
            <div
              key={adl.key}
              className={`flex flex-col items-center gap-2 p-3 rounded-xl border-2 transition-all duration-500 ${
                isActive
                  ? 'border-red-300 bg-red-50 shadow-md shadow-red-100/50'
                  : revealed
                  ? 'border-green-200 bg-green-50/50'
                  : 'border-slate-200 bg-slate-50 opacity-50'
              }`}
              style={{ transitionDelay: `${i * 150}ms` }}
            >
              <div className={`w-10 h-10 rounded-full flex items-center justify-center transition-colors duration-500 ${
                isActive ? 'bg-red-100' : revealed ? 'bg-green-100' : 'bg-slate-100'
              }`}>
                <adl.icon className={`w-5 h-5 ${isActive ? 'text-red-600' : revealed ? 'text-green-600' : 'text-slate-400'}`} />
              </div>
              <span className={`text-xs font-semibold ${isActive ? 'text-red-700' : revealed ? 'text-green-700' : 'text-slate-400'}`}>
                {adl.label}
              </span>
              {revealed && (
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
                  isActive ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
                }`}>
                  {isActive ? 'DEFICIT' : 'OK'}
                </span>
              )}
            </div>
          );
        })}
      </div>

      {/* Qualification Banner */}
      <div className={`rounded-xl border p-4 transition-all duration-700 ${subStep >= 5
        ? 'opacity-100 translate-y-0'
        : 'opacity-0 translate-y-3'
      } ${qualifies ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
        <div className="flex items-center gap-2 mb-1.5">
          {qualifies
            ? <CheckCircle2 className="w-5 h-5 text-green-600" />
            : <AlertCircle className="w-5 h-5 text-red-600" />
          }
          <span className={`text-sm font-bold ${qualifies ? 'text-green-800' : 'text-red-800'}`}>
            {adlCount} of 5 ADLs — {qualifies ? 'Medicaid Care Threshold Met' : 'Below 3-ADL Threshold'}
          </span>
        </div>
        <p className={`text-xs ${qualifies ? 'text-green-700' : 'text-red-700'}`}>
          {profile.name.split(' ')[0]} needs help with: <strong>{getADLNames(profile.adls).join(', ')}</strong>.
          {qualifies
            ? ' This qualifies for state-funded nursing care assessment.'
            : ' Additional clinical documentation may establish further deficits.'}
        </p>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 3: GIFT & LOOK-BACK
// ═══════════════════════════════════════════════════════════════════════════════

function StepGiftLookBack({ profile, subStep, penaltyMonths }: { profile: ClientProfile; subStep: number; penaltyMonths: number }) {
  const hasTransfer = profile.hasTransfersInLookback;

  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Gift className="w-5 h-5 text-teal-600" />
        <h3 className="text-sm font-bold text-slate-800">Gift Transfer & Look-Back Analysis</h3>
      </div>

      {/* Scanning Animation */}
      <div className={`rounded-xl border border-slate-200 bg-slate-50 p-4 mb-4 transition-all duration-700 ${subStep >= 1 ? 'opacity-100' : 'opacity-50'}`}>
        <div className="flex items-center gap-3 mb-3">
          <div className="w-8 h-8 rounded-lg bg-slate-200 flex items-center justify-center">
            <Clock className="w-4 h-4 text-slate-600" />
          </div>
          <div>
            <p className="text-sm font-bold text-slate-700">{profile.state.lookbackMonths}-Month Look-Back Window</p>
            <p className="text-xs text-slate-500">Scanning {(profile.state.lookbackMonths / 12).toFixed(0)} years of financial history...</p>
          </div>
          {subStep >= 2 && (
            <span className={`ml-auto text-xs font-bold px-2.5 py-1 rounded-full ${
              hasTransfer ? 'bg-red-100 text-red-700' : 'bg-green-100 text-green-700'
            }`}>
              {hasTransfer ? 'TRANSFER DETECTED' : 'CLEAN'}
            </span>
          )}
        </div>

        {/* Progress bar */}
        <div className="w-full h-1.5 bg-slate-200 rounded-full overflow-hidden">
          <div
            className={`h-full rounded-full transition-all duration-[2000ms] ease-out ${hasTransfer ? 'bg-red-500' : 'bg-green-500'}`}
            style={{ width: subStep >= 2 ? '100%' : subStep >= 1 ? '60%' : '0%' }}
          />
        </div>
      </div>

      {/* Result */}
      {subStep >= 3 && hasTransfer && (
        <div className="rounded-xl border-2 border-red-200 bg-red-50 p-4 space-y-3 transition-all duration-700 animate-in fade-in">
          <div className="flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-red-600" />
            <span className="text-sm font-bold text-red-800">Penalty Alert: {fmt(profile.transferAmount)} Gift Detected</span>
          </div>

          <div className="grid grid-cols-3 gap-3">
            <div className="bg-white rounded-lg p-3 border border-red-100">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Gift Amount</p>
              <p className="text-lg font-bold text-red-700">{fmt(profile.transferAmount)}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-red-100">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Months Ago</p>
              <p className="text-lg font-bold text-red-700">{profile.transferMonthsAgo}</p>
            </div>
            <div className="bg-white rounded-lg p-3 border border-red-100">
              <p className="text-[10px] text-slate-500 font-semibold uppercase">Penalty Period</p>
              <p className="text-lg font-bold text-red-700">{penaltyMonths} mo</p>
            </div>
          </div>

          <div className="flex items-start gap-2 bg-red-100/60 rounded-lg p-3 text-xs text-red-800">
            <AlertTriangle className="w-3.5 h-3.5 mt-0.5 flex-shrink-0" />
            <span><strong>Penalty Calc:</strong> {fmt(profile.transferAmount)} / {fmt(profile.state.avgNhCost)}/mo ({profile.state.abbr} avg. NH cost) = {penaltyMonths}-month ineligibility. Attorney review recommended for half-a-loaf or return-of-gift strategies.</span>
          </div>
        </div>
      )}

      {subStep >= 3 && !hasTransfer && (
        <div className="rounded-xl border-2 border-green-200 bg-green-50 p-4 transition-all duration-700">
          <div className="flex items-center gap-2 mb-2">
            <CheckCircle2 className="w-5 h-5 text-green-600" />
            <span className="text-sm font-bold text-green-800">Clean Financial History</span>
          </div>
          <p className="text-sm text-green-700">
            No disqualifying transfers within the {profile.state.lookbackMonths}-month look-back window. Benefits can proceed without penalty delays.
          </p>
        </div>
      )}
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 4: SPEND-DOWN DASHBOARD
// ═══════════════════════════════════════════════════════════════════════════════

function StepDashboard({
  profile, csraAmt, millerNeeded, millerExcess, mmmnaFloor,
  spillageShortfall, diversionAmount, remainingSpendDown, whatIfTotal,
  adlCount, adlNames, penaltyMonths, subStep,
}: {
  profile: ClientProfile; csraAmt: number; millerNeeded: boolean; millerExcess: number;
  mmmnaFloor: number; spillageShortfall: number; diversionAmount: number;
  remainingSpendDown: number; whatIfTotal: number; adlCount: number; adlNames: string[];
  penaltyMonths: number; subStep: number;
}) {
  return (
    <div className="p-5">
      <div className="flex items-center gap-2 mb-4">
        <Sliders className="w-5 h-5 text-teal-600" />
        <h3 className="text-sm font-bold text-slate-800">Spend-Down Planner Dashboard</h3>
        <span className="text-xs px-2 py-0.5 rounded-full font-semibold bg-slate-100 text-slate-600 border border-slate-200">
          {profile.name} &middot; {profile.state.abbr}
        </span>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {/* Clinical Status Card */}
        <div className={`rounded-xl border p-3.5 space-y-2 transition-all duration-500 ${subStep >= 0 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${adlCount >= 3 ? 'border-green-200 bg-green-50/30' : 'border-red-200 bg-red-50/30'}`}>
          <div className="flex items-center gap-2">
            <Activity className={`w-4 h-4 ${adlCount >= 3 ? 'text-green-600' : 'text-red-600'}`} />
            <span className="text-xs font-bold text-slate-800">Clinical Level of Care</span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${adlCount >= 3 ? 'bg-green-100 text-green-700 border border-green-200' : 'bg-red-100 text-red-700 border border-red-200'}`}>
              {adlCount >= 3 ? 'Qualifies' : 'Below Threshold'}
            </span>
          </div>
          <p className="text-xs text-slate-600">{adlCount} ADL deficits: {adlNames.join(', ')}</p>
        </div>

        {/* CSRA Card */}
        {profile.hasCommunitySpouse && (
          <div className={`rounded-xl border border-green-200 bg-green-50/30 p-3.5 space-y-2 transition-all duration-500 ${subStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex items-center gap-2">
              <Users className="w-4 h-4 text-green-600" />
              <span className="text-xs font-bold text-slate-800">Community Spouse Protections</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700 border border-green-200">CSRA Active</span>
            </div>
            <div className="grid grid-cols-2 gap-2">
              <div className="bg-green-50 rounded-lg p-2 border border-green-100">
                <p className="text-[10px] text-green-700 font-semibold">CSRA (Asset Shield)</p>
                <p className="text-base font-bold text-green-800">{fmt(csraAmt)}</p>
              </div>
              <div className="bg-blue-50 rounded-lg p-2 border border-blue-100">
                <p className="text-[10px] text-blue-700 font-semibold">MMMNA (Income Floor)</p>
                <p className="text-base font-bold text-blue-800">{fmt(mmmnaFloor)}/mo</p>
              </div>
            </div>
            {spillageShortfall > 0 && (
              <div className="flex items-center gap-2 bg-amber-50 rounded-lg p-2 border border-amber-200 text-xs text-amber-800">
                <AlertTriangle className="w-3.5 h-3.5 flex-shrink-0" />
                <span>Diversion needed: {fmt(diversionAmount)}/mo to cover {fmt(spillageShortfall)}/mo MMMNA shortfall</span>
              </div>
            )}
          </div>
        )}

        {/* Miller Trust Card */}
        {millerNeeded && (
          <div className={`rounded-xl border border-amber-200 bg-amber-50/30 p-3.5 space-y-2 transition-all duration-500 ${subStep >= 2 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
            <div className="flex items-center gap-2">
              <Scale className="w-4 h-4 text-amber-600" />
              <span className="text-xs font-bold text-slate-800">Miller Trust (QIT) Required</span>
              <span className="text-[10px] font-bold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700 border border-amber-200">Income Over Cap</span>
            </div>
            <div className="grid grid-cols-3 gap-2">
              <div className="bg-white rounded-lg p-2 border border-amber-100">
                <p className="text-[10px] text-slate-500 font-semibold">Income</p>
                <p className="text-sm font-bold text-slate-800">{fmt(profile.applicantMonthlyIncome)}/mo</p>
              </div>
              <div className="bg-white rounded-lg p-2 border border-amber-100">
                <p className="text-[10px] text-slate-500 font-semibold">Cap</p>
                <p className="text-sm font-bold text-slate-800">{fmt(profile.state.incomeCap)}/mo</p>
              </div>
              <div className="bg-amber-50 rounded-lg p-2 border border-amber-200">
                <p className="text-[10px] text-amber-700 font-semibold">Excess</p>
                <p className="text-sm font-bold text-amber-800">{fmt(millerExcess)}/mo</p>
              </div>
            </div>
          </div>
        )}

        {/* Look-Back Status */}
        <div className={`rounded-xl border p-3.5 space-y-2 transition-all duration-500 ${subStep >= 3 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'} ${profile.hasTransfersInLookback ? 'border-red-200 bg-red-50/30' : 'border-green-200 bg-green-50/30'}`}>
          <div className="flex items-center gap-2">
            {profile.hasTransfersInLookback
              ? <AlertTriangle className="w-4 h-4 text-red-600" />
              : <CheckCircle2 className="w-4 h-4 text-green-600" />
            }
            <span className="text-xs font-bold text-slate-800">
              {profile.hasTransfersInLookback ? 'Look-Back Penalty' : 'Look-Back Window — Clean'}
            </span>
            <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full ${
              profile.hasTransfersInLookback
                ? 'bg-red-100 text-red-700 border border-red-200'
                : 'bg-green-100 text-green-700 border border-green-200'
            }`}>
              {profile.hasTransfersInLookback ? `~${penaltyMonths}-Mo Penalty` : 'Clean'}
            </span>
          </div>
          <p className="text-xs text-slate-600">
            {profile.hasTransfersInLookback
              ? `${fmt(profile.transferAmount)} transfer ${profile.transferMonthsAgo} months ago. Attorney referral recommended.`
              : `No disqualifying transfers in the ${profile.state.lookbackMonths}-month window.`}
          </p>
        </div>
      </div>

      {/* Spend-Down Summary Bar */}
      <div className={`mt-4 rounded-xl border border-teal-200 bg-gradient-to-r from-teal-50 to-slate-50 p-4 transition-all duration-700 ${subStep >= 4 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'}`}>
        <div className="flex items-center justify-between mb-2">
          <span className="text-xs font-bold text-teal-800 uppercase tracking-wide">Remaining Spend-Down Target</span>
          <span className="text-lg font-extrabold text-teal-700">{fmt(remainingSpendDown)}</span>
        </div>
        <div className="grid grid-cols-4 gap-2">
          {[
            { label: 'Medical Costs', amount: profile.whatIf.spendDownAmount, icon: DollarSign, color: 'text-green-600' },
            { label: 'Prepaid Funeral', amount: profile.whatIf.prepaidFuneralAmount, icon: BookOpen, color: 'text-blue-600' },
            { label: 'Home Repair', amount: profile.whatIf.homeRepairAmount, icon: Home, color: 'text-blue-600' },
            { label: 'Trust Transfer', amount: profile.whatIf.trustAmount, icon: Scale, color: 'text-amber-600' },
          ].map(item => (
            <div key={item.label} className="bg-white rounded-lg p-2 border border-slate-100 text-center">
              <item.icon className={`w-3.5 h-3.5 mx-auto mb-1 ${item.color}`} />
              <p className="text-[10px] text-slate-500 font-semibold">{item.label}</p>
              <p className="text-xs font-bold text-slate-800">{fmt(item.amount)}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// STEP 5: SIMULATED PDF PREVIEW
// ═══════════════════════════════════════════════════════════════════════════════

function StepPdfPreview({
  profile, csraAmt, millerExcess, remainingSpendDown,
  adlCount, adlNames, penaltyMonths, mmmnaFloor, subStep,
}: {
  profile: ClientProfile; csraAmt: number; millerExcess: number;
  remainingSpendDown: number; adlCount: number; adlNames: string[];
  penaltyMonths: number; mmmnaFloor: number; subStep: number;
}) {
  const today = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
  const millerNeeded = millerExcess > 0;

  return (
    <div className="p-5">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <FileText className="w-5 h-5 text-teal-600" />
          <h3 className="text-sm font-bold text-slate-800">Attorney-Ready Diagnostic PDF</h3>
        </div>
        <div className={`flex items-center gap-2 px-3 py-1.5 rounded-lg bg-teal-600 text-white text-xs font-semibold shadow-md shadow-teal-200/50 transition-all duration-500 ${subStep >= 1 ? 'opacity-100 scale-100' : 'opacity-0 scale-90'}`}>
          <FileText className="w-3.5 h-3.5" />
          <span>Export PDF</span>
          <ArrowRight className="w-3 h-3" />
        </div>
      </div>

      {/* Simulated PDF Page */}
      <div className={`rounded-xl border border-slate-300 bg-white shadow-xl shadow-slate-200/60 overflow-hidden transition-all duration-700 ${subStep >= 1 ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`}>
        {/* PDF Header */}
        <div className="px-5 pt-4 pb-3 border-b border-slate-200">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-base font-bold text-slate-800">Medicaid Planning Summary</h4>
              <p className="text-[10px] text-slate-500 mt-0.5">
                Prepared for: {profile.name}, age {profile.age} ({profile.relation}) &middot; {profile.state.name} ({profile.state.abbr}) &middot; {today}
              </p>
            </div>
            <div className="flex items-center gap-1">
              <Target className="w-4 h-4 text-teal-500" />
              <span className="text-xs font-bold text-teal-600">poetiq</span>
            </div>
          </div>
        </div>

        {/* Executive Insight Banner */}
        <div className={`mx-4 mt-3 rounded-lg border-2 border-slate-700 bg-slate-50 p-3 transition-all duration-500 ${subStep >= 2 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] font-bold text-slate-700 uppercase tracking-wider mb-2">Executive Insight</p>
          <div className="space-y-1.5 text-xs">
            <div className="flex justify-between">
              <span className="text-slate-500">Medicaid Status</span>
              <span className="font-bold text-amber-600">
                Action Required {millerNeeded ? '(Miller Trust + Spend Down)' : '(Spend Down Needed)'}
              </span>
            </div>
            {profile.hasCommunitySpouse && csraAmt > 0 && (
              <div className="flex justify-between border-t border-slate-200 pt-1">
                <span className="text-slate-500">Spouse Asset Protection (CSRA)</span>
                <span className="font-bold text-green-700">{fmt(csraAmt)} Saved</span>
              </div>
            )}
            <div className="flex justify-between border-t border-slate-200 pt-1">
              <span className="text-slate-500">Remaining Family Spend-Down</span>
              <span className="font-bold text-slate-800">{fmt(remainingSpendDown)}</span>
            </div>
            {penaltyMonths > 0 && (
              <div className="flex justify-between border-t border-slate-200 pt-1">
                <span className="text-slate-500">Penalty Period</span>
                <span className="font-bold text-red-600">{penaltyMonths}-month ineligibility from {fmt(profile.transferAmount)} gift</span>
              </div>
            )}
          </div>
        </div>

        {/* Traffic Light Cards */}
        <div className={`mx-4 mt-3 grid grid-cols-3 gap-2 transition-all duration-500 ${subStep >= 3 ? 'opacity-100' : 'opacity-0'}`}>
          <div className={`rounded-lg p-2.5 border ${adlCount >= 3 ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <div className={`w-2 h-2 rounded-full mb-1.5 ${adlCount >= 3 ? 'bg-green-500' : 'bg-red-500'}`} />
            <p className="text-[10px] font-bold text-slate-700">{adlCount >= 3 ? 'Care Needs: Qualifies' : 'Below Threshold'}</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{adlCount} ADLs documented</p>
          </div>
          <div className={`rounded-lg p-2.5 border ${profile.hasCommunitySpouse ? 'border-green-200 bg-green-50' : 'border-slate-200 bg-slate-50'}`}>
            <div className={`w-2 h-2 rounded-full mb-1.5 ${profile.hasCommunitySpouse ? 'bg-green-500' : 'bg-slate-400'}`} />
            <p className="text-[10px] font-bold text-slate-700">{profile.hasCommunitySpouse ? 'Spouse Protected' : 'No Spouse'}</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{profile.hasCommunitySpouse ? `Up to ${fmt(csraAmt)}` : 'N/A'}</p>
          </div>
          <div className={`rounded-lg p-2.5 border ${penaltyMonths > 0 ? 'border-red-200 bg-red-50' : 'border-green-200 bg-green-50'}`}>
            <div className={`w-2 h-2 rounded-full mb-1.5 ${penaltyMonths > 0 ? 'bg-red-500' : 'bg-green-500'}`} />
            <p className="text-[10px] font-bold text-slate-700">{penaltyMonths > 0 ? `${penaltyMonths}-Mo Penalty` : 'No Penalties'}</p>
            <p className="text-[9px] text-slate-500 mt-0.5">{penaltyMonths > 0 ? 'Attorney needed' : 'Clean history'}</p>
          </div>
        </div>

        {/* Triage Ledger Preview */}
        <div className={`mx-4 mt-3 transition-all duration-500 ${subStep >= 4 ? 'opacity-100' : 'opacity-0'}`}>
          <p className="text-[10px] font-bold text-slate-700 mb-1.5">For Elder Law Attorneys — Non-MAGI Triage Ledger</p>
          <div className="rounded-lg border border-slate-200 overflow-hidden text-[9px]">
            <div className="grid grid-cols-12 bg-slate-700 text-white py-1.5 px-2 font-bold">
              <span className="col-span-4">Line Item</span>
              <span className="col-span-2 text-right">Amount</span>
              <span className="col-span-6 pl-2">Rationale</span>
            </div>
            {[
              { item: 'Total Countable Assets', amount: fmt(profile.totalCountableAssets), note: `Combined household assets incl. ${fmt(profile.state.assetLimit)} limit` },
              ...(profile.hasCommunitySpouse ? [{ item: 'CSRA (Spouse Protection)', amount: `(${fmt(csraAmt)})`, note: `${profile.state.name} protects ${fmt(csraAmt)} for spouse` }] : []),
              { item: 'Direct Medical / Care', amount: `(${fmt(profile.whatIf.spendDownAmount)})`, note: 'Qualifying medical expenses, NH private-pay period' },
              { item: 'Prepaid Funeral Plan', amount: `(${fmt(profile.whatIf.prepaidFuneralAmount)})`, note: 'Exempt under OBRA \'93 when irrevocable' },
              ...(penaltyMonths > 0 ? [{ item: `Look-Back Penalty`, amount: `${penaltyMonths} mo`, note: `${fmt(profile.transferAmount)} / ${fmt(profile.state.avgNhCost)}/mo = ${penaltyMonths} mo` }] : []),
            ].map((row, i) => (
              <div key={i} className={`grid grid-cols-12 py-1.5 px-2 border-t border-slate-100 ${i % 2 === 0 ? 'bg-white' : 'bg-slate-50'}`}>
                <span className="col-span-4 font-semibold text-slate-700">{row.item}</span>
                <span className="col-span-2 text-right font-bold text-slate-800">{row.amount}</span>
                <span className="col-span-6 pl-2 text-slate-500">{row.note}</span>
              </div>
            ))}
          </div>
        </div>

        {/* PDF Footer */}
        <div className="mx-4 mt-3 mb-3 pt-2 border-t border-slate-200">
          <p className="text-[8px] text-slate-400 text-center">
            This summary is for planning purposes only and does not constitute legal advice. Generated by Poetiq &middot; poetiq.io
          </p>
        </div>
      </div>
    </div>
  );
}

export default IntakeWorkflow;
