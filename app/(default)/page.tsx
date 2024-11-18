"use client";

import { useEffect } from "react";
import toast from "react-hot-toast";

import ColumnChart from "@/components/charts/ColumnChart";
import BarChart from "@/components/charts/BarChart";

import db from "@/lib/db";

const HomePage = async() => {
  useEffect(() => toast.remove(), []);

  return (
  <div className="flex flex-col">

    {/* <div className="flex flex-row">
    </div>
    */}

    <div className="flex-1 p-2">
      <ColumnChart className="" />
    </div> 

    <div className="flex-1 p-2">
      <BarChart 
        cardTitle="Uva"
        chartData={['']}
        className=""
      />
    </div> 

  </div>
  );
};

export default HomePage;