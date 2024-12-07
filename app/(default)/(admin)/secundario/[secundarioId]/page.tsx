import db from "@/lib/db";

import SecondaryForm from "@/components/forms/SecondaryForm";

const EditSecondaryPage = async ({ params }: { params: { secundarioId: string } }) => {
  const secondary = await db.k72623_lo.findUnique({ where: { deduplicationId: params.secundarioId } });

  return <SecondaryForm initialData={secondary} />;
};

export default EditSecondaryPage;