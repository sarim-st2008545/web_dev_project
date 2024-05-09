"use client";
import React, { useState, useEffect } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import styles from "./AveragePricePerType.module.css";

const AveragePricePerType = () => {
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch("/api/statistics/average-price-per-type");
      if (response.ok) {
        const data = await response.json();
        setChartData(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container} id="Average-Product-Type-Price">
      <h1 className={styles.title}>Average Price Per Product Type</h1>
      <div className={styles.chartContainer}>
        <ResponsiveContainer aspect={2}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#808080" />
            <XAxis dataKey="itemType" stroke="#808080" />
            <YAxis
              label={{
                value: "Average Price",
                angle: -90,
                position: "insideLeft",
                stroke: "#808080",
              }}
              stroke="#808080"
            />
            <Tooltip labelStyle={{ color: "#808080" }} />
            <Legend wrapperStyle={{ color: "#808080" }} />
            <Bar
              dataKey="averagePrice"
              fill="#808080"
              barSize={20}
              radius={5}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default AveragePricePerType;