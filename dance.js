

var Skynet = require('./robot.js');
var Robots =[];
Robots.push(new Skynet('192.168.2.2'));
Robots.push(new Skynet('192.168.2.3'));


//Robot.move(1000, 1);
//Robot.turn(100,"L");
//Robot.move(1000,-1);



// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );



  Robots.forEach(function(r){r.move(100)});
  Robots.forEach(function(r){r.turn(100,"R")});
  Robots.forEach(function(r){r.move(100)});
