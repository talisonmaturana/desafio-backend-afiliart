const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var course = Schema({
    _id: mongoose.Schema.Types.ObjectId,
    name: {
        type: String,
        require: true,
    },
    category: String,
    img: String,
    link: String,
    price: Number,
    description: String
}, { collection: 'courses' });

module.exports = mongoose.model('Course', course);