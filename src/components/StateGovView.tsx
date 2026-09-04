import React, { useState, useEffect } from 'react';
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
  MapPin,
  Landmark
} from 'lucide-react';
import { KARNATAKA_DISTRICTS, TELANGANA_DISTRICTS } from '../data/mockData';
import { KARNATAKA_GEO_DISTRICTS, KARNATAKA_ALL_DISTRICTS } from '../data/karnatakaGeoData';
import { TELANGANA_GEO_DISTRICTS, TELANGANA_ALL_DISTRICTS } from '../data/telanganaGeoData';
import { DistrictMetric, ClaimRecord } from '../types';
import { SdlcFieldGisConsole } from './SdlcFieldGisConsole';

interface StateGovViewProps {
  userState?: 'karnataka' | 'telangana';
  onExportReport: () => void;
  onOpenDossier: (claim: ClaimRecord) => void;
  onFlagForDlc: (claimId: string) => void;
  onDrillDownDistrict?: (district: DistrictMetric) => void;
}

export const StateGovView: React.FC<StateGovViewProps> = ({
  userState = 'karnataka',
  onExportReport,
  onOpenDossier,
  onFlagForDlc,
  onDrillDownDistrict
}) => {
  const activeState = userState;
  const [subTab, setSubTab] = useState<'overview' | 'sdlc'>('overview');
  const [hoveredDistrict, setHoveredDistrict] = useState<string | null>(null);

  const currentDistricts = activeState === 'karnataka' ? KARNATAKA_ALL_DISTRICTS : TELANGANA_ALL_DISTRICTS;
  const [selectedDistrict, setSelectedDistrict] = useState<DistrictMetric>(currentDistricts[0]);

  useEffect(() => {
    const districts = activeState === 'karnataka' ? KARNATAKA_ALL_DISTRICTS : TELANGANA_ALL_DISTRICTS;
    setSelectedDistrict(districts[0]);
  }, [activeState]);

  return (
    <section className="space-y-5 animate-fade-slide-up" id="view-state">
      {/* Title & Controls */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <h1 className="text-lg font-bold text-[#1C2B22] flex items-center gap-2">
              <Mountain className="w-4.5 h-4.5 text-[#2A7C13]" />
              <span>State Level Monitoring Committee (SLMC) – {activeState === 'karnataka' ? 'Karnataka' : 'Telangana'} State Portal</span>
            </h1>
            <span className={`inline-flex items-center space-x-1.5 px-3 py-1 rounded-full text-xs font-bold border shadow-xs ${
              activeState === 'karnataka' ? 'bg-amber-50 text-amber-900 border-amber-300' : 'bg-emerald-50 text-emerald-900 border-emerald-300'
            }`}>
              <Landmark className="w-3.5 h-3.5 text-[#2A7C13]" />
              <span>{activeState === 'karnataka' ? 'Government of Karnataka' : 'Government of Telangana'}</span>
            </span>
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
                    /* KARNATAKA CHOROPLETH SVG GENERATED FROM karnataka.json */
                    <svg className="w-full h-full select-none" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="glow-kar" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1C2B22" floodOpacity="0.25" />
                        </filter>
                      </defs>

                      {/* Arabian Sea coastline decoration & annotation */}
                      <path
                        d="M 145 70 Q 135 180 160 310"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        opacity="0.85"
                      />
                      <text
                        x="135"
                        y="190"
                        fill="#0284c7"
                        fontSize="9"
                        fontWeight="bold"
                        letterSpacing="0.05em"
                        opacity="0.8"
                        textAnchor="middle"
                        transform="rotate(-90 135 190)"
                      >
                        Arabian Sea Coast
                      </text>

                      {/* Western Ghats ecological boundary indicator */}
                      <path
                        d="M 175 140 Q 185 220 205 315"
                        fill="none"
                        stroke="#059669"
                        strokeWidth="1.2"
                        strokeDasharray="2 2"
                        opacity="0.6"
                      />

                      {/* 30 Official District Boundaries from karnataka.json */}
                      {KARNATAKA_GEO_DISTRICTS.map((d) => {
                        const isHovered = hoveredDistrict === d.id;
                        const isSelected = selectedDistrict?.id === d.id;

                        let fill = '#fed7aa'; // Default backlog
                        let stroke = '#ea580c';
                        let strokeWidth = 0.9;

                        if (d.metric.statusType === 'hotspot') {
                          fill = isHovered ? '#f87171' : '#fecaca';
                          stroke = '#dc2626';
                          strokeWidth = 1.6;
                        } else if (d.metric.statusType === 'clearance') {
                          fill = isHovered ? '#86efac' : '#bbf7d0';
                          stroke = '#16a34a';
                          strokeWidth = 1.3;
                        } else {
                          fill = isHovered ? '#fdba74' : '#fed7aa';
                          stroke = '#ea580c';
                          strokeWidth = 1.0;
                        }

                        if (isSelected) {
                          stroke = '#1C2B22';
                          strokeWidth = 2.2;
                        }

                        return (
                          <path
                            key={d.id}
                            id={`kar-district-${d.id}`}
                            d={d.path}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            filter={isSelected || isHovered ? 'url(#glow-kar)' : undefined}
                            className="cursor-pointer transition-colors duration-150"
                            onMouseEnter={() => setHoveredDistrict(d.id)}
                            onMouseLeave={() => setHoveredDistrict(null)}
                            onClick={() => setSelectedDistrict(d.metric)}
                          >
                            <title>{`${d.displayName}: ${d.metric.totalClaims.toLocaleString()} claims | ${d.metric.conferredClaims.toLocaleString()} titles conferred (${d.metric.conferredRate}%) | ${d.metric.pendingClaims.toLocaleString()} pending | ${d.metric.anomalyFlags} anomaly flags`}</title>
                          </path>
                        );
                      })}

                      {/* Key District Labels at centroids */}
                      {KARNATAKA_GEO_DISTRICTS.map((d) => {
                        const isHovered = hoveredDistrict === d.id;
                        const isSelected = selectedDistrict?.id === d.id;

                        const isMajor = [
                          'shimoga',
                          'uttara_kannada',
                          'belgaum',
                          'bagalakote',
                          'chickmagalur',
                          'davanagere',
                          'mysore',
                          'kodagu',
                          'chamrajnagar',
                          'bidar',
                          'ballari',
                          'dakshina_kannada',
                          'kalaburagi',
                          'vijayapura'
                        ].includes(d.id);

                        if (!isMajor && !isHovered && !isSelected) return null;

                        let textColor = '#9a3412';
                        if (d.metric.statusType === 'hotspot') textColor = '#991b1b';
                        if (d.metric.statusType === 'clearance') textColor = '#166534';

                        const shortName =
                          d.id === 'shimoga'
                            ? 'Shimoga'
                            : d.id === 'uttara_kannada'
                            ? 'Uttara Kannada'
                            : d.id === 'belgaum'
                            ? 'Belagavi'
                            : d.id === 'chickmagalur'
                            ? 'Chikkamagaluru'
                            : d.id === 'chamrajnagar'
                            ? 'Chamarajnagar'
                            : d.id === 'dakshina_kannada'
                            ? 'D. Kannada'
                            : d.id === 'bengaluru_urban'
                            ? 'BLR Urban'
                            : d.id === 'kalaburagi'
                            ? 'Kalaburagi'
                            : d.id === 'vijayapura'
                            ? 'Vijayapura'
                            : d.name;

                        return (
                          <text
                            key={`lbl-${d.id}`}
                            x={d.cx}
                            y={d.cy + 3}
                            textAnchor="middle"
                            fill={textColor}
                            fontSize={isHovered || isSelected ? '8.5' : '7.5'}
                            fontWeight={isHovered || isSelected ? 'bold' : '600'}
                            className="pointer-events-none select-none transition-all"
                            style={{
                              textShadow: '0 0 3px rgba(255,255,255,0.9), 0 0 1px #fff'
                            }}
                          >
                            {shortName}
                          </text>
                        );
                      })}
                    </svg>
                  ) : (
                    /* TELANGANA CHOROPLETH SVG GENERATED FROM telangana.json */
                    <svg className="w-full h-full select-none" viewBox="0 0 500 360" xmlns="http://www.w3.org/2000/svg">
                      <defs>
                        <filter id="glow-tg" x="-20%" y="-20%" width="140%" height="140%">
                          <feDropShadow dx="0" dy="1" stdDeviation="1.5" floodColor="#1C2B22" floodOpacity="0.25" />
                        </filter>
                      </defs>

                      {/* Godavari River Basin Path & Annotation */}
                      <path
                        d="M 170 70 Q 230 75 285 110 T 360 180 T 420 250"
                        fill="none"
                        stroke="#38bdf8"
                        strokeWidth="2.5"
                        strokeDasharray="4 3"
                        opacity="0.85"
                      />
                      <text
                        x="310"
                        y="100"
                        fill="#0284c7"
                        fontSize="9"
                        fontWeight="bold"
                        letterSpacing="0.05em"
                        opacity="0.8"
                      >
                        Godavari River Basin
                      </text>

                      {/* 33 Official District Boundaries from telangana.json */}
                      {TELANGANA_GEO_DISTRICTS.map((d) => {
                        const isHovered = hoveredDistrict === d.id;
                        const isSelected = selectedDistrict?.id === d.id;

                        let fill = '#fed7aa'; // Default backlog
                        let stroke = '#ea580c';
                        let strokeWidth = 0.9;

                        if (d.metric.statusType === 'hotspot') {
                          fill = isHovered ? '#f87171' : '#fecaca';
                          stroke = '#dc2626';
                          strokeWidth = 1.6;
                        } else if (d.metric.statusType === 'clearance') {
                          fill = isHovered ? '#86efac' : '#bbf7d0';
                          stroke = '#16a34a';
                          strokeWidth = 1.3;
                        } else {
                          fill = isHovered ? '#fdba74' : '#fed7aa';
                          stroke = '#ea580c';
                          strokeWidth = 1.0;
                        }

                        if (isSelected) {
                          stroke = '#1C2B22';
                          strokeWidth = 2.2;
                        }

                        return (
                          <path
                            key={d.id}
                            id={`tg-district-${d.id}`}
                            d={d.path}
                            fill={fill}
                            stroke={stroke}
                            strokeWidth={strokeWidth}
                            filter={isSelected || isHovered ? 'url(#glow-tg)' : undefined}
                            className="cursor-pointer transition-colors duration-150"
                            onMouseEnter={() => setHoveredDistrict(d.id)}
                            onMouseLeave={() => setHoveredDistrict(null)}
                            onClick={() => setSelectedDistrict(d.metric)}
                          >
                            <title>{`${d.displayName}: ${d.metric.totalClaims.toLocaleString()} claims | ${d.metric.conferredClaims.toLocaleString()} titles conferred (${d.metric.conferredRate}%) | ${d.metric.pendingClaims.toLocaleString()} pending | ${d.metric.anomalyFlags} anomaly flags`}</title>
                          </path>
                        );
                      })}

                      {/* Key District Labels at centroids */}
                      {TELANGANA_GEO_DISTRICTS.map((d) => {
                        const isHovered = hoveredDistrict === d.id;
                        const isSelected = selectedDistrict?.id === d.id;

                        const isMajor = [
                          'bhadradri_kothagudem',
                          'mahabubabad',
                          'adilabad',
                          'asifabad',
                          'mulugu',
                          'khammam',
                          'nirmal',
                          'nalgonda',
                          'kamareddy',
                          'mancherial',
                          'nagarkurnool',
                          'bhupalapally',
                          'hyderabad'
                        ].includes(d.id);

                        if (!isMajor && !isHovered && !isSelected) return null;

                        let textColor = '#9a3412';
                        if (d.metric.statusType === 'hotspot') textColor = '#991b1b';
                        if (d.metric.statusType === 'clearance') textColor = '#166534';

                        const shortName =
                          d.id === 'bhadradri_kothagudem'
                            ? 'Bhadradri'
                            : d.id === 'asifabad'
                            ? 'KB Asifabad'
                            : d.id === 'bhupalapally'
                            ? 'Bhupalapally'
                            : d.id === 'nagarkurnool'
                            ? 'Nagarkurnool'
                            : d.id === 'mahabubabad'
                            ? 'Mahabubabad'
                            : d.id === 'adilabad'
                            ? 'Adilabad'
                            : d.id === 'mulugu'
                            ? 'Mulugu'
                            : d.id === 'khammam'
                            ? 'Khammam'
                            : d.id === 'nirmal'
                            ? 'Nirmal'
                            : d.id === 'nalgonda'
                            ? 'Nalgonda'
                            : d.id === 'kamareddy'
                            ? 'Kamareddy'
                            : d.id === 'mancherial'
                            ? 'Mancherial'
                            : d.id === 'hyderabad'
                            ? 'Hyderabad'
                            : d.name;

                        return (
                          <text
                            key={`lbl-tg-${d.id}`}
                            x={d.cx}
                            y={d.cy + 3}
                            textAnchor="middle"
                            fill={textColor}
                            fontSize={isHovered || isSelected ? '8.5' : '7.5'}
                            fontWeight={isHovered || isSelected ? 'bold' : '600'}
                            className="pointer-events-none select-none transition-all"
                            style={{
                              textShadow: '0 0 3px rgba(255,255,255,0.9), 0 0 1px #fff'
                            }}
                          >
                            {shortName}
                          </text>
                        );
                      })}
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
