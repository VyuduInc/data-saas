import { useState, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { useToast } from '@/hooks/useToast';
import { useSettings } from '@/hooks/useSettings';

export const Profile = () => {
  const { data: session, update: updateSession } = useSession();
  const { toast } = useToast();
  const { settings } = useSettings();
  const fileInputRef = useRef<HTMLInputElement>(null);

  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    name: session?.user?.name || '',
    email: session?.user?.email || '',
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (isLoading) return;

    try {
      setIsLoading(true);
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Failed to update profile');
      }

      await updateSession();
      toast({
        title: 'Success',
        description: 'Profile updated successfully',
        type: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageClick = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      toast({
        title: 'Error',
        description: 'Image size should be less than 5MB',
        type: 'error',
      });
      return;
    }

    try {
      setIsLoading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/profile/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      await updateSession();
      toast({
        title: 'Success',
        description: 'Profile image updated successfully',
        type: 'success',
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: (error as Error).message,
        type: 'error',
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <div className="mb-8 text-center">
        <div
          onClick={handleImageClick}
          className="relative inline-block cursor-pointer group"
        >
          {session?.user?.image ? (
            <img
              src={session.user.image}
              alt={session.user.name || 'Profile'}
              className="w-24 h-24 rounded-full object-cover border-4 border-white shadow-lg group-hover:opacity-80 transition-opacity"
            />
          ) : (
            <div className="w-24 h-24 rounded-full bg-gray-200 flex items-center justify-center text-gray-500 text-2xl border-4 border-white shadow-lg group-hover:bg-gray-300 transition-colors">
              {session?.user?.name?.[0] || '?'}
            </div>
          )}
          <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity">
            <span className="text-white text-sm">Change Photo</span>
          </div>
        </div>
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className="hidden"
        />
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Email
          </label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={isLoading}
          />
        </div>

        <div className="pt-4">
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-blue-500 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-600 transition-colors"
          >
            {isLoading ? 'Saving...' : 'Save Changes'}
          </button>
        </div>
      </form>

      <div className="mt-8 pt-8 border-t">
        <h3 className="text-lg font-medium text-gray-900 mb-4">
          Account Status
        </h3>
        <div className="bg-gray-50 rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm text-gray-600">Account Type</span>
            <span className="text-sm font-medium">
              {settings.isPremium ? 'Premium' : 'Free'}
            </span>
          </div>
          {!settings.isPremium && (
            <a
              href="/upgrade"
              className="inline-block mt-2 text-sm text-blue-500 hover:text-blue-600"
            >
              Upgrade to Premium →
            </a>
          )}
        </div>
      </div>
    </div>
  );
};
