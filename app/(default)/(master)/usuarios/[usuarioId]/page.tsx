import db from "@/lib/db";

import UserForm from "@/components/forms/UserForm";

const EditUserPage = async ({ params }: { params: { usuarioId: string } }) => {
  const user = await db.user.findUnique({ where: { id: Number(params.usuarioId) } });

  return <UserForm initialData={user} />;
};

export default EditUserPage;