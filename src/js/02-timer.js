import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
startBtn = document.querySelector('button[data-start]');
startBtn.disabled = true;

const daysRef = document.querySelector('span[data-days]');
const hoursRef = document.querySelector('span[data-hours]');
const minutesRef = document.querySelector('span[data-minutes]');
const secondsRef = document.querySelector('span[data-seconds]');
console.log(Notify);
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // console.log(selectedDates[0]);
    if (selectedDates[0] - options.defaultDate < 0) {
      Notify.failure('Please choose a date in the future');
    } else if (selectedDates[0] - options.defaultDate > 0) {
      options.chosenDate = selectedDates[0];
      enableBtn();
      updateData();
      //   console.log(selectedDates);
    }
  },
};
flatpickr('input#datetime-picker', options);
function enableBtn() {
  startBtn.disabled = false;
}
function calcDiff() {
  if (options.chosenDate - options.defaultDate < 1000) {
    return 0;
  } else {
    return options.chosenDate - options.defaultDate;
  }
}
function convertMs(ms) {
  if (ms < 1000 || ms === undefined) {
    const days = 0;
    const hours = 0;
    const minutes = 0;
    const seconds = 0;
    return { days, hours, minutes, seconds };
  }
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
function addLeadingZero(value) {
  return value.toString().padStart(2, '0');
}
function updateAPIData({ days, hours, minutes, seconds }) {
  daysRef.textContent = addLeadingZero(days);
  hoursRef.textContent = addLeadingZero(hours);
  minutesRef.textContent = addLeadingZero(minutes);
  secondsRef.textContent = addLeadingZero(seconds);
}
let timerId = null;
function startTimer() {
  timerId = setInterval(() => {
    if (options.chosenDate - options.defaultDate < 1000) {
      return;
    } else {
      updateData();
    }
  }, 1000);
  if (options.chosenDate - options.defaultDate < 1000) {
    clearInterval(timerId);
    startBtn.removeEventListener('click', startTimer);
  }
}
function updateData() {
  options.defaultDate = new Date();
  console.log(options.chosenDate);
  console.log(options.defaultDate);
  const diffData = calcDiff();
  const convertedDiffData = convertMs(diffData);
  updateAPIData(convertedDiffData);
}
startBtn.addEventListener('click', startTimer);
