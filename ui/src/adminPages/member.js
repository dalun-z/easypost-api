import React, { useEffect, useState } from "react";
import axios from 'axios';
import '../css/Member.css';

const Member = () => {
    const [users, setUsers] = useState([]);
    const [editingUser, setEditingUser] = useState(null);
    const [editedData, setEditedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    useEffect(() => {
        if (searchQuery) {
            // axios.get(`http://20.3.232.49:4400/api/v1/user/searchuser/${searchQuery}`)
            axios.get(`http://localhost:4400/api/v1/user/searchuser/${searchQuery}`)
                .then((response) => {
                    const searchResult = response.data;
                    console.log('result is : ' + searchResult);

                    if (searchResult === 0) {
                        setUsers([]);
                    } else {
                        setUsers(searchResult);
                    }
                })
                .catch((err) => {
                    console.error('Error fetching users', err);
                });
        } else {
            // Make an API request to get all users
            // axios.get(`http://20.3.232.49:4400/api/v1/user/getallusers?page=${currentPage}&pageSize=${pageSize}`)
            axios.get(`http://localhost:4400/api/v1/user/getallusers?page=${currentPage}&pageSize=${pageSize}`)
                .then((response) => {
                    setUsers(response.data.users);
                    setTotalPages(response.data.totalPage);
                })
                .catch((err) => {
                    console.error('Error fetching users', err);
                });
        }
    }, [searchQuery, currentPage, pageSize]);

    const handleEdit = (user) => {
        setEditingUser(user);
        setEditedData({});
    }

    const handleSaveEdit = (user) => {
        const updatedUser = { ...user };

        // Merge changes from editedData into updatedUser
        for (const header in editedData) {
            updatedUser[header] = editedData[header];
        }

        // axios.put(`http://20.3.232.49:4400/api/v1/user/updateuser/${user._id}`, updatedUser)
        axios.put(`http://localhost:4400/api/v1/user/updateuser/${user._id}`, updatedUser)
            .then((response) => {
                console.log('Updated user successfully!');

                const updatedUsers = [...users];
                const userIndex = updatedUsers.findIndex((u) => u._id === user._id);

                if (userIndex !== -1) {
                    updatedUsers[userIndex] = updatedUser;
                    setUsers(updatedUsers);
                }
            })
            .catch((err) => {
                console.log('Error updating user', err);
            })

        setEditingUser(null);
        setEditedData({});
    }

    const handleDelete = (userId) => {
        // console.log(userId);
        const shouldDelete = window.confirm("Are you sure you want to delete this user?");

        if (shouldDelete) {
            // axios.delete(`http://20.3.232.49:4400/api/v1/user/deleteuser/${userId}`)
            axios.delete(`http://localhost:4400/api/v1/user/deleteuser/${userId}`)
                .then((response) => {
                    console.log('Deleted user!');

                    // After successful deletion, update the users state.
                    const updatedUsers = users.filter((user) => user._id !== userId);
                    setUsers(updatedUsers);
                })
                .catch((err) => {
                    console.log('Error deleting user', err);
                })
        }
    }

    const headers = users.length > 0 ? Object.keys(users[0]) : [];
    const excludedFields = ['role', 'password', '__v'];
    const filteredHeaders = headers.filter(header => !excludedFields.includes(header));

    return (
        <div className="member-container">
            <h1>Member Information</h1>

            <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search..."
            />

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
                                    {/* the below line of code block editing on `_id` field */}
                                    {header === '_id' ? `${user[header]}` : (
                                        editingUser && editingUser._id === user._id ? (
                                            <input
                                                type="text"
                                                value={editedData[header] || user[header]}
                                                onChange={(e) => setEditedData({ ...editedData, [header]: e.target.value })}
                                            />
                                        ) : (
                                            header === 'balance' ? `$ ${user[header]}` : user[header]
                                        )
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
        </div >
    );
}

export default Member;
