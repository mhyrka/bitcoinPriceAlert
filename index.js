const get_price_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

let globalCurrentPrice = 0

let body = document.querySelector('body')

let currentPriceSection = document.querySelector('.current-price')
let price = document.createElement('h2')
let formInput = document.querySelector('input')

let sidenav = document.querySelector('.sidenav')

append(currentPriceSection, price)


let currencyOptionsDropdown = document.querySelector('.currency-options')
let initialValue = {}
let currencySelected = 'USD'
let percentLoss = 0
let percentGain = 0
let customPrice = 0

let setAlertButton = document.querySelector('button')
setAlertButton.addEventListener('click', event => {
  alertEventHandler()
})

currencyOptionsDropdown.addEventListener('change', event => {
  event.preventDefault()
  updateCurrency(event.target.value)
  getPrice()
})

function alertEventHandler() {
  window.alert('Alert Set!')
  window.myInterval = setInterval(function(){
    setAlert()
  }, 1000), getFormInput()
}

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
}

function displayPrice(data) {
  let currentPrice = data.bpi[currencySelected].rate_float
  globalCurrentPrice = currentPrice
  if (currencySelected === 'USD') {
    price.textContent = `$ ${currentPrice}`
  } else if (currencySelected === 'GBP') {
    price.textContent = `£ ${currentPrice}`
  } else if (currencySelected === 'EUR')
    price.textContent = `€ ${currentPrice}`
}

function setParameters()  {
  let percentLossDropdown = document.querySelector('#percentLoss')
  let percentGainDropdown = document.querySelector('#percentGain')

  percentLossDropdown.addEventListener('change', event => {
    percentLoss = parseFloat(event.target.value)
  })
  percentGainDropdown.addEventListener('change', event => {
    percentGain = parseFloat(event.target.value)
  })

}
setParameters()



function setAlert() {
<<<<<<< HEAD:app.js
  console.log('alert set!');
  let formInput = document.querySelector('input')
  customPrice = formInput.value
  if (globalCurrentPrice > (initialValue.currencySelected * percentGain + initialValue.currencySelected)) {
    alert('WORKING!')
    console.log('working!');
  } else if (globalCurrentPrice < (initialValue.currencySelected * percentGain + initialValue.currencySelected)) {

=======
  if (globalCurrentPrice > ((initialValue[currencySelected] * (percentGain / 100)) + initialValue[currencySelected]) && percentGain !== 0) {
    window.alert(`Bitcoin has gained ${percentGain}%`)
    clearInterval(window.myInterval)
  } else if (globalCurrentPrice < (initialValue[currencySelected] - (initialValue[currencySelected] * (percentLoss / 100))) && percentLoss !== 0) {
    window.alert(`Bitcoin has lost ${percentLoss}%`)
    clearInterval(window.myInterval)
  } else if (parseInt(globalCurrentPrice) === parseInt(customPrice)){
    window.alert(`Bitcoin has reached value: ${customPrice}!`)
    clearInterval(window.myInterval)
>>>>>>> a01619591d3dbde05c058bf44cc9b5c38fb9c52d:index.js
  }
}

function getFormInput() {
  let formInput = document.querySelector('input')
  customPrice = formInput.value
  resetForm()
}

function resetForm() {
  formInput.value = ''
}

function updateCurrency(choice) {

  switch (choice) {
    case "1":
      currencySelected = "USD"
      break;
    case "2":
      currencySelected = "GBP"
      break;
    case "3":
      currencySelected = "EUR"
      break;
    default:
  }
<<<<<<< HEAD:app.js

=======
>>>>>>> a01619591d3dbde05c058bf44cc9b5c38fb9c52d:index.js
}


function append(parent, child) {
  return parent.appendChild(child)
}

window.setInterval(function(){
  getPrice()
}, 1000)

window.setInterval(function(){
  setAlert()
}, 1000)


getPrice()
fetchInitialValue()

let menu = document.querySelector('#menu')
let about = document.querySelector('p')



function openNav() {
  let main = document.querySelector('main')
  sidenav.setAttribute('style', 'width: 300px; padding-left: 2.5vw; padding-right: 2.5vw;')
  main.setAttribute('style', '-webkit-filter: blur(5px); -moz-filter: blur(5px); -o-filter: blur(5px);-ms-filter: blur(5px); filter: blur(5px);')
}

function closeNav() {
  let main = document.querySelector('main')
  sidenav.setAttribute('style', 'padding-left: 0; padding-right: 0')
  document.querySelector('.sidenav').style.width = "0px"
  main.setAttribute('style', '-webkit-filter: none; -moz-filter: none; -o-filter: none;-ms-filter: none; filter: none;')
}
