// info containers
const lapsElement = document.getElementById('laps');
const timeElement = document.getElementById('time');

// action container
const startActions = document.getElementById('startActions');
const finalActions = document.getElementById('finalActions');

// action buttons
const resetBtn = document.getElementById('reset');
const startBtn = document.getElementById('start');
const lapBtn = document.getElementById('lap');
const stopBtn = document.getElementById('stop');

let m = '00';
let s = '00';
let ms = '00';

let allLaps = [];

let intervalId;
let isTimerStarted = false;
let startedDate;
const minPerMilisec = 60000;

function getFormatedTime(m,s,ms) {
    return `${m} : ${s}, ${ms}`
}

function startTiming() {
    startedDate = new Date();
    intervalId = setInterval(displayTimer, 100);
    isTimerStarted = true;
    finalActions.classList.remove('hidden');
    startActions.classList.add('hidden');
}

function stopTiming() {
    clearInterval(intervalId);
    startedDate = null;
    isTimerStarted = false;
    startActions.classList.remove('hidden');
    finalActions.classList.add('hidden');
}

function displayTimer(){
    const currentDate = new Date();
    const diff = currentDate - startedDate;

    const min = Math.floor(diff / minPerMilisec);
    const minsByMs = min * minPerMilisec;

     const sec = Math.floor((diff - minsByMs) / 1000);

     const milisec = Math.floor((diff - minsByMs - sec * 1000) / 10);

     m = `${min}`.padStart(2, 0);
     s = `${sec}`.padStart(2, 0);
     ms = `${milisec}`.padStart(2, 0);
   
    timeElement.innerHTML = getFormatedTime(m,s,ms);
}

function resetLaps() {
    m = '00';
    s = '00';
    ms = '00';

    timeElement.innerHTML = getFormatedTime(m, s, ms);

    allLaps = [];
    lapsElement.innerHTML = '';
    lapsNumber = 1;
}

function createLapUi(time, index) {
    const lapUi = document.createElement('div');
    lapUi.innerHTML = `
        <span>Lap${index}</span>
        <span>${time}</span>
    `;

    return lapUi;
}

function addLap() {
    const lapInfo = getFormatedTime(m,s,ms);

    allLaps.push(lapInfo);

    lapsElement.appendChild(createLapUi(lapInfo, allLaps.length));
}

startBtn.addEventListener('click', startTiming);
stopBtn.addEventListener('click', stopTiming);
resetBtn.addEventListener('click', resetLaps);
lapBtn.addEventListener('click', addLap);

timeElement.innerHTML = getFormatedTime(m,s,ms);
