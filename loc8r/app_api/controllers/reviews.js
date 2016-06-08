var mongoose = require('mongoose');
var Loc = mongoose.model('Location');

//page 190
exports.reviewsCreate = function (req, res) {
    console.log("reviews create called");
    var stat = 404;
    var message = { "message": "" };
    var locationID = req.params.locationID;
    
    if (locationID) {
        Loc.findById(locationID).select('reviews').exec(function (err, location) {
            //console.log("review create location: ", location);
            if (err) {
                stat = 400;
                message = err;
            }
            else {
                results = addReview(req, res, location);
                //console.log("results: ", results);
                stat = results.stat;
                message = results.message;
                if (results.err) {
                    stat = results.stat;
                    message = results.err;
                    sendJsonResponse(res, results.stat, results.message);
                }
            }

        });
    }
    console.log("end of reviews create")
    //sendJsonResponse(res, stat, message);
}
var addReview = function (req, res, location) {
    results = {
        err: false,
        message : { "message": "locationID not found" },
        stat : 404
    };
    if (location) {
        results = {
            err: false,
            message : { "message": "locationID found" },
            stat : 200
        };
        location.reviews.push({
            author: req.body.author,
            rating: req.body.rating,
            reviewText: req.body.reviewText
        }); //console.log("before save");

        location.save(function (err, location) {
            var thisReview;
            //console.log("inside save");
            if (err) {
                results.err = err;
                results.stat = 400;
                results.res = res;
                //sendJsonResponse(res, results.stat, results.err);
            }
            else {
                //console.log("add review else");
                //console.log("results else 1 : ", results)
                updateAvgRating(location._id);
                thisReview = location.reviews[location.reviews.length - 1];
                results.stat = 201;
                results.message = thisReview;
                //console.log("results else 2: ", results);
                //return results;
                //sendJsonResponse(res, results.stat, results.message);
                
            } sendJsonResponse(res, results.stat, results.message);
            //console.log("after else")
        });
    }
    
    //console.log("results before return: ", results)
    return results;
}

var updateAvgRating = function (locationID) {
    Loc.findById(locationID).select('rating reviews').exec(function (err, location) {
        if (!err) {
            setAvgRating(location);
        }
    });
};
var setAvgRating = function (location) {
    var i, reviewCount, ratingAverage, ratingTotal;
    if (location.reviews && location.reviews.length > 0) {
        reviewCount = location.reviews.length;
        ratingTotal = 0;
        for (i = 0; i < reviewCount; i++) {
            ratingTotal = ratingTotal + location.reviews[i].rating;
        }
        ratingAverage = parseInt(ratingTotal / reviewCount, 10);
        location.rating = ratingAverage;
        location.save(function (err) {
            if (err) {
                console.log("err: ",err);
            } else {
                console.log("Average rating updated to", ratingAverage);
            }
        });
    }
};

//page 180
exports.reviewsReadOne = function (req, res) {
    console.log("reviews read One called");
    var stat = 404;
    var message = { "message": "Not found, locationid and reviewid are both required"};
    if (req.params && req.params.locationID && req.params.reviewID) {//params exist
        console.log("params exist: "+req.params);
        Loc.findById(req.params.locationID)
        .select("name reviews").exec(function (err, location) {
            var reviews, review, response;
            console.log("location: ", location);
            reviews = location.reviews;//asing reviews so I can loop over it
            if (!location) {//location does not exist, throw 404 error
                console.log("location not exist: " + req.params.locationID);
                stat = 404;
                message = { "message": "that location does not exist" };
                sendJsonResponse(res, stat, message);
            }
            else {//location exists 
                console.log("location exist: " + req.params.locationID);
                if (location.reviews && location.reviews.length > 0) {//location has reviews
                    console.log("location has reviews: " + location.reviews.length);
                    //************************************************************************************ PROBELM HERE ***********************************************************************************************
                    //somehow mongoose keeps returning null for location.reviews.id
                    review = location.reviews.id(req.params.reviewID)//mongoose subdoc helper to search for review with id => req.params.reviewID
                    console.log("req.params.reviewID: ", req.params.reviewID)
                    console.log("location.reviews.id('574dc468f7b65ceb96665a7e'): ", location.reviews.id("574dc468f7b65ceb96665a7e"));
                    console.log("review: ", review);
                    console.log("loc reviews: ", location.reviews[0]);
                    console.log("after review assign, location.reviews.id: ", location.name);
                    for (var i = 0; i < reviews.length; i++) {
                        console.log("id: ", reviews[i].createdoN);
                    }
                    

                    if (review) {//if location exists, has reviews, and particular review/reviewID exists
                        //build response object from location and review data obtained
                        console.log("review exist: " + review);
                        response = {
                            location: {
                                name: location.name,
                                id: location._id
                            },
                            review: review
                        };
                        stat = 200;
                        message = response;
                        sendJsonResponse(res, stat, message);
                    }
                    else {//location exists, has reviews, but review/reviewID does not exist
                        stat = 404;
                        message = { "message": "that review does not exist" };
                        sendJsonResponse(res, stat, message);
                    }
                }
                else {//locations exists but has no reviews
                    stat = 404;
                    message = { "message": location.name + " has no reiveiws" };
                    sendJsonResponse(res, stat, message);
                }
            }
            if (err) {
                stat = 400;
                message = err;
                sendJsonResponse(res, stat, message);
            }            
        });
    }
    console.log("end review read one");
    sendJsonResponse(res, stat, message);
}

//original code from the book, same issue with null id occurs here, so problem is not with my code
/*
exports.reviewsReadOne = function (req, res) {
    if (req.params && req.params.locationID && req.params.reviewID) {
        Loc
.findById(req.params.locationID)
.select('name reviews')
.exec(
            function (err, location) {
                var response, review;
                if (!location) {
                    sendJsonResponse(res, 404, {
                        "message": "locationid not found"
                    });
                    return;
                } else if (err) {
                    sendJsonResponse(res, 400, err);
                    return;
                }
                if (location.reviews && location.reviews.length > 0) {
                    review = location.reviews.id(req.params.reviewID);
                    console.log("review: ", review);
                    if (!review) {
                        console.log("location.name: ", location.name);
                        console.log("location.id: ", location.id);
                        console.log("location.reviews.length :", location.reviews.length);
                        console.log("location.reviews[0].author :", location.reviews[0].author);
                        console.log("location.reviews[0]._id :", location.reviews[0]._id);
                        //console.log(" :", location.)
                        console.log("location.reviews.id :", location.reviews.id('57520243f910906425282053'))
                        sendJsonResponse(res, 404, {
                            "message": "reviewid not found"
                        });
                    } else {
                        response = {
                            location : {
                                name : location.name,
                                id : req.params.locationID
                            },
                            review : review
                        };
                        sendJsonResponse(res, 200, response);
                    }
                } else {
                    sendJsonResponse(res, 404, {
                        "message": "No reviews found"
                    });
                }
            }
        );
    } else {
        sendJsonResponse(res, 404, {
            "message": "Not found, locationid and reviewid are both required"
        });
    }
};
*/

exports.reviewsUpdateOne = function (req, res) {
    console.log("reviews update one called");
    //console.log();

    sendJsonResponse(res, 200, { "status": "success" })
}

exports.reviewsDeleteOne = function (req, res) {
    console.log("reviews delete one called");
    //console.log();
    sendJsonResponse(res, 200, { "status": "success" })
}

var sendJsonResponse = function (res, status, content){
    res.status(status)
    res.json(content);
}

