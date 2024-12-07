import { GeneralColumnsProps, GeneralColumns } from "./GeneralColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface GeneralDataProps { data: GeneralColumnsProps[] };

const GeneralData: React.FC<GeneralDataProps> = ({ data }) => {
  return (
    <>
      <DataTable 
        entityName="primarios" 
        searchKey="deviceName" 
        columns={GeneralColumns} 
        data={data} />

      <ApiList entityName="primarios" entityIdName="primarioId" type="admin" />
    </>
  );
};

export default GeneralData;