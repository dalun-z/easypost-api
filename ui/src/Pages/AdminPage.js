import React, { useState } from "react";
import Layout from "../Layout/Sidebar";
import { Sidebar, Menu, MenuItem } from 'react-pro-sidebar';

import Member from "../adminPages/member";
import Order from "../adminPages/order"
import Path from "../adminPages/path";
import MemberForm from "../Forms/PathForm";
import TransactionForm from "../Forms/TranscationForm";


const AdminPage = () => {
    const [content, setContent] = useState('Member');

    const contentMap = {
        Member: <Member />,
        Order: <Order />,
        Path: <Path />,
        MemberForm: <MemberForm />,
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
                        <MenuItem onClick={() => handleContentChange('MemberForm')}>渠道注冊表格</MenuItem>
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