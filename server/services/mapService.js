const Map = require("../models/Map");

const getMapData = async (storeName) => {

    const JSON = await Map.findOne({storeName});

    const simplifiedJSON = {
        latitude: JSON.latitude,
        longitude: JSON.longitude,
        altitude: JSON.altitude,
        altitudeReference: JSON.altitudeReference,
        name: JSON.name,
    };

    return simplifiedJSON;

}

const getAPIKey = () => {
    return process.env.BING_MAPS_API_KEY;
}


module.exports = {
    getMapData,
    getAPIKey,
};
