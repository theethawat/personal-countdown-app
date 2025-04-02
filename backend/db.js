const sqlite3 = require("sqlite3").verbose();
const filepath = "./data.db";
const fs = require("fs");

function createTable(db) {
  try {
    console.log("Creating table...");
    db.exec(`
      CREATE TABLE events
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name   VARCHAR(50) NOT NULL,
        date   DATE NOT NULL,
      );
    `);
    console.log("Table created successfully");
  } catch (error) {
    console.error("Error creating table:", error.message);
  }
}

function createDbConnection() {
  if (fs.existsSync(filepath)) {
    return new sqlite3.Database(filepath);
  } else {
    const db = new sqlite3.Database(filepath, (error) => {
      if (error) {
        return console.error(error.message);
      }
      createTable(db);
    });
    console.log("Connection with SQLite has been established");
    return db;
  }
}

module.exports = createDbConnection();
