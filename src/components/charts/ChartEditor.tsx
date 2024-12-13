import { useState, useEffect } from 'react';
import { Dialog, Tab } from '@headlessui/react';
import { ChartConfig } from '@/lib/types';
import { chartThemes } from '@/lib/chartThemes';
import { transformData, AggregationType, SortDirection } from '@/lib/dataTransforms';
import { exportChart, exportData, shareChart } from '@/lib/export';
import {
  ChartBarIcon,
  PaintBrushIcon,
  AdjustmentsHorizontalIcon,
  ArrowDownTrayIcon,
  ShareIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

const CHART_TYPES = {
  Simple: [
    { id: 'scatter', name: 'Scatter', icon: '⚬' },
    { id: 'bar', name: 'Bar', icon: '▭' },
    { id: 'line', name: 'Line', icon: '📈' },
    { id: 'area', name: 'Area', icon: '▨' },
    { id: 'box', name: 'Box', icon: '☐' },
    { id: 'violin', name: 'Violin', icon: '🎻' },
    { id: 'histogram', name: 'Histogram', icon: '📊' },
    { id: '2d-histogram', name: '2D Histogram', icon: '▦' },
  ],
  Distributions: [
    { id: 'heatmap', name: 'Heatmap', icon: '🌡️' },
    { id: 'contour', name: 'Contour', icon: '◎' },
    { id: '2d-contour', name: '2D Contour', icon: '◉' },
  ],
  '3D': [
    { id: '3d-scatter', name: '3D Scatter', icon: '⚬' },
    { id: '3d-surface', name: '3D Surface', icon: '▨' },
    { id: '3d-line', name: '3D Line', icon: '📈' },
    { id: '3d-mesh', name: '3D Mesh', icon: '▣' },
  ],
  Finance: [
    { id: 'candlestick', name: 'Candlestick', icon: '📊' },
    { id: 'ohlc', name: 'OHLC', icon: '📈' },
    { id: 'waterfall', name: 'Waterfall', icon: '🌊' },
    { id: 'funnel', name: 'Funnel', icon: '⌘' },
  ],
  Specialized: [
    { id: 'polar', name: 'Polar Scatter', icon: '◎' },
    { id: 'polar-bar', name: 'Polar Bar', icon: '◐' },
    { id: 'treemap', name: 'Treemap', icon: '▦' },
    { id: 'sankey', name: 'Sankey', icon: '⇢' },
  ],
  Advanced: [
    { id: 'bubble', name: 'Bubble', icon: '⚪' },
    { id: 'radar', name: 'Radar', icon: '🕸️' },
    { id: 'parallel', name: 'Parallel Coordinates', icon: '∥' },
    { id: 'sunburst', name: 'Sunburst', icon: '☀️' },
  ],
};

interface ChartEditorProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
  data: any[];
  plotRef: any;
  defaultColorScheme?: string[];
  onSave?: () => void;
  onShare?: () => void;
}

export function ChartEditor({ 
  isOpen, 
  onClose, 
  config, 
  onConfigChange,
  data,
  plotRef,
  defaultColorScheme = ['#6366f1', '#8b5cf6', '#d946ef', '#ec4899'],
  onSave,
  onShare
}: ChartEditorProps) {
  const [localConfig, setLocalConfig] = useState(config);
  const [previewData, setPreviewData] = useState(data);
  const [selectedTab, setSelectedTab] = useState('chart');

  // Apply changes and update parent
  const handleApplyChanges = () => {
    onConfigChange(localConfig);
  };

  // Reset changes
  const handleReset = () => {
    setLocalConfig(config);
    setPreviewData(data);
  };

  // Auto-save changes after a delay
  useEffect(() => {
    const timer = setTimeout(() => {
      handleApplyChanges();
    }, 500);
    return () => clearTimeout(timer);
  }, [localConfig]);

  return (
    <Dialog 
      open={isOpen} 
      onClose={onClose}
      className="fixed inset-0 z-50 overflow-y-auto"
    >
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />
        
        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
          <div className="flex justify-between items-center p-4 border-b">
            <h2 className="text-lg font-semibold">Chart Editor</h2>
            <div className="flex items-center gap-2">
              <button
                size="sm"
                variant="light"
                onClick={handleReset}
              >
                Reset
              </button>
              <button
                size="sm"
                color="primary"
                onClick={handleApplyChanges}
              >
                Apply
              </button>
              <button
                size="sm"
                isIconOnly
                variant="light"
                onClick={onClose}
              >
                <XMarkIcon className="h-5 w-5" />
              </button>
            </div>
          </div>

          <div className="p-4">
            <Tab.Group>
              <Tab.List className="flex space-x-1 rounded-xl bg-blue-900/20 p-1">
                <Tab className="tab-button">
                  <ChartBarIcon className="h-5 w-5" />
                  <span>Chart Type</span>
                </Tab>
                <Tab className="tab-button">
                  <PaintBrushIcon className="h-5 w-5" />
                  <span>Style</span>
                </Tab>
                <Tab className="tab-button">
                  <AdjustmentsHorizontalIcon className="h-5 w-5" />
                  <span>Data</span>
                </Tab>
              </Tab.List>
              <Tab.Panels className="mt-4">
                {/* Chart Type Panel */}
                <Tab.Panel>
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries(CHART_TYPES).map(([category, types]) => (
                      <div key={category}>
                        <h3 className="text-sm font-medium mb-2">{category}</h3>
                        <div className="grid grid-cols-2 gap-2">
                          {types.map((type) => (
                            <button
                              key={type.id}
                              className={`flex items-center justify-center p-3 rounded-lg border ${
                                localConfig.type === type.id
                                  ? 'border-indigo-500 bg-indigo-50'
                                  : 'border-gray-200 hover:border-gray-300'
                              }`}
                              onClick={() => setLocalConfig({ ...localConfig, type: type.id })}
                            >
                              <span className="text-xl mr-2">{type.icon}</span>
                              <span className="text-sm">{type.name}</span>
                            </button>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                </Tab.Panel>

                {/* Style Panel */}
                <Tab.Panel>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Colors</h3>
                      <div className="flex flex-wrap gap-2">
                        {defaultColorScheme.map((color, index) => (
                          <div
                            key={index}
                            className="w-8 h-8 rounded cursor-pointer border"
                            style={{ backgroundColor: color }}
                            onClick={() => {
                              const newColors = [...localConfig.colors];
                              newColors[index] = color;
                              setLocalConfig({ ...localConfig, colors: newColors });
                            }}
                          />
                        ))}
                      </div>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Theme</h3>
                      <select
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={localConfig.theme}
                        onChange={(e) =>
                          setLocalConfig({ ...localConfig, theme: e.target.value })
                        }
                      >
                        {chartThemes.map((theme) => (
                          <option key={theme.id} value={theme.id}>
                            {theme.name}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>
                </Tab.Panel>

                {/* Data Panel */}
                <Tab.Panel>
                  <div className="space-y-4">
                    <div>
                      <h3 className="text-sm font-medium mb-2">Aggregation</h3>
                      <select
                        className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={localConfig.aggregation}
                        onChange={(e) =>
                          setLocalConfig({ 
                            ...localConfig, 
                            aggregation: e.target.value as AggregationType 
                          })
                        }
                      >
                        <option value="none">None</option>
                        <option value="sum">Sum</option>
                        <option value="average">Average</option>
                        <option value="count">Count</option>
                      </select>
                    </div>

                    <div>
                      <h3 className="text-sm font-medium mb-2">Sort</h3>
                      <div className="flex gap-2">
                        <select
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={localConfig.sortBy || ''}
                          onChange={(e) => setLocalConfig({ ...localConfig, sortBy: e.target.value })}
                        >
                          <option value="">None</option>
                          {Object.keys(data[0] || {}).map((field) => (
                            <option key={field} value={field}>
                              {field}
                            </option>
                          ))}
                        </select>
                        <select
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={localConfig.sortDirection || 'asc'}
                          onChange={(e) =>
                            setLocalConfig({ 
                              ...localConfig, 
                              sortDirection: e.target.value as SortDirection 
                            })
                          }
                        >
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </Tab.Panel>
              </Tab.Panels>
            </Tab.Group>
          </div>

          <div className="flex justify-between items-center p-4 border-t bg-gray-50">
            <div className="flex items-center gap-2">
              <button
                size="sm"
                variant="light"
                onClick={() => exportData(data)}
                leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
              >
                Export Data
              </button>
              <button
                size="sm"
                variant="light"
                onClick={() => exportChart(plotRef)}
                leftIcon={<ArrowDownTrayIcon className="h-4 w-4" />}
              >
                Export Chart
              </button>
            </div>
            <button
              size="sm"
              color="primary"
              onClick={() => shareChart(plotRef)}
              leftIcon={<ShareIcon className="h-4 w-4" />}
            >
              Share
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
