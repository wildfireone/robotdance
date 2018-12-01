var Skynet = require('./robot.js');

var Robot = new Skynet('192.168.2.2');

Robot.move(100, 1);
Robot.rotate(100,"L");
Robot.rotate(100,-1);
