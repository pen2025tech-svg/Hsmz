import React from 'react';
import { Radio, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigateSection: (sectionId: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigateSection }) => {
  return (
    <footer className="bg-slate-900 text-white border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-14">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Col 1: Brand & Overview (2 cols on lg) */}
          <div className="lg:col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-orange-500 flex items-center justify-center text-white shadow-md shadow-orange-500/20">
                <Radio className="w-5 h-5" />
              </div>
              <span className="font-extrabold text-xl text-white tracking-tight">
                Radio<span className="text-orange-500">RDX</span>
              </span>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed max-w-sm">
              Carrier-grade cloud audio streaming infrastructure for commercial radio stations, media networks, and online ministries. Transparent Naira (₦) billing with 99.99% transmission uptime SLA.
            </p>

            <div className="pt-1 flex flex-col sm:flex-row sm:items-center gap-3 text-xs text-slate-400">
              <div className="flex items-center gap-2 text-slate-300 font-mono">
                <Phone className="w-4 h-4 text-orange-400 shrink-0" />
                <span className="font-bold text-white tracking-wide">0903 392 2366</span>
              </div>
              <span className="hidden sm:inline text-slate-600">·</span>
              <div className="flex items-center gap-1.5 text-slate-400">
                <MapPin className="w-3.5 h-3.5 text-orange-400 shrink-0" />
                <span>Victoria Island, Lagos, Nigeria</span>
              </div>
            </div>

            <div className="pt-2 flex items-center gap-3 text-xs text-slate-400">
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-orange-400 border border-slate-700 font-mono text-[11px]">
                <span className="w-2 h-2 rounded-full bg-orange-500" />
                SHOUTcast & Icecast 2 KH
              </span>
              <span className="inline-flex items-center gap-1.5 bg-slate-800/80 px-2.5 py-1 rounded text-slate-300 border border-slate-700 font-mono text-[11px]">
                24/7 NVMe AutoDJ
              </span>
            </div>
          </div>

          {/* Col 2: Streaming Plans */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              Streaming Plans (₦)
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('plans')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Starter Pack (₦13,750/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('plans')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Standard HD (₦19,500/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('plans')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Premium Studio (₦25,000/mo)
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('plans')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Broadcaster Pro (₦45,000/mo)
                </button>
              </li>
            </ul>
          </div>

          {/* Col 3: Broadcaster Tools & Infrastructure */}
          <div className="space-y-3">
            <div className="text-xs uppercase tracking-wider font-semibold text-slate-300">
              Platform & Tools
            </div>
            <ul className="space-y-2 text-xs text-slate-400">
              <li>
                <button
                  onClick={() => onNavigateSection('calculator')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Bandwidth & Listener Estimator
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('features')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Platform Specifications
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('infrastructure')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Network SLA & Infrastructure
                </button>
              </li>
              <li>
                <button
                  onClick={() => onNavigateSection('plans')}
                  className="hover:text-orange-400 transition-colors text-left cursor-pointer"
                >
                  Naira Pricing Calculator
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar: Copyright & Security Badges */}
        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-col md:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} RadioRDX Cloud Technologies Ltd. All rights reserved. Registered in Nigeria (RC: 1984210).
          </div>
          <div className="flex items-center gap-4 text-[11px] font-mono text-slate-400">
            <span>Paystack Certified</span>
            <span>·</span>
            <span>PCI-DSS Compliant</span>
            <span>·</span>
            <span>CBN Regulated Gateway</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
