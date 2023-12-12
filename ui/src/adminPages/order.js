import React, { useState } from "react";
import '../css/Order.css'
import axios from "axios";

const Order = () => {
    const data = [
        {
            ID: '1',
            用戶名: 'User 1',
            包裹數量: 3,
            'Ship Date': '2023-09-15',
            費用: '$50.00',
            餘額: '$100.00',
            Recipient: 'Recipient 1',
            Dimension: '12x8x6',
            Weight: '2.5 lbs',
            Zone: 'Zone A',
            Service: 'Express',
            'Order Date': '2023-09-10',
            狀態: 'Delivered',
            操作: 'Edit/Delete',
        },
        {
            ID: '2',
            用戶名: 'User 2',
            包裹數量: 2,
            'Ship Date': '2023-09-14',
            費用: '$35.00',
            餘額: '$75.00',
            Recipient: 'Recipient 2',
            Dimension: '10x6x5',
            Weight: '1.8 lbs',
            Zone: 'Zone B',
            Service: 'Standard',
            'Order Date': '2023-09-09',
            狀態: 'In Transit',
            操作: 'Edit/Delete',
        },
        // Add more data objects here as needed
    ];

    const headers = Object.keys(data[0]);

    return (
        <div className="order-container">
            <h1>订单管理</h1>
            <table>
                <thead>
                    <tr>
                        {headers.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            {headers.map((header) => (
                                <td key={header}>{item[header]}</td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
}

export default Order;
