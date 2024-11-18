"use client";

import { Input } from "@nextui-org/input";
import { Select, SelectItem } from "@nextui-org/select";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { LuLock, LuMail, LuTrash, LuUnlock, LuUser } from "react-icons/lu";

import { nit2xli } from "@prisma/client";

import { iconStyle, generalFormData, generalFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

interface GeneralFormProps { initialData?: nit2xli | null };

const GeneralForm: React.FC<GeneralFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Edit general" : "Create general";
  const description  = initialData ? "Edit admin general" : "New admin general";
  const toastMessage = initialData ? "General updated" : "General created";
  const submitLabel  = initialData ? (isLoading ? "Saving..." : "Save") : (isLoading ? "Creating..." : "Create");
  
  const { 
    handleSubmit, 
    register, 
    reset, 
    setFocus, 
    formState: {errors} 
  } = useForm<generalFormData>({ resolver: zodResolver(generalFormSchema) });

  const onSubmit = async (data: generalFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/general/${params.userId}`, data);
      else await axios.post("/api/general/new", data);

      router.push("/general");
      toast.success(toastMessage, toastStyle);

    } catch (error: any) {
      toast.error(error.response.data, toastStyle);

    } finally {
      setIsLoading(false);
      reset();
      setFocus("deviceName");
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/general/${params.generalId}`);

      router.push("/general");
      toast.success("General deleted", toastStyle);

    } catch (error) {
      toast.error("Internal error", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
      reset();
      setFocus("deviceName");
    }
  };

  return (
    <>
      <AlertModal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        onConfirm={onDelete}
        loading={isLoading}
      />

      <section className="flex flex-col gap-y-3">
        <div className="flex items-center justify-between">
          <Heading title={title} description={description} />

          {initialData && 
            <Button className="px-3 hover:bg-red-700 dark:bg-red-700 dark:hover:bg-red-600" variant="red" onClick={() => setIsOpen(true)}>
              <LuTrash size={20} />
            </Button>
          }
        </div>

        <form className="flex flex-col w-full gap-y-3" onSubmit={handleSubmit(onSubmit)}>
          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-full">
              <Input endContent={<LuUser {...iconStyle} />}
                {...register("deviceName")}
                defaultValue={initialData?.deviceName || ""}
                label="Device name"
                variant="bordered"
                autoFocus
                autoComplete="new-password"
                isRequired
              />
              {errors.deviceName && <ErrorMessage message={errors.deviceName.message} />}
            </div>
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
};

export default GeneralForm;