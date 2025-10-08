"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let width = 300;
let height = 150;

const observer = new ResizeObserver((entries) => {
  width = canvas.clientWidth;
  height = canvas.clientHeight;
});
observer.observe(canvas)

const hsla = (h, s, l, a) => `hsla(${h * 360}, ${s * 100}%, ${l * 100}%, ${a})`;
let last = 0;

function disc(radius, val, dial) {
  ctx.fillStyle = hsla(val, 1, 0.5, 1);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI, 0);
  ctx.fill();
  if (dial) {
    ctx.lineWidth = radius/10;
    ctx.beginPath();
    ctx.moveTo(0,0);
    ctx.lineTo(radius*Math.sin(val*2*Math.PI),
              -radius*Math.cos(val*2*Math.PI));
    ctx.stroke();
  }
}

function render(time) {
  canvas.width = width;
  canvas.height = height;

  if (Date.now() != last) {
    last = Date.now();
    const now = new Date(last);

    ctx.save();
    ctx.translate(width / 2, height / 2);

    ctx.fillStyle = hsla(0, 1, 0, 1);
    ctx.beginPath();
    ctx.arc(0, 0, Math.max(width, height), 0, 2*Math.PI, 0);
    ctx.fill();
  
    const range = Math.min(width, height) * 0.8;
    disc(range/2, now.getMinutes()/60, 0);
    disc(range/3, now.getSeconds()/60, 1);
    disc(range/4, now.getHours()/12,   0);
  
    ctx.restore();
  }
  requestAnimationFrame(render)
}
requestAnimationFrame(render)
