"use client";

import { useEffect, useState } from "react";

import Modal from "@/components/ui/custom/Modal";
import Button from "@/components/ui/custom/Button";

interface AlertModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  loading: boolean;
}

const AlertModal: React.FC<AlertModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  loading,
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => setIsMounted(true) , []);

  if (!isMounted) return null;

  return (
    <Modal title="Are you sure?" description="This action cannot be undone." isOpen={isOpen} onClose={onClose}>
      <div className="pt-6 space-x-2 flex items-center justify-end w-full">
        <Button className="rounded-sm dark:hover:bg-neutral-700" disabled={loading} onClick={onClose}>Cancel</Button>
        <Button className="rounded-sm hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600" variant="red" disabled={loading} onClick={onConfirm}>Continue</Button>
      </div>
    </Modal>
  );
};

export default AlertModal;