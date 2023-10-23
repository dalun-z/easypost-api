const express = require('express');
const cors = require('cors');
const app = express();
require('dotenv').config();

app.use(cors());
app.use(express.json());

// connect to DB
const connectDB = require('./db/connect')

const shipmentRouter = require('./routes/shipments')

app.use('/api/v1/', shipmentRouter);

const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });
const start = async () => {
  try {
    await connectDB(process.env.MONGODB_URI)
    app.listen(PORT, () =>
      console.log(`Server is running on port ${PORT}`)
    );
  } catch (err) {
    console.log(err);
  }
};

start();