const express = require('express')
const User = require('../models/User')

const getAllUsers = async (req, res) => {
    try {
        const users = await User.find();
        res.status(200).json(users);
    } catch (err) {
        res.status(500).json({ message: `Error getting users ` });
    }
};

const getUserByEmail = async (req, res) => {
    const email = req.params.email;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json({ message: 'Error getting user' });
    }
};

const updateUser = async (req, res) => {
    const userId = req.params._id;
    const userData = req.body;

    try {
        // Find the user by their ID and update their information.
        const updatedUser = await User.findByIdAndUpdate(userId, userData, { new: true });

        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json(updatedUser);
    } catch (err) {
        res.status(500).json({ message: 'Error updating user' });
    }
}

const deleteUser = async (req, res) => {
    const userId = req.params._id;

    try {
        // Find the user by their ID and delete them.
        const deletedUser = await User.findByIdAndDelete(userId);

        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.status(200).json({ message: 'User deleted successfully' });
    } catch (err) {
        res.status(500).json({ message: 'Error deleting user' });
    }
};

module.exports = {
    getAllUsers,
    getUserByEmail,
    updateUser,
    deleteUser,
}