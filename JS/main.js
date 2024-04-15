// Currencies object
const currencies = {
    UAH: {
        rate: 1,
    },
};

// Currencies elements  
const elementUSD = document.querySelector('#elementUSD');
const elementEUR = document.querySelector('#elementEUR');
const elementGBP = document.querySelector('#elementGBP');
const elementCHF = document.querySelector('#elementCHF');
const elementSEK = document.querySelector('#elementSEK');
const elementCAD = document.querySelector('#elementCAD');
const elementPLN = document.querySelector('#elementPLN');
const elementCZK = document.querySelector('#elementCZK');
const elementAUD = document.querySelector('#elementAUD');
const elementILS = document.querySelector('#elementILS');

getCurrencies();
setInterval(getCurrencies, 10000);

// Inpunts
const giveMoneyInput = document.querySelector('#giveMoney');
const getMoneyInput = document.querySelector('#getMoney');

// Selects for convertation
const convertibleCurrency = document.querySelector('#convertibleCurrency');
const convertedCurrency = document.querySelector('#convertedCurrency');

// Button for exchange selects values
const btnChange = document.querySelector('#btnChange');

convertibleCurrency.addEventListener('change', convertCurrency);
convertedCurrency.addEventListener('change', convertCurrency);
giveMoneyInput.addEventListener('input', convertCurrency);  
btnChange.addEventListener('click', exchangeSelectsValues);

async function getCurrencies() {
    const response = await fetch('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');

    const data = await response.json();

    console.log(data);

    currencies.USD = data[24];
    currencies.EUR = data[31];
    currencies.GBP = data[23];
    currencies.CHF = data[21];
    currencies.CAD = data[1];
    currencies.PLN = data[32];
    currencies.CZK = data[3];
    currencies.AUD = data[0]; 
    currencies.SEK = data[20]; 
    currencies.ILS = data[9]; 

    renderCurrencies(currencies);
};

function renderCurrencies(currencies) {
    elementUSD.innerText = currencies.USD.rate.toFixed(2);
    elementEUR.innerText = currencies.EUR.rate.toFixed(2);
    elementGBP.innerText = currencies.GBP.rate.toFixed(2);
    elementCHF.innerText = currencies.CHF.rate.toFixed(2);
    elementCAD.innerText = currencies.CAD.rate.toFixed(2);
    elementPLN.innerText = currencies.PLN.rate.toFixed(2);
    elementCZK.innerText = currencies.CZK.rate.toFixed(2);
    elementAUD.innerText = currencies.AUD.rate.toFixed(2);
    elementSEK.innerText = currencies.SEK.rate.toFixed(2);
    elementILS.innerText = currencies.ILS.rate.toFixed(2);
}

function exchangeSelectsValues () {
    btnChange.classList.toggle('converter__btn-img_rotated');
    
    const temp = convertibleCurrency.value;
    convertibleCurrency.value = convertedCurrency.value;
    convertedCurrency.value = temp;

    convertCurrency();
}

function convertCurrency() {
    const convertibleRate = currencies[convertibleCurrency.value].rate;
    const convertedRate = currencies[convertedCurrency.value].rate;
    const relativeRate = convertedRate/convertibleRate; 
    let moneyInput;
    
    moneyInput = checkUserInput();

    const convertationResult = parseFloat(moneyInput)/relativeRate;

    getMoneyInput.value = (convertationResult == 0) ? '' : Math.round(convertationResult*100)/100;
}

function checkUserInput() {
    if(giveMoneyInput.value == '') {
        return 0;
    } 

    if(giveMoneyInput.value < 0) {
        giveMoneyInput.value = giveMoneyInput.value*(-1);  
        return giveMoneyInput.value;
    }

    return giveMoneyInput.value;
}
