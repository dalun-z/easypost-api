import React, { useEffect, useState } from "react";
import '../css/Path.css'
import axios from "axios";
import PathForm from '../Forms/PathForm';

const AddPathForm = () => {
    return (
        <div>
            <PathForm />
        </div>
    );
};

const Path = () => {
    const [path, setPath] = useState([]);
    const [editingPath, setEditingPath] = useState(null);
    const [editedData, setEditedData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [pageSize] = useState(10);
    const [searchQuery, setSearchQuery] = useState('');

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const [showAddChannel, setShowAddChannel] = useState(false);
    const toggleAddChannel = () => {
        setShowAddChannel(!showAddChannel);
    };

    useEffect(() => {
        if (searchQuery) {
            axios.get(`http://localhost:4400/api/v1/path/searchpath/${searchQuery}`)
                .then((response) => {
                    const searchResult = response.data;
                    console.log('result is : ', searchResult);

                    if (searchResult === 0) {
                        setPath([]);
                    } else {
                        setPath(searchResult);
                    }
                })
                .catch((err) => {
                    console.error('Error fetch path', err);
                });
        } else {
            axios.get(`http://localhost:4400/api/v1/path/getallpath?page=${currentPage}&pageSize=${pageSize}`)
                .then((response) => {
                    setPath(response.data.paths);
                    setTotalPages(response.data.totalPages);
                })
                .catch((err) => {
                    console.error('Error fetching path data', err);
                });
        }
    }, [searchQuery, currentPage, pageSize]);

    const handleEdit = (path) => {
        setEditingPath(path);
        setEditedData({});
    }

    const handleSaveEdit = (p) => {
        const updatedPath = { ...p };

        for (const header in editedData) {
            updatedPath[header] = editedData[header];
        }

        axios.put(`http://localhost:4400/api/v1/path/updatepath/${p._id}`, updatedPath)
            .then((response) => {
                console.log('Updated path successfully!');

                const updatedPaths = [...path];
                const pathIndex = updatedPaths.findIndex((e) => e._id === p._id)

                if (pathIndex !== -1) {
                    updatedPaths[pathIndex] = updatedPath;
                    setPath(updatedPaths);
                }
            })
            .catch((err) => {
                console.log('Error updating path', err);
            })

        setEditingPath(null);
        setEditedData({});
    }

    const handleDelete = (pathID) => {
        const shouldDelete = window.confirm("Are you sure you want to delete this path?");

        if (shouldDelete) {
            axios.delete(`http://localhost:4400/api/v1/path/deletepath/${pathID}`)
                .then((response) => {
                    console.log('Deleted path!');

                    const updatedPath = path.filter((p) => p._id !== pathID);
                    setPath(updatedPath);
                })
                .catch((err) => {
                    console.log('Error deleting path', err);
                })
        }
    }

    const headers = path.length > 0 ? Object.keys(path[0]) : [];
    const excludedFields = ['_id', '__v'];
    const filteredHeaders = headers.filter(header => !excludedFields.includes(header));

    return (
        <div className="path-container">
            <h1>渠道信息</h1>
            <div className="">
                <button onClick={toggleAddChannel}>
                    {showAddChannel ? '关闭新增渠道' : '新增渠道'}
                </button>
            </div>
            {showAddChannel && <AddPathForm />}

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
                    {path.map((path, index) => (
                        <tr key={path.ID}>
                            {filteredHeaders.map((header) => (
                                <td key={header}>
                                    {(header === 'ID' || header === '签名') ? `${path[header]}` : (
                                        editingPath && editingPath.ID === path.ID ? (
                                            <input
                                                type="text"
                                                value={editedData[header] || path[header]}
                                                onChange={(e) => setEditedData({ ...editedData, [header]: e.target.value })}
                                            />
                                        ) : (
                                            header === '费率' ? `${path[header]} %` : path[header]
                                        )
                                    )}
                                </td>
                            ))}
                            <td>
                                {editingPath && editingPath._id === path._id ? (
                                    <button onClick={() => handleSaveEdit(path)}>Save</button>
                                ) : (
                                    <button onClick={() => handleEdit(path)}>Edit</button>
                                )}
                                <button onClick={() => handleDelete(path._id)}>Delete</button>
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
    )
}

export default Path;