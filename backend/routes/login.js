const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

router.post('/loginin', function(req, res){
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
                console.log({b: req.body})
                res.json({res: false});
            }else{
                res.json({res: true});
            }
        });
    });
        
        
});

module.exports = router;