import { ClaimRecord, DistrictMetric, NationalZone, NotificationItem } from '../types';

export const PRIMARY_CLAIM: ClaimRecord = {
  id: 'FRA-2026-TS-0941',
  claimantName: 'Somla Naik',
  district: 'Bhadradri Kothagudem',
  subDivision: 'Kothagudem',
  village: 'Allapalli',
  category: 'IFR',
  plotId: 'F-412 (Plot 84/2, Gundala Range)',
  landExtentHectares: 2.45,
  submissionDate: '25 Apr 2026',
  lastUpdateDate: '15 Aug 2026',
  status: 'Under Review',
  stageNumber: 4,
  rfCompartment: 'RF Compartment #218, Gundala Sector, Village: Allapalli (17.5504° N, 80.6215° E)',
  coordinates: { lat: 17.5504, lng: 80.6215 },
  anomalyScore: 7.8,
  anomalyReasons: [
    'Delayed claim (>180 days past initial filing)',
    'Podu Land Revenue Record Mismatch (0.6 ha variance against RoR)',
    'GPS polygon boundary overlaps peripheral reserve forest buffer zone'
  ],
  aiRecommendation: 'Schedule joint on-site DGPS re-survey with Forest Range Officer and Revenue Inspector before DLC session.',
  assignedTeam: 'Gundala Range Field Unit',
  documentsCount: 7,
  allDocsAttached: true
};

export const PRIORITY_CLAIMS_QUEUE: ClaimRecord[] = [
  PRIMARY_CLAIM,
  {
    id: 'FRA-2026-TS-0942',
    claimantName: 'Korra Bheema',
    district: 'Adilabad',
    subDivision: 'Utnoor',
    village: 'Narnoor',
    category: 'IFR',
    plotId: 'F-413 (Plot 91/1)',
    landExtentHectares: 1.80,
    submissionDate: '02 May 2026',
    lastUpdateDate: '12 Aug 2026',
    status: 'Under Review',
    stageNumber: 3,
    rfCompartment: 'RF Compartment #114, Utnoor Sector (19.6700° N, 78.5300° E)',
    coordinates: { lat: 19.6700, lng: 78.5300 },
    anomalyScore: 7.6,
    anomalyReasons: ['Gram Sabha signature quorum discrepancy', 'Title conflict with neighbouring CFR grazing boundary'],
    aiRecommendation: 'Reconvene Gram Sabha special session to verify attendee quorum signatures.',
    assignedTeam: 'Utnoor Tribal Field Division',
    documentsCount: 6,
    allDocsAttached: false
  },
  {
    id: 'FRA-2026-KA-0943',
    claimantName: 'Mallikarjun Gowda',
    district: 'Shimoga (Shivamogga)',
    subDivision: 'Sagar',
    village: 'Soraba',
    category: 'IFR',
    plotId: 'F-414 (Plot 12/4)',
    landExtentHectares: 3.10,
    submissionDate: '18 May 2026',
    lastUpdateDate: '08 Aug 2026',
    status: 'Under Review',
    stageNumber: 2,
    rfCompartment: 'RF Compartment #305, Sagar Western Ghats Range (13.9300° N, 75.5700° E)',
    coordinates: { lat: 13.9300, lng: 75.5700 },
    anomalyScore: 7.1,
    anomalyReasons: ['3 Generation ancestral occupancy proof needed for OTFD category (Western Ghats)'],
    aiRecommendation: 'Request forest department historical chitha records prior to 13 Dec 2005 cut-off date.',
    assignedTeam: 'Sagar Field Unit',
    documentsCount: 5,
    allDocsAttached: false
  },
  {
    id: 'FRA-2026-KA-0944',
    claimantName: 'Basavaraj Jenu Kuruba',
    district: 'Uttara Kannada',
    subDivision: 'Sirsi',
    village: 'Yellapur',
    category: 'IFR',
    plotId: 'F-415 (Plot 55/1)',
    landExtentHectares: 1.15,
    submissionDate: '29 May 2026',
    lastUpdateDate: '10 Aug 2026',
    status: 'Under Review',
    stageNumber: 2,
    rfCompartment: 'RF Compartment #089, Sirsi Beat (14.8000° N, 74.1300° E)',
    coordinates: { lat: 14.8000, lng: 74.1300 },
    anomalyScore: 6.5,
    anomalyReasons: ['Pending Drone LiDAR boundary verification due to dense evergreen canopy cover'],
    aiRecommendation: 'Conduct foot patrol survey with hand-held RTK GPS receiver.',
    assignedTeam: 'Sirsi Forest Division',
    documentsCount: 7,
    allDocsAttached: true
  }
];

export const NOTIFICATIONS: NotificationItem[] = [
  {
    id: 'notif-1',
    title: 'High AI Anomaly Flagged on Claim F-412',
    description: 'Score 7.8/10. 0.6 Ha discrepancy identified between RoR satellite boundary and field report in Bhadradri Kothagudem.',
    time: '12 mins ago',
    type: 'warning',
    read: false,
    linkTab: 'state'
  },
  {
    id: 'notif-2',
    title: 'SDLC Batch Sync Completed',
    description: 'Karnataka (Shimoga) and Telangana (Bhadradri Kothagudem) data sync finalized with 2,450 records refreshed in State Registry.',
    time: '1 hour ago',
    type: 'success',
    read: false,
    linkTab: 'state'
  },
  {
    id: 'notif-3',
    title: 'Gram Sabha Resolution Logged - Allapalli',
    description: 'Gundala village assembly passed resolution for 18 individual Podu land claims awaiting SDLC schedule.',
    time: '3 hours ago',
    type: 'info',
    read: false,
    linkTab: 'claimant'
  },
  {
    id: 'notif-4',
    title: 'MoTA National Telemetry & Satellite Sync',
    description: '726-District WebGIS multispectral land-use layer refreshed across all 36 States/UTs.',
    time: '4 hours ago',
    type: 'info',
    read: false,
    linkTab: 'central'
  }
];

export const KARNATAKA_DISTRICTS: DistrictMetric[] = [
  {
    id: 'shimoga',
    name: 'Shimoga (Shivamogga)',
    totalClaims: 95431,
    conferredClaims: 2409,
    conferredRate: 2.5,
    pendingClaims: 2213,
    anomalyFlags: 98,
    avgDelayDays: 190,
    statusType: 'hotspot'
  },
  {
    id: 'uttara_kannada',
    name: 'Uttara Kannada',
    totalClaims: 85065,
    conferredClaims: 1741,
    conferredRate: 2.0,
    pendingClaims: 11763,
    anomalyFlags: 142,
    avgDelayDays: 220,
    statusType: 'hotspot'
  },
  {
    id: 'chickmagalur',
    name: 'Chickmagalur (Chikkamagaluru)',
    totalClaims: 21213,
    conferredClaims: 1910,
    conferredRate: 9.0,
    pendingClaims: 0,
    anomalyFlags: 45,
    avgDelayDays: 120,
    statusType: 'backlog'
  },
  {
    id: 'belgaum',
    name: 'Belgaum (Belagavi)',
    totalClaims: 17424,
    conferredClaims: 551,
    conferredRate: 3.2,
    pendingClaims: 0,
    anomalyFlags: 38,
    avgDelayDays: 140,
    statusType: 'backlog'
  },
  {
    id: 'bagalakote',
    name: 'Bagalakote',
    totalClaims: 11931,
    conferredClaims: 88,
    conferredRate: 0.7,
    pendingClaims: 0,
    anomalyFlags: 20,
    avgDelayDays: 110,
    statusType: 'backlog'
  },
  {
    id: 'davanagere',
    name: 'Davanagere',
    totalClaims: 11034,
    conferredClaims: 616,
    conferredRate: 5.6,
    pendingClaims: 186,
    anomalyFlags: 28,
    avgDelayDays: 95,
    statusType: 'backlog'
  },
  {
    id: 'mysore',
    name: 'Mysore (Mysuru)',
    totalClaims: 7340,
    conferredClaims: 961,
    conferredRate: 13.1,
    pendingClaims: 540,
    anomalyFlags: 32,
    avgDelayDays: 85,
    statusType: 'backlog'
  },
  {
    id: 'kodagu',
    name: 'Kodagu',
    totalClaims: 4220,
    conferredClaims: 2385,
    conferredRate: 56.5,
    pendingClaims: 0,
    anomalyFlags: 18,
    avgDelayDays: 60,
    statusType: 'clearance'
  },
  {
    id: 'chamrajnagar',
    name: 'Chamrajnagar (Chamarajanagara)',
    totalClaims: 2480,
    conferredClaims: 2060,
    conferredRate: 83.1,
    pendingClaims: 0,
    anomalyFlags: 12,
    avgDelayDays: 45,
    statusType: 'clearance'
  }
];

export const TELANGANA_DISTRICTS: DistrictMetric[] = [
  {
    id: 'bhadradri_kothagudem',
    name: 'Bhadradri Kothagudem',
    totalClaims: 139691,
    conferredClaims: 68387,
    conferredRate: 49.0,
    pendingClaims: 46244,
    anomalyFlags: 184,
    avgDelayDays: 175,
    statusType: 'hotspot'
  },
  {
    id: 'mahabubabad',
    name: 'Mahabubabad',
    totalClaims: 65874,
    conferredClaims: 30220,
    conferredRate: 45.9,
    pendingClaims: 22338,
    anomalyFlags: 92,
    avgDelayDays: 150,
    statusType: 'backlog'
  },
  {
    id: 'adilabad',
    name: 'Adilabad',
    totalClaims: 64680,
    conferredClaims: 26779,
    conferredRate: 41.4,
    pendingClaims: 29472,
    anomalyFlags: 125,
    avgDelayDays: 180,
    statusType: 'hotspot'
  },
  {
    id: 'asifabad',
    name: 'Komaram Bheem Asifabad',
    totalClaims: 60280,
    conferredClaims: 26461,
    conferredRate: 43.9,
    pendingClaims: 28964,
    anomalyFlags: 110,
    avgDelayDays: 165,
    statusType: 'backlog'
  },
  {
    id: 'mulugu',
    name: 'Mulugu',
    totalClaims: 47994,
    conferredClaims: 12350,
    conferredRate: 25.7,
    pendingClaims: 28162,
    anomalyFlags: 140,
    avgDelayDays: 195,
    statusType: 'hotspot'
  },
  {
    id: 'kamareddy',
    name: 'Kamareddy',
    totalClaims: 33114,
    conferredClaims: 7136,
    conferredRate: 21.6,
    pendingClaims: 22380,
    anomalyFlags: 52,
    avgDelayDays: 135,
    statusType: 'backlog'
  },
  {
    id: 'khammam',
    name: 'Khammam',
    totalClaims: 32061,
    conferredClaims: 12970,
    conferredRate: 40.5,
    pendingClaims: 11958,
    anomalyFlags: 64,
    avgDelayDays: 115,
    statusType: 'backlog'
  },
  {
    id: 'nirmal',
    name: 'Nirmal',
    totalClaims: 26307,
    conferredClaims: 10908,
    conferredRate: 41.5,
    pendingClaims: 12364,
    anomalyFlags: 58,
    avgDelayDays: 120,
    statusType: 'backlog'
  },
  {
    id: 'nalgonda',
    name: 'Nalgonda',
    totalClaims: 28742,
    conferredClaims: 6701,
    conferredRate: 23.3,
    pendingClaims: 18072,
    anomalyFlags: 48,
    avgDelayDays: 130,
    statusType: 'backlog'
  }
];

// Retain alias for backward compatibility if any file imports it
export const ODISHA_DISTRICTS = TELANGANA_DISTRICTS;

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
    targetRole: 'state'
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
