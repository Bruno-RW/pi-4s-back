import db from "@/lib/db";
import { formatDateTime } from "@/lib/utils";

import GeneralData from "@/components/tables/general/GeneralData";
import { GeneralColumnsProps } from "@/components/tables/general/GeneralColumns";

const GeneralPage = async () => {
  const general = await db.nit2xli.findMany({
    orderBy: {
      time: 'desc'
    }
  });

  const formattedGeneral: GeneralColumnsProps[] = general.map(general => ({
    deduplicationId: general.deduplicationId,
    devEui: general.devEui,
    deviceName: general.deviceName,

    emwRainLvl: general.emw_rain_lvl,
    emwAvgWindSpeed: general.emw_avg_wind_speed,
    emwGustWindSpeed: general.emw_gust_wind_speed,
    emwWindDirection: general.emw_wind_direction,

    emwTemperature: general.emw_temperature,
    emwHumidity: general.emw_humidity,
    emwLuminosity: general.emw_luminosity,
    emwUv: general.emw_uv,
    emwSolarRadiation: general.emw_solar_radiation,
    emwAtmPres: general.emw_atm_pres,

    internalTemperature: general.internal_temperature,
    internalHumidity: general.internal_humidity,

    time: formatDateTime(general.time)
  }));

  return <GeneralData data={formattedGeneral} />;
}

export default GeneralPage;