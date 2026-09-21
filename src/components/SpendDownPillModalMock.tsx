// src/components/SpendDownPillModalMock.tsx
import { useState, useEffect, useRef, useCallback } from 'react';
import {
  Sparkles,
  Shield,
  ChevronDown,
  ChevronUp,
  MessageCircle,
} from 'lucide-react';

// ═══════════════════════════════════════════════════════════════════════════════
// STATIC CONVERSATION DATA
// ═══════════════════════════════════════════════════════════════════════════════

interface MockMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
}

const MOCK_CONVERSATION: MockMessage[] = [
  {
    id: '0',
    role: 'assistant',
    content:
      "Hi, I'm Ellie -- your clinical and financial co-pilot. Ask me anything about Medicaid eligibility, asset transfers, spend-down strategies, or care placement logistics.",
  },
  {
    id: '1',
    role: 'user',
    content:
      "A family in Florida transferred $60,000 to their daughter 14 months ago. The applicant now needs home care and wants to apply for Medicaid. What's the penalty and what can we do?",
  },
  {
    id: '2',
    role: 'assistant',
    content: `**Florida Look-Back Penalty Analysis**

**Transfer details:**
- Amount transferred: $60,000
- Transfer date: approximately 14 months ago
- State: Florida (36-month look-back for home and community-based services)

**Penalty calculation:**
Florida's divisor for 2024-2025 is approximately **$10,718/month** (the average monthly cost of nursing facility care). Dividing the $60,000 transfer by this divisor:

$60,000 / $10,718 = **5.6 months** of ineligibility

This penalty period does not start until the applicant is otherwise eligible for Medicaid *and* has applied. So the family cannot simply "wait it out" without first qualifying on all other grounds.

**Three options your intake team can present today:**

1. **Cure the transfer.** If the daughter returns the full $60,000, the penalty is eliminated entirely. Even a partial return reduces the penalty proportionally -- returning $30,000 would cut the ineligibility to roughly 2.8 months.

2. **Demonstrate an exclusively-for-benefit exemption.** If the funds were used exclusively for the applicant's benefit (medical bills, home modifications for accessibility, prepaid funeral/burial), the transfer may be exempt. Documentation must be airtight.

3. **Undue hardship waiver.** If denying Medicaid would leave the applicant without care and at risk of harm, Florida allows an undue hardship exception. This requires a formal petition with medical evidence showing the applicant would be deprived of medical care, food, clothing, or shelter.

**Recommended next step:** Package a diagnostic brief for an elder law attorney with the transfer date, amount, daughter's contact information, and a summary of the applicant's current ADL deficits. An attorney can evaluate whether a partial cure combined with an undue hardship petition is the fastest path to eligibility.

*Would you like me to flag anything else on this case -- such as checking whether the applicant's income exceeds the Florida ICP cap of $2,829/month?*`,
  },
  {
    id: '3',
    role: 'user',
    content: "No thank you, that's all. This is exactly what I needed.",
  },
  {
    id: '4',
    role: 'assistant',
    content:
      "You're welcome. This analysis is ready to share with the family or attach to an attorney referral brief. Good luck closing this case -- reach out anytime you hit another scenario.",
  },
];

// ═══════════════════════════════════════════════════════════════════════════════
// TYPING ANIMATION HOOK
// ═══════════════════════════════════════════════════════════════════════════════

function useTypingEffect(text: string, speed = 10, charsPerTick = 3) {
  const [displayed, setDisplayed] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!text) {
      setDisplayed('');
      setDone(false);
      return;
    }
    setDisplayed('');
    setDone(false);
    let i = 0;
    const interval = setInterval(() => {
      i += charsPerTick;
      if (i >= text.length) {
        setDisplayed(text);
        setDone(true);
        clearInterval(interval);
      } else {
        setDisplayed(text.slice(0, i));
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text, speed, charsPerTick]);

  return { displayed, done };
}

// ═══════════════════════════════════════════════════════════════════════════════
// MARKDOWN FORMATTER (simplified, matches the real modal)
// ═══════════════════════════════════════════════════════════════════════════════

function formatMockMarkdown(text: string): string {
  if (!text) return '';
  let html = text
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    .replace(/(?<!\*)\*(?!\*)(.+?)(?<!\*)\*(?!\*)/g, '<em>$1</em>');

  const lines = html.split('\n');
  const result: string[] = [];
  let inList = false;
  let inOl = false;

  for (const line of lines) {
    const bullet = line.match(/^\s*[*\-•]\s+(.*)/);
    const ordered = line.match(/^\s*(\d+)\.\s+(.*)/);

    if (bullet) {
      if (!inList) {
        if (inOl) { result.push('</ol>'); inOl = false; }
        result.push('<ul class="list-disc pl-4 my-1 space-y-0.5">');
        inList = true;
      }
      result.push(`<li>${bullet[1]}</li>`);
    } else if (ordered) {
      if (!inOl) {
        if (inList) { result.push('</ul>'); inList = false; }
        result.push('<ol class="list-decimal pl-4 my-1 space-y-0.5">');
        inOl = true;
      }
      result.push(`<li>${ordered[2]}</li>`);
    } else {
      if (inList) { result.push('</ul>'); inList = false; }
      if (inOl) { result.push('</ol>'); inOl = false; }
      if (line.trim() === '') {
        result.push('<div class="h-2"></div>');
      } else {
        result.push(`<p>${line}</p>`);
      }
    }
  }
  if (inList) result.push('</ul>');
  if (inOl) result.push('</ol>');
  return result.join('');
}

// ═══════════════════════════════════════════════════════════════════════════════
// SINGLE MESSAGE BUBBLE
// ═══════════════════════════════════════════════════════════════════════════════

function MockBubble({
  message,
  animate,
  onTypingDone,
}: {
  message: MockMessage;
  animate: boolean;
  onTypingDone?: () => void;
}) {
  const { displayed, done } = useTypingEffect(
    animate ? message.content : '',
    8,
    5
  );

  const calledRef = useRef(false);
  useEffect(() => {
    calledRef.current = false;
  }, [animate]);

  useEffect(() => {
    if (animate && done && onTypingDone && !calledRef.current) {
      calledRef.current = true;
      onTypingDone();
    }
  }, [animate, done, onTypingDone]);

  const text = animate ? displayed : message.content;
  const isUser = message.role === 'user';

  return (
    <div className={`flex ${isUser ? 'justify-end' : 'justify-start'}`}>
      {/* Ellie avatar */}
      {!isUser && (
        <div className="flex-shrink-0 mr-2 mt-0.5">
          <div className="relative w-6 h-6">
            <div className="w-full h-full rounded-full overflow-hidden border border-slate-200">
              <img
                src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                alt="Ellie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-1.5 h-1.5 bg-green-500 rounded-full border border-white" />
          </div>
        </div>
      )}

      <div className="flex flex-col max-w-[82%]">
        {!isUser && (
          <span className="text-[10px] font-semibold text-green-700 mb-1 ml-0.5">
            Ellie
          </span>
        )}
        <div
          className={`rounded-xl px-3 py-2.5 ${
            isUser
              ? 'bg-slate-800 text-white'
              : 'bg-white text-slate-800 border border-slate-200 shadow-sm'
          }`}
        >
          {isUser ? (
            <p className="text-xs leading-relaxed whitespace-pre-wrap">{text}</p>
          ) : (
            <div
              className="text-xs leading-relaxed [&_p]:my-0.5 [&_ul]:my-1 [&_ol]:my-1 [&_strong]:font-semibold"
              dangerouslySetInnerHTML={{ __html: formatMockMarkdown(text) }}
            />
          )}
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// THINKING INDICATOR
// ═══════════════════════════════════════════════════════════════════════════════

function ThinkingDots() {
  return (
    <div className="flex justify-start">
      <div className="flex-shrink-0 mr-2 mt-0.5">
        <div className="relative w-6 h-6">
          <div className="w-full h-full rounded-full overflow-hidden border border-slate-200">
            <img
              src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
              alt="Ellie"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
      <div className="bg-white rounded-xl px-3 py-2.5 border border-slate-200 shadow-sm">
        <div className="flex items-center space-x-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:0ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:150ms]" />
          <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-bounce [animation-delay:300ms]" />
          <span className="text-xs text-slate-500 ml-1">Ellie is thinking...</span>
        </div>
      </div>
    </div>
  );
}

// ═══════════════════════════════════════════════════════════════════════════════
// MAIN EXPORT
// ═══════════════════════════════════════════════════════════════════════════════

export function SpendDownPillModalMock() {
  const [visibleCount, setVisibleCount] = useState(1);
  const [isThinking, setIsThinking] = useState(false);
  const [animatingIdx, setAnimatingIdx] = useState<number | null>(null);
  const [isCollapsed, setIsCollapsed] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const timersRef = useRef<ReturnType<typeof setTimeout>[]>([]);

  const addTimer = useCallback((fn: () => void, ms: number) => {
    const id = setTimeout(fn, ms);
    timersRef.current.push(id);
    return id;
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [visibleCount, isThinking, animatingIdx]);

  const revealNextRef = useRef<(nextIdx: number) => void>(() => {});

  revealNextRef.current = (nextIdx: number) => {
    if (nextIdx >= MOCK_CONVERSATION.length) return;

    const msg = MOCK_CONVERSATION[nextIdx];

    if (msg.role === 'user') {
      setVisibleCount(nextIdx + 1);
      addTimer(() => {
        setIsThinking(true);
        addTimer(() => {
          setIsThinking(false);
          revealNextRef.current(nextIdx + 1);
        }, 1800);
      }, 600);
    } else {
      setVisibleCount(nextIdx + 1);
      setAnimatingIdx(nextIdx);
    }
  };

  // Kick off the conversation -- no guard ref needed; cleanup handles StrictMode
  useEffect(() => {
    const id = addTimer(() => revealNextRef.current(1), 1500);
    return () => {
      clearTimeout(id);
      timersRef.current.forEach(clearTimeout);
      timersRef.current = [];
    };
  }, [addTimer]);

  const handleTypingDone = useCallback((idx: number) => {
    setAnimatingIdx(null);
    addTimer(() => revealNextRef.current(idx + 1), 1200);
  }, [addTimer]);

  const visibleMessages = MOCK_CONVERSATION.slice(0, visibleCount);

  return (
    <div className="w-full max-w-md mx-auto flex flex-col bg-white rounded-2xl border border-slate-200 shadow-xl shadow-slate-200/40 overflow-hidden">    
      
      {/* ── Header ── */}
      <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-slate-200">
        <div className="flex items-center space-x-2.5">
          <div className="relative w-8 h-8 flex-shrink-0">
            <div className="w-full h-full rounded-full overflow-hidden border border-slate-200 shadow-sm">
              <img
                src="https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/ellie_ai_square.png"
                alt="Ellie"
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute bottom-0 right-0 w-2 h-2 bg-green-400 rounded-full border border-white" />
          </div>
          <div>
            <div className="flex items-center space-x-1.5">
              <span className="text-sm font-bold text-slate-900">Ellie</span>
              <Sparkles className="w-3.5 h-3.5 text-green-500" />
              <span className="text-[10px] font-bold text-green-700 bg-green-50 border border-green-200 rounded-full px-1.5 py-0.5 leading-none">
                Pro
              </span>
            </div>
            <p className="text-[10px] text-slate-500 font-medium leading-none mt-0.5">
              Clinical &amp; Financial Co-Pilot
            </p>
          </div>
        </div>

        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="p-1.5 hover:bg-slate-100 rounded-lg transition-colors"
        >
          {isCollapsed ? (
            <ChevronUp className="w-4 h-4 text-slate-500" />
          ) : (
            <ChevronDown className="w-4 h-4 text-slate-500" />
          )}
        </button>
      </div>

      {/* ── Body (collapsible) ── */}
      {!isCollapsed && (
        <>
          {/* Context banner */}
          <div className="flex-none bg-slate-50 px-4 py-2.5 border-b border-slate-100">
            <div className="flex items-start space-x-2">
              <Shield className="w-4 h-4 text-green-600 flex-shrink-0 mt-0.5" />
              <p className="text-[11px] text-slate-600 leading-relaxed">
                <span className="font-semibold text-slate-800">
                  Live demo:
                </span>{' '}
                Watch Ellie resolve a $60,000 asset transfer penalty question for a Florida home care intake team in real time.
              </p>
            </div>
          </div>

          {/* Chat area */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-3 bg-slate-50"
            //style={{ maxHeight: '420px', minHeight: '280px' }}
            style={{ maxHeight: '340px', minHeight: '200px' }}
          >
            {visibleMessages.map((msg, idx) => (
              <MockBubble
                key={msg.id}
                message={msg}
                animate={idx === animatingIdx}
                onTypingDone={
                  idx === animatingIdx
                    ? () => handleTypingDone(idx)
                    : undefined
                }
              />
            ))}

            {isThinking && <ThinkingDots />}
          </div>

          {/* Disabled input bar (decorative -- shows this is a real chat UI) */}
          <div className="flex-none border-t border-slate-200 px-4 py-3 bg-white">
            <div className="flex items-center space-x-2">
              <div className="flex-1 px-3 py-2 text-xs border border-slate-200 rounded-lg bg-slate-50 text-slate-400 select-none">
                Ask about eligibility, penalties, or planning...
              </div>
              <div className="p-2.5 rounded-lg bg-slate-200 flex-shrink-0">
                <MessageCircle className="w-4 h-4 text-white" />
              </div>
            </div>
            <p className="text-[10px] text-slate-400 mt-2 text-center">
              Ellie uses AI -- verify all outputs with a licensed Medicaid attorney.
            </p>
          </div>
        </>
      )}
    </div>
  );
}

export default SpendDownPillModalMock;
