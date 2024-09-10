"use client";

import { useTheme } from "@/context/ThemeContext";

const useToastStyle = () => {
  const { theme } = useTheme();

  const toastStyle = {
    style: {
      color: theme === "light" ? "black" : "white",
      border: "1px solid rgb(0 0 0 / 0.1)",
      backgroundColor: theme === "light" ? "white" : "#262626",
    },
  } as const;
  
  return { toastStyle };
};

export default useToastStyle;