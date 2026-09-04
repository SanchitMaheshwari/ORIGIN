export type RoleKey = 'claimant' | 'employee' | 'state' | 'central';

export interface ClaimRecord {
  id: string;
  claimantName: string;
  district: string;
  subDivision: string;
  village: string;
  category: 'IFR' | 'CFR' | 'CR';
  landExtentHectares: number;
  plotId: string;
  submissionDate: string;
  lastUpdateDate: string;
  status: 'Under Review' | 'Verified' | 'Gram Sabha Approved' | 'DLC Verification' | 'Conferred' | 'Rejected';
  stageNumber: number; // 1 to 5
  rfCompartment: string;
  coordinates: { lat: number; lng: number };
  anomalyScore: number;
  anomalyReasons?: string[];
  aiRecommendation?: string;
  assignedTeam: string;
  documentsCount: number;
  allDocsAttached: boolean;
}

export interface NotificationItem {
  id: string;
  title: string;
  description: string;
  time: string;
  type: 'warning' | 'success' | 'info';
  read: boolean;
  linkTab?: RoleKey;
}

export interface DistrictMetric {
  id: string;
  name: string;
  totalClaims: number;
  conferredClaims: number;
  conferredRate: number;
  pendingClaims: number;
  anomalyFlags: number;
  avgDelayDays: number;
  statusType: 'clearance' | 'backlog' | 'hotspot';
}

export interface NationalZone {
  id: string;
  name: string;
  label: string;
  claimsRecorded: number;
  conferredPercentage: number;
  status: string;
  color: string;
  targetRole?: RoleKey;
}

export interface ChatMessage {
  id: string;
  sender: 'user' | 'bot';
  text: string;
  timestamp: string;
  isAiInsight?: boolean;
}
