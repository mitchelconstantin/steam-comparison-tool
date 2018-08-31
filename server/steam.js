var express = require("express");
var bodyParser = require("body-parser");
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require("../database-mysql");
var SteamApi = require("steam-api");
var request = require("request");
var KEY = process.env.STEAM_API_KEY;

var getPlayerRelationships = function(id, cb) {
  var user = new SteamApi.User(KEY, id);
  console.log("got a user object", user);
  var relationships = user
    .GetFriendList((optionalRelationship = "all"), (optionalSteamId = ""))
    .done(function(result) {
      console.log("relationship query successful");
    });
};

var getPlayerID = function(name, cb) {
  //my url https://steamcommunity.com/id/mitchelconstantin
  // get ID by vanity url:
  // http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=33A2CF357B0BEAAB1F5F24200AAA55CE&vanityurl=mitchelconstantin
  var url = `http://api.steampowered.com/ISteamUser/ResolveVanityURL/v0001/?key=${KEY}&vanityurl=${name}`;
  
  request.get(url, function(err, steamHttpResponse, steamHttpBody) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, steamHttpBody);
    }
  }); 
};

var getPlayerProfile = function(id, cb) {
  // creating URL to query Steam API
  var url = `http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=${KEY}&steamids=${id}`;

  request.get(url, function(err, steamHttpResponse, steamHttpBody) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, steamHttpBody);
    }
  });
};

//
var getPlayerGames = function(id, cb) {
  // creating URL to query Steam API
  var url = `http://api.steampowered.com/IPlayerService/GetOwnedGames/v0001/?key=${KEY}&steamid=${id}&include_appinfo=1`;

  request.get(url, function(err, steamHttpResponse, steamHttpBody) {
    if (err) {
      cb(err, null);
    } else {
      cb(null, steamHttpBody);
    }
  });
};

var getGameNames = function (id, cb) {


}

module.exports = {
  getPlayerProfile: getPlayerProfile,
  getPlayerID:getPlayerID,
  getPlayerRelationships:getPlayerRelationships,
  getPlayerGames:getPlayerGames
};
