var Skynet = require('./robot.js');

var Robots =[];
Robots.push(new Skynet('192.168.2.2'));
Robots.push(new Skynet('192.168.2.3'));


//Robot.move(1000, 1);
//Robot.turn(100,"L");
//Robot.move(1000,-1);

var stdin = process.stdin;

// without this, we would only get streams once enter is pressed
stdin.setRawMode( true );

// resume stdin in the parent process (node app won't quit all by itself
// unless an error or process.exit() happens)
stdin.resume();

// i don't want binary, do you?
stdin.setEncoding( 'utf8' );

// on any data into stdin
stdin.on( 'data', function( key ){
  // ctrl-c ( end of text )
  if ( key === '\u0003' ) {
    process.exit();
  }

  switch(key){
    case 'w': console.log("up"); Robots.forEach(function(r){r.moveon(1)}); break;
    case 'a': console.log("left"); Robots.forEach(function(r){r.turn(100,"L")}); break;
    case 's': console.log("down"); Robots.forEach(function(r){r.moveon(-1)}); break;
    case 'd': console.log("right"); Robots.forEach(function(r){r.turn(100,"R")}); break;

  }
});
