const clock = document.querySelector('.clock');
const body = document.querySelector('body');

function addZero(time) {
    if (time < 10) {
        time = '0' + time;
    }
    return time;
}

setInterval(() => {
    let now = new Date();
    let hour = addZero(now.getHours());
    let minute = addZero(now.getMinutes());
    let second = addZero(now.getSeconds());

    let hour_col = parseInt((255 / 23) * hour);
    let minute_col = parseInt((255 / 59) * minute);
    let second_col = parseInt((255 / 59) * second);

    // body.style.backgroundImage = `linear-gradient(45deg, #${hour_col}${minute_col}${second_col}, #${second_col}${minute_col}${hour_col})`;

    body.style.backgroundImage = `linear-gradient(45deg, rgba(${hour_col}, ${minute_col}, ${second_col}, 1), rgba(${second_col}, ${minute_col}, ${hour_col}, 1))`;

    // body.style.backgroundImage = `linear-gradient(45deg, #${hour}${minute}${second}, #${second}${minute}${hour})`;
    clock.innerHTML = `${hour}:${minute}:${second}`;

    console.log(hour_col, minute_col, second_col);
}, 1000);
