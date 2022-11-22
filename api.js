const express = require("express");
const bodyParser = require("body-parser");

const client = require("./connection");
const { application } = require("express");
const app = express();

app.use(bodyParser.json());

app.listen(5000, () => {
	console.log("Server running in port 5000");
});

client.connect((err) => {
	if (err) {
		console.log(err.message);
	} else {
		console.log("Connected");
	}
});

//GET --> Ambil data
app.get("/books", (req, res) => {
	client.query("Select * from books", (err, result) => {
		if (!err) {
			res.send(result.rows);
		}
	});
});

//POST --> Tambah data
app.post("/books", (req, res) => {
	const { title, description, author } = req.body;

	client.query(
		`insert into books(title,description,author)values('${title}','${description}','${author}')`,
		(err, result) => {
			if (!err) {
				res.send("Insert Success");
			} else {
				res.send(err.message);
				console.log(asdsad);
			}
		}
	);
});

//PUT --> Update data
app.put("/books/:id", (req, res) => {
	const { title, description, author } = req.body;

	client.query(
		`update books set title = '${title}', description = '${description}', author ='${author}' where id = '${req.params.id}'`,
		(err, result) => {
			if (!err) {
				res.send("Update Success");
			} else {
				res.send(err.message);
			}
		}
	);
});

//DELETE --> Menghapus data
app.delete("/books/:id", (req, res) => {
	client.query(
		`delete from books where id = ${req.params.id} `,
		(err, result) => {
			if (!err) {
				res.send("Delete Success");
			} else {
				res.send(err.message);
			}
		}
	);
});
