import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Member.css';

const Member = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/v1/user/getallusers')
            .then((response) => {
                setUsers(response.data);
            })
            .catch((err) => {
                console.error('Error fetching users', err);
            });
    }, []);

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditedData({});
    }
    
    const handleSaveEdit = (user) => {
        // Send a request to update the user's data with editedData
        // You can define this API request on your server
        // After saving, reset the editingUser state
        // You should handle this part according to your API and state management
    }
    
    const handleDelete = (userId) => {
        // Send a request to delete the user by their id
        // You can define this API request on your server
        // After deleting, update the users state to remove the deleted user
        // You should handle this part according to your API and state management
    }

    const headers = users.length > 0 ? Object.keys(users[0]) : [];

    const excludedFields = ['role', 'password', '__v'];

    const filteredHeaders = headers.filter(header => !excludedFields.includes(header));

    return (
        <div className="member-container">
            <h1>Member Information</h1>
            <table>
                <thead>
                    <tr>
                        {filteredHeaders.map((header) => (
                            <th key={header}>{header}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user._id}>
                            {filteredHeaders.map((header) => (
                                <td key={header}>
                                    {editingUser && editingUser._id === user._id ? (
                                        <input
                                            type="text"
                                            value={editedData[header] || user[header]}
                                            onChange={(e) => setEditedData({ ...editedData, [header]: e.target.value })}
                                        />
                                    ) : (
                                        user[header]
                                    )}
                                </td>
                            ))}
                            <td>
                                {editingUser && editingUser._id === user._id ? (
                                    <button onClick={() => handleSaveEdit(user)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(user)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(user._id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Member;
