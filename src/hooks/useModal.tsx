'use client';

import React, { createContext, useContext, useState } from "react";

type ModalContextType = {
  isOpen: boolean;
  title?: string;
  content?: any;
  handleOpen: ({title, content}: {title?: string, content?: any}) => void;
  onClose: () => void;
};

const ModalContext = createContext<ModalContextType | undefined>(undefined);

export const ModalProvider = ({ children }: { children: React.ReactNode }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState<any>(null);

  const handleOpen = ({title = "Default Title", content = ''}) => {
    setTitle(title);
    setContent(content);
    setIsOpen(true);
  };

  const onClose = () => {
    setIsOpen(false);
    setTitle("");
  };

  return (
    <ModalContext.Provider
      value={
        {
          isOpen,
          title,
          content,
          handleOpen,
          onClose
        }
      }>
      {children}
    </ModalContext.Provider>
  );
};

export const useModal = () => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};