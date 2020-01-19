const express = require('express');
const router = express.Router();
// var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

var db = require('../db');

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

router.get('/loginin', function(req, res){
    // db.get().collection('customers').find({}).toArray()
	// .then((users) => {
    //         console.log('customers', users);
    // }).catch(() => {
        res.json({res: true});
    // })
});

module.exports = router;