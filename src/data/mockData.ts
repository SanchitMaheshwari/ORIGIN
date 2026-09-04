import { ClaimRecord, DistrictMetric, NationalZone, NotificationItem } from '../types';

export const PRIMARY_CLAIM: ClaimRecord = {
  id: 'FRA-2026-MP-0941',
  claimantName: 'Mangar Gond',
  district: 'Bandhavgarh / Umaria',
  subDivision: 'Bandhavgarh',
  village: 'Rohaniya',
  category: 'IFR',
  plotId: 'F-412 (Plot 84/2)',
  landExtentHectares: 2.45,
  submissionDate: '25 Apr 2026',
  lastUpdateDate: '15 Aug 2026',
  status: 'Under Review',
  stageNumber: 4,
  rfCompartment: 'RF Compartment #218, Tala Zone, Village: Rohaniya (23.7142° N, 81.0284° E)',
  coordinates: { lat: 23.7142, lng: 81.0284 },
  anomalyScore: 7.8,
  anomalyReasons: [
    'Delayed claim (>180 days past initial filing)',
    'Revenue Land Record Mismatch (0.6 ha variance against RoR)',
    'GPS polygon boundary overlaps peripheral buffer zone'
  ],
  aiRecommendation: 'Schedule joint on-site DGPS re-survey with Revenue Inspector before DLC meeting.',
  assignedTeam: 'Tala Range Team',
  documentsCount: 7,
  allDocsAttached: true
};

export const PRIORITY_CLAIMS_QUEUE: ClaimRecord[] = [
  PRIMARY_CLAIM,
  {
    id: 'FRA-2026-MP-0942',
    claimantName: 'Devi Singh Baiga',
    district: 'Bandhavgarh / Umaria',
    subDivision: 'Bandhavgarh',
    village: 'Tala',
    category: 'IFR',
    plotId: 'F-413 (Plot 91/1)',
    landExtentHectares: 1.80,
    submissionDate: '02 May 2026',
    lastUpdateDate: '12 Aug 2026',
    status: 'Under Review',
    stageNumber: 3,
    rfCompartment: 'RF Compartment #114, Tala Sector (23.6890° N, 81.0112° E)',
    coordinates: { lat: 23.6890, lng: 81.0112 },
    anomalyScore: 7.8,
    anomalyReasons: ['Gram Sabha signature quorum discrepancy', 'Title conflict with neighbouring grazing boundary'],
    aiRecommendation: 'Reconvene Gram Sabha special session to verify attendee quorum signatures.',
    assignedTeam: 'Tala West Division',
    documentsCount: 6,
    allDocsAttached: false
  },
  {
    id: 'FRA-2026-MP-0943',
    claimantName: 'Budhram Kol',
    district: 'Bandhavgarh / Umaria',
    subDivision: 'Manpur',
    village: 'Kuchwaha',
    category: 'IFR',
    plotId: 'F-414 (Plot 12/4)',
    landExtentHectares: 3.10,
    submissionDate: '18 May 2026',
    lastUpdateDate: '08 Aug 2026',
    status: 'Under Review',
    stageNumber: 2,
    rfCompartment: 'RF Compartment #305, Manpur Range (23.7551° N, 81.0920° E)',
    coordinates: { lat: 23.7551, lng: 81.0920 },
    anomalyScore: 6.9,
    anomalyReasons: ['3 Generation ancestral occupancy proof needed for OTFD category'],
    aiRecommendation: 'Request forest department historical chitha records prior to 13 Dec 2005 cut-off date.',
    assignedTeam: 'Manpur Field Unit',
    documentsCount: 5,
    allDocsAttached: false
  },
  {
    id: 'FRA-2026-MP-0944',
    claimantName: 'Sukhiya Bai Gond',
    district: 'Bandhavgarh / Umaria',
    subDivision: 'Bandhavgarh',
    village: 'Padaria',
    category: 'IFR',
    plotId: 'F-415 (Plot 55/1)',
    landExtentHectares: 1.15,
    submissionDate: '29 May 2026',
    lastUpdateDate: '10 Aug 2026',
    status: 'Under Review',
    stageNumber: 2,
    rfCompartment: 'RF Compartment #089, Padaria Beat (23.7020° N, 81.0450° E)',
    coordinates: { lat: 23.7020, lng: 81.0450 },
    anomalyScore: 6.5,
    anomalyReasons: ['Pending Drone LiDAR boundary verification due to dense canopy cover'],
    aiRecommendation: 'Conduct foot patrol survey with hand-held RTK GPS receiver.',
    assignedTeam: 'Padaria Beat Guard',
    documentsCount: 7,
    allDocsAttached: true
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High AI Anomaly Flagged on Claim F-412',
    description: 'Score 7.8/10. 0.6 Ha discrepancy identified between RoR satellite boundary and field report in Bandhavgarh.',
    time: '12 mins ago',
    type: 'warning',
    read: false,
    linkTab: 'employee'
  },
  {
    id: 'notif-2',
    title: 'SDLC Batch Sync Completed',
    description: 'District Umaria batch data sync finalized with 1,250 records refreshed in State Registry.',
    time: '1 hour ago',
    type: 'success',
    read: false,
    linkTab: 'state'
  },
  {
    id: 'notif-3',
    title: 'Gram Sabha Resolution Logged - Rohaniya',
    description: 'Village assembly passed resolution for 14 individual claims awaiting SDLC schedule.',
    time: '3 hours ago',
    type: 'info',
    read: false,
    linkTab: 'claimant'
  }
];

export const ODISHA_DISTRICTS: DistrictMetric[] = [
  {
    id: 'sundargarh',
    name: 'Sundargarh',
    totalClaims: 5000,
    conferredClaims: 4100,
    conferredRate: 82,
    pendingClaims: 700,
    anomalyFlags: 24,
    avgDelayDays: 45,
    statusType: 'clearance'
  },
  {
    id: 'mayurbhanj',
    name: 'Mayurbhanj',
    totalClaims: 6000,
    conferredClaims: 3240,
    conferredRate: 54,
    pendingClaims: 2420,
    anomalyFlags: 65,
    avgDelayDays: 115,
    statusType: 'backlog'
  },
  {
    id: 'keonjhar',
    name: 'Keonjhar',
    totalClaims: 4200,
    conferredClaims: 2940,
    conferredRate: 70,
    pendingClaims: 1100,
    anomalyFlags: 38,
    avgDelayDays: 62,
    statusType: 'clearance'
  },
  {
    id: 'sambalpur',
    name: 'Sambalpur',
    totalClaims: 3800,
    conferredClaims: 2280,
    conferredRate: 60,
    pendingClaims: 1350,
    anomalyFlags: 42,
    avgDelayDays: 88,
    statusType: 'backlog'
  },
  {
    id: 'kandhamal',
    name: 'Kandhamal',
    totalClaims: 4500,
    conferredClaims: 1850,
    conferredRate: 41,
    pendingClaims: 2310,
    anomalyFlags: 140,
    avgDelayDays: 168,
    statusType: 'hotspot'
  },
  {
    id: 'koraput',
    name: 'Koraput',
    totalClaims: 5000,
    conferredClaims: 2150,
    conferredRate: 43,
    pendingClaims: 2400,
    anomalyFlags: 95,
    avgDelayDays: 142,
    statusType: 'hotspot'
  }
];

export const NATIONAL_ZONES: NationalZone[] = [
  {
    id: 'north',
    name: 'Northern Zone',
    label: 'J&K, HP, UK',
    claimsRecorded: 28000,
    conferredPercentage: 78,
    status: 'Fast Clearance',
    color: '#86efac'
  },
  {
    id: 'west',
    name: 'Western Zone',
    label: 'Rajasthan, Gujarat',
    claimsRecorded: 42000,
    conferredPercentage: 72,
    status: 'On Track',
    color: '#bbf7d0'
  },
  {
    id: 'central',
    name: 'Madhya Pradesh & CG',
    label: 'MP & Chhattisgarh',
    claimsRecorded: 76000,
    conferredPercentage: 51,
    status: 'Priority Action / SDLC Drive',
    color: '#fed7aa',
    targetRole: 'employee'
  },
  {
    id: 'east',
    name: 'Odisha & Jharkhand',
    label: 'Odisha & East',
    claimsRecorded: 68000,
    conferredPercentage: 68,
    status: 'Active State SLMC Oversight',
    color: '#fed7aa',
    targetRole: 'state'
  },
  {
    id: 'south',
    name: 'Southern Zone',
    label: 'MH, KA, KL, TN',
    claimsRecorded: 64000,
    conferredPercentage: 42,
    status: 'High Pending Backlogs',
    color: '#fecaca'
  },
  {
    id: 'ne',
    name: 'North East Zone',
    label: 'Assam, Tripura, Arunachal',
    claimsRecorded: 37000,
    conferredPercentage: 86,
    status: 'High CFR Conferment',
    color: '#86efac'
  }
];

export const DEFAULT_AI_CHAT_HISTORY: { role: 'user' | 'bot'; text: string }[] = [
  {
    role: 'bot',
    text: 'Namaste! I provide factual answers strictly from the official FRA Decision Support database. How can I assist with claim verification or GIS anomalies today?'
  },
  {
    role: 'user',
    text: 'What is the current bottleneck with claim F-412?'
  },
  {
    role: 'bot',
    text: 'Claim F-412 (Bandhavgarh) is currently under DLC review. The AI GIS engine flagged an anomaly score of 7.8/10 due to a 0.6 Ha discrepancy between RoR records and satellite geofencing. A joint on-site DGPS re-survey is scheduled for 22 Aug 2026.'
  }
];
