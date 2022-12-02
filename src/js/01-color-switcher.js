function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
const body = document.querySelector('body');
stopBtn.disabled = true;
let intervalId = null;
function updateBodyColor() {
  startBtn.disabled = true;
  stopBtn.disabled = false;
  intervalId = setInterval(() => {
    body.style = `background-color:${getRandomHexColor()}`;
  }, 1000);
}
startBtn.addEventListener('click', updateBodyColor);
stopBtn.addEventListener('click', () => {
  clearInterval(intervalId);
  startBtn.disabled = false;
  stopBtn.disabled = true;
});
