import Notiflix from 'notiflix';

const form = document.querySelector('.form');

form.addEventListener('submit', callback);

function callback(evt) {
  evt.preventDefault();
  const delayValue = Number(evt.currentTarget.elements.delay.value); //я не зовсім зрозумів, чому такій запис краще за окремі константи
  const stepValue = Number(evt.currentTarget.elements.step.value);
  const amountValue = Number(evt.currentTarget.elements.amount.value);
  promiseGeneration(delayValue, stepValue, amountValue);
}

function promiseGeneration(delay, step, amount) {
  form.querySelector('button').setAttribute('disabled', 'true');
  console.log('test');
  for (let i = 0; i < amount; i += 1) {
    createPromise(i + 1, delay)
      .then(({ position, delay }) => {
        Notiflix.Notify.success(
          `✅ Fulfilled promise ${position} in ${delay}ms`
        );
      })
      .catch(({ position, delay }) => {
        Notiflix.Notify.warning(
          `❌ Rejected promise ${position} in ${delay}ms`
        );
      })
      .finally(() => form.querySelector('button').removeAttribute('disabled'));
    delay += step;
  }
}

// та взагалі не розумію, чому цей варіант кращій за перший. Прошу пояснити

function createPromise(position, delay) {
  const promise = new Promise((resolve, reject) => {
    const shouldResolve = Math.random() > 0.3;

    setTimeout(() => {
      if (shouldResolve) {
        resolve({ position, delay });
      } else {
        reject({ position, delay });
      }
    }, delay);
  });
  return promise;
}
