var mongoose = require('mongoose');

var obagSchema = new mongoose.Schema({
    type: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        require: true,
        autopopulate: true
    },
    lot: {
        type: String,
        required: true
    },
    pallet: {
        type: Number,
        required: true
    },
    numberOfCones: {
        type: Number,
        required: true
    },
    wightOfEmptyBag: {
        type: Number,
        required: true
    },
    totalWight: {
        type: Number,
        required: true
    },
    netWight: {
        type: Number,
        required: true
    },
    marked: {
        type: Boolean,
        default: false
    },
    box: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true
});

obagSchema.plugin(require('mongoose-autopopulate'));

module.exports = mongoose.model('OBag', obagSchema);