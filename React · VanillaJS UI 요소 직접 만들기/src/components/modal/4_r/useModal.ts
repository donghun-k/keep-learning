import { useCallback, useRef, useState } from 'react';

const useModal = () => {
  const modalRef = useRef<HTMLDialogElement>(null);
  const openModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.showModal();
    }
  }, []);
  const closeModal = useCallback(() => {
    if (modalRef.current) {
      modalRef.current.close();
    }
  }, []);
  return { modalRef, openModal, closeModal };
};

export default useModal;
