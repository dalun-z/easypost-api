import React from "react";
import { Link } from "react-router-dom";
import '../css/Path.css'

const path = () => {
    const data = [
        {
            ID: '1',
            渠道名称: 'Channel 1',
            费率名称: 'Rate 1',
            渠道状态: 'Active',
            'Api ID': '12345',
            'Api Key': 'API Key 1',
            服务商: 'Provider 1',
            服务方式: 'Method 1',
            签名方式: 'Signature 1',
            操作: 'Edit/Delete',
        },
        {
            ID: '2',
            渠道名称: 'Channel 2',
            费率名称: 'Rate 2',
            渠道状态: 'Inactive',
            'Api ID': '67890',
            'Api Key': 'API Key 2',
            服务商: 'Provider 2',
            服务方式: 'Method 2',
            签名方式: 'Signature 2',
            操作: 'Edit/Delete',
        },
        {
            ID: '3',
            渠道名称: 'Channel 3',
            费率名称: 'Rate 3',
            渠道状态: 'Active',
            'Api ID': '54321',
            'Api Key': 'API Key 3',
            服务商: 'Provider 3',
            服务方式: 'Method 3',
            签名方式: 'Signature 3',
            操作: 'Edit/Delete',
        },
        {
            ID: '4',
            渠道名称: 'Channel 4',
            费率名称: 'Rate 4',
            渠道状态: 'Inactive',
            'Api ID': '98765',
            'Api Key': 'API Key 4',
            服务商: 'Provider 4',
            服务方式: 'Method 4',
            签名方式: 'Signature 4',
            操作: 'Edit/Delete',
        },
        // Add more data objects here as needed
    ];

    const headers = Object.keys(data[0]);

    return (
        <div className="path-container">
            <h1>渠道信息</h1>
            <div className="addPath"><Link to='/addPath' style={{color:'white', fontSize:'20pt'}}>新增渠道</Link></div>
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
    )
}

export default path;