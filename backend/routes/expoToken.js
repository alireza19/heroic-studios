const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017";

/**
 * email
 */
router.post('/expoToken', function(req, res){
    
    MongoClient.connect(url, function(err, db) {
        if (err){
            res.json({res:false});
            throw err;
        }

        var dbo = db.db("mydb");

        var myquery = {email: req.body.email}
        var newvalues = { $set: {expoToken: req.body.token} };
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