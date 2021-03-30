require("dotenv").config();
const { connect, connection } = require("mongoose");

module.exports = () => {
	const dbName = process.env.DB_NAME;
	const user = process.env.DB_USER;
	const pass = process.env.DB_PASS;
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
