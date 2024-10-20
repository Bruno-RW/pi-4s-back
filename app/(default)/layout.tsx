"use client";

import { useNavbar } from "@/context/NavbarContext";
import { cn } from "@/lib/utils";

import Header from "@/components/header/Header";
import Navbar from "@/components/navbar/Navbar";

const DefaultLayout = ({ children }: { children: React.ReactNode }) => {
  const { isActive } = useNavbar();
  
  return (
    <>
      <Navbar isActive={isActive} />
      <main className={cn(
        // transition-color-none
        "flex flex-col gap-y-3 py-2 pl-[272px] pr-3 w-full h-[200%] transition-all bg-gray-50 dark:bg-neutral-900 ", 
        isActive && "pl-[72px]"
        )}
      >
        <Header isActive={isActive} />
        <div className="flex flex-col gap-y-10 mx-2 md:mx-5">
          {children}
        </div>
      </main>
    </>
  );
};

export default DefaultLayout;