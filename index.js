var elasticsearch = require('elasticsearch');
var client = new elasticsearch.Client({
  host: 'localhost:9200',
  log: 'trace'
});
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: false }));
app.set('views', './views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

//Check elasticsearch availability
client.ping({
  // ping usually has a 3000ms timeout
  requestTimeout: 1000
}, function (error) {
  if (error) {
    console.trace('ElasticSearch is down, please launch it and relaunch nodeJS server');
  } else {
    console.log('Elastic search is running.');
  }
});

//Routes
app.get('/' , function (req, res) {
  res.render('index.html');
})

app.post('/search', function (req, res) {
  var queryString = req.body.queryString;
  console.log('Received query : ' + queryString);
  var hits = {};
  client.search({
    index: 'wiki',
    type: 'page',
    body: {
      query: {
        match: {
          name: queryString
        }
      }
    }
  }).then(function (resp) {
      hits = resp.hits.hits;
      res.render('results.html', { results : hits});
      //res.send(hits);
  }, function (err) {
      console.trace(err.message);
      res.send(err.message);
  });
});
app.get('/' , function (req, res) {
  res.render('index.html');
})

//HTTP server
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
