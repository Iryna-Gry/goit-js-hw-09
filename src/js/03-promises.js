import { Notify } from 'notiflix/build/notiflix-notify-aio';

const firstDelayInput = document.querySelector("input[name='delay']");
const delayStepInput = document.querySelector("input[name='step']");
const amountInput = document.querySelector("input[name='amount']");
const form = document.querySelector('form');

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    if (shouldResolve) {
      resolve(position, delay);
    } else {
      reject(position, delay);
    }
  });
}

let intervalId = null;
function invokePromiseSet(evt) {
  evt.preventDefault();
  setTimeout(createPromiseSet, firstDelayInput.value);
}

function createPromiseSet() {
  let position = 0;
  let delay = 0;
  delay = delayStepInput.value;
  intervalId = setInterval(() => {
    position += 1;
    if (position <= amountInput.value) {
      createPromise({ position, delay }).then(onSuccess).catch(onError);
    }
  }, delay);

  if (position > amountInput.value) {
    clearInterval(intervalId);
    return;
  }
}
function onSuccess({ position, delay }) {
  Notify.success(`✅ Fulfilled promise ${position} in ${delay}ms`, {
    position: 'center-top',
  });
}
function onError({ position, delay }) {
  Notify.failure(`❌ Rejected promise ${position} in ${delay}ms`, {
    position: 'center-top',
  });
}
form.addEventListener('submit', invokePromiseSet);
