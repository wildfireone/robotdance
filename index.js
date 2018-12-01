/**
 * @Author: John Isaacs <john>
 * @Date:   30-Aug-182018
 * @Filename: index.js
 * @Last modified by:   john
 * @Last modified time: 30-Aug-182018
 */


 var http = require('http');


const ev3dev = require('ev3dev-lang');
const Queue = require('./commandQueue.js');
// Create an array and append your functions to them
var funqueue = new Queue.Queue(false);


http.createServer(function (req, res) {


    var requrl = req.url;
    console.log(requrl);


//?time=value_in_milliseconds&port=outputPort
if(requrl == '/motorTime'){

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
}

if(requrl == '/drive'){


  if (req.query.portL && getPort(req.query.portL) && req.query.portR && getPort(req.query.portR)) {
    var motorL = new ev3dev.Motor(getPort(req.query.portL));
    var motorR = new ev3dev.Motor(getPort(req.query.portR));
    var speed  = 0.5;
    var distance = 1;
    var directionL =1;
    var directionR =1;
    var motortime = 1000;

    if (req.query.direction){
      directionL = directionL * req.query.direction;
      directionR = directionR * req.query.direction;
    }

    //console.log(req.query)
    if (req.query.speed) {
      speed = 1/parseInt(speed)
    }
    if (req.query.distance) {
        distance= parseInt(req.query.distance);
        if (motorL.connected && motorR.connected) {


          //console.log('Sending motor command...');

          motorL.rampUpSp = 100;motorR.rampUpSp = 100;
          motorL.rampDownSp = 100;motorR.rampDownSp = 100;
          //funqueue.add(
            //function(){
            //console.log(directionL +":"+directionR)
              motorL.runForDistance(distance * directionL, motorL.maxSpeed , motorL.stopActionValues.hold);
              motorR.runForDistance(distance * directionR, motorR.maxSpeed , motorR.stopActionValues.hold);
            //}
          //);
          res.send('Completed')
        } else {
          console.log("No motor could be found. Are you sure that one is connected?");
          res.send('no motor on that port')
        }
    }
    if (req.query.time) {
        motortime = parseInt(req.query.time)
        if (motorL.connected && motorR.connected) {


          console.log('Sending motor command...');

          motorL.rampUpSp = 100;motorR.rampUpSp = 100;
          motorL.rampDownSp = 100;motorR.rampDownSp = 100;
          //funqueue.add(
            //function(){
              motorL.runForTime(motortime, motorL.maxSpeed , motorL.stopActionValues.coast);
              motorR.runForTime(motortime, motorR.maxSpeed , motorR.stopActionValues.coast);
            //}
          //);
          res.send('Completed')
        } else {
          console.log("No motor could be found. Are you sure that one is connected?");
          res.send('no motor on that port')
        }
    }


  } else {
    res.send('no port supplied')
  }
}

if(requrl == '/driveon'){


  if (req.query.portL && getPort(req.query.portL) && req.query.portR && getPort(req.query.portR)) {
    var motorL = new ev3dev.Motor(getPort(req.query.portL));
    var motorR = new ev3dev.Motor(getPort(req.query.portR));
    var speed  = 0.5;
    var distance = 1;
    var directionL =1;
    var directionR =1;
    var motortime = 1000;

    if (req.query.direction){
      directionL = directionL * req.query.direction;
      directionR = directionR * req.query.direction;
    }

    //console.log(req.query)
    if (req.query.speed) {
      speed = 1/parseInt(speed)
    }

        if (motorL.connected && motorR.connected) {


          //console.log('Sending motor command...');

          motorL.rampUpSp = 100;motorR.rampUpSp = 100;
          motorL.rampDownSp = 100;motorR.rampDownSp = 100;
          //funqueue.add(
            //function(){
            //console.log(directionL +":"+directionR)
              motorL.runForever(motorL.maxSpeed *directionL , motorL.stopActionValues.hold);
              motorR.runForever(motorR.maxSpeed *directionR , motorR.stopActionValues.hold);
            //}
          //);
          res.send('Completed')
        } else {
          console.log("No motor could be found. Are you sure that one is connected?");
          res.send('no motor on that port')
        }



  } else {
    res.send('no port supplied')
  }
}

if(requrl == '/stop'){

  if (req.query.portL && getPort(req.query.portL) && req.query.portR && getPort(req.query.portR)) {
    var motorL = new ev3dev.Motor(getPort(req.query.portL));
    var motorR = new ev3dev.Motor(getPort(req.query.portR));
    motorL.runForDistance(1,motorL.maxSpeed, motorL.stopActionValues.break);
    motorR.runForDistance(1,motorR.maxSpeed, motorR.stopActionValues.break);
  }

}

if(requrl == '/driveRotate'){


  if (req.query.portL && getPort(req.query.portL) && req.query.portR && getPort(req.query.portR)) {
    var motorL = new ev3dev.Motor(getPort(req.query.portL));
    var motorR = new ev3dev.Motor(getPort(req.query.portR));
    var speed  = 0.5;
    var distance = 1;
    var directionL =1;
    var directionR =1;
    //console.log(req.query)

    if(req.query.direction =="R"){
      directionR =1;
      directionL =-1;
    }
    else if(req.query.direction =="L"){
      directionR =-1;
      directionL =1;
    }


    var motortime = 1000;


    if (req.query.speed) {
      speed = 1/parseInt(speed)
    }
    if (req.query.distance) {
        distance= parseInt(req.query.distance);
        if (motorL.connected && motorR.connected) {


          //console.log('Sending motor command...');

          motorL.rampUpSp = 100;motorR.rampUpSp = 100;
          motorL.rampDownSp = 100;motorR.rampDownSp = 100;
          //funqueue.add(
            //function(){
              motorL.runForever((motorL.maxSpeed *0.2)* directionL , motorL.stopActionValues.break);
              motorR.runForever((motorR.maxSpeed *0.2)* directionR , motorR.stopActionValues.break);
            //}
          //);
          res.send('Completed')
        } else {
          console.log("No motor could be found. Are you sure that one is connected?");
          res.send('no motor on that port')
        }
    }
    if (req.query.time) {
        motortime = parseInt(req.query.time)
        if (motorL.connected && motorR.connected) {


          console.log('Sending motor command...');

          motorL.rampUpSp = 100;motorR.rampUpSp = 100;
          motorL.rampDownSp = 100;motorR.rampDownSp = 100;
          //funqueue.add(
            //function(){
              motorL.runForTime(motortime, motorL.maxSpeed , motorL.stopActionValues.brake);
              motorR.runForTime(motortime, motorR.maxSpeed , motorR.stopActionValues.brake);
            //}
          //);
          res.send('Completed')
        } else {
          console.log("No motor could be found. Are you sure that one is connected?");
          res.send('no motor on that port')
        }
    }


  } else {
    res.send('no port supplied')
  }
};



}).listen(3000);
console.log('Example app listening on port 3000!')

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



// Function wrapping code.
// fn - reference to function.
// context - what you want "this" to be.
// params - array of parameters to pass to function.
var wrapFunction = function(fn, context, params) {
    return function() {
        fn.apply(context, params);
    };
}

// Remove and execute all items in the array
while (funqueue.length > 0) {
    (funqueue.shift())();
}
