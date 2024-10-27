"use client";

import { useOrigin } from "@/hooks/useOrigin";

import ApiAlert from "@/components/ui/custom/ApiAlert";
import Heading from "./Heading";
import Separator from "./Separator";

interface ApiListProps {
  entityName: string;
  entityIdName: string;
  type?: "admin" | "master";
}

const ApiList: React.FC<ApiListProps> = ({ entityIdName, entityName, type = "admin" }) => {
  const origin = useOrigin();

  const baseUrl = `${origin}/api`;

  return (
    <section className="flex flex-col gap-y-3">
      <div className="flex flex-col gap-y-3">
        <Heading subtitle="API" description={`API calls for ${entityName}`} />
        <Separator />
      </div>

      {type === "admin" ? (
        <div className="flex flex-col gap-y-4">
          <ApiAlert title="GET"    variant="public" description={`${baseUrl}/${entityName}`} />
          <ApiAlert title="GET"    variant="public" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
          
          <ApiAlert title="PATCH"  variant="admin"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
          <ApiAlert title="DELETE" variant="admin"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        </div>
      ) : (
        <div className="flex flex-col gap-y-4">
          <ApiAlert title="GET"    variant="master" description={`${baseUrl}/${entityName}`} />
          <ApiAlert title="GET"    variant="master" description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
          
          <ApiAlert title="PATCH"  variant="master"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
          <ApiAlert title="DELETE" variant="master"  description={`${baseUrl}/${entityName}/{${entityIdName}}`} />
        </div>
      )}
    </section>
  );
};

export default ApiList;