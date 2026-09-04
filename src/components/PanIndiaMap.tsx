import React, { useState, useMemo, useRef } from 'react';
import {
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Search,
  CheckCircle2,
  Clock,
  AlertTriangle,
  Layers,
  ArrowRight,
  ExternalLink,
  MapPin
} from 'lucide-react';
import { RoleKey } from '../types';
import {
  INDIA_DISTRICTS,
  INDIA_STATES,
  DistrictGeoItem,
  StateGeoItem
} from '../data/indiaGeoData';

interface PanIndiaMapProps {
  onNavigateRole: (role: RoleKey) => void;
}

type MetricMode = 'conferment' | 'pending' | 'anomaly';
type ViewGranularity = 'state' | 'district';

export const PanIndiaMap: React.FC<PanIndiaMapProps> = ({ onNavigateRole }) => {
  const [viewMode, setViewMode] = useState<ViewGranularity>('state');
  const [metricMode, setMetricMode] = useState<MetricMode>('conferment');
  const [selectedState, setSelectedState] = useState<string>('ALL');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [hoveredItem, setHoveredItem] = useState<{
    name: string;
    subName?: string;
    conferredRate: number;
    pending: number;
    total: number;
    anomalies: number;
    targetRole?: 'state' | 'central' | null;
    x: number;
    y: number;
  } | null>(null);

  const [activeItem, setActiveItem] = useState<{
    name: string;
    subName?: string;
    conferredRate: number;
    pending: number;
    total: number;
    anomalies: number;
    targetRole?: 'state' | 'central' | null;
  } | null>(() => {
    const mp = INDIA_STATES.find(s => s.state === 'Madhya Pradesh');
    return mp ? {
      name: mp.state,
      subName: `${mp.districtCount} Districts`,
      conferredRate: mp.conferredRate,
      pending: mp.pendingClaims,
      total: mp.totalClaims,
      anomalies: mp.anomalyFlags,
      targetRole: mp.targetRole
    } : null;
  });

  const [zoom, setZoom] = useState<number>(1);
  const [pan, setPan] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);

  const handleZoomIn = () => setZoom(prev => Math.min(prev + 0.4, 4));
  const handleZoomOut = () => setZoom(prev => Math.max(prev - 0.4, 0.8));
  const handleResetZoom = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setSelectedState('ALL');
  };

  // Color functions based on metric mode
  const getColor = (conferredRate: number, pending: number, anomalies: number) => {
    if (metricMode === 'conferment') {
      if (conferredRate >= 75) return '#10b981'; // emerald-500
      if (conferredRate >= 60) return '#34d399'; // emerald-400
      if (conferredRate >= 50) return '#fbbf24'; // amber-400
      return '#f87171'; // rose-400
    }
    if (metricMode === 'pending') {
      if (pending > 20000) return '#ef4444'; // rose-500
      if (pending > 10000) return '#f59e0b'; // amber-500
      if (pending > 3000) return '#34d399'; // emerald-400
      return '#10b981'; // emerald-500
    }
    // anomaly
    if (anomalies > 350) return '#ef4444';
    if (anomalies > 150) return '#f59e0b';
    if (anomalies > 40) return '#34d399';
    return '#10b981';
  };

  // Filter districts when state or search is active
  const filteredDistricts = useMemo(() => {
    return INDIA_DISTRICTS.filter(d => {
      const matchesState = selectedState === 'ALL' || d.state === selectedState;
      const matchesSearch = !searchQuery || 
        d.district.toLowerCase().includes(searchQuery.toLowerCase()) ||
        d.state.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesState && matchesSearch;
    });
  }, [selectedState, searchQuery]);

  // When a user selects a state from dropdown, zoom to it
  const handleStateSelect = (stateName: string) => {
    setSelectedState(stateName);
    if (stateName === 'ALL') {
      handleResetZoom();
      return;
    }
    const stateObj = INDIA_STATES.find(s => s.state === stateName);
    if (stateObj) {
      setActiveItem({
        name: stateObj.state,
        subName: `${stateObj.districtCount} Districts`,
        conferredRate: stateObj.conferredRate,
        pending: stateObj.pendingClaims,
        total: stateObj.totalClaims,
        anomalies: stateObj.anomalyFlags,
        targetRole: stateObj.targetRole
      });
      // Center and zoom into state
      const [minX, minY, maxX, maxY] = stateObj.bbox;
      const cx = (minX + maxX) / 2;
      const cy = (minY + maxY) / 2;
      const dx = maxX - minX;
      const dy = maxY - minY;
      const fitZoom = Math.min(3.5, Math.max(1.4, 450 / Math.max(dx, dy)));
      setZoom(fitZoom);
      setPan({
        x: (300 - cx) * (fitZoom - 1),
        y: (330 - cy) * (fitZoom - 1)
      });
    }
  };

  const handleDistrictClick = (d: DistrictGeoItem) => {
    setActiveItem({
      name: d.district,
      subName: `${d.state} (District Code: ${d.dtCode})`,
      conferredRate: d.conferredRate,
      pending: d.pendingClaims,
      total: d.totalClaims,
      anomalies: d.anomalyFlags,
      targetRole: d.targetRole
    });
  };

  const handleStateClick = (s: StateGeoItem) => {
    setActiveItem({
      name: s.state,
      subName: `${s.districtCount} Districts • Code: ${s.stCode}`,
      conferredRate: s.conferredRate,
      pending: s.pendingClaims,
      total: s.totalClaims,
      anomalies: s.anomalyFlags,
      targetRole: s.targetRole
    });
  };

  return (
    <div className="bg-white rounded-xl border border-slate-200 p-4 shadow-sm space-y-3 flex flex-col justify-between" id="pan-india-map-container">
      {/* Header Bar */}
      <div>
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-3 border-b border-slate-100 gap-2">
          <div>
            <div className="flex items-center space-x-2">
              <h3 className="text-xs font-bold text-slate-800 uppercase tracking-wide">
                Pan-India FRA Progress &amp; Pendency Choropleth
              </h3>
              <span className="text-[10px] bg-emerald-100 text-emerald-800 font-semibold px-2 py-0.5 rounded-full">
                Live WebGIS
              </span>
            </div>
            <p className="text-[11px] text-slate-500">
              Interactive 726-District &amp; State Level Decision Support System
            </p>
          </div>

          {/* Granularity & Metric Selectors */}
          <div className="flex flex-wrap items-center gap-1.5 self-end sm:self-auto">
            {/* View Mode */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode('state')}
                className={`px-2.5 py-1 rounded-md transition ${viewMode === 'state' ? 'bg-white text-gov-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                States (36)
              </button>
              <button
                type="button"
                onClick={() => setViewMode('district')}
                className={`px-2.5 py-1 rounded-md transition ${viewMode === 'district' ? 'bg-white text-gov-900 font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Districts (726)
              </button>
            </div>

            {/* Metric Mode */}
            <div className="flex bg-slate-100 p-0.5 rounded-lg text-[11px] font-medium border border-slate-200">
              <button
                type="button"
                onClick={() => setMetricMode('conferment')}
                className={`px-2 py-1 rounded-md transition ${metricMode === 'conferment' ? 'bg-emerald-600 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Titles Conferred %
              </button>
              <button
                type="button"
                onClick={() => setMetricMode('pending')}
                className={`px-2 py-1 rounded-md transition ${metricMode === 'pending' ? 'bg-amber-500 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                Pending Backlog
              </button>
              <button
                type="button"
                onClick={() => setMetricMode('anomaly')}
                className={`px-2 py-1 rounded-md transition ${metricMode === 'anomaly' ? 'bg-rose-500 text-white font-bold shadow-xs' : 'text-slate-600 hover:text-slate-900'}`}
              >
                AI Anomalies
              </button>
            </div>
          </div>
        </div>

        {/* Filter & Search Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-2 pt-2.5 pb-1">
          <div className="flex items-center space-x-2 flex-1 min-w-[240px]">
            {/* Search Input */}
            <div className="relative flex-1 max-w-xs">
              <Search className="w-3.5 h-3.5 text-slate-400 absolute left-2.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search district or state (e.g. Umaria, Mayurbhanj)..."
                className="w-full text-xs pl-8 pr-3 py-1.5 bg-slate-50 rounded-lg border border-slate-200 focus:outline-hidden focus:border-emerald-500 focus:bg-white text-slate-800"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery('')}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 text-xs"
                >
                  ✕
                </button>
              )}
            </div>

            {/* State Filter Dropdown */}
            <select
              value={selectedState}
              onChange={(e) => handleStateSelect(e.target.value)}
              className="text-xs bg-slate-50 border border-slate-200 rounded-lg px-2.5 py-1.5 text-slate-700 font-medium focus:outline-hidden focus:border-emerald-500 cursor-pointer"
            >
              <option value="ALL">All States &amp; UTs (Pan-India)</option>
              {INDIA_STATES.map(s => (
                <option key={s.state} value={s.state}>
                  {s.state} ({s.districtCount} districts)
                </option>
              ))}
            </select>
          </div>

          {/* Quick Zoom Actions */}
          <div className="flex items-center space-x-1">
            <button
              type="button"
              onClick={handleZoomIn}
              className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition"
              title="Zoom In"
            >
              <ZoomIn className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleZoomOut}
              className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition"
              title="Zoom Out"
            >
              <ZoomOut className="w-3.5 h-3.5" />
            </button>
            <button
              type="button"
              onClick={handleResetZoom}
              className="p-1.5 bg-slate-50 hover:bg-slate-100 rounded-lg border border-slate-200 text-slate-600 transition"
              title="Reset View"
            >
              <RotateCcw className="w-3.5 h-3.5" />
            </button>
          </div>
        </div>

        {/* Map Canvas Area */}
        <div
          ref={containerRef}
          className="h-[430px] bg-slate-50/80 rounded-xl border border-slate-200 relative overflow-hidden mt-2 flex items-center justify-center select-none"
        >
          <svg
            viewBox="0 0 600 660"
            className="w-full h-full transition-transform duration-300 ease-out"
            style={{
              transform: `scale(${zoom}) translate(${pan.x}px, ${pan.y}px)`,
              transformOrigin: 'center center'
            }}
          >
            {/* Background subtle mesh grid */}
            <defs>
              <pattern id="india-grid" width="30" height="30" patternUnits="userSpaceOnUse">
                <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#e2e8f0" strokeWidth="0.5" />
              </pattern>
            </defs>
            <rect width="600" height="660" fill="url(#india-grid)" />

            {/* Render Features */}
            {viewMode === 'state' ? (
              <g id="states-layer">
                {INDIA_STATES.map((s) => {
                  const fillColor = getColor(s.conferredRate, s.pendingClaims, s.anomalyFlags);
                  const isSelected = activeItem?.name === s.state;
                  const isFiltered = selectedState !== 'ALL' && selectedState !== s.state;

                  return (
                    <path
                      key={s.state}
                      d={s.path}
                      fill={fillColor}
                      fillOpacity={isFiltered ? 0.2 : 0.85}
                      stroke={isSelected ? '#0f172a' : '#ffffff'}
                      strokeWidth={isSelected ? 2 : 1}
                      className="cursor-pointer transition-all duration-150 hover:fill-opacity-100 hover:stroke-slate-900 hover:stroke-[1.8]"
                      onMouseEnter={(e) => {
                        const rect = containerRef.current?.getBoundingClientRect();
                        setHoveredItem({
                          name: s.state,
                          subName: `${s.districtCount} Districts`,
                          conferredRate: s.conferredRate,
                          pending: s.pendingClaims,
                          total: s.totalClaims,
                          anomalies: s.anomalyFlags,
                          targetRole: s.targetRole,
                          x: e.clientX - (rect?.left || 0),
                          y: e.clientY - (rect?.top || 0)
                        });
                      }}
                      onMouseMove={(e) => {
                        const rect = containerRef.current?.getBoundingClientRect();
                        if (hoveredItem) {
                          setHoveredItem(prev => prev ? {
                            ...prev,
                            x: e.clientX - (rect?.left || 0),
                            y: e.clientY - (rect?.top || 0)
                          } : null);
                        }
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleStateClick(s)}
                    />
                  );
                })}
              </g>
            ) : (
              <g id="districts-layer">
                {filteredDistricts.map((d) => {
                  const fillColor = getColor(d.conferredRate, d.pendingClaims, d.anomalyFlags);
                  const isSelected = activeItem?.name === d.district;

                  return (
                    <path
                      key={d.id}
                      d={d.path}
                      fill={fillColor}
                      fillOpacity={0.88}
                      stroke={isSelected ? '#0f172a' : '#f8fafc'}
                      strokeWidth={isSelected ? 1.8 : 0.4}
                      className="cursor-pointer transition-all duration-100 hover:fill-opacity-100 hover:stroke-slate-900 hover:stroke-1"
                      onMouseEnter={(e) => {
                        const rect = containerRef.current?.getBoundingClientRect();
                        setHoveredItem({
                          name: d.district,
                          subName: d.state,
                          conferredRate: d.conferredRate,
                          pending: d.pendingClaims,
                          total: d.totalClaims,
                          anomalies: d.anomalyFlags,
                          targetRole: d.targetRole,
                          x: e.clientX - (rect?.left || 0),
                          y: e.clientY - (rect?.top || 0)
                        });
                      }}
                      onMouseMove={(e) => {
                        const rect = containerRef.current?.getBoundingClientRect();
                        if (hoveredItem) {
                          setHoveredItem(prev => prev ? {
                            ...prev,
                            x: e.clientX - (rect?.left || 0),
                            y: e.clientY - (rect?.top || 0)
                          } : null);
                        }
                      }}
                      onMouseLeave={() => setHoveredItem(null)}
                      onClick={() => handleDistrictClick(d)}
                    />
                  );
                })}
              </g>
            )}
          </svg>

          {/* Floating Cursor Tooltip */}
          {hoveredItem && (
            <div
              className="absolute pointer-events-none z-30 bg-slate-900/95 text-white p-2.5 rounded-lg shadow-xl text-xs backdrop-blur-xs border border-slate-700/60 max-w-[220px]"
              style={{
                left: Math.min(hoveredItem.x + 12, (containerRef.current?.clientWidth || 300) - 230),
                top: Math.min(hoveredItem.y + 12, (containerRef.current?.clientHeight || 300) - 130)
              }}
            >
              <div className="font-bold text-emerald-400">{hoveredItem.name}</div>
              {hoveredItem.subName && (
                <div className="text-[10px] text-slate-400 mb-1">{hoveredItem.subName}</div>
              )}
              <div className="space-y-1 text-[11px] border-t border-slate-800 pt-1 mt-1">
                <div className="flex justify-between">
                  <span className="text-slate-400">Titles Conferred:</span>
                  <span className="font-semibold text-emerald-300">{hoveredItem.conferredRate}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Pending Backlog:</span>
                  <span className="font-semibold text-amber-300">{hoveredItem.pending.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">AI Anomalies:</span>
                  <span className="font-semibold text-rose-300">{hoveredItem.anomalies.toLocaleString()}</span>
                </div>
              </div>
            </div>
          )}

          {/* Choropleth Color Legend */}
          <div className="absolute bottom-3 left-3 bg-white/95 backdrop-blur-xs p-2.5 rounded-lg border border-slate-200 shadow-sm text-[10px] z-10 space-y-1">
            <span className="font-bold text-slate-700 uppercase tracking-wider block text-[9px]">
              {metricMode === 'conferment' ? 'Conferment Rate' : metricMode === 'pending' ? 'Pending Backlog' : 'AI Anomaly Clusters'}
            </span>
            <div className="flex items-center space-x-1.5">
              {metricMode === 'conferment' ? (
                <>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]"></span>
                    <span className="text-slate-600">&gt;75%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#34d399]"></span>
                    <span className="text-slate-600">60-74%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#fbbf24]"></span>
                    <span className="text-slate-600">50-59%</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#f87171]"></span>
                    <span className="text-slate-600">&lt;50%</span>
                  </div>
                </>
              ) : metricMode === 'pending' ? (
                <>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]"></span>
                    <span className="text-slate-600">&lt;3k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#34d399]"></span>
                    <span className="text-slate-600">3k-10k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]"></span>
                    <span className="text-slate-600">10k-20k</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]"></span>
                    <span className="text-slate-600">&gt;20k</span>
                  </div>
                </>
              ) : (
                <>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#10b981]"></span>
                    <span className="text-slate-600">&lt;40</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#34d399]"></span>
                    <span className="text-slate-600">40-150</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#f59e0b]"></span>
                    <span className="text-slate-600">150-350</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <span className="w-2.5 h-2.5 rounded-xs bg-[#ef4444]"></span>
                    <span className="text-slate-600">&gt;350</span>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Selected Territory Inspector Card */}
      {activeItem && (
        <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs animate-in fade-in duration-200">
          <div className="space-y-1">
            <div className="flex items-center space-x-2">
              <MapPin className="w-3.5 h-3.5 text-emerald-600" />
              <span className="font-bold text-slate-800 text-sm">{activeItem.name}</span>
              {activeItem.subName && (
                <span className="text-[11px] text-slate-500 font-mono">({activeItem.subName})</span>
              )}
            </div>
            <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-600">
              <span>
                <strong>Total Claims:</strong> {activeItem.total.toLocaleString()}
              </span>
              <span>•</span>
              <span className="text-emerald-700 font-medium">
                <strong>Conferred:</strong> {activeItem.conferredRate}%
              </span>
              <span>•</span>
              <span className="text-amber-700 font-medium">
                <strong>Pending:</strong> {activeItem.pending.toLocaleString()}
              </span>
              <span>•</span>
              <span className="text-rose-700 font-medium">
                <strong>Anomalies:</strong> {activeItem.anomalies.toLocaleString()}
              </span>
            </div>
          </div>

          {/* Drill down button for linked views */}
          {activeItem.targetRole && (
            <button
              type="button"
              onClick={() => onNavigateRole(activeItem.targetRole === 'central' ? 'central' : 'state')}
              className="inline-flex items-center space-x-1.5 px-3 py-1.5 rounded-lg bg-emerald-600 text-white font-medium hover:bg-emerald-700 transition shadow-xs cursor-pointer text-xs shrink-0"
            >
              <span>
                {activeItem.name === 'Madhya Pradesh' || activeItem.name.includes('Umaria')
                  ? 'Open MP & SDLC Field Console'
                  : 'Open State SLMC Overview'}
              </span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      )}
    </div>
  );
};
