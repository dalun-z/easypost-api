import React, { useState } from "react";
import Layout from "../Layout/Sidebar";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import Member from "../adminPages/member";
import Order from "../adminPages/order"
import Path from "../adminPages/path";
import TransactionForm from "../TranscationForm";


const AdminPage = () => {
    const [content, setContent] = useState('');

    const contentMap = {
        Member: <Member />,
        Order: <Order />,
        Path: <Path />,
        TransactionForm: <TransactionForm />,
    }

    const handleContentChange = ct => {
        setContent(ct)
    }

    var bgColor = '#9c9e9e'

    const commonItemStyles = {
        backgroundColor: bgColor,
        button: {
            '&:hover': {
                backgroundColor: '#9c9e9e',
                color: 'brown',
                transition: 'background-color 0.4s ease',
            },
        },
    };

    return (
        <Layout
            sidebar={
                <Sidebar>
                    <Menu menuItemStyles={commonItemStyles} rootStyles={{ backgroundColor: "white", height: 'auto', paddingTop: '15px', paddingLeft: '10px' }}>
                        <MenuItem onClick={() => handleContentChange('Member')}>會員管理</MenuItem>
                        <MenuItem onClick={() => handleContentChange('Order')}>訂單管理</MenuItem>
                        <MenuItem onClick={() => handleContentChange('Path')}>渠道管理</MenuItem>
                        <MenuItem onClick={() => handleContentChange('TransactionForm')}>EasyPost表格</MenuItem>
                    </Menu>
                </Sidebar>
            }
            mainContent={
                contentMap[content]
            }
        />

    );
}

export default AdminPage;