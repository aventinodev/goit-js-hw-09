const refs = {
  btnStart: document.querySelector('[data-start]'),
  btnStop: document.querySelector('[data-stop]'),
  bodyColor: document.querySelector('body'),
};
let colorChange = null;

const clickStart = () => {
  colorChange = setInterval(() => {
    refs.bodyColor.style.backgroundColor = getRandomHexColor();
  }, 1000);
  refs.btnStart.disabled = true;
};
const clickStop = () => {
  clearInterval(colorChange);
  refs.btnStart.disabled = false;
};

refs.btnStart.addEventListener('click', clickStart);
refs.btnStop.addEventListener('click', clickStop);

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}
