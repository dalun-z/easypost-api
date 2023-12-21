const Path = require('../models/Path')
const { getClientConnection } = require('../global/getClient')

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
            length,
            width,
            height,
            weight,
            toname,
            tostreet1,
            tostreet2,
            tocity,
            tostate,
            tozip,
            tocountry,
            tophone,
        } = req.body;

        const { path, client } = await getClientConnection(pathID);

        const from_address = {
            street1: path.Street1,
            street2: path.Street2,
            city: path.City,
            state: path.State,
            zip: path.Zip_Code,
            country: path.Country,
            company: path.Name,
            phone: path.Phone,
        }

        const to_address = {
            name: toname,
            street1: tostreet1,
            street2: tostreet2,
            city: tocity,
            state: tostate,
            zip: tozip,
            country: tocountry,
            phone: tophone,
        }

        const parcel = {
            length: length,
            width: width,
            height: height,
            weight: weight,
        }

        const requestData = {
            from_address,
            to_address,
            parcel
        }

        const shipment = await client.Shipment.create(requestData);
        const ret_shipment = await client.Shipment.retrieve(shipment.id);

        try {
            const boughtShipment = await client.Shipment.buy(ret_shipment.id, ret_shipment.lowestRate());
            // console.log(boughtShipment);
            const labelUrl = boughtShipment.postage_label.label_url;

            const responseData = {
                shipment_id: boughtShipment.id,
                shipment_price: boughtShipment.selected_rate.rate,
                carrier: boughtShipment.selected_rate.carrier,
                tracking_id: boughtShipment.tracker.id,
                tracking_code: boughtShipment.tracking_code,
                labelUrl: labelUrl,
            }

            res.json(responseData);
        } catch (error) {
            console.error('Error buying shipment: ', error);
            return res.status(422).json({ error: 'No rates found or an error occurred during shipment purchase' });
        }
    } catch (err) {
        console.error('Error: ', err);
        res.status(500).json({ message: 'Error placing order', err });
    }
}

const getShipmentInfo = async (req, res) => {
    try {
        const {
            pathID,
            shipment_id,
        } = req.body;

        const { client } = await getClientConnection(pathID);

        try {
            const shipment = await client.Shipment.retrieve(shipment_id);

            const responseData = {
                shipment_id: shipment.id,
                status: shipment.status,
                tracking_id: shipment.tracker.id,
                tracking_code: shipment.tracking_code,
                carrier: shipment.tracker.carrier,
                parcel: {
                    length: shipment.parcel.length,
                    width: shipment.parcel.width,
                    height: shipment.parcel.height,
                    weight: shipment.parcel.weight
                },
                label: shipment.postage_label.label_url,
            }
            res.json(responseData);
        } catch (err) {
            res.status(500).json({ error });
        }

    } catch (err) {
        res.status(422).json({ err });
    }
}

const getTrakingInfo = async (req, res) => {
    try {
        const {
            pathID,
            tracking_id
        } = req.body;

        const { client } = await getClientConnection(pathID);

        try {
            const tracker = await client.Tracker.retrieve(tracking_id);

            const trackingDetails = tracker.tracking_details.map(detail => ({
                message: detail.message,
                status: detail.status,
                datetime: detail.datetime,
            }));

            const responseData = {
                status: tracker.status,
                est_delivery_date: tracker.est_delivery_date,
                trackingDetails: trackingDetails,
            }
            res.status(200).json(responseData);
        } catch (err) {
            res.status(500).json({ err: 'Error retrieve tracking id' });
        }
    } catch (err) {
        console.error('Error fetching tracking info ', err);
        res.status(422).json({ err });
    }
}

const cancelShipment = async (req, res) => {
    try {
        const {
            pathID,
            tracking_codes
        } = req.body;

        const { client } = await getClientConnection(pathID);

        const cancelShipment = await client.Refund.create({
            carrier: 'USPS',
            tracking_codes: tracking_codes,
        });

        res.status(200).json(cancelShipment);
    } catch (err) {
        res.status(422).json({ err });
    }
}

module.exports = {
    getPathById,
    placeShipment,
    getShipmentInfo,
    getTrakingInfo,
    cancelShipment,
}