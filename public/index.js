"use strict";
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = 300;
var height = 150;
var observer = new ResizeObserver(function (entries) {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
});
function hsl(h) {
    if (h == -1)
        return "hsla(0,100%,0%,1)";
    return "hsla(".concat(h * 360, ", 100%, 50%, 1)");
}
function disc(radius, val, dial) {
    ctx.fillStyle = hsl(val);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    if (dial) {
        ctx.fillStyle = hsl(-1);
        ctx.beginPath();
        ctx.arc(radius * Math.sin(val * 2 * Math.PI) * .87, -radius * Math.cos(val * 2 * Math.PI) * .87, radius / 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
var last = 0;
function render(time) {
    canvas.width = width;
    canvas.height = height;
    if (Date.now() != last) {
        last = Date.now();
        var now = new Date(last);
        var range = Math.min(width, height) * 0.8;
        ctx.save();
        ctx.translate(width / 2, height / 2);
        disc(Math.max(width, height), -1, false);
        disc(range / 2, now.getMinutes() / 60, false);
        disc(range / 3, now.getSeconds() / 60, true);
        disc(range / 4, now.getHours() / 12, false);
        ctx.restore();
    }
    requestAnimationFrame(render);
}
observer.observe(canvas);
requestAnimationFrame(render);
//# sourceMappingURL=index.js.map