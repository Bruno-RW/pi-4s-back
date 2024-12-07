import { UsersColumnsProps, UsersColumns } from "./UsersColumns";

import DataTable from "@/components/tables/DataTable";
import ApiList from "@/components/ui/custom/ApiList";

interface UsersDataProps { data: UsersColumnsProps[] };

const UsersData: React.FC<UsersDataProps> = ({ data }) => {
  return (
    <>
      <DataTable entityName="usuarios" searchKey="name" columns={UsersColumns} data={data} />

      <ApiList entityName="usuarios" entityIdName="usuarioId" type="master" />
    </>
  );
};

export default UsersData;