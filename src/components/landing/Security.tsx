import { LockClosedIcon, ShieldCheckIcon, NoSymbolIcon } from '@heroicons/react/24/outline';

const features = [
  {
    name: 'Encrypted at rest and in transit',
    description: 'All data uploaded to Vizly is encrypted in transit and at rest',
    icon: LockClosedIcon,
  },
  {
    name: 'Private code and file sandbox',
    description: 'Your data is processed in a completely isolated environment',
    icon: ShieldCheckIcon,
  },
  {
    name: 'Industry-leading security standards',
    description: 'We follow the highest security standards to protect your data',
    icon: NoSymbolIcon,
  },
];

export function Security() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Private and secure
          </h2>
          <p className="mt-4 text-lg text-gray-600">
            All data uploaded to Vizly is encrypted in transit and at rest. Any data uploaded to Vizly is stored in a completely isolated environment only accessible to you and is deleted permanently after use.
          </p>
        </div>
        <div className="mx-auto mt-16 max-w-2xl sm:mt-20 lg:mt-24 lg:max-w-none">
          <dl className="grid max-w-xl grid-cols-1 gap-x-8 gap-y-16 lg:max-w-none lg:grid-cols-3">
            {features.map((feature) => (
              <div key={feature.name} className="flex flex-col items-center text-center">
                <div className="mb-6 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-600 text-white">
                  <feature.icon className="h-6 w-6" />
                </div>
                <dt className="text-lg font-semibold text-gray-900">{feature.name}</dt>
                <dd className="mt-2 text-sm text-gray-600">{feature.description}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </div>
  );
}