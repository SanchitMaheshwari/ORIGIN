const fs = require('fs');
const path = require('path');

const topoPath = path.resolve(__dirname, '../telangana.json');
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

const minLng = 77.235913, maxLng = 81.321098;
const minLat = 15.836283, maxLat = 19.914691;

const minMercY = mercatorY(minLat);
const maxMercY = mercatorY(maxLat);

// SVG dimensions: viewBox='0 0 500 360'
const heightSpan = 320;
const targetMinY = 20;
const targetMaxY = targetMinY + heightSpan; // 340

const lngRadSpan = (maxLng - minLng) * Math.PI / 180;
const latRadSpan = maxMercY - minMercY;
const geoAspect = lngRadSpan / latRadSpan;
const targetWidth = heightSpan * geoAspect; // ~305.0
const targetMinX = Math.round((500 - targetWidth) / 2); // ~98

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

const DISTRICT_METRICS = {
  'Bhadradri Kothagudem': {
    id: 'bhadradri_kothagudem',
    displayName: 'Bhadradri Kothagudem',
    totalClaims: 139691,
    conferredClaims: 68387,
    conferredRate: 49.0,
    pendingClaims: 46244,
    anomalyFlags: 184,
    avgDelayDays: 175,
    statusType: 'hotspot'
  },
  'Mahabubabad': {
    id: 'mahabubabad',
    displayName: 'Mahabubabad',
    totalClaims: 65874,
    conferredClaims: 30220,
    conferredRate: 45.9,
    pendingClaims: 22338,
    anomalyFlags: 92,
    avgDelayDays: 150,
    statusType: 'backlog'
  },
  'Adilabad': {
    id: 'adilabad',
    displayName: 'Adilabad',
    totalClaims: 64680,
    conferredClaims: 26779,
    conferredRate: 41.4,
    pendingClaims: 29472,
    anomalyFlags: 125,
    avgDelayDays: 180,
    statusType: 'hotspot'
  },
  'Komaram Bheem': {
    id: 'asifabad',
    displayName: 'Komaram Bheem (Asifabad)',
    totalClaims: 60280,
    conferredClaims: 26461,
    conferredRate: 43.9,
    pendingClaims: 28964,
    anomalyFlags: 110,
    avgDelayDays: 165,
    statusType: 'backlog'
  },
  'Mulugu': {
    id: 'mulugu',
    displayName: 'Mulugu',
    totalClaims: 47994,
    conferredClaims: 12350,
    conferredRate: 25.7,
    pendingClaims: 28162,
    anomalyFlags: 140,
    avgDelayDays: 195,
    statusType: 'hotspot'
  },
  'Kamareddy': {
    id: 'kamareddy',
    displayName: 'Kamareddy',
    totalClaims: 33114,
    conferredClaims: 7136,
    conferredRate: 21.6,
    pendingClaims: 22380,
    anomalyFlags: 52,
    avgDelayDays: 135,
    statusType: 'backlog'
  },
  'Khammam': {
    id: 'khammam',
    displayName: 'Khammam',
    totalClaims: 32061,
    conferredClaims: 12970,
    conferredRate: 40.5,
    pendingClaims: 11958,
    anomalyFlags: 64,
    avgDelayDays: 115,
    statusType: 'backlog'
  },
  'Nalgonda': {
    id: 'nalgonda',
    displayName: 'Nalgonda',
    totalClaims: 28742,
    conferredClaims: 6701,
    conferredRate: 23.3,
    pendingClaims: 18072,
    anomalyFlags: 48,
    avgDelayDays: 130,
    statusType: 'backlog'
  },
  'Nirmal': {
    id: 'nirmal',
    displayName: 'Nirmal',
    totalClaims: 26307,
    conferredClaims: 10908,
    conferredRate: 41.5,
    pendingClaims: 12364,
    anomalyFlags: 58,
    avgDelayDays: 120,
    statusType: 'backlog'
  },
  'Jayashankar Bhupalapally': {
    id: 'bhupalapally',
    displayName: 'Jayashankar Bhupalapally',
    totalClaims: 22450,
    conferredClaims: 7850,
    conferredRate: 35.0,
    pendingClaims: 12150,
    anomalyFlags: 112,
    avgDelayDays: 170,
    statusType: 'hotspot'
  },
  'Mancherial': {
    id: 'mancherial',
    displayName: 'Mancherial',
    totalClaims: 18620,
    conferredClaims: 6520,
    conferredRate: 35.0,
    pendingClaims: 9840,
    anomalyFlags: 76,
    avgDelayDays: 145,
    statusType: 'backlog'
  },
  'Nagarkurnool': {
    id: 'nagarkurnool',
    displayName: 'Nagarkurnool (Nallamala)',
    totalClaims: 16840,
    conferredClaims: 5890,
    conferredRate: 35.0,
    pendingClaims: 8950,
    anomalyFlags: 65,
    avgDelayDays: 140,
    statusType: 'backlog'
  },
  'Mahabubnagar': {
    id: 'mahabubnagar',
    displayName: 'Mahabubnagar',
    totalClaims: 11210,
    conferredClaims: 4620,
    conferredRate: 35.0,
    pendingClaims: 7120,
    anomalyFlags: 42,
    avgDelayDays: 125,
    statusType: 'backlog'
  },
  'Warangal Rural': {
    id: 'warangal_rural',
    displayName: 'Warangal Rural',
    totalClaims: 9380,
    conferredClaims: 3980,
    conferredRate: 35.0,
    pendingClaims: 6240,
    anomalyFlags: 38,
    avgDelayDays: 120,
    statusType: 'backlog'
  },
  'Suryapet': {
    id: 'suryapet',
    displayName: 'Suryapet',
    totalClaims: 10580,
    conferredClaims: 3700,
    conferredRate: 35.0,
    pendingClaims: 5820,
    anomalyFlags: 34,
    avgDelayDays: 115,
    statusType: 'backlog'
  },
  'Peddapalli': {
    id: 'peddapalli',
    displayName: 'Peddapalli',
    totalClaims: 9870,
    conferredClaims: 3450,
    conferredRate: 35.0,
    pendingClaims: 5410,
    anomalyFlags: 32,
    avgDelayDays: 110,
    statusType: 'backlog'
  },
  'Nizamabad': {
    id: 'nizamabad',
    displayName: 'Nizamabad',
    totalClaims: 8920,
    conferredClaims: 3120,
    conferredRate: 35.0,
    pendingClaims: 4890,
    anomalyFlags: 28,
    avgDelayDays: 105,
    statusType: 'backlog'
  },
  'Jagtial': {
    id: 'jagtial',
    displayName: 'Jagtial',
    totalClaims: 7850,
    conferredClaims: 2750,
    conferredRate: 35.0,
    pendingClaims: 4310,
    anomalyFlags: 25,
    avgDelayDays: 100,
    statusType: 'backlog'
  },
  'Medak': {
    id: 'medak',
    displayName: 'Medak',
    totalClaims: 6420,
    conferredClaims: 2250,
    conferredRate: 35.0,
    pendingClaims: 3520,
    anomalyFlags: 22,
    avgDelayDays: 95,
    statusType: 'backlog'
  },
  'Sangareddy': {
    id: 'sangareddy',
    displayName: 'Sangareddy',
    totalClaims: 5610,
    conferredClaims: 1960,
    conferredRate: 35.0,
    pendingClaims: 3080,
    anomalyFlags: 18,
    avgDelayDays: 90,
    statusType: 'backlog'
  },
  'Siddipet': {
    id: 'siddipet',
    displayName: 'Siddipet',
    totalClaims: 4820,
    conferredClaims: 1690,
    conferredRate: 35.0,
    pendingClaims: 2650,
    anomalyFlags: 16,
    avgDelayDays: 85,
    statusType: 'backlog'
  },
  'Jangaon': {
    id: 'jangaon',
    displayName: 'Jangaon',
    totalClaims: 3940,
    conferredClaims: 1380,
    conferredRate: 35.0,
    pendingClaims: 2160,
    anomalyFlags: 14,
    avgDelayDays: 80,
    statusType: 'backlog'
  },
  'Rajanna Sircilla': {
    id: 'sircilla',
    displayName: 'Rajanna Sircilla',
    totalClaims: 3450,
    conferredClaims: 1210,
    conferredRate: 35.0,
    pendingClaims: 1890,
    anomalyFlags: 12,
    avgDelayDays: 78,
    statusType: 'backlog'
  },
  'Vikarabad': {
    id: 'vikarabad',
    displayName: 'Vikarabad',
    totalClaims: 3120,
    conferredClaims: 1090,
    conferredRate: 35.0,
    pendingClaims: 1710,
    anomalyFlags: 11,
    avgDelayDays: 75,
    statusType: 'backlog'
  },
  'Wanaparthy': {
    id: 'wanaparthy',
    displayName: 'Wanaparthy',
    totalClaims: 2680,
    conferredClaims: 940,
    conferredRate: 35.0,
    pendingClaims: 1470,
    anomalyFlags: 9,
    avgDelayDays: 70,
    statusType: 'backlog'
  },
  'Jogulamba Gadwal': {
    id: 'gadwal',
    displayName: 'Jogulamba Gadwal',
    totalClaims: 1940,
    conferredClaims: 680,
    conferredRate: 35.0,
    pendingClaims: 1060,
    anomalyFlags: 7,
    avgDelayDays: 68,
    statusType: 'backlog'
  },
  'Yadadri Bhuvanagiri': {
    id: 'yadadri',
    displayName: 'Yadadri Bhuvanagiri',
    totalClaims: 1620,
    conferredClaims: 570,
    conferredRate: 35.0,
    pendingClaims: 890,
    anomalyFlags: 6,
    avgDelayDays: 65,
    statusType: 'backlog'
  },
  'Narayanpet': {
    id: 'narayanpet',
    displayName: 'Narayanpet',
    totalClaims: 1350,
    conferredClaims: 470,
    conferredRate: 35.0,
    pendingClaims: 740,
    anomalyFlags: 5,
    avgDelayDays: 62,
    statusType: 'backlog'
  },
  'Ranga Reddy': {
    id: 'ranga_reddy',
    displayName: 'Ranga Reddy',
    totalClaims: 980,
    conferredClaims: 520,
    conferredRate: 53.1,
    pendingClaims: 390,
    anomalyFlags: 4,
    avgDelayDays: 55,
    statusType: 'clearance'
  },
  'Karimnagar': {
    id: 'karimnagar',
    displayName: 'Karimnagar',
    totalClaims: 4000,
    conferredClaims: 2380,
    conferredRate: 35.0,
    pendingClaims: 3740,
    anomalyFlags: 20,
    avgDelayDays: 90,
    statusType: 'backlog'
  },
  'Medchal Malkajgiri': {
    id: 'medchal',
    displayName: 'Medchal Malkajgiri',
    totalClaims: 380,
    conferredClaims: 210,
    conferredRate: 55.3,
    pendingClaims: 140,
    anomalyFlags: 2,
    avgDelayDays: 45,
    statusType: 'clearance'
  },
  'Warangal Urban': {
    id: 'warangal_urban',
    displayName: 'Warangal Urban',
    totalClaims: 320,
    conferredClaims: 180,
    conferredRate: 56.3,
    pendingClaims: 110,
    anomalyFlags: 2,
    avgDelayDays: 40,
    statusType: 'clearance'
  },
  'Hyderabad': {
    id: 'hyderabad',
    displayName: 'Hyderabad',
    totalClaims: 156,
    conferredClaims: 95,
    conferredRate: 60.9,
    pendingClaims: 45,
    anomalyFlags: 1,
    avgDelayDays: 35,
    statusType: 'clearance'
  }
};

const items = topo.objects.districts.geometries.map(g => {
  const name = g.properties.district;
  const dtCode = g.properties.dt_code;
  const meta = DISTRICT_METRICS[name] || {
    id: name.toLowerCase().replace(/[^a-z0-9]/g, '_'),
    displayName: name,
    totalClaims: 500,
    conferredClaims: 175,
    conferredRate: 35.0,
    pendingClaims: 250,
    anomalyFlags: 5,
    avgDelayDays: 60,
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

const totalClaims = items.reduce((s, it) => s + it.metric.totalClaims, 0);
console.log('Processed', items.length, 'districts from telangana.json. Total claims =', totalClaims);

const outContent = `// Auto-generated from telangana.json
import { DistrictMetric } from '../types';

export interface TelanganaDistrictGeoItem {
  id: string;
  dtCode: string;
  name: string;
  displayName: string;
  path: string;
  cx: number;
  cy: number;
  metric: DistrictMetric;
}

export const TELANGANA_GEO_DISTRICTS: TelanganaDistrictGeoItem[] = ${JSON.stringify(items, null, 2)};

export const TELANGANA_ALL_DISTRICTS: DistrictMetric[] = [...TELANGANA_GEO_DISTRICTS.map(d => d.metric)].sort((a, b) => b.totalClaims - a.totalClaims);
`;

const outputPath = path.resolve(__dirname, '../src/data/telanganaGeoData.ts');
fs.writeFileSync(outputPath, outContent, 'utf8');
console.log('Saved to:', outputPath);
