var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

exports.locationsListByDistance = function (req, res) {
    console.log("locations by distance called");
    var lng = parseFloat(req.query.lng);
    var lat = parseFloat(req.query.lat);
    var point = {
        type: "Point",
        coordinates: [lng, lat]
    };
    
    var theEarth = (function () {
        var earthRadius = 6371; // km, miles is 3959
        var getDistanceFromRads = function (rads) {
            return parseFloat(rads * earthRadius);
        };
        var getRadsFromDistance = function (distance) {
            return parseFloat(distance / earthRadius);
        };
        return {
            getDistanceFromRads : getDistanceFromRads,
            getRadsFromDistance : getRadsFromDistance
        };
    })();

    var geoOptions = {
        spherical: true,//determines whether search will be done on a spherical object or flat plane
        maxDistance: theEarth.getRadsFromDistance(20),//convert distance to rads so it can be supplied to mongoose
        num: 10 //limit results by 10
    };
    Loc.geoNear(point, geoOptions, function (err, results, stats) {
        var locations = [];
        if (err) {
            sendJsonResponse(res, 404, err);
        }
        else {
            results.forEach(function (doc) {
                locations.push({
                    distance: theEarth.getDistanceFromRads(doc.dis),
                    name: doc.obj.name,
                    address: doc.obj.address,
                    rating: doc.obj.rating,
                    facilities: doc.obj.facilities,
                    _id: doc.obj._id
                });
            });
            sendJsonResponse(res, 200, locations);
        }        
    });

    //sendJsonResonse(res, 200, { "status": "success" })
};

exports.locationsCreate = function (req, res) {
    var stat = 404;
    var message = { "message": "" };
    console.log("locatons create called");

    //console.log("name: ", req.body.name);

    Loc.create({
        name: req.body.name,
        address: req.body.address,
        facilities: req.body.facilities.split(","),
        coords: [parseFloat(req.body.lng), parseFloat(req.body.lat)],
        openingTimes: [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days2,
                opening: req.body.opening2,
                closing: req.body.closing2,
                closed: req.body.closed2
            }
        ]
    },
        function (err, location) {
        if (err) {
            stat = 400;
            message = err;
            //sendJsonResonse(res, 400, err);
        } else {
            stat = 201;
            message = location;
            //sendJsonResonse(res, 201, location);
        }
        sendJsonResponse(res, stat, message);
    });
    //sendJsonResonse(res, 200, { "status": "success" })
};

exports.locationsReadOne = function (req, res) {
    console.log("params: " + req.params.locationID);
    console.log("locations Read One called");
    
    if (req.params && req.params.locationID) {//if params and params.locationID exist 
        Loc.findById(req.params.locationID).exec(function (err, location) {//execute query
            if (!location) {//if the locationID supplied does not exist
                sendJsonResponse(res, 404, { message: "that location does not exist" });
                return;
                //return can be redundant if you are already checking all possibilties of lcoation and err
            }
            else if (err) {//if mongoose throws an error
                sendJsonResponse(res, 404, err);
                return;
            }
            //else//succesful query. location exists
            sendJsonResponse(res, 200, location);
        });
    }
    else{//no lcationID in url
        sendJsonResponse(res, 404, { message: "No locationID in request" })
        //I believe this section of code is also redundant as no locationID in the url would look like this => app.get(/locations/).
        //And this type of request is already handled as => app.get('/locations', ctrlLocations.locationsListByDistance);
    }
};


exports.locationsUpdateOne = function (req, res){
    console.log("locations Update One called");
    //console.log("PUT PARAMS: "+req.params.locationID)
    if (!req.params.locationID) {
        sendJsonResponse(res, 404, { message: "Not found, locationID required" });
        return;
    }
    Loc.findById(req.params.locationID).select('-reviews -rating').exec(function (err, location) {//select(-reviews -rating) means get everything 'minus' reviews and rating
        if (!location) {
            sendJsonResponse(res, 404, { message: "locationID not found" });
            return;
        }
        else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
        location.name = req.body.name;
        location.address = req.body.address;
        location.facilities = req.body.facilities.split(",");
        location.coords = [parseFloat(req.body.lng), parseFloat(req.body.lat)];
        location.openingTimes = [{
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed1
            },
            {
                days: req.body.days1,
                opening: req.body.opening1,
                closing: req.body.closing1,
                closed: req.body.closed2
            }
        ];
        location.save(function (err, location) {
            if (err) {
                sendJsonResponse(res, 404, err);
            }
            else {
                sendJsonResponse(res, 200, location);
            }
        });
    });
    //
    /*Loc.findByIdAndUpdate(req.params.locationID, { $set : { name: "Cuckoo" } }, function (err, location) {
        if (!location) {
            sendJsonResponse(res, 404, { message: "locationID not found" });
            return;
        }
        else if (err) {
            sendJsonResponse(res, 404, err);
            return;
        }
    });*/
    
    
}

exports.locationsDeleteOne = function (req, res) {
    console.log("locations delete one called");
    
    var locationID = req.params.locationID;
    if (locationID) {
        Loc.findByIdAndRemove(locationID).exec(function (err, location) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            sendJsonResponse(res, 204, null);
        });
        //do something with location, before you delete it
        /*Loc.findById(locationID).exec(function (err, location) {
            if (err) {
                sendJsonResponse(res, 404, err);
                return;
            }
            if (!location) {
                sendJsonResponse(res, 404, {message: "cannot find that location"});
                return;
            }
            Loc.remove(function (err, location) {
                if (err) {
                    sendJsonResponse(res, 404, err);
                }
            });
        });*/
    }
    else {
        sendJsonResponse(res, 404, { message: "No locationID" });
    }
};

console.log("locations module.export: " + module.exports);

var sendJsonResponse = function (res, status, content) {
    res.status(status)
    res.json(content);
}

//the exec function has a call back function that takes an error, and the result of your executed query