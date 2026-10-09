import { useCallback, useEffect, useRef, useState, type FormEvent } from 'react';
import { Lock, MessageCircle, Send, X, Target } from 'lucide-react';
import {
  SESSION_QUESTION_CAP,
  askEllie,
  bookingLink,
  calculatePriceShock,
  campaignGreeting,
  formatMoney,
  readUtm,
  runSampleScreening,
  shouldAutoOpen,
  submitLead,
  trackEvent,
  type CalculatorInput,
  type CalculatorResult,
  type SampleScreening,
  type SampleStateAbbr,
} from '../utils/ellieConcierge';
import {
  BriefCard,
  CalcResultCard,
  CalcStepCard,
  DemoButton,
  FamilyLinks,
  FamilyReferralForm,
  ScreeningCard,
  StarterChoices,
  StatePicker,
  type CalcStep,
  type StarterId,
} from './EllieConciergeCards';

type Card =
  | { type: 'starters' }
  | { type: 'calcStep'; step: CalcStep }
  | { type: 'calcResult'; result: CalculatorResult }
  | { type: 'statePicker' }
  | { type: 'screening'; s: SampleScreening }
  | { type: 'brief'; s: SampleScreening }
  | { type: 'demo'; kind: 'agency' | 'partner' }
  | { type: 'familyLinks' }
  | { type: 'familyReferral' };

interface Msg {
  id: number;
  from: 'ellie' | 'user';
  text?: string;
  note?: string;
  card?: Card;
}

type Script = Omit<Msg, 'id' | 'from'>[];

const INTERACTIVE: Card['type'][] = ['starters', 'calcStep', 'statePicker', 'familyReferral'];

const CALC_STEPS: { prompt: string; step: CalcStep }[] = [
  {
    prompt: 'Roughly how many new-client inquiries does your agency get each month?',
    step: {
      key: 'intakeCalls',
      allowCustom: true,
      chips: [10, 25, 50, 100].map((v) => ({ label: String(v), value: v })),
    },
  },
  {
    prompt: 'Of those, how many go quiet or say no once they hear the hourly rate?',
    step: {
      key: 'lostOnPrice',
      allowCustom: true,
      chips: [3, 5, 10, 20].map((v) => ({ label: String(v), value: v })),
    },
  },
  {
    prompt: 'What is an average client worth to your agency per month?',
    step: {
      key: 'clientValue',
      allowCustom: true,
      prefix: '$',
      chips: [2000, 3000, 4500].map((v) => ({ label: formatMoney(v), value: v })),
    },
  },
  {
    prompt: 'Last one. Does your agency accept Medicaid waiver clients?',
    step: {
      key: 'acceptsMedicaid',
      allowCustom: false,
      chips: [
        { label: 'Yes', value: 1 },
        { label: 'No', value: 0 },
        { label: 'Not yet', value: 0 },
      ],
    },
  },
];

const wait = (ms: number) => new Promise((r) => setTimeout(r, ms));

const ELLIE_PHOTO =
  'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png';

function EllieAvatar({ size, ring = 'border-white' }: { size: 'sm' | 'lg'; ring?: string }) {
  const [failed, setFailed] = useState(false);
  const box = size === 'lg' ? 'h-10 w-10' : 'h-7 w-7';
  if (failed) {
    return (
      <span className={`relative flex ${box} items-center justify-center rounded-full bg-gradient-to-br from-teal-400 to-emerald-500 text-white`}>
        <Target className={size === 'lg' ? 'h-5 w-5' : 'h-3.5 w-3.5'} />
      </span>
    );
  }
  return (
    <img
      src={ELLIE_PHOTO}
      alt="Ellie"
      onError={() => setFailed(true)}
      className={`relative ${box} rounded-full border-2 ${ring} object-cover shadow-sm`}
    />
  );
}

export default function EllieConcierge() {
  const [utm] = useState(() => readUtm(window.location.search));
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Msg[]>(() => [
    { id: 1, from: 'ellie', text: campaignGreeting(utm) },
    { id: 2, from: 'ellie', card: { type: 'starters' } },
  ]);
  const [typing, setTyping] = useState(false);
  const [input, setInput] = useState('');
  const [remaining, setRemaining] = useState(SESSION_QUESTION_CAP);
  const [aiPaused, setAiPaused] = useState(false);

  const nextId = useRef(3);
  const tracked = useRef(false);
  const calc = useRef<Partial<CalculatorInput>>({});
  const lastResult = useRef<CalculatorResult | null>(null);
  const lastSample = useRef<SampleScreening | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const push = useCallback((from: Msg['from'], m: Omit<Msg, 'id' | 'from'>) => {
    setMessages((prev) => [...prev, { id: nextId.current++, from, ...m }]);
  }, []);

  const say = useCallback(
    async (script: Script) => {
      for (const m of script) {
        setTyping(true);
        await wait(m.card ? 350 : 550 + Math.min(900, (m.text?.length ?? 0) * 6));
        setTyping(false);
        push('ellie', m);
      }
    },
    [push],
  );

  useEffect(() => {
    if (!shouldAutoOpen(utm)) return;
    const t = setTimeout(() => setOpen(true), 1400);
    return () => clearTimeout(t);
  }, [utm]);

  useEffect(() => {
    if (open && !tracked.current) {
      tracked.current = true;
      trackEvent(utm, { outcome: 'opened' });
    }
  }, [open, utm]);

  useEffect(() => {
    scrollRef.current?.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
  }, [messages, typing]);

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open]);

  const agencySummary = () => {
    const r = lastResult.current;
    const s = lastSample.current;
    const parts: string[] = [];
    if (r) {
      parts.push(
        `Calculator: ${r.intakeCalls} inquiries/mo, ${r.lostOnPrice} lost on price, ${formatMoney(r.clientValue)}/client/mo, Medicaid: ${r.acceptsMedicaid ? 'yes' : 'no'}. Est. ${formatMoney(r.monthlyLost)}/mo lost, ${formatMoney(r.monthlyRecovered)}/mo recoverable.`,
      );
    }
    if (s) parts.push(`Watched sample screening (${s.stateName}).`);
    return parts.join(' ') || 'Clicked demo from homepage chat.';
  };

  const book = async (kind: 'agency' | 'partner') => {
    const win = window.open(bookingLink(utm, kind), '_blank');
    if (win) win.opener = null;
    try {
      await submitLead(utm, {
        leadType: kind === 'partner' ? 'partner_demo' : 'agency_demo',
        summary: kind === 'partner' ? 'Attorney / estate planner asked for a partner demo.' : agencySummary(),
      });
    } catch (err) {
      console.error('Ellie lead failed', err);
    }
    if (!win) window.location.href = bookingLink(utm, kind);
  };

  const askCalcStep = (i: number) => say([{ text: CALC_STEPS[i].prompt }, { card: { type: 'calcStep', step: CALC_STEPS[i].step } }]);

  const onCalcAnswer = async (step: CalcStep, value: number, label: string) => {
    push('user', { text: label });
    if (step.key === 'acceptsMedicaid') calc.current.acceptsMedicaid = value === 1;
    else calc.current[step.key] = value;

    const idx = CALC_STEPS.findIndex((c) => c.step.key === step.key);
    if (idx < CALC_STEPS.length - 1) {
      await askCalcStep(idx + 1);
      return;
    }

    const result = calculatePriceShock(calc.current as CalculatorInput);
    lastResult.current = result;
    trackEvent(utm, {
      outcome: 'calculator_done',
      answers: {
        calculator: {
          intakeCalls: result.intakeCalls,
          lostOnPrice: result.lostOnPrice,
          clientValue: result.clientValue,
          acceptsMedicaid: result.acceptsMedicaid,
          monthlyLost: result.monthlyLost,
          monthlyRecovered: result.monthlyRecovered,
        },
      },
    });
    await say([
      { text: "Here's what price shock looks like for your agency." },
      { card: { type: 'calcResult', result } },
      {
        text: `Most of those families aren't saying no to care. They just don't know how they'd pay. Poetiq shows them, then hands you a ready client. Starter is ${formatMoney(199)}/mo, Pro is ${formatMoney(299)}/mo.`,
      },
      { card: { type: 'demo', kind: 'agency' } },
    ]);
  };

  const onStatePick = async (abbr: SampleStateAbbr) => {
    const s = runSampleScreening(abbr);
    lastSample.current = s;
    push('user', { text: s.stateName });
    trackEvent(utm, { outcome: 'sample_done', answers: { sample: { state: abbr } } });
    await say([
      { text: `Running Margaret and Frank's numbers under ${s.stateName} rules...` },
      { card: { type: 'screening', s } },
      {
        text: `Frank keeps about ${formatMoney(s.protectedForFrank)}, so the family is not "too rich" for Medicaid. They just need a plan. Here's the brief your partner attorney would receive:`,
      },
      { card: { type: 'brief', s } },
      { text: 'That took under a minute, and the family never had to fill in a form. Want to see it with your own intake calls?' },
      { card: { type: 'demo', kind: 'agency' } },
    ]);
  };

  const onStarter = async (id: StarterId) => {
    const labels: Record<StarterId, string> = {
      calculator: 'What is price shock costing my agency?',
      sample: 'Show me a sample screening',
      partner: "I'm an attorney or estate planner",
      family: "I'm looking for care for a family member",
    };
    push('user', { text: labels[id] });
    trackEvent(utm, { path: id });

    if (id === 'calculator') {
      calc.current = {};
      await say([{ text: "Let's find out. Four quick questions, ballpark numbers are fine." }]);
      await askCalcStep(0);
    } else if (id === 'sample') {
      await say([
        {
          text: 'Meet a sample family. Margaret, 82, needs help bathing and dressing. Her husband Frank lives at home. Together they have about $310,000 in savings, and the agency just quoted $32/hour.',
        },
        { text: 'Which state do they live in?' },
        { card: { type: 'statePicker' } },
      ]);
    } else if (id === 'partner') {
      await say([
        {
          text: 'Poetiq sends you families who are already organized: assets, income, care needs and look-back flags in one case brief, so your first meeting is about planning, not paperwork.',
        },
        {
          text: 'Agencies on Poetiq refer families who need Medicaid or estate planning straight to partner attorneys in their area. Want to talk about becoming one?',
        },
        { card: { type: 'demo', kind: 'partner' } },
      ]);
    } else {
      await say([
        {
          text: "I'm sorry you're going through this. It's a lot. Most families can pay for more care than they think, through Medicaid, VA benefits, insurance or careful planning.",
        },
        { text: 'These two free guides are a good place to start:' },
        { card: { type: 'familyLinks' } },
        {
          text: "If you're already talking to a home care agency, tell us who. We'll offer them Poetiq so they can walk you through your options for free.",
        },
        { card: { type: 'familyReferral' } },
      ]);
    }
  };

  const onFamilyReferral = async (agencyName: string, email: string) => {
    try {
      await submitLead(utm, {
        leadType: 'family_referral',
        agencyName,
        contactEmail: email || undefined,
        summary: 'Family used homepage chat and named their agency.',
      });
    } catch {
      return false;
    }
    push('user', { text: agencyName });
    await say([
      { text: "Thank you. We'll reach out to them. In the meantime, feel free to ask me a question about paying for care below." },
    ]);
    return true;
  };

  const onAsk = async (e: FormEvent) => {
    e.preventDefault();
    const q = input.trim();
    if (!q || typing || remaining <= 0 || aiPaused) return;
    setInput('');
    push('user', { text: q });
    setTyping(true);
    try {
      const res = await askEllie(utm, q);
      setTyping(false);
      setRemaining(res.remaining);
      if (res.status === 'ok') {
        push('ellie', { text: res.answer, note: res.disclaimer });
        if (res.remaining === 0) {
          await say([
            { text: "That was your last typed question for now. The best next step is a quick 15-minute walkthrough." },
            { card: { type: 'demo', kind: 'agency' } },
          ]);
        }
      } else if (res.status === 'out_of_scope') {
        push('ellie', {
          text: 'I can only help with Medicaid, paying for long-term care, or Poetiq itself. Try asking something like "How does the look-back period work?"',
        });
      } else if (res.status === 'session_limit') {
        await say([
          { text: "You've used all your typed questions. I'd love to keep going on a quick call instead." },
          { card: { type: 'demo', kind: 'agency' } },
        ]);
      } else if (res.status === 'daily_limit') {
        setAiPaused(true);
        await say([
          { text: "I've answered a lot of questions today, so typed answers are paused until tomorrow. The guided options still work:" },
          { card: { type: 'starters' } },
        ]);
      } else {
        push('ellie', { text: "I couldn't answer that just now. Please try again in a moment." });
      }
    } catch {
      setTyping(false);
      push('ellie', { text: "I couldn't answer that just now. Please try again in a moment." });
    }
  };

  const renderCard = (card: Card, active: boolean) => {
    switch (card.type) {
      case 'starters':
        return <StarterChoices active={active && !typing} onPick={onStarter} />;
      case 'calcStep':
        return (
          <CalcStepCard
            step={card.step}
            active={active && !typing}
            onAnswer={(v, l) => onCalcAnswer(card.step, v, l)}
          />
        );
      case 'calcResult':
        return <CalcResultCard r={card.result} />;
      case 'statePicker':
        return <StatePicker active={active && !typing} onPick={onStatePick} />;
      case 'screening':
        return <ScreeningCard s={card.s} />;
      case 'brief':
        return <BriefCard s={card.s} />;
      case 'demo':
        return card.kind === 'partner' ? (
          <DemoButton label="Book a partner demo" note="15 minutes. Pick any time that suits you." onClick={() => book('partner')} />
        ) : (
          <DemoButton label="Book a 15-minute demo" note="We'll bring your numbers to the call." onClick={() => book('agency')} />
        );
      case 'familyLinks':
        return <FamilyLinks />;
      case 'familyReferral':
        return <FamilyReferralForm active={active} onSubmit={onFamilyReferral} />;
    }
  };

  const inputLocked = remaining <= 0 || aiPaused;

  return (
    <>
      {!open && (
        <button
          type="button"
          onClick={() => setOpen(true)}
          aria-label="Try Ellie, Poetiq's concierge"
          className="group fixed bottom-5 right-5 z-[60] flex items-center gap-2.5 rounded-full bg-slate-900 py-2 pl-2 pr-5 text-white shadow-2xl shadow-slate-900/30 transition-all duration-300 hover:-translate-y-1 hover:bg-slate-800 sm:bottom-6 sm:right-6 animate-fade-in"
        >
          <span className="relative flex h-10 w-10 items-center justify-center">
            <span className="absolute inset-0 animate-ping rounded-full bg-teal-400 opacity-30" />
            <EllieAvatar size="lg" ring="border-teal-400" />
            <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
          </span>
          <span className="text-left leading-tight">
            <span className="block text-sm font-semibold">Try Ellie</span>
            <span className="block text-[11px] text-slate-300">See what price shock costs you</span>
          </span>
        </button>
      )}

      {open && (
        <section
          role="dialog"
          aria-label="Chat with Ellie"
          className="fixed inset-0 z-[60] flex flex-col overflow-hidden bg-slate-50 shadow-2xl sm:inset-auto sm:bottom-6 sm:right-6 sm:h-[min(680px,calc(100vh-3rem))] sm:w-[400px] sm:rounded-3xl sm:border sm:border-slate-200 animate-fade-in"
        >
          <header className="flex items-center gap-3 bg-gradient-to-r from-slate-900 to-slate-800 px-4 py-3.5 text-white">
            <span className="relative flex h-10 w-10 items-center justify-center">
              <EllieAvatar size="lg" ring="border-white/80" />
              <span className="absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 bg-emerald-400" />
            </span>
            <div className="flex-1">
              <div className="text-sm font-semibold">Ellie</div>
              <div className="text-[11px] text-slate-300">Care-funding concierge &middot; Powered by Poetiq</div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="rounded-full p-2 text-slate-300 transition hover:bg-white/10 hover:text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </header>

          <div ref={scrollRef} className="flex-1 space-y-3 overflow-y-auto px-4 py-4">
            {messages.map((m, i) => {
              const isLast = i === messages.length - 1;
              if (m.card) {
                const active = INTERACTIVE.includes(m.card.type) ? isLast : true;
                return (
                  <div key={m.id} className="pl-9 animate-fade-in">
                    {renderCard(m.card, active)}
                  </div>
                );
              }
              const prevSame = i > 0 && messages[i - 1].from === m.from && !messages[i - 1].card;
              return m.from === 'ellie' ? (
                <div key={m.id} className="flex items-end gap-2 animate-fade-in">
                  <span className={`flex shrink-0 ${prevSame ? 'invisible' : ''}`}>
                    <EllieAvatar size="sm" />
                  </span>
                  <div className="max-w-[85%] rounded-2xl rounded-bl-md bg-white px-3.5 py-2.5 text-sm leading-relaxed text-slate-700 shadow-sm ring-1 ring-slate-100">
                    <p className="whitespace-pre-line">{m.text}</p>
                    {m.note && <p className="mt-2 border-t border-slate-100 pt-2 text-[11px] text-slate-400">{m.note}</p>}
                  </div>
                </div>
              ) : (
                <div key={m.id} className="flex justify-end animate-fade-in">
                  <div className="max-w-[80%] rounded-2xl rounded-br-md bg-teal-600 px-3.5 py-2.5 text-sm leading-relaxed text-white shadow-sm">
                    {m.text}
                  </div>
                </div>
              );
            })}
            {typing && (
              <div className="flex items-end gap-2">
                <span className="flex shrink-0">
                  <EllieAvatar size="sm" />
                </span>
                <div className="flex gap-1 rounded-2xl rounded-bl-md bg-white px-4 py-3 shadow-sm ring-1 ring-slate-100">
                  {[0, 150, 300].map((d) => (
                    <span
                      key={d}
                      className="h-1.5 w-1.5 animate-bounce rounded-full bg-teal-500"
                      style={{ animationDelay: `${d}ms` }}
                    />
                  ))}
                </div>
              </div>
            )}
          </div>

          <form onSubmit={onAsk} className="border-t border-slate-200 bg-white px-3 pb-3 pt-2.5">
            <div className="flex items-center gap-2 rounded-2xl border border-slate-200 bg-slate-50 px-3 py-1.5 transition focus-within:border-teal-500 focus-within:bg-white focus-within:ring-2 focus-within:ring-teal-100">
              {inputLocked ? (
                <Lock className="h-4 w-4 shrink-0 text-slate-400" />
              ) : (
                <MessageCircle className="h-4 w-4 shrink-0 text-slate-400" />
              )}
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                maxLength={400}
                disabled={inputLocked}
                placeholder={
                  aiPaused
                    ? 'Typed answers are paused for today'
                    : remaining <= 0
                      ? 'Question limit reached'
                      : 'Ask about Medicaid or Poetiq...'
                }
                aria-label="Ask Ellie a question"
                className="flex-1 bg-transparent py-1.5 text-sm text-slate-800 outline-none placeholder:text-slate-400 disabled:cursor-not-allowed"
              />
              <button
                type="submit"
                disabled={!input.trim() || typing || inputLocked}
                aria-label="Send question"
                className="flex h-8 w-8 items-center justify-center rounded-full bg-teal-600 text-white transition hover:bg-teal-700 disabled:bg-slate-200 disabled:text-slate-400"
              >
                <Send className="h-4 w-4" />
              </button>
            </div>
            <div className="mt-1.5 flex items-center justify-between px-1 text-[10px] text-slate-400">
              <span>Education, not legal advice. No names or account details, please.</span>
              {!aiPaused && (
                <span className="shrink-0 pl-2 font-medium">
                  {remaining} of {SESSION_QUESTION_CAP} left
                </span>
              )}
            </div>
          </form>
        </section>
      )}
    </>
  );
}
