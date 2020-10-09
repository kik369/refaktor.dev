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
  body.style.backgroundImage = `linear-gradient(45deg, #${hour}${minute}${second}, #${second}${minute}${hour})`;
  clock.innerHTML = `${hour}:${minute}:${second}`;
}, 1000);
