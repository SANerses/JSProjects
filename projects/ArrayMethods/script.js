const main = document.getElementById('main');
const addUserBtn = document.getElementById('add-user');
const doubleBtn = document.getElementById('double');
const showMillionairesBtn = document.getElementById('show-millionaires');
const sortBtn = document.getElementById('sort');
const calculateWealthBtn = document.getElementById('calculate-wealth');

let data = [];

async function start(){
    await getRandomUser();
    await getRandomUser();
    await getRandomUser();

    setupListeners();
}

async function getRandomUser(){
    try {
        const res = await fetch('https://randomuser.me/api');
        const data = await res.json();
        const user = data?.results[0];

        if (user) {
            const newUser = {
                name: `${user.name.first} ${user.name.last}`,
                money: Math.floor(Math.random() * 1000000)
            };
        
            addData(newUser);
        }
    } catch(err) {
        console.log('request error -> ', err);
    }
}

function doubleMoney() {
    data = data.map(({ money, ...rest }) => {
        return { ...rest, money: money * 2 };
    });

    updateDOM();
}

function sortByRichest(){
    data.sort((a, b) => b.money - a.money);

    updateDOM();
}

function showMillionaires() {
    data = data.filter(user => (user.money >= 1000000));

    updateDOM();
}

function getWealthElement(id = 'welthElement') {
    const el = document.getElementById(id);

    if (el) {
        return el;
    }

    const wealthEl = document.createElement('div');
    wealthEl.id = id;

    main.appendChild(wealthEl);

    return wealthEl;
}

function calculateWealth(){
    const wealth = data.reduce((acc, user) => (acc + user.money), 0);

    getWealthElement().innerHTML = `
        <h3>
            Total Wealth: 
            <strong>${formatMoney(wealth)}</strong>
        <h3>
    `;
}

function addData(obj){
    data.push(obj);

    updateDOM();
}

function updateDOM(providedData = data){
    main.innerHTML = '<h2><strong>Person</strong></h2>';

    providedData.forEach(item => {
        const element = document.createElement('div');
        element.classList.add('person');
        element.innerHTML = `<strong>${item.name}</strong> ${formatMoney(item.money)}`;
        
        main.appendChild(element);
    });
}

function formatMoney(number) {
    return '$' + number.toFixed(2).replace(/\d(?=(\d{3})+\.)/g,'$&,');
}

function setupListeners(){
    addUserBtn.addEventListener('click', getRandomUser);
    doubleBtn.addEventListener('click', doubleMoney);
    sortBtn.addEventListener('click', sortByRichest);
    showMillionairesBtn.addEventListener('click', showMillionaires);
    calculateWealthBtn.addEventListener('click', calculateWealth);
}

start();
