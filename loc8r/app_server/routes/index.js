
/*
 * GET home page.
 */

/*
 * app.get('/', routes.index);
app.get('/', routes.homePageController);
//app.get('/home', routes.index.ctrlMain.index);
app.get('/users', user.list);
 */

var ctrlMain = require('../controllers/main');

module.exports = function (app) {
    /*app.get('/', function (req, res) {
        res.render('index', { title: 'Expressssss' });
    });*/

    app.get('/', ctrlMain.index);
    app.get('/t', index);

};

var index = function (req, res) {
    res.render('index', { title: 'Express routt' });
};

/*exports.homePageController = function (req, res) {
    res.render('index', {title: 'Hello World'});
}*/
