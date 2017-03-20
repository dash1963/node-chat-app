const express = require("express");
const path    = require("path");

const port = Process.env.PORT || 3000;
var app   =  express();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath))

app.get('/', function (req, res) {
  res.send(publicPath)
})

app.listen(PORT, function () {
  console.log(`Example app listening on port ${PORT}!`)
})
