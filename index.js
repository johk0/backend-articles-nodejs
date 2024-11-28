const express = require("express");
const mongoose = require("mongoose");

const app = express();
const Article = require("./models/Article");
app.use(express.json());

mongoose
	.connect(
		"mongodb+srv://johk:01127806612%40j@cluster0.vw8be.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
	)
	.then(() => {
		console.log("Connected to the database");
	})
	.catch((err) => {
		console.log("Failed to connect to the database", err);
	});
// mongodb+srv://johk:01127806612@j@cluster0.vw8be.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0

app.listen(3000, () => {
	console.log("Server is running on port 3000");
});

app.get("/", (req, res) => {
	res.send("Welcome to the home page");
});
app.get("/hello", (req, res) => {
	res.send("<h1>Hello World!</h1>");
});
app.get("/test", (req, res) => {
	res.send("Test");
});
app.get("/hi", (req, res) => {
	res.send("Hi there!");
});

app.get("/numbers", (req, res) => {
	let numbers = "";
	for (let i = 1; i <= 100; i++) {
		numbers += i + (i === 100 ? "" : " - ");
	}
	// res.send(`Numbers: ${numbers}`);
	// res.send(__dirname);
	// res.sendFile(__dirname + "/views/numbers.html");
	res.render("numbers.ejs", {
		name: "youssef",
		numbers: numbers,
	});
});

app.post("/addComment", (req, res) => {
	res.send("try to add Comment ");
});

// path parameters
app.post("/sum/:num1/:num2", (req, res) => {
	console.log(req.params);
	let { num1, num2 } = req.params;
	let a = parseInt(num1);
	let b = parseInt(num2);
	let sum = a + b;
	res.send(`Sum is a ${sum}`);
});

// body and query parameters
app.post("/sayHello", (req, res) => {
	console.log("body", req.body);
	console.log("query", req.query);

	res.send(`<h1>Hello ${req.body.name} your age is ${req.query.age} </h1>`);
});

// json response
app.post("/userData", (req, res) => {
	console.log("body", req.body);
	console.log("query", req.query);

	res.json({
		name: req.body.name,
		state: true,
		age: req.query.age, // if no is a query will not be shown
	});
});

// ========== Article ==========
app.post("/articles", async (req, res) => {
	const { title, body } = req.body;
	const newArticle = new Article({
		title: title,
		body: body,
		numbersOfLikes: 0,
	});
	await newArticle.save();
	res.send("the article has been added successfully");
});

app.get("/articles", async (req, res) => {
	const articles = await Article.find();
	console.log(articles);
	res.json(articles);
	// res.status(500).send("Internal server error");
});

app.get("/articles/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const article = await Article.findById(id);
		res.json(article);
	} catch (error) {
		res.status(500).send("Internal server error");
	}
});

app.delete("/articles/:id", async (req, res) => {
	const id = req.params.id;
	try {
		const article = await Article.findByIdAndDelete(id);
		res.json(article);
	} catch (error) {
		res.status(500).send("Internal server error");
	}
});

app.get("/showArticles", async (req, res) => {
	try {
		const articles = await Article.find();

		res.render("articles.ejs", {
			articles: articles,
		});
	} catch (error) {
		res.status(500).send("Internal server error");
	}
});
