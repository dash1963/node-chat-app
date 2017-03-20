
   var socket = io();
     socket.on("connect", function (){
       console.log("Connected to server");

     socket.emit("createMessage", {
       from: "Sergio4234@msn.com",
       text: "Client: Creating a new message"
     });

     });

     socket.on("disconnect", function() {
       console.log("Disconnected from server!")
     });

     socket.on("newMessage", function (newMessage) {
       console.log("Client creating a new message: ", newMessage);
     });
