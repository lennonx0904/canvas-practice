const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
  "#myCanvas"
));
const ctx = canvas.getContext("2d");

ww = canvas.width = window.innerWidth;
wh = canvas.height = innerHeight;

//  變更視窗大小時，重設 Canvas 的寬高
window.addEventListener("resize", () => {
  ww = canvas.width = window.innerWidth;
  wh = canvas.height = innerHeight;
});

const Ball = function() {
  this.p = { x: ww / 2, y: wh / 2 };
  this.v = { x: -10, y: 3 };
  this.a = { x: 0, y: 1 };
  this.r = 50;
  this.dragging = false;
};

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.save();
  ctx.translate(this.p.x, this.p.y);
  ctx.arc(0, 0, this.r, 0, Math.PI * 2);
  ctx.fillStyle = controls.color;
  ctx.fill();
  ctx.restore();
  // 繪製速度向量
  this.drawV();
};

Ball.prototype.drawV = function() {
  ctx.beginPath();
  ctx.save();
  ctx.translate(this.p.x, this.p.y);
  ctx.scale(3, 3);
  //  v-direction

  ctx.moveTo(0, 0);
  ctx.lineTo(this.v.x, this.v.y);
  ctx.strokeStyle = "blue";
  ctx.stroke();
  //  x-direction
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(this.v.x, 0);
  ctx.strokeStyle = "red";
  ctx.stroke();
  //  y-direction
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.lineTo(0, this.v.y);
  ctx.strokeStyle = "green";
  ctx.stroke();

  ctx.restore();
};

Ball.prototype.update = function() {
  if (this.dragging === false) {
    this.p.x += this.v.x;
    this.p.y += this.v.y;

    this.v.x += this.a.x;
    this.v.y += this.a.y;
    // Friction 摩擦力
    this.v.x *= controls.fade;
    this.v.y *= controls.fade;

    //new dat
    controls.vx = this.v.x;
    controls.vy = this.v.y;
    controls.ay = this.a.y;

    // update 時同時執行 checkBoundary
    this.checkBoundary();
  }
};

Ball.prototype.checkBoundary = function() {
  // Right Boundary
  if (this.p.x + this.r > ww) {
    this.v.x = -Math.abs(this.v.x);
  }
  //  Left Boundary
  if (this.p.x - this.r < 0) {
    this.v.x = Math.abs(this.v.x);
  }
  // Lower Boundary
  if (this.p.y + this.r > wh) {
    this.v.y = -Math.abs(this.v.y);
  }
  //  Upper Boundary
  if (this.p.y - this.r < 0) {
    this.v.y = Math.abs(this.v.y);
  }
};

let controls = {
  vx: 0,
  vy: 0,
  ay: 0.6,
  fade: 0.99,
  update: true,
  color: "#fff",
  step: function() {
    ball.update();
  },
  FPS: 30
};

const gui = new dat.GUI();
gui
  .add(controls, "vx", -50, 50)
  .listen()
  .onChange(function(value) {
    ball.v.x = value;
  });
gui
  .add(controls, "vy", -50, 50)
  .listen()
  .onChange(function(value) {
    ball.v.y = value;
  });
gui
  .add(controls, "ay", -1, 1)
  .step(0.001)
  .listen()
  .onChange(function(value) {
    ball.a.y = value;
  });
gui
  .add(controls, "fade", 0, 1)
  .step(0.01)
  .listen();

gui.add(controls, "update");
gui.addColor(controls, "color");
gui.add(controls, "step");
gui.add(controls, "FPS", 1, 120);

let ball;
function init() {
  ball = new Ball();
}
init();

// Control
function update() {
  if (controls.update) {
    ball.update();
  }
}
setInterval(update, 1000 / 30);

// View
function draw() {
  ctx.fillStyle = "rgba(0,0,0,0.5)";
  ctx.fillRect(0, 0, ww, wh);
  ball.draw();

  setTimeout(draw, 1000 / controls.FPS);
}

draw();

// drag
let mousePos = { x: 0, y: 0 };

function getDistance(p1, p2) {
  let tempx = p1.x - p2.x;
  let tempy = p1.y - p2.y;
  let dist = Math.sqrt(Math.pow(tempx, 2) + Math.pow(tempy, 2));
  return dist;
}

canvas.addEventListener("mousedown", e => {
  mousePos = { x: e.x, y: e.y };
  let dist = getDistance(mousePos, ball.p);
  if (dist < ball.r) {
    ball.dragging = true;
  }
});

canvas.addEventListener("mousemove", e => {
  let nowPos = { x: e.x, y: e.y };
  if (ball.dragging) {
    let dx = nowPos.x - mousePos.x;
    let dy = nowPos.y - mousePos.y;

    ball.p.x += dx;
    ball.p.y += dy;
    // throw ball
    ball.v.x = dx;
    ball.v.y = dy;
  }
  let dist = getDistance(mousePos, ball.p);
  if (dist < ball.r) {
    canvas.style.cursor = "move";
  } else {
    canvas.style.cursor = "initial";
  }

  mousePos = nowPos;
});

canvas.addEventListener("mouseup", e => {
  ball.dragging = false;
});
