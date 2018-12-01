// Constructor
function Steering(sender,address,LeftMotor, RightMotor) {
  // always initialize all instance properties
  this.address = address;
  this.currentSpeed = 2;
  this.leftPort = LeftMotor.port;
  this.rightPort = RightMotor.port;
  this.sender =sender

}
// class methods
Steering.prototype.move = function(distance) {

var commandString  = "/drive?"
                    +"portL="+this.leftPort
                    +"&portR="+this.rightPort
                    +"&distance="+distance
                    +"&speed="+this.currentSpeed

  var command = {ip:this.address,
                command:commandString
                }
  this.sender(command);
};
// class methods
Steering.prototype.move = function(distance,direction) {

var commandString  = "/drive?"
                    +"portL="+this.leftPort
                    +"&portR="+this.rightPort
                    +"&distance="+distance
                    +"&speed="+this.currentSpeed
                    +"&direction="+direction

  var command = {ip:this.address,
                command:commandString
                }
  this.sender(command);
};
Steering.prototype.moveFor = function(time) {
  var commandString  = "/driveTime?"
                      +"portL="+this.leftPort
                      +"&portR="+this.rightPort
                      +"&time="+time
                      +"&speed="+this.currentSpeed

    var command = {ip:this.address,
                  command:commandString
                  }
    this.sender(command);

};
Steering.prototype.rotate = function(direction) {
  var commandString  = "/driveRotate?"
                      +"portL="+this.leftPort
                      +"&portR="+this.rightPort
                      +"&distance="+distance
                      +"&speed="+this.currentSpeed
                      +"&direction="+direction

    var command = {ip:this.address,
                  command:commandString
                  }
    this.sender(command);

};
Steering.prototype.rotateFor = function(time) {
  var commandString  = "/driveTimeRotate?"
                      +"portL="+this.leftPort
                      +"&portR="+this.rightPort
                      +"&time="+time
                      +"&speed="+this.currentSpeed

    var command = {ip:this.address,
                  command:commandString
                  }
    this.sender(command);

};
Steering.prototype.run = function() {
  var commandString  = "/driveRun?"
                      +"portL="+this.leftPort
                      +"&portR="+this.rightPort

    var command = {ip:this.address,
                  command:commandString
                  }
    this.sender(command);
};
Steering.prototype.stop = function() {
  var commandString  = "/driveStop?"
                      +"portL="+this.leftPort
                      +"&portR="+this.rightPort

    var command = {ip:this.address,
                  command:commandString
                  }
    this.sender(command);
};

// export the class
module.exports = Steering;
