/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { Navbar } from './components/Navbar';
import { HeroSection } from './components/HeroSection';
import { PricingSection } from './components/PricingSection';
import { BandwidthCalculator } from './components/BandwidthCalculator';
import { FeaturesSection } from './components/FeaturesSection';
import { Footer } from './components/Footer';
import { BillingDashboard } from './components/BillingDashboard';
import { CheckoutModal } from './components/CheckoutModal';
import { EmbedPlayerModal } from './components/EmbedPlayerModal';
import { RadioPlan, BillingCycle } from './types/radio';
import { RADIO_PLANS } from './utils/billing';

export default function App() {
  const [currentView, setCurrentView] = useState<'landing' | 'dashboard'>('landing');
  const [selectedPlanForCheckout, setSelectedPlanForCheckout] = useState<RadioPlan | null>(null);
  const [selectedBillingCycle, setSelectedBillingCycle] = useState<BillingCycle>('monthly');
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [embedModalStation, setEmbedModalStation] = useState<string | null>(null);
  const [newlyCreatedOrder, setNewlyCreatedOrder] = useState<{
    stationName: string;
    genre: string;
    plan: RadioPlan;
    cycle: BillingCycle;
    amountNaira: number;
    paymentMethod: 'Paystack (Cards / Bank / USSD)' | 'Direct Bank Transfer (NGN)' | 'Flutterwave';
    reference?: string;
  } | null>(null);

  const handleNavigateSection = (sectionId: string) => {
    setCurrentView('landing');
    setTimeout(() => {
      const element = document.getElementById(sectionId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  const handleSelectPlan = (plan: RadioPlan, cycle: BillingCycle = 'monthly') => {
    setSelectedPlanForCheckout(plan);
    setSelectedBillingCycle(cycle);
    setShowCheckoutModal(true);
  };

  const handleCheckoutSuccess = (orderData: {
    stationName: string;
    genre: string;
    plan: RadioPlan;
    cycle: BillingCycle;
    amountNaira: number;
    paymentMethod: 'Paystack (Cards / Bank / USSD)' | 'Direct Bank Transfer (NGN)' | 'Flutterwave';
    reference?: string;
  }) => {
    setNewlyCreatedOrder(orderData);
    setShowCheckoutModal(false);
    // Switch to station dashboard to manage the newly provisioned station
    setCurrentView('dashboard');
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 selection:bg-orange-500 selection:text-white flex flex-col justify-between">
      <div>
        {/* Top Navigation */}
        <Navbar
          currentView={currentView}
          setCurrentView={setCurrentView}
          onNavigateSection={handleNavigateSection}
        />

        {/* View Switcher: Commercial Landing Page vs. Station Console */}
        {currentView === 'landing' ? (
          <main>
            <HeroSection
              onScrollToPlans={() => handleNavigateSection('plans')}
              onScrollToCalculator={() => handleNavigateSection('calculator')}
            />

            <PricingSection
              onSelectPlan={(plan, cycle) => handleSelectPlan(plan, cycle)}
            />

            <BandwidthCalculator
              onSelectPlan={(plan) => handleSelectPlan(plan, 'monthly')}
            />

            <FeaturesSection />
          </main>
        ) : (
          <main>
            <BillingDashboard
              onBackToHome={() => setCurrentView('landing')}
              onOpenNewStationModal={() => handleSelectPlan(RADIO_PLANS[0], 'monthly')}
              newlyCreatedOrder={newlyCreatedOrder}
            />
          </main>
        )}
      </div>

      {/* Footer */}
      <Footer
        onNavigateSection={handleNavigateSection}
      />

      {/* Global Modals */}
      {showCheckoutModal && selectedPlanForCheckout && (
        <CheckoutModal
          plan={selectedPlanForCheckout}
          initialCycle={selectedBillingCycle}
          onClose={() => setShowCheckoutModal(false)}
          onSuccess={handleCheckoutSuccess}
        />
      )}

      {embedModalStation && (
        <EmbedPlayerModal
          stationName={embedModalStation}
          onClose={() => setEmbedModalStation(null)}
        />
      )}
    </div>
  );
}
