const express = require("express");
const http = require('http');
const practiceCRUD = require('../router/practiceCRUD');
/**********************************************************/
const app = express();
const server = http.createServer(app);
/**********************************************************/
app.use(practiceCRUD);
/**********************************************************/
app.post("/", (req, res) => {
  console.log("App is running");
});

module.exports = server;