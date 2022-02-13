const clock = document.querySelector('.clock');
const body = document.querySelector('body');

const addZero = time => {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
};

const updateClock = () => {
    let now = new Date();
    let hour = addZero(now.getHours());
    let minute = addZero(now.getMinutes());
    let second = addZero(now.getSeconds());

    let hour_col = parseInt((255 / 23) * hour);
    let minute_col = parseInt((255 / 59) * minute);
    let second_col = parseInt((255 / 59) * second);

    body.style.backgroundImage = `linear-gradient(45deg, rgba(${hour_col}, ${minute_col}, ${second_col}, 0.75), rgba(${second_col}, ${minute_col}, ${hour_col}, 0.75))`;

    clock.innerHTML = `${hour}:${minute}:${second}`;
};

updateClock();

setInterval(updateClock, 1000);
