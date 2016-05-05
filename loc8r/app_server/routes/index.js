
/*
 * GET home page.
 */


//require and define controller modules
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

//wrap routes in a function, allowing it to use 'app' and and export it to app.js

module.exports = function (app) {

    //Locations pages
    app.get('/', ctrlLocations.homelist);
    app.get('/location', ctrlLocations.locationInfo);
    app.get('/location/review/new', ctrlLocations.addReview)

    //Other pages
    app.get('/about', ctrlOthers.about)

    //Example
    /*app.get('/', function (req, res) {
        res.render('index', { title: 'Expressssss' });
    });*/

};

var index = function (req, res) {
    res.render('index', { title: 'Express routte example' });
};
