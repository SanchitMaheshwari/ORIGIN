import React, { useState } from 'react';
import { Header } from './components/Header';
import { HumanInTheLoopBanner } from './components/HumanInTheLoopBanner';
import { ClaimantView } from './components/ClaimantView';
import { EmployeeGisView } from './components/EmployeeGisView';
import { StateGovView } from './components/StateGovView';
import { CentralGovView } from './components/CentralGovView';
import { AiAssistantDrawer } from './components/AiAssistantDrawer';
import { Footer } from './components/Footer';
import { LoginPortal } from './components/LoginPortal';
import {
  FormAReceiptModal,
  GrievanceModal,
  DossierDetailModal,
  ExportReportModal
} from './components/Modals';
import { PRIMARY_CLAIM, NOTIFICATIONS } from './data/mockData';
import { RoleKey, ClaimRecord, NotificationItem } from './types';

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [currentRole, setCurrentRole] = useState<RoleKey>('claimant');
  const [notifications, setNotifications] = useState<NotificationItem[]>(NOTIFICATIONS);
  const [showReceipt, setShowReceipt] = useState(false);
  const [showGrievance, setShowGrievance] = useState(false);
  const [selectedDossierClaim, setSelectedDossierClaim] = useState<ClaimRecord | null>(null);
  const [showExportReport, setShowExportReport] = useState(false);

  const handleLogin = (role: RoleKey) => {
    setCurrentRole(role);
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  const handleMarkNotificationsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const handleFlagClaimForDlc = (claimId: string) => {
    const newNotif: NotificationItem = {
      id: `flag-${Date.now()}`,
      title: `Claim ${claimId} Flagged for DLC`,
      description: 'Marked as high priority for upcoming Sub-Divisional statutory session.',
      time: 'Just now',
      type: 'warning',
      read: false,
      linkTab: 'employee'
    };
    setNotifications(prev => [newNotif, ...prev]);
  };

  // If not logged in, display the SwasthyaSetu-styled FRA-MITRA GovTech Login Portal
  if (!isAuthenticated) {
    return (
      <>
        <LoginPortal
          onLogin={handleLogin}
          onOpenRegisterClaim={() => {
            setIsAuthenticated(true);
            setCurrentRole('claimant');
            setShowReceipt(true);
          }}
        />

        {/* Form A Receipt modal if triggered directly */}
        {showReceipt && (
          <FormAReceiptModal
            claim={PRIMARY_CLAIM}
            onClose={() => setShowReceipt(false)}
          />
        )}
      </>
    );
  }

  return (
    <div className="min-h-full flex flex-col font-sans overflow-x-hidden antialiased selection:bg-emerald-500 selection:text-white bg-slate-50">
      {/* Top Header with Portal navigation and Logout button */}
      <Header
        currentRole={currentRole}
        onSelectRole={setCurrentRole}
        notifications={notifications}
        onMarkNotificationsRead={handleMarkNotificationsRead}
        onNavigateNotification={setCurrentRole}
        onLogout={handleLogout}
      />

      {/* Human In The Loop Global Policy Banner */}
      <HumanInTheLoopBanner />

      {/* Main Dynamic View Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {currentRole === 'claimant' && (
          <ClaimantView
            claim={PRIMARY_CLAIM}
            onOpenReceipt={() => setShowReceipt(true)}
            onOpenGrievance={() => setShowGrievance(true)}
          />
        )}

        {currentRole === 'employee' && (
          <EmployeeGisView
            onOpenDossier={(claim) => setSelectedDossierClaim(claim)}
            onFlagForDlc={handleFlagClaimForDlc}
          />
        )}

        {currentRole === 'state' && (
          <StateGovView
            onExportReport={() => setShowExportReport(true)}
          />
        )}

        {currentRole === 'central' && (
          <CentralGovView
            onNavigateRole={setCurrentRole}
          />
        )}
      </main>

      {/* Floating Ask FRA-MITRA AI Assistant Widget */}
      <AiAssistantDrawer onOpenGrievance={() => setShowGrievance(true)} />

      {/* Footer */}
      <Footer />

      {/* Interactive Modals */}
      {showReceipt && (
        <FormAReceiptModal
          claim={PRIMARY_CLAIM}
          onClose={() => setShowReceipt(false)}
        />
      )}

      {showGrievance && (
        <GrievanceModal
          claim={PRIMARY_CLAIM}
          onClose={() => setShowGrievance(false)}
        />
      )}

      {selectedDossierClaim && (
        <DossierDetailModal
          claim={selectedDossierClaim}
          onClose={() => setSelectedDossierClaim(null)}
        />
      )}

      {showExportReport && (
        <ExportReportModal
          onClose={() => setShowExportReport(false)}
        />
      )}
    </div>
  );
}
