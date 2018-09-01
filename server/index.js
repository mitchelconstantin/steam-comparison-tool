var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require("../database-mysql");
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

  app.get("/games", function (req, res) {
    console.log('calling get top games');
    var sendGamesBack = function (err, data) {
      if (err) {
        console.log('db error')
        res.end('404'); 
      } else{
        console.log('got the top 10 games')
        console.log(data);
        let parsedData = JSON.stringify(data)

        res.end(parsedData);
      }
    }
    db.getTopGames(sendGamesBack);
  });

app.get("/profile", function(req, res) { 
  

  var sendDataBack = function(err, data) {
    if (err) {
      console.log("server error");
      res.end("404");
    } else {
      console.log(' do I have the id here?');
      console.log(req.query.id);
      // call sendToDB
      steam.getPlayerGames(req.query.id, sendToDb)

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
  var sendToDb = function (err, data) {
    if (err) {
      console.log('error', err);
    } else {
      console.log('got your data')
      var parsedData = JSON.parse(data);
      console.log('here is the type of your parsed data');
      console.log(typeof parsedData);

      cb = function (err, x) {
        console.log('here is your err');
        console.log(err);
        console.log('here is the result');
        console.log(x);
      }


      if (parsedData.response.games) {  // got some games to add to db.
        console.log('here is the info for your first game');
        var gameName = parsedData.response.games[0].name;
        var gameID = parsedData.response.games[0].appid;

        cb2= function (err, x) {
          if (err) {
            console.log('here is your err');
            console.log(err);
          } else {
          console.log('ouput of checking if user is in the database: ');
          console.log(x);
          if (x.length < 1) {
            console.log('adding user to DB! : ', req.query.id);
            db.insertUser(req.query.id, cb);
            console.log('I still have all of his games btw, :')
            parsedData.response.games.forEach(element => {
              // console.log('here is hte element: ------------------')
              // console.log(element);
              db.insertOne(element.appid, element.name, cb)
            });
            console.log('done inserting new games, here is the new top 10')
            db.getTopGames(cb);
          }
          }

        }
        // console.log(' do you have this????????????????????????');
        // console.log(req.query.id);
         db.checkUser(req.query.id, cb2);
       //check that user isn't already in user table before pushing new games
       // if he isn't in the database, put him there

      // db.insertOne(gameID, gameName, cb) // put one game into DB

      db.selectAll(cb); 

      }

    }
  }

  steam.getPlayerProfile(req.query.id, sendDataBack);
  
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
