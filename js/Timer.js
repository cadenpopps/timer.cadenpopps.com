function Timer(h, m, s) {

    var hours = h, minutes = m, seconds = s;
    this.running = false;
    var lastTime = millis();
    const ORIGINAL_SECONDS = (h * 1200) + (m * 60) + s;

    var origHours = h, origMinutes = m, origSeconds = s;
    restartTimer = undefined;

    this.expanding = false;

    this.getTimeString = function () {
        let s = "" + (seconds);
        while (s.length < 2) {
            s = "0" + s;
        }
        if (minutes != 0 || hours != 0) {
            let m = "" + minutes;
            while (m.length < 2) {
                m = "0" + m;
            }
            if (hours != 0) {
                let h = "" + hours;
                return h + ":" + m + ":" + s;
            }
            else {
                return m + ":" + s;
            }
        }
        return s;
    };

    this.done = function () {
        this.running = false;
        hours = 0;
        minutes = 0;
        seconds = 0;
        alert("done");
    };

    this.reset = function () {
        hours = origHours;
        minutes = origMinutes;
        seconds = origSeconds;
    };

    this.update = function () {
        if (this.running) {
            seconds--;
            if (seconds < 0) {
                if (minutes > 0) {
                    this.expanding = !this.expanding
                    seconds = 59;
                    minutes--;
                }
                else {
                    if (hours > 0) {
                        seconds = 59;
                        minutes = 59;
                        hours--;
                    }
                    else {
                        this.done();
                    }
                }
            }
            secondTimer = setTimeout(() => {
                timer.update();
            }, 1000);
        }
        lastTime = millis();
    };

    this.start = function () {
        if (seconds >= 60) {
            seconds -= 60;
            minutes++;
            if (minutes >= 60) {
                minutes -= 60;
                hours++;
            }
        }
        this.running = true;
        setTimeout(() => {
            if (seconds == 0) {
                if (minutes > 0) {
                    seconds = 60;
                    minutes--;
                }
                else {
                    if (hours > 0) {
                        seconds = 60
                        minutes = 59;
                        hours--;
                    }
                    else {
                        this.done();
                    }
                }
            }
            this.update();
        }, 1000);
    };

    this.pause = function () {
        this.running = false;
        pausedMillis = max(1000 - (millis() - lastTime), 1000);
        lastTime = millis();
        if (secondTimer) {
            clearTimeout(secondTimer);
        }
        if (restartTimer) {
            clearTimeout(restartTimer);
        }
    };

    this.resume = function () {
        this.running = true;
        restartTimer = setTimeout(() => {
            clearTimeout(restartTimer);
            restartTimer = undefined;
            timer.update();
        }, pausedMillis);
    };

    this.draw = function () {
        let percent = ((hours * 1200) + (minutes * 60) + seconds) / ORIGINAL_SECONDS;
        if (colorMode == LIGHT) stroke(40, 40, 80);
        else if (colorMode == DARK) stroke(255, 0, 150);
        strokeWidth(12);
        strokeArc(width / 2, height / 2, 300, -.5 * Math.PI, (-.5 * Math.PI) + (percent * (2 * Math.PI)));
    };

    this.start();
}