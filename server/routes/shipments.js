const express = require('express');
const router = express.Router();
const EasyPostClient = require('@easypost/api');

// Initialize EasyPost client
const client = new EasyPostClient(process.env.EASYPOST_API_KEY);

// Define the '/api/v1/createShipment' route
router.post('/createShipment', async (req, res) => {
    try {
        const shipment = await client.Shipment.create(req.body);
        res.json(shipment);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while creating the shipment.' });
    }
});

// get all shipment under the API_KEY
router.get('/shipments', async (req, res) => {
    try {
        const shipments = await client.Shipment.all({
            page_size: 5,
        });
        res.json(shipments);
    } catch (error) {
        console.error('Error:', error);
        res.status(500).json({ error: 'An error occurred while fetching the shipments.' });
    }
})

// Define the '/api/v1/shipments/:id/label' route
router.get('/shipments/:id/label', async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(404).json({ error: 'no id' });
    }
    console.log(id);

    try {
        const shipment = await client.Shipment.retrieve(id);

        if (!shipment) {
            return res.status(404).json({ error: 'shipment not found' });
        }

        try {
            const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate());
            console.log(boughtShipment)
            const labelUrl = boughtShipment.postage_label.label_url;
            res.json({ labelUrl });
        } catch (buyError) {
            console.error('Error buying shipment:', buyError);
            return res.status(422).json({ error: 'No rates found or an error occurred during shipment purchase' });
        }
    } catch (error) {
        console.error('Error fetching label:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.get('/getImage/:url', async (req, res) => {
    try {
        const { imageURL } = req.params;
        console.log(imageURL);

        req.pipe(request(imageURL)).pipe(res);
    } catch (error) {
        console.error('Error fetch the image url: ', error);
        res.status(500).json({ error: 'Internal server error' });
    }
})

module.exports = router;
