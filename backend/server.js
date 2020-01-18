const bodyParser = require('body-parser');
const cors = require('cors');
const morgan = require('morgan'); // Logger
const express = require('express'); // Server
const https = require('https'); // SSL 
const http = require('http');
const fs = require('fs'); // For reading example inputs
const path = require('path');
// const rfs = require('rotating-file-stream');
const helmet = require('helmet')
const {config} = require('./config');
const server = express();
const router = express.Router();

server.use(helmet());
server.use(bodyParser.urlencoded({ extended: false }));
server.use(morgan('dev'));
server.use('/', router);
server.use(cors());

server.get('*', function(req, res){
    res.status(200).send('There is nothing here. This incident is reported.');
});

http.createServer(server).listen(80);
console.log("HTTP server has started on port " + 80);