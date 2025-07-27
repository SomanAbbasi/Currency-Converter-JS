
const amount=document.getElementById("amount")
const fromCurrency=document.getElementById("from-currency")
const toCurrency=document.getElementById("to-currency")
const result=document.getElementById("result")
const price=document.getElementById("price")

const API_KEY = '6e5bbcd428d3fec713f321f6'; 
const API_URL="https://v6.exchangerate-api.com/v6/6e5bbcd428d3fec713f321f6/latest/"

async function fetchCurrencies()
{
  const response=await fetch(`${API_URL}USD`)
  const data=await response.json();
  console.log(data)
  const currencies=Object.keys(data.conversion_rates)
  console.log(currencies)
  currencies.forEach(currency=>{
    const option1=document.createElement("option");
    const option2=document.createElement("option");
    option1.value=option2.value=currency;
    option1.text=option2.text=currency;
    fromCurrency.appendChild(option1);
    toCurrency.appendChild(option2);
  })
  fromCurrency.value='USD';
  toCurrency.value='PKR';
}

fetchCurrencies()

async function convertCurrency() {
  const from=fromCurrency.value;
  const to=toCurrency.value;
  const amt=parseFloat(amount.value);
  if(isNaN(amt) || amt<=0)
  {
    result.textContent="Enter a valid amount to convert. ";
    console.log("Error")
    return
  }

  try
  {
    const response=await fetch(`${API_URL}${from}`);
    const data=await response.json();
    const rate=data.conversion_rates[to];
    const converted=(amt*rate).toFixed(2);
    result.textContent=`Converted amount: ${converted} ${to}`;
    price.textContent=`1 ${from} = ${rate} ${to}`


  }catch(error)
  {
    result.textContent="Error fetching Conversion rates."
  }
  
}