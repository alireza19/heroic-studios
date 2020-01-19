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

router.get('/loginin', function(req, res){
    if(req.body.email == "" || typeof req.body.email === "undefined"){
        res.json({res:false});
        return;
    }

    if(req.body.pass == "" || typeof req.body.pass === "undefined"){
        res.json({res:false});
        return;
    }

    MongoClient.connect(url, function(err, db) {
        if (err) throw err;
        var dbo = db.db("mydb");
        dbo.collection("customers").findOne({email: req.body.email, password: req.body.pass})
        .then(result => {
            if(!result){
                res.json({res: false});
                console.log({b: req.body})
            }else{
                res.json({res: true});
            }
            // console.log(result);
        });
    });
        
        
});

module.exports = router;