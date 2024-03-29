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
  res.render('index.html', {searchTerm : ''});
})

app.get('/search', function (req, res) {
  var queryString = req.query.q;
  console.log('Received query : ' + queryString);
  var hits = {};
  client.search({
    index: 'wiki',
    type: 'page',
    body: {
      "query": {
        "function_score": {
            "query": { "match":{"name":queryString} },
            "field_value_factor": { "field":"pagerank","modifier": "log1p"}
        }
    }
    }
  }).then(function (resp) {
      hits = resp.hits.hits;
      res.render('index.html', { searchTerm : queryString, results : hits});
      //res.send(hits);
  }, function (err) {
      console.trace(err.message);
      res.send(err.message);
  });
});

//HTTP server
app.listen(3000, function () {
  console.log('Listening on port 3000');
});
