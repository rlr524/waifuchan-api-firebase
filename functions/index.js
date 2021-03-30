const functions = require("firebase-functions");

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//   functions.logger.info("Hello logs!", {structuredData: true});
//   response.send("Hello from Firebase!");
// });

const express = require("express");
const cors = require("cors")({ origin: true });
const app = express();
const bodyParser = require("body-parser");
require("./initDB")();
const mongoose = require("mongoose");
// const _ = require("lodash");
const Schema = mongoose.Schema;

app.use(cors);
app.use(bodyParser.urlencoded({ extended: true }));

const waifuSchemaShort = new Schema({
	waifuId: Number,
	fullNameEn: String,
	animeMainSeries: String,
	profileImageURL: String,
	deleted: Boolean,
});

const Waifu = mongoose.model("Waifu", waifuSchemaShort);

app.get("/", (req, res) => {
	const date = new Date();
	const hours = (date.getHours() % 12) + 1; // London is UTC + 1hr;
	res.send(`
      <!doctype html>
      <head>
        <title>Time</title>
        <link rel="stylesheet" href="/style.css">
        <script src="/script.js"></script>
      </head>
      <body>
        <p>In London, the clock strikes:
          <span id="bongs">${"BONG ".repeat(hours)}</span></p>
        <button onClick="refresh(this)">Refresh</button>
      </body>
    </html>`);
});

app.get("/waifus", (req, res) => {
	Waifu.find({}, (err, foundWaifus) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundWaifus);
		}
	});
});

exports.app = functions.https.onRequest(app);
