"use client";
import React, { useState, useEffect } from "react";
import styles from "./LowInventoryItems.module.css";

const LowInventoryItems = () => {
  const [lowInventoryItems, setLowInventoryItems] = useState([]);

  useEffect(() => {
    fetchLowInventoryItems();
  }, []);

  const fetchLowInventoryItems = async () => {
    try {
      const response = await fetch("/api/statistics/low-inventory-items");
      if (response.ok) {
        const data = await response.json();
        setLowInventoryItems(data);
      } else {
        console.error("Failed to fetch data:", response.status);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  return (
    <div className={styles.container} id="Inventory-Items">
      <h1>Low Inventory Items</h1>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Product Image</th>
            <th>Name</th>
            <th>Seller</th>
            <th>Type</th>
            <th>Quantity</th>
          </tr>
        </thead>
        <tbody>
          {lowInventoryItems.map((item, index) => (
            <tr key={index}>
              <td>
                <img src={item.image} alt={item.name} className={styles.productImage} />
              </td>
              <td>{item.name}</td>
              <td>{item.Seller.username}</td>
              <td>{item.type}</td>
              <td>{item.quantity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default LowInventoryItems;