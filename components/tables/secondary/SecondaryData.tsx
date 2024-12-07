import { SecondaryColumnsProps, SecondaryColumns } from "./SecondaryColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface SecondaryDataProps { data: SecondaryColumnsProps[] };

const SecondaryData: React.FC<SecondaryDataProps> = ({ data }) => {
  return (
    <>
      <DataTable 
        entityName="secundarios" 
        searchKey="deviceName" 
        columns={SecondaryColumns} 
        data={data} />

      <ApiList entityName="secundarios" entityIdName="secundarioId" type="admin" />
    </>
  );
};

export default SecondaryData;