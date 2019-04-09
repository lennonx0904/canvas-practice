// const canvas = document.querySelector("#myCanvas");
let canvas = /** @type {HTMLCanvasElement} */ (document.querySelector(
  "#myCanvas"
));
const ctx = canvas.getContext("2d");
canvas.width = 400;
canvas.height = 400;

let time = 0;

function draw() {
  time += 1;
  ctx.clearRect(0, 0, 400, 400);
  ctx.beginPath();
  for (let i = 0; i < 10; i++) {
    let pos = i * 50;
    ctx.moveTo(pos, 0);
    ctx.lineTo(pos, 400);
    ctx.fillStyle = "#878787";
    ctx.fillText(pos, pos, 10); //fillText('text', pos, 10)
    ctx.moveTo(0, pos);
    ctx.lineTo(400, pos);
    ctx.fillText(pos, 0, pos);
  }
  ctx.strokeStyle = "rgba(0, 0, 0, .1)";
  ctx.stroke();

  //繪製地面
  ctx.beginPath();
  ctx.moveTo(25, 350);
  ctx.lineTo(375, 350);
  ctx.lineWidth = 2;
  ctx.strokeStyle = "black";
  ctx.stroke();

  ctx.fillStyle = "#ff5530";
  ctx.fillRect(300, 300, 50, 50);
  ctx.strokeStyle = "#000";
  ctx.strokeRect(300, 300, 50, 50);

  ctx.beginPath();
  ctx.rect(50, 300, 50, 50);
  ctx.rect(250, 250, 50, 100);
  ctx.fillStyle = "#ffe517";
  ctx.fill();
  ctx.stroke();

  ctx.beginPath();
  ctx.rect(100, 250, 50, 100);
  ctx.rect(200, 250, 50, 100);
  ctx.fillStyle = "#ff9c34";
  ctx.fill();
  ctx.stroke();

  // roof
  ctx.beginPath();
  ctx.moveTo(100, 200);
  ctx.lineTo(250, 200);
  ctx.lineTo(175, 150);
  ctx.closePath();
  ctx.fillStyle = "#ff5530";
  ctx.fill();
  ctx.stroke();

  // door
  ctx.beginPath();
  ctx.arc(175, 250, 25, 0, Math.PI, true); //預設是逆時針畫園，設true是順時針
  ctx.moveTo(200, 250);
  ctx.lineTo(250, 250);
  ctx.lineTo(250, 200);
  ctx.lineTo(100, 200);
  ctx.lineTo(100, 250);
  ctx.lineTo(150, 250);
  ctx.fillStyle = "#fff";
  ctx.fill();
  ctx.stroke();

  //flag
  ctx.beginPath();
  ctx.moveTo(175, 150);
  ctx.lineTo(175, 100 - mouse.y / 5);
  ctx.lineTo(200, 110 - (time % 5) - mouse.y / 5);
  ctx.lineTo(175, 120 - mouse.y / 5);
  ctx.fillStyle = `hsl(${mouse.x % 360}, 50%, 50%)`;
  ctx.fill();
  ctx.stroke();

  // car
  ctx.fillStyle = "#fff";
  let carx = (time % 440) - 40;
  ctx.fillRect(carx, 325, 40, 25);
  ctx.strokeRect(carx, 325, 40, 25);
  // wheel
  ctx.beginPath();
  ctx.arc(carx + 10, 350, 5, 0, Math.PI * 2);
  ctx.arc(carx + 30, 350, 5, 0, Math.PI * 2);

  ctx.fillStyle = "#000";
  ctx.fill();
  ctx.stroke();
}

setInterval(draw, 30);

let mouse = { x: 0, y: 0 };
canvas.addEventListener("mousemove", e => {
  //console.log(e);
  mouse.x = e.offsetX;
  mouse.y = e.offsetY;
  console.log(mouse);
});
