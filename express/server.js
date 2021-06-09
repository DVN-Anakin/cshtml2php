'use strict';
const express = require('express');
const cors = require("cors");
const path = require('path');
const serverless = require('serverless-http');
const app = express();
// const fileUpload = require('express-fileupload');
const shell = require('shelljs')

const router = express.Router();

global.__basedir = __dirname;

// var corsOptions = {
//   origin: "http://localhost:8081"
// };
// app.use(cors(corsOptions));
app.use(cors());

const initRoutes = require("./routes");

app.use(express.urlencoded({ extended: true }));
initRoutes(app);

// app.use(bodyParser.json());
// app.use('/.netlify/functions/server', router);  // path must route to lambda
// app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));

module.exports = app;
module.exports.handler = serverless(app);
