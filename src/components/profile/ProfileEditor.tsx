'use client';

import { useState } from 'react';
import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
  Avatar,
  Divider,
} from "@nextui-org/react";
import { XMarkIcon, CameraIcon, KeyIcon } from '@heroicons/react/24/outline';

interface ProfileEditorProps {
  isOpen: boolean;
  onClose: () => void;
  user: {
    name: string;
    email: string;
    image?: string;
  };
}

export function ProfileEditor({ isOpen, onClose, user }: ProfileEditorProps) {
  const [profile, setProfile] = useState({
    name: user.name,
    email: user.email,
    currentPassword: '',
    newPassword: '',
    confirmPassword: '',
  });

  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      setIsUploading(true);
      const formData = new FormData();
      formData.append('image', file);

      const response = await fetch('/api/profile/image', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload image');
      }

      // Refresh user data or update local state
    } catch (error) {
      console.error('Error uploading image:', error);
      // Show error toast
    } finally {
      setIsUploading(false);
    }
  };

  const handleSave = async () => {
    try {
      const response = await fetch('/api/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: profile.name,
          email: profile.email,
        }),
      });

      if (!response.ok) {
        throw new Error('Failed to update profile');
      }

      if (isChangingPassword && profile.newPassword) {
        const passwordResponse = await fetch('/api/profile/password', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            currentPassword: profile.currentPassword,
            newPassword: profile.newPassword,
          }),
        });

        if (!passwordResponse.ok) {
          throw new Error('Failed to update password');
        }
      }

      onClose();
    } catch (error) {
      console.error('Error updating profile:', error);
      // Show error toast
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="md"
      scrollBehavior="inside"
    >
      <ModalContent>
        <div className="p-6">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-lg font-semibold">Edit Profile</h2>
            <Button isIconOnly variant="light" onClick={onClose}>
              <XMarkIcon className="h-5 w-5" />
            </Button>
          </div>

          <div className="flex flex-col items-center mb-6">
            <div className="relative">
              <Avatar
                src={user.image}
                alt={user.name}
                className="w-24 h-24"
              />
              <label className="absolute bottom-0 right-0 p-1 bg-white rounded-full shadow-lg cursor-pointer">
                <input
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                  disabled={isUploading}
                />
                <CameraIcon className="h-5 w-5 text-gray-600" />
              </label>
            </div>
          </div>

          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium">Name</label>
              <Input
                value={profile.name}
                onChange={(e) => setProfile(p => ({ ...p, name: e.target.value }))}
                placeholder="Your name"
              />
            </div>

            <div>
              <label className="text-sm font-medium">Email</label>
              <Input
                value={profile.email}
                onChange={(e) => setProfile(p => ({ ...p, email: e.target.value }))}
                placeholder="Your email"
                type="email"
              />
            </div>

            <Divider />

            <div>
              <button
                className="flex items-center gap-2 text-sm text-purple-600"
                onClick={() => setIsChangingPassword(!isChangingPassword)}
              >
                <KeyIcon className="h-4 w-4" />
                {isChangingPassword ? 'Cancel password change' : 'Change password'}
              </button>

              {isChangingPassword && (
                <div className="mt-4 space-y-4">
                  <Input
                    value={profile.currentPassword}
                    onChange={(e) => setProfile(p => ({ ...p, currentPassword: e.target.value }))}
                    placeholder="Current password"
                    type="password"
                  />
                  <Input
                    value={profile.newPassword}
                    onChange={(e) => setProfile(p => ({ ...p, newPassword: e.target.value }))}
                    placeholder="New password"
                    type="password"
                  />
                  <Input
                    value={profile.confirmPassword}
                    onChange={(e) => setProfile(p => ({ ...p, confirmPassword: e.target.value }))}
                    placeholder="Confirm new password"
                    type="password"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex justify-end mt-6">
            <Button
              color="secondary"
              onClick={handleSave}
            >
              Save changes
            </Button>
          </div>
        </div>
      </ModalContent>
    </Modal>
  );
}
