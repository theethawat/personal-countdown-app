const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./db.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/v1/events/", (req, res) => {
  const { name, date } = req.body;
  const sql = `INSERT INTO events (name, date) VALUES (?, ?)`;
  db.run(sql, [name, date], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id: this.lastID });
  });
});

app.get("/api/v1/events/", (req, res) => {
  const sql = `SELECT * FROM events`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.get("/api/v1/events/:id", (req, res) => {
  const sql = `SELECT * FROM events WHERE ID = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row);
  });
});

app.put("/api/v1/events/:id", (req, res) => {
  const { name, date } = req.body;
  const sql = `UPDATE events SET name = ?, date = ? WHERE ID = ?`;
  db.run(sql, [name, date, req.params.id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/api/v1/events/:id", (req, res) => {
  const sql = `DELETE FROM events WHERE ID = ?`;
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ changes: this.changes });
  });
});

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/api/v1/", (req, res) => {
  res.json({ message: "API Path is work" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
