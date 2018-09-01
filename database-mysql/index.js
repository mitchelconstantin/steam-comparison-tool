var mysql = require("mysql");

var connection = mysql.createConnection({
  host: "localhost",
  user: "student",
  password: "student",
  database: "Games"
});

var selectAll = function(callback) {
  var params = "I am a game!";
  var query = `SELECT * FROM `;
  query += params;
  // client.query('UPDATE mytable SET emote=? WHERE id=5', ['wtf?']);
  // var query2 = 'SELECT ?', [1]

  connection.query("SELECT * FROM games WHERE name = ?", [params], function(
    err,
    results,
    fields
  ) {
    if (err) {
      console.log('-----------------------------------------------')      
      console.log('db error')
      console.log(err)
      console.log('-----------------------------------------------')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertUser = function(userID, callback) {
  var query = "INSERT INTO users (id) VALUES (?)";
  connection.query(query, [userID], function(err, results, fields) {
    if (err) {
      console.log('-----------------------------------------------')      
      console.log('db error')
      console.log(err)
      console.log('-----------------------------------------------')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var checkUser = function(userID, callback) {
  var query = "SELECT * from users WHERE id=?";
  connection.query(query, [userID], function(err, results, fields) {
    if (err) {
      console.log('-----------------------------------------------')      
      console.log('db error')
      console.log(err)
      console.log('-----------------------------------------------')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var insertOne = function(id, name, callback) {
  var query = `INSERT into Games (id, occurances, name) VALUES (?, 1 ,?) ON DUPLICATE KEY UPDATE occurances = occurances + 1;`;
  connection.query(query, [id, name], function(err, results, fields) {
    if (err) {
      console.log('-----------------------------------------------')      
      console.log('db error')
      console.log(err)
      console.log('-----------------------------------------------')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};

var getTopGames = function( callback) {
  var query = "SELECT * from games WHERE occurances > 1 ORDER BY occurances DESC LIMIT 10";
  connection.query(query, function(err, results, fields) {
    if (err) {
      console.log('-----------------------------------------------')      
      console.log('db error')
      console.log(err) 
      console.log('-----------------------------------------------')
      callback(err, null);
    } else {
      callback(null, results);
    }
  });
};


module.exports = {
  selectAll: selectAll,
  insertOne: insertOne,
  checkUser: checkUser,
  insertUser: insertUser,
  getTopGames : getTopGames
  
};
