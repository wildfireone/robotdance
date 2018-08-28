const express = require('express')
const app = express()
const ev3dev = require('ev3dev-lang');

app.get('/', function(req, res) {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_C);
  if (!motor.connected)
    console.log("No motor could be found. Are you sure that one is connected?");

  console.log(' Port: ' + motor.address);
  console.log(' Driver: ' + motor.driverName);
  console.log(' Available commands: ' + motor.commands);

  console.log('Sending motor command...');

  motor.rampUpSp = 100;
  motor.rampDownSp = 100;
  motor.runForTime(1000, motor.maxSpeed / 2, motor.stopActionValues.brake);

  do {
    console.log("Motor speed: " + motor.speed);

    { //Hack to sleep for time
      //    SHOULD NOT BE USED IN PRODUCTION CODE
      var start = new Date().getTime();
      while (new Date().getTime() < start + 80) {;
      }
    }
  } while (motor.speed > 10);
  res.send('Hello World!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
