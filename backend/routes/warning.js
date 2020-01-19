const express = require('express');
const router = express.Router();
var db = require("../db");
const { Expo } = require('expo-server-sdk');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
let expo = new Expo();
var distanceLIMIT = 2000;

router.post('/warning', function(req, res){
    // db.newWarning(53.525870,-113.518612,"CPR", new Date(), "akfatih2@gmail.com" );
    // db.newWarning(req.body.lat,req.body.long,req.body.type, new Date(), req.body.email );
    console.log("INPUT:");
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").find().toArray(function(err, result) {
            if (err) throw err;
            console.log(result);

            var messages = [];
            var somePushTokens = [];
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
                    somePushTokens[somePushTokens.length] = pushToken
                    
                }
            });
            console.log(somePushTokens);

            // Sending
            for (let pushToken of somePushTokens) {
                // Each push token looks like ExponentPushToken[xxxxxxxxxxxxxxxxxxxxxx]
                
                // Check that all your push tokens appear to be valid Expo push tokens
                if (!Expo.isExpoPushToken(pushToken)) {
                    console.error(`Push token ${pushToken} is not a valid Expo push token`);
                    continue;
                }
                
                // Construct a message (see https://docs.expo.io/versions/latest/guides/push-notifications.html)
                messages.push({
                    to: pushToken,
                    sound: 'default',
                    body: 'Someone needs ' + req.body.type,
                    data: { 
                        long: req.body.long,
                        lat: req.body.lat,
                    },
                })
                console.log(messages);
            }

            let chunks = expo.chunkPushNotifications(messages);
            let tickets = [];
            (async () => {
            // Send the chunks to the Expo push notification service. There are
            // different strategies you could use. A simple one is to send one chunk at a
            // time, which nicely spreads the load out over time:
            for (let chunk of chunks) {
                try {
                let ticketChunk = await expo.sendPushNotificationsAsync(chunk);
                console.log(ticketChunk);
                tickets.push(...ticketChunk);
                // NOTE: If a ticket contains an error code in ticket.details.error, you
                // must handle it appropriately. The error codes are listed in the Expo
                // documentation:
                // https://docs.expo.io/versions/latest/guides/push-notifications#response-format
                } catch (error) {
                console.error(error);
                }
            }
            })();



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