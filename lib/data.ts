import { HiOutlineHome } from "react-icons/hi";
import { BsDiagram3 } from "react-icons/bs";
import { AiOutlineTags } from "react-icons/ai";
import { LiaUserShieldSolid } from "react-icons/lia";
import { PiGearSix } from "react-icons/pi";
import { FiUsers, FiLogOut } from "react-icons/fi";

export const navbarInfo = [
  {
    label: "Dashboard",
    url: "/",
    type: "A",
    icon: HiOutlineHome,
  },
  {
    label: "Heat",
    url: "/heat",
    type: "A",
    icon: BsDiagram3,
  },
  {
    label: "Gas",
    url: "/gas",
    type: "A",
    icon: AiOutlineTags,
  },
  {
    label: "Movement",
    url: "/movement",
    type: "M",
    icon: FiUsers,
  },
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
    icon: PiGearSix,
  },
  {
    label: "Log Out",
    url: "#",
    type: "A",
    icon: FiLogOut,
    signOut: true,
  },
] as const;