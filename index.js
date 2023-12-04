import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true,
});

function openDoors() {
  document.querySelector('.left-door').style.animation = 'left-open 0.3s forwards';
  document.querySelector('.right-door').style.animation = 'right-open 0.3s forwards';
  document.querySelector('.joke-display').style.animation = 'display-joke 0.3s forwards';
}

function closeDoors() {
  document.querySelector('.left-door').style.animation = 'left-close 0.3s forwards';
  document.querySelector('.right-door').style.animation = 'right-close 0.3s forwards';
  document.querySelector('.joke-display').style.animation = 'none';
}

function resetDoors() {
  document.querySelector('.left-door').style.animation = 'none';
  document.querySelector('.right-door').style.animation = 'none';
  document.querySelector('.joke-display').style.animation = 'none';
}

async function getJoke() {
  closeDoors();

  const jokeDisplay = document.getElementById('joke-display');
  const getJokeButton = document.getElementById('get-joke');

  getJokeButton.innerText = 'Fetching...';
  getJokeButton.disabled = true;

  try {
    const newJoke = await fetchNewJoke();
    jokeDisplay.innerText = newJoke;
  } finally {
    getJokeButton.innerText = 'Get Joke';
    getJokeButton.disabled = false;

    openDoors();
  }
}

async function fetchNewJoke() {
  try {
    const response = await openai.chat.completions.create({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: 'Generate a one line christmas joke with humour' }],
      max_tokens: 60,
    });
    return response.choices[0].message.content || '';
  } catch (error) {
    console.log(error);
  }
}

document.getElementById('window-container').addEventListener('click', openDoors);
document.getElementById('get-joke').addEventListener('click', getJoke);
