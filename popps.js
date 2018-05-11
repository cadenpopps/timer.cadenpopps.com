const DRAGDIST = 15, CORNER = 0, CENTER = 1, COORD = 2, INT = "int", POSITIVE = 0, NEGATIVE = 1;

var canvasElement, canvas, invisibleCanvasElement, invisCanvas;
var windowWidth, windowHeight, width, height;
var looping = false;
var frameCount = 0;
var mouseX = 0, mouseY = 0, canvasX = 0, canvasY = 0, key, keycode;
var startTime;
var mouseDown, dStartx, dStraty, cancelClick, key, keycode;

document.addEventListener("DOMContentLoaded", function (event) {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    startTime = new Date();
    if (typeof preload == "function") {
        preloading = true;
        preload();
        preloadInterval = setInterval(function () {
            if (itemsLoaded == preloadCounter) {
                preloading = false;
                if (typeof setup == "function") {
                    clearInterval(preloadInterval);
                    setup();
                }
                else {
                    console.log("Create a setup function to get started");
                }
            }
        }, 10);
    }
    else if (typeof setup == "function") {
        setup();
    }
    else {
        console.log("Create a setup function to get started");
    }
});

function listen(event, preventDefault) {
    switch (event) {
        case "mousemoved":
            if (typeof mouseMoved == 'function') {
                document.addEventListener("mousemove", function (e) { mousemovedListener(e); });
            }
            else {
                document.addEventListener("mousemove", function (e) { updateMouseCoords(e) });
            }
            break;
        case "mouseclicked":
            if (typeof mouseClicked == 'function') {
                document.addEventListener("click", function (e) { mouseclickedListener(e); });
            }
            else {
                document.addEventListener("click", function (e) { updateMouseCoords(e); });
            }
            break;
        case "mousedown":
            if (typeof mouseD == 'function') {
                document.addEventListener("mousedown", function (e) { mousedownListener(e); });
                document.addEventListener("mouseup", function (e) { mouseDown = false; });
            }
            else {
                document.addEventListener("mousedown", function (e) {
                    updateMouseCoords(e);
                    mouseDown = true;
                });
                document.addEventListener("mouseup", function (e) { mouseDown = false; });
            }
            break;
        case "mouseup":
            if (typeof mouseU == 'function') {
                document.addEventListener("mouseup", function (e) { mouseupListener(e); });
            }
            else {
                document.addEventListener("mouseup", function (e) {
                    updateMouseCoords(e);
                    mouseDown = false;
                });
            }
            break;
        case "mousedragged":
            if (typeof mouseDragged == 'function') {
                document.addEventListener("mousedown", function (e) {
                    mouseDown = true;
                    dStartx = event.pageX - canvasX;
                    dStarty = event.pageX - canvasY;
                });
                document.addEventListener("mousemove", function (e) {
                    if (mouseDown && abs(dStartx - event.pageX) > DRAGDIST && abs(dStarty - event.pageY) > DRAGDIST) {
                        mousedraggedListener(e);
                    }
                });
                document.addEventListener("mouseup", function () { mouseDown = false; });
            }
            else {
                document.addEventListener("mousedown", function (e) {
                    mouseDown = true;
                    dStartx = event.pageX - canvasX;
                    dStarty = event.pageX - canvasY;
                });
                document.addEventListener("mousemove", function (e) {
                    if (mouseDown && abs(dStartx - event.pageX) > DRAGDIST && abs(dStarty - event.pageY) > DRAGDIST) {
                        updateMouseCoords(e);
                    }
                });
                document.addEventListener("mouseup", function () { mouseDown = false; });
            }
            break;
        case "keypressed":
            if (typeof keyPressed == 'function') {
                document.addEventListener("keypress", function (e) { keyPressedListener(e); });
            }
            else {
                document.addEventListener("keypress", function (e) { updateKeyAndKeyCode(e); });
            }
            break;
        case "keydown":
            if (typeof keyDown == 'function') {
                document.addEventListener("keydown", function (e) { keyDownListener(e); });
            }
            else {
                document.addEventListener("keydown", function (e) { updateKeyAndKeyCode(e); });
            }
            break;
        case "keyup":
            if (typeof keyUp == 'function') {
                document.addEventListener("keyup", function (e) { keyUpListener(e); });
            }
            else {
                document.addEventListener("keyup", function (e) { updateKeyAndKeyCode(e); });
            }
            break;
        case "windowresized":
            if (typeof windowResized == 'function') {
                window.addEventListener("resize", windowResizedListener);
            }
            else {
                window.addEventListener("resize", function (e) {
                    windowWidth = window.innerWidth;
                    windowHeight = window.innerHeight;
                });
            }
            break;
    }
}

function updateMouseCoords(e) {
    mouseX = e.pageX - canvasX;
    mouseY = e.pageY - canvasY;
}

function updateKeyAndKeyCode(e) {
    key = e.key;
    keycode = e.keyCode;
}

function mousemovedListener(e) {
    updateMouseCoords(e);
    mouseMoved(e);
}

function mouseclickedListener(e) {
    if (cancelClick) {
        cancelClick = false;
    }
    else {
        updateMouseCoords(e)
        mouseClicked(e);
    }
}

function mousedownListener(e) {
    mouseDown = true;
    updateMouseCoords(e);
    mouseD(e);
}

function mouseupListener(e) {
    mouseDown = false;
    updateMouseCoords(e);
    mouseU(e);
}

function mousedraggedListener(e) {
    cancelClick = true;
    updateMouseCoords(e);
    mouseDragged(e);
}

function keyPressedListener(e) {
    updateKeyAndKeyCode(e);
    keyPressed(e);
}

function keyDownListener(e) {
    updateKeyAndKeyCode(e);
    keyDown(e);
}

function keyUpListener(e) {
    updateKeyAndKeyCode(e);
    keyUp(e);
}

function windowResizedListener() {
    windowWidth = window.innerWidth;
    windowHeight = window.innerHeight;
    windowResized(e);
}

function mouseClicked() { }
function mouseD() { }
function mouseU() { }
function mouseDragged() { }
function keyPressed() { }
function keyDown() { }
function keyUp() { }

function loop() {
    looping = true;
    frameCount = 0;
    requestAnimationFrame(frameUpdate);
}

function noLoop() {
    looping = false;
}

function frameUpdate() {
    if (looping) {
        frameCount++;
        draw();
        requestAnimationFrame(frameUpdate);
    }
}

function millis() {
    var endTime = new Date();
    return endTime - startTime;
}

function createCanvas(w, h, parent) {
    canvasElement = document.createElement("canvas");
    if (parent) {
        document.getElementById("" + parent).append(canvasElement);
    }
    else {
        document.getElementsByTagName("BODY")[0].append(canvasElement);
    }
    canvas = canvasElement.getContext("2d");
    canvas.canvas.width = w;
    canvas.canvas.height = h;
    width = w;
    height = h;
    var r = canvasElement.getBoundingClientRect();
    var scrollTop = document.documentElement.scrollTop ?
        document.documentElement.scrollTop : document.body.scrollTop;
    var scrollLeft = document.documentElement.scrollLeft ?
        document.documentElement.scrollLeft : document.body.scrollLeft;
    canvasX = r.left + scrollLeft;
    canvasY = r.top + scrollTop;

    window.addEventListener("scroll", function (event) {
        var r = canvasElement.getBoundingClientRect();
        scrollTop = document.documentElement.scrollTop ?
            document.documentElement.scrollTop : document.body.scrollTop;
        scrollLeft = document.documentElement.scrollLeft ?
            document.documentElement.scrollLeft : document.body.scrollLeft;
        canvasX = r.left + scrollLeft;
        canvasY = r.top + scrollTop;
    });
    return canvas;
}

function createInvisibleCanvas() {
    if (invisCanvas == undefined) {
        invisibleCanvasElement = document.createElement("canvas");
        invisCanvas = invisibleCanvasElement.getContext("2d");
        invisCanvas.canvas.width = 0;
        invisCanvas.canvas.height = 0;
        return invisibleCanvasElement;
    }
}

function resizeCanvas(w, h) {
    canvas.canvas.width = w;
    canvas.canvas.height = h;
    width = w;
    height = h;
}

function resizeInvisibleCanvas(w, h) {
    if (invisCanvas != undefined) {
        invisCanvas.canvas.width = w;
        invisCanvas.canvas.height = h;
        invisibleCanvasElement.style.width = w;
        invisibleCanvasElement.style.height = h;
    }
}

function fill(r, g, b, a) {
    var f = "rgb";
    if (r === undefined) {
        f += "(0,0,0)";
        canvas.fillStyle = f;
        return;
    }
    r = Math.round(r);
    if (g === undefined) {
        f += "(" + r + "," + r + "," + r + ")";
        canvas.fillStyle = f;
        return;
    }
    g = Math.round(g);
    b = Math.round(b);
    if (a === undefined) {
        f += "(" + r + "," + g + "," + b + ")";
        canvas.fillStyle = f;
        return;
    }
    f += "a(" + r + "," + g + "," + b + "," + a;
    canvas.fillStyle = f;
    return;
}

function stroke(r, g, b, a) {
    var f = "rgb";
    if (r === undefined) {
        f += "(0,0,0)";
        canvas.strokeStyle = f;
        return;
    }
    r = Math.round(r);
    if (g === undefined) {
        f += "(" + r + "," + r + "," + r + ")";
        canvas.strokeStyle = f;
        return;
    }
    g = Math.round(g);
    b = Math.round(b);
    if (a === undefined) {
        f += "(" + r + "," + g + "," + b + ")";
        canvas.strokeStyle = f;
        return;
    }
    f += "a(" + r + "," + g + "," + b + "," + a;
    canvas.strokeStyle = f;
    return;
}

function strokeWidth(w) {
    canvas.lineWidth = w;
}

function noStroke() {
    canvas.strokeStyle = "transparent";
}

function background(r, g, b, a) {
    var t = canvas.fillStyle;
    fill(r, g, b, a);
    canvas.beginPath();
    canvas.rect(0, 0, width, height);
    canvas.fill();
    canvas.fillStyle = t;
}

function clearBackground() {
    canvas.clearRect(0, 0, width, height);
}

function rect(x1, y1, x2, y2, type) {
    canvas.beginPath();
    if (type === undefined) {
        canvas.rect(x1, y1, x2, y2);
    }
    else if (type == 1) {
        canvas.rect(x1 - (x2 / 2), y1 - (y2 / 2), x2, y2);
    }
    else if (type == 2) {
        canvas.rect(x1, y1, x2 - x1, y2 - y1);
    }
    else {
        console.log("Invalid Rectangle Type");
        canvas.closePath();
        return;
    }
    canvas.fill();
}

function strokeRect(x1, y1, x2, y2, type) {
    canvas.beginPath();
    if (type === undefined || type === CORNER) {
        canvas.rect(x1, y1, x2, y2);
    }
    else if (type == CENTER) {
        canvas.rect(x1 - (x2 / 2), y1 - (y2 / 2), x2, y2);
    }
    else if (type == COORD) {
        canvas.rect(x1, y1, x2 - x1, y2 - y1);
    }
    else {
        console.log("Invalid Rectangle Type");
        canvas.closePath();
        return;
    }
    canvas.stroke();
}

function line(x1, y1, x2, y2, w) {
    canvas.beginPath();
    canvas.moveTo(x1, y1);
    canvas.lineTo(x2, y2);
    if (w) {
        var t = canvas.lineWidth;
        strokeWidth(w);
        canvas.stroke();
        strokeWidth(t);
    }
    else {
        canvas.stroke();
    }
}

function ellipse(x, y, r) {
    canvas.beginPath();
    if (r) {
        canvas.arc(x, y, r, 0, 2 * Math.PI);
    }
    else {
        canvas.arc(x, y, 1, 0, 2 * Math.PI);
    }
    canvas.fill();
}

function strokeEllipse(x, y, r) {
    canvas.beginPath();
    if (r) {
        canvas.arc(x, y, r, 0, 2 * Math.PI);
    }
    else {
        canvas.arc(x, y, 1, 0, 2 * Math.PI);
    }
    canvas.stroke();
}

function arc(x, y, r, startAngle, endAngle, ant) {
    canvas.beginPath();
    if (ant) {
        canvas.arc(x, y, r, startAngle, endAngle, true);
    }
    else {
        canvas.arc(x, y, r, startAngle, endAngle);
    }
    canvas.fill();
}

function strokeArc(x, y, r, startAngle, endAngle, ant) {
    canvas.beginPath();
    if (ant) {
        canvas.arc(x, y, r, startAngle, endAngle, true);
    }
    else {
        canvas.arc(x, y, r, startAngle, endAngle);
    }
    canvas.stroke();
}

function point(x, y, r) {
    canvas.beginPath();
    if (r) {
        canvas.arc(x, y, r, 0, 2 * Math.PI);
    }
    else {
        canvas.arc(x, y, 1, 0, 2 * Math.PI);
    }
    canvas.fill();
}

function strokePoint(x, y, r) {
    canvas.beginPath();
    if (r) {
        canvas.arc(x, y, r, 0, 2 * Math.PI);
    }
    else {
        canvas.arc(x, y, 1, 0, 2 * Math.PI);
    }
    canvas.stroke();
}

function image(img, sx, sy, sWidth, sHeight, x, y, width, height) {
    if (img != undefined) {
        if (sWidth === undefined) {
            canvas.drawImage(img, sx, sy);
        }
        else if (x === undefined) {
            canvas.drawImage(img, sx, sy, sWidth, sHeight);
        }
        else {
            canvas.drawImage(img, sx, sy, sWidth, sHeight, x, y, width, height);
        }
    }
}

// -------------------------------   Data Structures   -------------------------------

preloadCounter = 0;
itemsLoaded = 0;

function loadJSON(path) {
    if (preloading) preloadCounter++;
    var req = new XMLHttpRequest();
    req.overrideMimeType("application/json");
    req.open('GET', path, false);
    req.send(null);
    if (req.readyState == 4 && req.status == "200") {
        if (preloading) {
            itemsLoaded++;
        }
        return JSON.parse(req.responseText);
    } else {
        console.log("Error loading JSON");
    }
}

function loadImage(url) {
    if (preloading) preloadCounter++;
    let img = new Image();
    if (preloading) {
        img.onload = function () {
            itemsLoaded++;
        }
    }
    img.src = url;
    return img;
}

function getCropped(img, sx, sy, width, height) {
    createInvisibleCanvas();
    resizeInvisibleCanvas(width, height);
    invisCanvas.drawImage(img, sx, sy, width, height, 0, 0, width, height);
    return loadImage(invisibleCanvasElement.toDataURL());
}

function createVector(val1, val2, val3) {
    if (val1 && val2 && val3) {
        return new Vector(val1, val2, val3);
    }
    if (val1 && val2) {
        return new Vector(val1, val2);
    }
    if (val1) {
        return new Vector(val1, 0);
    }
    return new Vector(0, 0);
}

function Vector(val1, val2) {
    this.x = val1;
    this.y = val2;
    this.set = function (val1, val2) {
        if (val2) {
            this.x = val1;
            this.y = val2;
            return this;
        }
        if (val1) {
            this.x = val1;
            this.y = 0;
            return this;
        }
        this.x = 0;
        this.y = 0;
        return this;
    }
    this.mult = function (v2) {
        if (typeof v2 === 'number') {
            this.x *= v2;
            this.y *= v2;
        }
        else {
            this.x *= v2.x;
            this.y *= v2.y;
        }
        return this;
    }
    this.div = function (v2) {
        if (typeof v2 === 'number') {
            this.x *= v2;
            this.y *= v2;
        }
        else {
            this.x *= v2.x;
            this.y *= v2.y;
        }
        return this;
    }
    this.add = function (v2) {
        if (typeof v2 === 'number') {
            this.x += v2;
            this.y += v2;
        }
        else {
            this.x += v2.x;
            this.y += v2.y;
        }
        return this;
    }
    this.sub = function (v2) {
        if (typeof v2 === 'number') {
            this.x -= v2;
            this.y -= v2;
        }
        else {
            this.x -= v2.x;
            this.y -= v2.y;
        }
        return this;
    }
}

function applyForces(pos, vel, acc) {
    pos.add(vel);
    vel.add(acc);
}

// -------------------------------   Math   -------------------------------

function abs(val) {
    return Math.abs(val);
}

function dist(x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}

function osc(val, center, amp, type) {
    if (center === undefined) {
        return Math.sin(val)
    }
    if (amp === undefined) {
        return Math.sin(val) + center;
    }
    if (type === undefined) {
        return (Math.sin(val) * amp) + center;
    }
    if (type === POSITIVE) {
        return (Math.abs(Math.sin(val)) * amp) + center;
    }
    if (type === NEGATIVE) {
        return (-Math.abs(Math.sin(val)) * amp) + center;
    }
}

function oscSpeed(val, center, amp, speed, type) {
    if (center === undefined) {
        return Math.sin(val)
    }
    if (amp === undefined) {
        return Math.sin(val) + center;
    }
    if (speed === undefined) {
        return (Math.sin(val) * amp) + center;
    }
    if (type === undefined) {
        return (Math.sin(val * speed) * amp) + center;
    }
    if (type === POSITIVE) {
        return (Math.abs(Math.sin(val * speed)) * amp) + center;
    }
    if (type === NEGATIVE) {
        return (-Math.abs(Math.sin(val * speed)) * amp) + center;
    }
}

function randomRound(amp, round) {
    if (amp === undefined) {
        return Math.random();
    }
    if (round === undefined) {
        return Math.random() * amp;
    }
    if (typeof round === 'string') {
        return Math.floor(Math.random() * amp);
    }
    var factor = Math.pow(10, round - 3);
    return Math.floor((Math.random() * amp) * factor) / factor;
}

function random(low, high) {
    if (high) {
        return map(Math.random(), 0, 1, low, high);
    }
    if (low) {
        return Math.random() * low;
    }
    return Math.random();
}

function oneIn(chance) {
    return (1 > random(chance));
}

function fiftyFifty() {
    return (random(1) < .5);
}

function map(val, low1, high1, low2, high2) {
    val = constrain(val, low1, high1);
    var scale = (high2 - low2) / (high1 - low1);
    var dif = low2 - low1;
    return (val * scale) + dif;
}

function floor(val) {
    return Math.floor(val);
}

function ceil(val) {
    return Math.ceil(val);
}

function min(val, low) {
    return Math.max(val, low);
}

function max(val, high) {
    return Math.min(val, high);
}

function getMin(val1, val2) {
    return Math.min(val1, val2);
}

function getMax(val1, val2) {
    return Math.max(val1, val2);
}

function constrain(val, low, high) {
    return max(min(val, low), high);
}
