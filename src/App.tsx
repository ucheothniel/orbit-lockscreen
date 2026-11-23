import { useState, useRef } from 'react';
import { LockscreenConfig, PRESETS } from './types/lockscreen';
import { WallpaperCanvas } from './components/WallpaperCanvas';
import { ControlPanel } from './components/ControlPanel';
import { toPng } from 'html-to-image';
import confetti from 'canvas-confetti';
import { Sparkles, Layers, ShieldCheck } from 'lucide-react';

export function App() {
  const initialPreset = PRESETS[0];

  const [config, setConfig] = useState<LockscreenConfig>({
    title: initialPreset.config.title || 'Google 2027 SWE Deadline',
    targetDeadline: initialPreset.config.targetDeadline || '2026-12-15T23:59',
    quote: initialPreset.config.quote || 'Preparation meets opportunity.',
    category: initialPreset.category,
    theme: initialPreset.config.theme || 'cyber',
    colorMode: 'dark',
    device: 'mobile',
    milestones: initialPreset.config.milestones || [],
    showClockMock: true,
    accentColor: initialPreset.config.accentColor || '#38bdf8',
  });

  const [isExporting, setIsExporting] = useState(false);
  const canvasRef = useRef<HTMLDivElement>(null);

  const handleExport = async () => {
    if (!canvasRef.current) return;
    try {
      setIsExporting(true);
      // Generate crisp wallpaper
      const dataUrl = await toPng(canvasRef.current, {
        cacheBust: true,
        pixelRatio: 3, // 3x Retina resolution for sharp lock screens
      });

      // Trigger download
      const link = document.createElement('a');
      link.download = `lockscreen-${config.category}-${config.colorMode}.png`;
      link.href = dataUrl;
      link.click();

      // Trigger celebratory confetti
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.8 },
      });
    } catch (err) {
      console.error('Failed to export wallpaper:', err);
      alert('Could not export wallpaper image. Please try again.');
    } finally {
      setIsExporting(false);
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 flex flex-col font-sans selection:bg-sky-500/30 selection:text-sky-200">
      {/* Top Navbar */}
      <header className="w-full border-b border-zinc-900 bg-zinc-950/70 backdrop-blur-md sticky top-0 z-50 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-indigo-600 flex items-center justify-center shadow-lg shadow-sky-500/20">
              <Sparkles className="w-4 h-4 text-white" />
            </div>
            <div>
              <span className="font-bold text-sm tracking-tight text-white block">
                Orbit // LockScreen Studio
              </span>
              <span className="text-[10px] text-zinc-400 font-mono">
                Google × Handshake AI Skills Mission
              </span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs font-mono text-zinc-400">
            <div className="hidden sm:flex items-center gap-1.5 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 text-[11px]">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Official Challenge Entry</span>
            </div>
            <a
              href="https://joinhandshake.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-white transition-colors"
            >
              Handshake
            </a>
          </div>
        </div>
      </header>

      {/* Main Studio Viewport */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8 items-center lg:items-start justify-center">
        {/* Left: Control Panel */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <ControlPanel
            config={config}
            onChange={setConfig}
            onExport={handleExport}
            isExporting={isExporting}
          />
        </div>

        {/* Right: Live Lockscreen Canvas Preview */}
        <div className="w-full lg:w-1/2 flex flex-col items-center justify-center sticky top-24">
          <div className="flex items-center gap-2 mb-3 text-xs text-zinc-400 font-mono">
            <Layers className="w-3.5 h-3.5 text-sky-400" />
            <span>Interactive {config.device === 'mobile' ? '9:16 Mobile' : '16:9 Desktop'} Preview</span>
          </div>

          <WallpaperCanvas config={config} canvasRef={canvasRef} />

          <p className="text-[11px] text-zinc-500 mt-4 text-center max-w-sm">
            💡 Tap <b>Export Wallpaper</b> to download in high-res 3x Retina PNG, ready to set as your lock screen background.
          </p>
        </div>
      </main>

      {/* Footer */}
      <footer className="w-full border-t border-zinc-900 py-6 px-6 text-center text-xs text-zinc-500 font-mono">
        <p>© 2026 Handshake AI Skills Studio × Google Challenge • Built with React & Vite</p>
      </footer>
    </div>
  );
}

export default App;
