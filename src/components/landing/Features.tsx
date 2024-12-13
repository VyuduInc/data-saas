import { ChartBarIcon, DocumentChartBarIcon, SparklesIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Visualizations',
    description: 'Automatically create interactive data visualizations',
    icon: ChartBarIcon,
  },
  {
    name: 'Insights',
    description: 'Use your data and get actionable insights',
    icon: DocumentChartBarIcon,
  },
  {
    name: 'Analysis',
    description: 'Feature-complete analysis and generate predictions',
    icon: SparklesIcon,
  },
];

export function Features() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto grid max-w-2xl grid-cols-1 gap-x-8 gap-y-16 sm:gap-y-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">
          {features.map((feature) => (
            <div key={feature.name} className="text-center">
              <div className="flex justify-center">
                <feature.icon className="h-12 w-12 text-purple-600" />
              </div>
              <h3 className="mt-6 text-lg font-semibold leading-7 text-gray-900">{feature.name}</h3>
              <p className="mt-2 text-sm leading-7 text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}