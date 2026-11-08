import React, { useState } from 'react';
import {
  CreditCard,
  Radio,
  HardDrive,
  Users,
  Calendar,
  ArrowUpRight,
  RefreshCw,
  Copy,
  Check,
  Eye,
  EyeOff,
  Plus,
  Play,
  FileText,
  ShieldCheck,
  Sliders,
  Music,
  CheckCircle2,
  AlertCircle
} from 'lucide-react';
import { StationInstance, Invoice, RadioPlan, BillingCycle } from '../types/radio';
import { RADIO_PLANS, formatNaira, calculateProratedUpgrade } from '../utils/billing';
import { ReceiptModal } from './ReceiptModal';
import { EmbedPlayerModal } from './EmbedPlayerModal';

interface BillingDashboardProps {
  onBackToHome: () => void;
  onOpenNewStationModal: () => void;
  newlyCreatedOrder?: {
    stationName: string;
    genre: string;
    plan: RadioPlan;
    cycle: BillingCycle;
    amountNaira: number;
    paymentMethod: 'Paystack (Cards / Bank / USSD)' | 'Direct Bank Transfer (NGN)' | 'Flutterwave';
    reference?: string;
  } | null;
}

export const BillingDashboard: React.FC<BillingDashboardProps> = ({
  onBackToHome,
  onOpenNewStationModal,
  newlyCreatedOrder
}) => {
  // Active Station state
  const [activeStation, setActiveStation] = useState<StationInstance>(() => {
    if (newlyCreatedOrder) {
      return {
        id: `st-${Date.now()}`,
        name: newlyCreatedOrder.stationName,
        genre: newlyCreatedOrder.genre,
        slug: newlyCreatedOrder.stationName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
        planId: newlyCreatedOrder.plan.id,
        status: 'online',
        streamUrl: `https://stream.radiordx.com/${newlyCreatedOrder.stationName.toLowerCase().replace(/[^a-z0-9]+/g, '-')}`,
        mountPoint: '/live',
        serverAddress: 'stream.radiordx.com',
        port: 8000,
        encoderPassword: 'liveBroadcaster99!',
        currentListeners: 1,
        peakListeners: 15,
        currentTrack: {
          artist: 'RadioRDX Intro',
          title: `${newlyCreatedOrder.stationName} - Station On Air`,
          duration: 180,
          elapsed: 10
        },
        storageUsedGb: 0.1,
        storageTotalGb: newlyCreatedOrder.plan.storageGb,
        bandwidthUsedGb: 0.2,
        bitrateKbps: newlyCreatedOrder.plan.bitrateKbps,
        autoDjActive: true,
        activeDjName: 'RadioRDX AutoDJ Engine',
        createdDate: 'Today (Live Provisioned)'
      };
    }
    return {
      id: 'st-01',
      name: 'Metro Sound Radio 101.5',
      genre: 'Afrobeats, Amapiano & Urban Vibes',
      slug: 'metro-sound-lagos',
      planId: 'starter',
      status: 'online',
    streamUrl: 'https://stream.radiordx.com/lagos-urban',
    mountPoint: '/live',
    serverAddress: 'stream.radiordx.com',
    port: 8000,
    encoderPassword: 'liveBroadcaster99!',
    currentListeners: 412,
    peakListeners: 500,
    currentTrack: {
      artist: 'Burna Boy',
      title: 'City Boys (Studio Master)',
      duration: 215,
      elapsed: 88
    },
    storageUsedGb: 12.4,
    storageTotalGb: 20.0,
    bandwidthUsedGb: 312.6,
    bitrateKbps: 128,
    autoDjActive: true,
    activeDjName: 'RadioRDX AutoDJ Engine',
    createdDate: '12 Jan 2026'
  };
});

  // Invoices state with Naira pricing
  const [invoices, setInvoices] = useState<Invoice[]>(() => {
    const defaultInvoices: Invoice[] = [
      {
        id: 'inv-101',
        invoiceNumber: 'INV-2026-00481',
        planId: 'starter',
        planName: 'Starter Pack Stream',
        stationName: 'Metro Sound Radio 101.5',
        amountNaira: 13750, // ₦13,750
        date: '01 Nov 2026',
        dueDate: '01 Dec 2026',
        status: 'paid',
        billingCycle: 'monthly',
        paymentMethod: 'Paystack (Cards / Bank / USSD)',
        receiptNumber: 'PSTK-99214-NG'
      },
      {
        id: 'inv-100',
        invoiceNumber: 'INV-2026-00329',
        planId: 'starter',
        planName: 'Starter Pack Stream',
        stationName: 'Metro Sound Radio 101.5',
        amountNaira: 13750,
        date: '01 Oct 2026',
        dueDate: '01 Nov 2026',
        status: 'paid',
        billingCycle: 'monthly',
        paymentMethod: 'Paystack (Cards / Bank / USSD)',
        receiptNumber: 'PSTK-88410-NG'
      },
      {
        id: 'inv-099',
        invoiceNumber: 'INV-2026-00188',
        planId: 'starter',
        planName: 'Starter Pack Stream',
        stationName: 'Metro Sound Radio 101.5',
        amountNaira: 13750,
        date: '01 Sep 2026',
        dueDate: '01 Oct 2026',
        status: 'paid',
        billingCycle: 'monthly',
        paymentMethod: 'Paystack (Cards / Bank / USSD)',
        receiptNumber: 'PSTK-77192-NG'
      }
    ];

    if (newlyCreatedOrder) {
      const freshInvoice: Invoice = {
        id: `inv-${Date.now()}`,
        invoiceNumber: `INV-2026-00${Math.floor(Math.random() * 900 + 100)}`,
        planId: newlyCreatedOrder.plan.id,
        planName: `${newlyCreatedOrder.plan.name} Radio Plan`,
        stationName: newlyCreatedOrder.stationName,
        amountNaira: newlyCreatedOrder.amountNaira,
        date: 'Today',
        dueDate: newlyCreatedOrder.cycle === 'annual' ? 'In 1 Year' : 'In 30 Days',
        status: 'paid',
        billingCycle: newlyCreatedOrder.cycle,
        paymentMethod: 'Paystack (Cards / Bank / USSD)',
        receiptNumber: newlyCreatedOrder.reference || `PSTK-LIVE-${Date.now().toString().slice(-6)}`
      };
      return [freshInvoice, ...defaultInvoices];
    }

    return defaultInvoices;
  });

  // UI state
  const [activeTab, setActiveTab] = useState<'billing' | 'encoder' | 'autodj' | 'player' | 'analytics'>('billing');
  const [selectedInvoice, setSelectedInvoice] = useState<Invoice | null>(null);
  const [showEmbedModal, setShowEmbedModal] = useState(false);
  const [showUpgradeModal, setShowUpgradeModal] = useState(false);
  const [targetUpgradePlan, setTargetUpgradePlan] = useState<RadioPlan>(RADIO_PLANS[2]); // Premium plan ₦25,000
  const [showPassword, setShowPassword] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const [autoRenew, setAutoRenew] = useState(true);
  const [alertNotice, setAlertNotice] = useState<string | null>(null);

  // AutoDJ tracks list state
  const [tracks, setTracks] = useState([
    { id: '1', title: 'City Boys', artist: 'Burna Boy', duration: '3:35', size: '8.2 MB', playlist: 'Heavy Rotation' },
    { id: '2', title: 'Lonely At The Top', artist: 'Asake', duration: '2:45', size: '6.4 MB', playlist: 'Heavy Rotation' },
    { id: '3', title: 'Miracle No Dey Tire Jesus', artist: 'Moses Bliss', duration: '4:12', size: '9.8 MB', playlist: 'Morning Praise' },
    { id: '4', title: 'Station Top-of-Hour ID (Lagos)', artist: 'RadioRDX Jingle Voice', duration: '0:15', size: '0.4 MB', playlist: 'Station Jingles' },
    { id: '5', title: 'Calm Down', artist: 'Rema', duration: '3:59', size: '9.1 MB', playlist: 'Heavy Rotation' }
  ]);
  const [newTrackTitle, setNewTrackTitle] = useState('');
  const [newTrackArtist, setNewTrackArtist] = useState('');

  const currentPlan = RADIO_PLANS.find((p) => p.id === activeStation.planId) || RADIO_PLANS[1];

  const handleCopy = (text: string, fieldId: string) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldId);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleUpgradePlan = (newPlan: RadioPlan) => {
    const upgradeCalc = calculateProratedUpgrade(currentPlan.id, newPlan.id, 18);

    // Apply upgrade
    setActiveStation((prev) => ({
      ...prev,
      planId: newPlan.id,
      bitrateKbps: newPlan.bitrateKbps,
      storageTotalGb: newPlan.storageGb
    }));

    // Add prorated invoice
    const newInvoice: Invoice = {
      id: `inv-${Date.now()}`,
      invoiceNumber: `INV-2026-00${Math.floor(Math.random() * 900 + 100)}`,
      planId: newPlan.id,
      planName: `${newPlan.name} Plan Upgrade`,
      stationName: activeStation.name,
      amountNaira: upgradeCalc.proratedDue > 0 ? upgradeCalc.proratedDue : newPlan.monthlyPriceNaira,
      date: 'Today',
      dueDate: 'Paid Instant',
      status: 'paid',
      billingCycle: 'monthly',
      paymentMethod: 'Paystack (Cards / Bank / USSD)',
      receiptNumber: `PSTK-UPG-${Date.now().toString().slice(-6)}`
    };

    setInvoices([newInvoice, ...invoices]);
    setShowUpgradeModal(false);
    setAlertNotice(`Successfully upgraded to ${newPlan.name} Plan (${formatNaira(newPlan.monthlyPriceNaira)}/mo). Instant bitrate scaled to ${newPlan.bitrateKbps} kbps.`);
    setTimeout(() => setAlertNotice(null), 6000);
  };

  const handleAddTrack = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTrackTitle.trim() || !newTrackArtist.trim()) return;

    const newSong = {
      id: Date.now().toString(),
      title: newTrackTitle.trim(),
      artist: newTrackArtist.trim(),
      duration: '3:20',
      size: '7.5 MB',
      playlist: 'Heavy Rotation'
    };

    setTracks([newSong, ...tracks]);
    setActiveStation(prev => ({
      ...prev,
      storageUsedGb: Math.round((prev.storageUsedGb + 0.008) * 10) / 10
    }));
    setNewTrackTitle('');
    setNewTrackArtist('');
    setAlertNotice(`Added "${newSong.title}" to AutoDJ cloud rotation.`);
    setTimeout(() => setAlertNotice(null), 4000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-900 pb-20">
      {/* Top Breadcrumb & Station Switcher Bar */}
      <div className="border-b border-slate-200 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-lg bg-orange-600 text-white flex items-center justify-center font-bold">
              <Radio className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-slate-900">{activeStation.name}</h1>
                <span className="inline-flex items-center gap-1 text-[11px] font-semibold text-orange-800 bg-orange-50 border border-orange-200/60 px-2 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                  <span>Live 24/7 (Icecast 2)</span>
                </span>
              </div>
              <div className="text-xs text-slate-500 font-mono mt-0.5">
                Mount: {activeStation.mountPoint} · {activeStation.bitrateKbps} kbps HD · {activeStation.genre}
              </div>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenNewStationModal}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-orange-700 bg-orange-50 hover:bg-orange-100 rounded-lg transition-colors cursor-pointer"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Deploy Another Station (₦)</span>
            </button>
            <button
              onClick={onBackToHome}
              className="text-xs text-slate-500 hover:text-slate-800 font-medium px-2 py-1 transition-colors"
            >
              ← Back to Showcase
            </button>
          </div>
        </div>
      </div>

      {/* Alert Notice Banner */}
      {alertNotice && (
        <div className="bg-orange-50 border-b border-orange-200 px-4 py-2.5 text-xs text-orange-800 font-medium flex items-center justify-between max-w-7xl mx-auto">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-orange-600" />
            <span>{alertNotice}</span>
          </div>
          <button onClick={() => setAlertNotice(null)} className="text-orange-700 font-bold">✕</button>
        </div>
      )}

      {/* Main Content Area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        {/* Top 4 KPI Metric Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-8">
          {/* Card 1: Active Naira Plan */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Active Hosting Tier</span>
              <CreditCard className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-xl font-bold text-slate-900">{currentPlan.name} Plan</div>
            <div className="text-base font-extrabold text-orange-600 font-mono tabular-nums mt-0.5">
              {formatNaira(currentPlan.monthlyPriceNaira)}
              <span className="text-xs text-slate-400 font-normal"> / month</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500 font-medium">Billed via Paystack NGN</span>
              <button
                onClick={() => setShowUpgradeModal(true)}
                className="font-bold text-orange-700 hover:text-orange-800 cursor-pointer"
              >
                Change Plan →
              </button>
            </div>
          </div>

          {/* Card 2: Next Renewal Date & Auto-Pay */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Next Naira Renewal</span>
              <Calendar className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">01 Dec 2026</div>
            <div className="text-xs text-slate-500 mt-1">
              Amount Due: <span className="font-bold text-slate-800 font-mono tabular-nums">{formatNaira(currentPlan.monthlyPriceNaira)}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
              <span className="text-slate-500">Auto-Debit:</span>
              <button
                onClick={() => setAutoRenew(!autoRenew)}
                className={`text-[11px] font-bold px-2 py-0.5 rounded cursor-pointer ${
                  autoRenew ? 'bg-orange-100 text-orange-800' : 'bg-slate-100 text-slate-600'
                }`}
              >
                {autoRenew ? 'Enabled (Active)' : 'Manual Pay'}
              </button>
            </div>
          </div>

          {/* Card 3: Listeners & Capacity */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>Live Concurrent Audience</span>
              <Users className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-2xl font-bold text-slate-900 font-mono tabular-nums">
              {activeStation.currentListeners.toLocaleString()}
            </div>
            <div className="text-xs text-slate-500 mt-1">
              Capacity: <span className="font-semibold text-slate-800 font-mono">{typeof currentPlan.maxListeners === 'number' ? `${currentPlan.maxListeners.toLocaleString()} Max` : 'Unlimited'}</span>
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>Peak Today:</span>
              <span className="font-mono font-bold text-slate-700 tabular-nums">{activeStation.peakListeners.toLocaleString()} listeners</span>
            </div>
          </div>

          {/* Card 4: AutoDJ SSD Disk */}
          <div className="p-5 rounded-xl border border-slate-200 bg-white shadow-xs">
            <div className="flex items-center justify-between text-xs text-slate-500 mb-1">
              <span>AutoDJ Cloud SSD</span>
              <HardDrive className="w-4 h-4 text-slate-400" />
            </div>
            <div className="text-xl font-bold text-slate-900 font-mono tabular-nums">
              {activeStation.storageUsedGb} / {activeStation.storageTotalGb} GB
            </div>
            <div className="w-full bg-slate-100 h-1.5 rounded-full mt-2 overflow-hidden">
              <div
                className="bg-orange-500 h-full rounded-full"
                style={{ width: `${(activeStation.storageUsedGb / activeStation.storageTotalGb) * 100}%` }}
              />
            </div>
            <div className="mt-3 pt-3 border-t border-slate-100 text-xs text-slate-500 flex justify-between">
              <span>Available Space:</span>
              <span className="font-mono font-bold text-orange-700 tabular-nums">
                {(activeStation.storageTotalGb - activeStation.storageUsedGb).toFixed(1)} GB Free
              </span>
            </div>
          </div>
        </div>

        {/* Dashboard Tabs Navigation */}
        <div className="border-b border-slate-200 mb-8">
          <div className="flex gap-2 sm:gap-6 overflow-x-auto pb-px">
            <button
              onClick={() => setActiveTab('billing')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'billing'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Naira Billing & Invoices
            </button>
            <button
              onClick={() => setActiveTab('encoder')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'encoder'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              DJ Encoder Credentials
            </button>
            <button
              onClick={() => setActiveTab('autodj')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'autodj'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              AutoDJ Playlists ({tracks.length} Tracks)
            </button>
            <button
              onClick={() => setActiveTab('player')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'player'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Web Player & Embed Widget
            </button>
            <button
              onClick={() => setActiveTab('analytics')}
              className={`pb-3 text-xs sm:text-sm font-semibold transition-colors cursor-pointer border-b-2 whitespace-nowrap ${
                activeTab === 'analytics'
                  ? 'border-orange-600 text-orange-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800'
              }`}
            >
              Audience Geolocation
            </button>
          </div>
        </div>

        {/* Tab 1: Billing & Invoices */}
        {activeTab === 'billing' && (
          <div className="space-y-8">
            {/* Active Subscription Details Card */}
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5">
                <div>
                  <div className="text-xs font-bold text-slate-400 uppercase tracking-wider">
                    Current Active Radio Subscription
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mt-1">
                    {currentPlan.name} Plan ({currentPlan.bitrateKbps} kbps HD Streaming)
                  </h3>
                  <div className="text-xs text-slate-500 mt-1">
                    Monthly billing cadence · Direct settlement in Nigerian Naira (₦)
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    onClick={() => setShowUpgradeModal(true)}
                    className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                  >
                    <ArrowUpRight className="w-4 h-4" />
                    <span>Upgrade / Switch Plan</span>
                  </button>
                </div>
              </div>

              {/* Sub-grid of plan specs */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-5 text-xs">
                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-slate-400">Monthly Fee</div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                    {formatNaira(currentPlan.monthlyPriceNaira)}
                  </div>
                  <div className="text-[11px] text-orange-700">Fixed Naira Rate</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-slate-400">Storage Included</div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                    {currentPlan.storageGb} GB SSD
                  </div>
                  <div className="text-[11px] text-slate-500">AutoDJ Library</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-slate-400">Listener Limit</div>
                  <div className="text-base font-bold text-slate-900 font-mono tabular-nums mt-0.5">
                    {typeof currentPlan.maxListeners === 'number' ? `${currentPlan.maxListeners.toLocaleString()}` : 'Unlimited'}
                  </div>
                  <div className="text-[11px] text-slate-500">Concurrent streams</div>
                </div>

                <div className="p-3 bg-slate-50 rounded-lg">
                  <div className="text-slate-400">Payment Gateway</div>
                  <div className="text-base font-bold text-slate-900 mt-0.5">
                    Paystack NGN
                  </div>
                  <div className="text-[11px] text-slate-500">Mastercard, Visa & Verve</div>
                </div>
              </div>
            </div>

            {/* Invoices History Table */}
            <div className="rounded-xl border border-slate-200 bg-white overflow-hidden shadow-xs">
              <div className="p-5 border-b border-slate-200 flex items-center justify-between">
                <div>
                  <h3 className="text-base font-bold text-slate-900">Invoices & Billing History (₦)</h3>
                  <p className="text-xs text-slate-500">All transactions billed in Nigerian Naira with instant VAT invoices.</p>
                </div>
                <span className="text-xs text-slate-500 font-mono">Currency: NGN (₦)</span>
              </div>

              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-5 py-3">Invoice Number</th>
                      <th className="px-5 py-3">Description</th>
                      <th className="px-5 py-3">Date</th>
                      <th className="px-5 py-3">Amount (₦)</th>
                      <th className="px-5 py-3">Status</th>
                      <th className="px-5 py-3">Payment Method</th>
                      <th className="px-5 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {invoices.map((inv) => (
                      <tr key={inv.id} className="hover:bg-slate-50/60 transition-colors">
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900">{inv.invoiceNumber}</td>
                        <td className="px-5 py-3.5">
                          <div className="font-semibold text-slate-800">{inv.planName}</div>
                          <div className="text-slate-400 text-[11px]">{inv.stationName}</div>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600 font-mono">{inv.date}</td>
                        <td className="px-5 py-3.5 font-mono font-bold text-slate-900 tabular-nums">
                          {formatNaira(inv.amountNaira)}
                        </td>
                        <td className="px-5 py-3.5">
                          <span className="inline-flex items-center gap-1 text-[11px] font-bold text-orange-800 bg-orange-50 px-2 py-0.5 rounded">
                            <CheckCircle2 className="w-3 h-3 text-orange-600" />
                            <span>Paid</span>
                          </span>
                        </td>
                        <td className="px-5 py-3.5 text-slate-600">{inv.paymentMethod}</td>
                        <td className="px-5 py-3.5 text-right">
                          <button
                            onClick={() => setSelectedInvoice(inv)}
                            className="inline-flex items-center gap-1 text-xs font-semibold text-orange-700 hover:text-orange-800 bg-orange-50 hover:bg-orange-100 px-2.5 py-1 rounded transition-colors cursor-pointer"
                          >
                            <FileText className="w-3.5 h-3.5" />
                            <span>View Receipt</span>
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: DJ Encoder Credentials */}
        {activeTab === 'encoder' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-5">
                <h3 className="text-lg font-bold text-slate-900">Broadcast Source Credentials</h3>
                <p className="text-xs text-slate-500">
                  Input these parameters into BUTT (Broadcast Using This Tool), OBS Studio, SAM Broadcaster, or Mixxx to go live.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5 text-xs">
                {/* Host */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 mb-1">Server Hostname / Address</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">{activeStation.serverAddress}</span>
                    <button
                      onClick={() => handleCopy(activeStation.serverAddress, 'host')}
                      className="text-orange-700 hover:text-orange-800 font-semibold cursor-pointer"
                    >
                      {copiedField === 'host' ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Port */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 mb-1">Port Number</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">{activeStation.port}</span>
                    <button
                      onClick={() => handleCopy(activeStation.port.toString(), 'port')}
                      className="text-orange-700 hover:text-orange-800 font-semibold cursor-pointer"
                    >
                      {copiedField === 'port' ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Mount */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 mb-1">Mount Point</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">{activeStation.mountPoint}</span>
                    <button
                      onClick={() => handleCopy(activeStation.mountPoint, 'mount')}
                      className="text-orange-700 hover:text-orange-800 font-semibold cursor-pointer"
                    >
                      {copiedField === 'mount' ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* Password */}
                <div className="p-3.5 bg-slate-50 rounded-lg border border-slate-100">
                  <div className="text-slate-500 mb-1">Encoder DJ Password</div>
                  <div className="flex items-center justify-between">
                    <span className="font-mono font-bold text-slate-900 text-sm">
                      {showPassword ? activeStation.encoderPassword : '••••••••••••••••'}
                    </span>
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setShowPassword(!showPassword)}
                        className="text-slate-400 hover:text-slate-700 cursor-pointer"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                      <button
                        onClick={() => handleCopy(activeStation.encoderPassword, 'pwd')}
                        className="text-orange-700 hover:text-orange-800 font-semibold cursor-pointer"
                      >
                        {copiedField === 'pwd' ? <Check className="w-4 h-4 text-orange-600" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>
              </div>

              {/* Direct SSL Stream Link */}
              <div className="mt-6 p-4 rounded-xl border border-orange-200 bg-orange-50/50 flex flex-col sm:flex-row items-center justify-between gap-4">
                <div>
                  <div className="text-xs font-bold text-orange-900">Direct Public HTTPS Stream Link</div>
                  <div className="text-xs font-mono text-orange-800 mt-0.5 break-all">
                    {activeStation.streamUrl}
                  </div>
                  <div className="text-[11px] text-orange-700 mt-1">
                    Compatible with iOS Safari, Chrome, TuneIn, and VLC Media Player.
                  </div>
                </div>
                <button
                  onClick={() => handleCopy(activeStation.streamUrl, 'stream')}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors shrink-0 cursor-pointer flex items-center gap-1.5"
                >
                  {copiedField === 'stream' ? (
                    <>
                      <Check className="w-3.5 h-3.5" />
                      <span>Copied!</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Stream Link</span>
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Tab 3: AutoDJ Playlists */}
        {activeTab === 'autodj' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b border-slate-100 pb-5 mb-5">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">AutoDJ Cloud Media Library</h3>
                  <p className="text-xs text-slate-500">
                    When you are not live on mic, AutoDJ automatically rotates your tracks seamlessly from the cloud.
                  </p>
                </div>
                <div className="text-xs text-slate-500 font-mono">
                  Storage: <span className="font-bold text-slate-800">{activeStation.storageUsedGb} GB</span> used of {activeStation.storageTotalGb} GB
                </div>
              </div>

              {/* Quick Add Track Form */}
              <form onSubmit={handleAddTrack} className="mb-6 p-4 bg-slate-50 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-900 uppercase tracking-wider mb-2">
                  Add Song to AutoDJ Rotation
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <input
                    type="text"
                    value={newTrackTitle}
                    onChange={(e) => setNewTrackTitle(e.target.value)}
                    placeholder="Track Title (e.g. Unavailable)"
                    className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  />
                  <input
                    type="text"
                    value={newTrackArtist}
                    onChange={(e) => setNewTrackArtist(e.target.value)}
                    placeholder="Artist Name (e.g. Davido)"
                    className="px-3 py-2 text-xs border border-slate-200 rounded-lg bg-white"
                  />
                  <button
                    type="submit"
                    className="py-2 px-4 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    <Plus className="w-3.5 h-3.5" />
                    <span>Upload to Cloud</span>
                  </button>
                </div>
              </form>

              {/* Track List */}
              <div className="overflow-x-auto">
                <table className="w-full text-xs text-left">
                  <thead className="bg-slate-50 text-slate-500 uppercase font-semibold border-b border-slate-200">
                    <tr>
                      <th className="px-4 py-3">#</th>
                      <th className="px-4 py-3">Track & Artist</th>
                      <th className="px-4 py-3">Playlist Rotation</th>
                      <th className="px-4 py-3">Duration</th>
                      <th className="px-4 py-3">Size</th>
                      <th className="px-4 py-3 text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-100">
                    {tracks.map((t, idx) => (
                      <tr key={t.id} className="hover:bg-slate-50/60">
                        <td className="px-4 py-3 text-slate-400 font-mono">{idx + 1}</td>
                        <td className="px-4 py-3">
                          <div className="font-bold text-slate-900">{t.title}</div>
                          <div className="text-slate-500">{t.artist}</div>
                        </td>
                        <td className="px-4 py-3">
                          <span className="text-[11px] font-medium bg-slate-100 text-slate-700 px-2 py-0.5 rounded">
                            {t.playlist}
                          </span>
                        </td>
                        <td className="px-4 py-3 font-mono text-slate-600">{t.duration}</td>
                        <td className="px-4 py-3 font-mono text-slate-500">{t.size}</td>
                        <td className="px-4 py-3 text-right">
                          <button
                            onClick={() => {
                              setTracks(tracks.filter(track => track.id !== t.id));
                              setAlertNotice(`Removed "${t.title}" from playlist.`);
                            }}
                            className="text-xs text-red-500 hover:text-red-700 font-semibold cursor-pointer"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        )}

        {/* Tab 4: Web Player & Embeds */}
        {activeTab === 'player' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6 flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-slate-900">Custom Web Player Widget</h3>
                  <p className="text-xs text-slate-500">
                    Embed your live stream directly into your church website, personal blog, or commercial portal.
                  </p>
                </div>
                <button
                  onClick={() => setShowEmbedModal(true)}
                  className="px-4 py-2 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer flex items-center gap-1.5"
                >
                  <Sliders className="w-3.5 h-3.5" />
                  <span>Customize & Get Embed Code</span>
                </button>
              </div>

              {/* Live Preview Box */}
              <div className="bg-slate-50 p-6 rounded-xl border border-slate-200">
                <div className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">
                  Widget Preview:
                </div>
                <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-xs flex items-center justify-between gap-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-orange-600 text-white flex items-center justify-center">
                      <Play className="w-5 h-5 fill-white ml-0.5" />
                    </div>
                    <div>
                      <div className="font-bold text-sm text-slate-900">{activeStation.name}</div>
                      <div className="text-xs text-slate-500">
                        {activeStation.currentTrack.title} — {activeStation.currentTrack.artist}
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="inline-flex items-center gap-1.5 text-xs font-semibold text-orange-700 bg-orange-50 px-2 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-orange-500"></span>
                      <span>192 kbps HD Audio</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 5: Audience Geolocation */}
        {activeTab === 'analytics' && (
          <div className="space-y-6">
            <div className="rounded-xl border border-slate-200 bg-white p-6 shadow-xs">
              <div className="border-b border-slate-100 pb-4 mb-6">
                <h3 className="text-lg font-bold text-slate-900">Nigerian & Global Listener Distribution</h3>
                <p className="text-xs text-slate-500">
                  Real-time geographic IP telemetry of active stream connections.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 text-xs">
                {/* Cities List */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-4">
                    Top Nigerian Audience Regions
                  </h4>
                  <div className="space-y-3">
                    {[
                      { city: 'Lagos State (Ikeja, Lekki, Mainland)', count: 742, pct: 52 },
                      { city: 'Abuja Federal Capital Territory', count: 300, pct: 21 },
                      { city: 'Rivers State (Port Harcourt)', count: 200, pct: 14 },
                      { city: 'Kano & Northern Metropolis', count: 114, pct: 8 },
                      { city: 'UK & USA Diaspora Connections', count: 72, pct: 5 }
                    ].map((loc, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-medium mb-1">
                          <span className="text-slate-800">{loc.city}</span>
                          <span className="font-mono text-slate-500 tabular-nums">
                            {loc.count} listeners ({loc.pct}%)
                          </span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-orange-500 h-full rounded-full" style={{ width: `${loc.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Devices & Player Apps */}
                <div>
                  <h4 className="font-bold text-slate-800 uppercase tracking-wider mb-4">
                    Listening Devices & Audio Clients
                  </h4>
                  <div className="space-y-3">
                    {[
                      { device: 'Android Mobile Apps & Chrome', pct: 62 },
                      { device: 'Apple iOS Safari & AirPlay', pct: 26 },
                      { device: 'Desktop Web Audio Players', pct: 9 },
                      { device: 'Hardware Wi-Fi & Smart Speakers', pct: 3 }
                    ].map((dev, idx) => (
                      <div key={idx}>
                        <div className="flex justify-between font-medium mb-1">
                          <span className="text-slate-800">{dev.device}</span>
                          <span className="font-mono text-slate-500 tabular-nums">{dev.pct}%</span>
                        </div>
                        <div className="w-full bg-slate-100 h-1.5 rounded-full overflow-hidden">
                          <div className="bg-slate-700 h-full rounded-full" style={{ width: `${dev.pct}%` }} />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Upgrade Plan Modal */}
      {showUpgradeModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 sm:p-8 border border-slate-200 shadow-2xl relative my-8">
            <button
              onClick={() => setShowUpgradeModal(false)}
              aria-label="Close upgrade modal"
              className="absolute top-4 right-4 p-1.5 text-slate-400 hover:text-slate-700 rounded-lg cursor-pointer"
            >
              ✕
            </button>

            <h3 className="text-xl font-bold text-slate-900">Switch or Upgrade Radio Plan</h3>
            <p className="text-xs text-slate-500 mb-6">
              Instant prorated upgrade in Nigerian Naira. Your stream will continue without disconnection.
            </p>

            <div className="space-y-3 mb-6">
              {RADIO_PLANS.map((plan) => {
                const isSelected = targetUpgradePlan.id === plan.id;
                const isCurrent = currentPlan.id === plan.id;
                const diff = calculateProratedUpgrade(currentPlan.id, plan.id, 18);

                return (
                  <div
                    key={plan.id}
                    onClick={() => setTargetUpgradePlan(plan)}
                    className={`p-4 rounded-xl border cursor-pointer transition-all ${
                      isSelected
                        ? 'border-orange-600 bg-orange-50/50 ring-1 ring-orange-600'
                        : 'border-slate-200 hover:border-slate-300'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-bold text-slate-900 text-sm">{plan.name}</span>
                          {isCurrent && (
                            <span className="text-[10px] font-bold text-slate-600 bg-slate-200 px-1.5 py-0.5 rounded">
                              Current Plan
                            </span>
                          )}
                        </div>
                        <div className="text-xs text-slate-500 mt-0.5">
                          {plan.bitrateKbps} kbps · {typeof plan.maxListeners === 'number' ? `${plan.maxListeners.toLocaleString()} Listeners` : 'Unlimited'} · {plan.storageGb} GB AutoDJ
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="font-bold text-slate-900 font-mono text-sm tabular-nums">
                          {formatNaira(plan.monthlyPriceNaira)}/mo
                        </div>
                        {diff.proratedDue > 0 && (
                          <div className="text-[11px] text-orange-700 font-medium">
                            Prorated due: {formatNaira(diff.proratedDue)}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <div className="text-xs text-slate-500">
                Proration calculated for remaining 18 days in month.
              </div>
              <div className="flex gap-3">
                <button
                  onClick={() => setShowUpgradeModal(false)}
                  className="px-4 py-2 text-xs font-semibold text-slate-600 hover:text-slate-900 cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  onClick={() => handleUpgradePlan(targetUpgradePlan)}
                  className="px-5 py-2.5 bg-orange-600 hover:bg-orange-700 text-white font-semibold text-xs rounded-lg transition-colors cursor-pointer"
                >
                  Confirm & Apply Upgrade ({formatNaira(targetUpgradePlan.monthlyPriceNaira)}/mo)
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modals */}
      <ReceiptModal invoice={selectedInvoice} onClose={() => setSelectedInvoice(null)} />
      {showEmbedModal && (
        <EmbedPlayerModal
          stationName={activeStation.name}
          onClose={() => setShowEmbedModal(false)}
        />
      )}
    </div>
  );
};
