import { RadioPlan, BillingCycle } from '../types/radio';

export const RADIO_PLANS: RadioPlan[] = [
  {
    id: 'starter',
    name: 'Starter',
    tagline: 'Ideal for new web radio stations, podcasters & personal broadcasts',
    monthlyPriceNaira: 13750, // Updated to ₦13,750/mo as requested
    annualPriceNaira: 165000, // ₦165,000 (12 months, no annual discount)
    bitrateKbps: 128,
    maxListeners: 500,
    storageGb: 20,
    bandwidth: 'Unlimited',
    serverType: 'SHOUTcast DNAS 2',
    popular: false,
    recommendedFor: 'Independent creators & church broadcast kickstarts',
    features: [
      '128 kbps crystal MP3 / AAC+ streaming',
      '500 simultaneous listener capacity',
      '20 GB high-speed SSD AutoDJ disk',
      'Unlimited unmetered listener bandwidth',
      'Free customizable HTML5 responsive player',
      'SHOUTcast DNAS 2 & Icecast 2 KH support',
      'Basic listener analytics & IP geocoding',
      'Email & WhatsApp setup assistance'
    ]
  },
  {
    id: 'standard',
    name: 'Standard',
    tagline: 'Most popular for community radio, online ministries & music curators',
    monthlyPriceNaira: 19500,
    annualPriceNaira: 234000, // 12 months, no annual discount
    bitrateKbps: 192,
    maxListeners: 2500,
    storageGb: 50,
    bandwidth: 'Unlimited',
    serverType: 'Icecast 2 KH',
    popular: true,
    recommendedFor: 'Growing internet radio brands & religious ministries',
    features: [
      '192 kbps HD audio transmission',
      '2,500 simultaneous listener capacity',
      '50 GB SSD AutoDJ media library',
      'Direct HTTPS / SSL stream link (iOS & Chrome compliant)',
      'WhatsApp song request widget integration',
      'Live DJ account manager (up to 5 DJs)',
      'Centova / AzuraCast web broadcast console',
      'Real-time listener geolocator & stats export',
      'Priority live chat & Nigerian WhatsApp support'
    ]
  },
  {
    id: 'premium',
    name: 'Premium',
    tagline: 'Studio-grade transmission for commercial broadcasters & media hubs',
    monthlyPriceNaira: 25000, // ₦25,000/mo
    annualPriceNaira: 300000, // 12 months, no annual discount
    bitrateKbps: 320,
    maxListeners: 'Unlimited',
    storageGb: 100,
    bandwidth: 'Unlimited',
    serverType: 'Liquidsoap AutoDJ',
    popular: false,
    recommendedFor: 'Commercial stations, syndicated networks & high-traffic brands',
    features: [
      '320 kbps Studio Master lossless broadcast',
      'Unlimited simultaneous listeners (auto-scaling)',
      '100 GB NVMe SSD AutoDJ library storage',
      'Auto-failover redundant stream backup node',
      'Custom Android APK radio player app generator',
      'Automated jingle & advertisement scheduler',
      'Unlimited sub-DJ accounts with scheduled time-slots',
      'Dedicated Lagos & London CDN caching edge',
      '24/7 VIP Phone & Nigerian engineer dispatch'
    ]
  },
  {
    id: 'enterprise',
    name: 'Broadcaster Pro',
    tagline: 'Multi-channel networks, FM relay stations & terrestrial broadcasters',
    monthlyPriceNaira: 45000,
    annualPriceNaira: 540000, // 12 months, no annual discount
    bitrateKbps: 320,
    maxListeners: 'Unlimited',
    storageGb: 250,
    bandwidth: 'Unlimited',
    serverType: 'Icecast 2 KH',
    popular: false,
    recommendedFor: 'National FM simulcasts, state media & syndication networks',
    features: [
      'Multi-channel bundle (up to 5 stations / mountpoints)',
      'Dedicated server node & custom CNAME (`live.yourstation.ng`)',
      '250 GB enterprise NVMe cloud storage',
      'Hardware transmitter audio relay (Barix, Deva, Comrex)',
      'Geo-fencing & dynamic local audio ad replacement',
      'Full REST API access & raw log data streaming',
      'Custom branded iOS & Android apps publishing assistance',
      'SLA guarantee: 99.99% uptime with signed contract'
    ]
  }
];

/**
 * Format a numeric amount to Nigerian Naira (₦) with clean thousand separators
 */
export function formatNaira(amount: number): string {
  if (isNaN(amount)) return '₦0';
  const rounded = Math.round(amount);
  const formatted = rounded.toLocaleString('en-NG');
  return `₦${formatted}`;
}

/**
 * Calculate total subscription pricing (straight billing, no annual discount)
 */
export function calculateSubscriptionCost(
  planId: string,
  billingCycle: BillingCycle,
  addons: {
    extraStorageGb?: number; // ₦250 per GB/month
    dedicatedIp?: boolean; // ₦5,000/month
    customAndroidApk?: boolean; // ₦2,500/month
  } = {}
): {
  plan: RadioPlan;
  basePrice: number;
  addonsCost: number;
  discount: number;
  total: number;
  savingsNaira: number;
  breakdown: { label: string; amount: number }[];
} {
  const plan = RADIO_PLANS.find((p) => p.id === planId) || RADIO_PLANS[0];

  const isAnnual = billingCycle === 'annual';
  const baseMonthly = plan.monthlyPriceNaira;
  const baseAnnual = plan.annualPriceNaira;

  const storageGb = Math.max(0, addons.extraStorageGb || 0);
  const storageCostPerMonth = storageGb * 250;
  const dedicatedIpCostPerMonth = addons.dedicatedIp ? 5000 : 0;
  const apkCostPerMonth = addons.customAndroidApk ? 2500 : 0;

  const monthlyAddons = storageCostPerMonth + dedicatedIpCostPerMonth + apkCostPerMonth;

  if (isAnnual) {
    const totalAddons = monthlyAddons * 12;

    const breakdown = [
      { label: `${plan.name} Plan (Annual 12 Months)`, amount: baseAnnual },
      ...(storageGb > 0 ? [{ label: `Extra ${storageGb} GB AutoDJ SSD Storage (12 Months)`, amount: storageCostPerMonth * 12 }] : []),
      ...(addons.dedicatedIp ? [{ label: 'Dedicated Radio IP Address (12 Months)', amount: dedicatedIpCostPerMonth * 12 }] : []),
      ...(addons.customAndroidApk ? [{ label: 'Custom Android Player App (12 Months)', amount: apkCostPerMonth * 12 }] : [])
    ];

    return {
      plan,
      basePrice: baseAnnual,
      addonsCost: totalAddons,
      discount: 0, // No annual discount
      total: baseAnnual + totalAddons,
      savingsNaira: 0,
      breakdown
    };
  }

  // Monthly
  const breakdown = [
    { label: `${plan.name} Plan (Monthly)`, amount: baseMonthly },
    ...(storageGb > 0 ? [{ label: `Extra ${storageGb} GB AutoDJ SSD Storage`, amount: storageCostPerMonth }] : []),
    ...(addons.dedicatedIp ? [{ label: 'Dedicated Radio IP Address', amount: dedicatedIpCostPerMonth }] : []),
    ...(addons.customAndroidApk ? [{ label: 'Custom Android Player App Maintenance', amount: apkCostPerMonth }] : [])
  ];

  return {
    plan,
    basePrice: baseMonthly,
    addonsCost: monthlyAddons,
    discount: 0,
    total: baseMonthly + monthlyAddons,
    savingsNaira: 0,
    breakdown
  };
}

/**
 * Calculates upgrade difference between current plan and target plan
 */
export function calculateProratedUpgrade(
  currentPlanId: string,
  newPlanId: string,
  daysRemainingInMonth: number = 20
): {
  currentMonthly: number;
  newMonthly: number;
  difference: number;
  proratedDue: number;
} {
  const current = RADIO_PLANS.find((p) => p.id === currentPlanId) || RADIO_PLANS[0];
  const target = RADIO_PLANS.find((p) => p.id === newPlanId) || RADIO_PLANS[1];

  const difference = Math.max(0, target.monthlyPriceNaira - current.monthlyPriceNaira);
  const ratio = Math.max(0, Math.min(30, daysRemainingInMonth)) / 30;
  const proratedDue = Math.round(difference * ratio);

  return {
    currentMonthly: current.monthlyPriceNaira,
    newMonthly: target.monthlyPriceNaira,
    difference,
    proratedDue
  };
}

/**
 * Bandwidth estimator given bitrate, listener count and active broadcast hours
 */
export function calculateBandwidthEstimate(
  bitrateKbps: number,
  averageListeners: number,
  hoursPerDay: number
): {
  hourlyGb: number;
  dailyGb: number;
  monthlyGb: number;
} {
  // 1 kbps = 1000 bits / s = 125 bytes / s
  // For 1 listener 1 hour: (bitrateKbps * 1000 / 8) * 3600 bytes = (bitrateKbps * 450000) bytes
  const bytesPerHourPerListener = (bitrateKbps * 1000 / 8) * 3600;
  const hourlyGb = (bytesPerHourPerListener * averageListeners) / (1024 * 1024 * 1024);
  const dailyGb = hourlyGb * Math.min(24, Math.max(1, hoursPerDay));
  const monthlyGb = dailyGb * 30;

  return {
    hourlyGb: Math.round(hourlyGb * 100) / 100,
    dailyGb: Math.round(dailyGb * 10) / 10,
    monthlyGb: Math.round(monthlyGb)
  };
}

/**
 * Validates station setup form
 */
export function validateStationConfig(config: {
  stationName: string;
  genre: string;
  adminPassword: string;
}): { valid: boolean; errors: Record<string, string> } {
  const errors: Record<string, string> = {};

  if (!config.stationName || config.stationName.trim().length < 3) {
    errors.stationName = 'Station name must be at least 3 characters.';
  }

  if (!config.genre || config.genre.trim().length < 2) {
    errors.genre = 'Please select or provide a station genre.';
  }

  if (!config.adminPassword || config.adminPassword.length < 6) {
    errors.adminPassword = 'DJ/Encoder password must be at least 6 characters.';
  }

  return {
    valid: Object.keys(errors).length === 0,
    errors
  };
}
