const express = require('express')
const router = express.Router()

const { getAllUsers, getUserByEmail, updateUser, deleteUser } = require('../controllers/user')

router.get('/getallusers', getAllUsers);
router.get('/getuser/:email', getUserByEmail);
router.put('/updateuser/:_id', updateUser);
router.delete('/deleteuser/:_id', deleteUser);

module.exports = router