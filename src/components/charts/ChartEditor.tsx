import { useState } from 'react';
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
}

export function ChartEditor({ 
  isOpen, 
  onClose, 
  config, 
  onConfigChange,
  data,
  plotRef 
}: ChartEditorProps) {
  const [currentConfig, setCurrentConfig] = useState(config);
  const [selectedCategory, setSelectedCategory] = useState('Simple');
  const [aggregationType, setAggregationType] = useState<AggregationType>('sum');
  const [sortDirection, setSortDirection] = useState<SortDirection>('desc');
  const [selectedTheme, setSelectedTheme] = useState('default');
  const [limit, setLimit] = useState(1000);
  const [annotations, setAnnotations] = useState<any[]>([]);
  const [showAdvancedOptions, setShowAdvancedOptions] = useState(false);
  const [selectedDataColumns, setSelectedDataColumns] = useState<string[]>([]);

  const handleDataTransform = () => {
    const transformedData = transformData(data, {
      aggregation: {
        type: aggregationType,
      },
      sort: {
        field: 'value',
        direction: sortDirection,
      },
      limit,
    });

    const newConfig = { ...currentConfig, data: transformedData };
    setCurrentConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleThemeChange = (theme: string) => {
    setSelectedTheme(theme);
    const newConfig = {
      ...currentConfig,
      options: {
        ...currentConfig.options,
        ...chartThemes[theme as keyof typeof chartThemes],
      },
    };
    setCurrentConfig(newConfig);
    onConfigChange(newConfig);
  };

  const handleTypeChange = (type: string) => {
    const newConfig = { ...currentConfig, type };
    setCurrentConfig(newConfig);
    onConfigChange(newConfig);
  };

  return (
    <Dialog open={isOpen} onClose={onClose} className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex min-h-screen items-center justify-center">
        <Dialog.Overlay className="fixed inset-0 bg-black/30" />

        <div className="relative bg-white rounded-lg shadow-xl max-w-4xl w-full mx-4">
          <div className="border-b border-gray-200 px-6 py-4">
            <Dialog.Title className="text-lg font-semibold">
              Chart Editor
            </Dialog.Title>
          </div>

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
              <Tab className="tab-button">
                <ArrowDownTrayIcon className="h-5 w-5" />
                <span>Export</span>
              </Tab>
              <Tab className="tab-button">
                <ShareIcon className="h-5 w-5" />
                <span>Share</span>
              </Tab>
            </Tab.List>
            <Tab.Panels className="mt-4">
              {/* Chart Type Panel */}
              <Tab.Panel>
                <div className="space-y-4">
                  {Object.entries(CHART_TYPES).map(([category, types]) => (
                    <div key={category}>
                      <h3 className="text-sm font-medium text-gray-700 mb-2">{category}</h3>
                      <div className="grid grid-cols-4 gap-2">
                        {types.map((type) => (
                          <button
                            key={type.id}
                            className={`flex items-center justify-center p-3 rounded-lg border ${
                              config.type === type.id
                                ? 'border-indigo-500 bg-indigo-50'
                                : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => onConfigChange({ ...config, type: type.id as ChartType })}
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
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Theme</label>
                    <select
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={config.options?.theme || 'default'}
                      onChange={(e) =>
                        onConfigChange({
                          ...config,
                          options: { ...config.options, theme: e.target.value },
                        })
                      }
                    >
                      {Object.keys(chartThemes).map((theme) => (
                        <option key={theme} value={theme}>
                          {theme.charAt(0).toUpperCase() + theme.slice(1)}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Title</label>
                    <input
                      type="text"
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                      value={config.title}
                      onChange={(e) => onConfigChange({ ...config, title: e.target.value })}
                    />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700">X Axis Label</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={config.xAxis || ''}
                        onChange={(e) => onConfigChange({ ...config, xAxis: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700">Y Axis Label</label>
                      <input
                        type="text"
                        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                        value={config.yAxis || ''}
                        onChange={(e) => onConfigChange({ ...config, yAxis: e.target.value })}
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      className="inline-flex items-center px-3 py-2 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                      onClick={() => setShowAdvancedOptions(!showAdvancedOptions)}
                    >
                      {showAdvancedOptions ? 'Hide Advanced Options' : 'Show Advanced Options'}
                    </button>

                    {showAdvancedOptions && (
                      <div className="mt-4 space-y-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700">Orientation</label>
                          <select
                            className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            value={config.options?.orientation || 'vertical'}
                            onChange={(e) =>
                              onConfigChange({
                                ...config,
                                options: { ...config.options, orientation: e.target.value as 'vertical' | 'horizontal' },
                              })
                            }
                          >
                            <option value="vertical">Vertical</option>
                            <option value="horizontal">Horizontal</option>
                          </select>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Legend</label>
                          <div className="mt-1">
                            <input
                              type="checkbox"
                              className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                              checked={config.options?.showLegend || false}
                              onChange={(e) =>
                                onConfigChange({
                                  ...config,
                                  options: { ...config.options, showLegend: e.target.checked },
                                })
                              }
                            />
                            <span className="ml-2">Show Legend</span>
                          </div>
                        </div>

                        <div>
                          <label className="block text-sm font-medium text-gray-700">Marker Size</label>
                          <input
                            type="range"
                            min="1"
                            max="20"
                            className="mt-1 block w-full"
                            value={config.options?.markerSize || 6}
                            onChange={(e) =>
                              onConfigChange({
                                ...config,
                                options: { ...config.options, markerSize: parseInt(e.target.value) },
                              })
                            }
                          />
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </Tab.Panel>

              {/* Data Panel */}
              <Tab.Panel>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Columns</label>
                    <div className="mt-2 space-y-2">
                      {Object.keys(data[0] || {}).map((column) => (
                        <div key={column} className="flex items-center">
                          <input
                            type="checkbox"
                            className="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                            checked={selectedDataColumns.includes(column)}
                            onChange={(e) => {
                              if (e.target.checked) {
                                setSelectedDataColumns([...selectedDataColumns, column]);
                              } else {
                                setSelectedDataColumns(selectedDataColumns.filter((col) => col !== column));
                              }
                            }}
                          />
                          <span className="ml-2">{column}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700">Data Transformations</label>
                    <div className="mt-2 space-y-4">
                      <div>
                        <select
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={config.options?.aggregationType || ''}
                          onChange={(e) =>
                            onConfigChange({
                              ...config,
                              options: { ...config.options, aggregationType: e.target.value as AggregationType },
                            })
                          }
                        >
                          <option value="">No Aggregation</option>
                          <option value="sum">Sum</option>
                          <option value="average">Average</option>
                          <option value="min">Minimum</option>
                          <option value="max">Maximum</option>
                          <option value="count">Count</option>
                        </select>
                      </div>

                      <div>
                        <select
                          className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={config.options?.sortDirection || ''}
                          onChange={(e) =>
                            onConfigChange({
                              ...config,
                              options: { ...config.options, sortDirection: e.target.value as SortDirection },
                            })
                          }
                        >
                          <option value="">No Sorting</option>
                          <option value="asc">Ascending</option>
                          <option value="desc">Descending</option>
                        </select>
                      </div>

                      <div>
                        <label className="block text-sm font-medium text-gray-700">Limit Data Points</label>
                        <input
                          type="number"
                          min="0"
                          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
                          value={config.options?.limit || ''}
                          onChange={(e) =>
                            onConfigChange({
                              ...config,
                              options: { ...config.options, limit: parseInt(e.target.value) || undefined },
                            })
                          }
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Export Panel */}
              <Tab.Panel>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Export Chart</h3>
                    <div className="grid grid-cols-3 gap-2">
                      <button
                        className="export-button"
                        onClick={() => exportChart('png', plotRef.current)}
                      >
                        Export as PNG
                      </button>
                      <button
                        className="export-button"
                        onClick={() => exportChart('svg', plotRef.current)}
                      >
                        Export as SVG
                      </button>
                      <button
                        className="export-button"
                        onClick={() => exportChart('pdf', plotRef.current)}
                      >
                        Export as PDF
                      </button>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-sm font-medium text-gray-700 mb-2">Export Data</h3>
                    <div className="grid grid-cols-2 gap-2">
                      <button
                        className="export-button"
                        onClick={() => exportData(data, 'csv')}
                      >
                        Export as CSV
                      </button>
                      <button
                        className="export-button"
                        onClick={() => exportData(data, 'xlsx')}
                      >
                        Export as Excel
                      </button>
                    </div>
                  </div>
                </div>
              </Tab.Panel>

              {/* Share Panel */}
              <Tab.Panel>
                <div className="space-y-4">
                  <button
                    className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    onClick={() => {
                      shareChart(config);
                      // Show a toast notification
                      alert('Share link copied to clipboard!');
                    }}
                  >
                    Copy Share Link
                  </button>
                </div>
              </Tab.Panel>
            </Tab.Panels>
          </Tab.Group>

          <div className="border-t border-gray-200 px-6 py-4 flex justify-end space-x-3">
            <button
              onClick={onClose}
              className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
            >
              Cancel
            </button>
            <button
              onClick={() => {
                onConfigChange(currentConfig);
                onClose();
              }}
              className="px-4 py-2 text-sm text-white bg-purple-600 hover:bg-purple-700 rounded-md"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </Dialog>
  );
}
