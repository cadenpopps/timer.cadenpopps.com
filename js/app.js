

$(document).ready(function () {
    timerEvents();
    $(".mode").click(function (event) {
        $(".mode.active").removeClass("active");
        $(event.target).closest(".mode").addClass("active");
        $("#timerInput").css('display', 'none');

        if ($(event.target).closest(".mode").html() == "timer") {
            mode = TIMER;
            timerEvents();
        }
        else if ($(event.target).closest(".mode").html() == "stopwatch") {
            mode = STOPWATCH;
        }
        else if ($(event.target).closest(".mode").html() == "alarm") {
            mode = ALARM;
        }
    });
    $(".themeOption").click(function (event) {
        $(".themeOption.active").removeClass("active");
        $(event.target).closest(".themeOption").addClass("active");
        if ($(event.target).closest(".themeOption").html() == "light") {
            changeColor(LIGHT);
            $('body').css('background-color', 'var(--lightColor)');
            $('body, input').css('color', 'var(--darkColor)');
            $('.active').css('border-color', 'var(--darkColor)');
            $(".timeInput").css('border-color', 'var(--darkColor)');
            $(".timeInput").css('background-color', 'var(--lightColor)');
            $("#pauseIcon").css('background-color', 'rgba(40,40,80,.06)');
            $("#resumeIcon").css('background-color', 'rgba(40,40,80,.06)');
            $(".iconImg").css('filter', 'none');
        }
        else if ($(event.target).closest(".themeOption").html() == "dark") {
            changeColor(DARK);
            $('body').css('background-color', 'var(--darkColor)');
            $('body, input').css('color', 'var(--lightColor)');
            $('.active').css('border-color', 'var(--lightColor)');
            $(".timeInput").css('border-color', 'var(--lightColor)');
            $(".timeInput").css('background-color', 'var(--darkColor)');
            $("#pauseIcon").css('background-color', 'rgba(255,80,200,.1)');
            $("#resumeIcon").css('background-color', 'rgba(255,80,200,.1)');
            $(".iconImg").css('filter', 'invert(100%)');
        }
    });

    $('.timeInput').on('keypress', function (e) {
        return e.metaKey ||
            e.which <= 0 ||
            e.which == 8 ||
            /[0-9]/.test(String.fromCharCode(e.which));
    });
});

function timerEvents() {
    timer = undefined;
    $("#timerInput").css('display', 'flex');
    $("#timerGoButton").css('display', 'block');
    $("#timerDisplay").css('display', 'none');
    $("#resetIcon").css('display', 'none');
    $("#newTimerIcon").css('display', 'none');
    $(".timeInput").val("");


    $(document).keydown(function (event) {
        if (event.keyCode == 13) {
            timerGo();
        }
    });

    $('#hours').on('input', function () {
        if ($('#hours').val().length == 2) {
            $("#minutes").focus();
        }
    });
    $('#minutes').on('input', function () {
        if ($('#minutes').val().length == 2) {
            $("#seconds").focus();
        }
    });
    $('#minutes').keydown(function (event) {
        if ($('#minutes').val().length == 0 && event.keyCode == 8) {
            $("#hours").focus();
        }
    });
    $('#seconds').keydown(function (event) {
        if ($('#seconds').val().length == 0 && event.keyCode == 8) {
            $("#minutes").focus();
        }
    });

    $("#timerGoButton").click(function () {
        timerGo();
    });

}

function timerGo() {
    if (Number($('#hours').val()) != 0 ||
        Number($('#minutes').val()) != 0 ||
        Number($('#seconds').val()) != 0) {

        $(document).off('keydown');
        $("#timerInput").css('display', 'none');
        $("#timerGoButton").css('display', 'none');
        $("#timerDisplay").css('display', 'block');
        $("#resetIcon").css('display', 'block');
        $("#newTimerIcon").css('display', 'block');

        $("#newTimerIcon").click(function () {
            newTimer();
        });
        $("#resetIcon").click(function () {
            resetTimer();
        });

        let hours = Number($('#hours').val()) || 0;
        let minutes = Number($('#minutes').val()) || 0;
        let seconds = Number($('#seconds').val()) || 0;

        timer = new Timer(hours, minutes, seconds);

        setTimeout(() => {
            $("canvas").on('mouseover', function () {
                if (timer.running) {
                    $("#pauseIcon").css('display', 'block');
                }
                else {
                    $("#resumeIcon").css('display', 'block');
                }
                $("#timerDisplay").css('opacity', '.6');
            }).on('mouseleave', function () {
                $("#pauseIcon").css('display', 'none');
                $("#resumeIcon").css('display', 'none');
                $("#timerDisplay").css('opacity', '1');
            });
        }, 500);
    }
}

function newTimer() {
    timerEvents();
}
function resetTimer() {
    timer.reset();
}

function changeColor(m) {
    colorMode = m;
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