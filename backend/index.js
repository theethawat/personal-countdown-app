const express = require("express");
const cors = require("cors");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.get("/data", (req, res) => {
  res.json({ message: "Hello from the backend!" });
});

app.listen(8000, () => {
  console.log("Server is running on port 8000");
});
