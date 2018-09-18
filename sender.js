
function sendCommand(command) {

  var commandstring = 'http://'+command.ip+":3000"+command.command;
  console.log(commandstring)
  //request(command,{},
  // (err, res, body) => {
  //   if (err) {
  //     return console.log(err);
  //   }
  //   if(command.currentcommand+1 < command.commands.length){
  //     command.currentcommand++;
  //     sendCommand(command);
  //   }
  // });
}

module.exports = sendCommand;
