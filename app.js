  class UI {
  constructor(firstCurrency, secondCurrency) {
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;

    this.outputFirst = document.getElementById("outputFirst");
    this.outputSecond = document.getElementById("outputSecond");
    this.outputResult = document.getElementById("outputResult");
  }

  changeFirst() {
    this.outputFirst.textContent =
      this.firstCurrency.options[this.firstCurrency.selectedIndex].textContent;
  }
  changeSecond() {
    this.outputSecond.textContent =
      this.secondCurrency.options[
        this.secondCurrency.selectedIndex
      ].textContent;
  }

  displayResult(result) {
    this.outputResult.value = result;
  }
}

/*  *********************************************** */

class Currency {
  constructor(firstCurrency, secondCurrency) {
    this.firstCurrency = firstCurrency;
    this.secondCurrency = secondCurrency;
    this.url = "https://api.exchangerate.host/latest?base=";
    this.amount = null;
  }

  exchange() {
    return new Promise((resolve, reject) => {
      fetch(this.url + this.firstCurrency)
        .then((response) => response.json())
        .then((data) => {
          const parity = data["rates"][this.secondCurrency];
          const amount2 = Number(this.amount);

          let total = parity * amount2;
          resolve(total);
        })
        .catch((err) => reject(err));
    });
  }

  changeAmount(amount) {
    this.amount = amount;
  }

  changefirstCurrency(newFirstCurrency) {
    this.firstCurrency = newFirstCurrency;
  }
  changeSecondCurrency(newSecondCurrency) {
    this.secondCurrency = newSecondCurrency;
  }
}

/*
 ***************************
 */

const amountElement = document.querySelector(".input1");
const firstSelect = document.querySelector(".firstCurrency");
const secondSelect = document.querySelector(".secondCurrency");
const firstCurrencyBox=document.querySelector(".first-currency-value")
const secondCurrencyBox=document.querySelector(".second-currency-value")



const currency = new Currency("RUB", "USD");
const ui = new UI(firstSelect, secondSelect);
eventListeners();

function eventListeners() {
  amountElement.addEventListener("input", exchangeCurrency);
  firstSelect.onchange = function () {
    currency.changefirstCurrency(
      firstSelect.options[firstSelect.selectedIndex].textContent
    );
    ui.changeFirst();
  };
  secondSelect.onchange = function () {
    currency.changeSecondCurrency(
      secondSelect.options[secondSelect.selectedIndex].textContent
    );
    ui.changeSecond();
  };
}

firstSelect.addEventListener('change',onSelectorChange);
secondSelect.addEventListener('change',onSelectorChange);

function onSelectorChange(event){
  exchangeCurrency();
  console.log(event.target);
}

function exchangeCurrency() {
  currency.changeAmount(amountElement.value);
  currency
    .exchange()
    .then((result) => {
      ui.displayResult(result);
    })
    .catch((err) => console.log(err));
}

