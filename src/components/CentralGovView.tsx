import React, { useState } from 'react';
import {
  Network,
  TrendingDown,
  MousePointerClick,
  FileBarChart2
} from 'lucide-react';
import { RoleKey } from '../types';

interface CentralGovViewProps {
  onNavigateRole: (role: RoleKey) => void;
}

export const CentralGovView: React.FC<CentralGovViewProps> = ({ onNavigateRole }) => {
  const [activeBreadcrumb, setActiveBreadcrumb] = useState<'india' | 'state' | 'district' | 'claim' | 'anomaly'>('india');
  const [selectedZone, setSelectedZone] = useState<string | null>(null);

  const handleBreadcrumbClick = (crumb: 'india' | 'state' | 'district' | 'claim' | 'anomaly') => {
    setActiveBreadcrumb(crumb);
    if (crumb === 'state') {
      onNavigateRole('state');
    } else if (crumb === 'district' || crumb === 'anomaly') {
      onNavigateRole('employee');
    } else if (crumb === 'claim') {
      onNavigateRole('claimant');
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
            Pan-India Forest Rights Act compliance, title distribution, and AI anomaly tracking.
          </p>
        </div>

        {/* Drill Down Hierarchy Breadcrumbs */}
        <div className="text-xs bg-slate-100 px-3 py-1.5 rounded-lg border border-slate-200 font-mono text-slate-600 flex items-center space-x-1.5">
          <button
            onClick={() => handleBreadcrumbClick('india')}
            className={`cursor-pointer ${activeBreadcrumb === 'india' ? 'text-gov-900 font-bold' : 'hover:underline'}`}
          >
            India
          </button>
          <span>&gt;</span>
          <button
            onClick={() => handleBreadcrumbClick('state')}
            className="text-gov-800 font-bold hover:underline cursor-pointer"
          >
            State
          </button>
          <span>&gt;</span>
          <button
            onClick={() => handleBreadcrumbClick('district')}
            className="hover:underline cursor-pointer text-slate-700"
          >
            District
          </button>
          <span>&gt;</span>
          <button
            onClick={() => handleBreadcrumbClick('claim')}
            className="hover:underline cursor-pointer text-slate-700"
          >
            Claim
          </button>
          <span>&gt;</span>
          <button
            onClick={() => handleBreadcrumbClick('anomaly')}
            className="text-rose-600 font-bold hover:underline cursor-pointer"
          >
            AI Anomaly
          </button>
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
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Pan-India FRA Progress &amp; Pendency Choropleth
              </h3>
              <span className="text-[11px] text-slate-400 font-mono">Source: MoTA Central Registry</span>
            </div>

            {/* India Map Representation */}
            <div className="h-96 bg-slate-50 rounded-lg border border-slate-100 flex items-center justify-center relative overflow-hidden mt-3">
              <svg className="w-full h-full" viewBox="0 0 500 450" xmlns="http://www.w3.org/2000/svg">
                {/* Simplified India Outline */}
                <g stroke="#ffffff" strokeWidth="1.5">
                  {/* Northern Zone (J&K, HP, Uttarakhand) - Green */}
                  <polygon
                    points="180,40 220,30 250,60 260,90 220,110 180,90"
                    fill="#86efac"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => setSelectedZone('Northern Zone (78% Conferred)')}
                  >
                    <title>Northern Zone: Fast Clearance</title>
                  </polygon>

                  {/* Western Zone (Rajasthan, Gujarat) */}
                  <polygon
                    points="110,130 180,110 190,180 140,220 90,190"
                    fill="#bbf7d0"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => setSelectedZone('Western Zone (72% Conferred)')}
                  >
                    <title>Western Zone: 72% Conferred</title>
                  </polygon>

                  {/* Central Zone (Madhya Pradesh & Chhattisgarh) */}
                  <polygon
                    points="190,180 270,160 300,230 240,250 190,220"
                    fill="#fed7aa"
                    stroke="#ea580c"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => onNavigateRole('employee')}
                  >
                    <title>Madhya Pradesh: Click to View Bandhavgarh SDLC</title>
                  </polygon>
                  <text x="215" y="210" fill="#9a3412" fontSize="10" fontWeight="bold">MP / CG</text>

                  {/* Eastern Zone (Odisha, Jharkhand, West Bengal) */}
                  <polygon
                    points="270,160 340,170 360,230 300,240"
                    fill="#fed7aa"
                    stroke="#059669"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => onNavigateRole('state')}
                  >
                    <title>Odisha: Click to open State Overview</title>
                  </polygon>
                  <text x="295" y="200" fill="#065f46" fontSize="10" fontWeight="bold">Odisha</text>

                  {/* Southern Zone (Maharashtra, Karnataka, Kerala, TN) */}
                  <polygon
                    points="140,220 240,250 220,380 170,390 140,280"
                    fill="#fecaca"
                    stroke="#dc2626"
                    strokeWidth="2"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => setSelectedZone('Southern Zone (High pending backlog - 42% conferred)')}
                  >
                    <title>Maharashtra &amp; Kerala: High Pending Backlogs</title>
                  </polygon>
                  <text x="165" y="300" fill="#991b1b" fontSize="10" fontWeight="bold">MH &amp; South</text>

                  {/* North East Zone (Assam, Tripura, Arunachal) */}
                  <polygon
                    points="360,140 430,120 460,160 390,180"
                    fill="#86efac"
                    className="cursor-pointer hover:opacity-80 transition"
                    onClick={() => setSelectedZone('North East Zone (High CFR Rights - 86% Conferred)')}
                  >
                    <title>North East: High Community Rights (CFR)</title>
                  </polygon>
                  <text x="385" y="155" fill="#14532d" fontSize="9" fontWeight="bold">NE Zone</text>
                </g>
              </svg>

              {/* Click hint popup */}
              <div className="absolute bottom-3 right-3 bg-white/95 px-3 py-1.5 rounded-lg border border-slate-200 shadow text-xs flex items-center space-x-2">
                <MousePointerClick className="w-3.5 h-3.5 text-emerald-600 animate-bounce" />
                <span className="font-medium text-slate-700">
                  Click on <strong>Odisha</strong> or <strong>MP</strong> to drill down into district maps
                </span>
              </div>
            </div>
          </div>

          {selectedZone && (
            <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-xs text-gov-900 flex items-center justify-between">
              <span><strong>Selected Zone:</strong> {selectedZone}</span>
              <button onClick={() => setSelectedZone(null)} className="text-slate-400 hover:text-slate-600 text-xs">✕</button>
            </div>
          )}
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
    </section>
  );
};
