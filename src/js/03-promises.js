import Notiflix from 'notiflix';

const form = document.querySelector('.form');
const delay = form.elements.delay;
const step = form.elements.step;
const amount = form.elements.amount;
const btn = form.querySelector('button');

btn.addEventListener('submit', evt => {
  evt.preventDefault();
  console.log(delay.value);
  console.log(step.value);
  console.log(amount.value);
});
/* function createPromise(position, delay) {
  const shouldResolve = Math.random() > 0.3;
  if (shouldResolve) {
    // Fulfill
  } else {
    // Reject
  }
} */
