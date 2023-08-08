const express = require("express");
const mongoose = require("mongoose");
const CountryModel = require("./CountrySchema");
const cors = require("cors");
require("dotenv").config();
const app = express();
const port = process.env.PORT || 3000;
const dbUri = process.env.DB_URI || 3000;

app.use(
  cors({
    origin: "*",
  })
);

const allowCors = (fn) => async (req, res) => {
  res.setHeader("Access-Control-Allow-Credentials", true);
  res.setHeader("Access-Control-Allow-Origin", "*");
  // another common pattern
  // res.setHeader('Access-Control-Allow-Origin', req.headers.origin);
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET,OPTIONS,PATCH,DELETE,POST,PUT"
  );
  res.setHeader(
    "Access-Control-Allow-Headers",
    "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version"
  );
  if (req.method === "OPTIONS") {
    res.status(200).end();
    return;
  }
  return await fn(req, res);
};

const handler = (req, res) => {
  const d = new Date();
  res.end(d.toString());
};

allowCors(handler);

const mongoURI = dbUri;
const dbName = "world";

mongoose
  .connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.log("Error connecting to MongoDB Atlas:", error);
  });

app.get("/world/:country", async (req, res) => {
  const result = await CountryModel.find({});

  res.send(result);
});

app.get("/", async (req, res) => {
  res.send("<h1>Welcome to the world api!!</h1>");
});

// app.get("/update", async (req, res) => {
//   const result = await CountryModel.updateMany(
//     {},
//     { $rename: { "property with spaces": "propertyWithoutSpaces" } }
//   );

//   res.send(result);
// });

app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
