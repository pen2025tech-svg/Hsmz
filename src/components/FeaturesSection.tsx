import React from 'react';
import { Server, Zap, Radio, Shield, Smartphone, BarChart3, Award, Layers } from 'lucide-react';

export const FeaturesSection: React.FC = () => {
  const features = [
    {
      icon: <Award className="w-5 h-5 text-orange-600" />,
      title: 'Instant Cloud Station Deployment',
      description: 'Host radio stations with custom CNAME domains and dedicated station branding. Stream seamlessly to listeners worldwide with zero delay.'
    },
    {
      icon: <Server className="w-5 h-5 text-orange-600" />,
      title: 'Lagos & Global Audio CDN Nodes',
      description: 'Zero buffering for Nigerian listeners on MTN, Airtel, Glo, and 9mobile, backed by London and Frankfurt caching relays for international diaspora.'
    },
    {
      icon: <Radio className="w-5 h-5 text-orange-600" />,
      title: '24/7 AutoDJ NVMe Cloud Automation',
      description: 'Upload MP3/AAC audio files, jingles, station IDs, and pre-recorded sermons to NVMe SSDs. When live studio DJs sign off, AutoDJ takes over seamlessly without silence.'
    },
    {
      icon: <Shield className="w-5 h-5 text-orange-600" />,
      title: 'Native HTTPS / SSL Stream Links',
      description: 'Modern browsers (Safari on iOS, Chrome on Android) require SSL streaming URLs to auto-play audio without mixed-content security blocks.'
    },
    {
      icon: <Smartphone className="w-5 h-5 text-orange-600" />,
      title: 'Mobile App Ready & Embed Widgets',
      description: 'Generate customizable HTML5 radio players to embed on WordPress or Wix sites, and stream directly into standalone Android and iOS radio apps.'
    },
    {
      icon: <BarChart3 className="w-5 h-5 text-orange-600" />,
      title: 'Real-Time Listener Geolocation',
      description: 'Monitor real-time concurrent listeners across Lagos, Abuja, Port Harcourt, Kano, and global diaspora with peak duration analytics.'
    },
    {
      icon: <Layers className="w-5 h-5 text-orange-600" />,
      title: 'Centova Cast & AzuraCast Integration',
      description: 'Industry-standard web broadcaster consoles with playlist scheduling, dynamic crossfading, DJ accounts, and SHOUTcast/Icecast live relays.'
    },
    {
      icon: <Zap className="w-5 h-5 text-orange-600" />,
      title: 'Direct Nigerian Naira (₦) Billing',
      description: 'No dollar card spending limits or fluctuating FX rates. Settle all subscription fees directly in Naira via Paystack and local debit cards.'
    }
  ];

  return (
    <section id="features" className="py-20 bg-white border-b border-slate-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center max-w-3xl mx-auto mb-14">
          <div className="text-xs uppercase tracking-wider font-semibold text-orange-600 mb-2">
            Engineered for Commercial Broadcasters & Media Networks
          </div>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-slate-900 tracking-tight">
            Everything You Need to Broadcast Worldwide.
          </h2>
          <p className="mt-3 text-base text-slate-600">
            From commercial FM simulcasts and online music networks to church ministries and independent podcast syndicates, RadioRDX delivers carrier-grade audio streaming.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feat, idx) => (
            <div
              key={idx}
              className="p-6 rounded-xl border border-slate-200 bg-white hover:border-orange-300 hover:shadow-md transition-all shadow-2xs"
            >
              <div className="w-10 h-10 rounded-lg bg-orange-50 flex items-center justify-center mb-4 border border-orange-100">
                {feat.icon}
              </div>
              <h3 className="text-base font-bold text-slate-900 mb-2">{feat.title}</h3>
              <p className="text-xs text-slate-600 leading-relaxed">{feat.description}</p>
            </div>
          ))}
        </div>

        {/* Enterprise Infrastructure & SLA Banner */}
        <div id="infrastructure" className="mt-16 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 text-white p-8 sm:p-10 border border-slate-800 shadow-xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-80 h-80 bg-orange-500/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative max-w-3xl">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold text-orange-400 bg-orange-950/80 px-2.5 py-1 rounded border border-orange-500/30">
              Enterprise Audio Cloud
            </span>
            <h3 className="text-2xl sm:text-3xl font-extrabold text-white mt-3">
              Reliable Cloud Radio Hosting for Media Networks & Broadcasters.
            </h3>
            <p className="text-sm text-slate-300 mt-2 leading-relaxed">
              RadioRDX provides commercial radio stations, media houses, and audio creators with carrier-grade streaming infrastructure. Benefit from redundant server nodes, automated failover, and a guaranteed 99.99% network uptime SLA.
            </p>
            <div className="mt-6 flex flex-wrap items-center gap-4 text-xs font-semibold">
              <span className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Custom CNAME Domain
              </span>
              <span className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Responsive HTML5 Player
              </span>
              <span className="flex items-center gap-2 text-slate-200">
                <span className="w-2 h-2 rounded-full bg-orange-400" />
                Direct Nigerian Naira Billing
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
