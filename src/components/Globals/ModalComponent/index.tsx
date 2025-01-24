'use client'

import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useModal } from '@/hooks/useModal';
import { CiCircleRemove } from "react-icons/ci";

const ModalComponent = ({children}: {children: any}) => {
  const [mounted, setMounted] = useState(false);

  const modalState = useModal();

  useEffect(() => {
    setMounted(true);
    
    if (modalState.isOpen) {
      document.body.style.overflow = 'hidden';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [modalState.isOpen]);

  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        modalState.onClose();
      }
    };

    if (modalState.isOpen) {
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('keydown', handleEscape);
    };
  }, [modalState.isOpen]);

  const handleBackdropClick = (event: React.MouseEvent) => {
    if (event.target === event.currentTarget) {
      modalState.onClose();
    }
  };

  if (!mounted || !modalState.isOpen) return null;

  const modal = (
    <div
      className="
        fixed 
        inset-0 
        z-50 
        flex 
        items-center 
        justify-center 
        bg-black/50 
        backdrop-blur-sm
      "
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-labelledby={modalState.title ? "modal-title" : undefined}
    >
      <div className="relative w-full min-w-[50%] max-w-lg bg-white rounded-lg shadow-xl m-4">
        <div className="flex items-center justify-between p-4 border-b">
          {modalState.title && (
            <h2 id="modal-title" className="text-xl font-semibold">
              {modalState.title}
            </h2>
          )}
          <button
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
            aria-label="Close modal"
            onClick={modalState.onClose}
          >
            <CiCircleRemove fontSize={36} />
          </button>
        </div>
        <div className="p-4">
          {children}
        </div>
      </div>
    </div>
  );

  return createPortal(modal, document.body);
};

export default ModalComponent;