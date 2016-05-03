
/*
 * GET home page.
 */


//define controller modules
var ctrlMain = require('../controllers/main');
var ctrlLocations = require('../controllers/locations');
var ctrlOthers = require('../controllers/others');

module.exports = function (app) {
    /*app.get('/', function (req, res) {
        res.render('index', { title: 'Expressssss' });
    });*/

    //app.get('/', ctrlMain.index);
    //app.get('/t', index);

    //Locations pages
    app.get('/', ctrlLocations.homelist);
    app.get('/location', ctrlLocations.locationInfo);
    app.get('/location/review/new', ctrlLocations.addReview)

    //Other pages
    app.get('/about', ctrlOthers.about)

};

var index = function (req, res) {
    res.render('index', { title: 'Express routte example' });
};
