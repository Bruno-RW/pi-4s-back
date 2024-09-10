import { cn } from "@/lib/utils";

interface HeadingProps {
  title?: string;
  subtitle?: string;
  description?: string;
  
  titleClass?: string;
  subtitleClass?: string;
  descriptionClass?: string;
}

const Heading: React.FC<HeadingProps> = ({ 
  title,
  subtitle,
  description,
  titleClass,
  subtitleClass,
  descriptionClass 
}) => {
  return (
    <div className="flex flex-col">
      {title && (
        <>
          <h1 className={cn("text-4xl", description && "mb-1", titleClass)}>
            {title}
          </h1>

          <span className={cn("text-lg font-medium text-black/50 dark:font-normal dark:text-white/50", descriptionClass)}>
            {description}
          </span>
        </>
      )}

      {subtitle && (
        <>
          <h2 className={cn("text-3xl", description && "mb-1", subtitleClass)}>
            {subtitle}
          </h2>

          <span className={cn("text-lg font-medium text-black/50 dark:font-normal dark:text-white/50", descriptionClass)}>
            {description}
          </span>
        </>
      )}

    </div>
  )
};

export default Heading;