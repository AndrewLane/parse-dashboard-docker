var express = require('express');
var ParseDashboard = require('parse-dashboard');
var http = require('http');

var dashboard = new ParseDashboard({
    apps: [
        {
            appId: process.env.APP_ID || 'myAppId',
            masterKey: process.env.MASTER_KEY,
            serverURL: process.env.SERVER_URL,
            appName: process.env.APP_NAME,
            production: (process.env.NODE_ENV === 'production')
        },
    ],
    users: [
        {
            user: process.env.USER_NAME,
            pass: process.env.PASSWORD
        }
    ]
}, true /* note: allowInsecureHTTP=true */);

var app = express();

// route that will just return a version
app.get('/version', function(req, res) {
  res.status(200).send('1.0.5');
});

// route that will do a rudimentary health check
app.get('/healthcheck', function(req, res) {
  res.status(200).send('Health check passed');
});

// make the Parse Dashboard available at root /
app.use('/', dashboard);

var port = process.env.PORT || 4040;
var httpServer = http.createServer(app);
httpServer.listen(port, function () {
    console.log('parse-dashboard running on port ' + port);
});
