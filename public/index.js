"use strict";
var canvas = document.querySelector('canvas');
var ctx = canvas.getContext('2d');
var width = 300;
var height = 150;
var observer = new ResizeObserver(function (entries) {
    width = canvas.clientWidth;
    height = canvas.clientHeight;
});
function hsl(h, l) {
    return "hsla(".concat(h * 360, ", 100%, ").concat(l * 100, "%, 1)");
}
function disc(radius, val, lum, dial) {
    ctx.fillStyle = hsl(val, lum);
    ctx.beginPath();
    ctx.arc(0, 0, radius, 0, 2 * Math.PI, false);
    ctx.fill();
    if (dial) {
        ctx.fillStyle = hsl(0, 0);
        ctx.beginPath();
        ctx.arc(radius * Math.sin(val * 2 * Math.PI) * .87, -radius * Math.cos(val * 2 * Math.PI) * .87, radius / 10, 0, 2 * Math.PI, false);
        ctx.fill();
    }
}
function daynum(y, m, d) {
    if (m < 3) {
        return daynum(y - 1, m + 12, d);
    }
    return (y * 365 + Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) +
        Math.floor((153 * m + 3) / 5) + d);
}
function lunar(now) {
    var off = (daynum(now.getFullYear(), now.getMonth(), now.getDate()) -
        daynum(2000, 1, 6));
    var phase = off % 29.53;
    return (phase > 14.765 ? (phase / 14.765) : (phase / 14.765));
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
        disc(Math.max(width, height), 0, 0.0, false);
        disc(range / 2, now.getMinutes() / 60, 0.5, false);
        disc(range / 3, now.getSeconds() / 60, 0.5, true);
        disc(range / 4, now.getHours() / 12, 0.5, false);
        disc(range / 24, now.getHours() / 12, lunar(now), false);
        ctx.restore();
    }
    requestAnimationFrame(render);
}
observer.observe(canvas);
requestAnimationFrame(render);
//# sourceMappingURL=index.js.map