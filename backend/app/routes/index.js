module.exports = {
    initializeRoutes: function (app) {
        console.log('initializing routes');
        var express = require('express');
        var routes = require('require-dir')();

        Object.keys(routes).forEach(function (routeName) {
            console.log('initializing ' + routeName + ' routes');
            var router = express.Router();
            require('./' + routeName)(router);
            app.use('/' + routeName, router);
        })
        console.log('routes initialized')
    }
}