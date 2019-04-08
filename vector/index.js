const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
  "#myCanvas"
));
const ctx = canvas.getContext("2d");
ww = canvas.width = window.innerWidth;
wh = canvas.height = window.innerHeight;

function drawVector(v, trans) {
  ctx.beginPath();
  ctx.moveTo(0, 0);
  ctx.save();
  ctx.rotate(v.angle());
  ctx.fillText(v, v.length() / 2, 10);
  ctx.lineTo(v.length(), 0);
  ctx.lineTo(v.length() - 5, -4);
  ctx.lineTo(v.length() - 5, 4);
  ctx.lineTo(v.length(), 0);

  ctx.strokeStyle = "#29715f";
  ctx.lineWidth = 3;
  ctx.stroke();
  ctx.restore();

  if (trans) {
    ctx.translate(v.x, v.y);
  }
}

function draw() {
  ctx.clearRect(0, 0, ww, wh);
  const v1 = new Vector(250, 0);
  const v2 = new Vector(0, 200);
  const v3 = v1.add(v2).mul(-1);
  //   ctx.translate(ww / 2, wh / 2);
  //   drawVector(v1, true);
  //   drawVector(v2, true);
  //   drawVector(v3, true);
  const c = new Vector(ww / 2, wh / 2);
  ctx.restore();
  ctx.save();
  ctx.translate(c.x, c.y);
  const md = mousePos.sub(c);
  drawVector(md.mul(1 / md.length()).mul(100), false);
  ctx.restore();
}

setInterval(draw, 30);
let mousePos;
canvas.addEventListener("mousemove", e => {
  mousePos = new Vector(e.x, e.y);
});

const Vector = function(x, y) {
  this.x = x;
  this.y = y;
};
Vector.prototype.move = function(x, y) {
  this.x += x;
  this.y += y;
  return this;
};

Vector.prototype.toString = function(v) {
  return `(${this.x},${this.y})`;
};

Vector.prototype.add = function(v) {
  return new Vector(this.x + v.x, this.y + v.y);
};

Vector.prototype.sub = function(v) {
  return new Vector(this.x - v.x, this.y - v.y);
};

Vector.prototype.mul = function(s) {
  return new Vector(this.x * s, this.y * s);
};

Vector.prototype.length = function() {
  return Math.sqrt(this.x * this.x + this.y * this.y);
};

Vector.prototype.set = function(x, y) {
  this.x += x;
  this.y += y;
  return this;
};

Vector.prototype.equal = function(v) {
  return this.x === v.x && this.y === v.y;
};

Vector.prototype.clone = function() {
  return new Vector(this.x, this.y);
};

Vector.prototype.angle = function() {
  return Math.atan2(this.y, this.x);
};

// console.clear();

// const a = new Vector(4, 0);
// const b = new Vector(0, 3);
// const c1 = a.add(b);
// const c2 = a.sub(b);

// console.log(`${a}+${b}=${c1}`);
// console.log(`${a}-${b}=${c2}`);

// const b2 = b.mul(2);
// console.log(`${b} * 2 =${b2}`);
// console.log(`${c2} 的長度=${c2.length()}`);

// const temp = new Vector(4, 3);
// console.log(`${c1} 和${temp} 一樣嗎？${c1.equal(temp)}`);

// const newA = a.clone();
// console.log("clone" + newA);

// newA.move(2, 3);
// console.log("move" + newA);
// console.log("a" + a);
