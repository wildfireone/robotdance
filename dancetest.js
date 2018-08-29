const request = require('request');



//ipaddresses of each robot.
var robots = [];
//will end up being a multidimensional array robot,currentcommand, commands[]
var commandset = []

var simple_dance =[]
simpledance.push("/drive?time=3000&speed=-2");
simpledance.push("/drive?time=2500&speed=2");
simpledance.push("/drive?time=500&direction=left");

commandset.push({robot:0,currentcommand:0,commands:simpledance});
commandset.push({robot:1,currentcommand:0,commands:simpledance});
commandset.forEach(function(c) {
  sendCommand(c);
});

function sendCommand(command) {
  request('https://'+robots[command.robot]+command.commands[command.currentcommand],
  (err, res, body) => {
    if (err) {
      return console.log(err);
    }
    if(command.currentcommand+1 < command.commands.length){
      command.currentcommand++;
      sendCommand(command);
    }
  });
}
