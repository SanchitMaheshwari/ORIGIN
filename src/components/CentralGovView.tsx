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
  Calendar,
  MapPin,
  Clock,
  Send,
  Building2
} from 'lucide-react';
import { RoleKey, ClaimRecord } from '../types';
import { PanIndiaMap } from './PanIndiaMap';
import { DossierPreview } from './DossierPreview';
import { PRIORITY_CLAIMS_QUEUE } from '../data/mockData';
import { INDIA_STATES, INDIA_DISTRICTS, StateGeoItem } from '../data/indiaGeoData';

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
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(null);
  const [selectedMapState, setSelectedMapState] = useState<StateGeoItem>(() => {
    return INDIA_STATES.find(s => s.state === 'Uttar Pradesh') || INDIA_STATES.find(s => s.state === 'Karnataka') || INDIA_STATES[0];
  });

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
          <span>28 States &amp; 8 UTs</span>
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
          <PanIndiaMap
            onSelectState={setSelectedMapState}
            selectedStateName={selectedMapState?.state}
          />
        </div>

        {/* Dedicated Interactive State Information Block (5 cols) */}
        <div className="lg:col-span-5 flex flex-col space-y-4">
          <div className="glass-card p-4 space-y-4 flex-1 flex flex-col justify-between" id="state-info-inspector">
            <div>
              {/* Header with State Name, Code, and Badges */}
              <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-100">
                <div className="flex items-center gap-2.5">
                  <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-sm shadow-xs" style={{ background: 'rgba(118,196,87,0.18)', color: '#2A7C13' }}>
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <h2 className="text-base font-extrabold text-[#1C2B22] leading-tight">
                        {selectedMapState.state}
                      </h2>
                      <span className="text-[10px] font-mono font-semibold px-2 py-0.5 rounded bg-slate-100 text-slate-700 border border-slate-200">
                        Code {selectedMapState.stCode}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-500 font-medium mt-0.5">
                      {selectedMapState.districtCount} Districts • MoTA Central Telemetry
                    </p>
                  </div>
                </div>

                {/* Dynamic Status Badge */}
                <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full border whitespace-nowrap ${
                  selectedMapState.anomalyFlags > 300
                    ? 'bg-rose-50 text-rose-700 border-rose-200'
                    : selectedMapState.pendingClaims > 15000
                      ? 'bg-amber-50 text-amber-700 border-amber-200'
                      : 'bg-emerald-50 text-emerald-700 border-emerald-200'
                }`}>
                  {selectedMapState.anomalyFlags > 300 ? 'High Anomaly' : selectedMapState.pendingClaims > 15000 ? 'Backlog Priority' : 'Active Compliance'}
                </span>
              </div>

              {/* State Quick Switch Dropdown */}
              <div className="mt-3">
                <div className="flex items-center justify-between mb-1">
                  <label htmlFor="state-select-dropdown" className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                    State Telemetry Focus (Click Map or Select)
                  </label>
                  <span className="text-[10px] text-emerald-700 font-semibold flex items-center gap-1">
                    <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                    Interactive Live GIS
                  </span>
                </div>
                <select
                  id="state-select-dropdown"
                  value={selectedMapState.state}
                  onChange={(e) => {
                    const st = INDIA_STATES.find(s => s.state === e.target.value);
                    if (st) setSelectedMapState(st);
                  }}
                  className="w-full text-xs font-semibold text-slate-800 bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 focus:outline-none focus:ring-1 focus:ring-[#2A7C13] cursor-pointer"
                >
                  {INDIA_STATES.map((s) => (
                    <option key={s.state} value={s.state}>
                      {s.state} ({s.districtCount} Districts • {s.conferredRate}% Conferred)
                    </option>
                  ))}
                </select>
              </div>

              {/* 4 Core Metrics Grid */}
              <div className="grid grid-cols-2 gap-2.5 mt-3.5">
                <div className="p-3 rounded-xl border border-slate-100" style={{ background: 'rgba(240,247,236,0.6)' }}>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider">Total Claims</span>
                    <FileText className="w-3.5 h-3.5 text-slate-400" />
                  </div>
                  <div className="text-lg font-black text-slate-900 mt-1">
                    {selectedMapState.totalClaims.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-slate-500 font-medium">Individual &amp; CFR titles</span>
                </div>

                <div className="p-3 rounded-xl border border-emerald-100 bg-emerald-50/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-emerald-800 uppercase tracking-wider">Conferred %</span>
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                  </div>
                  <div className="text-lg font-black text-emerald-700 mt-1">
                    {selectedMapState.conferredRate}%
                  </div>
                  <span className="text-[10px] text-emerald-700 font-medium">
                    {Math.round(selectedMapState.totalClaims * selectedMapState.conferredRate / 100).toLocaleString()} Titles Conferred
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-amber-100 bg-amber-50/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-amber-800 uppercase tracking-wider">Pending Backlog</span>
                    <Clock className="w-3.5 h-3.5 text-amber-600" />
                  </div>
                  <div className="text-lg font-black text-amber-700 mt-1">
                    {selectedMapState.pendingClaims.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-amber-700 font-medium">
                    {((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100).toFixed(1)}% of total claims
                  </span>
                </div>

                <div className="p-3 rounded-xl border border-rose-100 bg-rose-50/60">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-bold text-rose-800 uppercase tracking-wider">AI Anomalies</span>
                    <AlertTriangle className="w-3.5 h-3.5 text-rose-600" />
                  </div>
                  <div className="text-lg font-black text-rose-700 mt-1">
                    {selectedMapState.anomalyFlags.toLocaleString()}
                  </div>
                  <span className="text-[10px] text-rose-700 font-medium">Satellite overlap flags</span>
                </div>
              </div>

              {/* Progress Breakdown Bar */}
              <div className="mt-3.5 p-3 rounded-xl border border-slate-100 bg-slate-50/70 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-700">Claim Resolution Breakdown</span>
                  <span className="text-slate-500 font-mono text-[10px]">100% Total Universe</span>
                </div>
                
                {/* Multi-segment bar */}
                <div className="w-full h-2.5 rounded-full overflow-hidden flex bg-slate-200">
                  <div
                    className="h-full bg-emerald-500 transition-all duration-300"
                    style={{ width: `${selectedMapState.conferredRate}%` }}
                    title={`Conferred: ${selectedMapState.conferredRate}%`}
                  />
                  <div
                    className="h-full bg-amber-400 transition-all duration-300"
                    style={{ width: `${Math.min(100 - selectedMapState.conferredRate, Math.round((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100))}%` }}
                    title={`Pending: ${Math.round((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100)}%`}
                  />
                  <div
                    className="h-full bg-rose-400 transition-all duration-300"
                    style={{ width: `${Math.max(0, 100 - selectedMapState.conferredRate - Math.round((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100))}%` }}
                    title="Under Review / Rejected"
                  />
                </div>

                <div className="flex items-center justify-between text-[10px] text-slate-600 pt-0.5">
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
                    <span>Conferred ({selectedMapState.conferredRate}%)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-amber-400"></span>
                    <span>Pending ({Math.round((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100)}%)</span>
                  </span>
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-rose-400"></span>
                    <span>Review/Other ({Math.max(0, 100 - selectedMapState.conferredRate - Math.round((selectedMapState.pendingClaims / selectedMapState.totalClaims) * 100))}%)</span>
                  </span>
                </div>
              </div>

              {/* Leading Districts in State */}
              <div className="mt-3.5 space-y-2">
                <div className="flex justify-between items-center text-[11px]">
                  <span className="font-bold text-slate-700">Top Districts by Claim Volume in {selectedMapState.state}</span>
                  <span className="text-[10px] text-slate-400">Sample Telemetry</span>
                </div>
                <div className="space-y-1.5">
                  {INDIA_DISTRICTS
                    .filter(d => d.state === selectedMapState.state)
                    .sort((a, b) => b.totalClaims - a.totalClaims)
                    .slice(0, 3)
                    .map((dt) => (
                      <div key={dt.id} className="flex items-center justify-between text-xs bg-white border border-slate-100 rounded-lg px-2.5 py-1.5 shadow-2xs">
                        <div>
                          <span className="font-semibold text-slate-800">{dt.district}</span>
                          <span className="text-[10px] text-slate-400 ml-1.5 font-mono">DT-{dt.dtCode}</span>
                        </div>
                        <div className="flex items-center gap-2.5 text-[11px]">
                          <span className="text-slate-500">{dt.totalClaims.toLocaleString()} claims</span>
                          <span className="font-bold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded text-[10px]">
                            {dt.conferredRate}%
                          </span>
                          <span className="font-medium text-amber-700 text-[10px]">
                            {dt.pendingClaims.toLocaleString()} pend.
                          </span>
                        </div>
                      </div>
                    ))}
                </div>
              </div>
            </div>

            {/* Central Directive Action Button */}
            <div className="pt-2 border-t border-slate-100">
              <button
                type="button"
                onClick={() => {
                  setBannerMsg(`Central MoTA Statutory Directive dispatched to ${selectedMapState.state} State Level Committee (DLC/SDLC): Joint DGPS boundary validation mandated.`);
                  setTimeout(() => setBannerMsg(null), 5000);
                }}
                className="w-full py-2 px-3 rounded-lg bg-gov-900 hover:bg-gov-800 text-white font-semibold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Issue MoTA Compliance Directive to {selectedMapState.state}</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Comparative State Trends & National Anomaly Velocity (Shifted Below Map) */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                  onClick={() => setSelectedClaim(item)}
                  className={`glass-strip glass-strip-rose p-3.5 sm:p-4 space-y-2.5 transition-all duration-200 cursor-pointer ${
                    selectedClaim?.id === item.id
                      ? 'ring-2 ring-[#2A7C13] shadow-md bg-white border-[#2A7C13]/50'
                      : 'hover:border-slate-300'
                  }`}
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
                        onClick={(e) => {
                          e.stopPropagation();
                          handleFlagDirective(item.id);
                        }}
                        disabled={flaggedIds.includes(item.id)}
                        className="btn-directive"
                      >
                        {flaggedIds.includes(item.id) ? 'Directive Active ✓' : 'Issue Central Directive'}
                      </button>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          setSelectedClaim(item);
                        }}
                        className={`btn-dossier transition-all ${
                          selectedClaim?.id === item.id
                            ? 'bg-emerald-700 text-white font-bold ring-2 ring-emerald-400'
                            : ''
                        }`}
                      >
                        {selectedClaim?.id === item.id ? 'Viewing Dossier ✓' : 'Open Dossier'}
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

          {/* Right-Hand Dynamic Dossier Preview Pane (5 cols / ~40%) */}
          <div className="lg:col-span-5 space-y-3 sticky top-4 self-start" id="dossier-preview-pane">
            <DossierPreview
              selectedClaim={selectedClaim}
              onClose={() => setSelectedClaim(null)}
              onExportPdf={(claim) => {
                setBannerMsg(`Official Case Dossier PDF exported for ${claim.plotId} (${claim.claimantName}). Verification SHA256-${claim.id.slice(-6)} logged.`);
                setTimeout(() => setBannerMsg(null), 5000);
              }}
              onIssueDirective={handleFlagDirective}
              isDirectiveActive={selectedClaim ? flaggedIds.includes(selectedClaim.id) : false}
              onOpenFullModal={onOpenDossier}
            />

            {/* Ground-Truthing Technology Adoption (Compact Telemetry Widget) */}
            <div className="glass-card p-3.5 space-y-2.5 text-xs">
              <div className="flex items-center justify-between">
                <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block">
                  Ground-Truthing Technology Adoption
                </span>
                <span className="text-[10px] font-semibold text-[#2A7C13]">Sub-Divisional SLA</span>
              </div>

              <div className="space-y-2">
                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700">Handheld RTK DGPS</span>
                    <span className="font-bold text-[#2A7C13]">68% (493 Units)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full rounded-full bg-[#2A7C13]" style={{ width: '68%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700">Canopy Drone LiDAR</span>
                    <span className="font-bold text-amber-700">54% (392 Units)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full rounded-full bg-amber-500" style={{ width: '54%' }}></div>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between text-[11px] mb-1">
                    <span className="font-semibold text-slate-700">Gram Sabha Geo-Tag Sync</span>
                    <span className="font-bold text-[#2A7C13]">89% (646 Units)</span>
                  </div>
                  <div className="w-full h-1.5 rounded-full overflow-hidden bg-slate-100">
                    <div className="h-full rounded-full bg-[#2A7C13]" style={{ width: '89%' }}></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
