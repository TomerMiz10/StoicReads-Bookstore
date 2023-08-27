const mapService = require("../services/mapService");

const getMapData = async (req, res) => {
    try {
        const { storeName } = req.params;

        const mapJSON = await mapService.getMapData(storeName);
        console.log('Successfully retrieved map location')
        res.status(200).json(mapJSON);
    } catch (err) {
        console.log(err);
        res
            .status(404)
            .json({ error: "Couldn`t fetch map location", success: false });
    }
};

const getAPIKey = async (req, res) => {
    try {

        const APIKey = await mapService.getAPIKey();
        res.status(200).json(APIKey);
    } catch (err) {
        console.log(err);
        res
            .status(404)
            .json({ error: "Couldn`t fetch API Key", success: false });
    }
};


module.exports = {
   getMapData,
    getAPIKey
};



