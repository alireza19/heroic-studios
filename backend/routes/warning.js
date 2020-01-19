const express = require('express');
const router = express.Router();
var mongo = require('mongodb');

var db = require("../db");

var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/mydb";

router.get('/warning', function(req, res){

    // db.newWarning(53.525870,-113.518612,"CPR", new Date(), "akfatih2@gmail.com" );
    db.newWarning(req.body.lat,req.body.long,req.body.type, new Date(), req.body.email );
    res.json({res:true});
});

module.exports = router;