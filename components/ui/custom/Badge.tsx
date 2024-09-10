import { cva, VariantProps } from "class-variance-authority";

import { cn } from "@/lib/utils";

const badgeStyles = cva(
  "py-2 px-2.5 text-xs rounded-full",
  {
    variants: {
      variant: {
        default : "text-black bg-gray-100 dark:text-gray-50 dark:bg-black/70",
        green: "text-green-400 bg-green-500/40 dark:text-green-300",
        blue: "text-blue-400 bg-blue-500/40 dark:text-blue-300",
        red: "text-red-400 bg-red-500/40 dark:text-red-300",
      },
      defaultVariants: {
        variant: "default"
      }
    }
  }
);

export interface BadgeProps extends VariantProps<typeof badgeStyles> {
  className?: string;
  children: React.ReactNode;
}

const Badge: React.FC<BadgeProps> = ({ className, variant="default", children }) => {
  return (
    <span className={cn(badgeStyles({ variant }), className)}>
      {children}
    </span>
  )
};

export default Badge;