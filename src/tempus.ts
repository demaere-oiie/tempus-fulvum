"use strict";

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');
let width = 300;
let height = 150;

const observer = new ResizeObserver((entries) => {
  width = canvas.clientWidth;
  height = canvas.clientHeight;
});

function hsl(h:number):string {
  if (h==-1) return "hsla(0,100%,0%,1)";
  return `hsla(${h*360}, 100%, 50%, 1)`;
}

function disc(radius:number, val:number, dial:boolean) {
  ctx.fillStyle = hsl(val);
  ctx.beginPath();
  ctx.arc(0, 0, radius, 0, 2*Math.PI, false);
  ctx.fill();
  if (dial) {
    ctx.fillStyle = hsl(-1);
    ctx.beginPath();
    ctx.arc(radius*Math.sin(val*2*Math.PI)*.87,
           -radius*Math.cos(val*2*Math.PI)*.87,
            radius/10, 0, 2*Math.PI, false);
    ctx.fill();
  }
}

let last = 0;

function render(time:number) {
  canvas.width = width;
  canvas.height = height;

  if (Date.now() != last) {
    last = Date.now();
    const now = new Date(last);
    const range = Math.min(width, height) * 0.8;

    ctx.save();
    ctx.translate(width / 2, height / 2);

    disc(Math.max(width, height), -1,  false);
    disc(range/2, now.getMinutes()/60, false);
    disc(range/3, now.getSeconds()/60, true);
    disc(range/4, now.getHours()/12,   false);
  
    ctx.restore();
  }
  requestAnimationFrame(render)
}

observer.observe(canvas)
requestAnimationFrame(render)
