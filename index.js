const express = require('express')
const app = express()
const ev3dev = require('ev3dev-lang');


//?time=value_in_milliseconds&port=outputPort
app.get('/motorTime', function(req, res) {

  if (req.query.port || getPort(req.query.port)) {
    var motor = new ev3dev.Motor(getPort(req.query.port));
    var motortime = 1000;
    if (req.query.time) {
      motortime = parseInt(req.query.time)
    }
    if (motor.connected) {


      console.log(' Port: ' + motor.address);
      console.log(' Driver: ' + motor.driverName);
      console.log(' Available commands: ' + motor.commands);

      console.log('Sending motor command...');

      motor.rampUpSp = 100;
      motor.rampDownSp = 100;
      motor.runForTime(motortime, motor.maxSpeed / 2, motor.stopActionValues.brake);

      res.send('Completed')
    } else {
      console.log("No motor could be found. Are you sure that one is connected?");
      res.send('no motor on that port')
    }
  } else {
    res.send('no port supplied')
  }
});

app.get('/drive', function(req, res) {
console.log(req.query.portL +":"+ getPort(req.query.portL) +":"+req.query.portR +":"+ getPort(req.query.portR))
  if (req.query.portL && getPort(req.query.portL) && req.query.portR && getPort(req.query.portR)) {
    var motorL = new ev3dev.Motor(getPort(req.query.portL));
    var motorR = new ev3dev.Motor(getPort(req.query.portR));
    var speed  = 0.5;
    if (req.query.speed) {
      speed = 1/speed
    }
    var directionL = 1;
    var directionR = 1;
    if (req.query.direction == "left") {
      directionL = 0.1
      directionR = -0.1
    }
    else if (req.query.direction == "right") {
      directionR = 0.1
      directionL = -0.1
    }
    var motortime = 1000;
    if (req.query.time) {
      motortime = parseInt(req.query.time)
    }
    if (motorL.connected && motorR.connected) {


      console.log('Sending motor command...');

      motorL.rampUpSp = 100;motorR.rampUpSp = 100;
      motorL.rampDownSp = 100;motorR.rampDownSp = 100;
      motorL.runForTime(motortime, motorL.maxSpeed * speed * directionL, motorL.stopActionValues.brake);
      motorR.runForTime(motortime, motorR.maxSpeed * speed * directionR, motorR.stopActionValues.brake);

      res.send('Completed')
    } else {
      console.log("No motor could be found. Are you sure that one is connected?");
      res.send('no motor on that port')
    }
  } else {
    res.send('no port supplied')
  }
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})

var getPort = function(portID) {
  switch (portID) {
    case "A":
      return ev3dev.OUTPUT_A;
    case "B":
      return ev3dev.OUTPUT_B;
    case "C":
      return ev3dev.OUTPUT_C;
    case "D":
      return ev3dev.OUTPUT_D;
    default:
      return null;
  }
}

var getStop = function(stopCommand) {
  switch (stopCommand) {
    case "break":
      return motor.stopActionValues.break;
    case "coast":
      return motor.stopActionValues.coast;
    case "hold":
      return motor.stopActionValues.hold;
  }
}
