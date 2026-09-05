import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const HumanInTheLoopBanner: React.FC = () => {
  return (
    <div
      style={{ background: 'rgba(255,248,207,0.80)', borderBottom: '1px solid rgba(196,148,50,0.22)' }}
      className="text-amber-900 text-xs px-3 sm:px-5 lg:px-6 py-1.5 flex items-center backdrop-blur-sm"
    >
      <div className="w-full max-w-[1880px] mx-auto flex items-center justify-between gap-2">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-3.5 h-3.5 text-[#2A7C13] shrink-0" />
          <span className="text-[11px]">
            <strong className="text-[#2A7C13]">Mandatory Human-in-the-Loop Protocol:</strong>{' '}
            AI recommendations are strictly advisory and provide decision support only. Final rights conferment requires statutory sign-off by designated DLC / SDLC authorities.
          </span>
        </div>
        <span
          className="hidden md:inline-block text-[10px] font-mono text-amber-800 px-2 py-0.5 rounded border whitespace-nowrap"
          style={{ background: 'rgba(251,230,194,0.65)', borderColor: 'rgba(196,148,50,0.28)' }}
        >
          FRA Act 2006 compliance mode
        </span>
      </div>
    </div>
  );
};
