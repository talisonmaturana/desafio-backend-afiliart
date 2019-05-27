const mongoose = require('mongoose');

const mongoDB = 'mongodb+srv://talison:123@cluster0-ued3b.mongodb.net/desafio-backend?retryWrites=true';

mongoose.connect(mongoDB, { useNewUrlParser: true });
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error: '));