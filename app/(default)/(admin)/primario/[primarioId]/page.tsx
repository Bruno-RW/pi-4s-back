import db from "@/lib/db";

import GeneralForm from "@/components/forms/GeneralForm";

const EditGeneralPage = async ({ params }: { params: { primarioId: string } }) => {
  const general = await db.nit2xli.findUnique({ where: { deduplicationId: params.primarioId } });

  return <GeneralForm initialData={general} />;
};

export default EditGeneralPage;