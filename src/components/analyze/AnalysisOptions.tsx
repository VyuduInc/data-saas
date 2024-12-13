import { useState } from 'react';
import { Switch } from '@headlessui/react';
import { ChartBarIcon, TableCellsIcon, SparklesIcon } from '@heroicons/react/24/outline';

export function AnalysisOptions() {
  const [options, setOptions] = useState({
    visualization: true,
    statistics: true,
    aiInsights: true,
  });

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium text-gray-900">Analysis Options</h3>
      <div className="space-y-3">
        <Option
          icon={ChartBarIcon}
          title="Data Visualization"
          description="Generate charts and graphs"
          enabled={options.visualization}
          onChange={(enabled) => setOptions({ ...options, visualization: enabled })}
        />
        <Option
          icon={TableCellsIcon}
          title="Statistical Analysis"
          description="Calculate key metrics and patterns"
          enabled={options.statistics}
          onChange={(enabled) => setOptions({ ...options, statistics: enabled })}
        />
        <Option
          icon={SparklesIcon}
          title="AI Insights"
          description="Get AI-powered recommendations"
          enabled={options.aiInsights}
          onChange={(enabled) => setOptions({ ...options, aiInsights: enabled })}
        />
      </div>
    </div>
  );
}

function Option({
  icon: Icon,
  title,
  description,
  enabled,
  onChange,
}: {
  icon: any;
  title: string;
  description: string;
  enabled: boolean;
  onChange: (enabled: boolean) => void;
}) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center space-x-3">
        <Icon className="h-6 w-6 text-gray-400" />
        <div>
          <p className="text-sm font-medium text-gray-900">{title}</p>
          <p className="text-sm text-gray-500">{description}</p>
        </div>
      </div>
      <Switch
        checked={enabled}
        onChange={onChange}
        className={\`\${
          enabled ? 'bg-purple-600' : 'bg-gray-200'
        } relative inline-flex h-6 w-11 flex-shrink-0 cursor-pointer rounded-full border-2 border-transparent transition-colors duration-200 ease-in-out focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2\`}
      >
        <span
          className={\`\${
            enabled ? 'translate-x-5' : 'translate-x-0'
          } pointer-events-none relative inline-block h-5 w-5 transform rounded-full bg-white shadow ring-0 transition duration-200 ease-in-out\`}
        />
      </Switch>
    </div>
  );
}
