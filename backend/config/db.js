const sqlite3 = require("sqlite3").verbose();
const filepath = "../volume/data.db";

function createTable(db) {
  db.exec(`
      CREATE TABLE  IF NOT EXISTS  timeline
      (
        ID INTEGER PRIMARY KEY AUTOINCREMENT,
        name   VARCHAR(50) NOT NULL,
        date   DATE NOT NULL,
      );
    `);
}

function createDbConnection() {
  const db = new sqlite3.Database(filepath, (error) => {
    if (error) {
      return console.error(error.message);
    }
    createTable(db);
  });
  console.log("Connection with SQLite has been established");
  return db;
}

module.exports = createDbConnection();
