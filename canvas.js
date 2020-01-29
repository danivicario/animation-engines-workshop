// Dani Vicario - canvas experiment (canvas)- Wed Jan 29 09:44:29 CET 2020

const randomFloat = (min, max) => Math.random() * (max - min) + min;
const randomInt = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);
const shuffle = array => array.sort(() => Math.random() - 0.5);

/** @type HTMLCanvasElement */
const canvasDOMEl = document.getElementById("canvas");

/** @type CanvasRenderingContext2D */
const ctx = canvasDOMEl.getContext("2d");

const w = window.innerWidth;
const h = window.innerHeight;
// eslint-disable-next-line no-unused-vars
const w2 = w / 2;
// eslint-disable-next-line no-unused-vars
const h2 = h / 2;

// eslint-disable-next-line no-unused-vars
const { PI } = Math;
// eslint-disable-next-line no-unused-vars
const PI_DOUBLE = 2 * Math.PI;
// eslint-disable-next-line no-unused-vars
const PI_HALF = Math.PI / 2;

canvasDOMEl.setAttribute("height", window.innerHeight);
canvasDOMEl.setAttribute("width", window.innerWidth);

ctx.save();

let circle = {
  x: w2,
  y: h2,
  size: 25
};

let easings = ["Power0.easeNone", "Power3.easeOut", "Elastic.easeOut", "Bounce.easeOut"];

gsap.to(circle, 2, {
  x: randomInt(0, w),
  y: randomInt(0, h),
  ease: easings[randomInt(0, easings.length - 1)],
  fillStyle: `rgba(${randomInt(0, 255)}, ${randomInt(0, 255)}, ${randomInt(0, 255)}, 1)`,
  size: 100
});

setInterval(() => {
  ctx.clearRect(0, 0, w, h);

  ctx.beginPath();
  ctx.fillStyle = circle.fillStyle;
  ctx.arc(circle.x, circle.y, circle.size, 0, PI_DOUBLE);
  ctx.fill();
  ctx.closePath();
}, 10);
