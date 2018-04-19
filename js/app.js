

$(document).ready(function () {
    $(".mode").click(function (event) {
        $(".mode.active").removeClass("active");
        $(event.target).closest(".mode").addClass("active");
        if ($(event.target).closest(".mode").html() == "timer") {
            mode = TIMER;
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
            colorMode(LIGHT);
            $('body').css('background-color', 'var(--lightColor)');
            $('body').css('color', 'var(--darkColor)');
            $('.active').css('border-color', 'var(--darkColor)');
        }
        else if ($(event.target).closest(".themeOption").html() == "dark") {
            colorMode(DARK);
            $('body').css('background-color', 'var(--darkColor)');
            $('body').css('color', 'var(--lightColor)');
            $('.active').css('border-color', 'var(--lightColor)');
        }
    });
});