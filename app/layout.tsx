import type { Metadata } from "next";
import { Roboto } from "next/font/google";

import ContextProvider from "@/providers/ContextProvider";

import "@/app/globals.css";

export const metadata: Metadata = {
  title: "Visualização Dados Sensor",
  description: "Visualização Dados Sensor",
};

const font = Roboto({ 
  subsets: ["latin"], 
  display: "swap",
  weight: ["300", "400", "500", "700"] 
});

const RootLayout = (
  { children }: Readonly<{ children: React.ReactNode }>
) => {
  return (
    <html lang="pt-BR">
      <body className={font.className} suppressHydrationWarning={true}>
        <ContextProvider>
          <div className="flex relative">
            {children}
          </div>
        </ContextProvider>
      </body>
    </html>
  );
};

export default RootLayout;