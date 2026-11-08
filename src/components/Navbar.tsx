import React from 'react';
import { Radio, ArrowRight } from 'lucide-react';

interface NavbarProps {
  currentView: 'landing' | 'dashboard';
  setCurrentView: (view: 'landing' | 'dashboard') => void;
  onNavigateSection: (sectionId: string) => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentView,
  setCurrentView,
  onNavigateSection
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-6">
        {/* Brand Logo & Name */}
        <button
          onClick={() => {
            setCurrentView('landing');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className="flex items-center gap-2.5 text-left group focus:outline-none cursor-pointer"
        >
          <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-orange-600 via-orange-500 to-amber-400 flex items-center justify-center text-white shadow-md shadow-orange-500/25 group-hover:scale-105 transition-transform">
            <Radio className="w-5 h-5 drop-shadow-xs" />
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-extrabold tracking-tight text-slate-900 leading-tight">
              Radio<span className="text-orange-500">RDX</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider font-semibold text-slate-400 font-mono">
              Cloud Audio Infrastructure
            </span>
          </div>
        </button>

        {/* Clean Navigation Links */}
        <nav className="hidden md:flex items-center gap-7 text-sm font-medium text-slate-600">
          <button
            onClick={() => {
              setCurrentView('landing');
              onNavigateSection('plans');
            }}
            className="hover:text-orange-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Streaming Plans (₦)
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              onNavigateSection('features');
            }}
            className="hover:text-orange-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Platform Features
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              onNavigateSection('calculator');
            }}
            className="hover:text-orange-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Bandwidth Estimator
          </button>
          <button
            onClick={() => {
              setCurrentView('landing');
              onNavigateSection('infrastructure');
            }}
            className="hover:text-orange-600 transition-colors whitespace-nowrap cursor-pointer"
          >
            Network SLA & Infrastructure
          </button>
        </nav>

        {/* Action Controls - Clean single Get Started CTA */}
        <div className="flex items-center gap-3 shrink-0">
          <button
            onClick={() => {
              setCurrentView('landing');
              onNavigateSection('plans');
            }}
            className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-orange-500 hover:bg-orange-600 rounded-lg transition-colors shadow-sm shadow-orange-500/20 cursor-pointer"
          >
            <span>Get Started</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </header>
  );
};
