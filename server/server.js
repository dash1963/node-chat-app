const express  = require("express");
const path     = require("path");
const http     = require("http");
const socketIO = require("socket.io");
const {generateMessage, generateLocationMessage} = require("./utils/message");
const {isRealString} = require("./utils/validation");
const {Users} = require("./utils/users");



const port = process.env.PORT || 3000;
const publicPath = path.join(__dirname, "../public");

var app   =  express();
var server = http.createServer( app );
var io     = socketIO(server);
var users  = new Users();


app.use(express.static(publicPath))

io.on("connection", (socket) => {
  console.log("New user connected");




socket.on("join", (params, callback) => {
  console.log(params.name);
  console.log(params.room);
  if (!isRealString(params.name)  || !isRealString(params.room)) {
    return callback("Name and room name are required.")
  }
socket.join(params.room);
users.removeUser(socket.id);
users.addUser(socket.id, params.name, params.room);


io.to(params.room).emit("updateUserList", users.getUserList(params.room));


                // socket.leave(params.room);

                // io.emit  -> io.to(params.room).emit
                // socket.broadcast.emit  -> socket.broadcast.to(params.room).emit
                // socket.emit

  socket.emit("newMessage",generateMessage("Admin","Welcome to the chat App"));
  socket.broadcast.to(params.room).emit("newMessage", generateMessage("Admin",`${params.name} has joined`));

  callback();
});





socket.on("createMessage", (message, callback) => {
  var user = users.getUser(socket.id);
  if (user && isRealString(message.text)) {
    io.to(user.room).emit("newMessage", generateMessage(user.name, message.text));
      //    io.emit("newMessage", generateMessage(message.from, message.text));
  }
  callback();
});

socket.on("createLocationMessage", (coords) => {
  var user = users.getUser(socket.id);
  if (user && isRealString(user.name)) {
    io.to(user.room).emit("newLocationMessage", generateLocationMessage(user.name, coords.latitude, coords.longitude ));
  };
});

  socket.on("disconnect", () => {
   var user = users.removeUser(socket.id);
   if (user) {
     io.to(user.room).emit("updateUserList", users.getUserList(user.room));
     io.to(user.room).emit("newMessage", generateMessage("Admin: ", `${user.name} has left`));
   }
  });
});




server.listen(port, function () {
  console.log(`Chat app listening on port ${port}!`)
})
