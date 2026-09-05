import React, { useState } from 'react';
import {
  Bell,
  User,
  Trees,
  Landmark,
  ShieldCheck,
  Building2,
  Globe,
  Lock,
  Eye,
  EyeOff,
  ChevronDown,
  Sparkles,
  PhoneCall,
  X,
  FileText,
  KeyRound,
  CheckCircle2
} from 'lucide-react';
import { RoleKey } from '../types';

interface LoginPortalProps {
  onLogin: (role: RoleKey, stateCode?: 'karnataka' | 'telangana') => void;
  onOpenRegisterClaim?: () => void;
}

type LoginTab = 'claimant' | 'state' | 'national';

export const LoginPortal: React.FC<LoginPortalProps> = ({
  onLogin,
  onOpenRegisterClaim
}) => {
  const [activeTab, setActiveTab] = useState<LoginTab>('claimant');
  const [selectedState, setSelectedState] = useState('Telangana');
  const [stateOfficialChoice, setStateOfficialChoice] = useState<'karnataka' | 'telangana'>('karnataka');
  const [identifier, setIdentifier] = useState('9876543210');
  const [password, setPassword] = useState('••••••••••');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [showEmergencyModal, setShowEmergencyModal] = useState(false);
  const [showNotifications, setShowNotifications] = useState(false);
  const [showForgotModal, setShowForgotModal] = useState(false);
  const [loginSuccessMessage, setLoginSuccessMessage] = useState<string | null>(null);

  const handleStateOfficialChoice = (choice: 'karnataka' | 'telangana') => {
    setStateOfficialChoice(choice);
    if (choice === 'karnataka') {
      setSelectedState('Karnataka');
      setIdentifier('SDLC-KA-2026-884');
      setPassword('KAGov@2026');
    } else {
      setSelectedState('Telangana');
      setIdentifier('SDLC-TG-2026-441');
      setPassword('TGGov@2026');
    }
  };

  // Switch role tab and prefill demo credentials
  const handleTabChange = (tab: LoginTab) => {
    setActiveTab(tab);
    if (tab === 'claimant') {
      setSelectedState('Telangana');
      setIdentifier('9876543210');
      setPassword('OTP-2026');
    } else if (tab === 'state') {
      if (stateOfficialChoice === 'telangana') {
        setSelectedState('Telangana');
        setIdentifier('SDLC-TG-2026-441');
        setPassword('TGGov@2026');
      } else {
        setSelectedState('Karnataka');
        setIdentifier('SDLC-KA-2026-884');
        setPassword('KAGov@2026');
      }
    } else if (tab === 'national') {
      setSelectedState('Karnataka');
      setIdentifier('MOTA-HQ-9901');
      setPassword('MoTA#India2026');
    }
  };

  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    const targetRole: RoleKey =
      activeTab === 'claimant'
        ? 'claimant'
        : activeTab === 'state'
        ? 'state'
        : 'central';

    const resolvedState: 'karnataka' | 'telangana' =
      stateOfficialChoice === 'telangana' ||
      selectedState.toLowerCase().includes('telangana') ||
      identifier.toUpperCase().includes('TG')
        ? 'telangana'
        : 'karnataka';

    const roleLabel =
      activeTab === 'claimant'
        ? 'Citizen Claimant Portal'
        : activeTab === 'state'
        ? resolvedState === 'karnataka'
          ? 'Karnataka State Government Portal'
          : 'Telangana State Government Portal'
        : 'National MoTA Central Portal';

    setLoginSuccessMessage(`Authenticated. Redirecting to ${roleLabel}...`);

    setTimeout(() => {
      setIsLoading(false);
      onLogin(targetRole, activeTab === 'state' ? resolvedState : undefined);
    }, 650);
  };

  return (
    <div className="min-h-screen flex flex-col font-sans bg-[#09261E] text-slate-100 relative selection:bg-emerald-500 selection:text-white">
      {/* 1. TOP HEADER & NAVIGATION BAR */}
      <header className="bg-[#0F382C] border-b border-emerald-950/80 px-3 sm:px-6 py-3.5 z-30 sticky top-0 shadow-md">
        <div className="w-full max-w-[1880px] mx-auto flex items-center justify-between">
          {/* Left Brand: Emblem Logo + Subtitle */}
          <div className="flex items-center space-x-3.5">
            <div className="flex items-center space-x-2.5 bg-[#154638] px-3 py-1.5 rounded-lg border border-emerald-700/50 shadow-sm">
              <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center text-emerald-400">
                <Trees className="w-4 h-4" />
              </div>
              <div className="flex flex-col">
                <span className="text-white font-extrabold text-sm tracking-wider leading-none">
                  FRA-MITRA
                </span>
                <span className="text-[9px] text-emerald-300/80 font-medium leading-tight">
                  AI-Powered WebGIS Decision Support
                </span>
              </div>
            </div>

            <div className="h-5 w-px bg-emerald-700/60 hidden sm:block" />

            <span className="text-white/90 text-sm font-serif italic tracking-wide hidden sm:inline-block">
              Forest Rights Act Portal
            </span>
          </div>

          {/* Right Utilities: Emergency Access, Notifications, Avatar */}
          <div className="flex items-center space-x-3 sm:space-x-4">
            {/* User Avatar */}
            <div className="flex items-center">
              <img
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuCREhN0ceaDPvlmUX7jI3xDolFv6Eg3jCMayQbpzMrG9UzhDbNHzeAkES3AWJwvOFaUH3OV-HyUvkMfcYJgSxhufVspFFsdxpnQnGtaXwCautkW3US_4vbz8sBhXPLGnkujtb3pqovkmxqYTL_x22jr3odHEUEF9UlypseGZxAt1z-aQSTLAA7jhsv_TYV47cRKNNvrJv_CihYIH0u0LkMuhfqrshtBq1GTDBZrcyG427EkqAm3m8Pw7A"
                alt="Authorized User"
                className="w-8 h-8 rounded-full border border-emerald-400/60 object-cover shadow-sm ring-2 ring-emerald-900/40"
              />
            </div>

            {/* Notification Bell with Badge */}
            <div className="relative">
              <button
                type="button"
                onClick={() => setShowNotifications(!showNotifications)}
                className="relative p-1.5 text-emerald-200 hover:text-white hover:bg-emerald-800/40 rounded-lg transition-colors cursor-pointer"
                title="Notifications"
                aria-label="View notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute -top-0.5 -right-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[10px] font-bold text-white shadow-sm ring-1 ring-[#0F382C]">
                  2
                </span>
              </button>

              {/* Notification Popover Dropdown */}
              {showNotifications && (
                <div className="absolute right-0 mt-2 w-80 sm:w-88 bg-white text-slate-800 rounded-xl shadow-2xl border border-slate-200 z-50 overflow-hidden text-xs animate-in fade-in zoom-in-95 duration-150">
                  <div className="bg-[#0F382C] text-white px-3.5 py-2.5 flex items-center justify-between">
                    <span className="font-bold flex items-center space-x-1.5">
                      <Bell className="w-3.5 h-3.5 text-emerald-400" />
                      <span>GovTech Live Alerts</span>
                    </span>
                    <button
                      onClick={() => setShowNotifications(false)}
                      className="text-slate-300 hover:text-white p-0.5"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                  <div className="p-3 space-y-2.5 divide-y divide-slate-100 max-h-64 overflow-y-auto">
                    <div className="pt-1">
                      <p className="font-bold text-gov-900">Gram Sabha Verification Drive</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Umaria District special SDLC batch session scheduled for 34 CFR boundary dossiers.
                      </p>
                    </div>
                    <div className="pt-2">
                      <p className="font-bold text-amber-700">MoTA Data Sync Complete</p>
                      <p className="text-[11px] text-slate-600 mt-0.5">
                        Synchronized satellite multispectral polygon boundaries across 18 partner states.
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Emergency Access Pill Badge */}
            <button
              type="button"
              onClick={() => setShowEmergencyModal(true)}
              className="bg-[#A3E635] hover:bg-[#86EFAC] text-[#0F382C] font-bold text-xs px-3.5 py-1.5 rounded-full shadow-sm hover:shadow transition-all duration-150 flex items-center space-x-1.5 cursor-pointer"
            >
              <PhoneCall className="w-3.5 h-3.5" />
              <span>Emergency Access</span>
            </button>
          </div>
        </div>
      </header>

      {/* 2. HERO SECTION & AUTHENTICATION CARD */}
      <div className="flex-1 relative flex items-center justify-center p-4 sm:p-8 lg:p-12 overflow-hidden">
        {/* Background Image with Authentic Forest Department Photo */}
        <div
          className="absolute inset-0 bg-cover bg-center z-0 scale-105 transform transition-transform duration-1000"
          style={{
            backgroundImage: "url('/bg.png')",
            filter: 'brightness(0.92)'
          }}
        />

        {/* Deep Emerald / Pine Green Overlay Gradients */}
        <div className="absolute inset-0 bg-gradient-to-r from-[#0a271f]/94 via-[#0d3429]/88 to-[#09221b]/95 z-0" />
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/35 via-transparent to-black/50 z-0 pointer-events-none" />

        {/* Center Content Container */}
        <div className="w-full max-w-[1880px] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center relative z-10 px-3 sm:px-6">
          {/* LEFT HERO CONTENT (7 Cols) */}
          <div className="lg:col-span-7 space-y-6 sm:space-y-8 pr-0 lg:pr-6">
            <div className="space-y-4">
              <h1 className="font-serif text-3xl sm:text-4xl md:text-5xl lg:text-[3.25rem] text-white font-bold leading-[1.15] tracking-tight drop-shadow-md">
                Secure &amp; Unified{' '}
                <span className="text-[#86EFAC] italic font-serif inline-block">
                  Forest Rights
                </span>{' '}
                Access for ALL Citizens
              </h1>

              <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed max-w-xl font-normal drop-shadow">
                Access your Individual &amp; Community claims, track progress, and coordinate
                state and national forest management seamlessly. A centralized platform for
                transparent forest governance.
              </p>
            </div>

            {/* Metric Badges (Horizontal Layout) */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              {/* Badge 1 */}
              <div className="bg-[#0b2b22]/70 backdrop-blur-md border border-emerald-500/25 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg hover:border-emerald-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[#86EFAC] shrink-0">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">100% Secure</p>
                  <p className="text-emerald-200/70 text-xs">Data Encrypted</p>
                </div>
              </div>

              {/* Badge 2 */}
              <div className="bg-[#0b2b22]/70 backdrop-blur-md border border-emerald-500/25 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg hover:border-emerald-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[#86EFAC] shrink-0">
                  <Building2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">18+</p>
                  <p className="text-emerald-200/70 text-xs">States Processed</p>
                </div>
              </div>

              {/* Badge 3 */}
              <div className="bg-[#0b2b22]/70 backdrop-blur-md border border-emerald-500/25 rounded-xl p-3.5 flex items-center space-x-3 shadow-lg hover:border-emerald-400/40 transition-colors">
                <div className="w-10 h-10 rounded-lg bg-emerald-500/20 flex items-center justify-center text-[#86EFAC] shrink-0">
                  <Globe className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-white font-bold text-sm tracking-wide">Unified</p>
                  <p className="text-emerald-200/70 text-xs">MoTA Portal</p>
                </div>
              </div>
            </div>

            {/* Quick Demo Credentials Assistant */}
            <div className="pt-2">
              <div className="inline-flex items-center space-x-2 text-xs text-emerald-200/80 bg-emerald-950/60 backdrop-blur-sm px-3.5 py-1.5 rounded-full border border-emerald-800/60">
                <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                <span>Choose a role tab on the right to test Claimant, State, or National portals</span>
              </div>
            </div>
          </div>

          {/* RIGHT AUTHENTICATION CARD (5 Cols) */}
          <div className="lg:col-span-5 w-full max-w-md mx-auto">
            <div className="bg-white text-slate-800 rounded-[18px] shadow-2xl border border-slate-100 p-6 sm:p-7 relative overflow-hidden transition-all duration-200">
              {/* Top Segmented Role Selector (3 Tabs) */}
              <div className="bg-slate-100/90 p-1 rounded-xl flex items-center justify-between mb-5 border border-slate-200/70">
                <button
                  type="button"
                  id="login-tab-claimant"
                  onClick={() => handleTabChange('claimant')}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'claimant'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <User className="w-3.5 h-3.5 text-slate-700" />
                  <span>Claimant</span>
                </button>

                <button
                  type="button"
                  id="login-tab-state"
                  onClick={() => handleTabChange('state')}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'state'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Trees className="w-3.5 h-3.5 text-emerald-700" />
                  <span>State Official</span>
                </button>

                <button
                  type="button"
                  id="login-tab-national"
                  onClick={() => handleTabChange('national')}
                  className={`flex-1 flex items-center justify-center space-x-1.5 py-2 px-2 rounded-lg text-xs font-semibold transition-all cursor-pointer ${
                    activeTab === 'national'
                      ? 'bg-white text-slate-900 shadow-sm border border-slate-200/60'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  <Landmark className="w-3.5 h-3.5 text-blue-700" />
                  <span>National Official</span>
                </button>
              </div>

              {/* Login Form */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Dedicated State Dashboard Sub-Selector (When State Tab is active) */}
                {activeTab === 'state' && (
                  <div className="p-2.5 bg-emerald-50/90 rounded-xl border border-emerald-200 space-y-2">
                    <div className="flex items-center justify-between text-[11px]">
                      <span className="font-bold text-emerald-950 uppercase tracking-wide flex items-center space-x-1.5">
                        <Landmark className="w-3.5 h-3.5 text-emerald-700" />
                        <span>Select State Official Dashboard</span>
                      </span>
                      <span className="text-[10px] text-emerald-700 font-semibold">Separate Portals</span>
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        type="button"
                        id="btn-login-karnataka-choice"
                        onClick={() => handleStateOfficialChoice('karnataka')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center cursor-pointer border ${
                          stateOfficialChoice === 'karnataka'
                            ? 'bg-gov-900 text-white border-gov-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-amber-400 inline-block" />
                          <span>Karnataka SLMC</span>
                        </span>
                        <span className="text-[9.5px] font-normal opacity-85 mt-0.5">Dr. K. Manjunath, IAS</span>
                      </button>

                      <button
                        type="button"
                        id="btn-login-telangana-choice"
                        onClick={() => handleStateOfficialChoice('telangana')}
                        className={`py-2 px-2.5 rounded-lg text-xs font-bold transition flex flex-col items-center justify-center text-center cursor-pointer border ${
                          stateOfficialChoice === 'telangana'
                            ? 'bg-gov-900 text-white border-gov-900 shadow-xs'
                            : 'bg-white text-slate-700 border-slate-200 hover:bg-slate-50'
                        }`}
                      >
                        <span className="flex items-center space-x-1">
                          <span className="w-2 h-2 rounded-full bg-emerald-400 inline-block" />
                          <span>Telangana SLMC</span>
                        </span>
                        <span className="text-[9.5px] font-normal opacity-85 mt-0.5">Smt. A. Sharada, IAS</span>
                      </button>
                    </div>
                  </div>
                )}

                {/* 1. State Dropdown Field */}
                <div>
                  <label
                    htmlFor="state-select"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    Select State (Karnataka / Telangana)
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-emerald-700">
                      <Trees className="w-4 h-4" />
                    </div>
                    <select
                      id="state-select"
                      value={selectedState}
                      onChange={(e) => {
                        const val = e.target.value;
                        setSelectedState(val);
                        if (activeTab === 'state') {
                          if (val === 'Karnataka') {
                            handleStateOfficialChoice('karnataka');
                          } else if (val === 'Telangana') {
                            handleStateOfficialChoice('telangana');
                          }
                        }
                      }}
                      className="w-full pl-9 pr-8 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 font-medium focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all appearance-none cursor-pointer"
                    >
                      <option value="Karnataka">Karnataka (District Shimoga, Uttara Kannada, Kodagu)</option>
                      <option value="Telangana">Telangana (District Bhadradri Kothagudem, Adilabad)</option>
                    </select>
                    <div className="absolute inset-y-0 right-0 pr-3 flex items-center pointer-events-none text-slate-400">
                      <ChevronDown className="w-4 h-4" />
                    </div>
                  </div>
                </div>

                {/* 2. Identification Field */}
                <div>
                  <label
                    htmlFor="identifier-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {activeTab === 'claimant'
                      ? 'Mobile Number / Aadhaar (for OTP)'
                      : activeTab === 'state'
                      ? 'Official Employee ID / Email'
                      : 'MoTA Officer ID / Official Email'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <Lock className="w-4 h-4" />
                    </div>
                    <input
                      id="identifier-input"
                      type="text"
                      required
                      value={identifier}
                      onChange={(e) => {
                        const val = e.target.value;
                        setIdentifier(val);
                        if (activeTab === 'state') {
                          if (val.toUpperCase().includes('TG') || val.toLowerCase().includes('telangana')) {
                            setStateOfficialChoice('telangana');
                            setSelectedState('Telangana');
                          } else if (val.toUpperCase().includes('KA') || val.toLowerCase().includes('karnataka')) {
                            setStateOfficialChoice('karnataka');
                            setSelectedState('Karnataka');
                          }
                        }
                      }}
                      placeholder={
                        activeTab === 'claimant'
                          ? 'Enter 10-digit Mobile or 12-digit Aadhaar'
                          : activeTab === 'state'
                          ? 'e.g. SDLC-KA-2026-884 or SDLC-TG-2026-441'
                          : 'e.g. MOTA-HQ-9901'
                      }
                      className="w-full pl-9 pr-3 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all font-mono"
                    />
                  </div>
                </div>

                {/* 3. Password / OTP Field */}
                <div>
                  <label
                    htmlFor="password-input"
                    className="block text-xs font-medium text-slate-700 mb-1.5"
                  >
                    {activeTab === 'claimant' ? 'Password / OTP' : 'Official Password / Key'}
                  </label>
                  <div className="relative">
                    <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-slate-400">
                      <KeyRound className="w-4 h-4" />
                    </div>
                    <input
                      id="password-input"
                      type={showPassword ? 'text' : 'password'}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      placeholder="Enter Password or OTP"
                      className="w-full pl-9 pr-10 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-xs sm:text-sm text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition-all"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute inset-y-0 right-0 pr-3 flex items-center text-slate-400 hover:text-slate-600 cursor-pointer"
                      aria-label="Toggle password visibility"
                    >
                      {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                    </button>
                  </div>
                </div>

                {/* 4. Utility Row (Remember Me & Forgot Password) */}
                <div className="flex items-center justify-between text-xs pt-0.5">
                  <label className="flex items-center space-x-2 text-slate-600 cursor-pointer select-none">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="w-3.5 h-3.5 text-emerald-700 rounded border-slate-300 focus:ring-emerald-500 accent-emerald-700 cursor-pointer"
                    />
                    <span>Remember me</span>
                  </label>

                  <button
                    type="button"
                    onClick={() => setShowForgotModal(true)}
                    className="text-slate-600 hover:text-emerald-800 font-medium cursor-pointer"
                  >
                    Forgot password?
                  </button>
                </div>

                {/* 5. Primary Action Button (Wide Pill #0D3B2E) */}
                <button
                  type="submit"
                  id="btn-secure-login"
                  disabled={isLoading}
                  className="w-full bg-[#0D3B2E] hover:bg-[#0F382C] active:bg-[#07241C] text-white font-bold py-3 px-4 rounded-xl text-sm tracking-wide shadow-md hover:shadow-lg transition-all transform active:scale-[0.99] flex items-center justify-center space-x-2 cursor-pointer disabled:opacity-75"
                >
                  {isLoading ? (
                    <div className="flex items-center space-x-2">
                      <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                      <span>Verifying Credentials...</span>
                    </div>
                  ) : (
                    <span>Secure Login</span>
                  )}
                </button>

                {loginSuccessMessage && (
                  <div className="p-2 bg-emerald-50 border border-emerald-200 rounded-lg text-emerald-800 text-xs text-center flex items-center justify-center space-x-1.5 animate-in fade-in">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                    <span>{loginSuccessMessage}</span>
                  </div>
                )}

                {/* 6. Footer Link (Register Claim) */}
                <div className="pt-2 text-center text-xs text-slate-600 border-t border-slate-100">
                  <span>New to FRA? </span>
                  <button
                    type="button"
                    onClick={() => {
                      if (onOpenRegisterClaim) {
                        onOpenRegisterClaim();
                      } else {
                        // Directly load claimant view where receipt & claim filing can be explored
                        onLogin('claimant');
                      }
                    }}
                    className="font-bold text-slate-900 hover:text-emerald-700 underline underline-offset-2 transition-colors cursor-pointer"
                  >
                    Register Claim
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>

      {/* 3. BOTTOM FOOTER BAR */}
      <footer className="bg-[#0A261E] border-t border-emerald-950/70 py-2.5 px-3 sm:px-6 z-20">
        <div className="w-full max-w-[1880px] mx-auto flex items-center justify-center relative">
          <p className="text-[11px] text-emerald-300/80 tracking-wide font-medium">
            FRA Act 2006 compliance mode
          </p>

          {/* Accent sparkle motif on right */}
          <div className="absolute right-0 text-emerald-400/80">
            <Sparkles className="w-4 h-4" />
          </div>
        </div>
      </footer>

      {/* EMERGENCY ACCESS MODAL */}
      {showEmergencyModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-rose-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <div className="flex items-center space-x-2 text-rose-700">
                <PhoneCall className="w-5 h-5" />
                <h3 className="font-bold text-base">Emergency Forest Rights Access</h3>
              </div>
              <button
                onClick={() => setShowEmergencyModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-600">
              <p>
                Under Section 4(5) of FRA 2006, traditional forest dwellers cannot be evicted or
                removed until the full claim verification process is completed.
              </p>
              <div className="bg-rose-50 border border-rose-200 rounded-xl p-3.5 space-y-1.5">
                <p className="font-bold text-rose-900">National MoTA Helpline</p>
                <p className="text-lg font-extrabold text-rose-800 font-mono">1800-11-7788</p>
                <p className="text-[11px] text-rose-700">
                  Available 24x7 in Hindi, Odia, Gondi, Santhali, and English.
                </p>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                type="button"
                onClick={() => setShowEmergencyModal(false)}
                className="bg-[#0F382C] text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-[#07241C]"
              >
                Close Notice
              </button>
            </div>
          </div>
        </div>
      )}

      {/* FORGOT PASSWORD MODAL */}
      {showForgotModal && (
        <div className="fixed inset-0 z-50 bg-black/70 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-md w-full p-6 text-slate-800 shadow-2xl border border-emerald-200 animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-3 border-b border-slate-100">
              <h3 className="font-bold text-base text-gov-900">Reset Password or Request OTP</h3>
              <button
                onClick={() => setShowForgotModal(false)}
                className="text-slate-400 hover:text-slate-700 p-1"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="py-4 space-y-3 text-xs sm:text-sm text-slate-600">
              <p>
                An Aadhaar-linked OTP or official verification link will be dispatched to your
                registered mobile number.
              </p>
              <input
                type="text"
                placeholder="Enter Mobile / Aadhaar / Employee ID"
                defaultValue={identifier}
                className="w-full px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm"
              />
            </div>
            <div className="pt-2 flex justify-end space-x-2">
              <button
                type="button"
                onClick={() => setShowForgotModal(false)}
                className="px-3.5 py-2 rounded-xl text-xs text-slate-600 hover:bg-slate-100"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={() => {
                  alert('OTP has been dispatched to your registered number (Demo OTP: 2026).');
                  setShowForgotModal(false);
                }}
                className="bg-emerald-700 text-white px-4 py-2 rounded-xl text-xs font-bold hover:bg-emerald-800"
              >
                Send OTP
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
