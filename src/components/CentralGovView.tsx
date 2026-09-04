import React, { useState } from 'react';
import {
  Network,
  TrendingDown,
  FileBarChart2,
  Satellite,
  AlertTriangle,
  FileText,
  CheckCircle2,
  ArrowRight,
  ShieldAlert,
  Layers,
  Calendar
} from 'lucide-react';
import { RoleKey, ClaimRecord } from '../types';
import { PanIndiaMap } from './PanIndiaMap';
import { PRIORITY_CLAIMS_QUEUE } from '../data/mockData';

interface CentralGovViewProps {
  onOpenDossier: (claim: ClaimRecord) => void;
  onFlagForDlc: (claimId: string) => void;
}

export const CentralGovView: React.FC<CentralGovViewProps> = ({
  onOpenDossier,
  onFlagForDlc
}) => {
  const [activeBreadcrumb, setActiveBreadcrumb] = useState<'india' | 'state' | 'district' | 'claim' | 'anomaly'>('india');
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [bannerMsg, setBannerMsg] = useState<string | null>(null);

  const handleFlagDirective = (claimId: string) => {
    if (!flaggedIds.includes(claimId)) {
      setFlaggedIds([...flaggedIds, claimId]);
      setBannerMsg(`Central Directive issued for Claim ${claimId}: Priority Joint DGPS Resurvey mandated.`);
      onFlagForDlc(claimId);
      setTimeout(() => setBannerMsg(null), 4000);
    }
  };

  return (
    <section className="space-y-5 animate-fade-slide-up" id="view-central">
      {/* Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-2">
        <div>
          <h1 className="text-lg font-bold text-[#1C2B22] flex items-center gap-2">
            <Network className="w-4.5 h-4.5 text-[#2A7C13]" />
            <span>Ministry of Tribal Affairs (MoTA) National Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500 mt-0.5">
            Pan-India Forest Rights Act compliance, title distribution, and AI anomaly tracking across all 726 districts.
          </p>
        </div>

        {/* National Hierarchy Scope Bar */}
        <div className="badge-green text-[10px] font-mono px-3 py-1.5 rounded-lg flex items-center gap-1.5 whitespace-nowrap">
          <span className="font-bold">National Registry Scope:</span>
          <span>Pan-India</span>
          <span className="opacity-50">›</span>
          <span>36 States/UTs</span>
          <span className="opacity-50">›</span>
          <span>726 Districts</span>
        </div>
      </div>

      {/* National KPI Grid (6 items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
        <div className="glass-stat">
          <span className="section-label">National Total</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-[#1C2B22] tracking-tight leading-none">315,000</div>
            <span className="text-[11px] text-slate-600 font-medium mt-1.5 block leading-tight">Recorded claims</span>
          </div>
        </div>

        <div className="glass-stat-cream">
          <span className="section-label text-[#2A7C13]">Titles Conferred</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-[#2A7C13] tracking-tight leading-none">210,000</div>
            <span className="text-[11px] text-[#2A7C13] font-semibold mt-1.5 block leading-tight">66.6% completion</span>
          </div>
        </div>

        <div className="glass-stat-beige">
          <span className="section-label text-amber-800">Pending</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-amber-900 tracking-tight leading-none">95,000</div>
            <span className="text-[11px] text-amber-800 font-semibold mt-1.5 block leading-tight">In GS/SDLC/DLC</span>
          </div>
        </div>

        <div className="glass-stat">
          <span className="section-label">States on Track</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-[#2A7C13] tracking-tight leading-none">18</div>
            <span className="text-[11px] text-slate-600 font-medium mt-1.5 block leading-tight">&gt;60% title rate</span>
          </div>
        </div>

        <div className="glass-stat-rose">
          <span className="section-label text-rose-800">High-Priority States</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-rose-700 tracking-tight leading-none">4</div>
            <span className="text-[11px] text-rose-700 font-semibold mt-1.5 block leading-tight">MH, MP, OD, KL</span>
          </div>
        </div>

        <div className="glass-stat">
          <span className="section-label text-[#2A7C13]">National Anomaly</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-2xl sm:text-[26px] font-black text-[#2A7C13] tracking-tight leading-none">1.1%</div>
            <span className="text-[11px] text-[#2A7C13] font-semibold mt-1.5 block leading-tight">3,465 active flags</span>
          </div>
        </div>
      </div>

      {/* National Map & Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* National Map of India (7 cols) */}
        <div className="lg:col-span-7">
          <PanIndiaMap />
        </div>

        {/* Comparative State Trends (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* State Approval Rate Comparison Bar Chart */}
          <div className="glass-card p-4 space-y-3">
            <div className="glass-card-header">
              <h3 className="text-xs font-bold text-[#1C2B22]">Top States Conferment Rate (%)</h3>
            </div>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-[#1C2B22]">Tripura</span>
                  <span className="font-bold text-[#2A7C13]">89%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(118,196,87,0.12)' }}>
                  <div className="h-full rounded-full" style={{ width: '89%', background: '#76C457' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-[#1C2B22]">Odisha</span>
                  <span className="font-bold text-[#2A7C13]">68%</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(118,196,87,0.12)' }}>
                  <div className="h-full rounded-full" style={{ width: '68%', background: '#76C457' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Madhya Pradesh</span>
                  <span className="font-bold text-amber-600">51%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '51%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Maharashtra</span>
                  <span className="font-bold text-amber-600">46%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '46%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Kerala</span>
                  <span className="font-bold text-rose-600">38%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-rose-500 h-full rounded-full" style={{ width: '38%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* National Anomaly Trends Graphic */}
          <div className="glass-card p-4 space-y-2">
            <div className="glass-card-header">
              <h3 className="text-xs font-bold text-[#1C2B22]">Monthly AI Anomaly Detection Velocity</h3>
              <span className="badge-green flex items-center gap-1">
                <TrendingDown className="w-3 h-3" />
                <span>-14% vs Q1</span>
              </span>
            </div>

            <div className="h-28 flex items-end justify-between gap-2 pt-4 pb-2 px-3 rounded-lg border" style={{ background: 'rgba(240,247,236,0.55)', borderColor: 'rgba(118,196,87,0.14)' }}>
              {/* Bar representation Jan - Jun */}
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-slate-300 rounded-t transition-all hover:bg-slate-400" style={{ height: '60px' }}></div>
                <span className="text-[9px] text-slate-400">Jan</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-slate-300 rounded-t transition-all hover:bg-slate-400" style={{ height: '48px' }}></div>
                <span className="text-[9px] text-slate-400">Feb</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-amber-400 rounded-t transition-all hover:bg-amber-500" style={{ height: '75px' }}></div>
                <span className="text-[9px] text-slate-400">Mar</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-amber-400 rounded-t transition-all hover:bg-amber-500" style={{ height: '52px' }}></div>
                <span className="text-[9px] text-slate-400">Apr</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-rose-500 rounded-t transition-all hover:bg-rose-600" style={{ height: '85px' }}></div>
                <span className="text-[9px] text-slate-400">May</span>
              </div>
              <div className="flex-1 flex flex-col items-center gap-1">
                <div className="w-full bg-emerald-500 rounded-t transition-all hover:bg-emerald-600" style={{ height: '38px' }}></div>
                <span className="text-[9px] text-emerald-700 font-bold">Jun</span>
              </div>
            </div>

            <p className="text-[11px] text-slate-500 leading-snug">
              Autonomous GIS satellite change detection resolved 410 false overlaps across June.
            </p>
          </div>
        </div>
      </div>

      {/* Central Directive Toast */}
      {bannerMsg && (
        <div className="alert-banner-success flex items-center justify-between animate-in fade-in">
          <span>{bannerMsg}</span>
          <button onClick={() => setBannerMsg(null)} className="font-bold ml-2 cursor-pointer text-[#2A7C13]">✕</button>
        </div>
      )}

      {/* National Ground-Truthing & SDLC Field Operational Oversight Section */}
      <div className="glass-panel p-5 space-y-4">
        <div className="glass-card-header">
          <div>
            <div className="flex items-center gap-2">
              <span className="p-1 rounded" style={{ background: 'rgba(118,196,87,0.15)', color: '#2A7C13' }}>
                <Satellite className="w-4 h-4" />
              </span>
              <h2 className="text-sm font-bold text-[#1C2B22]">
                National SDLC Field Ground-Truthing &amp; Critical Anomaly Oversight
              </h2>
              <span className="badge-rose">Cross-State Telemetry</span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Field operational telemetry from Sub-Divisional Level Committees (SDLC), cadastral survey units, and autonomous DGPS re-surveys.
            </p>
          </div>

          <button
            type="button"
            onClick={() => {
              const el = document.getElementById('sdlc-queue-section');
              el?.scrollIntoView({ behavior: 'smooth' });
            }}
            className="btn-ghost shrink-0 self-start"
          >
            <span>Inspect Priority Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5">
          <div className="glass-stat">
            <span className="section-label">Ground Surveys Active</span>
            <div className="mt-2 flex flex-col justify-end">
              <div className="text-xl font-black text-[#1C2B22] tracking-tight leading-none">14,280</div>
              <span className="text-[11px] text-slate-600 mt-1.5 block font-medium leading-tight">Across 112 priority units</span>
            </div>
          </div>
          <div className="glass-stat-beige">
            <span className="section-label text-amber-800">Quorum Discrepancies</span>
            <div className="mt-2 flex flex-col justify-end">
              <div className="text-xl font-black text-amber-900 tracking-tight leading-none">3,120</div>
              <span className="text-[11px] text-amber-800 mt-1.5 block font-semibold leading-tight">Gram Sabha re-verification</span>
            </div>
          </div>
          <div className="glass-stat-rose">
            <span className="section-label text-rose-800">Satellite RoR Overlaps</span>
            <div className="mt-2 flex flex-col justify-end">
              <div className="text-xl font-black text-rose-700 tracking-tight leading-none">3,465</div>
              <span className="text-[11px] text-rose-700 mt-1.5 block font-semibold leading-tight">0.6 ha average variance</span>
            </div>
          </div>
          <div className="glass-stat-cream">
            <span className="section-label text-[#2A7C13]">Joint DGPS Re-surveys</span>
            <div className="mt-2 flex flex-col justify-end">
              <div className="text-xl font-black text-[#2A7C13] tracking-tight leading-none">420</div>
              <span className="text-[11px] text-[#2A7C13] mt-1.5 block font-semibold leading-tight">Scheduled for August</span>
            </div>
          </div>
        </div>

        {/* Split Grid: Priority SDLC Queue & Directives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          {/* Priority SDLC Field Claims Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-[#1C2B22] flex items-center gap-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                <span>Priority Sub-Divisional Anomaly Queue (Field Telemetry)</span>
              </span>
              <span className="badge-green">Live Sync</span>
            </div>

            <div className="space-y-3">
              {PRIORITY_CLAIMS_QUEUE.map((item) => (
                <div
                  key={item.id}
                  className="glass-strip glass-strip-rose p-3.5 sm:p-4 space-y-2.5"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                    <div className="flex flex-wrap items-center gap-2">
                      <span className="badge-rose text-[10px] font-bold">Score {item.anomalyScore}</span>
                      <span className="font-bold text-[#1C2B22] text-xs">
                        {item.plotId} • {item.claimantName}
                      </span>
                      <span className="glass-chip">{item.category}</span>
                    </div>

                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => handleFlagDirective(item.id)}
                        disabled={flaggedIds.includes(item.id)}
                        className="btn-directive"
                      >
                        {flaggedIds.includes(item.id) ? 'Directive Active ✓' : 'Issue Central Directive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDossier(item)}
                        className="btn-dossier"
                      >
                        Open Dossier
                      </button>
                    </div>
                  </div>

                  <div className="text-xs text-slate-700 flex flex-wrap items-center gap-x-3 gap-y-1 font-medium">
                    <span><strong className="text-slate-900">Location:</strong> {item.village}, {item.district}</span>
                    <span className="text-slate-300">•</span>
                    <span><strong className="text-slate-900">Extent:</strong> {item.landExtentHectares} Ha</span>
                    <span className="text-slate-300">•</span>
                    <span><strong className="text-slate-900">Unit:</strong> {item.assignedTeam}</span>
                  </div>

                  <p className="text-xs text-slate-800 leading-relaxed">
                    <strong className="text-rose-700 font-bold">Field Anomaly:</strong> {item.anomalyReasons?.join('; ')}
                  </p>

                  {item.aiRecommendation && (
                    <div className="p-2.5 rounded-lg text-xs leading-relaxed"
                         style={{ background: 'rgba(251, 230, 194, 0.60)', border: '1px solid rgba(217, 119, 6, 0.25)', color: '#78350f' }}>
                      <strong className="font-bold text-amber-950">AI Operational Recommendation:</strong> {item.aiRecommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Operational Field Health & Directives (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="section-label block">Ground-Truthing Technology Adoption</span>

            <div className="glass-card p-4 space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Handheld RTK DGPS Penetration</span>
                  <span className="font-bold text-[#2A7C13]">68% (493 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(251, 230, 194, 0.60)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '68%', background: '#2A7C13' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Dense Canopy Drone LiDAR Surveys</span>
                  <span className="font-bold text-amber-800">54% (392 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(251, 230, 194, 0.60)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '54%', background: '#76C457' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Gram Sabha Digital Geo-Tagging Sync</span>
                  <span className="font-bold text-[#2A7C13]">89% (646 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 rounded-full overflow-hidden" style={{ background: 'rgba(251, 230, 194, 0.60)' }}>
                  <div className="h-full rounded-full transition-all" style={{ width: '89%', background: '#2A7C13' }}></div>
                </div>
              </div>
            </div>

            {/* Ministry Statutory Directive Card */}
            <div className="glass-stat-cream p-3.5 space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4 text-[#2A7C13]" />
                <span className="font-bold text-xs text-[#1C2B22]">MoTA National Directive: 2026/04</span>
              </div>
              <p className="text-[11px] text-slate-700 leading-relaxed">
                All 75 high-anomaly claims across Madhya Pradesh (Bandhavgarh), Odisha (Kandhamal), and Maharashtra (Gadchiroli) are mandated for joint on-site DGPS re-verification prior to the next statutory DLC session.
              </p>
              <div className="text-[10px] text-[#2A7C13] rounded border font-mono p-2"
                   style={{ background: 'rgba(255,248,207,0.70)', borderColor: 'rgba(118,196,87,0.25)' }}>
                Mandated SLA: 15 days for Gram Sabha &amp; SDLC compliance across all 36 States/UTs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
