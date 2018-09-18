

const Motor = require('./motor.js');
const Sender = require('./sender.js');
const Steering = require('./steering.js');

// Constructor
function Robot(address) {
  // always initialize all instance properties
  this.ip= address
  this.portleft = "C"
  this.portright ="D"
  this.portmini = "A"
  this.sensors = {};
  this.LeftMotor = new Motor(Sender,address,this.portleft,"big");
  this.RightMotor = new Motor(Sender,address,this.portright,"big");
  this.MiniMotor = new Motor(Sender,address,this.portmini,"medium");
  this.Steering = new Steering(Sender,address,this.LeftMotor,this.RightMotor);

}
// class methods
Robot.prototype.move = function(distance) {
  this.Steering.move(distance);
};
Robot.prototype.moveFor = function(time) {
  LeftMotor.moveFor(time);
  RightMotor.moveFor(time);
};
Robot.prototype.rotate = function(angle) {
  LeftMotor.rotate(angle);
  RightMotor.rotate(angle);
};
Robot.prototype.rotateFor = function(time) {
  LeftMotor.rotateFor(time);
  RightMotor.rotateFor(time);
};
Robot.prototype.run = function() {
  LeftMotor.run();
  RightMotor.run();
};
Robot.prototype.stop = function() {
  LeftMotor.stop();
  RightMotor.stop();
};



// export the class
module.exports = Robot;
