"use client";

import { useState, createContext, useContext } from "react";

type NavbarContextType = {
  isActive: boolean;
  toggleActive: () => void;
};

const NavbarContext = createContext<NavbarContextType | null>(null);

export default function NavbarContextProvider(
  { children }: { children: React.ReactNode }
) {
  const [isActive, setIsActive] = useState(false);

  const toggleActive = () => setIsActive(!isActive);

  return (
    <NavbarContext.Provider value={{ isActive, toggleActive }}>
      {children}
    </NavbarContext.Provider>
  );
}

export function useNavbar() {
  const context = useContext(NavbarContext);

  if (context === null) {
    throw new Error("useNavbar must be used within a NavbarContextProvider");
  }

  return context;
}