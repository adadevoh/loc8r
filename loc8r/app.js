
/**
 * Module dependencies.
 */

var express = require('express');
var user = require('./app_server/routes/user');
var http = require('http');
var path = require('path');

var app = express();

//load routes
/*var routes = */require('./app_server/routes/index.js')(app);


//with mutliple route files, look into turnig this into a loop, and loading them into a routes array
//can also have routes/index.js as route landing page and use that to load all other routes in the routes directory
//Example:
/*
 * 
routes/index.js:
    var fs = require('fs');

    module.exports = function(app){
        fs.readdirSync(__dirname).forEach(function(file) {
            if (file == "index.js") return;
            var name = file.substr(0, file.indexOf('.'));
            require('./' + name)(app);
        });
    }
 * 
 * 
routes/test1.js:
    module.exports = function(app){
        app.get('/test1/', function(req, res){
            //...
        });

        //other routes..
    }
 * 
 * app.js:
 *  require('./routes')(app);
 * 
 */

// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'app_server/views'));
app.set('view engine', 'jade');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.methodOverride());
app.use(app.router);
app.use(require('stylus').middleware(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'public')));
//app.use('/', routes);

// development only
if ('development' == app.get('env')) {
    app.use(express.errorHandler());
}

//app.get('/', routes.index);
//app.get('/', routes.homePageController);
//app.get('/home', routes.index.ctrlMain.index);
//app.get('/users', user.list);

//require('./app_server/routes/index')(app);

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});


