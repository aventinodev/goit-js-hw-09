import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

const refs = {
  input: document.querySelector('input'),
  button: document.querySelector('[data-start]'),
  days: document.querySelector('[data-days]'),
  hours: document.querySelector('[data-hours]'),
  minutes: document.querySelector('[data-minutes]'),
  seconds: document.querySelector('[data-seconds]'),
};

refs.button.disabled = true;

let defTime = null;
let convertData = {};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const currentTime = new Date().getTime();
    // const chosenTime = Date.now(selectedDates[0]);
    const chosenTime = new Date().getTime(selectedDates[0]);
    console.log(chosenTime);
    console.log(currentTime);
    if (currentTime > chosenTime) {
      alert('Please choose a date in the future');
      refs.button.disabled = true;
      return;
    }
    refs.button.disabled = false;
    defTime = chosenTime - currentTime;
    console.log(defTime);
    convertData = convertMs(defTime);
    console.log(convertData);
  },
};
flatpickr(refs.input, options);

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
// console.log(convertMs(2000)); // {days: 0, hours: 0, minutes: 0, seconds: 2}
// console.log(convertMs(140000)); // {days: 0, hours: 0, minutes: 2, seconds: 20}
// console.log(convertMs(24140000)); // {days: 0, hours: 6 minutes: 42, seconds: 20}

function timer(e) {
  setInterval(() => {
    // console.log(convertData);
  }, 1000);
}

refs.button.addEventListener('click', timer());
