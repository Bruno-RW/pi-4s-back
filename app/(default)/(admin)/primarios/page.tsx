import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import GeneralData from "@/components/tables/general/GeneralData";
import { GeneralColumnsProps } from "@/components/tables/general/GeneralColumns";

export const dynamic = 'force-dynamic';

const GeneralPage = async () => {
  const sixMonthsAgo = new Date();
  sixMonthsAgo.setMonth(sixMonthsAgo.getMonth() - 6);

  const general = await db.nit2xli.findMany({
    where: {
      time: {
        gte: sixMonthsAgo
      }
    },
    orderBy: {
      time: 'desc'
    }
  });

  const formattedGeneral: GeneralColumnsProps[] = general.map(general => ({
    deduplicationId: general.deduplicationId,
    devEui: general.devEui,
    deviceName: general.deviceName,

    emw_rain_lvl: general.emw_rain_lvl,
    emw_avg_wind_speed: general.emw_avg_wind_speed,
    emw_gust_wind_speed: general.emw_gust_wind_speed,
    emw_wind_direction: general.emw_wind_direction,

    emw_temperature: general.emw_temperature,
    emw_humidity: general.emw_humidity,
    emw_luminosity: general.emw_luminosity,
    emw_uv: general.emw_uv,
    emw_solar_radiation: general.emw_solar_radiation,
    emw_atm_pres: general.emw_atm_pres,

    internal_temperature: general.internal_temperature,
    internal_humidity: general.internal_humidity,

    time: formatDateTime(general.time, true, {hour: "2-digit", minute: "2-digit", hour12: false})
  }));

  return <GeneralData data={formattedGeneral} />;
};

export default GeneralPage;