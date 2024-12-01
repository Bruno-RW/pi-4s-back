//? Home/dashboard
import { VscGraph } from "react-icons/vsc"; // import { HiOutlineHome } from "react-icons/hi";

//? Source table
import { MdOutlineGraphicEq } from "react-icons/md";

//? Tables
// import { LuCloudRainWind } from "react-icons/lu";
// import { LuWind } from "react-icons/lu";
// import { LuThermometerSun } from "react-icons/lu"; // import { BsThermometerHalf } from "react-icons/bs";
// import { LuSun } from "react-icons/lu";
// import { SiRainmeter } from "react-icons/si"; // import { WiHumidity } from "react-icons/wi";
// import { TbGauge } from "react-icons/tb"; // import { MdAtm } from "react-icons/md";

//? Other options
import { LiaUserShieldSolid } from "react-icons/lia"; // import { LuUser2 } from "react-icons/lu";
import { LuSettings } from "react-icons/lu"; // import { PiGearSix } from "react-icons/pi";
import { FiLogOut } from "react-icons/fi";


export const navbarInfo = [
  {
    label: "Dashboard",
    url: "/",
    type: "A",
    icon: VscGraph,
  },

  {
    label: "General",
    url: "/general",
    type: "A",
    icon: MdOutlineGraphicEq,
  },
  // {
  //   label: "Rain",
  //   url: "/rain",
  //   type: "A",
  //   icon: LuCloudRainWind,
  // },
  // {
  //   label: "Wind",
  //   url: "/wind",
  //   type: "A",
  //   icon: LuWind,
  // },
  // {
  //   label: "Temperature",
  //   url: "/temperature",
  //   type: "A",
  //   icon: LuThermometerSun,
  // },
  // {
  //   label: "Light",
  //   url: "/light",
  //   type: "A",
  //   icon: LuSun,
  // },
  // {
  //   label: "Humidity",
  //   url: "/humidity",
  //   type: "A",
  //   icon: SiRainmeter,
  // },
  // {
  //   label: "Pressure",
  //   url: "/pressure",
  //   type: "A",
  //   icon: TbGauge,
  // },

  {
    label: "Users",
    url: "/users",
    type: "M",
    icon: LiaUserShieldSolid,
  },
  {
    label: "Settings",
    url: "/settings",
    type: "A",
    icon: LuSettings,
  },
  {
    label: "Log Out",
    url: "#",
    type: "A",
    icon: FiLogOut,
    signOut: true,
  },
] as const;