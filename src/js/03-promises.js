import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const inputDelay = form.elements.delay;
const inputStep = form.elements.step;
const inputAmount = form.elements.amount;
const btn = form.querySelector('button');

form.addEventListener('submit', callback);

function callback(evt) {
  evt.preventDefault();
  const delayValue = Number(inputDelay.value);
  const stepValue = Number(inputStep.value);
  const amountValue = Number(inputAmount.value);

  promiseGeneration(delayValue, stepValue, amountValue);
}

function promiseGeneration(delay, step, amount) {
  btn.setAttribute('disabled', 'true');
  console.log('test');
  for (let i = 0; i < amount; i += 1) {
    setTimeout(createPromise, delay, i, delay);
    delay += step;
  }
}

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;
    if (shouldResolve) {
      resolve({ position, delay });
    } else {
      reject({ position, delay });
    }
  });

  promise
    .then(({ position, delay }) => {
      Notiflix.Notify.success(
        `✅ Fulfilled promise ${position + 1} in ${delay}ms`
      );
    })
    .catch(({ position, delay }) => {
      Notiflix.Notify.warning(
        `❌ Rejected promise ${position + 1} in ${delay}ms`
      );
    })
    .finally(() => btn.removeAttribute('disabled'));
}
