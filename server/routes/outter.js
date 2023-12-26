const express = require('express')
const router = express.Router()

const { 
    getPathById,
    placeShipment,
    getTrakingInfo,
    getShipmentInfo,
    cancelShipment,
} = require('../controllers/outter')

router.get('/getpathbyid/:_id', getPathById);
router.post('/placeshipment', placeShipment);
router.get('/getshipmentinfo', getShipmentInfo);
router.get('/gettrackinginfo', getTrakingInfo);
router.post('/cancelshipment', cancelShipment)

module.exports = router