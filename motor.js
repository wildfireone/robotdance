



// Constructor
function Motor(address,port, type) {
  // always initialize all instance properties
  this.address = address;
  this.type = type;
  this.port = port; // default value
  this.currentSpeed = 2;

}
// class methods
Motor.prototype.move = function(distance) {

};
Motor.prototype.moveFor = function(time) {

};
Motor.prototype.rotate = function(distance) {

};
Motor.prototype.rotateFor = function(time) {

};
Motor.prototype.run = function() {

};
Motor.prototype.stop = function() {

};

// export the class
module.exports = Motor;
