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

const getAllPath = async (req, res) => {
    try {
        const paths = await Path.find();
        res.status(200).json({
            paths: paths,
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
}