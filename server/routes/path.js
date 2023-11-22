const express = require('express')
const router = express.Router()

const { addNewPath, getAllPath, getPathByID } = require('../controllers/path')

router.post('/addnewpath', addNewPath);
router.get('/getallpath', getAllPath);
router.get('/getpathbyid/:_id', getPathByID);

module.exports = router
