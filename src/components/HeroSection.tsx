import React from 'react';
import { ArrowRight, Calculator, CheckCircle2, Headphones, Radio } from 'lucide-react';
import heroStudioImage from '../assets/images/radio_broadcast_studio_1794117825748.jpg';

interface HeroSectionProps {
  onScrollToPlans: () => void;
  onScrollToCalculator: () => void;
}

export const HeroSection: React.FC<HeroSectionProps> = ({
  onScrollToPlans,
  onScrollToCalculator
}) => {
  return (
    <section className="relative pt-10 pb-16 md:pt-16 md:pb-24 border-b border-slate-200 bg-white overflow-hidden">
      {/* Subtle warm orange top glow */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-orange-400/10 rounded-full blur-3xl pointer-events-none -translate-y-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          {/* Main Hero Copy (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200/80 rounded-full px-3 py-1 shadow-2xs">
              <span className="w-2 h-2 rounded-full bg-orange-500 animate-pulse" />
              <span>Enterprise Cloud Audio Infrastructure · Direct Naira (₦) Billing</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 leading-[1.12] text-balance">
              Professional Radio Hosting Built for Real Broadcasters.
            </h1>

            <p className="text-lg text-slate-600 leading-relaxed max-w-2xl">
              Deploy your commercial online radio station in under 60 seconds. Powered by enterprise <strong className="text-slate-900 font-semibold">Icecast 2 & SHOUTcast DNAS</strong>, 24/7 NVMe AutoDJ automation, zero-buffering CDN nodes in Lagos & London, and transparent Naira billing.
            </p>

            {/* Primary Action Buttons */}
            <div className="flex flex-wrap items-center gap-4 pt-2">
              <button
                onClick={onScrollToPlans}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg shadow-md shadow-orange-500/25 transition-all hover:translate-y-[-1px] cursor-pointer"
              >
                <span>View Streaming Plans (from ₦13,750)</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                onClick={onScrollToCalculator}
                className="inline-flex items-center justify-center gap-2 px-5 py-3.5 text-sm font-semibold text-slate-700 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors cursor-pointer"
              >
                <Calculator className="w-4 h-4 text-orange-500" />
                <span>Bandwidth Estimator</span>
              </button>
            </div>

            {/* Value Proof Badges */}
            <div className="pt-4 flex flex-wrap items-center gap-6 text-xs text-slate-600">
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                99.99% Transmission SLA
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                Native HTTPS / SSL Stream Links
              </span>
              <span className="flex items-center gap-1.5 font-medium">
                <CheckCircle2 className="w-4 h-4 text-orange-500" />
                Paystack Card Settlement
              </span>
            </div>
          </div>

          {/* Right Column: Real Radio Studio Visual & Live Broadcast Card (5 cols) */}
          <div className="lg:col-span-5">
            <div className="relative rounded-2xl border border-slate-200 bg-slate-900 shadow-xl overflow-hidden group">
              {/* Real Radio Broadcast Studio Image */}
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={heroStudioImage}
                  alt="RadioRDX Professional Broadcast Studio"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/40 to-transparent" />

                {/* Live On-Air Badge */}
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-slate-900/90 backdrop-blur-md border border-orange-500/40 px-3 py-1 rounded-full shadow-lg">
                  <span className="w-2.5 h-2.5 rounded-full bg-orange-500 animate-ping" />
                  <span className="text-xs font-bold text-white tracking-wide uppercase font-mono">ON AIR · LIVE MASTER</span>
                </div>

                {/* Studio Pro Tag */}
                <div className="absolute top-4 right-4 flex items-center gap-1 bg-orange-500 text-white text-[11px] font-bold px-2.5 py-0.5 rounded-md shadow-md uppercase tracking-wider font-mono">
                  <span>Studio Pro</span>
                </div>

                {/* Floating Studio Metric Badge */}
                <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white text-xs bg-slate-900/80 backdrop-blur-md p-3 rounded-xl border border-white/10">
                  <div className="flex items-center gap-2">
                    <Headphones className="w-4 h-4 text-orange-400" />
                    <div>
                      <div className="font-semibold text-slate-100">Broadcast Bitrate</div>
                      <div className="text-[11px] text-orange-400 font-mono">Up to 320 kbps Studio Lossless</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-slate-100">Audio Latency</div>
                    <div className="text-[11px] text-amber-400 font-mono">&lt; 1.2s Edge CDN</div>
                  </div>
                </div>
              </div>

              {/* Quick Spec Card beneath photo */}
              <div className="p-5 bg-slate-900 text-white space-y-4">
                <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                  <div>
                    <div className="text-[11px] uppercase tracking-wider font-semibold text-orange-400">Featured Tier</div>
                    <div className="text-lg font-bold text-white">Starter Pack Broadcaster</div>
                  </div>
                  <div className="text-right">
                    <div className="text-xl font-black text-orange-400 font-mono tabular-nums">₦13,750</div>
                    <div className="text-[11px] text-slate-400">/mo (₦165,000/year)</div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-3 text-xs text-slate-300">
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>20 GB NVMe AutoDJ</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>500 Listeners Max</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Unmetered Bandwidth</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="w-1.5 h-1.5 rounded-full bg-orange-500" />
                    <span>Free HTML5 Player</span>
                  </div>
                </div>

                <button
                  onClick={onScrollToPlans}
                  className="w-full py-2.5 px-4 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-xs rounded-lg transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md shadow-orange-500/20"
                >
                  <span>Deploy Starter Station in Naira (₦13,750)</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4-Column Key Metrics Bar with Orange Accents */}
        <div className="mt-14 pt-8 border-t border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-6">
          <div>
            <div className="text-xs text-slate-500 font-medium">Network Reliability</div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-0.5">99.99%</div>
            <div className="text-xs text-slate-500 mt-1">Lagos & London low-latency audio nodes</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Starter Pack Entry</div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-0.5">
              ₦13,750<span className="text-xs text-slate-400 font-normal">/mo</span>
            </div>
            <div className="text-xs text-slate-500 mt-1">₦165,000 annual · 20 GB AutoDJ</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Direct Settlement</div>
            <div className="text-2xl font-bold text-orange-600 font-mono tabular-nums mt-0.5">NGN (₦)</div>
            <div className="text-xs text-slate-500 mt-1">Paystack · Mastercard, Visa & Verve</div>
          </div>
          <div>
            <div className="text-xs text-slate-500 font-medium">Broadcasting Uptime</div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums mt-0.5">24/7/365</div>
            <div className="text-xs text-slate-500 mt-1">Instant AutoDJ failover with no silence</div>
          </div>
        </div>
      </div>
    </section>
  );
};
