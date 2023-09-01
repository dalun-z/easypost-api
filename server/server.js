const express = require('express');
const EasyPostClient = require('@easypost/api');
const cors = require('cors');
const app = express();
require('dotenv').config();

const client = new EasyPostClient(process.env.EASYPOST_API_KEY);
app.use(cors());
app.use(express.json());

app.post('/api/createShipment', async (req, res) => {
  try {
    const shipment = await client.Shipment.create(req.body);
    // shipment = await client.Shipment.retrieve('shp_...');
    // const shipmentWithLabel = await client.Shipment.convertLabelFormat(shipment.id, 'ZPL');
    res.json(shipment);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'An error occurred while creating the shipment.' });
  }
});

app.get('/api/shipments/:id/label', async (req, res) => {
  const { id } = req.params;

  try {
    const shipment = await client.Shipment.retrieve(id);

    try {
      const boughtShipment = await client.Shipment.buy(shipment.id, shipment.lowestRate(), 249.99);
    } catch (buyError) {
      console.error('Error buying shipment:', buyError);
      return res.status(422).json({ error: 'No rates found or error occurred during shipment purchase' });
    }

  } catch (error) {
    console.error('Error fetching label:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});