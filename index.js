const express = require("express");
app = express();
const port = 3080;

app.get("/", (req, res) => {
  res.send("hello world");
});

app.listen(port, () => {
  console.log("running server on 3080");
});
