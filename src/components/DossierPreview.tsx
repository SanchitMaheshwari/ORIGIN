import React, { useState } from 'react';
import {
  FileText,
  FileDown,
  MapPin,
  X,
  CheckCircle2,
  AlertTriangle,
  Clock,
  Layers,
  ShieldCheck,
  FolderSearch,
  ExternalLink,
  Send,
  Maximize2,
  Compass,
  Check
} from 'lucide-react';
import { ClaimRecord } from '../types';

export interface DossierPreviewProps {
  selectedClaim: ClaimRecord | null;
  onClose?: () => void;
  onExportPdf?: (claim: ClaimRecord) => void;
  onIssueDirective?: (claimId: string) => void;
  isDirectiveActive?: boolean;
  onOpenFullModal?: (claim: ClaimRecord) => void;
}

export const DossierPreview: React.FC<DossierPreviewProps> = ({
  selectedClaim,
  onClose,
  onExportPdf,
  onIssueDirective,
  isDirectiveActive = false,
  onOpenFullModal
}) => {
  const [copiedId, setCopiedId] = useState(false);
  const [isExporting, setIsExporting] = useState(false);

  // If no claim is selected, render the subtle empty state
  if (!selectedClaim) {
    return (
      <div
        className="glass-card p-6 sm:p-8 flex flex-col items-center justify-center text-center min-h-[460px] space-y-4 border border-dashed border-slate-300/80 rounded-2xl bg-white/70"
        id="dossier-preview-empty-state"
      >
        <div className="w-14 h-14 rounded-2xl flex items-center justify-center shadow-xs border border-emerald-200/60"
             style={{ background: 'rgba(118,196,87,0.12)', color: '#2A7C13' }}>
          <FolderSearch className="w-7 h-7" />
        </div>

        <div className="space-y-1.5 max-w-sm">
          <h3 className="text-sm font-bold text-[#1C2B22] leading-snug">
            Select a case dossier to view field details, GIS boundaries, and audit logs
          </h3>
          <p className="text-xs text-slate-500 leading-relaxed">
            Click &quot;Open Dossier&quot; on any priority anomaly case from the list to inspect claimant records, GPS boundary polygons, satellite RoR variance, and statutory verification telemetry.
          </p>
        </div>

        <div className="pt-2">
          <span className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-[11px] font-semibold bg-emerald-50 text-emerald-800 border border-emerald-200/70">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Awaiting case selection from priority queue</span>
          </span>
        </div>
      </div>
    );
  }

  const handleCopyPlotId = () => {
    navigator.clipboard.writeText(selectedClaim.plotId);
    setCopiedId(true);
    setTimeout(() => setCopiedId(false), 2000);
  };

  const handleExport = () => {
    setIsExporting(true);
    onExportPdf?.(selectedClaim);
    setTimeout(() => setIsExporting(false), 1200);
  };

  return (
    <div
      className="glass-card p-4 sm:p-5 flex flex-col space-y-4 rounded-2xl shadow-md border border-slate-200/90 animate-in fade-in zoom-in-95 duration-200 bg-white/95"
      id="dossier-preview-active"
    >
      {/* ── 1. Header Bar with Close (✕) Button ── */}
      <div className="flex items-start justify-between gap-3 pb-3 border-b border-slate-100">
        <div className="space-y-1 min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-[10px] font-bold px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-900 border border-emerald-200 uppercase tracking-wider">
              {selectedClaim.category} Claim
            </span>
            <span className="badge-rose text-[10px] font-bold">
              Anomaly Score {selectedClaim.anomalyScore}/10
            </span>
            <span className="text-[10px] font-mono text-slate-400">
              {selectedClaim.id}
            </span>
          </div>

          <div className="flex items-center gap-2 pt-0.5">
            <h3 className="text-base font-extrabold text-[#1C2B22] leading-tight truncate">
              {selectedClaim.plotId}
            </h3>
            <button
              type="button"
              onClick={handleCopyPlotId}
              className="text-[10px] text-slate-400 hover:text-slate-600 transition cursor-pointer p-0.5"
              title="Copy Plot ID"
            >
              {copiedId ? <Check className="w-3 h-3 text-emerald-600" /> : <Layers className="w-3 h-3" />}
            </button>
          </div>
          <p className="text-xs font-semibold text-emerald-800 flex items-center gap-1.5">
            <span>Claimant:</span>
            <strong className="text-slate-900 font-bold">{selectedClaim.claimantName}</strong>
          </p>
        </div>

        {/* Dismiss / Close (✕) Button */}
        <div className="flex items-center gap-1 shrink-0">
          {onOpenFullModal && (
            <button
              type="button"
              onClick={() => onOpenFullModal(selectedClaim)}
              className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-500 hover:text-emerald-700 hover:bg-emerald-50 transition cursor-pointer"
              title="Open full-screen modal"
              aria-label="Open full-screen modal"
            >
              <Maximize2 className="w-3.5 h-3.5" />
            </button>
          )}
          <button
            type="button"
            onClick={onClose}
            className="w-7 h-7 rounded-lg flex items-center justify-center text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition cursor-pointer"
            title="Dismiss dossier preview (✕)"
            aria-label="Dismiss dossier preview"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* ── 2. Claimant Details Grid ── */}
      <div className="grid grid-cols-2 gap-2 text-xs">
        <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70">
          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Location</span>
          <span className="font-bold text-slate-800 block mt-0.5 truncate">
            {selectedClaim.village}, {selectedClaim.district}
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Sub-Div: {selectedClaim.subDivision}</span>
        </div>

        <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70">
          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Land Extent</span>
          <span className="font-bold text-emerald-800 text-sm block mt-0.5">
            {selectedClaim.landExtentHectares} Hectares
          </span>
          <span className="text-[10px] text-slate-500 font-medium">Status: {selectedClaim.status}</span>
        </div>

        <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70">
          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Assigned Unit</span>
          <span className="font-semibold text-slate-800 block mt-0.5 truncate text-[11px]">
            {selectedClaim.assignedTeam}
          </span>
          <span className="text-[10px] text-slate-500 font-mono">Stage #{selectedClaim.stageNumber} of 5</span>
        </div>

        <div className="p-2.5 rounded-xl border border-slate-100 bg-slate-50/70">
          <span className="text-[10px] text-slate-400 font-bold uppercase block tracking-wider">Filing Timeline</span>
          <span className="font-semibold text-slate-800 block mt-0.5 text-[11px]">
            Filed: {selectedClaim.submissionDate}
          </span>
          <span className="text-[10px] text-slate-500 block">Sync: {selectedClaim.lastUpdateDate}</span>
        </div>
      </div>

      {/* ── 3. GPS Boundary Map Snapshot / Spatial Polygon Canvas ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            <span>GPS Cadastral Boundary Snapshot</span>
          </span>
          <span className="text-[10px] font-mono bg-emerald-50 text-emerald-700 px-2 py-0.5 rounded border border-emerald-200/60 font-semibold">
            ±0.02m RTK DGPS
          </span>
        </div>

        {/* Stylized GIS Satellite Plot Canvas */}
        <div className="relative rounded-xl overflow-hidden border border-slate-800/20 bg-[#16251C] text-white p-3 shadow-inner h-36 flex flex-col justify-between">
          {/* Top Info Bar inside Map */}
          <div className="flex items-center justify-between text-[10px] relative z-10 text-emerald-300 font-mono">
            <span>Lat: {selectedClaim.coordinates.lat.toFixed(4)}° N</span>
            <span>Long: {selectedClaim.coordinates.lng.toFixed(4)}° E</span>
          </div>

          {/* SVG Map Overlay Visual */}
          <svg className="absolute inset-0 w-full h-full opacity-90" preserveAspectRatio="none" viewBox="0 0 300 140">
            <defs>
              <pattern id="dossier-gis-grid" width="20" height="20" patternUnits="userSpaceOnUse">
                <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(118,196,87,0.12)" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="300" height="140" fill="url(#dossier-gis-grid)" />

            {/* Simulated Reserve Forest Buffer Polygon */}
            <polygon
              points="40,20 180,15 260,60 210,120 70,110"
              fill="rgba(245, 158, 11, 0.10)"
              stroke="rgba(245, 158, 11, 0.6)"
              strokeWidth="1.2"
              strokeDasharray="4 2"
            />

            {/* Claimant Cadastral Boundary Polygon */}
            <polygon
              points="80,35 170,30 220,75 160,115 90,95"
              fill="rgba(118, 196, 87, 0.28)"
              stroke="#76C457"
              strokeWidth="2"
            />

            {/* Discrepancy overlap area */}
            <polygon
              points="160,30 180,15 220,75"
              fill="rgba(239, 68, 68, 0.35)"
              stroke="#ef4444"
              strokeWidth="1.5"
            />

            {/* Vertex Nodes */}
            <circle cx="80" cy="35" r="3" fill="#ffffff" stroke="#2A7C13" strokeWidth="1.5" />
            <circle cx="170" cy="30" r="3" fill="#ffffff" stroke="#2A7C13" strokeWidth="1.5" />
            <circle cx="220" cy="75" r="3" fill="#ffffff" stroke="#2A7C13" strokeWidth="1.5" />
            <circle cx="160" cy="115" r="3" fill="#ffffff" stroke="#2A7C13" strokeWidth="1.5" />
            <circle cx="90" cy="95" r="3" fill="#ffffff" stroke="#2A7C13" strokeWidth="1.5" />

            {/* Centroid Pin */}
            <circle cx="140" cy="70" r="4.5" fill="#f59e0b" />
            <text x="148" y="74" fill="#ffffff" fontSize="9" fontWeight="bold" fontFamily="monospace">
              {selectedClaim.plotId.split(' ')[0]}
            </text>
          </svg>

          {/* Bottom Badge inside Map */}
          <div className="flex items-center justify-between text-[10px] relative z-10 pt-1">
            <span className="bg-black/60 backdrop-blur-xs px-2 py-0.5 rounded text-slate-300 font-mono">
              RF Comp: {selectedClaim.rfCompartment.split(',')[0]}
            </span>
            <span className="bg-rose-950/80 border border-rose-500/40 text-rose-300 px-2 py-0.5 rounded text-[10px] font-semibold">
              Overlap Identified (0.6 Ha)
            </span>
          </div>
        </div>
      </div>

      {/* ── 4. AI Recommendation & Anomaly Summary ── */}
      <div className="p-3 rounded-xl text-xs space-y-1"
           style={{ background: 'rgba(251, 230, 194, 0.60)', border: '1px solid rgba(217, 119, 6, 0.25)', color: '#78350f' }}>
        <div className="flex items-center gap-1.5 font-bold text-amber-950">
          <AlertTriangle className="w-3.5 h-3.5 text-amber-600" />
          <span>Field Ground-Truthing Anomaly</span>
        </div>
        <p className="text-[11px] leading-relaxed text-amber-900">
          {selectedClaim.anomalyReasons?.join('; ') || 'Cadastral RoR boundary variance logged for resurvey.'}
        </p>
      </div>

      {/* ── 5. Document Verification Checklist ── */}
      <div className="space-y-1.5">
        <div className="flex items-center justify-between text-[11px]">
          <span className="font-bold text-slate-700 flex items-center gap-1.5">
            <ShieldCheck className="w-3.5 h-3.5 text-[#2A7C13]" />
            <span>Statutory Verification Checklist ({selectedClaim.documentsCount}/7 Verified)</span>
          </span>
          <span className="text-[10px] font-semibold text-emerald-700">Audit Ready</span>
        </div>

        <div className="space-y-1 text-xs">
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-700 font-medium text-[11px]">1. Form-A Application with GPS Coordinates</span>
            <span className="badge-green font-bold text-[10px] py-0.5">Verified ✓</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-700 font-medium text-[11px]">2. Gram Sabha Resolution Extract (&gt;50% Quorum)</span>
            <span className="badge-green font-bold text-[10px] py-0.5">Attached ✓</span>
          </div>
          <div className="p-2 rounded-lg bg-slate-50 border border-slate-100 flex items-center justify-between">
            <span className="text-slate-700 font-medium text-[11px]">3. Scheduled Tribe / OTFD Caste Proof</span>
            <span className="badge-green font-bold text-[10px] py-0.5">Validated ✓</span>
          </div>
          <div className="p-2 rounded-lg bg-amber-50/80 border border-amber-200 flex items-center justify-between">
            <span className="text-amber-900 font-medium text-[11px]">4. Historical Forest RoR / Chitha</span>
            <span className="badge-amber font-bold text-[10px] py-0.5">0.6 Ha Variance ⚠</span>
          </div>
          <div className="p-2 rounded-lg bg-rose-50/80 border border-rose-200 flex items-center justify-between">
            <span className="text-rose-900 font-medium text-[11px]">5. DGPS Cadastral Boundary Shapefile (.shp)</span>
            <span className="badge-rose font-bold text-[10px] py-0.5">Resurvey Mandated ⟳</span>
          </div>
        </div>
      </div>

      {/* ── 6. Action Buttons Bar ── */}
      <div className="pt-2 border-t border-slate-100 flex flex-col sm:flex-row gap-2">
        {/* Export Full PDF Button */}
        <button
          type="button"
          onClick={handleExport}
          disabled={isExporting}
          className="flex-1 py-2 px-3 rounded-lg bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs transition flex items-center justify-center gap-2 shadow-xs cursor-pointer disabled:opacity-75"
          id="btn-export-dossier-pdf"
        >
          <FileDown className="w-3.5 h-3.5" />
          <span>{isExporting ? 'Exporting PDF...' : 'Export Full PDF'}</span>
        </button>

        {/* Issue Central Directive Button */}
        {onIssueDirective && (
          <button
            type="button"
            onClick={() => onIssueDirective(selectedClaim.id)}
            disabled={isDirectiveActive}
            className={`py-2 px-3 rounded-lg font-semibold text-xs transition flex items-center justify-center gap-1.5 shadow-xs cursor-pointer ${
              isDirectiveActive
                ? 'bg-amber-100 text-amber-800 border border-amber-300'
                : 'bg-gov-900 hover:bg-gov-800 text-white'
            }`}
          >
            <Send className="w-3 h-3" />
            <span>{isDirectiveActive ? 'Directive Active ✓' : 'Mandate Resurvey'}</span>
          </button>
        )}
      </div>
    </div>
  );
};
