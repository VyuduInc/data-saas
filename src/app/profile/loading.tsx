export default function ProfileLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <div className="h-8 w-48 bg-gray-200 rounded animate-pulse mb-8" />
              <div className="space-y-6">
                <div className="flex justify-center">
                  <div className="w-24 h-24 rounded-full bg-gray-200 animate-pulse" />
                </div>
                <div className="space-y-4">
                  <div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div>
                    <div className="h-4 w-16 bg-gray-200 rounded animate-pulse mb-2" />
                    <div className="h-10 bg-gray-200 rounded animate-pulse" />
                  </div>
                  <div className="h-10 bg-gray-200 rounded animate-pulse mt-4" />
                </div>
                <div className="pt-6 mt-6 border-t">
                  <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4" />
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex justify-between items-center">
                      <div className="h-4 w-24 bg-gray-200 rounded animate-pulse" />
                      <div className="h-4 w-16 bg-gray-200 rounded animate-pulse" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
