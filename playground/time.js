var moment = require("moment");


// // jab 1st 1970 00:00:00 am
// var date = new Date();
// console.log(date.getMonth());


// var date = moment().subtract(3, 'months');
// date.add(100,'years')
// console.log(date.format("MMM Do, YYYY"))


var date = moment();
console.log(date.format('hh:mm a'));
date = date.subtract(17, "hours").subtract(54 , "minutes");
console.log(date.format('h:mm a'));
