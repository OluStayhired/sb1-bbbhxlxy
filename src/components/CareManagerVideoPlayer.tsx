import { useCallback, useEffect, useRef, useState } from 'react';
import {
  AlertCircle,
  ArrowRight,
  CalendarCheck,
  Loader2,
  Maximize,
  Minimize,
  Pause,
  Play,
  RotateCcw,
  Square,
  Volume2,
  VolumeX,
} from 'lucide-react';

interface CareManagerVideoPlayerProps {
  src: string;
  onBook: () => void;
  onLearnMore: () => void;
  onProgress?: (fraction: number) => void;
  onEndedChange?: (ended: boolean) => void;
  endHeadline?: string;
}

const formatTime = (s: number) => {
  if (!Number.isFinite(s) || s < 0) return '0:00';
  const m = Math.floor(s / 60);
  const sec = Math.floor(s % 60);
  return `${m}:${sec.toString().padStart(2, '0')}`;
};

const isInteractive = (el: EventTarget | null) => {
  const t = el as HTMLElement | null;
  if (!t) return false;
  return t.isContentEditable || ['INPUT', 'TEXTAREA', 'SELECT', 'BUTTON', 'A'].includes(t.tagName);
};

export function CareManagerVideoPlayer({
  src,
  onBook,
  onLearnMore,
  onProgress,
  onEndedChange,
  endHeadline = 'Ready to see it with your own clients?',
}: CareManagerVideoPlayerProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const barRef = useRef<HTMLDivElement>(null);
  const hideTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const scrubbing = useRef(false);

  const [started, setStarted] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [ended, setEnded] = useState(false);
  const [current, setCurrent] = useState(0);
  const [duration, setDuration] = useState(0);
  const [buffered, setBuffered] = useState(0);
  const [volume, setVolume] = useState(1);
  const [muted, setMuted] = useState(false);
  const [buffering, setBuffering] = useState(false);
  const [error, setError] = useState(false);
  const [fullscreen, setFullscreen] = useState(false);
  const [controlsVisible, setControlsVisible] = useState(true);

  const setEndedState = useCallback((value: boolean) => {
    setEnded(value);
    onEndedChange?.(value);
  }, [onEndedChange]);

  const play = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (ended) {
      v.currentTime = 0;
      setEndedState(false);
    }
    setStarted(true);
    v.play().catch(() => setPlaying(false));
  }, [ended, setEndedState]);

  const togglePlay = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) play();
    else v.pause();
  }, [play]);

  const stop = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    v.currentTime = 0;
    setCurrent(0);
    setStarted(false);
    setEndedState(false);
  }, [setEndedState]);

  const seekBy = useCallback((delta: number) => {
    const v = videoRef.current;
    if (!v || !Number.isFinite(v.duration)) return;
    v.currentTime = Math.min(Math.max(v.currentTime + delta, 0), v.duration);
  }, []);

  const toggleMute = useCallback(() => {
    const v = videoRef.current;
    if (!v) return;
    v.muted = !v.muted;
    if (!v.muted && v.volume === 0) v.volume = 0.6;
  }, []);

  const toggleFullscreen = useCallback(() => {
    const el = containerRef.current;
    const v = videoRef.current as (HTMLVideoElement & { webkitEnterFullscreen?: () => void }) | null;
    if (!el) return;
    if (document.fullscreenElement) {
      document.exitFullscreen().catch(() => {});
    } else if (el.requestFullscreen) {
      el.requestFullscreen().catch(() => {});
    } else if (v?.webkitEnterFullscreen) {
      v.webkitEnterFullscreen();
    }
  }, []);

  const revealControls = useCallback(() => {
    setControlsVisible(true);
    if (hideTimer.current) clearTimeout(hideTimer.current);
    hideTimer.current = setTimeout(() => {
      if (videoRef.current && !videoRef.current.paused && !scrubbing.current) setControlsVisible(false);
    }, 2600);
  }, []);

  useEffect(() => {
    const onFs = () => setFullscreen(document.fullscreenElement === containerRef.current);
    document.addEventListener('fullscreenchange', onFs);
    return () => {
      document.removeEventListener('fullscreenchange', onFs);
      if (hideTimer.current) clearTimeout(hideTimer.current);
    };
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.metaKey || e.ctrlKey || e.altKey) return;
      const key = e.key.toLowerCase();
      if ((key === ' ' || key === 'k') && !isInteractive(e.target)) {
        e.preventDefault();
        togglePlay();
      } else if (isInteractive(e.target) && (e.target as HTMLElement).tagName === 'INPUT') {
        return;
      } else if (key === 'arrowright') {
        e.preventDefault();
        seekBy(5);
      } else if (key === 'arrowleft') {
        e.preventDefault();
        seekBy(-5);
      } else if (key === 'm') {
        toggleMute();
      } else if (key === 'f') {
        toggleFullscreen();
      } else {
        return;
      }
      revealControls();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [togglePlay, seekBy, toggleMute, toggleFullscreen, revealControls]);

  const seekToPointer = (clientX: number) => {
    const bar = barRef.current;
    const v = videoRef.current;
    if (!bar || !v || !Number.isFinite(v.duration)) return;
    const rect = bar.getBoundingClientRect();
    const fraction = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
    v.currentTime = fraction * v.duration;
    setCurrent(v.currentTime);
  };

  const handleTimeUpdate = () => {
    const v = videoRef.current;
    if (!v) return;
    if (!scrubbing.current) setCurrent(v.currentTime);
    if (v.duration) onProgress?.(v.currentTime / v.duration);
  };

  const handleProgressEvent = () => {
    const v = videoRef.current;
    if (!v || !v.duration || v.buffered.length === 0) return;
    setBuffered(v.buffered.end(v.buffered.length - 1) / v.duration);
  };

  const retry = () => {
    const v = videoRef.current;
    if (!v) return;
    setError(false);
    v.load();
  };

  const progress = duration ? (current / duration) * 100 : 0;
  const showControls = started && !ended && (controlsVisible || !playing);

  return (
    <div
      ref={containerRef}
      onMouseMove={revealControls}
      onTouchStart={revealControls}
      style={fullscreen ? undefined : { aspectRatio: '16 / 9' }}
      className={`group relative w-full overflow-hidden bg-slate-950 ${
        fullscreen ? 'h-full' : 'rounded-2xl shadow-2xl shadow-slate-900/25 ring-1 ring-slate-900/10'
      } ${started && playing && !controlsVisible ? 'cursor-none' : ''}`}
    >

      <video
        ref={videoRef}
        src={`${src}#t=0.1`}
        preload="metadata"
        playsInline
        onClick={() => started && togglePlay()}
        onPlay={() => { setPlaying(true); revealControls(); }}
        onPause={() => { setPlaying(false); setControlsVisible(true); }}
        onEnded={() => { setPlaying(false); setEndedState(true); }}
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgressEvent}
        onLoadedMetadata={(e) => setDuration(e.currentTarget.duration)}
        onWaiting={() => setBuffering(true)}
        onPlaying={() => setBuffering(false)}
        onCanPlay={() => setBuffering(false)}
        onError={() => setError(true)}
        onVolumeChange={(e) => { setVolume(e.currentTarget.volume); setMuted(e.currentTarget.muted); }}
        className="absolute inset-0 h-full w-full object-contain"
      />

      {/* Cover with big play button */}
      {!started && !error && (
        <button
          type="button"
          onClick={play}
          aria-label="Play video"
          className="absolute inset-0 flex flex-col items-center justify-center bg-gradient-to-t from-slate-950/80 via-slate-950/30 to-slate-950/10 focus:outline-none"
        >
          <span className="relative flex items-center justify-center">
            <span className="absolute h-24 w-24 sm:h-28 sm:w-28 rounded-full bg-teal-400/30 animate-ping [animation-duration:2.4s]" />
            <span className="relative flex h-20 w-20 sm:h-24 sm:w-24 items-center justify-center rounded-full bg-white text-teal-600 shadow-2xl transition-transform duration-300 group-hover:scale-110 group-focus-visible:ring-4 group-focus-visible:ring-teal-400">
              <Play className="h-8 w-8 sm:h-9 sm:w-9 translate-x-0.5 fill-current" />
            </span>
          </span>
          <span className="mt-6 text-sm sm:text-base font-semibold text-white tracking-wide">
            Watch the walkthrough{duration ? ` · ${formatTime(duration)}` : ''}
          </span>
        </button>
      )}

      {buffering && started && !error && (
        <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
          <Loader2 className="h-10 w-10 animate-spin text-white/90" />
        </div>
      )}

      {error && (
        <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 bg-slate-950/90 px-6 text-center">
          <AlertCircle className="h-10 w-10 text-amber-400" />
          <p className="max-w-sm text-sm text-slate-200">The video couldn't load right now. Check your connection and try again.</p>
          <button
            type="button"
            onClick={retry}
            className="inline-flex items-center gap-2 rounded-lg bg-white px-4 py-2 text-sm font-semibold text-slate-900 transition-colors hover:bg-teal-50"
          >
            <RotateCcw className="h-4 w-4" /> Try again
          </button>
        </div>
      )}

      {/* End screen */}
      {ended && (
        <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-950/85 px-6 text-center backdrop-blur-sm animate-fade-in">
          <p className="text-xs font-bold uppercase tracking-[0.2em] text-teal-300">Thanks for watching</p>
          <h3 className="mt-3 max-w-lg text-xl sm:text-3xl font-bold leading-tight text-white">
            {endHeadline}
          </h3>
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row items-center gap-3">
            <button
              type="button"
              onClick={onBook}
              className="group/btn inline-flex items-center gap-2 rounded-xl bg-teal-500 px-6 py-3 text-sm sm:text-base font-semibold text-white shadow-lg shadow-teal-500/30 transition-all hover:-translate-y-0.5 hover:bg-teal-400"
            >
              <CalendarCheck className="h-5 w-5" />
              Book a 15-Minute Demo
            </button>
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={play}
                className="inline-flex items-center gap-2 rounded-xl border border-white/20 px-4 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/10"
              >
                <RotateCcw className="h-4 w-4" /> Watch again
              </button>
              <button
                type="button"
                onClick={onLearnMore}
                className="group/lm inline-flex items-center gap-1.5 rounded-xl px-3 py-3 text-sm font-semibold text-teal-200 transition-colors hover:text-white"
              >
                Learn more
                <ArrowRight className="h-4 w-4 transition-transform group-hover/lm:translate-x-0.5" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Control bar */}
      {started && !ended && !error && (
        <div
          className={`absolute inset-x-0 bottom-0 bg-gradient-to-t from-slate-950/90 via-slate-950/50 to-transparent px-3 sm:px-5 pb-2.5 sm:pb-4 pt-12 transition-opacity duration-300 ${
            showControls ? 'opacity-100' : 'pointer-events-none opacity-0'
          }`}
        >
          <div
            ref={barRef}
            role="slider"
            tabIndex={0}
            aria-label="Seek"
            aria-valuemin={0}
            aria-valuemax={Math.round(duration)}
            aria-valuenow={Math.round(current)}
            aria-valuetext={`${formatTime(current)} of ${formatTime(duration)}`}
            onPointerDown={(e) => {
              scrubbing.current = true;
              e.currentTarget.setPointerCapture(e.pointerId);
              seekToPointer(e.clientX);
            }}
            onPointerMove={(e) => scrubbing.current && seekToPointer(e.clientX)}
            onPointerUp={() => { scrubbing.current = false; revealControls(); }}
            onKeyDown={(e) => {
              if (e.key === 'ArrowRight' || e.key === 'ArrowLeft') e.stopPropagation();
              if (e.key === 'ArrowRight') seekBy(5);
              if (e.key === 'ArrowLeft') seekBy(-5);
            }}
            className="group/bar relative flex h-5 cursor-pointer touch-none items-center focus:outline-none"
          >
            <div className="relative h-1 w-full overflow-hidden rounded-full bg-white/20 transition-all group-hover/bar:h-1.5">
              <div className="absolute inset-y-0 left-0 bg-white/30" style={{ width: `${buffered * 100}%` }} />
              <div className="absolute inset-y-0 left-0 bg-teal-400" style={{ width: `${progress}%` }} />
            </div>
            <span
              className="absolute h-3.5 w-3.5 -translate-x-1/2 rounded-full bg-white shadow-md ring-2 ring-teal-400 opacity-0 transition-opacity group-hover/bar:opacity-100 group-focus-visible/bar:opacity-100"
              style={{ left: `${progress}%` }}
            />
          </div>

          <div className="mt-1.5 flex items-center gap-1 sm:gap-2 text-white">
            <ControlButton label={playing ? 'Pause (Space)' : 'Play (Space)'} onClick={togglePlay}>
              {playing ? <Pause className="h-5 w-5 fill-current" /> : <Play className="h-5 w-5 fill-current" />}
            </ControlButton>
            <ControlButton label="Stop" onClick={stop}>
              <Square className="h-4 w-4 fill-current" />
            </ControlButton>

            <div className="group/vol flex items-center">
              <ControlButton label={muted || volume === 0 ? 'Unmute (M)' : 'Mute (M)'} onClick={toggleMute}>
                {muted || volume === 0 ? <VolumeX className="h-5 w-5" /> : <Volume2 className="h-5 w-5" />}
              </ControlButton>
              <input
                type="range"
                min={0}
                max={1}
                step={0.05}
                value={muted ? 0 : volume}
                aria-label="Volume"
                onChange={(e) => {
                  const v = videoRef.current;
                  if (!v) return;
                  v.volume = Number(e.target.value);
                  v.muted = v.volume === 0;
                }}
                className="hidden sm:block w-0 opacity-0 transition-all duration-200 group-hover/vol:w-20 group-hover/vol:opacity-100 focus:w-20 focus:opacity-100 accent-teal-400 cursor-pointer"
              />
            </div>

            <span className="ml-1 text-xs sm:text-sm font-medium tabular-nums text-white/85">
              {formatTime(current)} <span className="text-white/45">/ {formatTime(duration)}</span>
            </span>

            <div className="ml-auto">
              <ControlButton label={fullscreen ? 'Exit full screen (F)' : 'Full screen (F)'} onClick={toggleFullscreen}>
                {fullscreen ? <Minimize className="h-5 w-5" /> : <Maximize className="h-5 w-5" />}
              </ControlButton>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function ControlButton({ label, onClick, children }: { label: string; onClick: () => void; children: React.ReactNode }) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      title={label}
      className="flex h-10 w-10 items-center justify-center rounded-lg text-white/90 transition-colors hover:bg-white/10 hover:text-white focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-400"
    >
      {children}
    </button>
  );
}
