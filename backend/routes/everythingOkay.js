const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var db = require("../db");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

router.get('/everythingOkay', function(req, res){
    var long = req.body.long;
    var lat = req.body.lat;

    console.log(req.body.long);
    console.log(req.body.lat);

    var foundWarnings = db.getWarnings();

    console.log("Warnings:");
    console.log(foundWarnings)

    var indexSmallest = -1;
    var smallestDist = 99999999;
    for(var i = 0; i < foundWarnings.length; i++){

        var currentDist = calcCrow(req.body.long,req.body.lat, foundWarnings[i].lat, foundWarnings[i].long)*1000;
        console.log("c:" + currentDist);
        if(currentDist < smallestDist){
            indexSmallest = i;
            smallestDist = currentDist;
        }
    }
    console.log(smallestDist);
    // console.log();
    if(indexSmallest < 0){
        res.json({res:false});
        return;
    }
    res.json({warning: foundWarnings[indexSmallest]});
});

//This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
function calcCrow(lat1, lon1, lat2, lon2) 
{
    var R = 6371; // km
    var dLat = toRad(lat2-lat1);
    var dLon = toRad(lon2-lon1);
    var lat1 = toRad(lat1);
    var lat2 = toRad(lat2);

    var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.sin(dLon/2) * Math.sin(dLon/2) * Math.cos(lat1) * Math.cos(lat2); 
    var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
    var d = R * c;
    return d;
}

// Converts numeric degrees to radians
function toRad(Value) 
{
    return Value * Math.PI / 180;
}

module.exports = router;