"use client";

import { Copy, Edit, Trash } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { Tooltip } from "@nextui-org/tooltip";

import useToastStyle from "@/hooks/useToastStyle";

import AlertModal from "@/components/modals/AlertModal";

import { GeneralColumnsProps } from "./GeneralColumns";

interface GeneralActionsProps { data: GeneralColumnsProps };

const GeneralActions: React.FC<GeneralActionsProps> = ({ data }) => {
  const router = useRouter();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const onConfirm = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/primarios/${data.deduplicationId}`);

      toast.success("Primário deletado", toastStyle);
      router.refresh();

    } catch (error) {
      toast.error("Erro interno", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
    }
  };

  const onCopy = (id: string) => {
    navigator.clipboard.writeText(id);
    toast.success("ID primário copiado", toastStyle);
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onConfirm}
        loading={isLoading}
      />

      <div className="flex items-center justify-center gap-x-2">
        <Tooltip content="Copiar ID">
          <Copy className="h-4 w-4 cursor-pointer" onClick={() => onCopy(data.deduplicationId.toString())} />
        </Tooltip>
        <Tooltip className="text-blue-500" content="Editar">
          <Edit className="text-blue-500 h-4 w-4 cursor-pointer" onClick={() => router.push(`/general/${data.deduplicationId}`)} />
        </Tooltip>
        <Tooltip className="text-red-500" content="Deletar">
          <Trash className="text-red-500 h-4 w-4 cursor-pointer" onClick={() => setIsOpen(true)} />
        </Tooltip>
      </div>
    </>
  );
};

export default GeneralActions;