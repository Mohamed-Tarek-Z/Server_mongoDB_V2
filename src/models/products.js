var mongoose = require('mongoose');

var productSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        dropDups: true
    },
    wightOfEmptyCone: {
        type: Number,
        required: true
    },
    colorOfEmptyCone: {
        type: String,
        required: false,
        default: ' '
    }
}, {
    timestamps: true
});

module.exports = mongoose.model('Product', productSchema);