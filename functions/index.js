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

const userSchema = new Schema({
	userId: Number,
	firstName: String,
	lastName: String,
	userName: String,
	email: String,
	userProfileImageURL: String,
	userWaifus: Array,
	userJoined: Date,
	password: String,
	deleted: Boolean,
	locked: Boolean,
});

const Waifu = mongoose.model("Waifu", waifuSchemaShort);

const User = mongoose.model("User", userSchema);

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

app.get("/api/v1/waifus", (req, res) => {
	res.set("Cache-Control", "public, max-age=300, s-maxage=600");
	Waifu.find({}, (err, foundWaifus) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundWaifus);
		}
	});
});

app.get("/api/v1/users/:userId", (req, res) => {
	let userId = req.params.userId;
	User.find({ userId: userId }, (err, foundUser) => {
		if (err) {
			res.send(err);
		} else {
			res.send(foundUser);
		}
	});
});

exports.app = functions.https.onRequest(app);
