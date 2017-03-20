const express  = require("express");
const path     = require("path");
const http     = require("http");
const socketIO = require("socket.io");

const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

var app   =  express();
var server = http.createServer( app );
var io     = socketIO(server);


app.use(express.static(publicPath))

io.on("connection", (socket) => {
  console.log("New user connected");

socket.emit("newMessage", {
    from: "sergio",
    text: "See you then.",
    createdAt: 123
});

socket.on("createMessage", (newMessage) => {
  console.log("Server Creating a new message: ", newMessage)
})


  socket.on("disconnect", () => {
  console.log("User disconnected")
  });
});




server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
