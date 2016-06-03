var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

exports.reviewsCreate = function (req, res) {
    console.log("reviews create called");
    //console.log();
    sendJsonResonse(res, 200, { "status": "success" })
}

exports.reviewsReadOne = function (req, res) {
    console.log("reviews read One called");
    //console.log();
    sendJsonResonse(res, 200, { "status": "success" })
}

exports.reviewsUpdateOne = function (req, res) {
    console.log("reviews update one called");
    //console.log();

    sendJsonResonse(res, 200, { "status": "success" })
}

exports.reviewsDeleteOne = function (req, res) {
    console.log("reviews delete one called");
    //console.log();
    sendJsonResonse(res, 200, { "status": "success" })
}

var sendJsonResonse = function (res, status, content){
    res.status(status)
    res.json(content);
}