import {
  Card as CD,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent
} from "@/components/ui/card";

import { cn } from "@/lib/utils";

interface CarProps {
  classCard?: string;

  cardTitle?: string;
  classTitle?: string;

  cardDescription?: string;
  classDescription?: string;

  cardContent?: string | JSX.Element;
  classContent?: string;
};

const Card: React.FC<CarProps> = ({
  classCard,

  cardTitle,
  classTitle,

  cardDescription,
  classDescription,

  cardContent,
  classContent
}) => {
  return (
    <CD className={cn("m-2", classCard)}>
      <CardHeader>
        {cardTitle &&
          <CardTitle className={cn("text-medium mb-0", classTitle)}>
            {cardTitle}
          </CardTitle>
        }
        {cardDescription &&
          <CardDescription className={cn(classDescription)}>
            {cardDescription}
          </CardDescription>
        }
      </CardHeader>

      {cardContent && 
        <CardContent className={cn("text-5xl text-center font-extrabold", classContent)}>
          {cardContent}
        </CardContent>
      }
    </CD>
  );
};

export default Card;