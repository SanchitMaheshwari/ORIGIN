import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="bg-gov-dark text-slate-300 text-xs py-4 border-t border-emerald-950 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-2">
        <div className="flex items-center space-x-2 text-center sm:text-left">
          <span>© 2026 Ministry of Tribal Affairs (MoTA), Government of India.</span>
          <span className="hidden md:inline text-slate-500">|</span>
          <span className="hidden md:inline text-slate-400">
            AI-Powered Forest Rights Act Decision Support System
          </span>
        </div>
        <div className="flex items-center space-x-4 text-[11px] text-emerald-400">
          <a
            href="#guidelines"
            onClick={(e) => {
              e.preventDefault();
              alert('FRA Act 2006 & Amendment Rules 2012 Guidelines loaded in system.');
            }}
            className="hover:underline"
          >
            FRA Guidelines 2006
          </a>
          <a
            href="#gis"
            onClick={(e) => {
              e.preventDefault();
              alert('GIS Spatial Standard: WGS 84 / UTM Zone 44N with DGPS tolerance <0.5m.');
            }}
            className="hover:underline"
          >
            GIS Metadata Standards
          </a>
          <a
            href="#privacy"
            onClick={(e) => {
              e.preventDefault();
              alert('Confidentiality: Scheduled Tribe personal identifiers encrypted under MoTA IT Security framework.');
            }}
            className="hover:underline"
          >
            Privacy &amp; Security
          </a>
        </div>
      </div>
    </footer>
  );
};
