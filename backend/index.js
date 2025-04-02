const express = require("express");
const cors = require("cors");
const app = express();
const db = require("./config/db.js");

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.post("/api/v1/", (req, res) => {
  const { name, date } = req.body;
  const sql = `INSERT INTO timeline (name, date) VALUES (?, ?)`;
  db.run(sql, [name, date], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ id: this.lastID });
  });
});

app.get("/data", (req, res) => {
  const sql = `SELECT * FROM timeline`;
  db.all(sql, [], (err, rows) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(rows);
  });
});

app.get("/api/v1/:id", (req, res) => {
  const sql = `SELECT * FROM timeline WHERE ID = ?`;
  db.get(sql, [req.params.id], (err, row) => {
    if (err) {
      return console.error(err.message);
    }
    res.json(row);
  });
});

app.put("/api/v1/:id", (req, res) => {
  const { name, date } = req.body;
  const sql = `UPDATE timeline SET name = ?, date = ? WHERE ID = ?`;
  db.run(sql, [name, date, req.params.id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ changes: this.changes });
  });
});

app.delete("/api/v1/:id", (req, res) => {
  const sql = `DELETE FROM timeline WHERE ID = ?`;
  db.run(sql, [req.params.id], function (err) {
    if (err) {
      return console.error(err.message);
    }
    res.json({ changes: this.changes });
  });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
