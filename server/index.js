var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
var steam = require ('./steam');
var app = express();
const PORT = process.env.PORT || 3000

// UNCOMMENT FOR REACT
app.use(express.static(__dirname + '/../react-client/dist'));

// UNCOMMENT FOR ANGULAR
// app.use(express.static(__dirname + '/../angular-client'));
// app.use(express.static(__dirname + '/../node_modules'));

app.get('/user', function (req, res) {
  console.log('calling getPlayerProfile with provided ID');
  var SendDataBack = function (data) {
    console.log('here is the server data', data);
    var parsedData = JSON.parse(data).response.players[0];
    console.log('here is the parsdData, ', parsedData);
    console.log(data.steamid);
    console.log(parsedData.steamid);

    var dataToSend = {
      steamid: parsedData.steamid,
      personaname: parsedData.personaname,
      avatar: parsedData.avatar,
      timecreated: parsedData.timecreated,
      lastlogoff: parsedData.lastlogoff
    }
    console.log('here is the data to send ', dataToSend);
    
    res.send(JSON.stringify(dataToSend));
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

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});

