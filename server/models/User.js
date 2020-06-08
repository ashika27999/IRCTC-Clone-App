const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = Schema({
    username: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    emailId: {
        type: String,
        unique: true,
        required: true,
    },
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
    },
    gender: {
        type: String,
        requires: true,
    },
    age: {
        type: Number,
        requires: true,
    },
    userType: {
        type: String,
        required: true,
    },
    allTickets: [{
        type: Schema.Types.ObjectId,
    }],
});

module.exports = mongoose.model('User', UserSchema);