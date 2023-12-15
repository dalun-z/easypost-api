
## Server
- run the server
```
cd server
node server.js
```

## UI
- run the web app
```
cd ui
npm start
```
- deploy the web app to github
```
cd ui
npm run deploy
```


# Design Log

API Integration

```
{
    "Content-Type": "application/json"
    "token": {MongoDB - path collection - ObjectID}     // User use 'token' to send GET request to the server to get the data of the path
    "referenceCode": {reference}                        // reference from the response data of EasyPost API
}
```

`http://localhost:4400/api/v1/sheepthat`

- Cancel Order
```
// POST http://localhost:4400/sheepthat/cancelorder
const cancelOrder = async (req, res) => {
    // Receive data from client
    responseData = {
        orderCode,
        token
    } = req.body

    // TODO(Optional): also can check if the token is valid 
    // if (valid) { send cancel request to EasyPost }
    // send the response data to EasyPost
    result = axios.post('EasyPostAPI/cancelorder', responseData.orderCode) // return true if cancelled successfully, return false otherwise

    // send the response from EasyPost to client
    res.status(200).json(result.data)
}
```
