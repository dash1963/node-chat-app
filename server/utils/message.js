var moment = require("moment");


generateMessage = (from , text) => {
  return {
    from,
    text,
    createdAt: moment().valueOf()
  };
};
//createdAt: new Date().getTime()

var generateLocationMessage = (from, latitude, longitude) => {
  
  var rec = {
   from,
   url: `https://www.google.com/maps?q=${latitude},${longitude}` ,
  createdAt: moment().valueOf()
  };
  return rec;
};


module.exports = {
  generateMessage : generateMessage,
  generateLocationMessage : generateLocationMessage
};
