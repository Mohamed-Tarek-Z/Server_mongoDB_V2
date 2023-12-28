var mongoose = require('mongoose');

var orderSchema = new mongoose.Schema({
    client: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Client',
        require: true,
        autopopulate: { select: ['_id', 'Clientname'] }
    },
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
        autopopulate: { select: ['_id', 'name'] }
    },
    lot: {
        type: String,
        required: true
    },
    bagsNumber: {
        type: Number,
        required: true
    },
    bags: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'OBag',
        require: true
    }],
    wight: {
        type: Number,
        required: false
    },
    pallets: [{
        type: Number,
        required: false
    }]
}, {
    timestamps: true
});

orderSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('Order', orderSchema);