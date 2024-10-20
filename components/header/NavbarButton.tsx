"use client";

import { BiArrowToLeft, BiArrowFromLeft } from "react-icons/bi";

import { useNavbar } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

interface NavbarButtonProps { className?: string };

const NavbarButton: React.FC<NavbarButtonProps> = ({ className }) => {
  const { isActive, toggleActive } = useNavbar();

  return (
    <button 
      className={cn(
        "bg-border bg-border-shadow text-center align-middle h-10 p-2 border rounded-full transition-all hover:scale-110 focus:scale-110 active:scale-100", className
      )}
      aria-label="Toggle navbar" 
      onClick={() => toggleActive()}
    >
      {isActive ? <BiArrowFromLeft size={25} /> : <BiArrowToLeft size={25} />}
    </button>
  )
};

export default NavbarButton;