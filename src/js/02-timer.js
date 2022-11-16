import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const refs = {
  input: document.querySelector('#datetime-picker'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};
refs.button.disabled = true;
let currentTime = 0;
let selectedTime = 0;
let timeLeft = 0;
let timeLeftObj = {};
let objValue = [];
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    currentTime = Date.now();
    selectedTime = selectedDates[0].getTime();
    if (currentTime > selectedTime) {
      Notiflix.Notify.failure('Please choose a date in the future');
      // alert('Please choose a date in the future');
      refs.button.disabled = true;
      return;
    }
    refs.button.disabled = false;
  },
};
const fp = flatpickr(refs.input, options);
// selectedTime = fp.selectedDates[0].getTime();

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
  objValue = Object.values(obj);
  refs.days.textContent = addLeadingZero(objValue[0]);
  refs.hours.textContent = addLeadingZero(objValue[1]);
  refs.minutes.textContent = addLeadingZero(objValue[2]);
  refs.seconds.textContent = addLeadingZero(objValue[3]);
}

function timer() {
  const startTimer = setInterval(() => {
    refs.button.disabled = true;
    currentTime = Date.now();
    timeLeft = selectedTime - currentTime;
    timeLeftObj = convertMs(timeLeft);
    console.log('time left:', timeLeftObj);
    upDateTime(timeLeftObj);
    console.log(timeLeft);
    if (timeLeft < 1000) {
      clearInterval(startTimer);
      refs.button.disabled = false;
    }
  }, 1000);
}

refs.button.addEventListener('click', timer);
