import { Metadata } from 'next';
import { Profile } from '@/components/Profile';

export const metadata: Metadata = {
  title: 'Profile | Data SaaS',
  description: 'Manage your profile settings and preferences',
};

export default function ProfilePage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow sm:rounded-lg">
            <div className="px-4 py-5 sm:p-6">
              <h1 className="text-2xl font-bold text-gray-900 mb-8">
                Profile Settings
              </h1>
              <Profile />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
