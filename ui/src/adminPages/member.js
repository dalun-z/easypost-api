import React from "react";
import '../css/Member.css';

const member = () => {
    const data = [
        {
            編號: '1',
            郵箱: 'user1@example.com',
            '全名/公司名': 'John Doe',
            所屬區域: 'Region A',
            餘額: '$200.00',
            'pre-shipment': 2,
            'pre-transit': 1,
            'in-transit': 3,
            'out-for-delivery': 2,
            delivered: 5,
            'available for pickup': 1,
            'return to sender': 0,
            failure: 0,
            cancelled: 1,
            error: 0,
            操作: 'Edit/Delete',
        },
        {
            編號: '2',
            郵箱: 'user2@example.com',
            '全名/公司名': 'Alice Smith',
            所屬區域: 'Region B',
            餘額: '$150.00',
            'pre-shipment': 1,
            'pre-transit': 0,
            'in-transit': 2,
            'out-for-delivery': 1,
            delivered: 3,
            'available for pickup': 0,
            'return to sender': 0,
            failure: 0,
            cancelled: 0,
            error: 1,
            操作: 'Edit/Delete',
        },
        // Add more data objects here as needed
    ];

    const headers = Object.keys(data[0]);

    return (
        <div className="member-container">
            <h1>Member Information</h1>
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

export default member;
