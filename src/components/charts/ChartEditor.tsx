import { useState } from 'react';
import { Dialog } from '@headlessui/react';
import { ChartConfig } from '@/lib/types';

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
};

interface ChartEditorProps {
  isOpen: boolean;
  onClose: () => void;
  config: ChartConfig;
  onConfigChange: (config: ChartConfig) => void;
}

export function ChartEditor({ isOpen, onClose, config, onConfigChange }: ChartEditorProps) {
  const [selectedCategory, setSelectedCategory] = useState('Simple');
  const [currentConfig, setCurrentConfig] = useState(config);

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

          <div className="p-6">
            {/* Chart Type Selection */}
            <div className="mb-6">
              <h3 className="text-sm font-medium mb-2">Chart Type</h3>
              <div className="flex space-x-4 mb-4">
                {Object.keys(CHART_TYPES).map((category) => (
                  <button
                    key={category}
                    onClick={() => setSelectedCategory(category)}
                    className={`px-4 py-2 rounded-md text-sm ${
                      selectedCategory === category
                        ? 'bg-purple-100 text-purple-700'
                        : 'text-gray-600 hover:bg-gray-100'
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-4 gap-4">
                {CHART_TYPES[selectedCategory as keyof typeof CHART_TYPES].map((type) => (
                  <button
                    key={type.id}
                    onClick={() => handleTypeChange(type.id)}
                    className={`p-4 rounded-lg border ${
                      currentConfig.type === type.id
                        ? 'border-purple-500 bg-purple-50'
                        : 'border-gray-200 hover:border-purple-200'
                    } text-center`}
                  >
                    <div className="text-2xl mb-2">{type.icon}</div>
                    <div className="text-sm">{type.name}</div>
                  </button>
                ))}
              </div>
            </div>

            {/* Chart Configuration */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium mb-1">Title</label>
                <input
                  type="text"
                  value={currentConfig.title}
                  onChange={(e) => {
                    const newConfig = { ...currentConfig, title: e.target.value };
                    setCurrentConfig(newConfig);
                    onConfigChange(newConfig);
                  }}
                  className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">X Axis Title</label>
                  <input
                    type="text"
                    value={currentConfig.xAxis}
                    onChange={(e) => {
                      const newConfig = { ...currentConfig, xAxis: e.target.value };
                      setCurrentConfig(newConfig);
                      onConfigChange(newConfig);
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium mb-1">Y Axis Title</label>
                  <input
                    type="text"
                    value={currentConfig.yAxis}
                    onChange={(e) => {
                      const newConfig = { ...currentConfig, yAxis: e.target.value };
                      setCurrentConfig(newConfig);
                      onConfigChange(newConfig);
                    }}
                    className="w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

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
