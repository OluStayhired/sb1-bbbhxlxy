import { Lock, FileText } from 'lucide-react';
import { AttorneyBriefMock } from './AttorneyBriefMock';

export function LockedBriefPreview() {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="absolute -inset-4 bg-teal-200/30 rounded-[2rem] blur-2xl pointer-events-none" />
      <div className="relative max-h-[460px] overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-xl shadow-slate-200/50">
        <div className="pointer-events-none select-none blur-[3px] opacity-90" aria-hidden="true">
          <AttorneyBriefMock />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-white/10 via-white/60 to-white" />
        <div className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center">
          <div className="w-14 h-14 rounded-2xl bg-slate-900 text-white flex items-center justify-center shadow-lg shadow-slate-900/20">
            <Lock className="w-6 h-6" />
          </div>
          <p className="mt-4 text-lg font-semibold text-slate-800">Attorney-Ready Brief</p>
          <p className="mt-1 text-sm text-slate-500 leading-relaxed max-w-xs">
            A clean, downloadable case summary an elder law attorney can act on the same day.
          </p>
          <span className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-teal-50 border border-teal-200 rounded-full text-teal-700 text-xs font-semibold">
            <FileText className="w-3.5 h-3.5" />
            Included in Pro
          </span>
        </div>
      </div>
    </div>
  );
}
