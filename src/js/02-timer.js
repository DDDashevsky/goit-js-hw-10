import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';
import Notiflix from 'notiflix';

const fields = document.querySelectorAll('.field');
const days = document.querySelector('span[data-days]');
const hours = document.querySelector('span[data-hours]');
const minutes = document.querySelector('span[data-minutes]');
const seconds = document.querySelector('span[data-seconds]');
const btn = document.querySelector('button[data-start]');
const input = document.querySelector('#datetime-picker');

const currentDate = new Date();
let selectedDate;

const fp = flatpickr(input, {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    if (selectedDates[0] < currentDate) {
      Notiflix.Notify.warning('Please choose a date in the future');
      btn.setAttribute('disabled', 'true');
    } else {
      btn.removeAttribute('disabled');
      selectedDate = fp.selectedDates[0];
    }
  },
});

function convertMs(ms) {
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

btn.addEventListener('click', callback);

function callback() {
  btn.setAttribute('disabled', 'true');

  for (let i = 0; i < fields.length; i++) {
    fields[i].classList.add('field--active');
  }

  let timer = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      Notiflix.Report.success('That`s it', 'You`ve wasted your time', 'wow!');
      clearInterval(timer);
      return;
    }

    const convertedDate = convertMs(diff);

    days.textContent = addLeadingZero(convertedDate.days);
    hours.textContent = addLeadingZero(convertedDate.hours);
    minutes.textContent = addLeadingZero(convertedDate.minutes);
    seconds.textContent = addLeadingZero(convertedDate.seconds);
  }, 1000);
}

function addLeadingZero(value) {
  return String(value).padStart(2, '0');
}
