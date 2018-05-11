
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
colorMode = LIGHT;

var timer = undefined;

// rgb(245,245,250)
function setup() {
    createCanvas(600, 600);
    fill(f[0], f[1], f[2]);
    stroke(f[0], f[1], f[2]);
    strokeWidth(2);

    listen('mouseclicked');

    loop();
}

function draw() {
    background(b[0], b[1], b[2]);

    if (mode == TIMER) {
        if (timer !== undefined) {
            $("#timerDisplay").html(timer.getTimeString());
            timer.draw();
        }
    }
    else if (mode == STOPWATCH) {
        strokeRect(width / 8, 120, (width / 8) * 6, 140);
    }
}

function mouseClicked() {
    if (timer != undefined && dist(mouseX, mouseY, width / 2, height / 2) < 300) {
        if (timer.running) {
            timer.pause();
            $('#pauseIcon').css('display', 'none');
            $('#resumeIcon').css('display', 'block');
        }
        else {
            timer.resume();
            $('#pauseIcon').css('display', 'block');
            $('#resumeIcon').css('display', 'none');
        }
    }
}