const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Logger
const express = require('express'); // Server
const https = require('https'); // SSL 
const http = require('http');
const fs = require('fs'); // For reading example inputs
const path = require('path');
const helmet = require('helmet')
const {config} = require('./config');
const server = express();
const router = express.Router();

const signUp = require('./routes/signUp.js');
const login = require('./routes/login.js');

server.use(helmet());
server.use((req, res, next) => {
    bodyParser.json()(req, res, err => {
        if (err) {
            // console.error("Error in JSON: " + JSON.stringify(err));
            if(err.type == "entity.parse.failed"){
            //   console.log("Bad JSON syntax received.");
            }
            // if(err.code)
            return res.sendStatus(400); // Bad request
        }
        next();
    });
});
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use('/', router);
server.use(cors());

server.get('/signUp', signUp);
server.get('/loginin', login);

server.get('*', function(req, res){
    res.status(200).send('There is nothing here. This incident is reported.');
});

    http.createServer(server).listen(80);
    console.log("HTTP server has started on port " + 80);
