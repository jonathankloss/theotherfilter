var express = require('express');
var app = express();
var bodyParser = require('body-parser')

// MongoDb
var MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectID;
var dbHost = 'mongodb://admin:QIHwGDmILJBC@localhost:27017/nodejs';

app.use( bodyParser.json() );       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
  extended: true
}));

MongoClient.connect(dbHost, function (err, db) {
  if (!err) {
    console.log("Connected correctly to server.");
  }

  var collection = db.collection('filtering');
  app.get('/words', (req, res) => {
    collection.find({}).toArray(function(error, documents) {
      if (err) throw error;
      var allProductsArray = documents.map((key)=>{
        return key.word;
      });
      res.header("Access-Control-Allow-Origin", "*");
      res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
      res.send(allProductsArray);
    });
  });

  app.post('/words', (req, res) => {
    console.log(req);
    collection.insert(
      {"word": req.body.word}
    );
    res.json({status: 'ok', word: req.body.word})
  });

  app.listen(3000, function () {
      console.log('Example app listening on port 3000!');
  });
});
