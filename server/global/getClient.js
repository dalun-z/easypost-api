const EasyPostClient = require('@easypost/api')
const Path = require('../models/Path')

const getClientConnection = async (pathID) => {
    const ID = parseInt(pathID);
    const path = await Path.findOne({ ID });

    if (!path) {
        throw new Error(`Path not found by ID: ${pathID}`);
    }

    const api_key = path.API_Key;
    const client = new EasyPostClient(api_key);

    return { path, client };
};

module.exports = {
    getClientConnection,
};