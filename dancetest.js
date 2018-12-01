/**
 * @Author: John Isaacs <john>
 * @Date:   30-Aug-182018
 * @Filename: dancetest.js
 * @Last modified by:   john
 * @Last modified time: 30-Aug-182018
 */



const request = require('request');



//ipaddresses of each robot.
var robots = ["192.168.2.2", "192.168.2.3"];
//will end up being a multidimensional array robot,currentcommand, commands[]
var commandset = []

var simpledance =[]
simpledance.push("/drive?portL=B&portR=C&time=3000&speed=2");
//simpledance.push("/drive?portL=B&portR=C&time=2500&speed=2");
//simpledance.push("/drive?portL=B&portR=C&time=500&direction=left");

commandset.push({robot:0,currentcommand:0,commands:simpledance});
commandset.push({robot:1,currentcommand:0,commands:simpledance});
commandset.forEach(function(c) {
  sendCommand(c);
});

function sendCommand(command) {
  var commandstring = 'http://'+robots[command.robot]+":3000"+command.commands[command.currentcommand];
  console.log(commandstring)
  request(commandstring,{},
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
