"use client";
import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts"; // using recharts to create the chart
import styles from "./SalesOverYears.module.css";

function SalesOverYears() {
  const [salesData, setSalesData] = useState([]);

  useEffect(() => {
    fetchSalesData();
  }, []);

  const fetchSalesData = async () => {
    try {
      const response = await fetch("/api/statistics/sales-over-years");
      if (response.ok) {
        const data = await response.json();
        setSalesData(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container} id="Sales-Over-Years">
      <h1 className={styles.title}>Sales Over Years</h1>
      <div className={styles.chartContainer}>
        <ResponsiveContainer width="100%" height={400}>
          <LineChart
            data={salesData}
            margin={{
              top: 20,
              right: 30,
              left: 20,
              bottom: 5,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#808080" />
            <XAxis dataKey="year" stroke="#808080" />
            <YAxis
              label={{
                value: "Products Sold",
                angle: -90,
                position: "insideLeft",
                stroke: "#808080",
              }}
              stroke="#808080"
            />
            <Tooltip labelStyle={{ color: "#808080" }} />
            <Legend wrapperStyle={{ color: "#808080" }} />
            <Line
              type="monotone"
              dataKey="totalQuantity"
              stroke="#808080"
              strokeWidth={2}
              dot={{ stroke: "#808080", strokeWidth: 2 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}

export default SalesOverYears;