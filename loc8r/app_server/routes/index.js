
/*
 * GET home page.
 */


//define controller modules
var ctrlMain = require('../controllers/main');

module.exports = function (app) {
    /*app.get('/', function (req, res) {
        res.render('index', { title: 'Expressssss' });
    });*/

    app.get('/', ctrlMain.index);
    app.get('/t', index);

};

var index = function (req, res) {
    res.render('index', { title: 'Express routte example' });
};
