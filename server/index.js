var express = require('express');
var db2 = require('../database-pg');
var steam = require('./steam');
var app = express();

const PORT = process.env.PORT || 3000;

app.use(express.static(__dirname + '/../react-client/dist'));

app.get('/id', function(req, res) {

  var sendIDBack = function(err, data) {
    if (err) {
      consle.log('server error');
      res.end('404');
    } else {
      let parsedData = JSON.parse(data);
      res.end(parsedData.response.steamid || 'not found');
    }
  };
  steam.getPlayerID(req.query.id, sendIDBack);
});

app.post('/games', function(req, res) {
  console.log('-------------------------------------------------------------');
  console.log('POST to /games');
  console.log('-------------------------------------------------------------');

  var sendToDb = function(err, data) {
    if (err) {
      console.log('error', err);
    } else {
      if (data) {
        var parsedData = JSON.parse(data);

        if (parsedData.response.games) {
          console.log('got some games to add to db');
          console.log('------------------------------------');
          // inserting all of that users games into the DB
          let dbPromises = parsedData.response.games.map(element => {
            var newPromise = new Promise((resolve, reject) => {
              db2.insertOne(element.appid, element.name, (err, result) => {
                if (err) {
                  console.log('---------------------------------------');
                  console.log('err in promise');
                  console.log(err);
                } else {
                  resolve(result);
                }
              });
            });
            return newPromise;
          });
          Promise.all(dbPromises)
            .then(() => {
              res.send('201');
            })
            .catch(() => {
              console.log('404', err);
              res.send('404');
            });
          // got some games to add to db.
        } else {
          res.send('404');
        }
      } else {
        res.send('404');
      }
    }
  };
  // steam.getPlayerGames(req.body.id, sendToDb);

  newUserCreation = function(err, data) {
    console.log('inside newUserCreation, data: ', data.rowCount);
    if (err) {
      console.log('here is your err');
      console.log(err);
      res.send('404');
    } else {
      if (data.rowCount < 1) {
        //if user not in DB
        db2.insertUser(req.query.id, () => console.log('user inserted into DB'));

        // get list of all his games
        steam.getPlayerGames(req.query.id, sendToDb);
      } else {
        res.send('404');
      }
    }
  };
  console.log('calling checkuser');
  db2.checkUser(req.query.id, newUserCreation);
  //check that user isn't already in user table before pushing new games
  // if he isn't in the database, put him there
});

app.get('/games', function(req, res) {
  console.log('-------------------------------------------------------------');
  console.log('GET to /games');
  console.log('-------------------------------------------------------------');
  var sendGamesBack = function(err, data) {
    if (err) {
      console.log('db error');
      res.end('404');
    } else {
      console.log('got the top 10 games , sending back to client now ');
      console.log('raw data: ', data);
      console.log('row data:', data.rows);
      // parsedData = JSON.stringify('hi')
      res.end(JSON.stringify(data.rows));
    }
  };
  db2.getTopGames(sendGamesBack);
});

app.get('/profile', function(req, res) {
  console.log('-------------------------------------------------------------');
  console.log('GET to /profile');
  console.log('-------------------------------------------------------------');
  var sendDataBack = function(err, data) {
    if (err) {
      console.log('server error');
      res.end('404');
    } else {
      console.log(' do I have the id here?');
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
          steamid: 'Error!',
          personaname: 'Error!',
          avatar: 'https://i.ytimg.com/vi/DkIVqD8pJt8/maxresdefault.jpg',
          timecreated: 'Error!',
          lastlogoff: 'Error!'
        };
      }

      res.send(JSON.stringify(dataToSend)); //sending data back to client
    }
  };

  steam.getPlayerProfile(req.query.id, sendDataBack);
});

app.post('/database', function(req, res) {
  console.log('-------------------------------------------------------------');
  console.log('POST to /database');
  console.log('-------------------------------------------------------------');

  function cbdb(err, data) {
    console.log('pOst-------------------------');
    if (err) {
      console.log(' POSTGRESthere was an err, ', err);
    } else {
      console.log('POSTGRESsuccess, heres data, ', data);
    }
    console.log('pOst-------------------------');
  }

  console.log('resetting the new DB');
  db2.resetDB(cbdb);
});

app.post('/databasePrint', function(req, res) {
  console.log('-------------------------------------------------------------');
  console.log('POST to /databasePrint');
  console.log('-------------------------------------------------------------');


  console.log('all info from the new DB');
  db2.selectAll('users', (err, data) => console.log('user table: ', data.rows));
  db2.selectAll('games', (err, data) =>
    console.log('games table: ', data.rows)
  );
  res.send('201');
});

app.listen(PORT, function() {
  console.log(`listening on port ${PORT}!`);
});
