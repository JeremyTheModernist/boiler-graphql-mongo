const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const PostSchema = new Schema({
	title: String,
	description: String,
	author: String
});

//  GraphQL does the referring for you so you don't need to reference other schema types in here, just
// use one identifying factor

// const PostSchema = new Schema({
// 	title: String,
// 	description: String,
// 	author: {
// 		type: Schema.Types.ObjectId,
// 		ref: "Author"
// 	}
// });

module.exports = mongoose.model("Post", PostSchema);
