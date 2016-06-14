//app_server/routes/index.js
/*
 * GET home page.
 */
//var express = require('express');
//var router = express.Router();
//var router = require('express').Router();
//console.log("router data: ", router);
//console.log("express Route data: ", express.Route());

//require and define controller modules
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

//wrap routes in a function, allowing it to use 'app' and and export it to app.js
//router.get('/', ctrlLocations.homelist);
module.exports = function (app) {

    //Locations pages
    //router.get('/', ctrlLocations.homelist);
    app.get('/', ctrlLocations.homelist);
    app.get('/location/:locationID', ctrlLocations.locationInfo);
    app.get('/location/:locationID/review/new', ctrlLocations.addReview);
    app.post('/location/:locationID/review/new', ctrlLocations.doAddReview);

    //Other pages
    //app.get('/about', ctrlOthers.about)

    //Example
    /*app.get('/', function (req, res) {
        res.render('index', { title: 'Expressssss' });
    });*/


    //app.get('/locations', ctrlLocations.locationsListByDistance);
    //return router;
};

//module.exports = router;

var index = function (req, res) {
    res.render('index', { title: 'Express routte example' });
};
