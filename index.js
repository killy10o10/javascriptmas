const countdownDaysDisplay = document.getElementById('countdown-days-display');
const countdownHoursDisplay = document.getElementById('countdown-hours-display');
const countdownMinutesDisplay = document.getElementById('countdown-minutes-display');
const countdownSecondsDisplay = document.getElementById('countdown-seconds-display');
const countdownText = document.querySelector('.countdown-text');
const countdownTitle = document.getElementById('countdown-title');

const daySpan = document.getElementById('days-span');
const hourSpan = document.getElementById('hours-span');
const minuteSpan = document.getElementById('minutes-span');
const secondSpan = document.getElementById('seconds-span');

let countdownDate;

function renderCountdown(title, date) {
  countdownDate = new Date(date);

  function updateInRealTime() {
    const currentDate = new Date();

    const timeDifference = countdownDate - currentDate;

    const days = Math.ceil(timeDifference / (1000 * 60 * 60 * 24))
      .toString()
      .padStart(2, '0');
    const hours = Math.floor((timeDifference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))
      .toString()
      .padStart(2, '0')
      .toString()
      .padStart(2, '0');
    const minutes = Math.floor((timeDifference % (1000 * 60 * 60)) / (1000 * 60))
      .toString()
      .padStart(2, '0');
    const seconds = Math.floor((timeDifference % (1000 * 60)) / 1000)
      .toString()
      .padStart(2, '0');

    countdownDaysDisplay.innerText = `${days}:`;
    countdownHoursDisplay.innerText = `${hours} : `;
    countdownMinutesDisplay.innerText = `${minutes} : `;
    countdownSecondsDisplay.innerText = seconds;
    countdownText.innerText = `'til ${title}!`;
    countdownTitle.innerText = `${title} Countdown`;

    daySpan.innerText = `Day${days > 1 ? 's' : ''}`;
    hourSpan.innerText = `Hour${hours > 1 ? 's' : ''}`;
    minuteSpan.innerText = `Minute${minutes > 1 ? 's' : ''}`;
    secondSpan.innerText = `Second${seconds > 1 ? 's' : ''}`;
  }

  setInterval(updateInRealTime, 1000);
  updateInRealTime();
}

const savedCountdown = JSON.parse(localStorage.getItem('countdown'));
if (savedCountdown) {
  renderCountdown(savedCountdown.title, savedCountdown.date);
} else {
  document.getElementById('countdown-title-input').value = 'Christmas';
  document.getElementById('countdown-date-input').value = '2023-12-25';
  startCustomCountdown();
}

function startCustomCountdown() {
  const countdownTitleInput = document.getElementById('countdown-title-input').value;
  const countdownDateInput = document.getElementById('countdown-date-input').value;

  const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
  if (!dateRegex.test(countdownDateInput)) {
    alert('Invalid date format. Please use YYYY-MM-DD.');
    return;
  }

  const customCountdownDate = new Date(countdownDateInput);
  const currentDate = new Date();

  if (customCountdownDate <= currentDate) {
    alert('Please enter a future date!');
    return;
  }

  const countdownData = { title: countdownTitleInput, date: countdownDateInput };
  localStorage.setItem('countdown', JSON.stringify(countdownData));

  renderCountdown(countdownTitleInput, countdownDateInput);
  location.reload();
}

const dialog = document.querySelector('dialog');
const showButton = document.getElementById('toggle-dialog');
const closeButton = document.getElementById('close-dialog');

showButton.addEventListener('click', () => {
  dialog.showModal();
});

closeButton.addEventListener('click', () => {
  dialog.close();
});
