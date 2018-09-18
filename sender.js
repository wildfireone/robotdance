
const request = require('request');

function sendCommand(command) {

  var commandstring = 'http://'+command.ip+":3000"+command.command;
  console.log(commandstring)
  request(commandstring,{},
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    console.log(res.body);
  });
}

module.exports = sendCommand;
