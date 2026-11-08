export type BillingCycle = 'monthly' | 'annual';

export interface RadioPlan {
  id: string;
  name: string;
  tagline: string;
  monthlyPriceNaira: number;
  annualPriceNaira: number; // usually 10 months price (2 months free)
  bitrateKbps: number;
  maxListeners: number | 'Unlimited';
  storageGb: number;
  bandwidth: string;
  serverType: 'SHOUTcast DNAS 2' | 'Icecast 2 KH' | 'Liquidsoap AutoDJ';
  features: string[];
  popular?: boolean;
  recommendedFor: string;
}

export interface StationInstance {
  id: string;
  name: string;
  genre: string;
  slug: string;
  planId: string;
  status: 'online' | 'autodj' | 'offline';
  streamUrl: string;
  mountPoint: string;
  serverAddress: string;
  port: number;
  encoderPassword: string;
  currentListeners: number;
  peakListeners: number;
  currentTrack: {
    artist: string;
    title: string;
    albumArt?: string;
    duration: number; // in seconds
    elapsed: number;
  };
  storageUsedGb: number;
  storageTotalGb: number;
  bandwidthUsedGb: number;
  bitrateKbps: number;
  autoDjActive: boolean;
  activeDjName: string;
  createdDate: string;
}

export interface Invoice {
  id: string;
  invoiceNumber: string;
  planId: string;
  planName: string;
  stationName: string;
  amountNaira: number;
  date: string;
  dueDate: string;
  status: 'paid' | 'pending' | 'unpaid';
  billingCycle: BillingCycle;
  paymentMethod?: 'Paystack (Cards / Bank / USSD)' | 'Flutterwave' | 'Direct Bank Transfer (NGN)';
  receiptNumber?: string;
}

export interface PlaylistItem {
  id: string;
  title: string;
  artist: string;
  duration: string;
  filesizeMb: number;
  playlist: 'Heavy Rotation' | 'Afrobeats Morning' | 'Gospel Praise' | 'Jingles & Station IDs';
  addedDate: string;
}
