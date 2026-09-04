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
    <section className="space-y-6 animate-in fade-in duration-200" id="view-central">
      {/* Title & Breadcrumbs */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-gov-900 flex items-center space-x-2">
            <Network className="w-5 h-5 text-emerald-600" />
            <span>Ministry of Tribal Affairs (MoTA) National Dashboard</span>
          </h1>
          <p className="text-xs text-slate-500">
            Pan-India Forest Rights Act compliance, title distribution, and AI anomaly tracking across all 726 districts.
          </p>
        </div>

        {/* National Hierarchy Scope Bar */}
        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-slate-600 flex items-center space-x-1.5">
          <span className="text-gov-900 font-bold">National Registry Scope:</span>
          <span className="text-emerald-700 font-semibold">Pan-India</span>
          <span>&gt;</span>
          <span className="text-slate-700">36 States/UTs</span>
          <span>&gt;</span>
          <span className="text-slate-700">726 Districts</span>
        </div>
      </div>

      {/* National KPI Grid (6 items) */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">National Total</span>
          <div className="text-2xl font-black text-slate-900 mt-1">315,000</div>
          <span className="text-[10px] text-slate-500 font-medium">Recorded claims</span>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-gov-800">Titles Conferred</span>
          <div className="text-2xl font-black text-gov-900 mt-1">210,000</div>
          <span className="text-[10px] text-emerald-700 font-medium">66.6% completion</span>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-amber-800">Pending</span>
          <div className="text-2xl font-black text-amber-700 mt-1">95,000</div>
          <span className="text-[10px] text-amber-600 font-medium">In GS/SDLC/DLC</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">States on Track</span>
          <div className="text-2xl font-black text-emerald-600 mt-1">18</div>
          <span className="text-[10px] text-slate-400 font-medium">&gt;60% title rate</span>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-rose-800">High-Priority States</span>
          <div className="text-2xl font-black text-rose-600 mt-1">4</div>
          <span className="text-[10px] text-rose-700 font-medium">MH, MP, OD, KL</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">National Anomaly Rate</span>
          <div className="text-2xl font-black text-gov-800 mt-1">1.1%</div>
          <span className="text-[10px] text-emerald-600 font-medium">3,465 flags</span>
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
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              Top States Conferment Rate (%)
            </h3>

            <div className="space-y-2.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Tripura</span>
                  <span className="font-bold text-emerald-700">89%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Odisha</span>
                  <span className="font-bold text-emerald-700">68%</span>
                </div>
                <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '68%' }}></div>
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
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Monthly AI Anomaly Detection Velocity
              </h3>
              <span className="text-[10px] font-mono text-emerald-600 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200 flex items-center space-x-1">
                <TrendingDown className="w-3 h-3" />
                <span>-14% vs Q1</span>
              </span>
            </div>

            <div className="h-28 flex items-end justify-between space-x-2 pt-4 pb-2 px-3 bg-slate-50 rounded-lg border border-slate-100">
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
        <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
          <span>{bannerMsg}</span>
          <button onClick={() => setBannerMsg(null)} className="text-emerald-700 font-bold ml-2 cursor-pointer">✕</button>
        </div>
      )}

      {/* National Ground-Truthing & SDLC Field Operational Oversight Section */}
      <div className="bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 border-b border-slate-100 pb-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-emerald-100 text-emerald-800">
                <Satellite className="w-4 h-4 text-emerald-600" />
              </span>
              <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wide">
                National SDLC Field Ground-Truthing &amp; Critical Anomaly Oversight
              </h2>
              <span className="text-[10px] font-bold bg-rose-100 text-rose-800 px-2 py-0.5 rounded-full">
                Cross-State Telemetry
              </span>
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
            className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-gov-900 font-semibold text-xs transition cursor-pointer self-start sm:self-auto"
          >
            <span>Inspect Priority Queue</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* 4 Telemetry Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
          <div className="bg-slate-50 p-3 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Ground Surveys Active</span>
            <div className="text-xl font-black text-slate-800 mt-0.5">14,280</div>
            <span className="text-[10px] text-slate-500">Across 112 priority units</span>
          </div>
          <div className="bg-amber-50 p-3 rounded-lg border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800">Quorum Discrepancies</span>
            <div className="text-xl font-black text-amber-700 mt-0.5">3,120</div>
            <span className="text-[10px] text-amber-600">Gram Sabha re-verification</span>
          </div>
          <div className="bg-rose-50 p-3 rounded-lg border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-800">Satellite RoR Overlaps</span>
            <div className="text-xl font-black text-rose-600 mt-0.5">3,465</div>
            <span className="text-[10px] text-rose-600">0.6 ha average variance</span>
          </div>
          <div className="bg-emerald-50 p-3 rounded-lg border border-emerald-200">
            <span className="text-[10px] uppercase font-bold text-emerald-800">Joint DGPS Re-surveys</span>
            <div className="text-xl font-black text-emerald-700 mt-0.5">420</div>
            <span className="text-[10px] text-emerald-700">Scheduled for August</span>
          </div>
        </div>

        {/* Split Grid: Priority SDLC Queue & Directives */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 pt-2">
          {/* Priority SDLC Field Claims Queue (7 cols) */}
          <div className="lg:col-span-7 space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold text-slate-800 uppercase tracking-wider flex items-center space-x-1.5">
                <AlertTriangle className="w-3.5 h-3.5 text-rose-500" />
                <span>Priority Sub-Divisional Anomaly Queue (Field Telemetry)</span>
              </span>
              <span className="text-[10px] text-slate-400 font-mono">Live Sync</span>
            </div>

            <div className="space-y-2.5">
              {PRIORITY_CLAIMS_QUEUE.map((item) => (
                <div
                  key={item.id}
                  className="p-3 bg-slate-50 hover:bg-slate-100/80 rounded-xl border border-slate-200 transition space-y-2"
                >
                  <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-1.5">
                    <div className="flex items-center space-x-2">
                      <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                        Score {item.anomalyScore}
                      </span>
                      <span className="font-bold text-slate-900 text-xs">
                        {item.plotId} • {item.claimantName}
                      </span>
                      <span className="text-[10px] bg-slate-200 text-slate-700 px-1.5 py-0.5 rounded font-mono">
                        {item.category}
                      </span>
                    </div>

                    <div className="flex items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => handleFlagDirective(item.id)}
                        disabled={flaggedIds.includes(item.id)}
                        className={`text-[11px] px-2.5 py-1 rounded font-medium transition cursor-pointer ${
                          flaggedIds.includes(item.id)
                            ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                            : 'bg-rose-600 hover:bg-rose-700 text-white shadow-xs'
                        }`}
                      >
                        {flaggedIds.includes(item.id) ? 'Directive Active ✓' : 'Issue Central Directive'}
                      </button>
                      <button
                        type="button"
                        onClick={() => onOpenDossier(item)}
                        className="text-[11px] px-2.5 py-1 rounded bg-white hover:bg-slate-200 text-slate-700 border border-slate-300 font-medium transition cursor-pointer"
                      >
                        Open Dossier
                      </button>
                    </div>
                  </div>

                  <div className="text-[11px] text-slate-600 flex flex-wrap gap-x-3 gap-y-0.5">
                    <span><strong>Location:</strong> {item.village}, {item.district}</span>
                    <span>•</span>
                    <span><strong>Extent:</strong> {item.landExtentHectares} Ha</span>
                    <span>•</span>
                    <span><strong>Unit:</strong> {item.assignedTeam}</span>
                  </div>

                  <p className="text-[11px] text-slate-700">
                    <strong className="text-rose-700">Field Anomaly:</strong> {item.anomalyReasons?.join('; ')}
                  </p>

                  {item.aiRecommendation && (
                    <div className="p-2 bg-amber-50/80 rounded-md border border-amber-200 text-[11px] text-amber-900">
                      <strong>AI Operational Recommendation:</strong> {item.aiRecommendation}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>

          {/* Operational Field Health & Directives (5 cols) */}
          <div className="lg:col-span-5 space-y-3">
            <span className="text-xs font-bold text-slate-800 uppercase tracking-wider block">
              Ground-Truthing Technology Adoption
            </span>

            <div className="p-4 bg-slate-50 rounded-xl border border-slate-200 space-y-3.5 text-xs">
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Handheld RTK DGPS Penetration</span>
                  <span className="font-bold text-emerald-700">68% (493 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-emerald-600 h-full rounded-full" style={{ width: '68%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Dense Canopy Drone LiDAR Surveys</span>
                  <span className="font-bold text-amber-700">54% (392 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-amber-500 h-full rounded-full" style={{ width: '54%' }}></div>
                </div>
              </div>

              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-semibold text-slate-700">Gram Sabha Digital Geo-Tagging Sync</span>
                  <span className="font-bold text-gov-800">89% (646 Sub-Divisions)</span>
                </div>
                <div className="w-full h-2 bg-slate-200 rounded-full overflow-hidden">
                  <div className="bg-gov-700 h-full rounded-full" style={{ width: '89%' }}></div>
                </div>
              </div>
            </div>

            {/* Ministry Statutory Directive Card */}
            <div className="p-3.5 bg-emerald-50 rounded-xl border border-emerald-200 space-y-2">
              <div className="flex items-center space-x-2">
                <Calendar className="w-4 h-4 text-emerald-700" />
                <span className="font-bold text-xs text-gov-900">
                  MoTA National Directive: 2026/04
                </span>
              </div>
              <p className="text-[11px] text-gov-800 leading-relaxed">
                All 75 high-anomaly claims across Madhya Pradesh (Bandhavgarh), Odisha (Kandhamal), and Maharashtra (Gadchiroli) are mandated for joint on-site DGPS re-verification prior to the next statutory DLC session.
              </p>
              <div className="text-[10px] text-emerald-800 bg-white/70 p-2 rounded border border-emerald-300/80 font-mono">
                Mandated SLA: 15 days for Gram Sabha &amp; SDLC compliance across all 36 States/UTs.
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
