import db from "@/lib/db";

import SecondaryForm from "@/components/forms/SecondaryForm";

const EditSecondaryPage = async ({ params }: { params: { secondaryId: string } }) => {
  const secondary = await db.k72623_lo.findUnique({ where: { deduplicationId: params.secondaryId } });

  return <SecondaryForm initialData={secondary} />;
};

export default EditSecondaryPage;