const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TrainSchema = Schema({
    start: {
        type: String,
        required: true,
    },
    destination: {
        type: String,
        required: true,
    },
    trainName: {
        type: String,
        required: true,
    },
    passengerCapacity: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    allPassengers: [{
        type: Schema.Types.ObjectId,
    }],
});

module.exports = mongoose.model('Train', TrainSchema);