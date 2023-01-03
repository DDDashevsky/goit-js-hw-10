const body = document.querySelector('body');
const startBtn = document.querySelector('button[data-start]');
const stopBtn = document.querySelector('button[data-stop]');
let disco = null;

function getRandomHexColor() {
  return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
}

function changeColor() {}

startBtn.addEventListener('click', () => {
  disco = setInterval(() => {
    const hex = getRandomHexColor();
    body.style.backgroundColor = hex;
    startBtn.setAttribute('disabled', 'true');
  }, 1000);
});

stopBtn.addEventListener('click', () => {
  startBtn.removeAttribute('disabled');
  clearInterval(disco);
});
