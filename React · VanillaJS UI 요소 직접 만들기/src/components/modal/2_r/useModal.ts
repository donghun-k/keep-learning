import { useCallback, useState } from 'react';

const useModal = () => {
  const [opened, toggleModal] = useState(false);
  const openModal = useCallback(() => {
    toggleModal(true);
  }, []);
  const closeModal = useCallback(() => {
    toggleModal(false);
  }, []);
  return { opened, openModal, closeModal };
};

export default useModal;
