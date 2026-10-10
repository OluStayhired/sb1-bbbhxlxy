import { formatMoney, type CliffResult, type SampleScreening } from '../utils/ellieConcierge';
import type { CalcStep } from './EllieConciergeCards';

export const CM_CALC_STEPS: { prompt: string; step: CalcStep }[] = [
  {
    prompt: 'Roughly how many private-pay clients does your practice carry right now?',
    step: {
      key: 'privateClients',
      allowCustom: true,
      chips: [10, 20, 40, 60].map((v) => ({ label: String(v), value: v })),
    },
  },
  {
    prompt: 'What does an average client bill per month?',
    step: {
      key: 'monthlyBilling',
      allowCustom: true,
      prefix: '$',
      chips: [500, 1000, 2000].map((v) => ({ label: formatMoney(v), value: v })),
    },
  },
  {
    prompt: 'How many clients a year let you go once their savings start running low?',
    step: {
      key: 'lostPerYear',
      allowCustom: true,
      chips: [1, 3, 5, 10].map((v) => ({ label: String(v), value: v })),
    },
  },
  {
    prompt: 'Last one. How many hours a month go into Medicaid research and asset mapping you never bill for?',
    step: {
      key: 'researchHours',
      allowCustom: true,
      chips: [5, 10, 20, 40].map((v) => ({ label: `${v} hrs`, value: v })),
    },
  },
];

export const CM_COPY = {
  launcherSub: 'See what the Medicaid cliff costs you',
  header: 'Care Manager concierge · Powered by Poetiq',
  demoNote: "We'll bring your caseload numbers to the call.",
  starterLabels: {
    calculator: 'What is the Medicaid cliff costing my practice?',
    sample: 'Show me a sample asset map',
    partner: "I'm an attorney or estate planner",
    family: "I'm a family member with a Care Manager",
  },
  calcIntro: "Let's find out. Four quick questions, ballpark numbers are fine.",
  calcResultIntro: "Here's what the Medicaid cliff looks like for your practice.",
  calcResultOutro:
    'Those families still need you. They just stop paying before anyone shows them the plan. Poetiq maps the money in minutes, so you see the cliff early and stay on through the transition.',
  sampleIntro:
    'Meet a sample client. Margaret, 82, needs help bathing and dressing. Her husband Frank lives at home. They have about $310,000 in savings and pay you privately for care coordination.',
  partnerLines: [
    'Care Managers on Poetiq send you clients who are already organized: assets, income, care needs and look-back flags in one case brief, so your first meeting is about planning, not paperwork.',
    'You get the legal work. The Care Manager stays the family\'s guide. Want to talk about becoming a partner attorney?',
  ],
  familyReferralAsk:
    "If you already work with a Care Manager, tell us who. We'll offer them Poetiq so they can map your options with you.",
  familyReferralSummary: 'Family used the Care Manager page chat and named their Care Manager.',
} as const;

export function cmSampleScript(s: SampleScreening) {
  return {
    running: `Mapping Margaret and Frank's money under ${s.stateName} rules...`,
    afterScreening: `Frank keeps about ${formatMoney(s.protectedForFrank)}, and the gift is flagged before anyone files. You spotted the risk without doing the legal analysis. Here's the brief you'd hand the attorney:`,
    closing:
      'Under a minute, no statements, no spreadsheets, and nothing that crosses into legal advice. Want to see it on your own caseload?',
  };
}

export function cmLeadSummary(r: CliffResult | null, s: SampleScreening | null): string {
  const parts: string[] = [];
  if (r) {
    parts.push(
      `Cliff calculator: ${r.privateClients} private-pay clients, ${formatMoney(r.monthlyBilling)}/client/mo, ${r.lostPerYear} lost/yr at the cliff, ${r.researchHours} unbillable hrs/mo. Est. ${formatMoney(r.annualLost)}/yr lost, ${formatMoney(r.annualRetained)}/yr keepable.`,
    );
  }
  if (s) parts.push(`Watched sample asset map (${s.stateName}).`);
  return parts.join(' ') || 'Clicked demo from Care Manager page chat.';
}
