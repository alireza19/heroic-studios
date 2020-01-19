const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     console.log("Database created!");
//     db.close();
// });

// MongoClient.connect(url, function(err, db) {
//     if (err) throw err;
//     var dbo = db.db("mydb");
//     dbo.createCollection("customers", function(err, res) {
//         if (err) throw err;
//         console.log("Collection created!");
//         db.close();
//     });
// });

router.post('/updateLoc', function(req, res){
    console.log({lat: req.body.lat});
    console.log({long: req.body.long});
    console.log({req.body.email});
    MongoClient.connect(url, function(err, db) {
        if (err){
            res.json({res:false});
            throw err;
        }

        var dbo = db.db("mydb");

        var myquery = {email: req.body.email}
        var newvalues = { $set: {long: req.body.long, lat: req.body.lat} };
        dbo.collection("customers").updateOne(myquery, newvalues)
        .then(result => {
            res.json({res: true});
        }).catch(err => {
            res.json({res:false});
            throw err;
        })
    });
        
        
});

module.exports = router;