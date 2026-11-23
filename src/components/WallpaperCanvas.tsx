import React from 'react';
import { LockscreenConfig } from '../types/lockscreen';
import { calculateTimeRemaining, formatFriendlyDate } from '../lib/countdown';
import { CheckCircle2, Circle, Clock } from 'lucide-react';

interface WallpaperCanvasProps {
  config: LockscreenConfig;
  canvasRef: React.RefObject<HTMLDivElement>;
}

export const WallpaperCanvas: React.FC<WallpaperCanvasProps> = ({ config, canvasRef }) => {
  const [timeLeft, setTimeLeft] = React.useState(() => calculateTimeRemaining(config.targetDeadline));

  React.useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(calculateTimeRemaining(config.targetDeadline));
    }, 1000);
    return () => clearInterval(timer);
  }, [config.targetDeadline]);

  const isDark = config.colorMode === 'dark';
  const isMobile = config.device === 'mobile';

  // Theme styling formulas
  const getThemeStyles = () => {
    if (config.theme === 'cyber') {
      return {
        bg: isDark
          ? 'bg-zinc-950 text-zinc-100'
          : 'bg-zinc-100 text-zinc-900',
        cardBg: isDark ? 'bg-zinc-900/70 border-zinc-800/80' : 'bg-white/80 border-zinc-200/90',
        badge: 'font-mono text-[10px] tracking-widest uppercase px-2 py-0.5 rounded border border-current',
        accentText: isDark ? 'text-sky-400' : 'text-sky-600',
        borderAccent: 'border-sky-500/40',
      };
    }
    if (config.theme === 'gradient') {
      return {
        bg: isDark
          ? 'bg-gradient-to-b from-purple-950 via-zinc-950 to-black text-white'
          : 'bg-gradient-to-b from-purple-100 via-rose-50 to-white text-zinc-900',
        cardBg: isDark ? 'bg-white/5 backdrop-blur-xl border-white/10' : 'bg-black/5 backdrop-blur-xl border-black/10',
        badge: 'font-sans font-semibold text-[10px] tracking-wider uppercase px-2.5 py-0.5 rounded-full bg-purple-500/10 text-purple-400 border border-purple-500/20',
        accentText: isDark ? 'text-purple-400' : 'text-purple-600',
        borderAccent: 'border-purple-500/40',
      };
    }
    if (config.theme === 'brutalist') {
      return {
        bg: isDark ? 'bg-black text-white' : 'bg-white text-black',
        cardBg: isDark ? 'bg-zinc-950 border-2 border-white' : 'bg-white border-2 border-black',
        badge: 'font-mono font-bold text-[10px] tracking-tight uppercase px-2 py-0.5 bg-black text-white dark:bg-white dark:text-black',
        accentText: isDark ? 'text-rose-400' : 'text-rose-600',
        borderAccent: 'border-current',
      };
    }
    // Default: Minimal
    return {
      bg: isDark ? 'bg-zinc-950 text-zinc-200' : 'bg-zinc-50 text-zinc-800',
      cardBg: isDark ? 'bg-zinc-900/60 border-zinc-800/60' : 'bg-white/80 border-zinc-200/70',
      badge: 'text-[10px] uppercase tracking-widest px-2 py-0.5 rounded-md bg-emerald-500/10 text-emerald-400 border border-emerald-500/20',
      accentText: isDark ? 'text-emerald-400' : 'text-emerald-600',
      borderAccent: 'border-emerald-500/30',
    };
  };

  const theme = getThemeStyles();

  return (
    <div
      ref={canvasRef}
      className={`relative select-none overflow-hidden transition-colors flex flex-col justify-between ${theme.bg} ${
        isMobile
          ? 'w-[360px] h-[780px] sm:w-[390px] sm:h-[844px] rounded-[48px] p-6 shadow-2xl'
          : 'w-[720px] h-[450px] sm:w-[840px] sm:h-[525px] rounded-[24px] p-8 shadow-2xl'
      }`}
      style={{
        boxShadow: isDark
          ? '0 25px 60px -15px rgba(0, 0, 0, 0.9), 0 0 0 1px rgba(255, 255, 255, 0.1)'
          : '0 25px 60px -15px rgba(0, 0, 0, 0.15), 0 0 0 1px rgba(0, 0, 0, 0.08)',
      }}
    >
      {/* Background Ambience / Subtle Grid */}
      <div
        className="absolute inset-0 opacity-[0.03] pointer-events-none"
        style={{
          backgroundImage:
            'radial-gradient(circle at 1px 1px, currentColor 1px, transparent 0)',
          backgroundSize: '24px 24px',
        }}
      />

      {/* TOP HEADER: Simulated Phone Lockscreen System UI (Negative Space Guard) */}
      <div className="relative z-10 w-full pt-1">
        {config.showClockMock && isMobile && (
          <div className="flex flex-col items-center justify-center opacity-85 pointer-events-none mb-6">
            <div className="flex items-center gap-1.5 text-xs font-medium tracking-wide">
              <span>Monday, Nov 23</span>
            </div>
            <div className="text-7xl font-extralight tracking-tight font-sans mt-0.5">
              09:41
            </div>
          </div>
        )}

        {/* Brand / Scope Pill */}
        <div className="flex items-center justify-between">
          <span className={theme.badge}>{config.category.toUpperCase()} // HORIZON</span>
          <div className="flex items-center gap-1.5 text-[11px] font-mono opacity-60">
            <span>AI Skills Studio</span>
          </div>
        </div>

        {/* Goal Title */}
        <div className="mt-4">
          <h1 className="text-xl sm:text-2xl font-bold tracking-tight leading-tight">
            {config.title || 'Target Deadline'}
          </h1>
          {config.quote && (
            <p className="text-xs opacity-70 mt-1 italic font-serif">
              "{config.quote}"
            </p>
          )}
        </div>
      </div>

      {/* CENTER: Countdown Digit Badges */}
      <div className="relative z-10 my-4">
        <div
          className={`grid grid-cols-4 gap-2.5 p-3.5 rounded-2xl border backdrop-blur-md ${theme.cardBg}`}
        >
          <div className="flex flex-col items-center justify-center">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tighter">
              {String(timeLeft.days).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 mt-0.5">
              Days
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-current/10">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tighter">
              {String(timeLeft.hours).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 mt-0.5">
              Hours
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-current/10">
            <span className="text-2xl sm:text-3xl font-black font-mono tracking-tighter">
              {String(timeLeft.minutes).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 mt-0.5">
              Mins
            </span>
          </div>
          <div className="flex flex-col items-center justify-center border-l border-current/10">
            <span className={`text-2xl sm:text-3xl font-black font-mono tracking-tighter ${theme.accentText}`}>
              {String(timeLeft.seconds).padStart(2, '0')}
            </span>
            <span className="text-[10px] uppercase font-mono tracking-wider opacity-60 mt-0.5">
              Secs
            </span>
          </div>
        </div>
      </div>

      {/* BOTTOM SECTION: Reverse Milestone Roadmap */}
      <div className="relative z-10 pb-2">
        <div className="flex items-center justify-between mb-2 px-1">
          <div className="flex items-center gap-1.5 text-xs font-semibold tracking-wider uppercase opacity-80">
            <Clock className="w-3.5 h-3.5" />
            <span>Milestones to Target</span>
          </div>
          <span className="text-[11px] font-mono opacity-60">
            {config.milestones.filter((m) => m.completed).length} / {config.milestones.length} Done
          </span>
        </div>

        <div className="flex flex-col gap-2">
          {config.milestones.map((milestone) => (
            <div
              key={milestone.id}
              className={`flex items-center justify-between p-2.5 rounded-xl border backdrop-blur-md transition-all ${theme.cardBg} ${
                milestone.completed ? 'opacity-50' : 'opacity-100'
              }`}
            >
              <div className="flex items-center gap-2.5 overflow-hidden pr-2">
                {milestone.completed ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                ) : (
                  <Circle className="w-4 h-4 opacity-40 shrink-0" />
                )}
                <span
                  className={`text-xs font-medium truncate ${
                    milestone.completed ? 'line-through opacity-70' : ''
                  }`}
                >
                  {milestone.label}
                </span>
              </div>
              <span className="text-[10px] font-mono opacity-65 shrink-0">
                {formatFriendlyDate(milestone.targetDate)}
              </span>
            </div>
          ))}
        </div>

        {/* Footer Attribution / Safe Area */}
        <div className="flex items-center justify-between mt-4 pt-2 border-t border-current/10 text-[9px] font-mono opacity-40">
          <span>ORBIT // GOOGLE × HANDSHAKE</span>
          <span>LOCK SCREEN VERIFIED</span>
        </div>
      </div>
    </div>
  );
};
