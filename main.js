const API_KEY = "fca_live_3bFZaXcU8qvOBYRvc3CauGPKiZmZ5gXXRc0feRNR";
const BASE_URL = "https://api.freecurrencyapi.com/v1/latest"; // Adjusted base URL
const dropdowns = document.querySelectorAll(".dropdown select");
const btn = document.querySelector("form button");
const fromCurr = document.querySelector(".from select");
const toCurr = document.querySelector(".to select");
const message = document.querySelector(".message")

for (let select of dropdowns) {
    for (currCode in countryList) {
        let newoption = document.createElement("option");
        newoption.innerHTML = currCode;
        newoption.value = currCode;
        if (select.name === "from" && currCode === "USD") {
            newoption.selected = "selected";
        } else if (select.name === "to" && currCode === "INR") {
            newoption.selected = "selected";
        }
        select.append(newoption);
        select.addEventListener("change", (evt) => {
            updateFlag(evt.target);
        });
    }
}

const updateFlag = (element) => {
    let currCode = element.value;
    let countryCode = countryList[currCode];
    let newSrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
    let img = element.parentElement.querySelector("img");
    img.src = newSrc;
};

btn.addEventListener("click", async (evt) => {
    evt.preventDefault();
    let amount = document.querySelector(".amount input");
    let amtval = amount.value;
    if (amtval === "" || amtval < 1) {
        amtval = 1;
        amount.value = "1";
    }
    console.log(fromCurr.value, toCurr.value);


    const URL = `${BASE_URL}?apikey=${API_KEY}&currencies=${fromCurr.value},${toCurr.value}`;

    try {
        const response = await fetch(URL);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }
        const data = await response.json();
        const exchangeRate = data.data[toCurr.value];

        const convertedAmount = amtval * exchangeRate;
        console.log(`Exchange rate from ${fromCurr.value} to ${toCurr.value}: ${exchangeRate}`);
        document.querySelector(".message").textContent = `1 ${fromCurr.value} = ${exchangeRate} ${toCurr.value}. Converted Amount: ${convertedAmount.toFixed(2)} ${toCurr.value}`;

        console.log(data);
    } catch (error) {
        console.error('Fetch error:', error);
    }
});
