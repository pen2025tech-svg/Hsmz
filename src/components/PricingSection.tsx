import React, { useState } from 'react';
import { Check, ShieldCheck, ArrowRight, Zap, Radio } from 'lucide-react';
import { RADIO_PLANS, formatNaira } from '../utils/billing';
import { BillingCycle, RadioPlan } from '../types/radio';

interface PricingSectionProps {
  onSelectPlan: (plan: RadioPlan, cycle: BillingCycle) => void;
}

export const PricingSection: React.FC<PricingSectionProps> = ({ onSelectPlan }) => {
  const [billingCycle, setBillingCycle] = useState<BillingCycle>('monthly');

  return (
    <section id="plans" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-800 bg-orange-50 border border-orange-200/60 px-3 py-1 rounded-full mb-3">
            <Zap className="w-3.5 h-3.5 text-orange-600" />
            <span>Direct Nigerian Naira (₦) Pricing · Zero Exchange Volatility</span>
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Transparent Streaming Plans for Every Broadcaster.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            Pay easily with Paystack and local Nigerian debit cards. Instant server provisioning with 99.99% audio uptime.
          </p>

          {/* Billing Cycle Switcher (Interactive Segmented Control) */}
          <div className="mt-8 inline-flex items-center p-1 bg-slate-100 rounded-lg">
            <button
              onClick={() => setBillingCycle('monthly')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'monthly'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Monthly Billing
            </button>
            <button
              onClick={() => setBillingCycle('annual')}
              className={`px-5 py-2 text-xs font-semibold rounded-md transition-all cursor-pointer whitespace-nowrap ${
                billingCycle === 'annual'
                  ? 'bg-white text-slate-900 shadow-sm'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Annual Billing (12 Months)
            </button>
          </div>
        </div>

        {/* Pricing Cards Grid (4 columns on desktop) */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 items-stretch">
          {RADIO_PLANS.map((plan) => {
            const isStarter = plan.id === 'starter';
            const price = billingCycle === 'annual' ? plan.annualPriceNaira : plan.monthlyPriceNaira;

            return (
              <div
                key={plan.id}
                className={`relative rounded-xl flex flex-col justify-between transition-all ${
                  isStarter
                    ? 'border-2 border-orange-500 shadow-md bg-white ring-1 ring-orange-500/20'
                    : 'border border-slate-200 bg-white hover:border-slate-300 shadow-sm'
                } p-6`}
              >
                {/* Spotlight banner for Starter Pack */}
                {isStarter && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-orange-500 text-white text-[11px] font-bold uppercase tracking-wider px-3 py-0.5 rounded-full shadow-sm">
                    Starter Pack Spotlight
                  </div>
                )}

                <div>
                  {/* Plan Name & Tagline */}
                  <div className="mb-4">
                    <h3 className="text-xl font-bold text-slate-900 flex items-center justify-between">
                      <span>{plan.name}</span>
                      {isStarter && <span className="text-[10px] bg-orange-100 text-orange-700 px-2 py-0.5 rounded font-mono font-bold">₦13,750</span>}
                    </h3>
                    <p className="text-xs text-slate-500 mt-1 min-h-[32px] leading-relaxed">
                      {plan.tagline}
                    </p>
                  </div>

                  {/* Price display in Naira (₦) */}
                  <div className="py-4 border-y border-slate-100 mb-6">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-slate-900 font-mono tabular-nums tracking-tight">
                        {formatNaira(price)}
                      </span>
                      <span className="text-xs text-slate-500 font-medium">
                        /{billingCycle === 'annual' ? 'year' : 'month'}
                      </span>
                    </div>

                    <div className="text-[11px] text-slate-500 font-medium mt-1">
                      {billingCycle === 'annual'
                        ? `12 Months Full Billing (${formatNaira(plan.monthlyPriceNaira)}/mo)`
                        : 'Billed monthly · Cancel anytime'}
                    </div>

                    <div className="mt-2 text-xs text-slate-500">
                      Best for: <span className="font-medium text-slate-700">{plan.recommendedFor}</span>
                    </div>
                  </div>

                  {/* Key Specifications Strip */}
                  <div className="space-y-2 mb-6 text-xs text-slate-700">
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Audio Bitrate:</span>
                      <span className="font-semibold text-slate-900 font-mono">{plan.bitrateKbps} kbps</span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">Listeners:</span>
                      <span className="font-semibold text-slate-900 font-mono">
                        {typeof plan.maxListeners === 'number' ? `${plan.maxListeners.toLocaleString()} Max` : 'Unlimited'}
                      </span>
                    </div>
                    <div className="flex items-center justify-between py-1 border-b border-slate-50">
                      <span className="text-slate-500">AutoDJ Storage:</span>
                      <span className="font-semibold text-slate-900 font-mono">{plan.storageGb} GB NVMe</span>
                    </div>
                    <div className="flex items-center justify-between py-1">
                      <span className="text-slate-500">Bandwidth:</span>
                      <span className="font-semibold text-orange-600 font-mono">Unmetered Free</span>
                    </div>
                  </div>

                  {/* Features list */}
                  <div className="space-y-2.5 mb-8">
                    <div className="text-xs font-semibold text-slate-900 uppercase tracking-wider">
                      Included Capabilities:
                    </div>
                    {plan.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2 text-xs text-slate-600">
                        <Check className="w-3.5 h-3.5 text-orange-500 shrink-0 mt-0.5" />
                        <span className="leading-snug">{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Direct CTA Order Button */}
                <button
                  onClick={() => onSelectPlan(plan, billingCycle)}
                  className={`w-full py-3 px-4 rounded-lg text-xs font-semibold transition-all flex items-center justify-center gap-2 cursor-pointer ${
                    isStarter
                      ? 'bg-orange-500 hover:bg-orange-600 text-white shadow-md shadow-orange-500/25'
                      : 'bg-slate-900 hover:bg-slate-800 text-white'
                  }`}
                >
                  <span>Select {plan.name} Plan</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Trust & Guarantee Callout with Orange Accents */}
        <div className="mt-14 rounded-xl border border-slate-200 bg-orange-50/40 p-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-lg bg-orange-100 flex items-center justify-center text-orange-600 shrink-0">
              <ShieldCheck className="w-6 h-6" />
            </div>
            <div>
              <div className="text-sm font-bold text-slate-900">30-Day Money-Back Broadcaster Guarantee</div>
              <div className="text-xs text-slate-600 mt-0.5">
                If your audio stream buffers or does not perform to your broadcasting standards, we will refund 100% in Naira directly to your Nigerian bank account.
              </div>
            </div>
          </div>
          <div className="shrink-0 text-xs font-mono text-slate-500">
            Payment Methods: <span className="font-semibold text-slate-800">Paystack · Mastercard · Visa · Verve</span>
          </div>
        </div>
      </div>
    </section>
  );
};
