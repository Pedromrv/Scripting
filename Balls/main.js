// setup canvas

var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d'); //getContext() method on it to give us a context on which we can start to draw.
                                  //The resulting variable (ctx) is the object that directly represents the drawing area of the canvas and allows us to draw 2D shapes on it
var width = canvas.width = window.innerWidth;
var height = canvas.height = window.innerHeight;//to equal the width and height of the browser viewport

// function to generate random number

function random(min,max) {
  var num = Math.floor(Math.random()*(max-min)) + min; //This function takes two numbers as arguments, and returns a random number in the range between the two
  return num;
}

// define Ball constructor, parameters that define ball properties.

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

// define ball draw method

Ball.prototype.draw = function() {
  ctx.beginPath();  //state that we want to draw a shape on the paper
  ctx.fillStyle = this.color; //define what color we want the shape to be
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI); //use the arc() method to trace an arc shape on the paper. (x,y) are the positions of the arc's center
  ctx.fill();  //fill() used to finish the draw and fill everything with the color we choose in fillStyle
};
//------------------
// var testBall = new Ball(50, 100, 4, 4, 'blue', 10);
// testBall.x
// testBall.size
// testBall.color
// testBall.draw()
//------------------

// define ball update method

Ball.prototype.update = function() {   //update() method to the Ball()'s prototype
  if((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
};

// define ball collision detection

Ball.prototype.collisionDetect = function() {
  for(var j = 0; j < balls.length; j++) {  //for loop, to loop through all the balls in the balls[] array
    if(!(this === balls[j])) {
      var dx = this.x - balls[j].x;
      var dy = this.y - balls[j].y;
      var distance = Math.sqrt(dx * dx + dy * dy);

      if (distance < this.size + balls[j].size) {
        balls[j].color = this.color = 'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')';
      }
    }
  }
};

// define array to store balls

var balls = [];

// define loop that keeps drawing the scene constantly

function loop() {
  ctx.fillStyle = 'rgba(0,0,0,0.25)'; //color set to semitransparent
  ctx.fillRect(0,0,width,height); //fillRect() draw a rectangle of the color across the whole width and height of the canvas

  while(balls.length < 26) { //pushes onto the end of the balls array, only till the maximum number we give as length
    var ball = new Ball(
      random(0,width),
      random(0,height),
      random(-7,7),
      random(-7,7),
      'rgb(' + random(0,255) + ',' + random(0,255) + ',' + random(0,255) +')',
      random(10,20)
    );
    balls.push(ball);
  }

  for(var i = 0; i < balls.length; i++) {  //loops through the balls in the array
    balls[i].draw();  //runs balls draw
    balls[i].update(); //runs balls update
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);  //runs the function again with requestAnimationFrame() method
}



loop();  //call the function once to get the animation started
