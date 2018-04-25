const get_price_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'
let currencySelected = 'USD'
let globalCurrentPrice = 0

let body = document.querySelector('body')

let currentPriceSection = document.querySelector('.current-price')
let price = document.createElement('h2')
append(currentPriceSection, price)


let currencyOptionsDropdown = document.querySelector('.currency-options')
let initialValue = {}
let percentLoss = 0
let percentGain = 0
let customPrice = 0

let setAlertButton = document.querySelector('button')
setAlertButton.addEventListener('click', event => {
  setAlert()
})

currencyOptionsDropdown.addEventListener('change', event => {
  event.preventDefault();
  updateCurrency(event.target.value)
  getPrice()
})

function getPrice() {
  fetch(get_price_url)
  .then(response => response.json())
  .then(response => displayPrice(response))
}

function fetchInitialValue() {
  fetch(get_price_url)
  .then(response => response.json())
  .then(response => setInitialValue(response))
}

function setInitialValue(data) {
  initialValue.USD = data.bpi.USD.rate_float
  initialValue.GBP = data.bpi.GBP.rate_float
  initialValue.EUR = data.bpi.EUR.rate_float
  console.log(initialValue);
}

function setParameters()  {
  let percentLossDropdown = document.querySelector('#percentLoss')
  let percentGainDropdown = document.querySelector('#percentGain')

  percentLossDropdown.addEventListener('change', event => {
    percentLoss = parseFloat(event.target.value)
    console.log(percentLoss);
  })
  percentGainDropdown.addEventListener('change', event => {
    percentGain = parseFloat(event.target.value)
    console.log(percentGain);
  })

}
setParameters()

function setAlert() {
  console.log('alert set!');
  let formInput = document.querySelector('input')
  customPrice = formInput.value
  if (globalCurrentPrice > (initialValue.currencySelected * percentGain + initialValue.currencySelected)) {
    alert('WORKING!')
    console.log('working!');
  }
  // resetForm()
}

// function resetForm() {
//   let formInput = document.querySelector('input')
//   formInput.value = null
// }


function displayPrice(data) {
  let currentPrice = data.bpi[currencySelected].rate_float
  price.textContent = currentPrice
  globalCurrentPrice = currentPrice
}


function updateCurrency(choice) {

  switch (choice) {
    case "1":
      console.log('case 1');
      currencySelected = "USD"
      break;
    case "2":
      console.log('case 2');
      currencySelected = "GBP"
      console.log(currencySelected);
      break;
    case "3":
      console.log('case 3');
      currencySelected = "EUR"
      break;
    default:

  }


}


function append(parent, child) {
  return parent.appendChild(child)
}

window.setInterval(function(){
  getPrice()
}, 1000)


getPrice()
fetchInitialValue()
