'use client';

import { useState } from 'react';
import {
  Button,
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@nextui-org/react";
import { TrashIcon } from '@heroicons/react/24/outline';

interface ChatActionsProps {
  chatId: string;
  onDelete: () => void;
}

export function ChatActions({ chatId, onDelete }: ChatActionsProps) {
  const [showDeleteModal, setShowDeleteModal] = useState(false);

  const handleDelete = async () => {
    try {
      const response = await fetch(`/api/chat/${chatId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete chat');
      }

      onDelete();
      setShowDeleteModal(false);
    } catch (error) {
      console.error('Error deleting chat:', error);
      // Show error toast
    }
  };

  return (
    <>
      <Button
        isIconOnly
        variant="light"
        onClick={() => setShowDeleteModal(true)}
        className="text-gray-500 hover:text-red-500"
      >
        <TrashIcon className="h-5 w-5" />
      </Button>

      <Modal
        isOpen={showDeleteModal}
        onClose={() => setShowDeleteModal(false)}
        size="sm"
      >
        <ModalContent>
          <ModalHeader>Delete Chat</ModalHeader>
          <ModalBody>
            Are you sure you want to delete this chat? This action cannot be undone.
          </ModalBody>
          <ModalFooter>
            <Button
              variant="light"
              onClick={() => setShowDeleteModal(false)}
            >
              Cancel
            </Button>
            <Button
              color="danger"
              onClick={handleDelete}
            >
              Delete
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
