const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const articleSchema = new Schema({
	title: {
		type: String,
		required: true,
	},
	body: String,
	numbersOfLikes: Number,
});

const Article = mongoose.model("Article", articleSchema);

module.exports = Article;
