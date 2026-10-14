import { useEffect, useRef, useState } from 'react';
import { Check, Link2, Linkedin, Mail, Share2 } from 'lucide-react';

interface VideoShareMenuProps {
  url: string;
  title: string;
  emailSubject: string;
  emailBody: string;
}

async function copyText(text: string) {
  try {
    await navigator.clipboard.writeText(text);
  } catch {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    document.execCommand('copy');
    document.body.removeChild(ta);
  }
}

export function VideoShareMenu({ url, title, emailSubject, emailBody }: VideoShareMenuProps) {
  const [open, setOpen] = useState(false);
  const [copied, setCopied] = useState(false);
  const wrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpen(false);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('keydown', onKey);
    };
  }, [open]);

  const handleShareClick = async () => {
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    if (isTouch && navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch (err) {
        if ((err as DOMException).name === 'AbortError') return;
      }
    }
    setOpen((o) => !o);
  };

  const handleCopy = async () => {
    await copyText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const mailto = `mailto:?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(`${emailBody}\n\n${url}`)}`;
  const linkedIn = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`;

  return (
    <div ref={wrapRef} className="relative">
      <button
        type="button"
        onClick={handleShareClick}
        aria-haspopup="menu"
        aria-expanded={open}
        className={`inline-flex items-center gap-2 rounded-xl border px-5 py-3.5 text-sm sm:text-base font-semibold transition-all duration-200 ${
          open
            ? 'border-teal-300 bg-teal-50 text-teal-700'
            : 'border-slate-200 bg-white text-slate-700 hover:-translate-y-0.5 hover:border-slate-300 hover:shadow-md'
        }`}
      >
        <Share2 className="h-4 w-4" />
        Share this video
      </button>

      {open && (
        <div
          role="menu"
          className="absolute left-1/2 top-full z-30 mt-3 w-64 -translate-x-1/2 rounded-2xl border border-slate-200 bg-white p-2 shadow-xl shadow-slate-900/10 animate-fade-in"
        >
          <p className="px-3 pb-1.5 pt-2 text-[11px] font-bold uppercase tracking-wider text-slate-400">Share with a colleague</p>
          <button
            type="button"
            role="menuitem"
            onClick={handleCopy}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-left text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span className={`flex h-8 w-8 items-center justify-center rounded-lg transition-colors ${copied ? 'bg-emerald-100 text-emerald-600' : 'bg-slate-100 text-slate-600'}`}>
              {copied ? <Check className="h-4 w-4" /> : <Link2 className="h-4 w-4" />}
            </span>
            {copied ? 'Link copied' : 'Copy link'}
          </button>
          <a
            role="menuitem"
            href={mailto}
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-slate-100 text-slate-600">
              <Mail className="h-4 w-4" />
            </span>
            Email a colleague
          </a>
          <a
            role="menuitem"
            href={linkedIn}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setOpen(false)}
            className="flex w-full items-center gap-3 rounded-xl px-3 py-2.5 text-sm font-medium text-slate-700 transition-colors hover:bg-slate-50"
          >
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-sky-50 text-sky-700">
              <Linkedin className="h-4 w-4" />
            </span>
            Share on LinkedIn
          </a>
        </div>
      )}
    </div>
  );
}
