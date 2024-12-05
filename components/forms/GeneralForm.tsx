"use client";

import { Input } from "@nextui-org/input";
import { useParams, useRouter } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useState } from "react";
import axios from "axios";

import {
  LuTrash,
  LuThermometerSun,
  LuCloudRainWind,
  LuWind,
  LuSun,
  LuWaves
} from "react-icons/lu";
import { IoBarcodeOutline } from "react-icons/io5";
import { CgRename } from "react-icons/cg";
import { SiRainmeter } from "react-icons/si";
import { WiCloudyGusts } from "react-icons/wi";
import { IoCompassOutline } from "react-icons/io5";
import { TbUvIndex } from "react-icons/tb";
import { TbGauge } from "react-icons/tb";

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
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<IoBarcodeOutline {...iconStyle} />}
                {...register("devEui")}
                defaultValue={initialData?.devEui || ""}
                label="Device EUI"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.devEui && <ErrorMessage message={errors.devEui.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<CgRename {...iconStyle} />}
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


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuCloudRainWind {...iconStyle} />}
                {...register("emw_rain_lvl")}
                type="number"
                defaultValue={initialData?.emw_rain_lvl?.toString() || ""}
                placeholder="0.0"
                label="Rain Level"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.emw_rain_lvl && <ErrorMessage message={errors.emw_rain_lvl.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuThermometerSun {...iconStyle} />}
                {...register("emw_temperature")}
                type="number"
                defaultValue={initialData?.emw_temperature?.toString() || ""}
                placeholder="0.0"
                label="Temperature"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.emw_temperature && <ErrorMessage message={errors.emw_temperature.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<SiRainmeter {...iconStyle} />}
                {...register("emw_humidity")}
                type="number"
                defaultValue={initialData?.emw_humidity?.toString() || ""}
                placeholder="0.0"
                label="Humidity"
                variant="bordered"
                autoComplete="new-password"
              />
              {errors.emw_humidity && <ErrorMessage message={errors.emw_humidity.message} />}
            </div>
          </div>


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<WiCloudyGusts {...iconStyle} />}
                {...register("emw_avg_wind_speed")}
                type="number"
                defaultValue={initialData?.emw_avg_wind_speed?.toString() || ""}
                placeholder="0"
                label="Average Wind Speed"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_avg_wind_speed && <ErrorMessage message={errors.emw_avg_wind_speed.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuWind {...iconStyle} />}
                {...register("emw_gust_wind_speed")}
                type="number"
                defaultValue={initialData?.emw_gust_wind_speed?.toString() || ""}
                placeholder="0"
                label="Gust Wind Speed"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_gust_wind_speed && <ErrorMessage message={errors.emw_gust_wind_speed.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<IoCompassOutline {...iconStyle} />}
                {...register("emw_wind_direction")}
                type="number"
                defaultValue={initialData?.emw_wind_direction?.toString() || ""}
                placeholder="0"
                label="Wind Direction"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_wind_direction && <ErrorMessage message={errors.emw_wind_direction.message} />}
            </div>
          </div>


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuSun {...iconStyle} />}
                {...register("emw_luminosity")}
                type="number"
                defaultValue={initialData?.emw_luminosity?.toString() || ""}
                placeholder="0"
                label="Luminosity"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_luminosity && <ErrorMessage message={errors.emw_luminosity.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<TbUvIndex {...iconStyle} />}
                {...register("emw_uv")}
                type="number"
                defaultValue={initialData?.emw_uv?.toString() || ""}
                placeholder="0.0"
                label="UV"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_uv && <ErrorMessage message={errors.emw_uv.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuWaves {...iconStyle} />}
                {...register("emw_solar_radiation")}
                type="number"
                defaultValue={initialData?.emw_solar_radiation?.toString() || ""}
                placeholder="0.0"
                label="Solar Radiation"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_solar_radiation && <ErrorMessage message={errors.emw_solar_radiation.message} />}
            </div>
          </div>  


          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<TbGauge {...iconStyle} />}
                {...register("emw_atm_pres")}
                type="number"
                defaultValue={initialData?.emw_atm_pres?.toString() || ""}
                placeholder="0.0"
                label="Atmospheric Pressure"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.emw_atm_pres && <ErrorMessage message={errors.emw_atm_pres.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<LuThermometerSun {...iconStyle} />}
                {...register("internal_temperature")}
                type="number"
                defaultValue={initialData?.internal_temperature?.toString() || ""}
                placeholder="0.0"
                label="Internal Temperature"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.internal_temperature && <ErrorMessage message={errors.internal_temperature.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/3">
              <Input endContent={<SiRainmeter {...iconStyle} />}
                {...register("internal_humidity")}
                type="number"
                defaultValue={initialData?.internal_humidity?.toString() || ""}
                placeholder="0.0"
                label="Internal Humidity"
                variant="bordered"
                autoComplete="new-password"
                isRequired
              />
              {errors.internal_humidity && <ErrorMessage message={errors.internal_humidity.message} />}
            </div>
          </div> 

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
};

export default GeneralForm;