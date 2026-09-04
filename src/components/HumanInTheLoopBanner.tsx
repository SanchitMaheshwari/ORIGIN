import React from 'react';
import { ShieldCheck } from 'lucide-react';

export const HumanInTheLoopBanner: React.FC = () => {
  return (
    <div className="bg-amber-50 border-b border-amber-200 text-amber-900 text-xs px-4 py-1.5 flex items-center justify-between font-medium">
      <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <ShieldCheck className="w-4 h-4 text-amber-600 shrink-0" />
          <span>
            <strong>Mandatory Human-in-the-Loop Protocol:</strong> AI recommendations are strictly advisory and provide decision support only. Final rights conferment requires statutory sign-off by designated DLC / SDLC authorities.
          </span>
        </div>
        <span className="hidden md:inline-block text-[11px] font-mono text-amber-700 bg-amber-100 px-2 py-0.5 rounded border border-amber-300">
          FRA Act 2006 compliance mode
        </span>
      </div>
    </div>
  );
};
