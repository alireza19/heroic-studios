const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

router.get('/everythingOkay', function(req, res){
    // MongoClient.connect(url, function(err, db) {
    //     if (err) throw err;

    //     var dbo = db.db("mydb");

    //     dbo.collection("customers").insertOne({
    //         name: req.body.name,
    //         lastname: req.body.lastname,
    //         email: req.body.email, 
    //         password: req.body.password,
    //         pros:[]
    //     })
    //     .then(result => {
    //         console.log(result);
    //         res.json({res:true})
    //         // console.log(result);
    //     });
    // });
    res.json({
        res:true,
        long: -113.47,
        lat: 53.55,
        phone: '7804341212'
    });
});

module.exports = router;