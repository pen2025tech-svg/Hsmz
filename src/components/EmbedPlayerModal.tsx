import React, { useState } from 'react';
import { X, Copy, Check, Radio, Play, Volume2 } from 'lucide-react';

interface EmbedPlayerModalProps {
  stationName: string;
  onClose: () => void;
}

export const EmbedPlayerModal: React.FC<EmbedPlayerModalProps> = ({ stationName, onClose }) => {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [autoPlay, setAutoPlay] = useState(false);
  const [copied, setCopied] = useState(false);

  const embedCode = `<iframe 
  src="https://player.radiordx.com/embed/v1?station=${encodeURIComponent(
    stationName.toLowerCase().replace(/\s+/g, '-')
  )}&theme=${theme}&autoplay=${autoPlay ? '1' : '0'}"
  width="100%" 
  height="140" 
  frameborder="0" 
  allow="autoplay"
  style="border-radius: 12px; border: 1px solid rgba(0,0,0,0.08); overflow: hidden;">
</iframe>`;

  const handleCopy = () => {
    navigator.clipboard.writeText(embedCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl max-w-xl w-full p-6 border border-slate-200 shadow-2xl relative">
        <button
          onClick={onClose}
          aria-label="Close embed generator"
          className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg transition-colors cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-2 mb-1">
          <div className="w-7 h-7 rounded-lg bg-orange-600 flex items-center justify-center text-white">
            <Radio className="w-3.5 h-3.5" />
          </div>
          <h3 className="text-lg font-bold text-slate-900">HTML5 Web Radio Player Embed</h3>
        </div>
        <p className="text-xs text-slate-500 mb-6">
          Paste this lightweight responsive widget into your WordPress, Wix, church website, or custom mobile web app.
        </p>

        {/* Customization controls */}
        <div className="grid grid-cols-2 gap-4 mb-5 p-3.5 bg-slate-50 rounded-xl border border-slate-100 text-xs">
          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Player Skin Theme</label>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => setTheme('light')}
                className={`flex-1 py-1.5 px-3 rounded-lg border font-medium cursor-pointer ${
                  theme === 'light'
                    ? 'border-orange-600 bg-white text-orange-900 font-bold shadow-xs'
                    : 'border-slate-200 bg-slate-100 text-slate-600'
                }`}
              >
                Clean White
              </button>
              <button
                type="button"
                onClick={() => setTheme('dark')}
                className={`flex-1 py-1.5 px-3 rounded-lg border font-medium cursor-pointer ${
                  theme === 'dark'
                    ? 'border-orange-600 bg-slate-900 text-white font-bold'
                    : 'border-slate-200 bg-slate-100 text-slate-600'
                }`}
              >
                Dark Slate
              </button>
            </div>
          </div>

          <div>
            <label className="font-bold text-slate-700 block mb-1.5">Playback Behavior</label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer text-slate-700">
              <input
                type="checkbox"
                checked={autoPlay}
                onChange={(e) => setAutoPlay(e.target.checked)}
                className="rounded accent-orange-600 cursor-pointer"
              />
              <span>Autoplay on page load</span>
            </label>
          </div>
        </div>

        {/* Live Widget Preview */}
        <div className="mb-5">
          <div className="text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
            Live Preview:
          </div>
          <div
            className={`rounded-xl p-4 border transition-colors ${
              theme === 'dark'
                ? 'bg-slate-900 border-slate-800 text-white'
                : 'bg-white border-slate-200 text-slate-900 shadow-sm'
            }`}
          >
            <div className="flex items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-orange-600 text-white flex items-center justify-center shrink-0">
                  <Play className="w-4 h-4 fill-white ml-0.5" />
                </div>
                <div>
                  <div className="font-bold text-sm truncate">{stationName}</div>
                  <div className="text-xs text-slate-400">Live 24/7 Broadcast · 192 kbps HD</div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-slate-400">
                <Volume2 className="w-4 h-4" />
                <div className="w-16 h-1.5 rounded-full bg-slate-200 overflow-hidden">
                  <div className="w-3/4 h-full bg-orange-500"></div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Copy Embed Code snippet */}
        <div className="mb-6">
          <div className="flex items-center justify-between mb-1.5">
            <span className="text-xs font-semibold text-slate-700">Embed Code (HTML):</span>
            <button
              onClick={handleCopy}
              className="inline-flex items-center gap-1 text-xs font-bold text-orange-700 hover:text-orange-800 cursor-pointer"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5" />
                  <span>Copied to Clipboard!</span>
                </>
              ) : (
                <>
                  <Copy className="w-3.5 h-3.5" />
                  <span>Copy Code</span>
                </>
              )}
            </button>
          </div>
          <pre className="p-3 bg-slate-900 text-orange-400 rounded-lg text-xs font-mono overflow-x-auto whitespace-pre-wrap">
            {embedCode}
          </pre>
        </div>

        <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-5 py-2.5 text-xs font-semibold text-white bg-slate-900 hover:bg-slate-800 rounded-lg transition-colors cursor-pointer"
          >
            Close Generator
          </button>
        </div>
      </div>
    </div>
  );
};
