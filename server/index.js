var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require("../database-mysql");
var steam = require("./steam");
var app = express();
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/id"),
  function(req, res) {
    console.log("calling get ID ");
    res.end("200");
  };

app.get("/profile", function(req, res) {
  console.log("calling getPlayerProfile with provided ID");
  console.log("----------------------------------------------");
  console.log("here is the incoming req url ", req.query.id);
  console.log("----------------------------------------------");

  var SendDataBack = function(err, data) {
    if (err) {
      console.log("server error");
      res.end("404");
    } else {
      console.log("here is the server data", data);
      var parsedData = JSON.parse(data);

      if (parsedData.response.players[0]) {
        playerInfo = parsedData.response.players[0];
        var dataToSend = {
          steamid: playerInfo.steamid,
          personaname: playerInfo.personaname,
          avatar: playerInfo.avatar,
          timecreated: playerInfo.timecreated,
          lastlogoff: playerInfo.lastlogoff
        };
      } else {
        var dataToSend = {
          steamid: "Error!",
          personaname: "Error!",
          avatar: "Error!",
          timecreated: "Error!",
          lastlogoff: "Error!"
        };
      }

      console.log("here is the data to send ", dataToSend);

      res.send(JSON.stringify(dataToSend));
    }
  };
  steam.getPlayerProfile(req.query.id, SendDataBack);
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
