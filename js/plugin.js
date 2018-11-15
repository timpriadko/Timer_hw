const Timer = function() {
    let timer_container;
    let end_time_container;
    let countdown;
    /**
     * init - инициализировать наш модуль
     */
    function init(settings) {
        timer_container = document.querySelector(settings.timer_container);
        end_time_container = document.querySelector(settings.timer_end_date_container);
        return this;
    }

    /**
     * start - запускать таймер на указанное время в секундах
     */
    function start(seconds) {
        if (!seconds || typeof seconds !== "number") return console.log("Please provide seconds");

        clearInterval(countdown);

        const now = Date.now();
        const end = now + seconds * 1000;

        _display_time_left(seconds);
        _display_end_time(end);

        // вывести в разметку таймер и дату окончания работы таймера
        countdown = setInterval(() => {
            const second_left = Math.round((end - Date.now()) / 1000);

            if (second_left < 0) return clearInterval(countdown);

            _display_time_left(second_left);
        }, 1000);
    }

    /**
     * stop - принудительно останавливать таймер
     */
    function stop() {
        clearInterval(countdown);
        timer_container.textContent = "";
        end_time_container.textContent = "";
    }

    function _display_time_left(seconds) {
        const minutes = Math.floor(seconds / 60);
        const reminder_seconds = seconds % 60;
        const hours = Math.floor(minutes / 60);
        const days = Math.floor(hours / 24);

        let display = `${minutes}:${reminder_seconds < 10 ? "0" : ""}${reminder_seconds}`;

        if (minutes > 60 && minutes < 1440) {
            display = `${hours}:${minutes - (hours * 60)}:${reminder_seconds < 10 ? "0" : ""}${reminder_seconds}`;
        } else if (minutes >= 1440) {
            display = `${days}d ${hours - (days * 24)}:${minutes - (hours * 60)}:${reminder_seconds < 10 ? "0" : ""}${reminder_seconds}`;
        }

        timer_container.textContent = display;
        document.title = display;
    }

    function _display_end_time(timestamp) {
        const end_date = new Date(timestamp);
        const hour = end_date.getHours();
        const minutes = end_date.getMinutes();
        const day = end_date.toLocaleString('en-US', { weekday: 'long' });
        const month = end_date.toLocaleString('en-US', { month: 'long' });
        const date = end_date.toLocaleString('en-US', { day: 'numeric' });

        const display = `Be back at ${day}, ${month} ${date}, ${hour}:${minutes < 10 ? "0" : ""}${minutes}`;
        end_time_container.textContent = display;
    }

    return {
        init,
        start,
        stop
    }
}

const btns = document.querySelectorAll("[data-time]");
const reset_btn = document.querySelector(".stop__button");
const form = document.forms['customForm'];

const my_timer1 = Timer().init({
    timer_container: ".display__time-left",
    timer_end_date_container: ".display__end-time"
});

function onClickHandler(e) {
    let seconds = Number(this.dataset.time);
    my_timer1.start(seconds);
}


btns.forEach(btn => btn.addEventListener("click", onClickHandler));
reset_btn.addEventListener("click", my_timer1.stop);

const custom_timer = form.addEventListener('submit', (e) => {
    e.preventDefault();

    let minutes;

    let seconds = +document.querySelector('input').value * 60;
    my_timer1.start(seconds);
});