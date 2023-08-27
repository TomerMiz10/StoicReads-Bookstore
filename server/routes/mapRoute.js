const express = require("express");
const mapRoute = express.Router();

const {
    getMapData,
    getAPIKey
} = require("../controllers/mapController");

mapRoute.get("/getMapData/:storeName", getMapData);
mapRoute.get("/getAPIKey", getAPIKey);

module.exports = mapRoute;
