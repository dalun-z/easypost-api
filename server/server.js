const express = require('express')
const cors = require('cors')
const app = express()
require('dotenv').config()

app.use(cors())
app.use(express.json())

// connect to DB
const connectDB = require('./db/connect')

// routers
const authRouter = require('./routes/auth')
const userRouter = require('./routes/user')
const shipmentRouter = require('./routes/shipments')
const pathRouter = require('./routes/path')
const outterRouter = require('./routes/outter')
const orderRouter = require('./routes/order')

// error handler
const notFoundMiddleware = require('./middleware/not-found')
const errorHandlerMiddleware = require('./middleware/error-handler')

app.get('/', (req, res) => {
  res.send('easypost api')
})

// routes
app.use('/api/v1/auth', authRouter)
app.use('/api/v1/user', userRouter)
app.use('/api/v1/', shipmentRouter)
app.use('/api/v1/path', pathRouter)
app.use('/api/sheepthat', outterRouter)
app.use('/api/v1', orderRouter)

app.use(notFoundMiddleware)
app.use(errorHandlerMiddleware)

// connection
const PORT = process.env.PORT || 5000;
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