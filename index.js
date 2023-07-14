const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv").config();
const cors = require("cors");
const authController = require("./controllers/authController");

// ℹ️ Connects to the database
require("./db");

const app = express();

app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use("/auth", authController);

const PORT = 4000;

app.get("/test", (req, res) => {
  res.send("Hello world");
});

app.listen(PORT, () => {
  console.log(`App is Running on Port ${PORT}....`);
});
