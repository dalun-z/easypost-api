const express = require('express')
const router = express.Router()

const { addNewPath, getAllPath, getPathByID, updatePath, deletePath, searchPath } = require('../controllers/path')

router.post('/addnewpath', addNewPath);
router.get('/getallpath', getAllPath);
router.get('/getpathbyid/:ID', getPathByID);
router.put('/updatepath/:_id', updatePath);
router.get('/searchpath/:query', searchPath);
router.delete('/deletepath/:_id', deletePath);

module.exports = router
