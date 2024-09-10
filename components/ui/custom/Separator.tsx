import { cn } from "@/lib/utils";

interface SeparatorProps { className?: string };

const Separator: React.FC<SeparatorProps> = ({ className }) => {
  return (
    <hr 
      className={cn(
        "w-full mb-3 border-black/10 dark:border-white/10", 
        className
      )} 
    />
  )
};

export default Separator;