import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - options.defaultDate < 0) {
      window.alert('Please choose a date in the future');
    } else if (selectedDates[0] - options.defaultDate > 0) {
      options.chosenDate = selectedDates[0];
      enableBtn();
      startTimer();
      //   console.log(selectedDates);
    }
  },
};
flatpickr('input#datetime-picker', options);
function enableBtn() {
  startBtn.disabled = false;
}
function calcDiff() {
  if (options.chosenDate - options.defaultDate <= 0) {
    return;
  } else {
    return options.chosenDate - options.defaultDate;
  }
}
function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;
  //   console.log(ms);
  // Remaining days
  const days = Math.floor(ms / day);
  // Remaining hours
  const hours = Math.floor((ms % day) / hour);
  // Remaining minutes
  const minutes = Math.floor(((ms % day) % hour) / minute);
  // Remaining seconds
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);

  return { days, hours, minutes, seconds };
}
function updateData({ days, hours, minutes, seconds }) {
  daysRef.textContent = days.toString().padStart(2, '0');
  hoursRef.textContent = hours.toString().padStart(2, '0');
  minutesRef.textContent = minutes.toString().padStart(2, '0');
  secondsRef.textContent = seconds.toString().padStart(2, '0');
}
function startTimer() {
  console.log(options.chosenDate);
  if (options.chosenDate - options.defaultDate <= 0) {
    clearInterval(intervalId);
  } else {
    options.defaultDate = new Date();
    const diffData = calcDiff();
    //   console.log(diffData);
    const convertedDiffData = convertMs(diffData);
    updateData(convertedDiffData);
  }
}
startBtn.addEventListener('click', () => {
  const intervalId = setInterval(startTimer, 1000);
  if (options.chosenDate - options.defaultDate <= 0) {
    clearInterval(intervalId);
  }
});
