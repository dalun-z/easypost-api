const express = require('express')
const router = express.Router()

const { getAllUsers, getUserByEmail } = require('../controllers/user')

router.get('/getallusers', getAllUsers);
router.get('/getuser/:email', getUserByEmail);

module.exports = router