var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require("../database-mysql");
var key = require("./steam_key");
var SteamApi = require('steam-api');
var request = require('request')

var getPlayerProfile = function(id, cb) {
  var SteamKey = process.env.STEAM_API_KEY;
  var user = new SteamApi.User(SteamKey, id);
  console.log('got a user object', user);
  var relationships = user.GetFriendList(optionalRelationship = 'all', optionalSteamId = '')
    .done(function(result){
    console.log('relationship query successful');
  });

  console.log('getting player summary from URL');
  var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${SteamKey}&steamids=${id}`

  request.get(url, function(error, steamHttpResponse, steamHttpBody) {
    // Print to console to prove we downloaded the achievements.
    console.log(steamHttpBody);
    cb(steamHttpBody);
});
console.log('done call');

  //
  // console.log(relationships);
};

module.exports = {
  getPlayerProfile: getPlayerProfile,
  // api_post: api_post
};
