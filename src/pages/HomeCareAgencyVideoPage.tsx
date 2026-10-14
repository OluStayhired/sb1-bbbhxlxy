import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { ArrowRight, Briefcase, CalendarCheck, CircleDollarSign, FileSearch, Target, X } from 'lucide-react';
import { CareManagerVideoPlayer } from '../components/CareManagerVideoPlayer';
import { VideoShareMenu } from '../components/VideoShareMenu';
import { PageFooter } from '../components/PageFooter';
import { OnboardingQuestionsModal } from '../components/OnboardingQuestionsModal';
import { BOOKING_URL, readUtm } from '../utils/ellieConcierge';

const VIDEO_URL =
  'https://selrznkggmoxbpflzwjz.supabase.co/storage/v1/object/public/poetiq_homepage/poetiq-home-care-agency.mp4';
const PAGE_TITLE = 'Poetiq for Home Care Agencies | Watch the Walkthrough';
const PAGE_DESCRIPTION =
  'See how intake coordinators use Poetiq to answer price objections on private-pay calls and show families a data-backed path to affordable care.';
const NUDGE_AT = 0.8;
const NUDGE_HEADLINE = "Ready to turn your next \u201cwe can't afford it\u201d into a care start date?";

const POINTS = [
  { icon: FileSearch, label: 'First names and rough estimates only' },
  { icon: CircleDollarSign, label: "Uses your state's Medicaid rules" },
  { icon: Briefcase, label: 'Prepares families for an elder law attorney' },
];

function setMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(`meta[${attr}="${key}"]`);
  const created = !el;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  const previous = el.getAttribute('content');
  el.setAttribute('content', content);
  return () => {
    if (created) el?.remove();
    else if (previous !== null) el?.setAttribute('content', previous);
  };
}

export default function HomeCareAgencyVideoPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const playerWrapRef = useRef<HTMLDivElement>(null);

  const [visible, setVisible] = useState(false);
  const [nudgeShown, setNudgeShown] = useState(false);
  const [nudgeDismissed, setNudgeDismissed] = useState(false);
  const [videoEnded, setVideoEnded] = useState(false);
  const [pastPlayer, setPastPlayer] = useState(false);
  const [isOnboardingModalOpen, setIsOnboardingModalOpen] = useState(false);

  const utm = useMemo(() => readUtm(location.search), [location.search]);

  const bookingUrl = useMemo(() => {
    const params = new URLSearchParams({
      utm_source: utm.source ?? 'home_care_agency_video',
      utm_medium: utm.medium ?? 'video_page',
      utm_campaign: utm.campaign ?? 'direct',
      utm_content: 'home_care_agency_demo',
    });
    return `${BOOKING_URL}?${params.toString()}`;
  }, [utm]);

  const shareUrl = `${window.location.origin}/home-care-agency-video?utm_source=share&utm_medium=referral&utm_campaign=home_care_agency_video`;

  const openBooking = () => window.open(bookingUrl, '_blank', 'noopener,noreferrer');
  const goToAgencyHome = () => navigate('/');

  useEffect(() => {
    window.scrollTo(0, 0);
    const t = setTimeout(() => setVisible(true), 100);
    const prevTitle = document.title;
    document.title = PAGE_TITLE;
    const restore = [
      setMeta('name', 'description', PAGE_DESCRIPTION),
      setMeta('property', 'og:title', PAGE_TITLE),
      setMeta('property', 'og:description', PAGE_DESCRIPTION),
      setMeta('property', 'og:image', `${window.location.origin}/images/poetiq-meta-img-v6.png`),
      setMeta('name', 'twitter:image', `${window.location.origin}/images/poetiq-meta-img-v6.png`),
    ];
    return () => {
      clearTimeout(t);
      document.title = prevTitle;
      restore.forEach((r) => r());
    };
  }, []);

  useEffect(() => {
    const el = playerWrapRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(([entry]) => {
      setPastPlayer(!entry.isIntersecting && entry.boundingClientRect.top < 0);
    });
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const handleProgress = (fraction: number) => {
    if (fraction >= NUDGE_AT && !nudgeShown) setNudgeShown(true);
  };

  const reveal = (delay: string) =>
    `transition-all duration-700 ease-out ${delay} ${visible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-4'}`;

  const showNudge = nudgeShown && !nudgeDismissed && !videoEnded;

  return (
    <>
      <div className="min-h-screen bg-white">
        {/* Soft backdrop */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-x-0 top-0 h-[640px] overflow-hidden">
          <div className="absolute -top-40 left-1/2 h-[520px] w-[900px] -translate-x-1/2 rounded-full bg-gradient-to-b from-teal-100/70 via-emerald-50/50 to-transparent blur-3xl" />
        </div>

        {/* Top bar */}
        <header className="sticky top-0 z-40 border-b border-slate-100/80 bg-white/80 backdrop-blur-md">
          <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
            <button
              type="button"
              onClick={goToAgencyHome}
              aria-label="Poetiq home"
              className="flex items-center gap-2.5 rounded-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500"
            >
              <span className="rounded-full bg-red-100/60 p-1.5">
                <Target className="h-6 w-6 fill-red-50 text-red-500" strokeWidth={2} />
              </span>
              <span className="text-xl font-bold tracking-tight text-slate-900">Poetiq</span>
            </button>
            <nav className="flex items-center gap-1 sm:gap-3">
              <button
                type="button"
                onClick={goToAgencyHome}
                className="hidden sm:inline-flex rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 hover:text-slate-900"
              >
                For Home Care Agencies
              </button>
              <button
                type="button"
                onClick={openBooking}
                className="inline-flex items-center gap-1.5 rounded-lg bg-slate-900 px-3.5 py-2 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
              >
                <CalendarCheck className="h-4 w-4" />
                Book Demo
              </button>
            </nav>
          </div>
        </header>

        <main className="relative mx-auto max-w-5xl px-4 sm:px-6 pb-16 pt-10 sm:pt-16">
          {/* Intro */}
          <div className="text-center">
            <span className={`inline-flex items-center gap-2 rounded-full border border-teal-200 bg-white/70 px-3.5 py-1.5 text-xs font-semibold text-teal-700 ${reveal('delay-0')}`}>
              <span className="h-1.5 w-1.5 rounded-full bg-teal-500" />
              For Home Care Agencies
            </span>
            <h1 className={`mx-auto mt-5 max-w-3xl text-3xl sm:text-5xl font-bold leading-[1.15] tracking-tight text-slate-900 ${reveal('delay-100')}`}>
              <span className='spoken-voice'>We can't afford care</span>
              {/*&ldquo;We can&rsquo;t afford care&rdquo;*/} is often{' '} <br className='hidden sm:block'/>
              <span className="bg-gradient-to-r from-teal-600 to-emerald-500 bg-clip-text text-transparent">not the final answer.</span>
            </h1>
            <p className={`mx-auto mt-4 max-w-2xl text-base sm:text-lg leading-relaxed text-slate-600 ${reveal('delay-200')}`}>
              {/*A short walkthrough of how your intake coordinator turns a price objection on a private-pay call into a data-backed funding plan, showing the family how much of their savings may be protected and that Medicaid may be within reach.*/}
            Here is the short walkthrough showing how intake coordinators generate real-time funding plans to address price objections on the call.
            </p>
          </div>

          {/* Video */}
          <div ref={playerWrapRef} className={`mt-8 sm:mt-12 ${reveal('delay-300')}`}>
            <CareManagerVideoPlayer
              src={VIDEO_URL}
              onBook={openBooking}
              onLearnMore={goToAgencyHome}
              onProgress={handleProgress}
              onEndedChange={setVideoEnded}
              endHeadline={NUDGE_HEADLINE}
            />
            <p className="mt-3 hidden sm:block text-center text-xs text-slate-400">
              Shortcuts: <Kbd>Space</Kbd> play or pause, <Kbd>&larr;</Kbd> <Kbd>&rarr;</Kbd> skip 5s, <Kbd>M</Kbd> mute, <Kbd>F</Kbd> full screen
            </p>
          </div>

          {/* Next steps */}
          <div className={`mt-10 sm:mt-12 flex flex-col items-center ${reveal('delay-500')}`}>
            <div className="flex flex-col sm:flex-row items-center gap-3">
              <button
                type="button"
                onClick={openBooking}
                className="group inline-flex items-center gap-2.5 rounded-xl bg-teal-600 px-7 py-3.5 text-sm sm:text-base font-semibold text-white shadow-lg shadow-teal-600/25 transition-all duration-300 hover:-translate-y-0.5 hover:bg-teal-700 hover:shadow-xl hover:shadow-teal-600/30"
              >
                Book a 15-Minute Demo
                <ArrowRight className="h-5 w-5 transition-transform duration-300 group-hover:translate-x-1" />
              </button>
              <VideoShareMenu
                url={shareUrl}
                title="Poetiq for Home Care Agencies"
                emailSubject="Worth a look: Poetiq for our intake calls"
                emailBody="I came across this short walkthrough of Poetiq. It helps an intake team handle price objections on private-pay calls by showing families, with real numbers, how much of their savings may be protected and how Medicaid may be within reach. Thought it could help us turn more inquiries into clients."
              />
            </div>

            <button
              type="button"
              onClick={goToAgencyHome}
              className="group mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-slate-500 transition-colors hover:text-teal-700"
            >
              Explore Poetiq for Home Care Agencies
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </button>

            <div className="mt-10 grid w-full max-w-3xl grid-cols-1 sm:grid-cols-3 gap-3">
              {POINTS.map(({ icon: Icon, label }) => (
                <div
                  key={label}
                  className="flex items-center gap-3 rounded-xl border border-slate-100 bg-slate-50/70 px-4 py-3 text-sm text-slate-600"
                >
                  <span className="flex h-8 w-8 flex-none items-center justify-center rounded-lg bg-white text-teal-600 shadow-sm ring-1 ring-slate-100">
                    <Icon className="h-4 w-4" />
                  </span>
                  {label}
                </div>
              ))}
            </div>
          </div>
        </main>

        <PageFooter onOpenOnboardingModal={() => setIsOnboardingModalOpen(true)} />
      </div>

      {/* Gentle nudge near the end of the video */}
      <div
        role="status"
        className={`fixed bottom-6 right-6 z-50 hidden sm:block w-80 transition-all duration-500 ease-out ${
          showNudge ? 'translate-y-0 opacity-100' : 'pointer-events-none translate-y-4 opacity-0'
        }`}
      >
        <div className="relative rounded-2xl border border-slate-200 bg-white p-5 shadow-2xl shadow-slate-900/15">
          <button
            type="button"
            onClick={() => setNudgeDismissed(true)}
            aria-label="Dismiss"
            className="absolute right-3 top-3 rounded-lg p-1 text-slate-400 transition-colors hover:bg-slate-100 hover:text-slate-600"
          >
            <X className="h-4 w-4" />
          </button>
          <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-50 text-teal-600">
            <CalendarCheck className="h-5 w-5" />
          </span>
          <p className="mt-3 pr-4 text-sm font-semibold leading-snug text-slate-900">{NUDGE_HEADLINE}</p>
          <p className="mt-1 text-xs leading-relaxed text-slate-500">A quick, no-pressure walkthrough tailored to your intake team.</p>
          <button
            type="button"
            onClick={openBooking}
            className="group mt-4 inline-flex w-full items-center justify-center gap-2 rounded-lg bg-teal-600 px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-teal-700"
          >
            Book 15 minutes
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </button>
        </div>
      </div>

      {/* Mobile sticky booking bar */}
      <div
        className={`fixed inset-x-0 bottom-0 z-50 border-t border-slate-200 bg-white/95 px-4 py-3 backdrop-blur-md transition-transform duration-300 sm:hidden ${
          pastPlayer ? 'translate-y-0' : 'translate-y-full'
        }`}
      >
        <button
          type="button"
          onClick={openBooking}
          className="flex w-full items-center justify-center gap-2 rounded-xl bg-teal-600 py-3 text-sm font-semibold text-white"
        >
          <CalendarCheck className="h-4 w-4" />
          Book a 15-Minute Demo
        </button>
      </div>

      <OnboardingQuestionsModal isOpen={isOnboardingModalOpen} onClose={() => setIsOnboardingModalOpen(false)} />
    </>
  );
}

function Kbd({ children }: { children: React.ReactNode }) {
  return (
    <kbd className="mx-0.5 rounded border border-slate-200 bg-slate-50 px-1.5 py-0.5 font-sans text-[10px] font-semibold text-slate-500">
      {children}
    </kbd>
  );
}
