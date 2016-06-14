//app_server/controllers/locations.js

var request = require('request');
var apiOptions = {
    server : "http://localhost:3000"
};
if(process.env.NODE_ENV === 'production'){
    apiOptions.server = "https://";
}

//get locations home page
//HomeList
exports.homelist = function (req, res) {
    var requestOptions, path;
    path = '/api/locations';
    requestOptions = {
        url: apiOptions.server + path,
        method: "GET",
        json: {},
        qs: {
            lng: -0.9630884,
            lat: 51.451041,
            maxDistance: 20.0,
        }

    };
    console.log("url: ", requestOptions.url);
    request(requestOptions, function (err, response, body){
        //console.log("response: ", response);
        var data = body;
        if (response.statusCode === 200 && data.length) {
            for (var i = 0; i < data.length; i++) {
                data[i].distance = _formatDistance(data[i].distance);
            }
        }
        console.log("body: ", body);
        renderHomepage(req, res, body); 
    })
       
};
var _formatDistance = function (distance) {
    var numDistance, unit;
    if (distance > 1) {
        numDistance = parseFloat(distance).toFixed(1);
        unit = 'km';
    } else {
        numDistance = parseInt(distance * 1000, 10);
        unit = 'm';
    }
    return numDistance + unit;
};

var renderHomepage = function (req, res, responseBody) {
    var message;
    if (!(responseBody instanceof Array)) {
        message = "API lookup error";
        responseBody =[];
    }
    else {
        if (!responseBody.length) {
            message = "No places nearby";
        }
    }
    res.render('locations-list', {
        title: 'Loc8r - find a place to work with wiFi',
        pageHeader: {
            title: 'Loc8r',
            strapline: 'Find places with wiFi near you!'
        },
        sidebar: "Looking for wifi and a seat? Loc8r helps you find places to work when out and about. Perhaps with coffee, cake or a pint? Let Loc8r help you find the place you're looking for.",
        locations: responseBody,
        message: message
    });
};


//get location info page
//Locations Info
exports.locationInfo = function (req, res) {
    console.log("calling getLocationInfo");
    //callback function definition takes  data passed from getLocationInfo, and executes when "callback" is called in getLocationInfo. This is redundant
    /*getLocationInfo(req, res, function(req, res ,responseData){
        console.log("inside locInfo callback");
        renderLocationInfo(req, res, responseData);
    });*/

    //wrong way to do it. This causses the function (renderLocationInfo) to be executed as it is called
    //getLocationInfo(req, res, renderLocationInfo(req, res, responseData));  
    getLocationInfo(req, res, renderLocationInfo);//unredundant
    
};

var renderLocationInfo = function(req, res, locDetail){
    console.log("render locationinfo called");
    res.render('location-info', {
        title: locDetail.name,
        pageHeader: {title: locDetail.name},
        sidebar: {
            context: locDetail.name+" is on Loc8r because it has accessible wifi and space to sit down with your laptop and get some work done.",
            callToAction: "If you've been and you like it - or if you don't -please leave a review to help other people just like you."

        },
        location: locDetail,
        map : {
            title: "Location map",
            image: "http://maps.googleapis.com/maps/api/staticmap?center=51.455041,-0.9690884&zoom=17&size=400x350&sensor=false&markers=51.455041,-0.9690884&scale=2"
        }
    });
}

//get 'add review page'
//Add review page
exports.addReview = function (req, res) {//display add review form
    getLocationInfo(req, res, renderReviewForm);
};

var renderReviewForm = function(req, res, locDetail){
    res.render('location-review-form', { 
        title: 'Review '+locDetail.name+" on Loc8r",
        pageHeader: {title: 'Review'+locDetail.name}
    });
};




exports.doAddReview = function(req, res){
    var requestOptions, path, locationID, postdata;
    locationID = req.params.locationID;
    path = "/api/locations/"+locationID+'/reviews';
    postdata = {
        author: req.body.author,
        rating: parseInt(req.body.rating, 10),
        reviewText : req.body.review
    };
    requestOptions = {
        url: apiOptions.server+path,
        method: "POST",
        json: postdata
    };
    request(requestOptions, function(err, response, body){
        if(response.statusCode=== 201){
            res.redirect('/location/'+locationID);
        }else{
            _showError(req, res, response.statusCode);
        }
    })
};



var getLocationInfo = function(req, res, callback){
    console.log("get location info called");
    var requestOptions, path;
    path = "/api/locations/"+req.params.locationID;
    requestOptions = {
        url : apiOptions.server +path,
        mthod : "GET",
        json : {}
    };
    request(requestOptions, function(err, response, body){
        var data = body;
        //console.log(data);
        if(response.statusCode === 200){
            data.coords = {
                lng: body.coords[0],
                lat: body.coords[1]
            };
            console.log("bout to execute callback");
            callback(req, res, data);//call callback function adn pass relevant variables to it, and let it do whatever it does
        }else{
            _showError(req, res, response.statusCode);
        }
    });
}

var _showError = function (req, res, status) {
    var title, content;
    if(status === 404){
        title = "404, page not found";
        content = "Oh dear. Looks like we can't find this page. Sorry.";
    }
    else{
        title = status + ", somethings gone wrong";
        content = "Something has gone wrong with the request";
    }
    res.status(status);
    res.render('generic-text',{
        title: title,
        content: content
    });
};

/*
var responseData = { 
      _id: '5756e9f42b93609421eaff1e',
      name: 'Costy',
      address: 'High street, Reading',
      coords: [ -0.9630884, 51.451041 ],
      __v: 0,
      reviews:
       [ { author: 'Mew Two',
           rating: 4,
           reviewText: 'Mew wasn\'t there lol',
           _id: '5757451056e4fd64217f04a8',
           createdoN: '2016-06-07T22:05:04.053Z' },
         { author: 'Mew Two',
           rating: 4,
           reviewText: 'Mew wasn\'t there lol',
           _id: '575745e2170af0c0180f0471',
           createdoN: '2016-06-07T22:08:34.240Z' } ],
      openingTimes:
       [ { days: 'Monday - Friday',
           opening: '8:00am',
           closing: '5:00pm',
           closed: false,
           _id: '5756e9f42b93609421eaff20' },
         { days: 'Saturday',
           opening: '10:00am',
           closing: '9:00pm',
           closed: false,
           _id: '5756e9f42b93609421eaff1f' } ],
      facilities: [ 'hot drinks', ' food', ' power' ],
      rating: 4 
  }
*/