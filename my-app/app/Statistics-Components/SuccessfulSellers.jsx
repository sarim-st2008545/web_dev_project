"use client"

import React, { useEffect, useState } from 'react';
import styles from './SuccessfulSellers.module.css';

function SuccessfulSellers() {
    const [successfulSellers, setSuccessfulSellers] = useState([]);

    useEffect(() => {
        fetchSuccessfulSellers();
    }, []);

    const fetchSuccessfulSellers = async () => {
        try {
            const response = await fetch('/api/statistics/most-successful-sellers');
            if (response.ok) {
                const data = await response.json();
                setSuccessfulSellers(data); // change state
            } else {
                console.error('Failed to fetch data:', response.status);
            }
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    return (
        <div className={styles.container} id="Successful-Sellers">
            <h1>Most Successful Sellers</h1>
            <table className={styles.table}>
                <thead>
                    <tr>
                        <th>Seller Name</th>
                        <th># Items</th>
                        <th>Money Made</th>
                    </tr>
                </thead>
                <tbody>
                    {successfulSellers.map((seller, index) => (
                        <tr key={index}>
                            <td>{seller.username}</td>
                            <td>{seller.itemsUploaded}</td>
                            <td className={styles.money}>${seller.moneyMade}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default SuccessfulSellers;
