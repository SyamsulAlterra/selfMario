let mario;
let obstacle;

function startGame() {
  mario = new component(20, 20, "red", 0, 480);
  obstacle = new component(50, 50, "blue", 200, 300);
  myGameArea.start();
}

let myGameArea = {
  canvas: document.createElement("canvas"),
  start: function() {
    this.canvas.width = 500;
    this.canvas.height = 500;
    this.context = this.canvas.getContext("2d");
    document.body.insertBefore(this.canvas, document.body.childNodes[0]);
    this.interval = setInterval(updateGameArea, 20);
  },
  clear: function() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }
};

function component(width, height, color, x, y) {
  this.width = width;
  this.height = height;
  this.x = x;
  this.y = y;
  this.speedX = 0;
  this.speedY = 0;
  this.update = function() {
    ctx = myGameArea.context;
    ctx.fillStyle = color;
    ctx.fillRect(this.x, this.y, this.width, this.height);
  };
  this.newPos = function() {
    this.x += this.speedX;
    this.y += this.speedY;
  };
  window.addEventListener("keydown", function(e) {
    myGameArea.key = e.keyCode;
  });
  window.addEventListener("keyup", function(e) {
    myGameArea.key = false;
  });
}

updateGameArea = function() {
  myGameArea.clear();
  if (myGameArea.key && myGameArea.key === 68) {
    moveRight();
  } else if (myGameArea.key && myGameArea.key === 83) {
    down();
  } else if (myGameArea.key && myGameArea.key === 87) {
    up();
  } else if (myGameArea.key && myGameArea.key === 65) {
    left();
  } else if (myGameArea.key) {
    console.log(myGameArea.key);
  } else {
    stop();
  }
  mario.newPos();
  mario.update();
  obstacle.update();
};

function moveRight() {
  if (mario.x < 480) {
    if (!rightBlock(obstacle)) {
      mario.speedX = 10;
    } else {
      mario.speedX = 0;
    }
  } else {
    mario.speedX = 0;
  }
}

function left() {
  if (mario.x > 0) {
    mario.speedX = -10;
  } else {
    mario.speedX = 0;
  }
}

function down() {
  if (mario.y < 480) {
    mario.speedY = 10;
  } else {
    mario.speedY = 0;
  }
}

function up() {
  if (mario.y > 0) {
    mario.speedY = -10;
  } else {
    mario.speedY = 0;
  }
}

function stop() {
  mario.speedX = 0;
  mario.speedY = 0;
}
function rightBlock(obs) {
  if (
    mario.x + mario.width === obs.x &&
    mario.y > obs.y - mario.height &&
    mario.y < obs.y + obs.height
  ) {
    return true;
  } else {
    return false;
  }
}
