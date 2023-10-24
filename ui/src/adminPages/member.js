import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Member.css';

const Member = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [pageSize] = useState(10);

    const startIndex = (currentPage - 1) * pageSize;
    const endIndex = currentPage * pageSize;
    const displayedUsers = users.slice(startIndex, endIndex);
    const totalPages = Math.ceil(users.length / pageSize);

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

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
        const updatedUser = { ...user };

        // Iterate through the editedData and only update non-email and non-id fields
        for (const header in editedData) {
            if (header !== 'email' && header !== '_id') {
                updatedUser[header] = editedData[header];
            }
        }

        // Send a request to update the user's data with editedData
        // You can define this API request on your server
        // After saving, reset the editingUser state
        // You should handle this part according to your API and state management
        setEditingUser(null);
    }

    const handleDelete = (userId) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this user?");

        if (shouldDelete) {
            // Send a request to delete the user by their id
            // You can define this API request on your server
            // After deleting, update the users state to remove the deleted user
            // You should handle this part according to your API and state management
        }

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

            <div className="pagination">
                <span>Page {currentPage} of {totalPages}</span>
                <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                    Previous
                </button>
                <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next
                </button>
            </div>
        </div>
    );
}

export default Member;
