import Notiflix from 'notiflix';

const form = document.querySelector('form');
let delayValue = 0;
let stepValue = 0;
let amountValue = 0;
let delayArg = 0;

form.addEventListener('submit', onCallPromise);

function onCallPromise(e) {
  e.preventDefault();
  const { delay, step, amount } = e.currentTarget.elements;
  delayValue = Number(delay.value);
  stepValue = Number(step.value);
  amountValue = Number(amount.value);

  for (let i = 1; i <= amountValue; i += 1) {
    delayArg = delayValue + stepValue * (i - 1);
    createPromise(i, delayArg)
      .then(({ position, delay }) => {
        // console.log(`✅ Fulfilled promise ${position} in ${delay}ms`);
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        // console.log(`❌ Rejected promise ${position} in ${delay}ms`);
        Notiflix.Notify.failure(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      });
  }
}

function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  return new Promise((resolve, reject) => {
    setInterval(() => {
      if (shouldResolve) {
        resolve({ position, delay });
        // Fulfill
      } else {
        reject({ position, delay });
        // Reject
      }
    }, delay);
  });
}
