const express = require("express");
const middleware = require("./middleware");
const connectDB = require("./connectDB");
const mongoose = require("mongoose");

const app = express();

app.listen("3262", () => {
	console.log("running your app on port 3262");
});
connectDB();
mongoose.connection.once("open", () => {
	console.log("connection opened with mongoose");
});

middleware(app);

//  just to have something set up at the root url
app.use(express.static("public"));
