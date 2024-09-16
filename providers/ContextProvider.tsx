"use client";

import { NextUIProvider } from "@nextui-org/system";

// import { SessionProvider } from "next-auth/react";
import { Toaster } from "react-hot-toast";

import NavbarContextProvider from "@/context/NavbarContext";
import ThemeContextProvider from "@/context/ThemeContext";

const ContextProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    // <SessionProvider>
      <NextUIProvider>
        <ThemeContextProvider>
            <NavbarContextProvider>
              <Toaster position="top-center" toastOptions={{duration: 3000}} />
              {children}
            </NavbarContextProvider>
        </ThemeContextProvider>
      </NextUIProvider>
    // </SessionProvider>
  )
};

export default ContextProvider;