import React from 'react';
import {
  Download,
  Clock,
  Check,
  Loader2,
  Bot,
  AlertCircle,
  FileText,
  UserCheck,
  ArrowRight
} from 'lucide-react';
import { ClaimRecord } from '../types';

interface ClaimantViewProps {
  claim: ClaimRecord;
  onOpenReceipt: () => void;
  onOpenGrievance: () => void;
}

export const ClaimantView: React.FC<ClaimantViewProps> = ({
  claim,
  onOpenReceipt,
  onOpenGrievance
}) => {
  return (
    <section className="space-y-5 animate-fade-slide-up" id="view-claimant">
      {/* Page Title Row */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-start gap-3">
        <div>
          <div className="flex items-center space-x-2 mb-0.5">
            <UserCheck className="w-4.5 h-4.5 text-[#2A7C13]" />
            <h1 className="text-lg font-bold text-[#1C2B22]">
              Individual Forest Rights (IFR) Claim Portal
            </h1>
          </div>
          <p className="text-xs text-slate-500 ml-6">
            Track and monitor your forest land title application in real-time with automated AI status analysis.
          </p>
        </div>
        <button
          id="download-form-receipt-btn"
          onClick={onOpenReceipt}
          className="btn-ghost shrink-0 self-start sm:self-auto"
        >
          <Download className="w-3.5 h-3.5" />
          <span>Download Form-A Receipt</span>
        </button>
      </div>

      {/* ── Metric Cards Grid ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3.5">
        {/* Card 1 — Claims Filed */}
        <div className="glass-stat border-l-[3.5px] border-l-[#76C457]">
          <span className="section-label">Claims Filed</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-3xl font-black text-[#2A7C13] tracking-tight leading-none">1</div>
            <span className="text-[11px] text-slate-600 font-medium mt-1.5 block leading-tight">Individual Claim (IFR)</span>
          </div>
        </div>

        {/* Card 2 — Status */}
        <div className="glass-stat-beige border-l-[3.5px] border-l-amber-600">
          <span className="section-label text-amber-800">Status</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="flex items-center gap-1.5">
              <span className="h-2.5 w-2.5 rounded-full bg-amber-500 inline-block animate-pulse shrink-0" />
              <span className="text-xl sm:text-2xl font-black text-amber-900 leading-tight">Under Review</span>
            </div>
            <span className="text-[11px] text-amber-800 font-semibold mt-1.5 block leading-tight">Stage: DLC Verification</span>
          </div>
        </div>

        {/* Card 3 — Last Update */}
        <div className="glass-stat">
          <span className="section-label">Last Update</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-xl sm:text-2xl font-black text-[#1C2B22] leading-tight">{claim.lastUpdateDate}</div>
            <span className="text-[11px] text-[#2A7C13] font-semibold mt-1.5 flex items-center gap-1 leading-tight">
              <Clock className="w-3 h-3 text-[#2A7C13]" />
              <span>SDLC Sync Completed</span>
            </span>
          </div>
        </div>

        {/* Card 4 — Pending Documents */}
        <div className="glass-stat border-l-[3.5px] border-l-[#76C457]">
          <span className="section-label">Pending Documents</span>
          <div className="mt-2 flex flex-col justify-end">
            <div className="text-3xl font-black text-[#2A7C13] tracking-tight leading-none">0</div>
            <span className="text-[11px] text-slate-600 font-medium mt-1.5 block leading-tight">All {claim.documentsCount} records attached</span>
          </div>
        </div>
      </div>

      {/* ── Claim Status Timeline ── */}
      <div className="glass-card p-5 space-y-4">
        <div className="glass-card-header">
          <div>
            <h2 className="text-sm font-bold text-[#1C2B22]">Claim Status Timeline</h2>
            <p className="text-[11px] text-slate-500 mt-0.5">
              Under governance review as of {claim.lastUpdateDate}
            </p>
          </div>
          <span className="badge-amber">Current Stage: DLC Approval</span>
        </div>

        {/* Timeline Steps */}
        <div className="pt-2 pb-3 overflow-x-auto">
          <div className="relative flex items-start justify-between min-w-[480px] max-w-3xl mx-auto px-2">
            {/* Connector line — background */}
            <div className="absolute left-10 right-10 top-[18px] h-[2px] bg-slate-200 z-0" />
            {/* Connector line — filled portion (3 of 5 done) */}
            <div className="absolute left-10 top-[18px] h-[2px] bg-[#76C457] z-0" style={{ width: 'calc(75% - 20px)' }} />

            {/* Step 1 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-16">
              <div className="w-9 h-9 rounded-full bg-[#2A7C13] text-white flex items-center justify-center shadow ring-3 ring-white">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">Application</span>
              <span className="text-[10px] text-slate-400 text-center">25 Apr 2026</span>
            </div>

            {/* Step 2 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-16">
              <div className="w-9 h-9 rounded-full bg-[#2A7C13] text-white flex items-center justify-center shadow ring-3 ring-white">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">Verification</span>
              <span className="text-[10px] text-slate-400 text-center">02 Jun 2026</span>
            </div>

            {/* Step 3 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-16">
              <div className="w-9 h-9 rounded-full bg-[#2A7C13] text-white flex items-center justify-center shadow ring-3 ring-white">
                <Check className="w-4 h-4 stroke-[2.5]" />
              </div>
              <span className="text-[11px] font-semibold text-slate-700 text-center leading-tight">GS Approval</span>
              <span className="text-[10px] text-slate-400 text-center">19 Jul 2026</span>
            </div>

            {/* Step 4 — Active */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-16">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center shadow-md ring-3 ring-amber-100 status-pulse -mt-0.5">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="text-[11px] font-bold text-amber-700 text-center leading-tight">DLC Approval</span>
              <span className="text-[10px] text-amber-600 text-center font-medium">In Progress</span>
            </div>

            {/* Step 5 */}
            <div className="relative z-10 flex flex-col items-center gap-1.5 w-16">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-400 flex items-center justify-center ring-3 ring-white text-sm font-bold">
                5
              </div>
              <span className="text-[11px] font-semibold text-slate-400 text-center leading-tight">Final Title</span>
              <span className="text-[10px] text-slate-400 text-center">Patta Conferment</span>
            </div>
          </div>
        </div>
      </div>

      {/* ── Lower Split: AI Insights + Claim Dossier ── */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* AI Status Insights */}
        <div className="lg:col-span-1 glass-panel p-5 flex flex-col justify-between gap-4"
             style={{ borderLeft: '3px solid #76C457' }}>
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-[#2A7C13]">
              <Bot className="w-4.5 h-4.5" />
              <h3 className="font-bold text-sm">AI Status Insights</h3>
            </div>
            <div className="glass-card p-3.5 space-y-1.5">
              <span className="text-xs font-bold text-rose-700 flex items-center gap-1.5">
                <AlertCircle className="w-3.5 h-3.5 shrink-0" />
                <span>Explanation for Delay — Field Verification</span>
              </span>
              <p className="text-[11px] text-slate-600 leading-relaxed">
                Delay due to field verification backlog in Bandhavgarh range. Insufficient GPS geofence match; re-verification scheduled by SDLC team.
              </p>
            </div>
          </div>

          <div className="flex items-center justify-between text-[11px] text-slate-500 pt-2 border-t border-[#76C457]/14">
            <span>
              Confidence: <strong className="text-[#2A7C13] font-bold">92% match</strong>
            </span>
            <button
              onClick={onOpenGrievance}
              className="text-[#2A7C13] font-semibold hover:underline flex items-center gap-0.5 cursor-pointer text-[11px]"
            >
              <span>Submit Grievance</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Claim Information Dossier */}
        <div className="lg:col-span-2 glass-card p-5 space-y-4">
          <div className="glass-card-header">
            <h3 className="font-bold text-[#1C2B22] text-sm flex items-center gap-2">
              <FileText className="w-4 h-4 text-[#2A7C13]" />
              <span>Claim Information Dossier</span>
            </h3>
            <span className="font-mono text-[10px] text-slate-500 bg-slate-100 px-2.5 py-0.5 rounded border border-slate-200">
              {claim.id}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-4 gap-x-5 text-xs">
            <div>
              <span className="section-label block mb-0.5">Claimant Name</span>
              <span className="font-bold text-[#1C2B22] text-sm">{claim.claimantName}</span>
            </div>
            <div>
              <span className="section-label block mb-0.5">District / Range</span>
              <span className="font-bold text-[#1C2B22] text-sm">{claim.district}</span>
            </div>
            <div>
              <span className="section-label block mb-0.5">Claim Category</span>
              <span className="font-bold text-[#1C2B22] text-sm">IFR (Individual Rights)</span>
            </div>
            <div>
              <span className="section-label block mb-0.5">Claim On ID</span>
              <span className="font-mono font-bold text-[#2A7C13] text-sm">{claim.plotId}</span>
            </div>
            <div>
              <span className="section-label block mb-0.5">Land Extent</span>
              <span className="font-bold text-[#1C2B22] text-sm">{claim.landExtentHectares} Hectares</span>
            </div>
            <div>
              <span className="section-label block mb-0.5">Submission Date</span>
              <span className="font-bold text-[#1C2B22] text-sm">{claim.submissionDate}</span>
            </div>
            <div className="sm:col-span-3 pt-3 border-t border-[#76C457]/14">
              <span className="section-label block mb-0.5">Registered Geolocation / Forest Compartment</span>
              <span className="font-mono text-xs text-slate-600">{claim.rfCompartment}</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
