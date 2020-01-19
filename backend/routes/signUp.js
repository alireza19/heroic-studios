const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

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

router.get('/signUp', function(req, res){
    res.json({res: true});
});

module.exports = router;