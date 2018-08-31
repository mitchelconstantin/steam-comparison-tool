var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require("../database-mysql");
var steam = require("./steam");
var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/id", function(req, res) {
    console.log("calling get ID ");
    var sendIDBack = function (err, data) {
      if (err) {
        consle.log('server error')
        res.end('404');
      } else {
        let parsedData = JSON.parse(data)
        console.log(parsedData.response.steamid);
        res.end(parsedData.response.steamid || 'not found'); 
      }
    }
  steam.getPlayerID(req.query.id, sendIDBack);
    
  });

app.get("/profile", function(req, res) {
  

  var sendDataBack = function(err, data) {
    if (err) {
      console.log("server error");
      res.end("404");
    } else {
      let parsedData = JSON.parse(data);
      let dataToSend = {};


      if (parsedData.response.players[0]) {
        // populate dataToSend with data if there is good data
        playerInfo = parsedData.response.players[0];
        dataToSend = {
          steamid: playerInfo.steamid,
          personaname: playerInfo.personaname,
          avatar: playerInfo.avatarfull,
          timecreated: playerInfo.timecreated,
          lastlogoff: playerInfo.lastlogoff
        };
      } else {
        // populate dataToSend with errors if there is bad data
        dataToSend = {
          steamid: "Error!",
          personaname: "Error!",
          avatar: "https://i.ytimg.com/vi/DkIVqD8pJt8/maxresdefault.jpg",
          timecreated: "Error!",
          lastlogoff: "Error!"
        };
      }

      res.send(JSON.stringify(dataToSend)); //sending data back to client
    }
  };
  steam.getPlayerProfile(req.query.id, sendDataBack);
  
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
