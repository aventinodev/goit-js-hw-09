import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
};
refs.button.disabled = true;
let selectedTime = 0;

const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    let currentTime = Date.now();
    selectedTime = selectedDates[0].getTime();

    if (selectedTime < currentTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
      refs.button.disabled = true;
      return;
    }
    refs.button.disabled = false;
  },
};
const fp = flatpickr(refs.input, options);
selectedTime = fp.selectedDates[0].getTime();

function convertMs(ms) {
  // Number of milliseconds per unit of time
  const second = 1000;
  const minute = second * 60;
  const hour = minute * 60;
  const day = hour * 24;

  const days = Math.floor(ms / day);
  const hours = Math.floor((ms % day) / hour);
  const minutes = Math.floor(((ms % day) % hour) / minute);
  const seconds = Math.floor((((ms % day) % hour) % minute) / second);
  return { days, hours, minutes, seconds };
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
function upDateTime(obj) {
  let { days, hours, minutes, seconds } = obj;
  let arrayValue = Object.values(obj);
  const arrayRefs = Object.values(refs);
  for (let i = 0; i < arrayValue.length; i += 1) {
    // arrayrefs[i].innerHTML = addLeadingZero(arrayValue[i]);
    arrayRefs[i].textContent = addLeadingZero(arrayValue[i]);
  }
}
function timer() {
  const startTimer = setInterval(() => {
    refs.button.disabled = true;
    let currentTime = Date.now();
    let timeLeft = selectedTime - currentTime;
    let timeLeftObj = convertMs(timeLeft);
    upDateTime(timeLeftObj);

    if (timeLeft < 1000) {
      clearInterval(startTimer);
      refs.button.disabled = false;
    }
  }, 1000);
}
refs.button.addEventListener('click', timer);
