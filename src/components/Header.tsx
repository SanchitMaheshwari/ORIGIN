import React from 'react';
import { Bell, Check, User, MapPin, Landmark, Network, X, ExternalLink } from 'lucide-react';
import { RoleKey, NotificationItem } from '../types';

interface HeaderProps {
  currentRole: RoleKey;
  onSelectRole: (role: RoleKey) => void;
  notifications: NotificationItem[];
  onMarkNotificationsRead: () => void;
  onNavigateNotification: (role: RoleKey) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRole,
  onSelectRole,
  notifications,
  onMarkNotificationsRead,
  onNavigateNotification
}) => {
  const [showNotifications, setShowNotifications] = React.useState(false);
  const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <header className="bg-gov-900 text-white shadow-lg sticky top-0 z-50 border-b border-emerald-950">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
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
              <p className="text-xs uppercase font-bold text-emerald-200 tracking-wider">MoTA &amp; State Tribal Welfare</p>
              <p className="text-[10px] text-emerald-300/80">Scheduled Tribes and Other Traditional Forest Dwellers Act, 2006</p>
            </div>
          </div>

          {/* Right Side: Notifications & Officer Profile */}
          <div className="flex items-center space-x-4 relative">
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
                <div className="absolute right-0 mt-2 w-80 sm:w-96 bg-white rounded-xl shadow-2xl border border-slate-200 text-slate-800 z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-gov-900 text-white p-3.5 flex items-center justify-between">
                    <div className="flex items-center space-x-2">
                      <Bell className="w-4 h-4 text-emerald-400" />
                      <span className="text-xs font-bold uppercase tracking-wider">System Alerts &amp; AI Flags</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      {unreadCount > 0 && (
                        <button
                          onClick={onMarkNotificationsRead}
                          className="text-[10px] text-emerald-300 hover:text-white underline flex items-center space-x-1"
                        >
                          <Check className="w-3 h-3" />
                          <span>Mark all read</span>
                        </button>
                      )}
                      <button
                        onClick={() => setShowNotifications(false)}
                        className="text-slate-300 hover:text-white p-0.5 rounded"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  </div>

                  <div className="max-h-72 overflow-y-auto p-2 space-y-2 divide-y divide-slate-100 scrollbar-thin">
                    {notifications.map((item) => (
                      <div
                        key={item.id}
                        className={`p-2.5 rounded-lg text-xs transition cursor-pointer hover:bg-slate-50 ${
                          item.type === 'warning' ? 'bg-rose-50/60 border border-rose-200' : 'bg-white'
                        }`}
                        onClick={() => {
                          if (item.linkTab) {
                            onNavigateNotification(item.linkTab);
                            setShowNotifications(false);
                          }
                        }}
                      >
                        <div className="flex items-start justify-between">
                          <span className={`font-bold ${item.type === 'warning' ? 'text-rose-800' : 'text-gov-900'}`}>
                            {item.title}
                          </span>
                          <span className="text-[10px] text-slate-400 whitespace-nowrap ml-2">{item.time}</span>
                        </div>
                        <p className="text-[11px] text-slate-600 mt-1 leading-snug">{item.description}</p>
                        {item.linkTab && (
                          <div className="mt-1.5 flex items-center text-[10px] text-emerald-700 font-semibold space-x-1">
                            <span>Open in Console</span>
                            <ExternalLink className="w-2.5 h-2.5" />
                          </div>
                        )}
                      </div>
                    ))}
                  </div>
                  <div className="p-2 bg-slate-50 border-t border-slate-100 text-center text-[10px] text-slate-500">
                    Live telemetry from District Umaria SDLC &amp; MoTA Central Node
                  </div>
                </div>
              )}
            </div>

            {/* Officer Info & Avatar */}
            <div className="flex items-center space-x-3 pl-3 border-l border-emerald-800">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-semibold text-white leading-tight">Rahul Sharma</p>
                <span className="inline-block px-1.5 py-0.5 text-[10px] font-medium bg-emerald-950 text-emerald-300 border border-emerald-700/50 rounded">
                  IAS / Nodal Officer
                </span>
              </div>
              <img
                alt="Rahul Sharma IAS"
                className="h-10 w-10 rounded-full border-2 border-emerald-400 object-cover shadow-sm ring-2 ring-black/20"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCREhN0ceaDPvlmUX7jI3xDolFv6Eg3jCMayQbpzMrG9UzhDbNHzeAkES3AWJwvOFaUH3OV-HyUvkMfcYJgSxhufVspFFsdxpnQnGtaXwCautkW3US_4vbz8sBhXPLGnkujtb3pqovkmxqYTL_x22jr3odHEUEF9UlypseGZxAt1z-aQSTLAA7jhsv_TYV47cRKNNvrJv_CihYIH0u0LkMuhfqrshtBq1GTDBZrcyG427EkqAm3m8Pw7A"
              />
            </div>
          </div>
        </div>

        {/* Navigation / Role Switcher Tabs Bar */}
        <nav aria-label="Role Switcher Tabs" className="flex space-x-2 py-2 overflow-x-auto border-t border-emerald-800/80 scrollbar-thin">
          <button
            id="tab-claimant"
            onClick={() => onSelectRole('claimant')}
            className={`role-tab flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              currentRole === 'claimant'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <User className="w-3.5 h-3.5" />
            <span>1. Citizen / Claimant View</span>
          </button>

          <button
            id="tab-employee"
            onClick={() => onSelectRole('employee')}
            className={`role-tab flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              currentRole === 'employee'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <MapPin className="w-3.5 h-3.5" />
            <span>2. Employee / SDLC Officer (GIS)</span>
          </button>

          <button
            id="tab-state"
            onClick={() => onSelectRole('state')}
            className={`role-tab flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              currentRole === 'state'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Landmark className="w-3.5 h-3.5" />
            <span>3. State Govt (Odisha / MP)</span>
          </button>

          <button
            id="tab-central"
            onClick={() => onSelectRole('central')}
            className={`role-tab flex items-center space-x-2 px-3 py-1.5 rounded-md text-xs font-semibold tracking-wide transition-all ${
              currentRole === 'central'
                ? 'bg-emerald-600 text-white shadow-sm'
                : 'text-emerald-100 hover:bg-white/10'
            }`}
          >
            <Network className="w-3.5 h-3.5" />
            <span>4. Central Govt (MoTA India)</span>
          </button>
        </nav>
      </div>
    </header>
  );
};
