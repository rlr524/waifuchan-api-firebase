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
	res.status(200).send(`<!doctype html>
	<head>
	<title>Waifuchan web service</title>
	</head>
	<body>
	<h2>"The <em>/waifus</em> route provides full access.</h2>
	</body>
	</html>`);
});

app.get("/waifus", (req, res) => {
	res.set("Cache-Control", "public, max-age=300, s-maxage=600");
	Waifu.find({}, (err, foundWaifus) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundWaifus);
		}
	});
});

exports.app = functions.https.onRequest(app);
