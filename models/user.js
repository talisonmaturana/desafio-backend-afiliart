const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var user = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: String,
    email: String,
    password: String
}, { collection: 'users' });

module.exports = mongoose.model('User', user);