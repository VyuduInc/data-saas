import Link from 'next/link';

export function Hero() {
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl font-bold tracking-tight text-gray-900 sm:text-6xl">
            Analyze your data <span className="text-purple-600">in seconds</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Chat with your files and uncover valuable insights using the most powerful AI models for data analysis.
          </p>
          <div className="mt-10 flex items-center justify-center gap-x-6">
            <Link
              href="/chat"
              className="rounded-md bg-purple-600 px-8 py-3 text-base font-semibold text-white shadow-sm hover:bg-purple-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-purple-600"
            >
              Launch Vizly
            </Link>
          </div>
          <div className="mt-8 flex justify-center space-x-2">
            <span className="text-sm text-gray-500">★★★★★</span>
            <span className="text-sm text-gray-500">User reviews on G2</span>
          </div>
        </div>
      </div>
    </div>
  );
}