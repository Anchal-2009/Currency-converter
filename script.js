const BASE_URL ="https://hexarate.paikama.co/api/rates";


const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg");
// for (code in countryList) {
//     console.log(code,countryList[code]);
// }

for(let select of dropdowns){
    for(currcode in countryList){
        let newOption = document.createElement("option");
        newOption.innerText = currcode;
        newOption.value = currcode;
        if(select.name === "from" && currcode === "USD"){
            newOption.selected = 'selected';
        }else if(select.name === "to" && currcode === "INR"){
            newOption.selected = 'selected';

        }
        select.append(newOption);
    }

    select.addEventListener("change" ,(evt) =>{
        updateflag(evt.target);
    })
}

const updateExchangeRate = async() => {
    let amount = document.querySelector(".amount input");
    let amtvalue = amount.value;
    // console.log(amtvalue);
    if(amtvalue ===""|| amtvalue <1){
        amtvalue =1;
        amount.value = "1";
    }

    amtvalue = Number(amtvalue);

    const URL = `https://hexarate.paikama.co/api/rates/${fromcurr.value.toUpperCase()}/${tocurr.value.toUpperCase()}/latest`;

    try {
        let response = await fetch(URL);
        let result = await response.json();

        // Check that API returned proper structure
        if (!result.data || typeof result.data.mid !== "number") {
            throw new Error("Invalid API data");
        }

        let rate = result.data.mid; // now we get the right rate

        let finalamount = amtvalue * rate;
        msg.innerText = `${amtvalue} ${fromcurr.value} = ${finalamount.toFixed(2)} ${tocurr.value}`;

    } catch (error) {
        console.error(error);
        msg.innerText = "Failed to fetch exchange rate. Try again later.";
    }
};

const updateflag = (element)=> {
    let currcode = element.value;
    // console.log(currcode);
    let countrycode = countryList[currcode];
    let newSrc = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let image = element.parentElement.querySelector("img");
    image.src = newSrc;

}

btn.addEventListener("click" , (evt) =>{
    evt.preventDefault();
    updateExchangeRate();
});

window.addEventListener("load" , () => {
    updateExchangeRate();
});

