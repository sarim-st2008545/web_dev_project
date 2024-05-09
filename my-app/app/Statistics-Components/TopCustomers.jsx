"use client"
import React, { useState, useEffect } from "react";
import styles from "./TopCustomers.module.css";

function TopCustomers() {
  const [topCustomers, setTopCustomers] = useState([]);

  useEffect(() => {
    async function fetchTopCustomers() {
      try {
        const response = await fetch("/api/statistics/top-customers");
        if (response.ok) {
          const data = await response.json();
          setTopCustomers(data);
        } else {
          console.error("Failed to fetch data:", response.status);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchTopCustomers();
  }, []);

  return (
    <div className={styles.container} id="Top-Customers">
      <h1>Customers with Most Purchases</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Customer ID</th>
            <th>Customer Name</th>
            <th>Balance</th>
            <th>Number of Purchases</th>
          </tr>
        </thead>
        <tbody>
          {topCustomers.map((customer, index) => (
            <tr key={index}>
              <td>{customer.id}</td>
              <td>{customer.name}</td>
              <td>{customer.money_balance}</td>
              <td>{customer.purchaseCount}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default TopCustomers;
