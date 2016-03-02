var fs = require('fs-extra');
var path = require('path');
var express = require('express');
var rewrite = require('express-urlrewrite');
var bodyParser = require('body-parser');
var app =  express();
var Twitter = require('twitter');

var twitterClient = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  bearer_token: process.env.TWITTER_BEARER_TOKEN,
});
// app.set('port', (5000));

// route to get twitter info
app.use('/resources', express.static(path.join(__dirname, 'public/resources')));
app.use('/images', express.static(path.join(__dirname, 'public/images')));
app.use(rewrite('/*', '/index.html'));
app.use('/', express.static(path.join(__dirname, 'public')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


// app.listen(app.get('port'), function() {
//   console.log('Server started: http://localhost:' + app.get('port') + '/');
// });

module.exports = app;
