// ═══════════════════════════════════════════════════════════════════════════
// IncomeCapCalculator.ts
// Dynamically determines the Medicaid income cap for any US state,
// replacing the hardcoded $2,829/mo value used previously.
// ═══════════════════════════════════════════════════════════════════════════

// ── Global Federal Constants (2024-2025) ──────────────────────────────────
export const FBR_INDIVIDUAL = 994;
export const FBR_COUPLE = 1_491;
export const STANDARD_300_FBR_INDIVIDUAL = FBR_INDIVIDUAL * 3; // $2,982
export const STANDARD_300_FBR_COUPLE = FBR_COUPLE * 2 * 3;     // $5,964 (both applying)
export const MMMNA_MAX = 4_066.50;

// ── State Category Types ──────────────────────────────────────────────────

export type IncomeCapCategory =
  | 'income_cap_standard'       // Category 1a: standard 300% FBR states
  | 'income_cap_exception'      // Category 1b: state-specific ceilings (AZ, OK, IA)
  | 'alternative_threshold'     // Category 2: DE, CA, CT
  | 'medically_needy';          // Category 3: NY, IL, MN, etc.

export type EligibilityStatus =
  | 'eligible'                  // Under the cap — direct eligibility
  | 'eligible_with_qit'        // Over cap but QIT/Miller Trust can fix it
  | 'over_trust_ceiling'       // Over even the trust ceiling — fails
  | 'no_hard_cap'              // Medically Needy state — spend-down applies
  | 'conditional';             // Needs further evaluation (CA HCBS, CT, etc.)

export interface IncomeCapResult {
  category: IncomeCapCategory;
  stateAbbr: string;
  stateName: string;

  // The primary income cap for this state
  incomeCap: number;

  // For exception states: the max amount a QIT can shelter
  trustCeiling: number | null;

  // Couple thresholds (both applying)
  coupleIncomeCap: number | null;

  // Evaluation result when income is provided
  grossMonthlyIncome: number;
  status: EligibilityStatus;
  excessOverCap: number;
  millerTrustRequired: boolean;
  millerTrustFundingAmount: number;

  // Human-readable explanation
  narrative: string;
  statusColor: 'green' | 'yellow' | 'red';

  // For states with special notes
  specialNotes: string | null;
}

// ── Category 1a: Standard 300% FBR Income Cap States ──────────────────────
const STANDARD_CAP_STATES = new Set([
  'AL', 'AK', 'AR', 'CO', 'FL', 'GA', 'ID', 'IN', 'IA', 'KS',
  'KY', 'LA', 'MS', 'MO', 'NE', 'NV', 'NM', 'OH', 'OK', 'OR',
  'SC', 'SD', 'TN', 'TX', 'UT', 'WA', 'WY',
]);

// Note: AZ, IA, OK are also in this set but have exception overrides (1b).
// They use the standard $2,982 as the base cap but have higher trust ceilings.

// ── Category 1b: Exception Override States ────────────────────────────────

interface ArizonaCountyInfo {
  highCounties: Set<string>;
  highCeiling: number;
  standardCeiling: number;
}

const ARIZONA_OVERRIDES: ArizonaCountyInfo = {
  highCounties: new Set(['MARICOPA', 'PIMA', 'PINAL']),
  highCeiling: 8_666.72,
  standardCeiling: 8_132.22,
};

const OKLAHOMA_TRUST_CEILING = 7_637;

const IOWA_TRUST_CEILING = 12_002.50;

// ── Category 2: Alternative Threshold States ──────────────────────────────

const DELAWARE_CAP_INDIVIDUAL = Math.round(FBR_INDIVIDUAL * 2.5); // $2,485
const DELAWARE_CAP_COUPLE = DELAWARE_CAP_INDIVIDUAL * 2;          // $4,970

// California: No hard cap for nursing home; HCBS uses ~$1,836
const CALIFORNIA_HCBS_LIMIT = 1_836;

// ── Category 3: Medically Needy / Spend-Down States ──────────────────────
const MEDICALLY_NEEDY_STATES = new Set([
  'CT', 'DC', 'HI', 'IL', 'MA', 'MD', 'ME', 'MI', 'MN', 'MT',
  'NC', 'ND', 'NH', 'NJ', 'NY', 'PA', 'RI', 'VT', 'VA', 'WI', 'WV',
]);

// ── State Name Lookup ─────────────────────────────────────────────────────
const STATE_NAMES: Record<string, string> = {
  AL: 'Alabama', AK: 'Alaska', AZ: 'Arizona', AR: 'Arkansas',
  CA: 'California', CO: 'Colorado', CT: 'Connecticut', DE: 'Delaware',
  DC: 'District of Columbia', FL: 'Florida', GA: 'Georgia', HI: 'Hawaii',
  ID: 'Idaho', IL: 'Illinois', IN: 'Indiana', IA: 'Iowa',
  KS: 'Kansas', KY: 'Kentucky', LA: 'Louisiana', ME: 'Maine',
  MD: 'Maryland', MA: 'Massachusetts', MI: 'Michigan', MN: 'Minnesota',
  MS: 'Mississippi', MO: 'Missouri', MT: 'Montana', NE: 'Nebraska',
  NV: 'Nevada', NH: 'New Hampshire', NJ: 'New Jersey', NM: 'New Mexico',
  NY: 'New York', NC: 'North Carolina', ND: 'North Dakota', OH: 'Ohio',
  OK: 'Oklahoma', OR: 'Oregon', PA: 'Pennsylvania', RI: 'Rhode Island',
  SC: 'South Carolina', SD: 'South Dakota', TN: 'Tennessee', TX: 'Texas',
  UT: 'Utah', VT: 'Vermont', VA: 'Virginia', WA: 'Washington',
  WV: 'West Virginia', WI: 'Wisconsin', WY: 'Wyoming',
};

// ═══════════════════════════════════════════════════════════════════════════
// MAIN CALCULATOR FUNCTION
// ═══════════════════════════════════════════════════════════════════════════

export interface IncomeCapInput {
  stateAbbr: string;              // e.g. 'TX', 'AZ', 'NY'
  grossMonthlyIncome: number;     // applicant's gross monthly income
  isCouple?: boolean;             // both spouses applying? default false
  county?: string;                // only needed for AZ regional ceilings
  careType?: 'nursing_home' | 'hcbs' | 'unknown'; // for CA/CT distinction
}

export function calculateIncomeCap(input: IncomeCapInput): IncomeCapResult {
  const {
    stateAbbr: rawAbbr,
    grossMonthlyIncome,
    isCouple = false,
    county,
    careType = 'unknown',
  } = input;

  const stateAbbr = rawAbbr.toUpperCase().trim();
  const stateName = STATE_NAMES[stateAbbr] || stateAbbr;

  // ── Arizona (Category 1b) ──────────────────────────────────────────────
  if (stateAbbr === 'AZ') {
    return evaluateArizona(stateAbbr, stateName, grossMonthlyIncome, isCouple, county);
  }

  // ── Oklahoma (Category 1b) ─────────────────────────────────────────────
  if (stateAbbr === 'OK') {
    return evaluateOklahoma(stateAbbr, stateName, grossMonthlyIncome, isCouple);
  }

  // ── Iowa (Category 1b) ─────────────────────────────────────────────────
  if (stateAbbr === 'IA') {
    return evaluateIowa(stateAbbr, stateName, grossMonthlyIncome, isCouple);
  }

  // ── Delaware (Category 2) ──────────────────────────────────────────────
  if (stateAbbr === 'DE') {
    return evaluateDelaware(stateAbbr, stateName, grossMonthlyIncome, isCouple);
  }

  // ── California (Category 2) ────────────────────────────────────────────
  if (stateAbbr === 'CA') {
    return evaluateCalifornia(stateAbbr, stateName, grossMonthlyIncome, careType);
  }

  // ── Connecticut (Category 2) ───────────────────────────────────────────
  if (stateAbbr === 'CT') {
    return evaluateConnecticut(stateAbbr, stateName, grossMonthlyIncome, careType);
  }

  // ── Medically Needy States (Category 3) ────────────────────────────────
  if (MEDICALLY_NEEDY_STATES.has(stateAbbr)) {
    return evaluateMedicallyNeedy(stateAbbr, stateName, grossMonthlyIncome);
  }

  // ── Standard 300% FBR States (Category 1a) ─────────────────────────────
  if (STANDARD_CAP_STATES.has(stateAbbr)) {
    return evaluateStandardCap(stateAbbr, stateName, grossMonthlyIncome, isCouple);
  }

  // ── Fallback: treat unknown states as standard cap ──────────────────────
  return evaluateStandardCap(stateAbbr, stateName, grossMonthlyIncome, isCouple);
}

// ═══════════════════════════════════════════════════════════════════════════
// CATEGORY EVALUATORS
// ═══════════════════════════════════════════════════════════════════════════

// ── Category 1a: Standard 300% FBR ───────────────────────────────────────
function evaluateStandardCap(
  stateAbbr: string, stateName: string, income: number, isCouple: boolean,
): IncomeCapResult {
  const cap = isCouple ? STANDARD_300_FBR_COUPLE : STANDARD_300_FBR_INDIVIDUAL;
  const excess = Math.max(0, income - cap);
  const underCap = income <= cap;

  return {
    category: 'income_cap_standard',
    stateAbbr, stateName,
    incomeCap: cap,
    trustCeiling: null,
    coupleIncomeCap: isCouple ? null : STANDARD_300_FBR_COUPLE,
    grossMonthlyIncome: income,
    status: underCap ? 'eligible' : 'eligible_with_qit',
    excessOverCap: excess,
    millerTrustRequired: !underCap,
    millerTrustFundingAmount: excess,
    narrative: underCap
      ? `Income of $${income.toLocaleString()}/mo is within ${stateName}'s $${cap.toLocaleString()}/mo Medicaid income cap. No Miller Trust required.`
      : `Income of $${income.toLocaleString()}/mo exceeds ${stateName}'s $${cap.toLocaleString()}/mo cap by $${excess.toLocaleString()}/mo. A Qualified Income Trust (Miller Trust) is required to shelter the excess.`,
    statusColor: underCap ? 'green' : 'yellow',
    specialNotes: null,
  };
}

// ── Category 1b: Arizona ─────────────────────────────────────────────────
function evaluateArizona(
  stateAbbr: string, stateName: string, income: number, isCouple: boolean, county?: string,
): IncomeCapResult {
  const baseCap = isCouple ? STANDARD_300_FBR_COUPLE : STANDARD_300_FBR_INDIVIDUAL;
  const normalizedCounty = (county || '').toUpperCase().trim();
  const isHighCounty = ARIZONA_OVERRIDES.highCounties.has(normalizedCounty);
  const trustCeiling = normalizedCounty
    ? (isHighCounty ? ARIZONA_OVERRIDES.highCeiling : ARIZONA_OVERRIDES.standardCeiling)
    : ARIZONA_OVERRIDES.standardCeiling; // default to lower if county unknown

  const underBaseCap = income <= baseCap;
  const underTrustCeiling = income <= trustCeiling;
  const excess = Math.max(0, income - baseCap);

  let status: EligibilityStatus;
  let narrative: string;
  let statusColor: 'green' | 'yellow' | 'red';

  if (underBaseCap) {
    status = 'eligible';
    narrative = `Income of $${income.toLocaleString()}/mo is within Arizona's $${baseCap.toLocaleString()}/mo base cap. No Miller Trust required.`;
    statusColor = 'green';
  } else if (underTrustCeiling) {
    status = 'eligible_with_qit';
    const countyLabel = normalizedCounty
      ? (isHighCounty ? `${normalizedCounty} County` : `${normalizedCounty} County`)
      : 'your county';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds the $${baseCap.toLocaleString()}/mo base cap but is within the $${trustCeiling.toLocaleString()}/mo regional trust ceiling for ${countyLabel}. A QIT bridges the $${excess.toLocaleString()}/mo excess.`;
    statusColor = 'yellow';
  } else {
    status = 'over_trust_ceiling';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds Arizona's $${trustCeiling.toLocaleString()}/mo regional trust ceiling. A standard QIT cannot shelter income above this limit. Eligibility fails without additional planning.`;
    statusColor = 'red';
  }

  return {
    category: 'income_cap_exception',
    stateAbbr, stateName,
    incomeCap: baseCap,
    trustCeiling,
    coupleIncomeCap: isCouple ? null : STANDARD_300_FBR_COUPLE,
    grossMonthlyIncome: income,
    status,
    excessOverCap: excess,
    millerTrustRequired: !underBaseCap && underTrustCeiling,
    millerTrustFundingAmount: underTrustCeiling ? excess : 0,
    narrative,
    statusColor,
    specialNotes: normalizedCounty
      ? `County: ${normalizedCounty}. Regional ceiling: $${trustCeiling.toLocaleString()}/mo.`
      : 'County not provided. Using the lower standard ceiling of $8,132.22/mo. Provide the county for a more accurate result.',
  };
}

// ── Category 1b: Oklahoma ────────────────────────────────────────────────
function evaluateOklahoma(
  stateAbbr: string, stateName: string, income: number, isCouple: boolean,
): IncomeCapResult {
  const baseCap = isCouple ? STANDARD_300_FBR_COUPLE : STANDARD_300_FBR_INDIVIDUAL;
  const trustCeiling = OKLAHOMA_TRUST_CEILING;
  const underBaseCap = income <= baseCap;
  const underTrustCeiling = income <= trustCeiling;
  const excess = Math.max(0, income - baseCap);

  let status: EligibilityStatus;
  let narrative: string;
  let statusColor: 'green' | 'yellow' | 'red';

  if (underBaseCap) {
    status = 'eligible';
    narrative = `Income of $${income.toLocaleString()}/mo is within Oklahoma's $${baseCap.toLocaleString()}/mo cap. No Miller Trust required.`;
    statusColor = 'green';
  } else if (underTrustCeiling) {
    status = 'eligible_with_qit';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds the $${baseCap.toLocaleString()}/mo cap but is within Oklahoma's $${trustCeiling.toLocaleString()}/mo trust ceiling. A QIT shelters the $${excess.toLocaleString()}/mo excess.`;
    statusColor = 'yellow';
  } else {
    status = 'over_trust_ceiling';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds Oklahoma's absolute trust ceiling of $${trustCeiling.toLocaleString()}/mo. A standard QIT cannot shelter income above this limit.`;
    statusColor = 'red';
  }

  return {
    category: 'income_cap_exception',
    stateAbbr, stateName,
    incomeCap: baseCap,
    trustCeiling,
    coupleIncomeCap: isCouple ? null : STANDARD_300_FBR_COUPLE,
    grossMonthlyIncome: income,
    status,
    excessOverCap: excess,
    millerTrustRequired: !underBaseCap && underTrustCeiling,
    millerTrustFundingAmount: underTrustCeiling ? excess : 0,
    narrative,
    statusColor,
    specialNotes: `Oklahoma enforces an absolute trust ceiling of $${trustCeiling.toLocaleString()}/mo. Income above this cannot be sheltered by a standard QIT.`,
  };
}

// ── Category 1b: Iowa ────────────────────────────────────────────────────
function evaluateIowa(
  stateAbbr: string, stateName: string, income: number, isCouple: boolean,
): IncomeCapResult {
  const baseCap = isCouple ? STANDARD_300_FBR_COUPLE : STANDARD_300_FBR_INDIVIDUAL;
  const trustCeiling = IOWA_TRUST_CEILING;
  const underBaseCap = income <= baseCap;
  const underTrustCeiling = income <= trustCeiling;
  const excess = Math.max(0, income - baseCap);

  let status: EligibilityStatus;
  let narrative: string;
  let statusColor: 'green' | 'yellow' | 'red';

  if (underBaseCap) {
    status = 'eligible';
    narrative = `Income of $${income.toLocaleString()}/mo is within Iowa's $${baseCap.toLocaleString()}/mo standard cap. No Miller Trust required.`;
    statusColor = 'green';
  } else if (underTrustCeiling) {
    status = 'eligible_with_qit';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds the $${baseCap.toLocaleString()}/mo cap but is within Iowa's $${trustCeiling.toLocaleString()}/mo upper trust ceiling. A Miller Trust shelters the $${excess.toLocaleString()}/mo excess. County-level contracted rates may apply.`;
    statusColor = 'yellow';
  } else {
    status = 'over_trust_ceiling';
    narrative = `Income of $${income.toLocaleString()}/mo exceeds Iowa's upper trust ceiling of $${trustCeiling.toLocaleString()}/mo. A standard QIT may not shelter income above this limit.`;
    statusColor = 'red';
  }

  return {
    category: 'income_cap_exception',
    stateAbbr, stateName,
    incomeCap: baseCap,
    trustCeiling,
    coupleIncomeCap: isCouple ? null : STANDARD_300_FBR_COUPLE,
    grossMonthlyIncome: income,
    status,
    excessOverCap: excess,
    millerTrustRequired: !underBaseCap && underTrustCeiling,
    millerTrustFundingAmount: underTrustCeiling ? excess : 0,
    narrative,
    statusColor,
    specialNotes: 'Iowa uses county-level contracted facility rates and medical waiver formulas that scale the upper trust ceiling up to $12,002.50/mo.',
  };
}

// ── Category 2: Delaware ─────────────────────────────────────────────────
function evaluateDelaware(
  stateAbbr: string, stateName: string, income: number, isCouple: boolean,
): IncomeCapResult {
  const cap = isCouple ? DELAWARE_CAP_COUPLE : DELAWARE_CAP_INDIVIDUAL;
  const excess = Math.max(0, income - cap);
  const underCap = income <= cap;

  return {
    category: 'alternative_threshold',
    stateAbbr, stateName,
    incomeCap: cap,
    trustCeiling: null,
    coupleIncomeCap: isCouple ? null : DELAWARE_CAP_COUPLE,
    grossMonthlyIncome: income,
    status: underCap ? 'eligible' : 'eligible_with_qit',
    excessOverCap: excess,
    millerTrustRequired: !underCap,
    millerTrustFundingAmount: excess,
    narrative: underCap
      ? `Income of $${income.toLocaleString()}/mo is within Delaware's $${cap.toLocaleString()}/mo cap (250% FBR). No QIT required.`
      : `Income of $${income.toLocaleString()}/mo exceeds Delaware's $${cap.toLocaleString()}/mo cap (250% FBR) by $${excess.toLocaleString()}/mo. A QIT is required.`,
    statusColor: underCap ? 'green' : 'yellow',
    specialNotes: 'Delaware uses 250% of the Federal Benefit Rate instead of the standard 300%.',
  };
}

// ── Category 2: California ───────────────────────────────────────────────
function evaluateCalifornia(
  stateAbbr: string, stateName: string, income: number, careType: string,
): IncomeCapResult {
  if (careType === 'nursing_home') {
    return {
      category: 'alternative_threshold',
      stateAbbr, stateName,
      incomeCap: 0,
      trustCeiling: null,
      coupleIncomeCap: null,
      grossMonthlyIncome: income,
      status: 'no_hard_cap',
      excessOverCap: 0,
      millerTrustRequired: false,
      millerTrustFundingAmount: 0,
      narrative: `California has no hard income cap for nursing home Medicaid. The resident pays all income toward the cost of care, retaining only a $35/mo Personal Needs Allowance. No Miller Trust is needed.`,
      statusColor: 'green',
      specialNotes: 'CA Nursing Home: All income goes to care minus $35/mo PNA. No income cap or QIT.',
    };
  }

  // HCBS / ABD waivers
  const cap = CALIFORNIA_HCBS_LIMIT;
  const underCap = income <= cap;
  const excess = Math.max(0, income - cap);

  return {
    category: 'alternative_threshold',
    stateAbbr, stateName,
    incomeCap: cap,
    trustCeiling: null,
    coupleIncomeCap: null,
    grossMonthlyIncome: income,
    status: underCap ? 'eligible' : 'conditional',
    excessOverCap: excess,
    millerTrustRequired: false,
    millerTrustFundingAmount: 0,
    narrative: underCap
      ? `Income of $${income.toLocaleString()}/mo is within California's $${cap.toLocaleString()}/mo HCBS/ABD maintenance limit.`
      : `Income of $${income.toLocaleString()}/mo exceeds California's $${cap.toLocaleString()}/mo HCBS/ABD maintenance limit by $${excess.toLocaleString()}/mo. Separate state evaluation rules apply.`,
    statusColor: underCap ? 'green' : 'yellow',
    specialNotes: careType === 'unknown'
      ? 'California rules depend on care type. Nursing home Medicaid has no income cap. HCBS waivers use a $1,836/mo maintenance limit.'
      : null,
  };
}

// ── Category 2: Connecticut ──────────────────────────────────────────────
function evaluateConnecticut(
  stateAbbr: string, stateName: string, income: number, careType: string,
): IncomeCapResult {
  if (careType === 'hcbs') {
    const cap = STANDARD_300_FBR_INDIVIDUAL;
    const underCap = income <= cap;
    const excess = Math.max(0, income - cap);
    return {
      category: 'alternative_threshold',
      stateAbbr, stateName,
      incomeCap: cap,
      trustCeiling: null,
      coupleIncomeCap: null,
      grossMonthlyIncome: income,
      status: underCap ? 'eligible' : 'eligible_with_qit',
      excessOverCap: excess,
      millerTrustRequired: !underCap,
      millerTrustFundingAmount: excess,
      narrative: underCap
        ? `Income of $${income.toLocaleString()}/mo is within Connecticut's $${cap.toLocaleString()}/mo HCBS waiver threshold.`
        : `Income of $${income.toLocaleString()}/mo exceeds Connecticut's $${cap.toLocaleString()}/mo HCBS threshold by $${excess.toLocaleString()}/mo. A QIT may be required.`,
      statusColor: underCap ? 'green' : 'yellow',
      specialNotes: 'Connecticut HCBS waivers apply the standard $2,982/mo threshold.',
    };
  }

  // Nursing home: Medically Needy spend-down framework
  return {
    category: 'alternative_threshold',
    stateAbbr, stateName,
    incomeCap: 0,
    trustCeiling: null,
    coupleIncomeCap: null,
    grossMonthlyIncome: income,
    status: 'conditional',
    excessOverCap: 0,
    millerTrustRequired: false,
    millerTrustFundingAmount: 0,
    narrative: `Connecticut nursing home Medicaid has no fixed income cap. Income must be lower than the facility's private-pay monthly cost, evaluated through a Medically Needy spend-down framework.`,
    statusColor: 'yellow',
    specialNotes: careType === 'unknown'
      ? 'Connecticut rules depend on care type. Nursing home uses Medically Needy spend-down. HCBS waivers use the $2,982/mo threshold.'
      : 'CT Nursing Home: No fixed cap. Evaluated against facility private-pay cost.',
  };
}

// ── Category 3: Medically Needy / Spend-Down States ──────────────────────
function evaluateMedicallyNeedy(
  stateAbbr: string, stateName: string, income: number,
): IncomeCapResult {
  // Use the standard 300% FBR as a reference baseline for comparison only
  const referenceCap = STANDARD_300_FBR_INDIVIDUAL;
  const overBaseline = income > referenceCap;

  return {
    category: 'medically_needy',
    stateAbbr, stateName,
    incomeCap: 0,
    trustCeiling: null,
    coupleIncomeCap: null,
    grossMonthlyIncome: income,
    status: 'no_hard_cap',
    excessOverCap: 0,
    millerTrustRequired: false,
    millerTrustFundingAmount: 0,
    narrative: overBaseline
      ? `${stateName} is a Medically Needy state with no strict income cap. Income of $${income.toLocaleString()}/mo is over the standard $${referenceCap.toLocaleString()}/mo baseline, but ${stateName} allows a spend-down: excess income can be offset by medical bills, health insurance premiums, and past-due medical debt until remaining income matches the state's Medically Needy Income Level.`
      : `${stateName} is a Medically Needy state with no strict income cap. Income of $${income.toLocaleString()}/mo is within the standard baseline. No Miller Trust is needed; a medical spend-down may still apply depending on ${stateName}'s Medically Needy Income Level.`,
    statusColor: overBaseline ? 'yellow' : 'green',
    specialNotes: `${stateName} uses Medically Needy spend-down rules instead of a hard income cap. No QIT/Miller Trust is required. Excess income is reduced through incurred medical expenses.`,
  };
}

// ═══════════════════════════════════════════════════════════════════════════
// CONVENIENCE HELPERS
// ═══════════════════════════════════════════════════════════════════════════

/**
 * Quick lookup: returns just the income cap number for a state.
 * For medically needy / no-cap states returns 0.
 */
export function getIncomeCapForState(stateAbbr: string, isCouple = false): number {
  const abbr = stateAbbr.toUpperCase().trim();

  if (abbr === 'DE') return isCouple ? DELAWARE_CAP_COUPLE : DELAWARE_CAP_INDIVIDUAL;
  if (abbr === 'CA' || abbr === 'CT') return 0; // no single cap
  if (MEDICALLY_NEEDY_STATES.has(abbr)) return 0;

  // All other states (including AZ, OK, IA base cap) use standard 300% FBR
  return isCouple ? STANDARD_300_FBR_COUPLE : STANDARD_300_FBR_INDIVIDUAL;
}

/**
 * Returns true if the state uses income-cap rules (Categories 1a/1b/2-cap).
 * Returns false for medically needy / no-cap states.
 */
export function isIncomeCapState(stateAbbr: string): boolean {
  const abbr = stateAbbr.toUpperCase().trim();
  if (MEDICALLY_NEEDY_STATES.has(abbr)) return false;
  if (abbr === 'CA') return false; // nursing home has no cap
  return true;
}

/**
 * Returns the state's category label for display purposes.
 */
export function getStateCategoryLabel(stateAbbr: string): string {
  const abbr = stateAbbr.toUpperCase().trim();
  if (abbr === 'AZ' || abbr === 'OK' || abbr === 'IA') return 'Income Cap (with state-specific trust ceiling)';
  if (abbr === 'DE') return 'Alternative Threshold (250% FBR)';
  if (abbr === 'CA') return 'No Hard Cap (California rules)';
  if (abbr === 'CT') return 'Mixed (depends on care type)';
  if (MEDICALLY_NEEDY_STATES.has(abbr)) return 'Medically Needy (spend-down)';
  if (STANDARD_CAP_STATES.has(abbr)) return 'Income Cap (standard 300% FBR)';
  return 'Income Cap (standard 300% FBR)';
}
