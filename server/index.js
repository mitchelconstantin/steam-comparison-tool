var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
var key = require ('./steam_key');
var steam = require ('./steam');
var app = express();

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/user', function (req, res) {
  console.log('calling getPlayerProfile with provided ID');
  var SendDataBack = function (data) {
    res.send(data);
  }
  steam.getPlayerProfile('76561197960435530', SendDataBack);
  // res.send('done');
  // items.selectAll(function(err, data) {
  //   if(err) {
  //     res.sendStatus(500);
  //   } else {
  //     res.json(data);
  //     res.end('done')
  //   }
  // });
});

app.listen(3000, function() {
  console.log('listening on port 3000!');
});

