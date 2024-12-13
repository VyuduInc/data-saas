const useCases = [
  {
    title: 'Uncovering Healthcare Insights with AI Data Analysis',
    category: 'Healthcare',
  },
  {
    title: 'Using AI to Detect Fraudulent Financial Transactions',
    category: 'Finance',
  },
  {
    title: 'Leveraging AI for Scientific Research',
    category: 'Research',
  },
  {
    title: 'Leveraging AI for Technology Research',
    category: 'Technology',
  },
];

export function UseCases() {
  return (
    <div className="bg-gray-50 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl">Use cases</h2>
          <p className="mt-4 text-lg text-gray-600">
            Vaydr empowers you to derive meaningful insights quickly, whether you're engaged in academic research, teaching, data analysis, or driving business decisions.
          </p>
        </div>
        <div className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-6 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-2">
          {useCases.map((useCase) => (
            <div
              key={useCase.title}
              className="flex gap-x-4 rounded-xl bg-white p-6 ring-1 ring-inset ring-gray-200"
            >
              <div className="text-base leading-7">
                <h3 className="font-semibold text-gray-900">{useCase.title}</h3>
                <p className="mt-2 text-sm text-purple-600">{useCase.category}</p>
              </div>
            </div>
          ))}
        </div>
        <div className="mt-10 text-center">
          <button className="text-sm font-semibold leading-6 text-purple-600">
            See more use cases →
          </button>
        </div>
      </div>
    </div>
  );
}