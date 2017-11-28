/**
 * Created by H_VK on 2017/2/23.
 */

window.requestAnimFrame =
    window.requestAnimationFrame ||
    window.webkitRequestAnimationFrame ||
    window.mozRequestAnimationFrame ||
    window.oRequestAnimationFrame ||
    window.msRequestAnimationFrame ||
    function(callback) {
        window.setTimeout(callback, 1000 / 60);
    };

var canvas = document.getElementById('c');
var ctx = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var settings = {

    'abstract': {

        'emission_rate': 500,
        'min_life': 1,
        'life_range': 1,
        'min_angle': 0,
        'angle_range': 360,
        'min_speed': 10,
        'speed_range': 100,
        'min_size': 2,
        'size_range': 4,
        'start_colours': [
            [130, 196, 245, 0.8],
            [69, 152, 212, 0.8],
            [179, 166, 250, 0.8]
        ],
        'end_colours': [
            [130, 196, 245, 0],
            [155, 119, 253, 0],
            [244, 121, 201, 0]
        ],
        'gravity': {
            x: 0,
            y: 0
        },
        'min_position': {
            x: -30,
            y: -30
        },
        'position_range': {
            x: 60,
            y: 60
        }
    },

    'blood': {

        'emission_rate': 1000,
        'min_life': 1,
        'life_range': 1,
        'min_angle': 85,
        'angle_range': 10,
        'min_speed': 10,
        'speed_range': 100,
        'min_size': 2,
        'size_range': 2,
        'start_colours': [
            [253, 69, 69, 0.8],
            [201, 10, 10, 0.8],
            [168, 57, 57, 0.8]
        ],
        'end_colours': [
            [253, 69, 69, 0.1],
            [201, 10, 10, 0.1],
            [168, 57, 57, 0.1]
        ],
        'gravity': {
            x: 0,
            y: 100
        }
    },

    'fire': {

        'emission_rate': 1000,
        'min_life': 1,
        'life_range': 0.5,
        'min_angle': 80,
        'angle_range': 20,
        'min_speed': 10,
        'speed_range': 140,
        'min_size': 2,
        'size_range': 10,
        'start_colours': [
            [239, 127, 67, 0.7],
            [253, 69, 69, 0.8],
            [239, 100, 67, 0.7]
        ],
        'end_colours': [
            [90, 90, 90, 0],
            [110, 110, 110, 0],
            [130, 130, 130, 0]
        ],
        'gravity': {
            x: 0,
            y: -100
        },
        'min_position': {
            x: -20,
            y: -20
        },
        'position_range': {
            x: 40,
            y: 40
        }
    },

    'rain': {

        'emission_rate': 50,
        'min_life': 2,
        'life_range': 0.3,
        'min_angle': 260,
        'angle_range': 20,
        'min_speed': 30,
        'speed_range': 30,
        'min_size': 1,
        'size_range': 2,
        'start_colours': [
            [130, 196, 245, 0.8],
            [69, 152, 212, 0.8]
        ],
        'end_colours': [
            [130, 196, 245, 0.3],
            [69, 152, 212, 0.3]
        ],
        'gravity': {
            x: 20,
            y: 100
        },
        'min_position': {
            x: 0,
            y: 0
        },
        'position_range': {
            x: canvas.width - 200,
            y: 0
        }
    }
};

var Particle = function(x, y, angle, speed, life, size, start_colour, colour_step) {

    /* the particle's position */

    this.pos = {

        x: x || 0,
        y: y || 0
    };

    /* set specified or default values */

    this.speed = speed || 5;

    this.life = life || 1;

    this.size = size || 2;

    this.lived = 0;

    /* the particle's velocity */

    var radians = angle * Math.PI / 180;

    this.vel = {

        x: Math.cos(radians) * speed,
        y: -Math.sin(radians) * speed
    };

    /* the particle's colour values */

    this.colour = start_colour;
    this.colour_step = colour_step;
};

var Emitter = function(x, y, settings) {

    /* the emitter's position */

    this.pos = {

        x: x,
        y: y
    };

    /* set specified values */

    this.settings = settings;

    /* How often the emitter needs to create a particle in milliseconds */

    this.emission_delay = 1000 / settings.emission_rate;

    /* we'll get to these later */

    this.last_update = 0;

    this.last_emission = 0;

    /* the emitter's particle objects */

    this.particles = [];

    /* particle position settings */

    this.position_vary = this.settings.position_range || false;

    this.min_position = this.settings.min_position || {x: 0, y: 0};
};

Emitter.prototype.update = function() {

    /* set the last_update variable to now if it's the first update */

    if (!this.last_update) {

        this.last_update = Date.now();

        return;
    }

    /* get the current time */

    var time = Date.now();

    /* work out the milliseconds since the last update */

    var dt = time - this.last_update;

    /* add them to the milliseconds since the last particle emission */

    this.last_emission += dt;

    /* set last_update to now */

    this.last_update = time;

    /* check if we need to emit a new particle */

    if (this.last_emission > this.emission_delay) {

        /* find out how many particles we need to emit */

        var i = Math.floor(this.last_emission / this.emission_delay);

        /* subtract the appropriate amount of milliseconds from last_emission */

        this.last_emission -= i * this.emission_delay;

        while (i--) {

            /* calculate the particle's properties based on the emitter's settings */

            var start_colour = this.settings.start_colours[Math.floor(this.settings.start_colours.length * Math.random())];

            var end_colour = this.settings.end_colours[Math.floor(this.settings.end_colours.length * Math.random())];

            var life = this.settings.min_life + Math.random() * this.settings.life_range;

            var colour_step = [
                (end_colour[0] - start_colour[0]) / life, /* red */
                (end_colour[1] - start_colour[1]) / life, /* green */
                (end_colour[2] - start_colour[2]) / life, /* blue */
                (end_colour[3] - start_colour[3]) / life /* alpha */
            ];

            this.particles.push(
                new Particle(
                    this.min_position.x + (this.position_vary ? Math.random() * this.position_vary.x : 0),
                    this.min_position.y + (this.position_vary ? Math.random() * this.position_vary.y : 0),
                    this.settings.min_angle + Math.random() * this.settings.angle_range,
                    this.settings.min_speed + Math.random() * this.settings.speed_range,
                    life,
                    this.settings.min_size + Math.random() * this.settings.size_range,
                    start_colour.slice(),
                    colour_step
                )
            );
        }
    }

    /* convert dt to seconds */

    dt /= 1000;

    /* loop through the existing particles */

    var i = this.particles.length;

    while (i--) {

        var particle = this.particles[i];

        /* skip if the particle is dead */

        if (particle.dead) {

            /* remove the particle from the array */

            this.particles.splice(i, 1);

            continue;
        }

        /* add the seconds passed to the particle's life */

        particle.lived += dt;

        /* check if the particle should be dead */

        if (particle.lived >= particle.life) {

            particle.dead = true;

            continue;
        }

        /* calculate the particle's new position based on the forces multiplied by seconds passed */

        particle.vel.x += this.settings.gravity.x * dt;
        particle.vel.y += this.settings.gravity.y * dt;

        particle.pos.x += particle.vel.x * dt;
        particle.pos.y += particle.vel.y * dt;

        /* calculate new colour and draw the particle */

        particle.colour[0] += particle.colour_step[0] * dt;
        particle.colour[1] += particle.colour_step[1] * dt;
        particle.colour[2] += particle.colour_step[2] * dt;
        particle.colour[3] += particle.colour_step[3] * dt;

        ctx.fillStyle = 'rgba(' +
            Math.round(particle.colour[0]) + ',' +
            Math.round(particle.colour[1]) + ',' +
            Math.round(particle.colour[2]) + ',' +
            particle.colour[3] + ')';

        var x = this.pos.x + particle.pos.x;
        var y = this.pos.y + particle.pos.y;

        ctx.beginPath();
        ctx.arc(x, y, particle.size, 0, Math.PI * 2);
        ctx.fill();
    }
};

var emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.abstract);

function loop() {

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    emitter.update();

    requestAnimFrame(loop);
}

function rain() {

    emitter = new Emitter(100, 60, settings.rain);
}

function abstract() {

    emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.abstract);
}

function blood() {

    emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.blood);
}

function fire() {

    emitter = new Emitter(canvas.width / 2, canvas.height / 2, settings.fire);
}

loop();