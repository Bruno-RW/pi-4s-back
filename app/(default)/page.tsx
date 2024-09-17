"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

const HomePage = () => {
  useEffect(() => toast.remove(), []);

  return (
    <div className="flex flex-col">
      Dashboard page
    </div>
  );
};

export default HomePage;