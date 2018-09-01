var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var db = require("../database-mysql");
var steam = require("./steam");
var app = express();
// app.use(express.json());   
bodyParser.urlencoded({extended:true});
app.use(bodyParser.json());
const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + "/../react-client/dist"));

app.get("/id", function(req, res) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("GET to /id");
  console.log(
    "----------------------------------------------------------------"
  );
  var sendIDBack = function(err, data) {
    if (err) {
      consle.log("server error");
      res.end("404");
    } else {
      let parsedData = JSON.parse(data);
      console.log(parsedData.response.steamid);
      res.end(parsedData.response.steamid || "not found");
    }
  };
  steam.getPlayerID(req.query.id, sendIDBack);
});

app.post("/games", function(req, res) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("POST to /games");
  console.log('here is the req body', req.body.id);
  console.log(
    "----------------------------------------------------------------"
  );
  // res.send("404");

  var sendToDb = function(err, data) {
    if (err) {
      console.log("error", err);
    } else {
      console.log("got your data inside sendToDb");
      console.log(data);
      var parsedData = JSON.parse(data);

      if (parsedData.response.games) {
        console.log("got some games to add to db");
        console.log(parsedData.response.games)
        // inserting all of that users games into the DB
        let dbPromises = parsedData.response.games.map(element => {
          var newPromise = new Promise((resolve, reject) => {
            db.insertOne(element.appid, element.name, (err, result) => {
              if (err) {
                console.log('---------------------------------------')
                console.log('err in promise')
                console.log(err)
                // reject(err);
              } else {
                resolve(result);
              }
            });
          }); 
          return newPromise;
          // db.save(element.id, element.name, element.owner.login, element.forks_count, element.open_issues, callback)
        });
        Promise.all(dbPromises)
          .then(() => {res.send("201")})
          .catch(() =>{console.log('404', err)});
        // got some games to add to db.
      } else {
        res.send("404");
      }
    }
  };
  // steam.getPlayerGames(req.body.id, sendToDb);

  newUserCreation = function(err, x) {
    if (err) {
      console.log("here is your err");
      console.log(err);
      res.send("404");
    } else {
      if (x.length < 1) {
        //if user not in DB
        db.insertUser(req.body.id, () => console.log("user inserted into DB"));

        // get list of all his games
        steam.getPlayerGames(req.body.id, sendToDb);
      } else {
        res.send("404");
      }
    }
  };
  console.log("calling checkuser");
  db.checkUser(req.body.id, newUserCreation);
  //check that user isn't already in user table before pushing new games
  // if he isn't in the database, put him there
});

app.get("/games", function(req, res) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("GET to /games");
  console.log(
    "----------------------------------------------------------------"
  );
  var sendGamesBack = function(err, data) {
    if (err) {
      console.log("db error");
      res.end("404");
    } else {
      console.log("got the top 10 games , sending back to client now ");
      console.log(data);
      // parsedData = JSON.stringify('hi')
      res.end(JSON.stringify(data));
    }
  };
  db.getTopGames(sendGamesBack);
});

app.get("/profile", function(req, res) {
  console.log(
    "----------------------------------------------------------------"
  );
  console.log("GET to /profile");
  console.log(
    "----------------------------------------------------------------"
  );
  var sendDataBack = function(err, data) {
    if (err) {
      console.log("server error");
      res.end("404");
    } else {
      console.log(" do I have the id here?");
      console.log(req.query.id);
      // call sendToDB

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
