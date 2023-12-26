const { StatusCodes } = require('http-status-codes')
const Path = require('../models/Path')
const { getClientConnection } = require('../global/getClient')

const createOrder = async (req, res) => {
    try {
        const {
            pathID,
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

        const { path, client } = await getClientConnection(pathID);

        const from_address = {
            verify: true,
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
            verify: true,
            name: toname,
            street1: tostreet1,
            street2: tostreet2,
            city: tocity,
            state: tostate,
            zip: tozip,
            country: tocountry,
            phone: tophone,
        }

        const parcelData = parcels.map((parcel) => ({
            ["parcel"]: {
                predefined_package: parcel.predefined_package,
                // length: parcel.length,
                // width: parcel.width,
                // height: parcel.height,
                weight: parcel.weight,
            },
        }));

        const requestData = {
            carrier_accounts: path.CarrierID,
            service: path.Carrier_Service,
            to_address,
            from_address,
            shipments: parcelData,
        }

        const order = await client.Order.create(requestData);
        res.json(order);
    } catch (err) {
        console.error('Error during creating order', err);
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: 'Creating order failed' });
    }
}

module.exports = {
    createOrder,
}