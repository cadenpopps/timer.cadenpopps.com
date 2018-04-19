
light = [245, 245, 250];
dark = [10, 10, 20];

b = light;
f = dark;

const LIGHT = 0;
const DARK = 1;

const TIMER = 0;
const STOPWATCH = 1;
const ALARM = 2;

mode = TIMER;

// rgb(245,245,250)
function setup() {
    createCanvas($("#canvas").width(), $("#canvas").height(), "canvas");
    fill(f[0], f[1], f[2]);
    stroke(f[0], f[1], f[2]);
    strokeWidth(2);

    loop();
}

function draw() {
    background(b[0], b[1], b[2]);

    if (mode == TIMER) {
        strokeRect(width / 8, 80, (width / 8) * 6, 120);
    }
    else if (mode == STOPWATCH) {
        strokeRect(width / 8, 120, (width / 8) * 6, 140);
    }
}

function colorMode(m) {
    if (m == LIGHT) {
        b = light;
        f = dark;
    }
    else if (m == DARK) {
        b = dark;
        f = light;
    }
    fill(f[0], f[1], f[2]);
    stroke(f[0], f[1], f[2]);
}