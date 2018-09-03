var pg = require('pg');

var host = 'ec2-54-243-31-34.compute-1.amazonaws.com';
var user = 'tpeuvgbdkqgpvd';
var password = process.env.DBPW;
var database = 'd5nsnjv734jus1';
var port = '5432';
// postgres://tpeuvgbdkqgpvd:7a43a6bfe9c7de3cf016ecd508da50eae5b68a301f88f378776030d821ee8f3b@ec2-54-243-31-34.compute-1.amazonaws.com:5432/d5nsnjv734jus1
// postgres://${user}:${DBPW}@${host}:${port/${database}

var conString = `postgres://${user}:${password}@${host}:${port}/${database}&ssl=true`;
// var conString2 = `postgres://${user}:${DBPW}@${host}:${port`
console.log(conString);
var connection = new pg.Client(conString);

var connection2 = new pg.Client({
  user: user,
  password: process.env.DBPW,
  database: database,
  port: port,
  host: host,
  ssl: true
}); 
connection.connect();


var selectAll = function(callback) {
  
  var query = `SELECT * FROM *`;
  connection.query(query, function(
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

function queryDatabase(query, params, callback) {
  try {
    // let params = [3]
    // let qu = 'SELECT * FROM test';
    // qu = 'CREATE TABLE test (name varchar(40));';
    //qu = 'SELECT * FROM test;';
    // var qu = 'INSERT INTO test VALUES($1);';
    // var params = 'asdfasdfasdf';
    // qu = 'CREATE DATABASE X

    connection.query(query,params, (err, res) => {
      //console.log("trying");
      if (err) {
        console.log('throwing err');
        throw err;
      } 
      // console.log('it worked, callback called');
      callback(null, res);
      // connection.end(); 
    });
  } catch (error) {
    // if you need further help, remember to provide this error here.
    console.log('db2 did not work');
    console.log(error);
  }
}

var selectAll = function(table, callback) {
  if (table === 'users'){
    var query = "SELECT * from users";
  } else {
    var query = "SELECT * from games";
  }
  var params = [];
  queryDatabase(query, params, callback);
}

var insertUser = function(userID, callback) {
  var query = "INSERT INTO users (id) VALUES ($1)";
  var params = [userID];
  queryDatabase(query, params, callback);
}

var checkUser = function(userID, callback) {
  var query = "SELECT * from users WHERE id=$1";
  var params = [userID];
  queryDatabase(query, params, callback);
}
//mysqlsyntax: ON DUPLICATE KEY UPDATE occurances = occurances + 1
//psql syntax: ON CONFLICT (id) DO UPDATE SET occurances = occurances+1,
var insertOne = function(id, name, callback) {
  var query = `INSERT into games (id, occurances, name) VALUES ($1, 1 ,$2) ON CONFLICT (id) DO UPDATE  SET occurances = games.occurances+1 ;`;
  var params = [id, name];
  queryDatabase(query, params, callback);
}

var getTopGames = function(callback) { 
  var query = "SELECT * from games WHERE occurances > 1 ORDER BY occurances DESC LIMIT 10";
  var params = [ ];
  queryDatabase(query, params, callback);
}

function resetDB(callback) {
  console.log('reseeting DB!');
  var query = 'DROP TABLE if EXISTS users; CREATE TABLE users ( id bigint NOT NULL , PRIMARY KEY (ID)); DROP TABLE if EXISTS games; CREATE TABLE games (id int NOT NULL ,occurances integer NOT NULL, name varchar(255) NOT NULL, PRIMARY KEY (ID));'
  var params = [ ];
  queryDatabase(query, params, callback);
}
//mysql syntax: 
//  var query = `INSERT into Games (id, occurances, name) VALUES (321, 1 ,Game) ON DUPLICATE KEY UPDATE occurances = occurances + 1; INSERT INTO users (id) VALUES (123)`;
function populateDB(callback) {
  console.log('populating DB!');
  var query = `INSERT into games (id, occurances, name) VALUES (321, 1 ,'Game'); INSERT INTO users (id) VALUES (123)`;
  var params = [ ];
  queryDatabase(query, params, callback);
 
}

module.exports = {
  selectAll: selectAll,
  insertOne: insertOne,
  checkUser: checkUser,
  insertUser: insertUser,
  getTopGames : getTopGames,
  queryDatabase: queryDatabase,
  resetDB:resetDB,
  populateDB:populateDB
};
