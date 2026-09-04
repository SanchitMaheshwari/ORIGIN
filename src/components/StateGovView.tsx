import React, { useState } from 'react';
import {
  Mountain,
  FileSpreadsheet,
  Brain,
  ChevronRight,
  Info,
  CheckCircle2,
  AlertOctagon,
  Satellite,
  ArrowRight
} from 'lucide-react';
import { ODISHA_DISTRICTS } from '../data/mockData';
import { DistrictMetric, ClaimRecord } from '../types';
import { SdlcFieldGisConsole } from './SdlcFieldGisConsole';

interface StateGovViewProps {
  onExportReport: () => void;
  onOpenDossier: (claim: ClaimRecord) => void;
  onFlagForDlc: (claimId: string) => void;
  onDrillDownDistrict?: (district: DistrictMetric) => void;
}

export const StateGovView: React.FC<StateGovViewProps> = ({
  onExportReport,
  onOpenDossier,
  onFlagForDlc,
  onDrillDownDistrict
}) => {
  const [activeState, setActiveState] = useState<'odisha' | 'mp'>('odisha');
  const [subTab, setSubTab] = useState<'overview' | 'sdlc'>('overview');
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric | null>(ODISHA_DISTRICTS[4]); // Kandhamal default
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  return (
    <section className="space-y-6 animate-in fade-in duration-200" id="view-state">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-3 pb-2 border-b border-slate-200">
        <div>
          <div className="flex items-center space-x-2">
            <h1 className="text-xl font-bold text-gov-900 flex items-center space-x-2">
              <Mountain className="w-5 h-5 text-emerald-600" />
              <span>State Level Monitoring Committee (SLMC) - State Overview</span>
            </h1>
            <div className="inline-flex rounded-lg border border-slate-300 p-0.5 bg-slate-100 text-xs">
              <button
                onClick={() => setActiveState('odisha')}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  activeState === 'odisha' ? 'bg-white text-gov-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Odisha
              </button>
              <button
                onClick={() => setActiveState('mp')}
                className={`px-2 py-0.5 rounded font-semibold transition ${
                  activeState === 'mp' ? 'bg-white text-gov-900 shadow-sm' : 'text-slate-600 hover:text-slate-900'
                }`}
              >
                Madhya Pradesh
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Comprehensive FRA implementation progress and AI bottleneck diagnosis for <strong>{activeState === 'odisha' ? 'Odisha State Tribal Welfare Department' : 'Madhya Pradesh Forest Department'}</strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tab Switcher: Overview vs SDLC Field Operations */}
          <div className="flex bg-slate-100 p-0.5 rounded-lg border border-slate-200 text-xs font-semibold">
            <button
              onClick={() => setSubTab('overview')}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition cursor-pointer ${
                subTab === 'overview'
                  ? 'bg-white text-gov-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Mountain className="w-3.5 h-3.5 text-emerald-600" />
              <span>1. State SLMC Overview</span>
            </button>
            <button
              onClick={() => setSubTab('sdlc')}
              className={`px-3 py-1.5 rounded-md flex items-center space-x-1.5 transition cursor-pointer ${
                subTab === 'sdlc'
                  ? 'bg-white text-gov-900 shadow-xs'
                  : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              <Satellite className="w-3.5 h-3.5 text-emerald-600" />
              <span>2. SDLC Field Operations &amp; GIS</span>
            </button>
          </div>

          <button
            onClick={onExportReport}
            className="text-xs font-bold px-3 py-1.5 bg-gov-800 text-white rounded-lg hover:bg-gov-900 shadow-sm flex items-center space-x-1.5 transition active:scale-95 cursor-pointer"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {subTab === 'sdlc' ? (
        <SdlcFieldGisConsole
          activeState={activeState}
          initialDistrict={activeState === 'odisha' ? 'Mayurbhanj' : 'Bandhavgarh (Umaria)'}
          onOpenDossier={onOpenDossier}
          onFlagForDlc={onFlagForDlc}
        />
      ) : (
        <>
          {/* State Level KPI Strip (6 items) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3">
        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Total State Claims</span>
          <div className="text-2xl font-black text-slate-900 mt-1">
            {activeState === 'odisha' ? '28,500' : '76,000'}
          </div>
          <span className="text-[10px] text-emerald-600 font-medium">94% Digital Enrolled</span>
        </div>

        <div className="bg-emerald-50 p-3.5 rounded-xl border border-emerald-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-emerald-800">Titles Conferred</span>
          <div className="text-2xl font-black text-gov-900 mt-1">
            {activeState === 'odisha' ? '15,200' : '38,760'}
          </div>
          <span className="text-[10px] text-gov-700 font-medium">
            {activeState === 'odisha' ? '53.3%' : '51.0%'} clearance
          </span>
        </div>

        <div className="bg-amber-50 p-3.5 rounded-xl border border-amber-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-amber-800">Pending</span>
          <div className="text-2xl font-black text-amber-700 mt-1">
            {activeState === 'odisha' ? '10,100' : '32,400'}
          </div>
          <span className="text-[10px] text-amber-600 font-medium">Avg delay: 92 days</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Rejection Rate</span>
          <div className="text-2xl font-black text-slate-800 mt-1">3%</div>
          <span className="text-[10px] text-slate-400 font-medium">Below national avg</span>
        </div>

        <div className="bg-rose-50 p-3.5 rounded-xl border border-rose-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-rose-800">AI Anomaly Cases</span>
          <div className="text-2xl font-black text-rose-600 mt-1">
            {activeState === 'odisha' ? '480' : '1,120'}
          </div>
          <span className="text-[10px] text-rose-700 font-medium">Requires field checks</span>
        </div>

        <div className="bg-white p-3.5 rounded-xl border border-slate-200 shadow-sm">
          <span className="text-[10px] uppercase font-bold text-slate-400">Priority Districts</span>
          <div className="text-2xl font-black text-gov-800 mt-1">5</div>
          <span className="text-[10px] text-rose-600 font-medium">Special drive active</span>
        </div>
      </div>

      {/* State Graphic Split: Odisha Boundary Map + District Analytics */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* State WebGIS Map (7 cols) */}
        <div className="lg:col-span-7 bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between border-b border-slate-100 pb-2">
              <div>
                <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                  State Spatial Distribution: {activeState === 'odisha' ? 'Odisha Forest Divisions' : 'MP Central & Forest Circles'}
                </h3>
                <p className="text-[11px] text-slate-400">
                  Choropleth map displaying pending titles and anomaly clusters by district
                </p>
              </div>
              <span className="text-xs bg-emerald-100 text-gov-800 px-2.5 py-0.5 rounded-full font-bold">
                Interactive GIS
              </span>
            </div>

            {/* Simulated District Map of Odisha */}
            <div className="h-80 bg-emerald-50/40 rounded-lg relative overflow-hidden border border-emerald-100 flex items-center justify-center mt-3">
              <svg className="w-full h-full" viewBox="0 0 500 350" xmlns="http://www.w3.org/2000/svg">
                {/* Mayurbhanj (North) - Orange */}
                <polygon
                  points="320,30 380,45 420,100 360,130 310,90"
                  fill={hoveredDistrict === 'mayurbhanj' ? '#fdba74' : '#fed7aa'}
                  stroke="#ea580c"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('mayurbhanj')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[1])}
                >
                  <title>Mayurbhanj: 2,420 Pending | 65 Anomaly Flags</title>
                </polygon>
                <text x="340" y="80" fill="#9a3412" fontSize="9" fontWeight="bold">Mayurbhanj</text>

                {/* Sundargarh (NW) - Fast clearance (Green) */}
                <polygon
                  points="190,40 310,90 290,140 180,110 150,60"
                  fill={hoveredDistrict === 'sundargarh' ? '#86efac' : '#bbf7d0'}
                  stroke="#16a34a"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('sundargarh')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[0])}
                >
                  <title>Sundargarh: 88% Clearance</title>
                </polygon>
                <text x="210" y="85" fill="#166534" fontSize="9" fontWeight="bold">Sundargarh</text>

                {/* Keonjhar (Central North) - Green */}
                <polygon
                  points="290,140 360,130 340,190 270,180"
                  fill={hoveredDistrict === 'keonjhar' ? '#86efac' : '#bbf7d0'}
                  stroke="#16a34a"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('keonjhar')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[2])}
                />
                <text x="290" y="160" fill="#166534" fontSize="8.5" fontWeight="bold">Keonjhar</text>

                {/* Sambalpur / Bargarh (West) - Orange */}
                <polygon
                  points="140,120 220,130 200,210 110,180"
                  fill={hoveredDistrict === 'sambalpur' ? '#fdba74' : '#fed7aa'}
                  stroke="#ea580c"
                  strokeWidth="1.5"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('sambalpur')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[3])}
                />
                <text x="135" y="160" fill="#9a3412" fontSize="8.5" fontWeight="bold">Sambalpur</text>

                {/* Kandhamal (Central) - High Anomaly (Red hotspot) */}
                <polygon
                  points="190,215 270,210 250,280 170,270"
                  fill={hoveredDistrict === 'kandhamal' ? '#f87171' : '#fecaca'}
                  stroke="#dc2626"
                  strokeWidth="2.5"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('kandhamal')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[4])}
                >
                  <title>Kandhamal: Hotspot! 140 Boundary Overlaps</title>
                </polygon>
                <text x="195" y="245" fill="#991b1b" fontSize="9" fontWeight="bold">Kandhamal (Hotspot)</text>

                {/* Koraput / Malkangiri (South) - Red */}
                <polygon
                  points="120,260 170,270 160,340 70,330"
                  fill={hoveredDistrict === 'koraput' ? '#f87171' : '#fecaca'}
                  stroke="#dc2626"
                  strokeWidth="1.8"
                  className="cursor-pointer transition-colors"
                  onMouseEnter={() => setHoveredDistrict('koraput')}
                  onMouseLeave={() => setHoveredDistrict(null)}
                  onClick={() => setSelectedDistrict(ODISHA_DISTRICTS[5])}
                />
                <text x="95" y="300" fill="#991b1b" fontSize="9" fontWeight="bold">Koraput</text>

                {/* Coastal Districts (Cuttack, Puri, Ganjam) - Green Fast */}
                <polygon
                  points="270,180 340,190 390,260 300,280 250,220"
                  fill="#86efac"
                  stroke="#15803d"
                  strokeWidth="1.5"
                  className="cursor-pointer hover:opacity-80"
                />
                <text x="290" y="230" fill="#14532d" fontSize="8.5" fontWeight="bold">Coastal Divisions</text>

                {/* Bay of Bengal label */}
                <path d="M 370 200 Q 420 280 400 340" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                <text x="380" y="320" fill="#0284c7" fontSize="10" fontWeight="bold" opacity="0.6">Bay of Bengal</text>
              </svg>

              {/* Map Floating Mini Legend */}
              <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur px-2.5 py-1.5 rounded-lg border border-slate-200 text-[10px] space-y-1 shadow-sm">
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-2 bg-green-300 border border-green-600 inline-block rounded-xs"></span>
                  <span>Normal Clearance (&gt;75%)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-2 bg-amber-200 border border-amber-600 inline-block rounded-xs"></span>
                  <span>SDLC Backlog (&gt;90d Delay)</span>
                </div>
                <div className="flex items-center space-x-1.5">
                  <span className="w-3 h-2 bg-red-200 border border-red-600 inline-block rounded-xs"></span>
                  <span>AI Anomaly Hotspot (&gt;50 Flags)</span>
                </div>
              </div>
            </div>
          </div>

          {/* Selected District Info Bar */}
          {selectedDistrict && (
            <div className="mt-2 p-2.5 bg-slate-50 border border-slate-200 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs">
              <div className="flex items-center space-x-2">
                <span className="font-bold text-slate-800">{selectedDistrict.name} District:</span>
                <span className="text-slate-600">
                  {selectedDistrict.conferredClaims} titles conferred ({selectedDistrict.conferredRate}%), {selectedDistrict.anomalyFlags} anomaly flags
                </span>
                <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                  selectedDistrict.statusType === 'clearance'
                    ? 'bg-emerald-100 text-emerald-800'
                    : selectedDistrict.statusType === 'hotspot'
                    ? 'bg-rose-100 text-rose-800'
                    : 'bg-amber-100 text-amber-800'
                }`}>
                  {selectedDistrict.statusType.toUpperCase()}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSubTab('sdlc')}
                className="inline-flex items-center space-x-1 text-[11px] font-bold text-emerald-700 hover:text-emerald-900 bg-emerald-50 px-2.5 py-1 rounded border border-emerald-200 hover:bg-emerald-100 transition cursor-pointer shrink-0"
              >
                <span>Inspect SDLC Field GIS</span>
                <ArrowRight className="w-3 h-3" />
              </button>
            </div>
          )}

          <p className="text-[11px] text-slate-500 italic mt-1">
            Click on any district boundary to inspect Sub-Divisions and individual village forest polygons.
          </p>
        </div>

        {/* District Statistics & Processing Bottlenecks (5 cols) */}
        <div className="lg:col-span-5 space-y-4">
          {/* District-wise Clearance Chart Card */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
              District-Wise Status Comparison
            </h3>

            <div className="space-y-3 text-xs">
              {/* Sundargarh */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Sundargarh</span>
                  <span className="text-slate-500">82% Conferred (4,100 / 5,000)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '82%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '14%' }}></div>
                  <div className="bg-rose-500 h-full" style={{ width: '4%' }}></div>
                </div>
              </div>

              {/* Mayurbhanj */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Mayurbhanj</span>
                  <span className="text-slate-500">54% Conferred (3,240 / 6,000)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '54%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '38%' }}></div>
                  <div className="bg-rose-500 h-full" style={{ width: '8%' }}></div>
                </div>
              </div>

              {/* Kandhamal */}
              <div>
                <div className="flex justify-between text-[11px] mb-1">
                  <span className="font-bold text-slate-700">Kandhamal</span>
                  <span className="text-slate-500">41% Conferred (1,850 / 4,500)</span>
                </div>
                <div className="w-full h-2.5 bg-slate-100 rounded-full overflow-hidden flex">
                  <div className="bg-emerald-500 h-full" style={{ width: '41%' }}></div>
                  <div className="bg-amber-400 h-full" style={{ width: '44%' }}></div>
                  <div className="bg-rose-500 h-full" style={{ width: '15%' }}></div>
                </div>
              </div>
            </div>
          </div>

          {/* AI State Bottleneck Diagnosis */}
          <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-2">
            <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide flex items-center space-x-1.5">
              <Brain className="w-4 h-4 text-purple-600" />
              <span>Processing Bottlenecks &amp; AI Anomaly Breakdown</span>
            </h3>

            <div className="grid grid-cols-3 gap-2 text-center pt-1">
              <div className="p-2 bg-slate-50 rounded-lg border border-slate-200">
                <span className="text-[10px] font-bold text-slate-500 block">Delay &gt;180d</span>
                <span className="text-base font-extrabold text-slate-800">62%</span>
              </div>
              <div className="p-2 bg-amber-50 rounded-lg border border-amber-200">
                <span className="text-[10px] font-bold text-amber-800 block">Overlap</span>
                <span className="text-base font-extrabold text-amber-700">23%</span>
              </div>
              <div className="p-2 bg-rose-50 rounded-lg border border-rose-200">
                <span className="text-[10px] font-bold text-rose-800 block">Land Mismatch</span>
                <span className="text-base font-extrabold text-rose-600">15%</span>
              </div>
            </div>

            <div className="p-2.5 bg-emerald-50/70 rounded-lg border border-emerald-200 text-[11px] text-gov-800 mt-2">
              <strong>State Recommendation:</strong> Deploy mobile SDLC drone mapping camps to Mayurbhanj &amp; Kandhamal to resolve 238 boundary overlap cases before the quarterly review.
            </div>
          </div>
        </div>
      </div>
    </>
  )}
</section>
  );
};
