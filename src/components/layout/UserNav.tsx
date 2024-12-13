import { Fragment, useState } from 'react';
import { Menu, Transition } from '@headlessui/react';
import { useSession, signOut } from 'next-auth/react';
import { ChevronDownIcon } from '@heroicons/react/20/solid';
import { ProfileEditor } from '../profile/ProfileEditor';

export function UserNav() {
  const { data: session } = useSession();
  const [isProfileEditorOpen, setIsProfileEditorOpen] = useState(false);

  if (!session?.user) return null;

  return (
    <>
      <Menu as="div" className="relative">
        <Menu.Button className="flex items-center w-full text-sm">
          <span className="h-8 w-8 rounded-full bg-purple-600 flex items-center justify-center text-white font-medium">
            {session.user.name?.[0] || session.user.email?.[0] || 'U'}
          </span>
          <span className="ml-3 flex-1 text-left">
            <p className="text-sm font-medium text-gray-700">{session.user.name || session.user.email}</p>
            <p className="text-xs text-gray-500">Free Plan</p>
          </span>
          <ChevronDownIcon className="h-5 w-5 text-gray-400" />
        </Menu.Button>

        <Transition
          as={Fragment}
          enter="transition ease-out duration-100"
          enterFrom="transform opacity-0 scale-95"
          enterTo="transform opacity-100 scale-100"
          leave="transition ease-in duration-75"
          leaveFrom="transform opacity-100 scale-100"
          leaveTo="transform opacity-0 scale-95"
        >
          <Menu.Items className="absolute bottom-full left-0 mb-2 w-full rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
            <div className="py-1">
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => setIsProfileEditorOpen(true)}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                  >
                    Edit Profile
                  </button>
                )}
              </Menu.Item>
              <Menu.Item>
                {({ active }) => (
                  <button
                    onClick={() => signOut()}
                    className={`${
                      active ? 'bg-gray-100' : ''
                    } block w-full px-4 py-2 text-left text-sm text-gray-700`}
                  >
                    Sign out
                  </button>
                )}
              </Menu.Item>
            </div>
          </Menu.Items>
        </Transition>
      </Menu>

      <ProfileEditor
        isOpen={isProfileEditorOpen}
        onClose={() => setIsProfileEditorOpen(false)}
        user={session.user}
      />
    </>
  );
}
