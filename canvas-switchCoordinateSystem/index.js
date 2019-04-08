const canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
  "#myCanvas"
));
const ctx = canvas.getContext("2d");
const blockWidth = 200;
const PI = Math.PI;
const PI2 = Math.PI * 2;

canvas.width = blockWidth * 3;
canvas.height = blockWidth * 3;

const color = {
  red: "#f74456",
  white: "#fff",
  yellow: "#f1da56",
  blue: "#036faf"
};

let pos = { x: 0, y: 0 };
let time = 0;

ctx.fillCircle = function(x, y, r) {
  this.beginPath();
  this.arc(x, y, r, 0, PI2);
  this.fill();
};

const drawBlock = (pos, bgColor, draw, time) => {
  ctx.save();
  ctx.translate(pos.x * blockWidth, pos.y * blockWidth);
  ctx.fillStyle = bgColor;
  ctx.fillRect(0, 0, blockWidth, blockWidth);
  ctx.translate(100, 100);
  draw();
  ctx.restore();
};

const draw = () => {
  time++;
  let stime = parseInt(time / 20);
  // bolock 1
  drawBlock(
    { x: 0, y: 0 },
    color.blue,
    function() {
      ctx.beginPath();
      ctx.arc(0, 0, 30 / ((stime % 3) + 1), 0, PI2);
      ctx.strokeStyle = "white";
      ctx.lineWidth = 10;
      ctx.stroke();
      for (let i = 0; i < 8; i++) {
        ctx.fillStyle = stime % 8 === i ? color.red : "white";
        if ((i + stime) % 4 != 0) {
          ctx.fillRect(60, -4, 20, 8);
        }
        ctx.rotate(PI2 / 8);
      }
    },
    time
  );
  // block 2
  drawBlock(
    { x: 1, y: 0 },
    color.red,
    function() {
      ctx.save();
      ctx.scale(0.8, 0.8);
      ctx.translate(-60, -60);
      for (let i = 0; i < 3; i++) {
        ctx.save();
        for (let j = 0; j < 3; j++) {
          ctx.beginPath();
          ctx.arc(0, 0, 20, 0, PI2);
          ctx.fillStyle =
            (i + j * 2 + stime) % 5 === 0 ? color.yellow : color.white;
          ctx.fill();
          ctx.translate(0, 60);
        }
        ctx.restore();
        ctx.translate(60, 0);
      }
      ctx.restore();
    },
    time
  );

  // block 3
  drawBlock(
    { x: 2, y: 0 },
    color.yellow,
    function() {
      for (let i = 0; i < 4; i++) {
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(80, 20);
        ctx.lineTo(80, 80);
        ctx.closePath();
        ctx.fillStyle = "white";
        ctx.fill();
        if (stime % 4 === i) {
          ctx.beginPath();
          ctx.arc(60, 40, 6, 0, PI2);
          ctx.fillStyle = color.red;
          ctx.fill();
        }
        ctx.rotate(PI2 / 4);
      }
    },
    time
  );

  // block 4
  drawBlock(
    { x: 0, y: 1 },
    color.yellow,
    function() {
      ctx.translate(-60, -60);
      ctx.fillStyle = "white";
      ctx.fillRect(0, 0, 60, 60);
      ctx.translate(30, 30);
      ctx.rotate(-PI / 4);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(40, 0);
      ctx.arc(40, 40, 40, -PI / 2, PI / 2);
      ctx.lineTo(0, 80);
      ctx.closePath();
      ctx.fillStyle = color.red;
      ctx.fill();

      ctx.translate(-100 + 10 * Math.sin(time / 10), 60);
      ctx.fillStyle = color.blue;
      ctx.fillRect(0, 0, 100, 40);

      ctx.translate(100 + 10 * Math.cos(time / 10), 40);
      ctx.fillStyle = color.white;
      ctx.fillRect(0, 0, 50, 20);
    },
    time
  );

  // block 5
  drawBlock(
    { x: 1, y: 1 },
    color.white,
    function() {
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, 80, ((time % 100) / 100) * PI2, ((time % 100) / 50) * PI2);
      ctx.fillStyle = color.red;
      ctx.fill();
      ctx.fillStyle = color.yellow;
      ctx.fillCircle(60, 60, 30);
    },
    time
  );

  // block 6
  drawBlock(
    { x: 2, y: 1 },
    color.blue,
    function() {
      ctx.fillStyle = color.white;
      ctx.fillCircle(0, 0, 80);

      ctx.rotate(time / 10);
      ctx.fillStyle = color.red;
      ctx.fillCircle(-30, 0, 20);

      ctx.rotate(time / 10);
      ctx.fillStyle = color.yellow;
      ctx.fillCircle(40, 0, 50);
    },
    time
  );

  // block 7
  drawBlock(
    { x: 0, y: 2 },
    color.red,
    function() {
      ctx.rotate(time / 100);
      for (let i = 0; i < 8; i++) {
        ctx.rotate(PI2 / 8);
        ctx.fillStyle = color.white;
        let r = 16;
        if ((stime + i) % 4 < 2) {
          r = 10;
        }
        ctx.fillCircle(60, 0, r);

        ctx.fillStyle = color.blue;
        ctx.fillCircle(30, 5, 5);
      }
    },
    time
  );

  // block 8
  drawBlock(
    { x: 1, y: 2 },
    color.blue,
    function() {
      ctx.translate(-80, -100);
      ctx.fillStyle = color.yellow;
      ctx.fillRect(0, time % 200, 40, time % 200);

      ctx.translate(40, 40);
      ctx.fillStyle = color.red;
      ctx.fillRect(0, 0, 120, 80);
      ctx.fillStyle = color.white;
      ctx.fillCircle(0, 40, stime % 20);
      ctx.fillCircle(70, 40, stime % 10);

      ctx.fillStyle = color.white;
      ctx.translate(70, 80);
      ctx.fillRect(0, 0, 50, 80);
    },
    time
  );

  // block 9
  drawBlock(
    { x: 2, y: 2 },
    color.yellow,
    function() {
      ctx.beginPath();
      ctx.moveTo(-100, -100);
      ctx.lineTo(-100, 100);
      ctx.lineTo(0, -100);
      ctx.closePath();
      ctx.fillStyle = color.white;
      ctx.fill();

      ctx.rotate(PI);
      ctx.save();
      ctx.translate((time % 100) - 100, -100);
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 0);
      ctx.lineTo(0, 200);
      ctx.closePath();
      ctx.fillStyle = color.red;
      ctx.fill();
      ctx.restore();

      ctx.beginPath();
      ctx.moveTo(-100, -100);
      ctx.lineTo(-100, 100);
      ctx.lineTo(0, -100);
      ctx.closePath();
      ctx.fillStyle = color.white;
      ctx.fill();
    },
    time
  );

  requestAnimationFrame(draw);
};

requestAnimationFrame(draw);
