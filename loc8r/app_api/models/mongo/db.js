var mongoose = require('mongoose');

var dbURI = 'mongodb://127.0.0.1/Loc8r';
mongoose.connect(dbURI);
//mongoose.connect('mongodb://localhost:27017/Loc8r');

mongoose.connection.on('connected', function () {
    console.log('mongoose connected to ' + dbURI);
});
mongoose.connection.on('error', function (err) {
    console.log('Mongoose connection error: ' + err);
});
mongoose.connection.on('disonnected', function () {
    console.log('Mongoose disconnected');
});


require('./locations');