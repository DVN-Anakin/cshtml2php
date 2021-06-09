const express = require("express");
const router = express.Router();
const controller = require("../controller/file.controller");
const bodyParser = require('body-parser');

let routes = (app) => {
    router.post("/upload", controller.upload);
    router.get("/files", controller.getListFiles);
    router.get("/files/:name", controller.download);

    app.use(bodyParser.json());
    app.use('/.netlify/functions/server', router);  // path must route to lambda
    // app.use('/', (req, res) => res.sendFile(path.join(__dirname, '../index.html')));
};

module.exports = routes;