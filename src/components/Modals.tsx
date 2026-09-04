import React, { useState } from 'react';
import {
  X,
  Printer,
  Download,
  CheckCircle,
  FileCheck,
  QrCode,
  Shield,
  Send,
  Building,
  Calendar,
  Layers,
  FileText
} from 'lucide-react';
import { ClaimRecord } from '../types';

interface FormAReceiptModalProps {
  claim: ClaimRecord;
  onClose: () => void;
}

export const FormAReceiptModal: React.FC<FormAReceiptModalProps> = ({ claim, onClose }) => {
  const [downloaded, setDownloaded] = useState(false);

  const handlePrint = () => {
    window.print();
  };

  const handleDownload = () => {
    setDownloaded(true);
    setTimeout(() => setDownloaded(false), 3000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        {/* Header */}
        <div className="bg-gov-900 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <Shield className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold">Official Statutory Acknowledgement - Form A</h3>
              <p className="text-[10px] text-emerald-300">Forest Rights Act, 2006 [Rule 6(1)]</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Sheet */}
        <div className="p-6 space-y-6 text-xs text-slate-800 bg-white">
          {/* Emblem & Authority Header */}
          <div className="text-center space-y-1 border-b border-slate-200 pb-4">
            <div className="inline-flex items-center justify-center w-10 h-10 rounded-full bg-emerald-50 text-gov-800 font-bold border border-emerald-300 mb-1">
              GOI
            </div>
            <h4 className="font-extrabold text-sm uppercase tracking-wider text-gov-900">
              Government of Madhya Pradesh | Tribal Welfare Department
            </h4>
            <p className="text-[11px] text-slate-500 font-medium">
              Sub-Divisional Level Committee (SDLC), Bandhavgarh - District Umaria
            </p>
            <span className="inline-block mt-1 px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 font-mono text-[10px] border border-slate-300">
              Receipt No: {claim.id}
            </span>
          </div>

          {/* Details Table */}
          <div className="border border-slate-200 rounded-xl overflow-hidden divide-y divide-slate-200">
            <div className="grid grid-cols-2 p-3 bg-slate-50 font-semibold">
              <span className="text-slate-500">Claimant Full Name:</span>
              <span className="text-slate-900 font-bold">{claim.claimantName}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-slate-500">Category / Tribal Community:</span>
              <span className="text-slate-900 font-medium">Scheduled Tribe (Gond) - IFR Rights</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-slate-50">
              <span className="text-slate-500">Revenue Plot / Khasra ID:</span>
              <span className="text-gov-900 font-mono font-bold">{claim.plotId}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-slate-500">Claimed Land Extent:</span>
              <span className="text-slate-900 font-bold">{claim.landExtentHectares} Hectares (~6.05 Acres)</span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-slate-50">
              <span className="text-slate-500">Forest Beat / Compartment:</span>
              <span className="text-slate-900 font-mono text-[11px]">{claim.rfCompartment}</span>
            </div>
            <div className="grid grid-cols-2 p-3">
              <span className="text-slate-500">Submission Date &amp; Status:</span>
              <span className="text-slate-900 font-medium">
                {claim.submissionDate} (Under Review - DLC Stage)
              </span>
            </div>
            <div className="grid grid-cols-2 p-3 bg-slate-50">
              <span className="text-slate-500">Attached Proof of Occupation:</span>
              <span className="text-emerald-700 font-bold flex items-center space-x-1">
                <FileCheck className="w-3.5 h-3.5 text-emerald-600" />
                <span>All 7 statutory documents verified by FRC</span>
              </span>
            </div>
          </div>

          {/* QR Code & Digital Hash verification */}
          <div className="p-3.5 bg-slate-50 rounded-xl border border-slate-200 flex items-center justify-between">
            <div className="space-y-1 max-w-[80%]">
              <span className="text-[10px] uppercase font-bold text-slate-400 block">Cryptographic WebGIS Hash</span>
              <p className="font-mono text-[10px] text-slate-600 break-all">
                SHA-256: e4b29f9843c09b8d23190afdae01e23f0449912cd713e56a81ffb6e78841a1
              </p>
              <span className="text-[10px] text-emerald-700 font-semibold block">
                Digital signature validated by Forest Rights Committee Secretary
              </span>
            </div>
            <div className="p-1 bg-white border border-slate-300 rounded shadow-xs">
              <QrCode className="w-12 h-12 text-slate-800" />
            </div>
          </div>
        </div>

        {/* Footer actions */}
        <div className="p-4 bg-slate-50 border-t border-slate-200 flex items-center justify-between sticky bottom-0">
          <span className="text-[10px] text-slate-500">
            {downloaded ? 'Form-A Receipt PDF downloaded successfully!' : 'Valid government statutory receipt'}
          </span>
          <div className="flex space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 text-xs font-semibold bg-white border border-slate-300 hover:bg-slate-100 rounded-lg shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5 text-slate-600" />
              <span>Print Form-A</span>
            </button>
            <button
              onClick={handleDownload}
              className="px-3 py-1.5 text-xs font-semibold bg-gov-800 hover:bg-gov-900 text-white rounded-lg shadow-sm flex items-center space-x-1.5 cursor-pointer"
            >
              <Download className="w-3.5 h-3.5" />
              <span>Download PDF</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

interface GrievanceModalProps {
  claim: ClaimRecord;
  onClose: () => void;
}

export const GrievanceModal: React.FC<GrievanceModalProps> = ({ claim, onClose }) => {
  const [category, setCategory] = useState('Delay in Field Verification');
  const [phone, setPhone] = useState('9826194821');
  const [statement, setStatement] = useState(
    'Requesting expedited joint DGPS boundary survey by the SDLC and Forest Range Officer for Plot 84/2. The village Gram Sabha resolution was unanimously approved in July.'
  );
  const [submittedId, setSubmittedId] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmittedId(`GRV-2026-${Math.floor(1000 + Math.random() * 9000)}`);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-lg overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-gov-900 text-white p-4 flex items-center justify-between">
          <div>
            <h3 className="text-sm font-bold">Statutory FRA Grievance Portal</h3>
            <p className="text-[10px] text-emerald-300">Section 12 - Appeal &amp; Review Mechanism</p>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        {submittedId ? (
          <div className="p-6 text-center space-y-4">
            <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-6 h-6" />
            </div>
            <h4 className="text-base font-bold text-slate-800">Grievance Registered Successfully</h4>
            <p className="text-xs text-slate-600">
              Your grievance has been lodged directly into the Sub-Divisional Level Committee (SDLC) Bandhavgarh queue.
            </p>
            <div className="p-3 bg-slate-100 rounded-lg font-mono text-xs text-slate-800 font-bold">
              Token ID: {submittedId}
            </div>
            <p className="text-[11px] text-slate-500">
              Statutory response turnaround: 15 working days before next DLC convention.
            </p>
            <button
              onClick={onClose}
              className="w-full py-2 bg-gov-800 text-white text-xs font-bold rounded-lg hover:bg-gov-900 transition"
            >
              Back to Dashboard
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="p-5 space-y-4 text-xs">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Claim ID</label>
                <input
                  type="text"
                  readOnly
                  value={claim.id}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-mono text-slate-700"
                />
              </div>
              <div>
                <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Claimant Name</label>
                <input
                  type="text"
                  readOnly
                  value={claim.claimantName}
                  className="w-full bg-slate-100 border border-slate-300 rounded-lg px-2.5 py-1.5 font-semibold text-slate-700"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Grievance Category</label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-gov-800"
              >
                <option>Delay in Field Verification</option>
                <option>Boundary &amp; GPS Geofence Mismatch</option>
                <option>Dispute on RoR Khasra Record</option>
                <option>Gram Sabha Resolution Quorum Appeal</option>
              </select>
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Mobile / WhatsApp Number</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full border border-slate-300 rounded-lg px-2.5 py-1.5 text-xs focus:ring-1 focus:ring-gov-800"
                required
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Detailed Statement</label>
              <textarea
                rows={4}
                value={statement}
                onChange={(e) => setStatement(e.target.value)}
                className="w-full border border-slate-300 rounded-lg p-2.5 text-xs focus:ring-1 focus:ring-gov-800 leading-relaxed"
                required
              />
            </div>

            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={onClose}
                className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-1.5 bg-gov-800 hover:bg-gov-900 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-sm"
              >
                <Send className="w-3.5 h-3.5" />
                <span>Submit Grievance</span>
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

interface DossierDetailModalProps {
  claim: ClaimRecord;
  onClose: () => void;
}

export const DossierDetailModal: React.FC<DossierDetailModalProps> = ({ claim, onClose }) => {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-2xl max-h-[90vh] overflow-y-auto flex flex-col">
        <div className="bg-gov-900 text-white p-4 flex items-center justify-between sticky top-0 z-10">
          <div className="flex items-center space-x-2">
            <FileText className="w-5 h-5 text-emerald-400" />
            <div>
              <h3 className="text-sm font-bold">Official Claim Dossier - {claim.plotId}</h3>
              <p className="text-[10px] text-emerald-300">Bandhavgarh Division | Record Ref: {claim.id}</p>
            </div>
          </div>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs text-slate-800">
          {/* Summary Banner */}
          <div className="p-3 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
            <div className="flex items-center justify-between">
              <span className="font-bold text-amber-900">Current Anomaly Score: {claim.anomalyScore} / 10</span>
              <span className="text-[10px] px-2 py-0.5 rounded font-bold bg-amber-200 text-amber-900">
                SDLC Verification Required
              </span>
            </div>
            <p className="text-[11px] text-amber-800">
              {claim.aiRecommendation || 'Conduct on-site verification to validate cadastral boundary.'}
            </p>
          </div>

          {/* Claimant & Land Details */}
          <div className="grid grid-cols-2 gap-3 p-3 bg-slate-50 rounded-xl border border-slate-200">
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Claimant</span>
              <span className="font-bold text-slate-800">{claim.claimantName}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">District &amp; Village</span>
              <span className="font-bold text-slate-800">{claim.district} - {claim.village}</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Land Extent</span>
              <span className="font-bold text-slate-800">{claim.landExtentHectares} Ha (IFR Cultivation)</span>
            </div>
            <div>
              <span className="text-slate-400 block text-[10px] uppercase font-bold">Filing Date</span>
              <span className="font-bold text-slate-800">{claim.submissionDate}</span>
            </div>
          </div>

          {/* Attached Evidence Checklist */}
          <div>
            <h4 className="font-bold uppercase tracking-wider text-[11px] text-slate-600 mb-2">
              Attached Statutory Evidence Checklist (7 Items)
            </h4>
            <div className="space-y-1.5">
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">1. Form-A Claim Application with GPS polygon coords</span>
                <span className="text-emerald-700 font-bold text-[10px]">Verified ✓</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">2. Gram Sabha Resolution Extract (Quorum &gt; 50%)</span>
                <span className="text-emerald-700 font-bold text-[10px]">Attached ✓</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">3. Scheduled Tribe Caste Certificate (Gond)</span>
                <span className="text-emerald-700 font-bold text-[10px]">Validated ✓</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">4. Historical Forest Chitha (Revenue Plot 84/2)</span>
                <span className="text-amber-700 font-bold text-[10px]">0.6 Ha variance ⚠</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">5. Joint Forest Management Committee (JFMC) No-Objection</span>
                <span className="text-emerald-700 font-bold text-[10px]">Attached ✓</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">6. Elder oral testimony recording (Elder Punnu Gond)</span>
                <span className="text-emerald-700 font-bold text-[10px]">Logged ✓</span>
              </div>
              <div className="p-2 rounded-lg border border-slate-200 flex items-center justify-between">
                <span className="text-slate-700">7. DGPS Boundary Geo-Tag Shapefile (.shp)</span>
                <span className="text-rose-700 font-bold text-[10px]">Re-survey Pending ⟳</span>
              </div>
            </div>
          </div>
        </div>

        <div className="p-4 bg-slate-50 border-t border-slate-200 flex justify-end space-x-2">
          <button
            onClick={onClose}
            className="px-4 py-1.5 bg-slate-200 hover:bg-slate-300 text-slate-700 rounded-lg text-xs font-semibold"
          >
            Close Dossier
          </button>
        </div>
      </div>
    </div>
  );
};

interface ExportReportModalProps {
  onClose: () => void;
}

export const ExportReportModal: React.FC<ExportReportModalProps> = ({ onClose }) => {
  const [format, setFormat] = useState('pdf');
  const [downloading, setDownloading] = useState(false);

  const handleDownload = () => {
    setDownloading(true);
    setTimeout(() => {
      setDownloading(false);
      onClose();
    }, 1200);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 animate-in fade-in duration-150">
      <div className="bg-white rounded-2xl shadow-2xl border border-slate-200 w-full max-w-md overflow-hidden flex flex-col">
        <div className="bg-gov-900 text-white p-4 flex items-center justify-between">
          <h3 className="text-sm font-bold">Export State FRA Analytical Report</h3>
          <button onClick={onClose} className="text-slate-300 hover:text-white p-1 rounded">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-5 space-y-4 text-xs">
          <p className="text-slate-600">
            Generate the quarterly statutory compliance report for State Level Monitoring Committee (SLMC) with automated AI bottleneck diagnosis.
          </p>

          <div className="space-y-2">
            <label className="block text-[10px] font-bold uppercase text-slate-400">Select Export Format</label>
            <div className="grid grid-cols-3 gap-2">
              {['pdf', 'excel', 'csv'].map((fmt) => (
                <button
                  key={fmt}
                  type="button"
                  onClick={() => setFormat(fmt)}
                  className={`py-2 px-3 rounded-lg border text-center font-bold uppercase transition ${
                    format === fmt
                      ? 'border-gov-800 bg-gov-50 text-gov-900 shadow-xs'
                      : 'border-slate-200 text-slate-600 hover:bg-slate-50'
                  }`}
                >
                  {fmt}
                </button>
              ))}
            </div>
          </div>

          <div className="p-3 bg-slate-50 rounded-lg border border-slate-200 space-y-1">
            <span className="font-bold text-slate-800 block">Report Scope:</span>
            <ul className="list-disc list-inside text-slate-600 space-y-0.5">
              <li>28,500 State claims status breakdown</li>
              <li>District choropleth anomaly index</li>
              <li>SDLC field survey pendency backlog (&gt;90 days)</li>
            </ul>
          </div>

          <div className="pt-2 flex justify-end space-x-2">
            <button
              onClick={onClose}
              className="px-3 py-1.5 border border-slate-300 text-slate-700 rounded-lg hover:bg-slate-50"
            >
              Cancel
            </button>
            <button
              onClick={handleDownload}
              disabled={downloading}
              className="px-4 py-1.5 bg-gov-800 hover:bg-gov-900 text-white font-bold rounded-lg flex items-center space-x-1.5 shadow-sm"
            >
              <Download className="w-3.5 h-3.5" />
              <span>{downloading ? 'Generating...' : 'Export Document'}</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
