"use client";

import { Input } from "@nextui-org/input";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import { LuTrash, LuThermometerSun, LuVolume2 } from "react-icons/lu";
import { IoBarcodeOutline } from "react-icons/io5";
import { CgRename } from "react-icons/cg";
import { SiRainmeter } from "react-icons/si";
import { BsLightningCharge } from "react-icons/bs";
import { WiSandstorm } from "react-icons/wi";

import { k72623_lo } from "@prisma/client";

import { iconStyle, secondaryFormData, secondaryFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

interface SecondaryFormProps { initialData?: k72623_lo | null };

const SecondaryForm: React.FC<SecondaryFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Editar secundário" : "Criar secundário";
  const description  = initialData ? "Editar secundário admin" : "Criar secundário admin";
  const toastMessage = initialData ? "Secundário atualizado" : "Secundário criado";
  const submitLabel  = initialData ? (isLoading ? "Salvando..." : "Salvo") : (isLoading ? "Criando..." : "Criado");
  
  const { 
    handleSubmit, 
    register, 
    reset, 
    setFocus, 
    formState: {errors} 
  } = useForm<secondaryFormData>({ resolver: zodResolver(secondaryFormSchema) });

  const onSubmit = async (data: secondaryFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/secundario/${params.secundarioId}`, data);
      else await axios.post("/api/secundario/new", data);

      router.push("/secundario");
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
      await axios.delete(`/api/secundario/${params.secundarioId}`);

      router.push("/secondary");
      toast.success("Secundário deletado", toastStyle);

    } catch (error) {
      toast.error("Erro interno", toastStyle);

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
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<IoBarcodeOutline {...iconStyle} />}
                {...register("devEui")}
                defaultValue={initialData?.devEui || ""}
                label="EUI dispositivo"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.devEui && <ErrorMessage message={errors.devEui.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<CgRename {...iconStyle} />}
                {...register("deviceName")}
                defaultValue={initialData?.deviceName || ""}
                label="Nome dispositivo"
                variant="bordered"
                autoFocus
                autoComplete="new-password"
                isRequired
              />
              {errors.deviceName && <ErrorMessage message={errors.deviceName.message} />}
            </div>
          </div>


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuVolume2 {...iconStyle} />}
                {...register("noise")}
                type="number"
                defaultValue={initialData?.noise?.toString() || ""}
                placeholder="0.0"
                label="Barulho"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.noise && <ErrorMessage message={errors.noise.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuThermometerSun {...iconStyle} />}
                {...register("temperature")}
                type="number"
                defaultValue={initialData?.temperature?.toString() || ""}
                placeholder="0.0"
                label="Temepartura"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.temperature && <ErrorMessage message={errors.temperature.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<BsLightningCharge {...iconStyle} />}
                {...register("voltage")}
                type="number"
                defaultValue={initialData?.voltage?.toString() || ""}
                placeholder="0.0"
                label="Voltagem"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.voltage && <ErrorMessage message={errors.voltage.message} />}
            </div>
          </div>


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<SiRainmeter {...iconStyle} />}
                {...register("humidity")}
                type="number"
                defaultValue={initialData?.humidity?.toString() || ""}
                placeholder="0"
                label="Umidade"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.humidity && <ErrorMessage message={errors.humidity.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<WiSandstorm {...iconStyle} />}
                {...register("pm2_5")}
                type="number"
                defaultValue={initialData?.pm2_5?.toString() || ""}
                placeholder="0"
                label="PM2.5"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.pm2_5 && <ErrorMessage message={errors.pm2_5.message} />}
            </div>
          </div> 

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
};

export default SecondaryForm;