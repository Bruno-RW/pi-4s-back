"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { LuMail, LuLock } from "react-icons/lu";
import { useRouter } from "next/navigation";
import { Input } from "@nextui-org/input";
import { useForm } from "react-hook-form";
import { signIn } from "next-auth/react";
import toast from "react-hot-toast";
import { useState } from "react";

import { iconStyle, loginFormData, loginFormSchema } from "@/lib/types/forms";
import useToastStyle from "@/hooks/useToastStyle";
import { cn } from "@/lib/utils";

import ErrorMessage from "@/components/forms/ErrorMessage";
import Button from "@/components/ui/custom/Button";

const LoginForm = () => {
  const router = useRouter();
  const { toastStyle } = useToastStyle();
  const [isLoading, setIsLoading] = useState(false);

  const submitLabel  = (isLoading ? "Signing in..." : "Sign in");

  const { handleSubmit, register, reset, formState: {errors} } = useForm<loginFormData>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  let isUserError = false;
  const onSubmit = async (data: loginFormData) => {
    try {
      setIsLoading(true);

      const loginData = await signIn("credentials", {
        email: data.email,
        password: data.password,
        redirect: false
      });

      if (loginData?.error) {
        toast.error("Incorrect e-mail or password", toastStyle);
        isUserError = true;
        return;
      }
      
      router.push("/");

    } catch (error) {
      toast.error("Something went wrong", toastStyle);

    } finally {
      reset();
      setIsLoading(false);

      if(!isUserError) toast.loading("Redirecting...", {...toastStyle, duration: Infinity});
    }
  };

  return (
    <form className="flex flex-col w-full gap-y-3 py-3" onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col gap-y-3 mb-2">
        <div className="flex flex-col gap-y-1">
          <Input endContent={<LuMail {...iconStyle} />}
            {...register("email")}
            className="self-center"
            name="email"
            label="Email"
            variant="bordered"
            autoComplete="email"
            autoFocus
          />
          {errors.email && <ErrorMessage message={errors.email.message} />}
        </div>

        <div className="flex flex-col gap-y-1">
          <Input endContent={<LuLock {...iconStyle} />}
            {...register("password")}
            className="self-center"
            type="password"
            name="password"
            label="Password"
            variant="bordered"
          />
          {errors.password && <ErrorMessage message={errors.password.message} />}
        </div>
      </div>

      <Button className={cn(isLoading && "bg-blue-600/70 dark:bg-blue-500/40")}
        type="submit"
        variant="blue"
        isLoading={isLoading}
      >
        {submitLabel}
      </Button>
    </form>
  );
};

export default LoginForm;