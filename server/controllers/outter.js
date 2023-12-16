const Path = require('../models/Path')
const express = require('express')
const EasyPostClient = require('@easypost/api')

const getPathById = async (req, res) => {
    try {
        const id = req.params._id;

        const path = await Path.findById(id);

        if (!path) {
            return res.status(404).json({ message: 'path not found by id' });
        }

        res.status(200).json({
            ID: path.ID,
            Name: path.渠道名称
        })
    } catch (err) {
        res.status(500).json({ message: 'Error getting path' });
    }
}

const placeShipment = async (req, res) => {
    try {
        /**
         * Request data should include:
         *  1. pathID       // fetch from API
         *  2. remark       // shipment notes
         *  3. parcels      // package info including: length, width, height, weight
         *  4. toname
         *  5. tostreet1
         *  6. tostreet2
         *  7. tocity
         *  8. tostate
         *  9. tozip
         *  10. tocountry
         *  11. tophone
         */
        const {
            pathID,
            remark,
            parcels,
            toname,
            tostreet1,
            tostreet2,
            tocity,
            tostate,
            tozip,
            tocountry,
            tophone,
        } = req.body;

        const path = await Path.findOne({ pathID });

        if (!path) {
            return res.status(404).json({ message: 'path not found by id' });
        }

        const api_key = path.API_Key;
        const client = new EasyPostClient(api_key);

        const from_address = {
            name: path.Name,
            street1: path.Street1,
            street2: path.Street2,
            city: path.City,
            state: path.State,
            zip: path.Zip_Code,
            country: path.Country,
            company: path.company,
            phone: path.Phone,
        }

        const requestData = {
            remark,
            parcels,
        
        }

    } catch (err) {
        res.status(500).json({ message: 'Error placing order' });
    }
}