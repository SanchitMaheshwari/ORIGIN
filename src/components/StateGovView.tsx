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
  ArrowRight,
  Layers,
  MapPin
} from 'lucide-react';
import { KARNATAKA_DISTRICTS, TELANGANA_DISTRICTS } from '../data/mockData';
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
  const [activeState, setActiveState] = useState<'karnataka' | 'telangana'>('karnataka');
  const [subTab, setSubTab] = useState<'overview' | 'sdlc'>('overview');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const currentDistricts = activeState === 'karnataka' ? KARNATAKA_DISTRICTS : TELANGANA_DISTRICTS;
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric>(currentDistricts[0]);

  const handleSwitchState = (st: 'karnataka' | 'telangana') => {
    setActiveState(st);
    const newDistricts = st === 'karnataka' ? KARNATAKA_DISTRICTS : TELANGANA_DISTRICTS;
    setSelectedDistrict(newDistricts[0]);
  };

  return (
    <section className="space-y-5 animate-fade-slide-up" id="view-state">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold text-[#1C2B22] flex items-center gap-2">
              <Mountain className="w-4.5 h-4.5 text-[#2A7C13]" />
              <span>State Level Monitoring Committee (SLMC) – State Overview</span>
            </h1>
            <div className="glass-tabs flex text-xs">
              <button
                type="button"
                id="btn-state-karnataka"
                onClick={() => handleSwitchState('karnataka')}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-xs ${
                  activeState === 'karnataka'
                    ? 'glass-tab-active text-[#2A7C13]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Karnataka
              </button>
              <button
                type="button"
                id="btn-state-telangana"
                onClick={() => handleSwitchState('telangana')}
                className={`px-3 py-1.5 rounded-md font-semibold transition cursor-pointer text-xs ${
                  activeState === 'telangana'
                    ? 'glass-tab-active text-[#2A7C13]'
                    : 'text-slate-500 hover:text-slate-800'
                }`}
              >
                Telangana
              </button>
            </div>
          </div>
          <p className="text-xs text-slate-500 mt-0.5">
            Official Ministry of Tribal Affairs dataset &amp; AI bottleneck diagnosis for{' '}
            <strong className="text-[#1C2B22]">
              {activeState === 'karnataka'
                ? 'Karnataka State Tribal Welfare & Forest Department'
                : 'Telangana State Tribal Welfare & Forest Department'}
            </strong>.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          {/* Sub-tab Switcher: Overview vs SDLC Field Operations */}
          <div className="glass-tabs flex text-xs font-semibold">
            <button
              type="button"
              onClick={() => setSubTab('overview')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                subTab === 'overview'
                  ? 'glass-tab-active text-[#2A7C13]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Mountain className="w-3.5 h-3.5" />
              <span>1. State SLMC Overview</span>
            </button>
            <button
              type="button"
              onClick={() => setSubTab('sdlc')}
              className={`px-3 py-1.5 rounded-md flex items-center gap-1.5 transition cursor-pointer ${
                subTab === 'sdlc'
                  ? 'glass-tab-active text-[#2A7C13]'
                  : 'text-slate-500 hover:text-slate-800'
              }`}
            >
              <Satellite className="w-3.5 h-3.5" />
              <span>2. SDLC Field Operations &amp; GIS</span>
            </button>
          </div>

          <button
            type="button"
            onClick={onExportReport}
            className="btn-primary"
          >
            <FileSpreadsheet className="w-3.5 h-3.5" />
            <span>Export Report</span>
          </button>
        </div>
      </div>

      {subTab === 'sdlc' ? (
        <SdlcFieldGisConsole
          activeState={activeState}
          initialDistrict={
            activeState === 'karnataka'
              ? 'Shimoga (Sagar Sub-Division)'
              : 'Bhadradri Kothagudem (Kothagudem Sub-Division)'
          }
          onOpenDossier={onOpenDossier}
          onFlagForDlc={onFlagForDlc}
        />
      ) : (
        <>
          {/* State Level KPI Strip (6 items) */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3.5">
            <div className="glass-stat">
              <span className="section-label">Total State Claims</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-[#1C2B22] tracking-tight leading-none">
                  {activeState === 'karnataka' ? '295,176' : '655,249'}
                </div>
                <span className="text-[11px] text-[#2A7C13] font-semibold mt-1.5 block leading-tight">
                  {activeState === 'karnataka' ? '289k IFR • 5.9k CFR' : '651k IFR • 3.4k CFR'}
                </span>
              </div>
            </div>

            <div className="glass-stat-cream">
              <span className="section-label text-[#2A7C13]">Titles Conferred</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-[#2A7C13] tracking-tight leading-none">
                  {activeState === 'karnataka' ? '16,700' : '231,456'}
                </div>
                <span className="text-[11px] text-[#2A7C13] font-semibold mt-1.5 block leading-tight">
                  {activeState === 'karnataka' ? '5.7% title rate' : '35.3% title rate'}
                </span>
              </div>
            </div>

            <div className="glass-stat-beige">
              <span className="section-label text-amber-800">Pending Backlog</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-amber-900 tracking-tight leading-none">
                  {activeState === 'karnataka' ? '15,850' : '329,367'}
                </div>
                <span className="text-[11px] text-amber-800 font-semibold mt-1.5 block leading-tight">
                  {activeState === 'karnataka' ? 'Avg delay: 184 days' : '50.3% pending rate'}
                </span>
              </div>
            </div>

            <div className="glass-stat-rose">
              <span className="section-label text-rose-800">Claims Rejected</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-rose-700 tracking-tight leading-none">
                  {activeState === 'karnataka' ? '262,626' : '94,426'}
                </div>
                <span className="text-[11px] text-rose-700 font-semibold mt-1.5 block leading-tight">
                  {activeState === 'karnataka' ? '89.0% Rejection Rate' : '14.4% rejection rate'}
                </span>
              </div>
            </div>

            <div className="glass-stat-rose">
              <span className="section-label text-rose-800">AI Anomaly Cases</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-rose-700 tracking-tight leading-none">
                  {activeState === 'karnataka' ? '1,240' : '2,840'}
                </div>
                <span className="text-[11px] text-rose-700 font-semibold mt-1.5 block leading-tight">
                  {activeState === 'karnataka' ? 'Western Ghats Overlaps' : 'Podu Land Boundary Flags'}
                </span>
              </div>
            </div>

            <div className="glass-stat">
              <span className="section-label text-[#2A7C13]">Priority Districts</span>
              <div className="mt-2 flex flex-col justify-end">
                <div className="text-2xl sm:text-[26px] font-black text-[#2A7C13] tracking-tight leading-none">
                  {activeState === 'karnataka' ? '6' : '7'}
                </div>
                <span className="text-[11px] text-rose-700 font-semibold mt-1.5 block leading-tight">Special SDLC drive active</span>
              </div>
            </div>
          </div>

          {/* State Graphic Split: Boundary Map + District Analytics */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-5">
            {/* State WebGIS Map (7 cols) */}
            <div className="lg:col-span-7 glass-panel p-4 space-y-3 flex flex-col justify-between">
              <div>
                <div className="glass-card-header">
                  <div>
                    <h3 className="text-xs font-bold text-[#1C2B22]">
                      State Spatial Distribution:{' '}
                      {activeState === 'karnataka'
                        ? 'Karnataka Forest Divisions & Western Ghats'
                        : 'Telangana Forest Divisions & Agency Tracts'}
                    </h3>
                    <p className="text-[11px] text-slate-400 mt-0.5">
                      Choropleth WebGIS showing official district claims, pending backlogs, and AI anomaly clusters
                    </p>
                  </div>
                  <span className="badge-green">Official WebGIS</span>
                </div>

                {/* SVG Choropleth Map for Selected State */}
                <div className="h-80 bg-emerald-50/40 rounded-lg relative overflow-hidden border border-emerald-100 flex items-center justify-center mt-3">
                  {activeState === 'karnataka' ? (
                    /* KARNATAKA CHOROPLETH SVG */
                    <svg className="w-full h-full" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                      {/* Belgaum (NW) - Orange Backlog */}
                      <polygon
                        points="110,25 220,30 200,95 100,90"
                        fill={hoveredDistrict === 'belgaum' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('belgaum')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[3])}
                      >
                        <title>Belgaum: 17,424 claims | 551 titles | 16,873 rejected</title>
                      </polygon>
                      <text x="125" y="65" fill="#9a3412" fontSize="9" fontWeight="bold">Belgaum (Belagavi)</text>

                      {/* Bagalakote (North) - Orange */}
                      <polygon
                        points="220,30 330,35 310,105 200,95"
                        fill={hoveredDistrict === 'bagalakote' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('bagalakote')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[4])}
                      >
                        <title>Bagalakote: 11,931 claims | 88 titles | 11,843 rejected</title>
                      </polygon>
                      <text x="235" y="70" fill="#9a3412" fontSize="9" fontWeight="bold">Bagalakote</text>

                      {/* Uttara Kannada (Coastal Ghats) - Hotspot Red */}
                      <polygon
                        points="90,95 180,95 170,185 80,180"
                        fill={hoveredDistrict === 'uttara_kannada' ? '#f87171' : '#fecaca'}
                        stroke="#dc2626"
                        strokeWidth="2.2"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('uttara_kannada')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[1])}
                      >
                        <title>Uttara Kannada: Hotspot! 85,065 claims | 11,763 pending | 71,561 rejected</title>
                      </polygon>
                      <text x="88" y="145" fill="#991b1b" fontSize="9" fontWeight="bold">Uttara Kannada (Hotspot)</text>

                      {/* Shimoga (Shivamogga) - Hotspot Red */}
                      <polygon
                        points="170,125 260,120 245,195 165,185"
                        fill={hoveredDistrict === 'shimoga' ? '#f87171' : '#fecaca'}
                        stroke="#dc2626"
                        strokeWidth="2.2"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('shimoga')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[0])}
                      >
                        <title>Shimoga: 95,431 claims | 2,409 titles | 90,809 rejected | 2,213 pending</title>
                      </polygon>
                      <text x="175" y="165" fill="#991b1b" fontSize="9" fontWeight="bold">Shimoga (Hotspot)</text>

                      {/* Davanagere (Central) - Orange */}
                      <polygon
                        points="245,120 330,125 315,195 240,185"
                        fill={hoveredDistrict === 'davanagere' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('davanagere')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[5])}
                      >
                        <title>Davanagere: 11,034 claims | 616 titles</title>
                      </polygon>
                      <text x="250" y="160" fill="#9a3412" fontSize="8.5" fontWeight="bold">Davanagere</text>

                      {/* Chickmagalur (Western Ghats) - Orange */}
                      <polygon
                        points="160,185 245,195 230,265 155,250"
                        fill={hoveredDistrict === 'chickmagalur' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('chickmagalur')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[2])}
                      >
                        <title>Chickmagalur: 21,213 claims | 1,910 titles | 19,303 rejected</title>
                      </polygon>
                      <text x="162" y="230" fill="#9a3412" fontSize="8.5" fontWeight="bold">Chickmagalur</text>

                      {/* Kodagu (South Ghats) - Green Fast Clearance */}
                      <polygon
                        points="155,250 225,260 210,320 145,305"
                        fill={hoveredDistrict === 'kodagu' ? '#86efac' : '#bbf7d0'}
                        stroke="#16a34a"
                        strokeWidth="1.8"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('kodagu')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[7])}
                      >
                        <title>Kodagu: 56.5% Titles Conferred (2,385 / 4,220)</title>
                      </polygon>
                      <text x="155" y="290" fill="#166534" fontSize="9" fontWeight="bold">Kodagu (Clearance)</text>

                      {/* Mysore (Mysuru) - Orange Backlog */}
                      <polygon
                        points="225,260 310,265 295,330 210,320"
                        fill={hoveredDistrict === 'mysore' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('mysore')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[6])}
                      >
                        <title>Mysore: 7,340 claims | 961 titles | 540 pending</title>
                      </polygon>
                      <text x="235" y="295" fill="#9a3412" fontSize="8.5" fontWeight="bold">Mysore</text>

                      {/* Chamrajnagar (South Border) - Green Fast Clearance */}
                      <polygon
                        points="295,310 365,305 350,352 285,348"
                        fill={hoveredDistrict === 'chamrajnagar' ? '#86efac' : '#bbf7d0'}
                        stroke="#16a34a"
                        strokeWidth="1.8"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('chamrajnagar')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(KARNATAKA_DISTRICTS[8])}
                      >
                        <title>Chamrajnagar: 83.1% Conferred (2,060 / 2,480)</title>
                      </polygon>
                      <text x="290" y="335" fill="#166534" fontSize="8.5" fontWeight="bold">Chamrajnagar (83%)</text>

                      {/* Arabian Sea coastline annotation */}
                      <path d="M 60 40 Q 75 180 70 330" fill="none" stroke="#38bdf8" strokeWidth="2" strokeDasharray="3 3" />
                      <text x="20" y="200" fill="#0284c7" fontSize="9" fontWeight="bold" opacity="0.7" transform="rotate(-90 20 200)">
                        Arabian Sea Coast
                      </text>
                    </svg>
                  ) : (
                    /* TELANGANA CHOROPLETH SVG */
                    <svg className="w-full h-full" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                      {/* Adilabad (North) - Red Hotspot */}
                      <polygon
                        points="130,25 240,20 225,90 120,85"
                        fill={hoveredDistrict === 'adilabad' ? '#f87171' : '#fecaca'}
                        stroke="#dc2626"
                        strokeWidth="2.2"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('adilabad')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[2])}
                      >
                        <title>Adilabad: 64,680 claims | 26,779 titles | 29,472 pending | 125 flags</title>
                      </polygon>
                      <text x="140" y="60" fill="#991b1b" fontSize="9" fontWeight="bold">Adilabad (Hotspot)</text>

                      {/* Komaram Bheem Asifabad (NE) - Orange */}
                      <polygon
                        points="240,20 340,30 315,100 225,90"
                        fill={hoveredDistrict === 'asifabad' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('asifabad')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[3])}
                      >
                        <title>Asifabad: 60,280 claims | 26,461 titles | 28,964 pending</title>
                      </polygon>
                      <text x="235" y="65" fill="#9a3412" fontSize="9" fontWeight="bold">KB Asifabad</text>

                      {/* Nirmal (NW Central) - Orange */}
                      <polygon
                        points="105,85 195,90 180,160 95,150"
                        fill={hoveredDistrict === 'nirmal' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('nirmal')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[7])}
                      >
                        <title>Nirmal: 26,307 claims | 10,908 titles | 12,364 pending</title>
                      </polygon>
                      <text x="115" y="130" fill="#9a3412" fontSize="8.5" fontWeight="bold">Nirmal</text>

                      {/* Mulugu (East Forest Division) - Red Hotspot */}
                      <polygon
                        points="260,110 350,115 335,190 250,180"
                        fill={hoveredDistrict === 'mulugu' ? '#f87171' : '#fecaca'}
                        stroke="#dc2626"
                        strokeWidth="2.2"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('mulugu')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[4])}
                      >
                        <title>Mulugu: 47,994 claims | 12,350 titles | 28,162 pending | 140 flags</title>
                      </polygon>
                      <text x="265" y="155" fill="#991b1b" fontSize="9" fontWeight="bold">Mulugu (Hotspot)</text>

                      {/* Bhadradri Kothagudem (East Agency) - Major Hotspot Red */}
                      <polygon
                        points="335,150 450,165 425,290 320,270"
                        fill={hoveredDistrict === 'bhadradri_kothagudem' ? '#f87171' : '#fecaca'}
                        stroke="#dc2626"
                        strokeWidth="2.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('bhadradri_kothagudem')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[0])}
                      >
                        <title>Bhadradri Kothagudem: 139,691 claims | 68,387 titles | 46,244 pending | 184 flags</title>
                      </polygon>
                      <text x="330" y="225" fill="#991b1b" fontSize="9.5" fontWeight="bold">Bhadradri Kothagudem</text>

                      {/* Mahabubabad (Central East) - Orange */}
                      <polygon
                        points="230,180 325,185 305,255 220,240"
                        fill={hoveredDistrict === 'mahabubabad' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('mahabubabad')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[1])}
                      >
                        <title>Mahabubabad: 65,874 claims | 30,220 titles | 22,338 pending</title>
                      </polygon>
                      <text x="235" y="220" fill="#9a3412" fontSize="8.5" fontWeight="bold">Mahabubabad</text>

                      {/* Khammam (SE Border) - Orange */}
                      <polygon
                        points="295,255 385,265 360,335 280,325"
                        fill={hoveredDistrict === 'khammam' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('khammam')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[6])}
                      >
                        <title>Khammam: 32,061 claims | 12,970 titles | 11,958 pending</title>
                      </polygon>
                      <text x="295" y="295" fill="#9a3412" fontSize="8.5" fontWeight="bold">Khammam</text>

                      {/* Nalgonda (South) - Orange Backlog */}
                      <polygon
                        points="160,240 270,250 245,330 145,315"
                        fill={hoveredDistrict === 'nalgonda' ? '#fdba74' : '#fed7aa'}
                        stroke="#ea580c"
                        strokeWidth="1.5"
                        className="cursor-pointer transition-colors"
                        onMouseEnter={() => setHoveredDistrict('nalgonda')}
                        onMouseLeave={() => setHoveredDistrict(null)}
                        onClick={() => setSelectedDistrict(TELANGANA_DISTRICTS[8])}
                      >
                        <title>Nalgonda: 28,742 claims | 6,701 titles | 18,072 pending</title>
                      </polygon>
                      <text x="170" y="290" fill="#9a3412" fontSize="8.5" fontWeight="bold">Nalgonda</text>

                      {/* Godavari River line and label */}
                      <path d="M 160 20 Q 280 80 380 150 T 460 260" fill="none" stroke="#38bdf8" strokeWidth="2.5" strokeDasharray="4 3" />
                      <text x="330" y="110" fill="#0284c7" fontSize="9" fontWeight="bold" opacity="0.8">
                        Godavari River Basin
                      </text>
                    </svg>
                  )}

                  {/* Map Floating Mini Legend */}
                  <div className="absolute bottom-2 left-2 bg-white/90 backdrop-blur-sm px-2.5 py-1.5 rounded-lg border border-[rgba(118,196,87,0.22)] text-[10px] space-y-1 shadow-sm">
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-2 bg-green-300 border border-green-600 inline-block rounded-xs"></span>
                      <span>Normal Clearance (&gt;50%)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-2 bg-amber-200 border border-amber-600 inline-block rounded-xs"></span>
                      <span>SDLC Backlog (&gt;90d Delay)</span>
                    </div>
                    <div className="flex items-center space-x-1.5">
                      <span className="w-3 h-2 bg-red-200 border border-red-600 inline-block rounded-xs"></span>
                      <span>AI Anomaly Hotspot (&gt;75 Flags)</span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Selected District Info Bar */}
              {selectedDistrict && (
                <div className="mt-2 p-2.5 rounded-lg flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 text-xs"
                     style={{ background: 'rgba(240,247,236,0.75)', border: '1px solid rgba(118,196,87,0.20)' }}>
                  <div className="flex flex-wrap items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-[#2A7C13] shrink-0" />
                    <span className="font-bold text-[#1C2B22]">{selectedDistrict.name}:</span>
                    <span className="text-slate-600">
                      {selectedDistrict.conferredClaims.toLocaleString()} conferred ({selectedDistrict.conferredRate}%),{' '}
                      {selectedDistrict.pendingClaims.toLocaleString()} pending,{' '}
                      {selectedDistrict.anomalyFlags} anomaly flags
                    </span>
                    <span
                      className={`${
                        selectedDistrict.statusType === 'clearance'
                          ? 'badge-green'
                          : selectedDistrict.statusType === 'hotspot'
                          ? 'badge-rose'
                          : 'badge-amber'
                      }`}
                    >
                      {selectedDistrict.statusType.toUpperCase()}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setSubTab('sdlc')}
                    className="btn-ghost shrink-0"
                  >
                    <span>Inspect SDLC Field GIS</span>
                    <ArrowRight className="w-3 h-3" />
                  </button>
                </div>
              )}

              <p className="text-[11px] text-slate-500 italic mt-1">
                Click on any district polygon to inspect Sub-Divisions and cadastral forest plots in the SDLC Console.
              </p>
            </div>

            {/* District Statistics & Processing Bottlenecks (5 cols) */}
            <div className="lg:col-span-5 space-y-4">
              {/* District-wise Status Comparison Card */}
              <div className="glass-card p-4 space-y-3">
                <div className="glass-card-header">
                  <h3 className="text-xs font-bold text-[#1C2B22]">
                    {activeState === 'karnataka' ? 'Karnataka' : 'Telangana'} District Status Comparison
                  </h3>
                  <span className="badge-green">Official State Data</span>
                </div>

                <div className="space-y-3 text-xs">
                  {currentDistricts.slice(0, 5).map((dist) => {
                    const conferredPct = Math.min(100, Math.round((dist.conferredClaims / dist.totalClaims) * 100));
                    const pendingPct = Math.min(100 - conferredPct, Math.round((dist.pendingClaims / dist.totalClaims) * 100));
                    const rejectedPct = Math.max(0, 100 - conferredPct - pendingPct);

                    return (
                      <div key={dist.id} className="space-y-1">
                        <div className="flex justify-between text-[11px]">
                          <span className="font-bold text-[#1C2B22]">{dist.name}</span>
                          <span className="text-slate-500 font-medium">
                            {dist.conferredRate}% Conferred ({dist.conferredClaims.toLocaleString()} / {dist.totalClaims.toLocaleString()})
                          </span>
                        </div>
                        <div className="w-full h-2 rounded-full overflow-hidden flex" style={{ background: 'rgba(118,196,87,0.10)' }}>
                          <div
                            className="h-full"
                            style={{ width: `${conferredPct}%`, background: '#76C457' }}
                            title={`Conferred: ${conferredPct}%`}
                          />
                          <div
                            className="bg-amber-400 h-full"
                            style={{ width: `${pendingPct}%` }}
                            title={`Pending: ${pendingPct}%`}
                          />
                          <div
                            className="bg-rose-500 h-full"
                            style={{ width: `${rejectedPct}%` }}
                            title={`Rejected: ${rejectedPct}%`}
                          />
                        </div>
                        <div className="flex justify-between text-[9.5px] text-slate-400">
                          <span>Pending: {dist.pendingClaims.toLocaleString()}</span>
                          <span>Anomalies: {dist.anomalyFlags} flags</span>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* AI State Bottleneck Diagnosis */}
              <div className="glass-card p-4 space-y-2">
                <h3 className="text-xs font-bold text-[#1C2B22] flex items-center gap-1.5 pb-2 border-b border-[rgba(118,196,87,0.14)]">
                  <Brain className="w-4 h-4 text-[#2A7C13]" />
                  <span>
                    {activeState === 'karnataka' ? 'Karnataka' : 'Telangana'} Processing Bottlenecks &amp; AI Breakdown
                  </span>
                </h3>

                {activeState === 'karnataka' ? (
                  <>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="glass-stat-rose p-2">
                        <span className="text-[10px] font-bold text-rose-700 block">Rejection Rate</span>
                        <span className="text-base font-extrabold text-rose-700">89%</span>
                      </div>
                      <div className="glass-stat p-2">
                        <span className="text-[10px] font-bold text-slate-500 block">Delay &gt;180d</span>
                        <span className="text-base font-extrabold text-[#1C2B22]">48%</span>
                      </div>
                      <div className="glass-stat-beige p-2">
                        <span className="text-[10px] font-bold text-amber-700 block">Ghats Overlap</span>
                        <span className="text-base font-extrabold text-amber-700">34%</span>
                      </div>
                    </div>

                    <div className="alert-banner-success mt-2 leading-relaxed">
                      <strong>Karnataka SLMC Recommendation:</strong> Convene Special Division Review for{' '}
                      <strong>Shimoga (Shivamogga)</strong> and <strong>Uttara Kannada</strong> to re-examine 162,370 rejected
                      IFR claims with DGPS satellite cadastral overlays before the State High Court statutory compliance deadline.
                    </div>
                  </>
                ) : (
                  <>
                    <div className="grid grid-cols-3 gap-2 text-center pt-1">
                      <div className="glass-stat-beige p-2">
                        <span className="text-[10px] font-bold text-amber-700 block">Pending Backlog</span>
                        <span className="text-base font-extrabold text-amber-700">50.3%</span>
                      </div>
                      <div className="glass-stat p-2">
                        <span className="text-[10px] font-bold text-slate-500 block">Delay &gt;180d</span>
                        <span className="text-base font-extrabold text-[#1C2B22]">58%</span>
                      </div>
                      <div className="glass-stat-rose p-2">
                        <span className="text-[10px] font-bold text-rose-700 block">Podu Land Overlap</span>
                        <span className="text-base font-extrabold text-rose-700">27%</span>
                      </div>
                    </div>

                    <div className="alert-banner-success mt-2 leading-relaxed">
                      <strong>Telangana SLMC Recommendation:</strong> Expedite RoFR digital title distribution for{' '}
                      <strong>46,244 pending files in Bhadradri Kothagudem</strong> and{' '}
                      <strong>29,472 in Adilabad</strong> through coordinated SDLC revenue camps and Gram Sabha quorum re-verification drives.
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </section>
  );
};
