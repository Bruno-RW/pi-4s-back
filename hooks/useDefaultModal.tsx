import { create } from "zustand";

interface useDefaultModalProps {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

const useDefaultModal = create<useDefaultModalProps>(set => ({
  isOpen: false,
  onOpen: () => set({ isOpen: true }),
  onClose: () => set({ isOpen: false }),
}));

export default useDefaultModal;