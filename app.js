const get_price_url = 'https://api.coindesk.com/v1/bpi/currentprice.json'

function append(parent, child) {
  return parent.appendChild(child)
}

let body = document.querySelector('body')

let currentPriceSection = document.querySelector('.current-price')
let price = document.createElement('h2')
append(currentPriceSection, price)


function getPrice() {
  fetch(get_price_url)
  .then(response => response.json())
  .then(response => displayPrice(response))
}

function displayPrice(data) {
  let currentPrice = data.bpi.USD.rate_float
  price.textContent = currentPrice
  console.log(price.textContent)
}

window.setInterval(function(){
  getPrice()
}, 1000)

function setCurrency(choice, currencyId) {

}

getPrice()
