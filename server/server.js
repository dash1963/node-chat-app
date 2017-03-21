const express  = require("express");
const path     = require("path");
const http     = require("http");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");


const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

var app   =  express();
var server = http.createServer( app );
var io     = socketIO(server);


app.use(express.static(publicPath))

io.on("connection", (socket) => {
  console.log("New user connected");

socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App"));
socket.broadcast.emit("newMessage", generateMessage("Admin","New user joined"));

socket.on("createMessage", (message, callback) => {
  console.log("Server Creating a new message: ", message);
  io.emit("newMessage", generateMessage(message.from, message.text));
  callback("This is from the server");
});

socket.on("createLocationMessage", (coords) => {
  io.emit("newLocationMessage", generateLocationMessage("Admin",
                                                coords.latitude,
                                                coords.longitude ));
});

  socket.on("disconnect", () => {
  console.log("User disconnected")
  });
});




server.listen(port, function () {
  console.log(`Example app listening on port ${port}!`)
})
