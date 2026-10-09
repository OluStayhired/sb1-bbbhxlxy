import { getIncomeCapForState, isIncomeCapState } from './IncomeCapCalculator';

export const BOOKING_URL = 'https://meetings.hubspot.com/olu-adedeji';
export const SESSION_QUESTION_CAP = 5;
export const PLAN_PRICES = { starter: 199, pro: 299 };

const FUNCTION_URL = `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/ellie-concierge`;
const SESSION_KEY_STORAGE = 'ellie_session_key';
const UTM_STORAGE = 'ellie_utm';
const AUTO_OPEN_STORAGE = 'ellie_auto_opened';

export interface Utm {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
}

export type LeadType = 'agency_demo' | 'partner_demo' | 'family_referral';
export type Outcome = 'opened' | 'calculator_done' | 'sample_done';
export type Path = 'calculator' | 'sample' | 'partner' | 'family' | 'question';

export function getSessionKey(): string {
  let key = sessionStorage.getItem(SESSION_KEY_STORAGE);
  if (!key) {
    key = crypto.randomUUID();
    sessionStorage.setItem(SESSION_KEY_STORAGE, key);
  }
  return key;
}

export function readUtm(search: string): Utm {
  const params = new URLSearchParams(search);
  const fromUrl: Utm = {
    source: params.get('utm_source') ?? undefined,
    medium: params.get('utm_medium') ?? undefined,
    campaign: params.get('utm_campaign') ?? undefined,
    content: params.get('utm_content') ?? undefined,
  };
  if (fromUrl.source || fromUrl.campaign) {
    sessionStorage.setItem(UTM_STORAGE, JSON.stringify(fromUrl));
    return fromUrl;
  }
  try {
    const stored = sessionStorage.getItem(UTM_STORAGE);
    return stored ? (JSON.parse(stored) as Utm) : {};
  } catch {
    return {};
  }
}

export function shouldAutoOpen(utm: Utm): boolean {
  if (!utm.source && !utm.campaign) return false;
  if (sessionStorage.getItem(AUTO_OPEN_STORAGE)) return false;
  sessionStorage.setItem(AUTO_OPEN_STORAGE, '1');
  return true;
}

export function campaignGreeting(utm: Utm): string {
  const c = `${utm.campaign ?? ''} ${utm.content ?? ''}`.toLowerCase();
  if (/price|shock|cost|revenue|lost/.test(c)) {
    return "Hi, I'm Ellie. Thanks for coming over from our email. Want to see what price shock is really costing your agency? It takes about 30 seconds.";
  }
  if (/attorney|estate|planner|partner|law/.test(c)) {
    return "Hi, I'm Ellie. If you're an elder law attorney or estate planner, I can show you how Poetiq sends you ready-to-plan cases.";
  }
  if (/medicaid|screen|spend|sample/.test(c)) {
    return "Hi, I'm Ellie. Want to watch me screen a family for Medicaid in about 60 seconds? No sign-up needed.";
  }
  if (utm.source || utm.campaign) {
    return "Hi, I'm Ellie. Thanks for clicking through from our email. Where would you like to start?";
  }
  return "Hi, I'm Ellie, Poetiq's care-funding concierge. I help agencies keep families who walk away over price. Where would you like to start?";
}

export function bookingLink(utm: Utm, kind: 'agency' | 'partner'): string {
  const params = new URLSearchParams({
    utm_source: 'ellie',
    utm_medium: 'homepage_chat',
    utm_campaign: utm.campaign ?? 'direct',
    utm_content: kind === 'partner' ? 'partner_demo' : 'agency_demo',
  });
  return `${BOOKING_URL}?${params.toString()}`;
}

async function post<T>(payload: Record<string, unknown>): Promise<T> {
  const res = await fetch(FUNCTION_URL, {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sessionKey: getSessionKey(), ...payload }),
  });
  const data = await res.json().catch(() => null);
  if (!res.ok || !data || typeof data !== 'object') {
    const message = data && typeof data.error === 'string' ? data.error : 'Something went wrong.';
    throw new Error(message);
  }
  return data as T;
}

export function trackEvent(
  utm: Utm,
  event: { path?: Path; outcome?: Outcome; answers?: Record<string, unknown> },
): void {
  post({ action: 'event', utm, ...event }).catch((err) => console.error('Ellie event failed', err));
}

export function submitLead(
  utm: Utm,
  lead: { leadType: LeadType; summary?: string; agencyName?: string; contactEmail?: string },
): Promise<{ ok: boolean }> {
  return post({ action: 'lead', utm, ...lead });
}

export type AskResult =
  | { status: 'ok'; answer: string; disclaimer: string; remaining: number }
  | { status: 'out_of_scope' | 'session_limit' | 'daily_limit' | 'unavailable'; remaining: number };

export async function askEllie(utm: Utm, question: string): Promise<AskResult> {
  const data = await post<Partial<AskResult>>({ action: 'ask', utm, question });
  if (typeof data.status !== 'string' || typeof data.remaining !== 'number') {
    throw new Error('Unexpected response');
  }
  if (data.status === 'ok' && typeof (data as { answer?: unknown }).answer !== 'string') {
    throw new Error('Unexpected response');
  }
  return data as AskResult;
}

// ── Price-shock calculator ────────────────────────────────────────────────
export interface CalculatorInput {
  intakeCalls: number;
  lostOnPrice: number;
  clientValue: number;
  acceptsMedicaid: boolean;
}

export interface CalculatorResult extends CalculatorInput {
  monthlyLost: number;
  annualLost: number;
  recoveredFamilies: number;
  monthlyRecovered: number;
  recoveryRate: number;
  proMultiple: number;
}

export function calculatePriceShock(input: CalculatorInput): CalculatorResult {
  const lost = Math.min(input.lostOnPrice, input.intakeCalls);
  const recoveryRate = input.acceptsMedicaid ? 0.25 : 0.15;
  const monthlyLost = lost * input.clientValue;
  const recoveredFamilies = lost > 0 ? Math.max(1, Math.round(lost * recoveryRate)) : 0;
  const monthlyRecovered = recoveredFamilies * input.clientValue;
  return {
    ...input,
    lostOnPrice: lost,
    monthlyLost,
    annualLost: monthlyLost * 12,
    recoveredFamilies,
    monthlyRecovered,
    recoveryRate,
    proMultiple: Math.floor(monthlyRecovered / PLAN_PRICES.pro),
  };
}

export function formatMoney(n: number): string {
  return `$${Math.round(n).toLocaleString('en-US')}`;
}

// ── Sample screening (Margaret & Frank) ──────────────────────────────────
const CSRA_MAX = 157_920;
const CSRA_MIN = 31_584;
const APPLICANT_ALLOWANCE = 2_000;
const MARGARET_SAVINGS = 310_000;
const MARGARET_INCOME = 3_150;
const GIFT_AMOUNT = 18_000;

export const SAMPLE_STATES = [
  { abbr: 'FL', name: 'Florida', fullCsra: true },
  { abbr: 'GA', name: 'Georgia', fullCsra: true },
  { abbr: 'TX', name: 'Texas', fullCsra: false },
  { abbr: 'OH', name: 'Ohio', fullCsra: false },
  { abbr: 'PA', name: 'Pennsylvania', fullCsra: false },
  { abbr: 'NY', name: 'New York', fullCsra: false },
] as const;

export type SampleStateAbbr = (typeof SAMPLE_STATES)[number]['abbr'];

export interface SampleScreening {
  stateAbbr: SampleStateAbbr;
  stateName: string;
  savings: number;
  protectedForFrank: number;
  margaretAllowance: number;
  amountToPlan: number;
  income: number;
  incomeCap: number;
  overIncomeCap: boolean;
  usesIncomeCap: boolean;
  giftAmount: number;
}

export function runSampleScreening(abbr: SampleStateAbbr): SampleScreening {
  const state = SAMPLE_STATES.find((s) => s.abbr === abbr) ?? SAMPLE_STATES[0];
  const half = MARGARET_SAVINGS / 2;
  const protectedForFrank = state.fullCsra
    ? Math.min(MARGARET_SAVINGS, CSRA_MAX)
    : Math.min(Math.max(half, CSRA_MIN), CSRA_MAX);
  const usesIncomeCap = isIncomeCapState(abbr);
  const incomeCap = getIncomeCapForState(abbr);
  return {
    stateAbbr: state.abbr,
    stateName: state.name,
    savings: MARGARET_SAVINGS,
    protectedForFrank,
    margaretAllowance: APPLICANT_ALLOWANCE,
    amountToPlan: Math.max(0, MARGARET_SAVINGS - protectedForFrank - APPLICANT_ALLOWANCE),
    income: MARGARET_INCOME,
    incomeCap,
    usesIncomeCap,
    overIncomeCap: usesIncomeCap && incomeCap > 0 && MARGARET_INCOME > incomeCap,
    giftAmount: GIFT_AMOUNT,
  };
}
