const expect  = require("expect");
const {Users} = require("./users");

describe("Users", () => {
  var users;
  beforeEach(() =>  {
    users = new Users();
    users.users = [
      {
       id: "1",
       name: "Mike",
       room: "node"
      },
      {
       id: "2",
       name: "Maria",
       room: "node"
      },
      {
       id: "3",
       name: "Matos",
       room: "angular"
      }];
  });

  it("Should add new user", () => {
   var users = new Users();
   var user = {
      id: 123,
      name: "serge",
      room: "Noders"
   };
   var resUser = users.addUser(user.id, user.name, user.room) ;
   expect(users.users).toEqual([user]);
 });

 it("Should return names for node", () => {
  var userList = users.getUserList("node");
  expect(userList).toEqual(["Mike", "Maria"]);
 });

 it("Should return names for angular", () => {
  var userList = users.getUserList("angular");
  expect(userList).toEqual(["Matos"]);
 });

 it("Should remove a user", () => {
   var userId = "1";
   var user = users.removeUser(userId);
   expect(user.id).toBe(userId);
   expect(users.users.length).toBe(2);
 });

 it("Should not remove a user", () => {
   var userId = "99";
   var user = users.removeUser(userId);

   expect(user).toNotExist();
   expect(users.users.length).toBe(3);

 });

 it("Should find user", () => {
   var userId = "2";
   var user = users.getUser(userId);
   expect(user.id).toBe(userId);
 })
 it("Should find not user", () => {
   var userId = "299";
   var user = users.getUser(userId);
   expect(user).toNotExist();

 })



});
