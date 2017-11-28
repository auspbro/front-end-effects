/**
 * Created by H_VK on 2017/3/1.
 */

var c = document.getElementById('c'),
    ctx = c.getContext('2d'),
    shapes = [],
    s = {
        'count': 100,
        'size': 20,
        'speed': 10,
        'focal': 300,
        'perspective': 5000
    };

window.requestAnimFrame = (function () {
    return window.requestAnimationFrame       ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRequestAnimationFrame     ||
        function (callback) {
            window.setTimeout(callback, 1000/60);
        };
})();

function resize() {
    c.width = window.innerWidth;
    c.height = window.innerHeight;
    ctx.translate(.5*c.width, .5*c.height);
    shapes = [];
    init();
}
resize();
window.addEventListener("resize", resize);

var gui = new dat.GUI();
gui.add(s, "count", 1, 300, 1).onChange(resize);
gui.add(s, "size", 1, 100, 1).onChange(resize);
gui.add(s, "speed", 1, 50, 1);
gui.add(s, "focal", 1, 1000, 1);
gui.add(s, "perspective", 1, 10000, 1);

function Shape(x, y, z, col, shape) {
    this.x = x;
    this.y = y;
    this.z = z;
    this.col = col;
    this.shape = shape;
}

function setColor () {
    return 'rgba(' + Math.round(255*Math.random()) + ','
        + Math.round(255*Math.random()) + ','
        + Math.round(255*Math.random()) + ','
        + Math.random()
    ')';
}

function setShape(v) {
    var rand = Math.random(),
        shape;

    if(rand < .3) {
        shape = 'rect';
    } else if(rand > .3 && rand < .7) {
        shape = 'triangle';
    } else {
        shape = 'circle';
    }

    return shape;
}

function drawShape(shape) {
    ctx.beginPath();

    if(shape == 'rect') {
        ctx.rect(-s.size/2, -s.size/2, s.size, s.size);
    } else if(shape == 'triangle') {
        ctx.moveTo(0, 0);
        ctx.lineTo(s.size/2, -s.size);
        ctx.lineTo(s.size, 0);
    } else {
        ctx.arc(0, 0, s.size, 0, 2*Math.PI);
    }
    ctx.fill();
}

function init() {
    for(var i=0; i<s.count; i++) {
        var x = -c.width/2 + c.width*Math.random(),
            y = -c.height/2 + c.height*Math.random(),
            z = s.perspective*Math.random(),
            col = setColor(),
            shape = setShape(Math.random());
        shapes.push(new Shape(x, y, z, col, shape));
    }
}

function update() {
    ctx.clearRect(-.5*c.width, -.5*c.height, c.width, c.height);

    for(var i=0; i<shapes.length; i++) {
        var sh = shapes[i];

        ctx.save();
        var p = s.focal / (s.focal + sh.z);
        ctx.translate(p*sh.x, p*sh.y);
        ctx.scale(p, p);
        ctx.fillStyle = sh.col;
        drawShape(sh.shape);
        ctx.restore();

        sh.z -= s.speed;
        if(sh.z < -s.focal) {
            sh.z = s.perspective*Math.random();
        }
    }
    window.requestAnimFrame(update);
}
update();