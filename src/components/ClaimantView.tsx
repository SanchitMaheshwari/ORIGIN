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
    <section className="space-y-6 animate-in fade-in duration-200" id="view-claimant">
      {/* Title & Context */}
      <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2 pb-2 border-b border-slate-200">
        <div>
          <h1 className="text-xl font-bold text-gov-900 flex items-center space-x-2">
            <UserCheck className="w-5 h-5 text-emerald-600" />
            <span>Individual Forest Rights (IFR) Claim Portal</span>
          </h1>
          <p className="text-xs text-slate-500">
            Track and monitor your forest land title application in real-time with automated AI status analysis.
          </p>
        </div>
        <div className="flex items-center space-x-2">
          <button
            id="download-form-receipt-btn"
            onClick={onOpenReceipt}
            className="text-xs font-semibold px-3 py-1.5 rounded-lg bg-white border border-slate-300 text-slate-700 hover:bg-slate-50 shadow-sm flex items-center space-x-1.5 transition active:scale-95 cursor-pointer"
          >
            <Download className="w-3.5 h-3.5 text-slate-600" />
            <span>Download Form-A Receipt</span>
          </button>
        </div>
      </div>

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {/* Card 1 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Claims Filed</span>
          <div className="text-3xl font-extrabold text-gov-900 mt-2">1</div>
          <span className="text-[11px] text-slate-400 mt-1">Individual Claim (IFR)</span>
        </div>

        {/* Card 2 */}
        <div className="bg-amber-50 p-4 rounded-xl border border-amber-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-amber-800">Status</span>
          <div className="text-2xl font-black text-amber-700 mt-2 flex items-center space-x-2">
            <span className="h-3 w-3 rounded-full bg-amber-500 inline-block animate-pulse"></span>
            <span>Under Review</span>
          </div>
          <span className="text-[11px] text-amber-800 mt-1 font-medium">Stage: DLC Verification</span>
        </div>

        {/* Card 3 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Last Update</span>
          <div className="text-xl font-bold text-slate-800 mt-2">{claim.lastUpdateDate}</div>
          <span className="text-[11px] text-emerald-600 font-medium mt-1 flex items-center space-x-1">
            <Clock className="w-3 h-3" />
            <span>SDLC Sync Completed</span>
          </span>
        </div>

        {/* Card 4 */}
        <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm flex flex-col justify-between">
          <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Pending Document</span>
          <div className="text-3xl font-extrabold text-emerald-600 mt-2">0</div>
          <span className="text-[11px] text-slate-400 mt-1">All {claim.documentsCount} records attached</span>
        </div>
      </div>

      {/* Claim Status Timeline */}
      <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1">
          <div>
            <h2 className="text-sm font-bold text-slate-900 uppercase tracking-wider">Claim Status Timeline</h2>
            <p className="text-xs text-slate-500">The specific claim is under governance review as of {claim.lastUpdateDate}</p>
          </div>
          <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-gov-800 border border-emerald-300">
            Current Stage: DLC Approval
          </div>
        </div>

        {/* Timeline Progress */}
        <div className="pt-6 pb-4">
          <div className="relative flex items-center justify-between max-w-4xl mx-auto">
            {/* Connecting Line (gray background) */}
            <div className="absolute left-4 right-4 top-1/2 -translate-y-1/2 h-1 bg-slate-200 z-0"></div>
            {/* Active connecting line (green filled) */}
            <div className="absolute left-4 top-1/2 -translate-y-1/2 w-3/4 h-1 bg-emerald-500 z-0"></div>

            {/* Step 1: Application */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow ring-4 ring-emerald-50 group-hover:ring-emerald-200 transition">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-800">Application</span>
              <span className="text-[10px] text-slate-400">25 Apr 2026</span>
            </div>

            {/* Step 2: Verification */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow ring-4 ring-emerald-50 group-hover:ring-emerald-200 transition">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-800">Verification</span>
              <span className="text-[10px] text-slate-400">02 Jun 2026</span>
            </div>

            {/* Step 3: GS Approval */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-9 h-9 rounded-full bg-emerald-600 text-white flex items-center justify-center font-bold text-sm shadow ring-4 ring-emerald-50 group-hover:ring-emerald-200 transition">
                <Check className="w-4 h-4 stroke-[3]" />
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-800">GS Approval</span>
              <span className="text-[10px] text-slate-400">19 Jul 2026</span>
            </div>

            {/* Step 4: DLC Approval (Current In-Progress) */}
            <div className="relative z-10 flex flex-col items-center group cursor-pointer">
              <div className="w-10 h-10 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm shadow-lg ring-4 ring-amber-100 status-pulse">
                <Loader2 className="w-4 h-4 animate-spin" />
              </div>
              <span className="mt-2 text-xs font-bold text-amber-700">DLC Approval</span>
              <span className="text-[10px] text-amber-600 font-medium">In Progress</span>
            </div>

            {/* Step 5: Final Title */}
            <div className="relative z-10 flex flex-col items-center group">
              <div className="w-9 h-9 rounded-full bg-slate-200 text-slate-500 flex items-center justify-center font-bold text-sm ring-4 ring-slate-100">
                5
              </div>
              <span className="mt-2 text-xs font-semibold text-slate-400">Final Title</span>
              <span className="text-[10px] text-slate-400">Patta Conferment</span>
            </div>
          </div>
        </div>
      </div>

      {/* Lower Split: AI Insights + Claim Information Dossier */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* AI Status Insights */}
        <div className="lg:col-span-1 bg-gradient-to-br from-emerald-50 to-teal-50 border border-emerald-200 rounded-xl p-5 shadow-sm space-y-3 flex flex-col justify-between">
          <div className="space-y-3">
            <div className="flex items-center space-x-2 text-gov-800">
              <Bot className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-sm uppercase tracking-wide">AI Status Insights</h3>
            </div>
            <div className="bg-white/90 p-3.5 rounded-lg border border-emerald-100 space-y-1.5 shadow-sm">
              <span className="text-xs font-bold text-rose-700 flex items-center space-x-1.5">
                <AlertCircle className="w-3.5 h-3.5" />
                <span>Explanation for Delay - Field Verification</span>
              </span>
              <p className="text-xs text-slate-600 leading-relaxed">
                Delay due to field verification backlog in Bandhavgarh range. Insufficient GPS geofence match; re-verification scheduled by SDLC team.
              </p>
            </div>
          </div>

          <div className="text-[11px] text-slate-500 flex items-center justify-between pt-2 border-t border-emerald-100">
            <span>Confidence: <strong className="text-slate-700 font-bold">92% match</strong></span>
            <button
              onClick={onOpenGrievance}
              className="text-emerald-700 font-semibold hover:underline flex items-center space-x-0.5 cursor-pointer"
            >
              <span>Submit Grievance</span>
              <ArrowRight className="w-3 h-3" />
            </button>
          </div>
        </div>

        {/* Claim Information Dossier */}
        <div className="lg:col-span-2 bg-white rounded-xl border border-slate-200 p-5 shadow-sm space-y-4">
          <div className="flex justify-between items-center border-b border-slate-100 pb-2">
            <h3 className="font-bold text-slate-800 text-sm flex items-center space-x-2">
              <FileText className="w-4 h-4 text-emerald-600" />
              <span>Claim Information Dossier</span>
            </h3>
            <span className="text-xs bg-slate-100 px-2.5 py-0.5 rounded font-mono text-slate-600 border border-slate-200">
              {claim.id}
            </span>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 gap-y-3.5 gap-x-4 text-xs">
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Claimant Name</span>
              <span className="font-bold text-slate-800">{claim.claimantName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">District / Range</span>
              <span className="font-bold text-slate-800">{claim.district}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Claim Category</span>
              <span className="font-bold text-slate-800">IFR (Individual Rights)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Claim On ID</span>
              <span className="font-mono font-bold text-gov-800">{claim.plotId}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Land Extent</span>
              <span className="font-bold text-slate-800">{claim.landExtentHectares} Hectares</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[11px] font-medium">Submission Date</span>
              <span className="font-bold text-slate-800">{claim.submissionDate}</span>
            </div>
            <div className="sm:col-span-3 pt-2.5 border-t border-slate-100">
              <span className="text-slate-400 block text-[11px] font-medium">Registered Geolocation / Forest Compartment</span>
              <span className="font-mono text-xs text-slate-700 font-medium">
                {claim.rfCompartment}
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
