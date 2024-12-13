import { ArrowUpTrayIcon, ChatBubbleBottomCenterTextIcon, ChartBarIcon, DocumentTextIcon } from '@heroicons/react/24/outline';

const steps = [
  {
    title: 'Connect your data',
    description: 'Upload a file you would like to analyze',
    icon: ArrowUpTrayIcon,
  },
  {
    title: 'Ask a question',
    description: 'Ask any question about your data in plain language, or click the suggestions we automatically generate',
    icon: ChatBubbleBottomCenterTextIcon,
  },
  {
    title: 'Get valuable insights',
    description: 'Our AI will analyze your data and provide you with valuable insights',
    icon: ChartBarIcon,
  },
  {
    title: 'Share your work',
    description: 'Generate a comprehensive report of your analysis, share a link, and export to Word, PDF, and more',
    icon: DocumentTextIcon,
  },
];

export function HowItWorks() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">How it works</h2>
          <p className="mt-4 text-lg text-gray-600">
            Vaydr helps you get the most out of your data with AI to automatically insights in seconds, whether you're a student, researcher, or business.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-4">
            {steps.map((step, index) => (
              <div key={step.title} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                  <step.icon className="h-6 w-6" />
                </div>
                <dt className="text-lg font-semibold text-gray-900">
                  {index + 1}. {step.title}
                </dt>
                <dd className="mt-2 text-sm text-gray-600">{step.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}