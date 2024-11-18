import db from "@/lib/db";

import GeneralForm from "@/components/forms/GeneralForm";

const EditGeneralPage = async ({ params }: { params: { generalId: string } }) => {
  const general = await db.nit2xli.findUnique({ where: { deduplicationId: params.generalId } });

  return <GeneralForm initialData={general} />;
};

export default EditGeneralPage;