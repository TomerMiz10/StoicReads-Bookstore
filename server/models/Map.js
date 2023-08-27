const mongoose = require('mongoose')
const Schema = mongoose.Schema;

const Map = new Schema({
    storeName: { type: String, required: true },
    latitude: { type: Number, required: true },
    longitude: { type: Number, required: true },
    altitude: { type: Number, default: 0 },
    altitudeReference: { type: Number, default: -1 },
    name: { type: String, required: true }
});

module.exports = mongoose.model('Map', Map)