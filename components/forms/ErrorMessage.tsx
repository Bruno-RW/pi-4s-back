import { cn } from "@/lib/utils";

interface ErrorMessageProps {
  className?: string;
  message?: string;
};

const ErrorMessage: React.FC<ErrorMessageProps> = ({ className, message }) => {
  return <span className={cn("text-red-500 ml-2", className)}>{message}</span>;
};

export default ErrorMessage;