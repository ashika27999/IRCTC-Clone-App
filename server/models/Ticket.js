const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TicketSchema = Schema({
    trainId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    ticketHolderId: {
        type: Schema.Types.ObjectId,
        required: true,
    },
    fare: {
        type: Number,
        required: true,
    },
    ticketType: {
        type: String,
        required: true,
    },
    status: {
        type: String,
        required: true,
    },
});

module.exports = mongoose.model('Ticket', TicketSchema);