const { connect, connection } = require("mongoose");
const functions = require("firebase-functions");

module.exports = () => {
	const dbName = functions.config().mongo.dbname;
	const user = functions.config().mongo.dbuser;
	const pass = functions.config().mongo.dbpass;
	const uri = `mongodb+srv://${user}:${pass}@cluster0.mdczd.mongodb.net/${dbName}?retryWrites=true&w=majority`;

	connect(uri, {
		useNewUrlParser: true,
		useUnifiedTopology: true,
		useFindAndModify: false,
		useCreateIndex: true,
	})
		.then(() => {
			console.log("Connection established with MongoDB");
		})
		.catch((error) => console.error(error.message));

	connection.on("connected", () => {
		console.log("Mongoose connected to DB Cluster");
	});
};
