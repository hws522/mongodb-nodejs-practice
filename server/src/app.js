const express = require("express");
const cors = require("cors");
const http = require('http');

const practiceCRUD = require('../router/practiceCRUD');
/**********************************************************/
const app = express();
const server = http.createServer(app);
/**********************************************************/
app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb' }));
app.use(cors());
app.use(practiceCRUD);
/**********************************************************/
app.post("/", (req, res) => {
  console.log("App is running");
});

module.exports = server;