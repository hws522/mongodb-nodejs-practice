import express from 'express';
import practiceCRUD from './router/practiceCRUD';
/**********************************************************/
const app = express()
/**********************************************************/
app.use(practiceCRUD);
/**********************************************************/
app.post("/", (req, res) => {
  console.log("App is running");
  res.send("HELLO!");
});