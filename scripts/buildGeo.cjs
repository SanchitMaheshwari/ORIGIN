const fs = require('fs');
const path = require('path');

const geojsonPath = path.resolve(__dirname, '../india (3).geojson');
const data = JSON.parse(fs.readFileSync(geojsonPath, 'utf8'));

// Project coordinates to 600 x 660 SVG space
const minLng = 68.1, maxLng = 97.4;
const minLat = 6.7, maxLat = 37.2;

function mercatorY(lat) {
  const latRad = lat * Math.PI / 180;
  return Math.log(Math.tan(Math.PI / 4 + latRad / 2));
}

const minMercY = mercatorY(minLat);
const maxMercY = mercatorY(maxLat);

const width = 600;
const height = 660;
const paddingX = 20;
const paddingY = 20;

function project(lng, lat) {
  const x = paddingX + ((lng - minLng) / (maxLng - minLng)) * (width - 2 * paddingX);
  const my = mercatorY(lat);
  const y = height - paddingY - ((my - minMercY) / (maxMercY - minMercY)) * (height - 2 * paddingY);
  return [Math.round(x * 10) / 10, Math.round(y * 10) / 10];
}

function ringToPath(ring) {
  return ring.map((pt, i) => {
    const [x, y] = project(pt[0], pt[1]);
    return (i === 0 ? 'M' : 'L') + x + ' ' + y;
  }).join('') + 'Z';
}

function geometryToPath(geom) {
  if (!geom) return '';
  if (geom.type === 'Polygon') {
    return geom.coordinates.map(ringToPath).join('');
  } else if (geom.type === 'MultiPolygon') {
    return geom.coordinates.map(poly => poly.map(ringToPath).join('')).join('');
  }
  return '';
}

function getBBox(geom) {
  let minX = Infinity, minY = Infinity, maxX = -Infinity, maxY = -Infinity;
  function scan(coords) {
    if (typeof coords[0] === 'number') {
      const [x, y] = project(coords[0], coords[1]);
      if (x < minX) minX = x;
      if (x > maxX) maxX = x;
      if (y < minY) minY = y;
      if (y > maxY) maxY = y;
    } else {
      coords.forEach(scan);
    }
  }
  if (geom && geom.coordinates) scan(geom.coordinates);
  return [minX, minY, maxX, maxY].map(v => Math.round(v * 10) / 10);
}

const STATE_BENCHMARKS = {
  'Tripura': { rate: 89, pending: 1800, total: 16500, anomalies: 42 },
  'Odisha': { rate: 68, pending: 24500, total: 68000, anomalies: 410, targetRole: 'state' },
  'Madhya Pradesh': { rate: 51, pending: 36000, total: 76000, anomalies: 620, targetRole: 'state' },
  'Chhattisgarh': { rate: 58, pending: 18200, total: 43000, anomalies: 340 },
  'Maharashtra': { rate: 46, pending: 28400, total: 52000, anomalies: 510 },
  'Kerala': { rate: 38, pending: 7200, total: 11600, anomalies: 130 },
  'Jharkhand': { rate: 62, pending: 14000, total: 37000, anomalies: 290 },
  'Gujarat': { rate: 65, pending: 12000, total: 34000, anomalies: 190 },
  'Rajasthan': { rate: 55, pending: 9500, total: 21000, anomalies: 160 },
  'Assam': { rate: 79, pending: 6200, total: 29000, anomalies: 110 },
  'Telangana': { rate: 61, pending: 11000, total: 28000, anomalies: 220 },
  'Andhra Pradesh': { rate: 64, pending: 9800, total: 27000, anomalies: 180 },
  'Karnataka': { rate: 58, pending: 8900, total: 21000, anomalies: 150 },
  'Tamil Nadu': { rate: 53, pending: 4200, total: 9000, anomalies: 70 },
  'Himachal Pradesh': { rate: 74, pending: 1900, total: 7400, anomalies: 45 },
  'Uttarakhand': { rate: 70, pending: 2100, total: 7000, anomalies: 52 },
  'West Bengal': { rate: 64, pending: 8500, total: 23600, anomalies: 145 },
  'Bihar': { rate: 52, pending: 10400, total: 21700, anomalies: 175 },
  'Uttar Pradesh': { rate: 66, pending: 12100, total: 35600, anomalies: 210 },
  'Punjab': { rate: 81, pending: 1200, total: 6300, anomalies: 32 },
  'Haryana': { rate: 83, pending: 900, total: 5200, anomalies: 28 },
  'Jammu and Kashmir': { rate: 76, pending: 3100, total: 12900, anomalies: 88 },
  'Ladakh': { rate: 85, pending: 400, total: 2700, anomalies: 15 },
  'Goa': { rate: 72, pending: 600, total: 2100, anomalies: 18 },
  'Meghalaya': { rate: 84, pending: 1100, total: 6900, anomalies: 29 },
  'Manipur': { rate: 82, pending: 1300, total: 7200, anomalies: 34 },
  'Nagaland': { rate: 86, pending: 800, total: 5800, anomalies: 22 },
  'Mizoram': { rate: 87, pending: 700, total: 5400, anomalies: 19 },
  'Arunachal Pradesh': { rate: 88, pending: 1200, total: 9800, anomalies: 38 },
  'Sikkim': { rate: 90, pending: 300, total: 3100, anomalies: 12 }
};

const districts = [];
const stateMap = {};

data.features.forEach((f, idx) => {
  const isDistrict = !!f.properties.district;
  const st = f.properties.st_nm;
  const path = geometryToPath(f.geometry);
  const bbox = getBBox(f.geometry);
  const cx = Math.round(((bbox[0] + bbox[2]) / 2) * 10) / 10;
  const cy = Math.round(((bbox[1] + bbox[3]) / 2) * 10) / 10;

  if (isDistrict) {
    const dist = f.properties.district;
    const dtCode = f.properties.dt_code || String(idx);
    const benchmark = STATE_BENCHMARKS[st] || { rate: 60, pending: 4000, total: 10000, anomalies: 30 };
    
    let hash = 0;
    for (let i = 0; i < dist.length; i++) hash = (hash * 31 + dist.charCodeAt(i)) % 10000;
    
    const conferredRate = Math.min(96, Math.max(25, benchmark.rate + ((hash % 23) - 11)));
    const totalClaims = Math.max(200, Math.round(benchmark.total / 25 * (0.6 + (hash % 10) * 0.08)));
    const pendingClaims = Math.round(totalClaims * ((100 - conferredRate) / 100));
    const anomalyFlags = Math.max(1, Math.round((pendingClaims * 0.04) * (0.8 + (hash % 5) * 0.1)));

    let targetRole = null;
    if (st === 'Madhya Pradesh' || dist.toLowerCase().includes('umaria') || st === 'Odisha') targetRole = 'state';

    districts.push({
      id: 'd-' + dtCode + '-' + idx,
      district: dist,
      state: st,
      dtCode: String(dtCode),
      path,
      bbox,
      cx,
      cy,
      conferredRate,
      pendingClaims,
      totalClaims,
      anomalyFlags,
      targetRole
    });
  } else {
    // State boundary feature
    const stCode = f.properties.st_code || String(idx);
    const benchmark = STATE_BENCHMARKS[st] || { rate: 60, pending: 4000, total: 10000, anomalies: 30 };
    
    stateMap[st] = {
      state: st,
      stCode: String(stCode),
      path,
      bbox,
      cx,
      cy,
      conferredRate: benchmark.rate,
      pendingClaims: benchmark.pending,
      totalClaims: benchmark.total,
      anomalyFlags: benchmark.anomalies,
      targetRole: benchmark.targetRole || null,
      districtCount: 0
    };
  }
});

districts.forEach(d => {
  if (stateMap[d.state]) {
    stateMap[d.state].districtCount++;
  } else {
    stateMap[d.state] = {
      state: d.state,
      stCode: d.dtCode,
      path: d.path,
      bbox: d.bbox,
      cx: d.cx,
      cy: d.cy,
      conferredRate: d.conferredRate,
      pendingClaims: d.pendingClaims,
      totalClaims: d.totalClaims,
      anomalyFlags: d.anomalyFlags,
      targetRole: d.targetRole,
      districtCount: 1
    };
  }
});

const states = Object.values(stateMap).sort((a, b) => a.state.localeCompare(b.state));

const header = `// Auto-generated from india (3).geojson
export interface DistrictGeoItem {
  id: string;
  district: string;
  state: string;
  dtCode: string;
  path: string;
  bbox: [number, number, number, number];
  cx: number;
  cy: number;
  conferredRate: number;
  pendingClaims: number;
  totalClaims: number;
  anomalyFlags: number;
  targetRole?: 'state' | 'central' | null;
}

export interface StateGeoItem {
  state: string;
  stCode: string;
  path: string;
  bbox: [number, number, number, number];
  cx: number;
  cy: number;
  conferredRate: number;
  pendingClaims: number;
  totalClaims: number;
  anomalyFlags: number;
  districtCount: number;
  targetRole?: 'state' | 'central' | null;
}
`;

const content = header +
  '\nexport const INDIA_DISTRICTS: DistrictGeoItem[] = ' + JSON.stringify(districts, null, 2) + ';\n\n' +
  'export const INDIA_STATES: StateGeoItem[] = ' + JSON.stringify(states, null, 2) + ';\n';

const outPath = path.resolve(__dirname, '../src/data/indiaGeoData.ts');
fs.writeFileSync(outPath, content, 'utf8');
console.log('Successfully written src/data/indiaGeoData.ts, size:', (content.length / 1024).toFixed(1), 'KB');
