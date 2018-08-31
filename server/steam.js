var express = require('express');
var bodyParser = require('body-parser');
// UNCOMMENT THE DATABASE YOU'D LIKE TO USE
var items = require('../database-mysql');
var key = require ('./steam_key')


//http://api.steampowered.com/ISteamUser/GetP
//layerSummaries/v0002/?key=33A2CF357B0BEAAB1F5F24200AAA55CE&steamids=76561197960435530

var steamGet = function (){
get ('http://api.steampowered.com/ISteamUser/GetPlayerSummaries/v0002/?key=33A2CF357B0BEAAB1F5F24200AAA55CE&steamids=76561197960435530')
}



module.exports = {
  api_get: api_get,
  api_post: api_post,
};
