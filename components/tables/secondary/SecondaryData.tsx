import { SecondaryColumnsProps, SecondaryColumns } from "./SecondaryColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface SecondaryDataProps { data: SecondaryColumnsProps[] };

const SecondaryData: React.FC<SecondaryDataProps> = ({ data }) => {
  return (
    <>
      <DataTable 
        entityName="secondary" 
        searchKey="deviceName" 
        columns={SecondaryColumns} 
        data={data} />

      <ApiList entityName="secondary" entityIdName="secondaryId" type="admin" />
    </>
  );
};

export default SecondaryData;