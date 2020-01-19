const express = require('express');
const router = express.Router();
var db = require("../db");
const { Expo } = require('expo-server-sdk');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";
let expo = new Expo();
var distanceLIMIT = 2000;

router.post('/coming', function(req, res){
    // db.newWarning(53.525870,-113.518612,"CPR", new Date(), "akfatih2@gmail.com" );
    // db.newWarning(req.body.lat,req.body.long,req.body.type, new Date(), req.body.email );
    console.log("INPUT:");
    console.log(req.body);
    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").findOne({email:req.body.email})
        .then(result => {
            if(!result){
                res.json({res:false});
                return;
            }
            console.log(result);
            var messages = [];
            var somePushTokens = [];
            somePushTokens[somePushTokens.length] = req.body.token
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
                    body: result.name + " is coming",
                    data: { 
                        data:data
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
                } catch (error) {
                    console.error(error);
                }
            }
            })();
            res.json({res:true});
        });
    });
});


module.exports = router;