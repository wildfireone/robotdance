var Skynet = require('./robot.js');

var Robot = new Skynet('192.168.2.2');

Robot.move(1000, 1);
Robot.turn(100,"L");
Robot.move(1000,-1);
