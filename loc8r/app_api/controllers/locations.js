var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

exports.locationsListByDistance = function (req, res) {
    console.log("locations by distance called");

    sendJsonResonse(res, 200, { "status": "success" })
};

exports.locationsCreate = function (req, res) {
    console.log("locatons create called");
    sendJsonResonse(res, 200, { "status": "success" })
};

exports.locationsReadOne = function (req, res) {
    console.log("params: " + req.params.locationID);
    console.log("locations Read One called");
    sendJsonResonse(res, 200, { "status": "success" })
};

exports.locationsUpdateOne = function (req, res){
    console.log("locations Update One called");
    console.log("PUT PARAMS: "+req.params.locationID)
    sendJsonResonse(res, 200, { "status": "success" })
}

exports.locationsDeleteOne = function (req, res){
    console.log("locations delete one called");
    sendJsonResonse(res, 200, { "status": "success" })
}

console.log("locations module.export: " + module.exports);

var sendJsonResonse = function (res, status, content) {
    res.status(status)
    res.json(content);
}