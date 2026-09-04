import React, { useState } from 'react';
import {
  Satellite,
  Plus,
  Minus,
  Maximize2,
  AlertTriangle,
  FileText,
  X,
  Calendar,
  Layers,
  CheckCircle2,
  ShieldAlert
} from 'lucide-react';
import { ClaimRecord } from '../types';
import { PRIORITY_CLAIMS_QUEUE } from '../data/mockData';

interface SdlcFieldGisConsoleProps {
  initialDistrict?: string;
  activeState?: 'odisha' | 'mp';
  onOpenDossier: (claim: ClaimRecord) => void;
  onFlagForDlc: (claimId: string) => void;
}

export const SdlcFieldGisConsole: React.FC<SdlcFieldGisConsoleProps> = ({
  initialDistrict = 'Bandhavgarh (Umaria)',
  activeState = 'mp',
  onOpenDossier,
  onFlagForDlc
}) => {
  const [selectedDistrict, setSelectedDistrict] = useState(
    activeState === 'odisha' ? 'Mayurbhanj' : initialDistrict
  );
  const [selectedStatus, setSelectedStatus] = useState('All Statuses');
  const [anomalyFilter, setAnomalyFilter] = useState('High (Score > 7.0)');
  const [showHeatmap, setShowHeatmap] = useState(true);
  const [showKhasra, setShowKhasra] = useState(true);
  const [showSatellite, setShowSatellite] = useState(false);
  const [zoomLevel, setZoomLevel] = useState(1);
  const [selectedClaim, setSelectedClaim] = useState<ClaimRecord | null>(PRIORITY_CLAIMS_QUEUE[0]);
  const [flaggedIds, setFlaggedIds] = useState<string[]>([]);
  const [bannerMessage, setBannerMessage] = useState<string | null>(null);

  const handleFlag = (claimId: string) => {
    if (!flaggedIds.includes(claimId)) {
      setFlaggedIds([...flaggedIds, claimId]);
      setBannerMessage(`Claim ${claimId} successfully flagged for prioritized statutory review at the upcoming DLC Session.`);
      onFlagForDlc(claimId);
      setTimeout(() => setBannerMessage(null), 4000);
    }
  };

  return (
    <div className="space-y-4 animate-in fade-in duration-200" id="sdlc-field-gis-console">
      {/* Title & Filters Bar */}
      <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm space-y-3">
        <div className="flex flex-col md:flex-row justify-between md:items-center gap-3">
          <div>
            <div className="flex items-center space-x-2">
              <span className="p-1 rounded bg-emerald-100 text-emerald-800">
                <Satellite className="w-4 h-4" />
              </span>
              <h2 className="text-base font-bold text-gov-900">
                Sub-Divisional Level Committee (SDLC) Operational Ground-Truthing &amp; WebGIS
              </h2>
              <span className="text-[10px] bg-amber-100 text-amber-800 font-bold px-2 py-0.5 rounded-full">
                Field Operations
              </span>
            </div>
            <p className="text-xs text-slate-500 mt-0.5">
              Ground-truthing cadastral boundary verification, satellite RoR mismatch detection, and DLC statutory preparation.
            </p>
          </div>

          {/* Filter Dropdowns */}
          <div className="flex flex-wrap items-center gap-2">
            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">District &amp; Sub-Division</label>
              <select
                value={selectedDistrict}
                onChange={(e) => setSelectedDistrict(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                {activeState === 'odisha' ? (
                  <>
                    <option>Mayurbhanj (Baripada)</option>
                    <option>Kandhamal (Phulbani)</option>
                    <option>Sundargarh (Panposh)</option>
                    <option>Koraput (Jeypore)</option>
                  </>
                ) : (
                  <>
                    <option>Bandhavgarh (Umaria)</option>
                    <option>Manpur (Umaria)</option>
                    <option>Mandla (Niwas)</option>
                    <option>Dindori (Shahpura)</option>
                  </>
                )}
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-500 uppercase">Workflow Status</label>
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-slate-300 font-medium focus:ring-1 focus:ring-emerald-500 bg-white"
              >
                <option>All Statuses</option>
                <option>Pending Field Survey</option>
                <option>Pending GS Approval</option>
                <option>DLC Approval Stage</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-rose-600 uppercase">Anomaly Priority</label>
              <select
                value={anomalyFilter}
                onChange={(e) => setAnomalyFilter(e.target.value)}
                className="text-xs py-1 px-2.5 rounded-lg border border-rose-300 bg-rose-50 text-rose-800 font-bold focus:ring-1 focus:ring-rose-500"
              >
                <option>High (Score &gt; 7.0)</option>
                <option>Critical Only (&gt; 8.5)</option>
                <option>All Anomalies</option>
              </select>
            </div>
          </div>
        </div>

        {/* Action toast */}
        {bannerMessage && (
          <div className="p-2.5 bg-emerald-50 border border-emerald-300 text-emerald-900 rounded-lg text-xs flex items-center justify-between animate-in fade-in">
            <span>{bannerMessage}</span>
            <button onClick={() => setBannerMessage(null)} className="text-emerald-700 font-bold ml-2">✕</button>
          </div>
        )}

        {/* KPI Pill Metric Row */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 pt-2 border-t border-slate-100">
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Sub-Division Claims</span>
            <div className="text-xl font-black text-slate-800">1,250</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Pending Field Check</span>
            <div className="text-xl font-black text-amber-600">310</div>
          </div>
          <div className="bg-slate-50 p-2.5 rounded-lg border border-slate-200">
            <span className="text-[10px] uppercase font-bold text-slate-400">Pending GS Approval</span>
            <div className="text-xl font-black text-slate-700">450</div>
          </div>
          <div className="bg-amber-50 p-2.5 rounded-lg border border-amber-200">
            <span className="text-[10px] uppercase font-bold text-amber-800">AI Anomalies Flagged</span>
            <div className="text-xl font-black text-amber-700">75</div>
          </div>
          <div className="bg-rose-50 p-2.5 rounded-lg border border-rose-200">
            <span className="text-[10px] uppercase font-bold text-rose-700">Critical Conflicts</span>
            <div className="text-xl font-black text-rose-600">15</div>
          </div>
        </div>
      </div>

      {/* Main GIS Canvas + Claim List Split */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* GIS Map Container (2 cols) */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm flex flex-col relative h-[530px]">
          {/* Map Toolbar (Top-Left) */}
          <div className="absolute top-3 left-3 z-20 flex flex-col space-y-1 bg-white/95 backdrop-blur border border-slate-200 p-1.5 rounded-lg shadow">
            <button
              onClick={() => setZoomLevel(prev => Math.min(prev + 0.25, 2.0))}
              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-700 rounded text-xs font-bold transition"
              title="Zoom In"
              aria-label="Zoom In"
            >
              <Plus className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setZoomLevel(prev => Math.max(prev - 0.25, 0.75))}
              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-700 rounded text-xs font-bold transition"
              title="Zoom Out"
              aria-label="Zoom Out"
            >
              <Minus className="w-3.5 h-3.5" />
            </button>
            <hr className="border-slate-200 my-0.5" />
            <button
              onClick={() => setZoomLevel(1)}
              className="w-7 h-7 flex items-center justify-center hover:bg-slate-100 text-slate-700 rounded text-xs transition"
              title="Reset Extent"
              aria-label="Reset Extent"
            >
              <Maximize2 className="w-3 h-3" />
            </button>
          </div>

          {/* Layer Toggles (Top-Right) */}
          <div className="absolute top-3 right-3 z-20 flex items-center space-x-2 bg-white/90 backdrop-blur px-3 py-1.5 rounded-lg border border-slate-200 shadow text-xs">
            <label className="flex items-center space-x-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showHeatmap}
                onChange={(e) => setShowHeatmap(e.target.checked)}
                className="rounded text-amber-600 focus:ring-amber-500 h-3.5 w-3.5"
              />
              <span className="font-medium text-slate-700">Anomaly Heatmap</span>
            </label>
            <span className="text-slate-300">|</span>
            <label className="flex items-center space-x-1.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={showKhasra}
                onChange={(e) => setShowKhasra(e.target.checked)}
                className="rounded text-gov-700 focus:ring-gov-700 h-3.5 w-3.5"
              />
              <span className="font-medium text-slate-700">Khasra Boundaries</span>
            </label>
            <span className="text-slate-300">|</span>
            <button
              onClick={() => setShowSatellite(!showSatellite)}
              className={`px-1.5 py-0.5 rounded text-[11px] font-semibold transition ${
                showSatellite ? 'bg-gov-800 text-white' : 'bg-slate-100 text-slate-700'
              }`}
            >
              <Layers className="w-3 h-3 inline mr-1" />
              {showSatellite ? 'Satellite' : 'Topo'}
            </button>
          </div>

          {/* SVG GIS Graphic Layer */}
          <div
            className={`flex-1 relative overflow-hidden flex items-center justify-center transition-colors ${
              showSatellite ? 'bg-stone-800' : 'bg-slate-100'
            }`}
          >
            <svg
              className="w-full h-full transition-transform duration-300 ease-out"
              style={{ transform: `scale(${zoomLevel})` }}
              viewBox="0 0 800 500"
              xmlns="http://www.w3.org/2000/svg"
            >
              <defs>
                <pattern id="sdlc-grid-pattern" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path
                    d="M 40 0 L 0 0 0 40"
                    fill="none"
                    stroke={showSatellite ? '#334155' : '#e2e8f0'}
                    strokeWidth="0.8"
                  />
                </pattern>

                <radialGradient id="sdlcHotspotGlow" cx="50%" cy="50%" r="50%">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity="0.65" />
                  <stop offset="60%" stopColor="#f97316" stopOpacity="0.25" />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity="0" />
                </radialGradient>
              </defs>

              {/* Grid Background */}
              <rect width="100%" height="100%" fill="url(#sdlc-grid-pattern)" />

              {/* Contour terrain shades */}
              <path
                d="M 50 150 Q 200 80 450 120 T 780 200 L 780 480 L 50 480 Z"
                fill={showSatellite ? '#1e293b' : '#f1f5f9'}
                opacity={showSatellite ? '0.4' : '0.7'}
              />

              {/* Forest Division Boundary Polygon */}
              <path
                d="M 160 140 C 220 100, 310 90, 420 110 C 510 130, 620 170, 660 230 C 700 290, 640 380, 560 410 C 460 450, 330 420, 240 390 C 150 350, 110 270, 130 200 Z"
                fill={showSatellite ? '#064e3b' : '#d1fae5'}
                opacity={showSatellite ? '0.45' : '0.85'}
                stroke="#059669"
                strokeWidth="2.5"
                strokeDasharray="4 2"
              />

              {/* Core National Park / Protected Forest Zone */}
              <path
                d="M 280 180 C 350 160, 480 180, 520 240 C 540 290, 480 340, 390 330 C 310 320, 260 250, 280 180 Z"
                fill={showSatellite ? '#022c22' : '#a7f3d0'}
                opacity={showSatellite ? '0.6' : '0.8'}
                stroke="#047857"
                strokeWidth="1.8"
              />
              <text
                x="360"
                y="240"
                fill={showSatellite ? '#6ee7b7' : '#065f46'}
                fontSize="11"
                fontWeight="bold"
                opacity="0.85"
              >
                {selectedDistrict} Reserve Forest Core
              </text>

              {/* Khasra cadastral boundary lines */}
              {showKhasra && (
                <g stroke="#047857" strokeWidth="0.75" strokeDasharray="2 2" fill="none" opacity="0.6">
                  <path d="M 200 180 L 250 210 L 240 260 L 190 230 Z" />
                  <path d="M 250 210 L 320 220 L 310 280 L 240 260 Z" />
                  <path d="M 320 220 L 400 200 L 410 270 L 330 280 Z" />
                  <path d="M 400 200 L 480 230 L 460 300 L 410 270 Z" />
                  <path d="M 320 270 L 360 270 L 360 300 L 320 300 Z" stroke="#ef4444" strokeWidth="1.5" fill="#fee2e2" fillOpacity="0.4" />
                </g>
              )}

              {/* Anomaly Heatmap Clouds */}
              {showHeatmap && (
                <g>
                  <circle cx="340" cy="270" r="70" fill="url(#sdlcHotspotGlow)" />
                  <circle cx="510" cy="290" r="50" fill="url(#sdlcHotspotGlow)" />
                </g>
              )}

              {/* Verified Survey Pins (Green) */}
              <g className="cursor-pointer" transform="translate(230, 220)" onClick={() => setSelectedClaim(null)}>
                <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              </g>
              <g className="cursor-pointer" transform="translate(270, 290)" onClick={() => setSelectedClaim(null)}>
                <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              </g>
              <g className="cursor-pointer" transform="translate(430, 170)" onClick={() => setSelectedClaim(null)}>
                <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              </g>
              <g className="cursor-pointer" transform="translate(580, 310)" onClick={() => setSelectedClaim(null)}>
                <circle cx="0" cy="0" r="5" fill="#10b981" stroke="#fff" strokeWidth="1.5" />
              </g>

              {/* Amber Pending Survey Pins */}
              <g className="cursor-pointer" transform="translate(470, 220)" onClick={() => setSelectedClaim(PRIORITY_CLAIMS_QUEUE[2])}>
                <circle cx="0" cy="0" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              </g>
              <g className="cursor-pointer" transform="translate(390, 340)" onClick={() => setSelectedClaim(PRIORITY_CLAIMS_QUEUE[3])}>
                <circle cx="0" cy="0" r="5" fill="#f59e0b" stroke="#fff" strokeWidth="1.5" />
              </g>

              {/* RED ANOMALY PIN - Claim ID F-412 (Selected) */}
              <g
                className="cursor-pointer animate-bounce"
                transform="translate(340, 270)"
                onClick={() => setSelectedClaim(PRIORITY_CLAIMS_QUEUE[0])}
              >
                <circle cx="0" cy="0" r="8" fill="#ef4444" stroke="#fff" strokeWidth="2" />
                <circle cx="0" cy="0" r="14" fill="none" stroke="#ef4444" strokeWidth="1.5" strokeDasharray="3 3" />
                <text x="14" y="4" fill="#991b1b" fontSize="11" fontWeight="bold">Claim F-412 (7.8)</text>
              </g>

              {/* RED ANOMALY PIN - Claim ID F-413 */}
              <g
                className="cursor-pointer"
                transform="translate(510, 290)"
                onClick={() => setSelectedClaim(PRIORITY_CLAIMS_QUEUE[1])}
              >
                <circle cx="0" cy="0" r="7" fill="#ef4444" stroke="#fff" strokeWidth="1.5" />
                <text x="12" y="4" fill="#991b1b" fontSize="10" fontWeight="bold">Claim F-413 (7.8)</text>
              </g>
            </svg>

            {/* Floating Overlay Card: Detailed Claim View on map */}
            {selectedClaim && (
              <div className="absolute bottom-3 left-3 right-3 sm:right-auto sm:max-w-md bg-white/95 backdrop-blur-md rounded-xl p-3.5 border border-rose-200 shadow-xl z-20 animate-in fade-in slide-in-from-bottom-2 duration-150">
                <div className="flex items-center justify-between border-b border-slate-100 pb-2 mb-2">
                  <div className="flex items-center space-x-2">
                    <span className="px-2 py-0.5 rounded text-[11px] font-bold bg-rose-100 text-rose-800 border border-rose-200">
                      AI Anomaly Score: {selectedClaim.anomalyScore}/10
                    </span>
                    <span className="text-xs font-bold text-slate-800">
                      Claim ID: {selectedClaim.plotId.split(' ')[0]}
                    </span>
                  </div>
                  <button
                    onClick={() => setSelectedClaim(null)}
                    className="text-slate-400 hover:text-slate-600 text-xs p-1 cursor-pointer"
                    aria-label="Close Inspector"
                  >
                    <X className="w-3.5 h-3.5" />
                  </button>
                </div>

                <div className="space-y-1.5 text-xs">
                  <p className="text-slate-700">
                    <strong>Supporting Evidence:</strong> {selectedClaim.anomalyReasons?.join('. ')}
                  </p>
                  {selectedClaim.aiRecommendation && (
                    <div className="p-2 bg-amber-50 rounded border border-amber-200 text-amber-900 text-[11px] leading-snug">
                      <strong>AI Recommendation:</strong> {selectedClaim.aiRecommendation}
                    </div>
                  )}
                </div>

                <div className="mt-2.5 pt-2 border-t border-slate-100 flex items-center justify-between">
                  <span className="text-[10px] text-slate-400 font-mono">
                    Assigned: {selectedClaim.assignedTeam}
                  </span>
                  <div className="flex space-x-2">
                    <button
                      onClick={() => handleFlag(selectedClaim.id)}
                      disabled={flaggedIds.includes(selectedClaim.id)}
                      className={`px-2.5 py-1 text-xs font-medium rounded shadow-sm transition ${
                        flaggedIds.includes(selectedClaim.id)
                          ? 'bg-slate-200 text-slate-500 cursor-not-allowed'
                          : 'bg-rose-600 hover:bg-rose-700 text-white cursor-pointer'
                      }`}
                    >
                      {flaggedIds.includes(selectedClaim.id) ? 'Flagged for DLC ✓' : 'Flag for DLC'}
                    </button>
                    <button
                      onClick={() => onOpenDossier(selectedClaim)}
                      className="px-2.5 py-1 text-xs bg-slate-100 hover:bg-slate-200 text-slate-700 font-medium rounded cursor-pointer transition"
                    >
                      Open Dossier
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Map Legend Footer */}
          <div className="bg-white border-t border-slate-200 px-4 py-2 flex flex-wrap items-center justify-between text-xs text-slate-600 gap-2">
            <div className="flex items-center space-x-4">
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
                <span>Verified (865)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-amber-500"></span>
                <span>Pending Survey (310)</span>
              </span>
              <span className="flex items-center space-x-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
                <span>High Anomaly (75)</span>
              </span>
            </div>
            <span className="font-mono text-[11px] text-slate-400">EPSG: 4326 | WGS 84 WebGIS Cadastral Layer</span>
          </div>
        </div>

        {/* Right Side: Claim Priority Queue (1 col) */}
        <div className="bg-white rounded-xl border border-slate-200 shadow-sm p-4 flex flex-col justify-between space-y-4">
          <div>
            <div className="flex items-center justify-between border-b border-slate-200 pb-2 mb-3">
              <h3 className="text-sm font-bold text-slate-800 uppercase tracking-wide">SDLC Priority Queue</h3>
              <span className="text-[11px] font-semibold text-rose-600 bg-rose-50 px-2 py-0.5 rounded-full border border-rose-200">
                15 Urgent
              </span>
            </div>

            {/* List items */}
            <div className="space-y-2.5 max-h-[350px] overflow-y-auto pr-1 scrollbar-thin">
              {PRIORITY_CLAIMS_QUEUE.map((item) => {
                const isSelected = selectedClaim?.id === item.id;
                return (
                  <div
                    key={item.id}
                    onClick={() => setSelectedClaim(item)}
                    className={`p-2.5 rounded-lg border transition cursor-pointer ${
                      isSelected
                        ? 'border-2 border-rose-400 bg-rose-50/50 shadow-sm'
                        : 'border-slate-200 hover:border-slate-300 hover:bg-slate-50'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-black text-slate-900">
                        Claim ID: {item.plotId.split(' ')[0]} - {item.category}
                      </span>
                      <span
                        className={`px-1.5 py-0.5 rounded text-[10px] font-bold ${
                          item.anomalyScore >= 7.5
                            ? 'bg-rose-600 text-white'
                            : 'bg-amber-100 text-amber-800'
                        }`}
                      >
                        {item.anomalyScore}
                      </span>
                    </div>
                    <p className="text-[11px] text-slate-600 mt-1">
                      Village: {item.village} | {item.landExtentHectares} Ha | Delay {item.submissionDate}
                    </p>
                    <span className="text-[10px] text-rose-700 font-semibold block mt-0.5 flex items-center space-x-1">
                      <AlertTriangle className="w-3 h-3 text-rose-600 shrink-0" />
                      <span className="truncate">{item.anomalyReasons?.[0]}</span>
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Action Reminder Box */}
          <div className="bg-gov-50 p-3 rounded-lg border border-gov-100 text-xs">
            <span className="font-bold text-gov-900 block mb-1 flex items-center space-x-1.5">
              <Calendar className="w-3.5 h-3.5 text-emerald-700" />
              <span>Statutory SDLC Meeting Schedule</span>
            </span>
            <p className="text-[11px] text-gov-800 leading-snug">
              Joint verification committee meeting scheduled for <strong>22 Aug 2026</strong>. 12 dossiers prepared for Gram Sabha sync.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
