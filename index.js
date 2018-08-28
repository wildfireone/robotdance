const express = require('express')
const app = express()
const ev3dev = require('ev3dev-lang');

app.get('/', function(req, res) {
  var motor = new ev3dev.Motor(ev3dev.OUTPUT_A);
  if(!motor.connected) {
      console.error("No motor was found on port A. Please connect a tacho motor to port A and try again.");
      process.exit(1);
  }
  motor.runForDistance(360 * 10, 500, motor.stopActionValues.brake);
  res.send('Hello World!')
});

app.listen(3000, function() {
  console.log('Example app listening on port 3000!')
})
