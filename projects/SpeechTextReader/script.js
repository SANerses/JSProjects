const toggle = document.querySelector('.toggle');
const closeBtn = document.querySelector('.close');
const textarea = document.getElementById('text');
const voicesSelect = document.getElementById('voices');
const readBtn = document.getElementById('read');
const main = document.querySelector('.main');
let voices = [];
const message = new SpeechSynthesisUtterance();
const data = [
  {
    image: './img/drink.jpg',
    text: "I'm Thirsty"
  },
  {
    image: './img/food.jpg',
    text: "I'm Hungry"
  },
  {
    image: './img/tired.jpg',
    text: "I'm Tired"
  },
  {
    image: './img/hurt.jpg',
    text: "I'm Hurt"
  },
  {
    image: './img/happy.jpg',
    text: "I'm Happy"
  },
  {
    image: './img/angry.jpg',
    text: "I'm Angry"
  },
  {
    image: './img/sad.jpg',
    text: "I'm Sad"
  },
  {
    image: './img/scared.jpg',
    text: "I'm Scared"
  },
  {
    image: './img/outside.jpg',
    text: 'I Want To Go Outside'
  },
  {
    image: './img/home.jpg',
    text: 'I Want To Go Home'
  },
  {
    image: './img/school.jpg',
    text: 'I Want To Go To School'
  },
  {
    image: './img/grandma.jpg',
    text: 'I Want To Go To Grandmas'
  }
];

function createBox(item) {
  const box = document.createElement('div');
  const { image, text } = item;
  box.innerHTML = `
    <img src="${image}" alt="${text}" />
    <p class="info">${text}</p>
  `;
  box.classList.add('box');
  box.addEventListener('click', () => {
    setTextMessage(text);
    speakText();
    box.classList.add('active');
    setTimeout(() => box.classList.remove('active'), 800);
  });

  main.appendChild(box);
}

function getVoices() {
    voices = speechSynthesis.getVoices();
    voices.forEach(voice => {
    const option = document.createElement('option');
    option.value = voice.name;
    option.innerText = `${voice.name} ${voice.lang}`;
    voicesSelect.appendChild(option); 
  });
}

function setTextMessage(text) {
  message.text = text;
}

function speakText() {
  speechSynthesis.speak(message);
}

function stopSpeaking() {
  speechSynthesis.cancel();
}

function setVoice(e) {
  message.voice = voices.find(voice => voice.name === e.target.value);
}

speechSynthesis.addEventListener('voiceschanged', getVoices);
voicesSelect.addEventListener('change', setVoice);

readBtn.addEventListener('click', () => {
  setTextMessage(textarea.value);
  speakText();
});

getVoices();

toggle.addEventListener('click', togglePopup);

closeBtn.addEventListener('click', togglePopup);

function togglePopup() {
  stopSpeaking();
  document.getElementById('text-box').classList.toggle('show');

  if(toggle.classList.contains('forward')){
    toggle.classList.remove('forward');
    toggle.classList.add('backwards');
    textarea.value = '';
  } else { 
    toggle.classList.remove('backwards');
    toggle.classList.add('forward'); 
  }
}

readBtn.addEventListener('keypress', event => {
  if(event.key === "Enter") {
    speakText();
  }
});

data.forEach(createBox);