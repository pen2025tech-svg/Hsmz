import React, { useState, useMemo } from 'react';
import { Calculator, ArrowRight, CheckCircle2, Radio, Users } from 'lucide-react';
import { calculateBandwidthEstimate, formatNaira, RADIO_PLANS } from '../utils/billing';
import { RadioPlan } from '../types/radio';

interface BandwidthCalculatorProps {
  onSelectPlan: (plan: RadioPlan) => void;
}

export const BandwidthCalculator: React.FC<BandwidthCalculatorProps> = ({ onSelectPlan }) => {
  const [bitrate, setBitrate] = useState<number>(192);
  const [listeners, setListeners] = useState<number>(1200);
  const [hoursPerDay, setHoursPerDay] = useState<number>(18);

  const estimate = useMemo(() => {
    return calculateBandwidthEstimate(bitrate, listeners, hoursPerDay);
  }, [bitrate, listeners, hoursPerDay]);

  // Determine ideal plan
  const recommendedPlan = useMemo(() => {
    if (listeners <= 500 && bitrate <= 128) {
      return RADIO_PLANS[0]; // Starter ₦13,750
    }
    if (listeners <= 2500 && bitrate <= 192) {
      return RADIO_PLANS[1]; // Standard ₦19,500
    }
    if (listeners <= 5000) {
      return RADIO_PLANS[2]; // Premium ₦25,000
    }
    return RADIO_PLANS[3]; // Broadcaster Pro ₦45,000
  }, [listeners, bitrate]);

  return (
    <section id="calculator" className="py-20 bg-slate-50/70 border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full mb-2">
            <Calculator className="w-3.5 h-3.5 text-orange-600" />
            <span>Broadcaster Estimation Tool</span>
          </div>
          <h2 className="text-3xl font-extrabold text-slate-900 tracking-tight">
            Radio Bandwidth & Plan Recommender.
          </h2>
          <p className="mt-2 text-base text-slate-600">
            Slide your expected listener audience and broadcast schedule to see exact monthly data usage and find your ideal Naira plan.
          </p>
        </div>

        <div className="max-w-5xl mx-auto bg-white rounded-xl border border-slate-200 shadow-sm p-6 sm:p-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
            {/* Input Controls (7 cols) */}
            <div className="lg:col-span-7 space-y-7">
              {/* Bitrate Selector */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label className="text-xs font-bold text-slate-900 uppercase tracking-wider">
                    Audio Streaming Bitrate
                  </label>
                  <span className="text-xs font-mono font-semibold text-orange-600">{bitrate} kbps</span>
                </div>
                <div className="grid grid-cols-4 gap-2">
                  {[64, 128, 192, 320].map((rate) => (
                    <button
                      key={rate}
                      type="button"
                      onClick={() => setBitrate(rate)}
                      className={`py-2 px-3 text-xs font-semibold rounded-lg border text-center transition-colors cursor-pointer ${
                        bitrate === rate
                          ? 'border-orange-500 bg-orange-50 text-orange-900 font-bold ring-1 ring-orange-500/20'
                          : 'border-slate-200 bg-white text-slate-600 hover:border-slate-300'
                      }`}
                    >
                      {rate} kbps
                    </button>
                  ))}
                </div>
              </div>

              {/* Average Concurrent Listeners Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="listeners-range" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Users className="w-3.5 h-3.5 text-slate-400" />
                    <span>Average Concurrent Listeners</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded tabular-nums">
                    {listeners.toLocaleString()} listeners
                  </span>
                </div>
                <input
                  id="listeners-range"
                  type="range"
                  min="50"
                  max="10000"
                  step="50"
                  value={listeners}
                  onChange={(e) => setListeners(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>50 (Startup)</span>
                  <span>2,500 (Standard)</span>
                  <span>5,000 (Premium)</span>
                  <span>10,000+ (Network)</span>
                </div>
              </div>

              {/* Hours per Day Slider */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <label htmlFor="hours-range" className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
                    <Radio className="w-3.5 h-3.5 text-slate-400" />
                    <span>Daily Broadcast Hours</span>
                  </label>
                  <span className="text-xs font-mono font-bold text-slate-900 bg-slate-100 px-2 py-0.5 rounded tabular-nums">
                    {hoursPerDay} hours/day
                  </span>
                </div>
                <input
                  id="hours-range"
                  type="range"
                  min="1"
                  max="24"
                  step="1"
                  value={hoursPerDay}
                  onChange={(e) => setHoursPerDay(parseInt(e.target.value, 10))}
                  className="w-full accent-orange-500 cursor-pointer"
                />
                <div className="flex justify-between text-[11px] text-slate-400 font-mono mt-1">
                  <span>4 hrs (Shows)</span>
                  <span>12 hrs (Daytime)</span>
                  <span>24 hrs (Full AutoDJ)</span>
                </div>
              </div>
            </div>

            {/* Results & Recommendation Panel (5 cols) */}
            <div className="lg:col-span-5 bg-slate-900 text-white rounded-xl p-6 flex flex-col justify-between">
              <div>
                <div className="text-xs uppercase tracking-wider font-semibold text-orange-400">
                  Data Consumption Metrics
                </div>

                <div className="mt-4 space-y-3 pb-6 border-b border-slate-800">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Daily Data Stream:</span>
                    <span className="font-mono font-bold text-slate-200 tabular-nums">
                      {estimate.dailyGb} GB / day
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Monthly Transfer:</span>
                    <span className="font-mono font-bold text-orange-400 text-base tabular-nums">
                      {estimate.monthlyGb.toLocaleString()} GB / month
                    </span>
                  </div>
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">RadioRDX Bandwidth:</span>
                    <span className="font-semibold text-orange-400">100% Unmetered Free</span>
                  </div>
                </div>

                {/* Recommended Plan */}
                <div className="mt-6">
                  <div className="text-xs text-slate-400 uppercase tracking-wider font-semibold">
                    Recommended Plan For You:
                  </div>
                  <div className="mt-2 flex items-baseline justify-between">
                    <div className="text-xl font-bold text-white">{recommendedPlan.name} Plan</div>
                    <div className="text-2xl font-black text-orange-400 font-mono tabular-nums">
                      {formatNaira(recommendedPlan.monthlyPriceNaira)}
                      <span className="text-xs text-slate-400 font-normal">/mo</span>
                    </div>
                  </div>
                  <div className="mt-2 text-xs text-slate-300 leading-relaxed">
                    {recommendedPlan.tagline}
                  </div>

                  <div className="mt-3 space-y-1.5 text-xs text-slate-400">
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>{recommendedPlan.storageGb} GB AutoDJ NVMe SSD</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <CheckCircle2 className="w-3.5 h-3.5 text-orange-400" />
                      <span>{recommendedPlan.bitrateKbps} kbps Studio Transmission</span>
                    </div>
                  </div>
                </div>
              </div>

              <button
                onClick={() => onSelectPlan(recommendedPlan)}
                className="mt-6 w-full py-3 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20"
              >
                <span>Select {recommendedPlan.name} Plan (₦)</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
