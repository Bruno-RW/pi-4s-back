import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Sensor Data Visualization",
  description: "Sensor Data Visualizatio",
};

export default function RootLayout(
  { children }: Readonly<{ children: React.ReactNode }>
) {
  return (
    <html lang="pt-BR">
      <body>
        {children}
      </body>
    </html>
  )
}
