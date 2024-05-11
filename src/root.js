import { decrement, increment } from './utilities/counter.js';
import {price_format} from "./utilities/currency.js";

const historyTbody = document.querySelector(".history-products")
const receiptTbody = document.querySelector(".receipt-row")
const totalPrice = document.querySelector(".total-price")

const incrementButton = document.querySelector(".product-quantity-increment");
const decrementButton = document.querySelector(".product-quantity-decrement");
const cashPainButton = document.querySelector(".cash-paid")

const addButton = document.querySelector(".addition-button")
let quantityValue = parseInt(document.querySelector(".addition-input-quantity").value);

let price = 0

incrementButton.addEventListener("click", () => {
    quantityValue = increment(quantityValue);
    document.querySelector(".addition-input-quantity").value = quantityValue;
});

decrementButton.addEventListener("click", () => {
    quantityValue = decrement(quantityValue);
    document.querySelector(".addition-input-quantity").value = quantityValue;
});

addButton.addEventListener("click", () =>{
    const historyRow = document.createElement("tr");
    const receiptRow = document.createElement("tr");
    historyRow.innerHTML = `
        <td>123</td>
        <td>${price_format(4000 * quantityValue)}</td>
        <td>${quantityValue}</td>
        <td>2024-05-08 09:16:54</td>
    `;
    receiptRow.innerHTML = `
        <td>Cola</td>
        <td>${4000 * quantityValue} USZ</td>
        <td>${quantityValue}</td>
    `;
    price += 4000 * quantityValue
    historyTbody.appendChild(historyRow);
    receiptTbody.appendChild(receiptRow)
    totalPrice.innerHTML = 'Итого: ' + price_format(price)
})

cashPainButton.addEventListener("click", () => {
    receiptTbody.innerHTML = ""
    price = 0
    totalPrice.innerHTML = 'Итого: ' + price_format(price)
    document.querySelector(".addition-input-quantity").value = 1;
})
