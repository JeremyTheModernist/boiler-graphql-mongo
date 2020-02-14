const mongoose = require("mongoose");

module.exports = () => {
	return mongoose
		.connect(`mongodb://localhost:27017/graphMongo`, {
			useNewUrlParser: true,
			useUnifiedTopology: true
		})
		.then(() =>
			console.log("successfully connected your mongoose instance")
		)
		.catch(() => {
			console.log("hit an error trying to connect");
		});
};
