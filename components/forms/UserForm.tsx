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

import { User } from "@prisma/client";

import { editUserFormSchema, iconStyle, userFormData, userFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import AlertModal from "@/components/modals/AlertModal";
import Heading from "@/components/ui/custom/Heading";
import Button from "@/components/ui/custom/Button";

type userTypesValues = {
  label: "Admin" | "Master",
  value: "A" | "M"
};

const userTypes: userTypesValues[] = [
  { label: "Admin", value: "A" },
  { label: "Master", value: "M" },
];

interface UserFormProps { initialData?: User | null };

const UserForm: React.FC<UserFormProps> = ({ initialData }) => {
  const router = useRouter();
  const params = useParams();
  const { toastStyle } = useToastStyle();
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const title        = initialData ? "Editar usuário" : "Criar usuário";
  const description  = initialData ? "Editar usuário administrador" : "Criar usuário administrador";
  const toastMessage = initialData ? "Usuário atualizado" : "Usuário criado";
  const submitLabel  = initialData ? (isLoading ? "Salvando..." : "Salvar") : (isLoading ? "Criando..." : "Criado");
  
  const { 
    handleSubmit, 
    register, 
    reset, 
    setFocus, 
    formState: {errors} 
  } = initialData ? useForm<userFormData>({ resolver: zodResolver(editUserFormSchema) }) 
  : useForm<userFormData>({ resolver: zodResolver(userFormSchema) });

  const onSubmit = async (data: userFormData) => {
    try {
      setIsLoading(true);

      if (initialData) await axios.patch(`/api/usuarios/${params.usuarioId}`, data);
      else await axios.post("/api/usuarios/new", data);

      router.push("/usuarios");
      toast.success(toastMessage, toastStyle);

    } catch (error: any) {
      toast.error(error.response.data, toastStyle);

    } finally {
      setIsLoading(false);
      reset();
      setFocus("name");
    }
  }

  const onDelete = async () => {
    try {
      setIsLoading(true);
      await axios.delete(`/api/usuarios/${params.usuarioId}`);

      router.push("/usuarios");
      toast.success("Usuário deletado", toastStyle);

    } catch (error) {
      toast.error("Erro interno", toastStyle);

    } finally {
      setIsOpen(false);
      setIsLoading(false);
      reset();
      setFocus("name");
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
                {...register("name")}
                defaultValue={initialData?.name || ""}
                label="Nome"
                variant="bordered"
                autoFocus
                autoComplete="new-password"
                isRequired
              />
              {errors.name && <ErrorMessage message={errors.name.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Select
                {...register("type")}
                defaultSelectedKeys={initialData?.type || ""}
                label="Tipo"
                variant="bordered"
                autoComplete="new-password"
                items={userTypes}
                isRequired
              >
                {type => <SelectItem key={type.value}>{type.label}</SelectItem>}
              </Select>
              {errors.type && <ErrorMessage message={errors.type.message} />}
            </div>
          </div>

          <div className="flex flex-col gap-y-1">
            <Input endContent={<LuMail {...iconStyle} />}
              {...register("email")}
              defaultValue={initialData?.email || ""}
              label="Email"
              variant="bordered"
              autoComplete="new-password"
              isRequired
            />
            {errors.email && <ErrorMessage message={errors.email.message} />}
          </div>

          <div className="flex gap-x-3">
            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<LuUnlock {...iconStyle} />}
                {...register("password")}
                type="password"
                label="Senha"
                variant="bordered"
                autoComplete="new-password"
                isRequired={!initialData}
              />
              {errors.password && <ErrorMessage message={errors.password.message} />}
            </div>

            <div className="flex flex-col gap-y-1 w-1/2">
              <Input endContent={<LuLock {...iconStyle} />}
                {...register("confirmPassword")}
                type="password"
                label="Confirmar senha"
                variant="bordered"
                autoComplete="new-password"
                isRequired={!initialData}
              />
              {errors.confirmPassword && <ErrorMessage message={errors.confirmPassword.message} />}
            </div>
          </div>

          <Button className={cn("w-1/4", isLoading && "bg-blue-600/70 dark:bg-blue-500/40")} type="submit" variant="blue" isLoading={isLoading}>{submitLabel}</Button>
        </form>
      </section>
    </>
  );
};

export default UserForm;