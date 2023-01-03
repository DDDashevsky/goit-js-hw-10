import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

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
      alert('Please choose a date in the future');
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

  let timer = setInterval(() => {
    const diff = selectedDate - new Date();

    if (diff <= 0) {
      console.log('fin!');
      clearInterval(timer);
      return;
    }

    const convertedDate = convertMs(diff);

    // функция за тз. Не впевнений, що вона повинна бути саме тут, але працює

    days.textContent = convertedDate.days;
    hours.textContent = convertedDate.hours;
    minutes.textContent = convertedDate.minutes;
    seconds.textContent = convertedDate.seconds;

    function addLeadingZero() {
      days.textContent = days.textContent.padStart(2, '0');
      hours.textContent = hours.textContent.padStart(2, '0');
      minutes.textContent = minutes.textContent.padStart(2, '0');
      seconds.textContent = seconds.textContent.padStart(2, '0');
    }

    addLeadingZero();

    // ======== //

    /*    days.textContent =
      convertedDate.days < 10 ? '0' + convertedDate.days : convertedDate.days;

    hours.textContent =
      convertedDate.hours < 10
        ? '0' + convertedDate.hours
        : convertedDate.hours;

    minutes.textContent =
      convertedDate.minutes < 10
        ? '0' + convertedDate.minutes
        : convertedDate.minutes;

    seconds.textContent =
      convertedDate.seconds < 10
        ? '0' + convertedDate.seconds
        : convertedDate.seconds; */
  }, 1000);
}
