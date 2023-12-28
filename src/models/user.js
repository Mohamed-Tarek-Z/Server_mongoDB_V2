var mongoose = require('mongoose');

var User = new mongoose.Schema({
    username: {
        type: String,
        default: '',
        unique: true,
        required: true,
        dropDups: true
    },
    img: {
        type: String,
        default: ''
    },
    admin: {
        type: Boolean,
        default: false
    }
});

User.plugin(require('passport-local-mongoose'));

module.exports = mongoose.model('User', User);