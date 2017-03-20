const express = require("express");
const path    = require("path");

const port = process.env.PORT || 3000;
var app   =  express();

const publicPath = path.join(__dirname, "../public");
app.use(express.static(publicPath))

app.get('/', function (req, res) {
  res.send(publicPath)
})

app.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
