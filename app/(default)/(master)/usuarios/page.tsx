import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import UsersData from "@/components/tables/users/UsersData";
import { UsersColumnsProps } from "@/components/tables/users/UsersColumns";

const UsersPage = async () => {
  const users = await db.user.findMany();

  const formattedUsers: UsersColumnsProps[] = users.map(user => ({
    id: user.id,
    name: user.name,
    email: user.email,
    type: user.type,
    createdAt: formatDateTime(user.createdAt),
    updatedAt: formatDateTime(user.updatedAt)
  }));

  return <UsersData data={formattedUsers} />;
};

export default UsersPage;