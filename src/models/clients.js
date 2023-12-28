var mongoose = require('mongoose');

var Client = new mongoose.Schema({
    Clientname: {
        type: String,
        default: '',
        unique: true,
        required: true,
        dropDups: true
    },
    img: {
        type: String,
        default: ''
    }
});


module.exports = mongoose.model('Client', Client);