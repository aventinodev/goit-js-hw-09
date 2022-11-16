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
let currentTime = Date.now();

let defTime = 0;
let convertDateObj = {};
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    const chosenTime = selectedDates[0].getTime();
    console.log(chosenTime);
    if (currentTime > chosenTime) {
      alert('Please choose a date in the future');
      refs.button.disabled = true;
      return;
    }
    // refs.button.disabled = false;
    // defTime = chosenTime - currentTime;
    // console.log(defTime);
    // convertDateObj = convertMs(defTime);
    // console.log(convertDateObj);
  },
};
const fp = flatpickr(refs.input, options);
console.log(fp.selectedDates[0].getTime());

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

// function timer(e) {
//   setInterval(() => {
//     // console.log(convertDate);
//   }, 1000);
// }

// refs.button.addEventListener('click', timer());
