import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import SecondaryData from "@/components/tables/secondary/SecondaryData";
import { SecondaryColumnsProps } from "@/components/tables/secondary/SecondaryColumns";

const SecondaryPage = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const secondary = await db.k72623_lo.findMany({
    where: {
      time: {
        gte: sixMonthsAgo
      }
    },
    orderBy: {
      time: 'desc'
    }
  });

  const formattedSecondary: SecondaryColumnsProps[] = secondary.map(secondary => ({
    deduplicationId: secondary.deduplicationId,
    devEui: secondary.devEui,
    deviceName: secondary.deviceName,

    noise: secondary.noise,
    temperature: secondary.temperature,
    voltage: secondary.voltage,
    humidity: secondary.humidity,
    pm2_5: secondary.pm2_5,

    time: formatDateTime(secondary.time)
  }));

  return <SecondaryData data={formattedSecondary} />;
};

export default SecondaryPage;