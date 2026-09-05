import React from 'react';
import {
  Bell,
  Check,
  User,
  Landmark,
  Network,
  X,
  ExternalLink,
  LogOut,
  FileText,
  FileSpreadsheet,
  AlertTriangle,
  HelpCircle,
  Satellite,
  ShieldCheck
} from 'lucide-react';
import { RoleKey, NotificationItem } from '../types';

interface HeaderProps {
  currentRole: RoleKey;
  stateCode?: 'karnataka' | 'telangana';
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onNavigateNotification?: (role: RoleKey) => void;
  onLogout: () => void;
  onOpenReceipt?: () => void;
  onOpenGrievance?: () => void;
  onExportReport?: () => void;
}

interface RoleProfile {
  name: string;
  designation: string;
  subLocation: string;
  avatarUrl: string;
  badge: string;
  badgeClass: string;
}

const ROLE_PROFILES: Record<RoleKey, RoleProfile> = {
  claimant: {
    name: 'Somla Naik',
    designation: 'Citizen / Forest Dweller (IFR)',
    subLocation: 'Allapalli Village, Bhadradri Kothagudem (Telangana)',
    avatarUrl: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=150&auto=format&fit=crop&q=80',
    badge: 'CITIZEN PORTAL',
    badgeClass: 'bg-emerald-800 text-emerald-200 border-emerald-600'
  },
  state: {
    name: 'Dr. K. Manjunath, IAS',
    designation: 'Principal Secretary & State SLMC Member Secretary',
    subLocation: 'State SLMC • Karnataka',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'STATE GOVT PORTAL (KARNATAKA)',
    badgeClass: 'bg-amber-900 text-amber-200 border-amber-600'
  },
  central: {
    name: 'Rahul Sharma, IAS',
    designation: 'Joint Secretary & Central Nodal Officer',
    subLocation: 'Ministry of Tribal Affairs (MoTA), New Delhi',
    avatarUrl: 'https://lh3.googleusercontent.com/aida-public/AB6AXuCREhN0ceaDPvlmUX7jI3xDolFv6Eg3jCMayQbpzMrG9UzhDbNHzeAkES3AWJwvOFaUH3OV-HyUvkMfcYJgSxhufVspFFsdxpnQnGtaXwCautkW3US_4vbz8sBhXPLGnkujtb3pqovkmxqYTL_x22jr3odHEUEF9UlypseGZxAt1z-aQSTLAA7jhsv_TYV47cRKNNvrJv_CihYIH0u0LkMuhfqrshtBq1GTDBZrcyG427EkqAm3m8Pw7A',
    badge: 'NATIONAL MOTA PORTAL',
    badgeClass: 'bg-amber-900 text-amber-200 border-amber-600'
  }
};

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  stateCode = 'karnataka',
  notifications,
  onMarkNotificationsRead,
  onNavigateNotification,
  onLogout,
  onOpenReceipt,
  onOpenGrievance,
  onExportReport
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  // Filter notifications strictly for the authenticated governance tier
  const roleNotifications = notifications.filter(n => !n.linkTab || n.linkTab === currentRole);
  const unreadCount = roleNotifications.filter(n => !n.read).length;

  const stateProfile: RoleProfile = stateCode === 'telangana' ? {
    name: 'Smt. A. Sharada, IAS',
    designation: 'Principal Secretary & State SLMC Member Secretary',
    subLocation: 'State SLMC • BRKR Bhavan, Hyderabad, Telangana',
    avatarUrl: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    badge: 'STATE GOVT PORTAL (TELANGANA)',
    badgeClass: 'bg-emerald-900 text-emerald-200 border-emerald-600'
  } : {
    name: 'Dr. K. Manjunath, IAS',
    designation: 'Principal Secretary & State SLMC Member Secretary',
    subLocation: 'State SLMC • Vidhana Soudha, Bengaluru, Karnataka',
    avatarUrl: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    badge: 'STATE GOVT PORTAL (KARNATAKA)',
    badgeClass: 'bg-amber-900 text-amber-200 border-amber-600'
  };

  const profile = currentRole === 'state' ? stateProfile : ROLE_PROFILES[currentRole];

  return (
    <header className="bg-gov-900 text-white shadow-lg sticky top-0 z-40 border-b border-emerald-950">
      <div className="w-full max-w-[1880px] mx-auto px-3 sm:px-5 lg:px-6">
        {/* Top Branding Row */}
        <div className="flex items-center justify-between h-16">
          {/* Logo & Title */}
          <div className="flex items-center space-x-3">
            <div className="bg-white/10 p-1.5 rounded-lg border border-white/10 shadow-inner flex items-center">
              <svg className="h-9 w-auto" fill="none" viewBox="0 0 240 60" xmlns="http://www.w3.org/2000/svg">
                <g transform="translate(4, 6)">
                  <rect fill="#064E3B" height="48" rx="10" width="48" x="0" y="0"></rect>
                  <path d="M24 10L36 28H12L24 10Z" fill="#10B981" opacity="0.9"></path>
                  <path d="M24 16L32 30H16L24 16Z" fill="#34D399"></path>
                  <circle cx="24" cy="22" fill="#FBBF24" r="3.5"></circle>
                  <rect fill="#F59E0B" height="12" rx="1.5" width="3" x="22.5" y="28"></rect>
                  <circle cx="10" cy="18" fill="#6EE7B7" r="2"></circle>
                  <line stroke="#6EE7B7" strokeDasharray="2 2" strokeWidth="1.5" x1="12" x2="16" y1="19" y2="24"></line>
                  <circle cx="38" cy="18" fill="#6EE7B7" r="2"></circle>
                  <line stroke="#6EE7B7" strokeDasharray="2 2" strokeWidth="1.5" x1="36" x2="32" y1="19" y2="24"></line>
                </g>
                <text fill="#FFFFFF" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="20" fontWeight="800" letterSpacing="0.5" x="62" y="29">FRA-MITRA</text>
                <text fill="#34D399" fontFamily="'Plus Jakarta Sans', sans-serif" fontSize="9.5" fontWeight="600" letterSpacing="0.2" x="62" y="44">AI-Powered WebGIS Decision Support System</text>
              </svg>
            </div>
            <div className="hidden xl:block border-l border-emerald-800 pl-3">
              <div className="flex items-center space-x-2">
                <p className="text-xs uppercase font-bold text-emerald-200 tracking-wider">
                  {profile.badge}
                </p>
                <span className={`text-[9px] font-bold px-1.5 py-0.2 rounded border ${profile.badgeClass}`}>
                  Authenticated
                </span>
              </div>
              <p className="text-[10px] text-emerald-300/80">Scheduled Tribes and Other Traditional Forest Dwellers Act, 2006</p>
            </div>
          </div>

          {/* Right Side: Notifications & Role Identity */}
          <div className="flex items-center space-x-3 sm:space-x-4 relative">
            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                id="header-notification-btn"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative cursor-pointer hover:text-emerald-300 transition-colors p-2 rounded-lg hover:bg-white/5 focus:outline-none focus:ring-1 focus:ring-emerald-400"
                title="System Alerts"
                aria-label="View system alerts"
              >
                <Bell className="w-5 h-5" />
                {unreadCount > 0 && (
                  <span className="absolute top-1.5 right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-2 ring-gov-900">
                    {unreadCount}
                  </span>
                )}
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-96 rounded-xl shadow-2xl text-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150"
                     style={{ background: 'rgba(255,255,255,0.97)', border: '1px solid rgba(118,196,87,0.20)', backdropFilter: 'blur(16px)' }}>
                  <div className="text-white p-3.5 flex items-center justify-between" style={{ background: '#2A7C13' }}>
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">
                        {currentRole === 'claimant' ? 'My Claim Updates' : 'System Alerts & AI Flags'}
                      </span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={onMarkNotificationsRead}
                          className="text-[10px] text-emerald-300 hover:text-white underline flex items-center space-x-1 cursor-pointer"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-300 hover:text-white p-0.5 rounded cursor-pointer"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-2 space-y-2 divide-y divide-slate-100 scrollbar-thin">
                    {roleNotifications.length === 0 ? (
                      <div className="p-4 text-center text-xs text-slate-400">
                        No active alerts for this portal.
                      </div>
                    ) : (
                      roleNotifications.map((item) => (
                        <div
                          key={item.id}
                          className={`p-2.5 rounded-lg text-xs transition cursor-pointer hover:bg-slate-50 ${
                            item.type === 'warning' ? 'bg-rose-50/60 border border-rose-200' : 'bg-white'
                          }`}
                          onClick={() => {
                            if (onNavigateNotification && item.linkTab === currentRole) {
                              onNavigateNotification(item.linkTab);
                            }
                            setShowNotifications(false);
                          }}
                        >
                          <div className="flex items-start justify-between">
                            <span className={`font-bold ${item.type === 'warning' ? 'text-rose-800' : 'text-gov-900'}`}>
                              {item.title}
                            </span>
                            <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{item.time}</span>
                          </div>
                          <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.description}</p>
                        </div>
                      ))
                    )}
                  </div>
                  <div className="p-2 border-t text-center text-[10px] text-slate-500"
                       style={{ background: 'rgba(240,247,236,0.75)', borderColor: 'rgba(118,196,87,0.14)' }}>
                    Logged in to {profile.badge}
                  </div>
                </div>
              )}
            </div>

            {/* Authenticated User Identity */}
            <div className="flex items-center space-x-2 pl-3 border-l border-emerald-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">{profile.name}</p>
                <span className={`inline-block px-1.5 py-0.2 text-[10px] font-medium rounded border ${profile.badgeClass}`}>
                  {profile.designation}
                </span>
              </div>
              <img
                alt={profile.name}
                className="h-10 w-10 rounded-full border-2 border-emerald-400 object-cover shadow-sm ring-2 ring-black/20 shrink-0"
                src={profile.avatarUrl}
              />

              {/* Logout Button (Leads directly to login page) */}
              <button
                id="header-logout-btn"
                type="button"
                onClick={onLogout}
                className="flex items-center space-x-1.5 text-xs text-rose-200 hover:text-white bg-rose-950/60 hover:bg-rose-900/90 border border-rose-800/80 hover:border-rose-500/70 px-3 py-1.5 rounded-lg transition-all shadow-xs cursor-pointer ml-1.5 font-medium"
                title="Logout (Return to Login Page)"
              >
                <LogOut className="w-3.5 h-3.5 text-rose-300" />
                <span>Logout</span>
              </button>
            </div>
          </div>
        </div>

        {/* Role-Specific Services Navigation Bar */}
        {/* Strictly isolated: Claimant sees ONLY Claimant options, State sees ONLY State options, Central sees ONLY Central options */}
        <nav aria-label="Current Role Services" className="flex items-center justify-between py-2 overflow-x-auto border-t border-emerald-800/80 scrollbar-thin text-xs">
          {/* 1. CITIZEN / CLAIMANT VIEW ONLY */}
          {currentRole === 'claimant' && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-emerald-600 text-white rounded-md font-bold shadow-xs">
                <User className="w-3.5 h-3.5" />
                <span>My Forest Rights Claim: F-412 (Plot 84/2, Gundala Range)</span>
              </div>

              {onOpenReceipt && (
                <button
                  type="button"
                  id="claimant-nav-receipt-btn"
                  onClick={onOpenReceipt}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-md text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer font-medium"
                >
                  <FileText className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Download Form-A Receipt</span>
                </button>
              )}

              {onOpenGrievance && (
                <button
                  type="button"
                  id="claimant-nav-grievance-btn"
                  onClick={onOpenGrievance}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-md text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer font-medium"
                >
                  <AlertTriangle className="w-3.5 h-3.5 text-amber-400" />
                  <span>Lodge Grievance / Appeal</span>
                </button>
              )}
            </div>
          )}

          {/* 2. STATE GOVT VIEW ONLY */}
          {currentRole === 'state' && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-blue-700 text-white rounded-md font-bold shadow-xs">
                <Landmark className="w-3.5 h-3.5" />
                <span>
                  {stateCode === 'telangana'
                    ? 'Telangana State SLMC Monitoring & SDLC WebGIS (Agency Tracts)'
                    : 'Karnataka State SLMC Monitoring & SDLC WebGIS (Western Ghats)'}
                </span>
              </div>

              {onExportReport && (
                <button
                  type="button"
                  id="state-nav-export-btn"
                  onClick={onExportReport}
                  className="flex items-center space-x-1.5 px-3 py-1 rounded-md text-emerald-200 hover:text-white hover:bg-white/10 transition cursor-pointer font-medium"
                >
                  <FileSpreadsheet className="w-3.5 h-3.5 text-emerald-400" />
                  <span>
                    Export {stateCode === 'telangana' ? 'Telangana' : 'Karnataka'} SLMC Report
                  </span>
                </button>
              )}
            </div>
          )}

          {/* 3. CENTRAL GOVT VIEW ONLY */}
          {currentRole === 'central' && (
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-1.5 px-3 py-1 bg-amber-600 text-white rounded-md font-bold shadow-xs">
                <Network className="w-3.5 h-3.5" />
                <span>MoTA National Registry &amp; 726-District WebGIS Oversight</span>
              </div>

              <span className="text-[11px] text-emerald-300/80 font-mono hidden sm:inline">
                National Compliance: 66.6% Titles Conferred • 3,465 Anomaly Flags
              </span>
            </div>
          )}
        </nav>
      </div>
    </header>
  );
};
