const get_price_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

let globalCurrentPrice = 0

let body = document.querySelector('body')

let currentPriceSection = document.querySelector('.current-price')
let price = document.createElement('h2')
append(currentPriceSection, price)


let currencyOptionsDropdown = document.querySelector('.currency-options')
let initialValue = {}
let currencySelected = 'USD'
let percentLoss = 0
let percentGain = 0
let customPrice = 0

let setAlertButton = document.querySelector('button')
setAlertButton.addEventListener('click', event => {
  window.myInterval = setInterval(function(){
    setAlert()
  }, 1000), getFormInput()
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
    console.log(percentGain)
  })

}
setParameters()



function setAlert() {
  console.log('check me', ((initialValue[currencySelected] * (percentLoss / 100)) + initialValue[currencySelected]));
  console.log(initialValue[currencySelected]);
  if (globalCurrentPrice > ((initialValue[currencySelected] * (percentGain / 100)) + initialValue[currencySelected])) {
    console.log('working - gain')
    window.alert(`Bitcoin has gained ${percentGain}%`)
    clearInterval(window.myInterval)
  } else if (globalCurrentPrice < (initialValue[currencySelected] - (initialValue[currencySelected] * (percentLoss / 100)))) {
    console.log('working - loss')
    window.alert(`Bitcoin has lost ${percentLoss}%`)
    clearInterval(window.myInterval)
  } else {
    // console.log('somethings wrong');
  }
}

function getFormInput() {
  let formInput = document.querySelector('input')
  customPrice = formInput.value
  console.log('hello')
}



function displayPrice(data) {
  let currentPrice = data.bpi[currencySelected].rate_float
  price.textContent = currentPrice
  globalCurrentPrice = currentPrice
  // console.log(globalCurrentPrice)
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
      console.log(currencySelected);
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

let menu = document.querySelector('#menu')
let about = document.querySelector('p')



function openNav() {
  document.querySelector('.sidenav').style.width = "250px";
}

function closeNav() {
  document.querySelector('.sidenav').style.width = "0px";
}
