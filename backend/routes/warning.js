const express = require('express');
const router = express.Router();
var db = require("../db");
const { Expo } = require('expo-server-sdk');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
let expo = new Expo();
var distanceLIMIT = 400;

router.get('/warning', function(req, res){
    // db.newWarning(53.525870,-113.518612,"CPR", new Date(), "akfatih2@gmail.com" );
    db.newWarning(req.body.lat,req.body.long,req.body.type, new Date(), req.body.email );

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result);
            result.map(person => {
                console.log(person.lat);
                console.log(person.long);
                console.log(req.body.lat);
                console.log(req.body.long);

                var currentDist = calcCrow(person.lat, person.long, req.body.lat, req.body.long)*1000;
                console.log(person.name+ ":" + currentDist);
                if(currentDist < distanceLIMIT){
                    // Send the push not
                    var pushToken = person.expoToken;
                    if (!Expo.isExpoPushToken(pushToken)) {
                        console.error(`Push token ${pushToken} is not a valid Expo push token`);
                        // continue;
                    }else{
                        console.log("Valid token.");
                    }
                    var message = {
                        to: pushToken,
                        sound: 'default',
                        body: 'Someone is in danger',
                        data: { withSome: 'data' },
                    }
                    expo.sendPushNotificationsAsync(message);
                }
            });
            db.close();
        });
    });
    res.json({res:true});
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