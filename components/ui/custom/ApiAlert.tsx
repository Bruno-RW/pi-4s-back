"use client";

import { Copy, Server } from "lucide-react";
import { toast } from "react-hot-toast";

import useToastStyle from "@/hooks/useToastStyle";

import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Badge, BadgeProps } from "@/components/ui/badge";
import Button from "@/components/ui/custom/Button";
interface ApiAlertProps {
  title: string;
  description: string;
  variant: "public" | "admin" | "master";
};

const textMap: Record<ApiAlertProps["variant"], string> = {
  public: "Public",
  admin: "Admin",
  master: "Master",
};

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
  public: "secondary",
  admin: "default",
  master: "destructive",
};

const ApiAlert: React.FC<ApiAlertProps> = ({
  title,
  description,
  variant = "public",
}) => {
  const { toastStyle } = useToastStyle();

  const onCopy = (description: string) => {
    navigator.clipboard.writeText(description);
    toast.success("API Route copied to clipboard", toastStyle);
  };

  return (
    <Alert className="bg-shadow dark:bg-black/10 dark:shadow-none">
      <AlertTitle className="flex items-center gap-x-2">
        <Server className="h-4" />
        {title}
        <Badge variant={variantMap[variant]}>{textMap[variant]}</Badge>
      </AlertTitle>

      <AlertDescription className="flex flex-col sm:flex-row sm:items-center justify-between mt-4 gap-y-2">
        <code className="font-mono text-xs lg:text-sm font-semibold break-words max-w-fit py-[0.2rem] px-[0.3rem] rounded bg-gray-200 dark:bg-black/20">
          {description}
        </code>
        
        <Button className="bg-border w-min px-3.5 dark:bg-neutral-950/50" onClick={() => onCopy(description)}>
          <Copy className="h-4 w-4" />
        </Button>
      </AlertDescription>
    </Alert>
  );
};

export default ApiAlert;