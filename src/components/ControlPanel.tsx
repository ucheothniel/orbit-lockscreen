import React from 'react';
import { LockscreenConfig, PRESETS, ThemeStyle } from '../types/lockscreen';
import {
  Download,
  Moon,
  Sun,
  Smartphone,
  Monitor,
  Plus,
  Trash2,
  Eye,
  EyeOff,
  Sparkles,
} from 'lucide-react';

interface ControlPanelProps {
  config: LockscreenConfig;
  onChange: (updater: (prev: LockscreenConfig) => LockscreenConfig) => void;
  onExport: () => void;
  isExporting: boolean;
}

export const ControlPanel: React.FC<ControlPanelProps> = ({
  config,
  onChange,
  onExport,
  isExporting,
}) => {
  const handlePresetSelect = (presetId: string) => {
    const selected = PRESETS.find((p) => p.id === presetId);
    if (!selected) return;
    onChange((prev) => ({
      ...prev,
      ...selected.config,
      category: selected.category,
    }));
  };

  const handleAddMilestone = () => {
    onChange((prev) => ({
      ...prev,
      milestones: [
        ...prev.milestones,
        {
          id: String(Date.now()),
          label: 'New Sprint Milestone',
          targetDate: new Date().toISOString().split('T')[0],
          completed: false,
        },
      ],
    }));
  };

  const handleRemoveMilestone = (id: string) => {
    onChange((prev) => ({
      ...prev,
      milestones: prev.milestones.filter((m) => m.id !== id),
    }));
  };

  const handleUpdateMilestone = (id: string, label: string, targetDate: string) => {
    onChange((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, label, targetDate } : m
      ),
    }));
  };

  const handleToggleMilestone = (id: string) => {
    onChange((prev) => ({
      ...prev,
      milestones: prev.milestones.map((m) =>
        m.id === id ? { ...m, completed: !m.completed } : m
      ),
    }));
  };

  return (
    <div className="flex flex-col gap-6 p-6 bg-zinc-900/90 text-zinc-100 border border-zinc-800 rounded-3xl shadow-xl backdrop-blur-xl max-w-xl w-full">
      {/* Header & Quick Action */}
      <div className="flex items-center justify-between border-b border-zinc-800 pb-4">
        <div>
          <h2 className="text-lg font-bold tracking-tight flex items-center gap-2">
            <span>LockScreen Studio</span>
            <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-sky-500/10 text-sky-400 border border-sky-500/20">
              Google × Handshake
            </span>
          </h2>
          <p className="text-xs text-zinc-400 mt-0.5">
            Real-time lock screen wallpaper creator with reverse countdown milestones.
          </p>
        </div>

        {/* Export Button */}
        <button
          onClick={onExport}
          disabled={isExporting}
          className="flex items-center gap-2 px-4 py-2.5 bg-gradient-to-r from-sky-500 to-indigo-600 hover:from-sky-400 hover:to-indigo-500 text-white font-medium text-xs rounded-xl shadow-lg shadow-sky-500/20 active:scale-95 transition-all disabled:opacity-50"
        >
          <Download className="w-4 h-4" />
          <span>{isExporting ? 'Exporting...' : 'Export Wallpaper'}</span>
        </button>
      </div>

      {/* Preset Selector */}
      <div className="flex flex-col gap-2">
        <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider flex items-center gap-1.5">
          <Sparkles className="w-3.5 h-3.5 text-amber-400" />
          <span>Select Challenge Preset</span>
        </label>
        <div className="grid grid-cols-2 gap-2">
          {PRESETS.map((preset) => (
            <button
              key={preset.id}
              onClick={() => handlePresetSelect(preset.id)}
              className="text-left p-2.5 rounded-xl border border-zinc-800 hover:border-zinc-600 bg-zinc-950/60 transition-all hover:bg-zinc-800/40 text-xs flex flex-col gap-1"
            >
              <span className="font-semibold text-white truncate">{preset.name}</span>
              <span className="text-[10px] text-zinc-400 line-clamp-1">{preset.description}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Device & Mode Toggles */}
      <div className="grid grid-cols-3 gap-3">
        {/* Color Mode */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-zinc-400">Color Mode</span>
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => onChange((prev) => ({ ...prev, colorMode: 'dark' }))}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg transition-all ${
                config.colorMode === 'dark' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              <Moon className="w-3.5 h-3.5" />
              <span>Dark</span>
            </button>
            <button
              onClick={() => onChange((prev) => ({ ...prev, colorMode: 'light' }))}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg transition-all ${
                config.colorMode === 'light' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              <Sun className="w-3.5 h-3.5" />
              <span>Light</span>
            </button>
          </div>
        </div>

        {/* Aspect Ratio */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-zinc-400">Device Target</span>
          <div className="flex bg-zinc-950 p-1 rounded-xl border border-zinc-800">
            <button
              onClick={() => onChange((prev) => ({ ...prev, device: 'mobile' }))}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg transition-all ${
                config.device === 'mobile' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              <Smartphone className="w-3.5 h-3.5" />
              <span>Phone</span>
            </button>
            <button
              onClick={() => onChange((prev) => ({ ...prev, device: 'desktop' }))}
              className={`flex-1 flex items-center justify-center gap-1.5 py-1.5 text-xs rounded-lg transition-all ${
                config.device === 'desktop' ? 'bg-zinc-800 text-white font-semibold' : 'text-zinc-400'
              }`}
            >
              <Monitor className="w-3.5 h-3.5" />
              <span>Desk</span>
            </button>
          </div>
        </div>

        {/* Clock Overlay Toggle */}
        <div className="flex flex-col gap-1.5">
          <span className="text-[11px] font-semibold text-zinc-400">System Clock</span>
          <button
            onClick={() => onChange((prev) => ({ ...prev, showClockMock: !prev.showClockMock }))}
            className={`flex items-center justify-center gap-1.5 py-2 px-3 text-xs rounded-xl border transition-all ${
              config.showClockMock
                ? 'bg-zinc-800 text-white border-zinc-700'
                : 'bg-zinc-950 text-zinc-400 border-zinc-800'
            }`}
          >
            {config.showClockMock ? <Eye className="w-3.5 h-3.5" /> : <EyeOff className="w-3.5 h-3.5" />}
            <span>{config.showClockMock ? 'Previewing' : 'Hidden'}</span>
          </button>
        </div>
      </div>

      {/* Theme Style Selector */}
      <div className="flex flex-col gap-1.5">
        <span className="text-[11px] font-semibold text-zinc-400">Aesthetic Preset</span>
        <div className="grid grid-cols-4 gap-2">
          {(['cyber', 'minimal', 'gradient', 'brutalist'] as ThemeStyle[]).map((theme) => (
            <button
              key={theme}
              onClick={() => onChange((prev) => ({ ...prev, theme }))}
              className={`py-2 px-3 text-xs capitalize rounded-xl border text-center transition-all ${
                config.theme === theme
                  ? 'bg-sky-500/20 text-sky-300 border-sky-500/50 font-semibold'
                  : 'bg-zinc-950 text-zinc-400 border-zinc-800 hover:border-zinc-700'
              }`}
            >
              {theme}
            </button>
          ))}
        </div>
      </div>

      {/* Goal Title & Target Date */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-400">Goal Title</label>
          <input
            type="text"
            value={config.title}
            onChange={(e) => onChange((prev) => ({ ...prev, title: e.target.value }))}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
            placeholder="e.g. Google Summer 2027 SWE"
          />
        </div>
        <div className="flex flex-col gap-1.5">
          <label className="text-[11px] font-semibold text-zinc-400">Target Date & Time</label>
          <input
            type="datetime-local"
            value={config.targetDeadline}
            onChange={(e) => onChange((prev) => ({ ...prev, targetDeadline: e.target.value }))}
            className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
          />
        </div>
      </div>

      {/* Motivational Quote */}
      <div className="flex flex-col gap-1.5">
        <label className="text-[11px] font-semibold text-zinc-400">Focus Mantra / Motto</label>
        <input
          type="text"
          value={config.quote}
          onChange={(e) => onChange((prev) => ({ ...prev, quote: e.target.value }))}
          className="px-3 py-2 bg-zinc-950 border border-zinc-800 rounded-xl text-xs text-white focus:outline-none focus:border-sky-500"
          placeholder="e.g. Focus on what you can control."
        />
      </div>

      {/* Reverse Milestones Editor */}
      <div className="flex flex-col gap-2 border-t border-zinc-800 pt-4">
        <div className="flex items-center justify-between">
          <label className="text-xs font-semibold text-zinc-300 uppercase tracking-wider">
            Reverse Milestones ({config.milestones.length})
          </label>
          <button
            onClick={handleAddMilestone}
            className="flex items-center gap-1 text-[11px] text-sky-400 hover:text-sky-300 font-medium"
          >
            <Plus className="w-3.5 h-3.5" />
            <span>Add Milestone</span>
          </button>
        </div>

        <div className="flex flex-col gap-2 max-h-48 overflow-y-auto pr-1">
          {config.milestones.map((m) => (
            <div key={m.id} className="flex items-center gap-2 bg-zinc-950 p-2 rounded-xl border border-zinc-800">
              <input
                type="checkbox"
                checked={m.completed}
                onChange={() => handleToggleMilestone(m.id)}
                className="w-4 h-4 rounded text-sky-500 bg-zinc-900 border-zinc-700"
              />
              <input
                type="text"
                value={m.label}
                onChange={(e) => handleUpdateMilestone(m.id, e.target.value, m.targetDate)}
                className="flex-1 bg-transparent text-xs text-white focus:outline-none"
                placeholder="Milestone task"
              />
              <input
                type="date"
                value={m.targetDate}
                onChange={(e) => handleUpdateMilestone(m.id, m.label, e.target.value)}
                className="bg-transparent text-[10px] text-zinc-400 focus:outline-none"
              />
              <button
                onClick={() => handleRemoveMilestone(m.id)}
                className="text-zinc-500 hover:text-rose-400 p-1"
              >
                <Trash2 className="w-3.5 h-3.5" />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
