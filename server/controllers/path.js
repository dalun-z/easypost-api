const express = require('express')
const Path = require('../models/Path')
const { StatusCodes } = require('http-status-codes')

const addNewPath = async (req, res) => {
    try {
        const path = await Path.create({ ...req.body });
        res.status(StatusCodes.CREATED).json({ path: path });
    } catch (err) {
        console.error('Error during creating path:', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Path creation failed' });
    }
}

const searchPath = async (req, res) => {
    const searchQuery = req.params.query;
    try {
        const paths = await Path.find({
            $or: [
                { 渠道名称: { $regex: searchQuery, $options: 'i' } },
                { CarrierID: { $regex: searchQuery, $options: 'i' } },
                { API_Key: { $regex: searchQuery, $options: 'i' } },
                { Name: { $regex: searchQuery, $options: 'i' } },
            ]
        });
        res.status(200).json(paths);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}

const updatePath = async (req, res) => {
    const pathID = req.params._id;
    const pathData = req.body;

    try {
        const updatedPath = await Path.findByIdAndUpdate(pathID, pathData, { new: true });

        if (!updatedPath) {
            return res.status(404).json({ message: 'Path not found ' });
        }
        console.log(updatedPath);
        res.status(200).json(updatedPath);
    } catch (err) {
        res.status(500).json({ message: 'Error updating path' });
    }
}

const deletePath = async (req, res) => {
    const pathID = req.params._id;

    try {
        const deletedPath = await Path.findByIdAndDelete(pathID);

        if (!deletedPath) {
            return res.status(404).json({ message: 'Path not found' });
        }
        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
}

const getAllPath = async (req, res) => {
    try {
        const currentPage = parseInt(req.query.page) || 1;
        const pageSize = parseInt(req.query.pageSize) || 10;

        const startIndex = (currentPage - 1) * pageSize;
        const endIndex = currentPage * pageSize;

        const paths = await Path.find();
        const pathsOnPage = paths.slice(startIndex, endIndex);

        const totalPaths = paths.length;
        const totalPages = Math.ceil(totalPaths / pageSize);

        res.status(200).json({
            paths: pathsOnPage,
            totalPages: totalPages,
        });
    } catch (err) {
        res.status(500).json({ message: 'Error getting paths' });
    }
}

const getPathByID = async (req, res) => {
    const ID = req.params.ID;

    try {
        const path = await Path.findOne({ ID });
        if (!path) {
            return res.status(404).json({ message: 'Path not found!' });
        }
        res.status(200).json(path);
    } catch (err) {
        res.status(500).json({ message: 'Error getting path!' });
    }
}

module.exports = {
    addNewPath,
    getPathByID,
    getAllPath,
    deletePath,
    updatePath,
    searchPath,
}