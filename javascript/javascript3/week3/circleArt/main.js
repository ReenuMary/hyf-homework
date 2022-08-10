class Circle {
  constructor(centerX, centerY, radius, color) {
    this.centerX = centerX;
    this.centerY = centerY;
    this.radius = radius;
    this.color = color;
  }
  RenderCircle() {
    const c = document.getElementById("art-canvas");
    const ctx = c.getContext("2d");
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.centerX, this.centerY, this.radius, 0, 2 * Math.PI);
    ctx.fill();
  }
}

function random_rgba() {
  const o = Math.round,
    r = Math.random,
    s = 255;
  return (
    "rgba(" +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    o(r() * s) +
    "," +
    r().toFixed(1) +
    ")"
  );
}

function getRandomInt(min, max) {
  if (max == null) {
    max = min;
    min = 0;
  }
  if (min > max) {
    var tmp = min;
    min = max;
    max = tmp;
  }
  return Math.floor(min + (max - min + 1) * Math.random());
}
function createCircle() {
  const randomRadius = getRandomInt(1, 25);
  const canvas = document.getElementById("art-canvas");
  const x = Math.random() * canvas.width;
  var y = Math.random() * canvas.height;

  circleOne = new Circle(x, y, randomRadius, random_rgba());
  circleOne.RenderCircle();
}
setInterval(createCircle, 100);
