const fs = require('fs');
const path = require('path');

const topoPath = path.resolve(__dirname, '../karnataka.json');
const topo = JSON.parse(fs.readFileSync(topoPath, 'utf8'));

const scale = topo.transform.scale;
const translate = topo.transform.translate;

const decodedArcs = topo.arcs.map(arc => {
  let x = 0, y = 0;
  return arc.map(pt => {
    x += pt[0];
    y += pt[1];
    return [x * scale[0] + translate[0], y * scale[1] + translate[1]];
  });
});

function getArc(idx) {
  if (idx >= 0) return decodedArcs[idx];
  return decodedArcs[~idx].slice().reverse();
}

function assembleRing(arcIndices) {
  const ring = [];
  arcIndices.forEach(idx => {
    const arc = getArc(idx);
    const start = ring.length > 0 ? 1 : 0;
    for (let i = start; i < arc.length; i++) {
      ring.push(arc[i]);
    }
  });
  return ring;
}

function mercatorY(lat) {
  const latRad = lat * Math.PI / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}

const minLng = 74.085688, maxLng = 78.585809;
const minLat = 11.594585, maxLat = 18.454265;

const minMercY = mercatorY(minLat);
const maxMercY = mercatorY(maxLat);

// SVG dimensions: viewBox='0 0 500 360'
const heightSpan = 328;
const targetMinY = 16;
const targetMaxY = targetMinY + heightSpan; // 344

const lngRadSpan = (maxLng - minLng) * Math.PI / 180;
const latRadSpan = maxMercY - minMercY;
const geoAspect = lngRadSpan / latRadSpan;
const targetWidth = heightSpan * geoAspect; // ~207.6
const targetMinX = 172;

function project(lng, lat) {
  const x = targetMinX + ((lng - minLng) / (maxLng - minLng)) * targetWidth;
  const my = mercatorY(lat);
  const y = targetMaxY - ((my - minMercY) / (maxMercY - minMercY)) * heightSpan;
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringToSvgPath(ring) {
  return ring.map((pt, i) => {
    const [x, y] = project(pt[0], pt[1]);
    return (i === 0 ? 'M' : 'L') + x + ' ' + y;
  }).join('') + 'Z';
}

// Map each district name in karnataka.json to our metrics
const DISTRICT_METRICS = {
  'Shivamogga': {
    id: 'shimoga',
    displayName: 'Shimoga (Shivamogga)',
    totalClaims: 95431,
    conferredClaims: 2409,
    conferredRate: 2.5,
    pendingClaims: 2213,
    anomalyFlags: 98,
    avgDelayDays: 190,
    statusType: 'hotspot'
  },
  'Uttara Kannada': {
    id: 'uttara_kannada',
    displayName: 'Uttara Kannada',
    totalClaims: 85065,
    conferredClaims: 1741,
    conferredRate: 2.0,
    pendingClaims: 11763,
    anomalyFlags: 142,
    avgDelayDays: 220,
    statusType: 'hotspot'
  },
  'Chikkamagaluru': {
    id: 'chickmagalur',
    displayName: 'Chickmagalur (Chikkamagaluru)',
    totalClaims: 21213,
    conferredClaims: 1910,
    conferredRate: 9.0,
    pendingClaims: 0,
    anomalyFlags: 45,
    avgDelayDays: 120,
    statusType: 'backlog'
  },
  'Belagavi': {
    id: 'belgaum',
    displayName: 'Belgaum (Belagavi)',
    totalClaims: 17424,
    conferredClaims: 551,
    conferredRate: 3.2,
    pendingClaims: 0,
    anomalyFlags: 38,
    avgDelayDays: 140,
    statusType: 'backlog'
  },
  'Bagalkote': {
    id: 'bagalakote',
    displayName: 'Bagalkote',
    totalClaims: 11931,
    conferredClaims: 88,
    conferredRate: 0.7,
    pendingClaims: 0,
    anomalyFlags: 20,
    avgDelayDays: 110,
    statusType: 'backlog'
  },
  'Davanagere': {
    id: 'davanagere',
    displayName: 'Davanagere',
    totalClaims: 11034,
    conferredClaims: 616,
    conferredRate: 5.6,
    pendingClaims: 186,
    anomalyFlags: 28,
    avgDelayDays: 95,
    statusType: 'backlog'
  },
  'Mysuru': {
    id: 'mysore',
    displayName: 'Mysore (Mysuru)',
    totalClaims: 7340,
    conferredClaims: 961,
    conferredRate: 13.1,
    pendingClaims: 540,
    anomalyFlags: 32,
    avgDelayDays: 85,
    statusType: 'backlog'
  },
  'Kodagu': {
    id: 'kodagu',
    displayName: 'Kodagu',
    totalClaims: 4220,
    conferredClaims: 2385,
    conferredRate: 56.5,
    pendingClaims: 0,
    anomalyFlags: 18,
    avgDelayDays: 60,
    statusType: 'clearance'
  },
  'Chamarajanagara': {
    id: 'chamrajnagar',
    displayName: 'Chamrajnagar (Chamarajanagara)',
    totalClaims: 2480,
    conferredClaims: 2060,
    conferredRate: 83.1,
    pendingClaims: 0,
    anomalyFlags: 12,
    avgDelayDays: 45,
    statusType: 'clearance'
  },
  'Dakshina Kannada': {
    id: 'dakshina_kannada',
    displayName: 'Dakshina Kannada',
    totalClaims: 4620,
    conferredClaims: 2210,
    conferredRate: 53.6,
    pendingClaims: 145,
    anomalyFlags: 20,
    avgDelayDays: 52,
    statusType: 'clearance'
  },
  'Udupi': {
    id: 'udupi',
    displayName: 'Udupi',
    totalClaims: 3920,
    conferredClaims: 1820,
    conferredRate: 53.2,
    pendingClaims: 120,
    anomalyFlags: 15,
    avgDelayDays: 55,
    statusType: 'clearance'
  },
  'Hassan': {
    id: 'hassan',
    displayName: 'Hassan',
    totalClaims: 4860,
    conferredClaims: 540,
    conferredRate: 14.0,
    pendingClaims: 180,
    anomalyFlags: 22,
    avgDelayDays: 82,
    statusType: 'backlog'
  },
  'Ballari': {
    id: 'ballari',
    displayName: 'Ballari (Bellary)',
    totalClaims: 3250,
    conferredClaims: 310,
    conferredRate: 12.7,
    pendingClaims: 110,
    anomalyFlags: 16,
    avgDelayDays: 80,
    statusType: 'backlog'
  },
  'Chitradurga': {
    id: 'chitradurga',
    displayName: 'Chitradurga',
    totalClaims: 2750,
    conferredClaims: 280,
    conferredRate: 13.0,
    pendingClaims: 95,
    anomalyFlags: 14,
    avgDelayDays: 78,
    statusType: 'backlog'
  },
  'Tumakuru': {
    id: 'tumakuru',
    displayName: 'Tumakuru',
    totalClaims: 1950,
    conferredClaims: 250,
    conferredRate: 12.8,
    pendingClaims: 80,
    anomalyFlags: 12,
    avgDelayDays: 70,
    statusType: 'backlog'
  },
  'Haveri': {
    id: 'haveri',
    displayName: 'Haveri',
    totalClaims: 2260,
    conferredClaims: 245,
    conferredRate: 12.8,
    pendingClaims: 85,
    anomalyFlags: 12,
    avgDelayDays: 72,
    statusType: 'backlog'
  },
  'Kalaburagi': {
    id: 'kalaburagi',
    displayName: 'Kalaburagi (Gulbarga)',
    totalClaims: 1850,
    conferredClaims: 220,
    conferredRate: 11.9,
    pendingClaims: 90,
    anomalyFlags: 12,
    avgDelayDays: 75,
    statusType: 'backlog'
  },
  'Dharwad': {
    id: 'dharwad',
    displayName: 'Dharwad',
    totalClaims: 1780,
    conferredClaims: 230,
    conferredRate: 12.9,
    pendingClaims: 75,
    anomalyFlags: 10,
    avgDelayDays: 70,
    statusType: 'backlog'
  },
  'Raichur': {
    id: 'raichur',
    displayName: 'Raichur',
    totalClaims: 1680,
    conferredClaims: 195,
    conferredRate: 11.6,
    pendingClaims: 80,
    anomalyFlags: 11,
    avgDelayDays: 72,
    statusType: 'backlog'
  },
  'Yadgir': {
    id: 'yadgir',
    displayName: 'Yadgir',
    totalClaims: 1420,
    conferredClaims: 175,
    conferredRate: 12.3,
    pendingClaims: 55,
    anomalyFlags: 9,
    avgDelayDays: 68,
    statusType: 'backlog'
  },
  'Koppal': {
    id: 'koppal',
    displayName: 'Koppal',
    totalClaims: 1350,
    conferredClaims: 160,
    conferredRate: 11.9,
    pendingClaims: 65,
    anomalyFlags: 8,
    avgDelayDays: 65,
    statusType: 'backlog'
  },
  'Vijayapura': {
    id: 'vijayapura',
    displayName: 'Vijayapura (Bijapur)',
    totalClaims: 1068,
    conferredClaims: 140,
    conferredRate: 13.1,
    pendingClaims: 50,
    anomalyFlags: 7,
    avgDelayDays: 65,
    statusType: 'backlog'
  },
  'Bidar': {
    id: 'bidar',
    displayName: 'Bidar',
    totalClaims: 1120,
    conferredClaims: 140,
    conferredRate: 12.5,
    pendingClaims: 60,
    anomalyFlags: 8,
    avgDelayDays: 70,
    statusType: 'backlog'
  },
  'Gadag': {
    id: 'gadag',
    displayName: 'Gadag',
    totalClaims: 980,
    conferredClaims: 125,
    conferredRate: 12.8,
    pendingClaims: 40,
    anomalyFlags: 6,
    avgDelayDays: 60,
    statusType: 'backlog'
  },
  'Mandya': {
    id: 'mandya',
    displayName: 'Mandya',
    totalClaims: 940,
    conferredClaims: 120,
    conferredRate: 12.8,
    pendingClaims: 40,
    anomalyFlags: 6,
    avgDelayDays: 58,
    statusType: 'backlog'
  },
  'Chikkaballapura': {
    id: 'chikkaballapura',
    displayName: 'Chikkaballapura',
    totalClaims: 890,
    conferredClaims: 110,
    conferredRate: 12.4,
    pendingClaims: 35,
    anomalyFlags: 5,
    avgDelayDays: 58,
    statusType: 'backlog'
  },
  'Ramanagara': {
    id: 'ramanagara',
    displayName: 'Ramanagara',
    totalClaims: 820,
    conferredClaims: 105,
    conferredRate: 12.8,
    pendingClaims: 35,
    anomalyFlags: 5,
    avgDelayDays: 58,
    statusType: 'backlog'
  },
  'Kolar': {
    id: 'kolar',
    displayName: 'Kolar',
    totalClaims: 760,
    conferredClaims: 95,
    conferredRate: 12.5,
    pendingClaims: 30,
    anomalyFlags: 4,
    avgDelayDays: 55,
    statusType: 'backlog'
  },
  'Bengaluru Rural': {
    id: 'bengaluru_rural',
    displayName: 'Bengaluru Rural',
    totalClaims: 480,
    conferredClaims: 65,
    conferredRate: 13.5,
    pendingClaims: 20,
    anomalyFlags: 3,
    avgDelayDays: 50,
    statusType: 'backlog'
  },
  'Bengaluru Urban': {
    id: 'bengaluru_urban',
    displayName: 'Bengaluru Urban',
    totalClaims: 290,
    conferredClaims: 38,
    conferredRate: 13.1,
    pendingClaims: 12,
    anomalyFlags: 2,
    avgDelayDays: 45,
    statusType: 'backlog'
  }
};

const items = topo.objects.districts.geometries.map(g => {
  const name = g.properties.district;
  const dtCode = g.properties.dt_code;
  const meta = DISTRICT_METRICS[name] || {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    displayName: name,
    totalClaims: 500,
    conferredClaims: 60,
    conferredRate: 12.0,
    pendingClaims: 20,
    anomalyFlags: 3,
    avgDelayDays: 50,
    statusType: 'backlog'
  };

  let path = '';
  const rings = [];
  if (g.type === 'Polygon') {
    g.arcs.forEach(ringArcs => {
      const ring = assembleRing(ringArcs);
      rings.push(ring);
      path += ringToSvgPath(ring);
    });
  } else if (g.type === 'MultiPolygon') {
    g.arcs.forEach(polyArcs => {
      polyArcs.forEach(ringArcs => {
        const ring = assembleRing(ringArcs);
        rings.push(ring);
        path += ringToSvgPath(ring);
      });
    });
  }

  // Centroid (bounding box center or vertex average of max ring)
  let maxRing = rings[0];
  rings.forEach(r => { if (r.length > maxRing.length) maxRing = r; });
  let sumX = 0, sumY = 0;
  maxRing.forEach(pt => {
    const [px, py] = project(pt[0], pt[1]);
    sumX += px;
    sumY += py;
  });
  const cx = Math.round((sumX / maxRing.length) * 10) / 10;
  const cy = Math.round((sumY / maxRing.length) * 10) / 10;

  return {
    id: meta.id,
    dtCode,
    name,
    displayName: meta.displayName,
    path,
    cx,
    cy,
    metric: {
      id: meta.id,
      name: meta.displayName,
      totalClaims: meta.totalClaims,
      conferredClaims: meta.conferredClaims,
      conferredRate: meta.conferredRate,
      pendingClaims: meta.pendingClaims,
      anomalyFlags: meta.anomalyFlags,
      avgDelayDays: meta.avgDelayDays,
      statusType: meta.statusType
    }
  };
});

// Calculate grand total to verify
const totalClaims = items.reduce((s, it) => s + it.metric.totalClaims, 0);
console.log('Processed 30 districts from karnataka.json. Total claims =', totalClaims);

const outContent = `// Auto-generated from karnataka.json
import { DistrictMetric } from '../types';

export interface KarnatakaDistrictGeoItem {
  id: string;
  dtCode: string;
  name: string;
  displayName: string;
  path: string;
  cx: number;
  cy: number;
  metric: DistrictMetric;
}

export const KARNATAKA_GEO_DISTRICTS: KarnatakaDistrictGeoItem[] = ${JSON.stringify(items, null, 2)};

export const KARNATAKA_ALL_DISTRICTS: DistrictMetric[] = KARNATAKA_GEO_DISTRICTS.map(d => d.metric);
`;

const outputPath = path.resolve(__dirname, '../src/data/karnatakaGeoData.ts');
fs.writeFileSync(outputPath, outContent, 'utf8');
console.log('Saved to:', outputPath);
