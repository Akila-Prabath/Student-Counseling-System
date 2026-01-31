const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const cors = require("cors");
const dotenv = require("dotenv");
const app = express()

dotenv.config();

const  PORT = process.env.PORT || 8070;

app.use(cors());
app.use(bodyParser.json());

const URI = process.env.MONGODB_URI;

mongoose.connect(URI)
  .then(() => {
    console.log("MongoDB connection success!");
  })
  .catch((err) => {
    console.log("MongoDB connection error:", err);
  });

app.listen(PORT, () => {
    console.log(`Server is up and running on port number: ${PORT}`)
});
