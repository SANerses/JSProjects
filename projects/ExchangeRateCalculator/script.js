const currencyEl_one = document.getElementById('currency-one');
const amountEl_one = document.getElementById('amount-one');
const currencyEl_two = document.getElementById('currency-two');
const amountEl_two = document.getElementById('amount-two');
const rateEl = document.getElementById('rate');
const swap = document.getElementById('swap');
const spinnerContainer = document.getElementById('spinnerContainer');

const CURENCY_OPTIONS = [
    "AED",
    "ARS",
    "AUD",
    "BGN",
    "BRL",
    "BSD",
    "CAD",
    "CHF",
    "CLP",
    "CNY",
    "COP",
    "CZK",
    "DKK",
    "DOP",
    "EGP",
    "EUR",
    "FJD",
    "GBP",
    "GTQ",
    "HKD",
    "HRK",
    "HUF",
    "IDR",
    "ILS",
    "INR",
    "ISK",
    "JPY",
    "KRW",
    "KZT",
    "MXN",
    "MYR",
    "NOK",
    "NZD",
    "PAB",
    "PEN",
    "PHP",
    "PKR",
    "PLN",
    "PYG",
    "RON",
    "RUB",
    "SAR",
    "SEK",
    "SGD",
    "THB",
    "TRY",
    "TWD",
    "UAH",
    "USD",
    "UYU",
    "VND",
    "ZAR",
];

const STORAGE_KEY = 'RATE_INFO';

const state = {
    fromCurrency: CURENCY_OPTIONS[0],
    fromAmount: 1,
    toCurrency: CURENCY_OPTIONS[1],
    toAmount: 0,
    isLoading: true,
}

function initSelectOptions(selectElement, exclude) {
    const value = selectElement.value;
    selectElement.innerText = null;

    CURENCY_OPTIONS.filter(opt => opt !== exclude)
        .map(optVal => (new Option(optVal, optVal, optVal === value, optVal === value)))
        .forEach(option => {
            selectElement.appendChild(option);
        })
}

function setExchangeData(currentValue) {
    localStorage.setItem(STORAGE_KEY,  JSON.stringify(currentValue));
}

function getInitialExchangeData() {
    const storageValue = localStorage.getItem(STORAGE_KEY);
    try {
        return storageValue && JSON.parse(storageValue) || {};
    } catch {
        return {};
    }
}

function updateUi() {
    currencyEl_one.value = state.fromCurrency;
    currencyEl_two.value = state.toCurrency;
    amountEl_one.value = state.fromAmount;
    amountEl_two.value = state.toAmount;
}

function initData() {
    const savedState = getInitialExchangeData();

    if (savedState?.fromCurrency) {
        state.fromCurrency = savedState.fromCurrency;

        if (savedState?.fromAmount) {
            state.fromAmount = savedState.fromAmount;
        }
    }

    if (savedState?.toCurrency) {
        state.toCurrency = savedState.toCurrency;
    }

    initSelectOptions(currencyEl_one, state.toCurrency);
    initSelectOptions(currencyEl_two, state.fromCurrency);
    updateUi();
}

function getRateInfo() {
    return fetch(`https://open.exchangerate-api.com/v6/latest/${state.fromCurrency}`)
        .then(res => res.json())
        .catch((err) => {
            console.error(err);
            return null;
        }); 
}

function calculateValues() {
    state.isLoading = true;
    updateLoaderVisibility();

    getRateInfo()
        .then((data) => {
            state.isLoading = false;
            updateLoaderVisibility();

            if (data) {
                const rate = data.rates[state.toCurrency] || 1;
                updateRate(rate);

                state.toAmount = (state.fromAmount * rate).toFixed(2);

                amountEl_two.value = state.toAmount;
                setExchangeData(state);
            }
        });
}

function updateRate(rate){
    rateEl.innerText = `1 ${state.fromCurrency} = ${rate.toFixed(2)} ${state.toCurrency}`;
    return rate;
}

function setupListeners(){
    currencyEl_one.addEventListener('change', () => {
        state.fromCurrency = currencyEl_one.value;
        
        initSelectOptions(currencyEl_two, state.fromCurrency);
        
        calculateValues();
    });

    amountEl_one.addEventListener('input', (e) => {
        if(amountEl_one.value >= 1) {
            state.fromAmount = parseInt(amountEl_one.value);
            amountEl_one.value = state.fromAmount;
            calculateValues();
        }else{
            amountEl_one.value = 1;
            state.fromAmount = 1;
        }
    });

    currencyEl_two.addEventListener('change', () => {
        state.toCurrency = currencyEl_two.value;
        initSelectOptions(currencyEl_one, state.toCurrency);
        calculateValues();
    });

    amountEl_two.addEventListener('input', (ev) => {
        amountEl_two.value = state.toAmount;
    });

    swap.addEventListener('click', () => {
        state.toCurrency = currencyEl_one.value;
        state.fromCurrency = currencyEl_two.value;
        
        initSelectOptions(currencyEl_one, state.toCurrency);
        initSelectOptions(currencyEl_two, state.fromCurrency);

        currencyEl_one.value = state.fromCurrency;
        currencyEl_two.value = state.toCurrency;

        calculateValues();
    });
}

function updateLoaderVisibility(){
    if(state.isLoading){
        spinnerContainer.classList.add('show');
    } else {
        spinnerContainer.classList.remove('show');
    }
}

function main(){
    initData();
    setupListeners();
    calculateValues();
}

main();
