import {decrement, increment} from './utilities/counter.js';
import {price_format} from "./utilities/currency.js";

const {db} = require('./utilities/database');

const receiptTbody = document.querySelector(".receipt-row")
const receiptPrice = document.querySelector(".receipt-price")
const orderHistory = document.querySelector(".history-products")

const incrementButton = document.querySelector(".product-quantity-increment");
const decrementButton = document.querySelector(".product-quantity-decrement");
const cashPainButton = document.querySelector(".cash-paid")
const cardPainButton = document.querySelector(".card-paid")

const addButton = document.querySelector(".addition-button")
let quantityValue = parseInt(document.querySelector(".addition-input-quantity").value);
let barcodeValue = document.querySelector(".addition-input");

let price = 0
let totalPrice = 0
let isBarcodeEmpty = true
let isFirstOrderedItem = false

// Functions -----------------------------------------------------------------------------

async function getName() {
    if (barcodeValue.value.length === 0) {
        barcodeValue.placeholder = "Nothing to add"
        addButton.disabled = true
        addButton.style.background = "#c4e6fc"
        return;
    }

    return await new Promise((resolve, reject) => {
        db.all('SELECT name, id FROM products WHERE barcode = ?', [barcodeValue.value], (error, rows) => {
            if (error) {
                console.error(error)
                reject(error)
                return;
            }

            barcodeValue.value = ""
            barcodeValue.focus()
            barcodeValue.placeholder = ""
            if (rows.length > 0) {
                resolve(rows)
            } else {
                resolve(null)
            }
        })
    })
}

function getPrice(id) {
    return new Promise((res, rej) => {
        db.all('SELECT value FROM prices WHERE product_id = ?', [id], (error, rows) => {
            if (error) {
                console.error(error)
                rej(error)
                return;
            }
            if (rows.length > 0) {
                res(rows[0].value)
            } else {
                res(null)
            }
        })
    })
}

async function addProductToReceipt() {
    isBarcodeEmpty = false
    if (receiptTbody.childNodes.length === 0) {
        isFirstOrderedItem = true
    }

    const receiptRow = document.createElement("tr");

    let name = await getName()
    let priceValue = await getPrice(name[0].id) * quantityValue

    receiptRow.innerHTML = `<td>${name[0].name}</td><td>${priceValue}</td><td>${quantityValue}</td>`
    receiptTbody.appendChild(receiptRow)

    totalPrice += priceValue
    receiptPrice.innerHTML = `${totalPrice}`
}

async function createOrder() {
    await new Promise((resolve, reject) => {
        db.run("INSERT INTO orders (is_paid_by_card) VALUES (?)", [0], (err) => {
            if (err) {
                console.error("Ошибка при добавлении продукта:", err);
                reject(err);
                return;
            }
            resolve();
        });
    });
}

// Listeners ---------------------------------------------------------------------------------

incrementButton.addEventListener("click", () => {
    quantityValue = increment(quantityValue);
    document.querySelector(".addition-input-quantity").value = quantityValue;
});

decrementButton.addEventListener("click", () => {
    quantityValue = decrement(quantityValue);
    document.querySelector(".addition-input-quantity").value = quantityValue;
});

barcodeValue.addEventListener("input", (e) => {
    if (e.target.value.length === 0) {
        barcodeValue.placeholder = "Nothing to add"
        addButton.disabled = true
        addButton.style.background = "#c4e6fc"
    } else {
        isBarcodeEmpty = false
        addButton.style.background = "#72a7c4"
        addButton.style.color = "#000"
        addButton.disabled = false
    }
})

db.all('SELECT id, is_paid_by_card, order_date FROM orders', (error, rows) =>{
    if (error) {
        console.error(error)
        return;
    }
    for (let i = 0; i < rows.length; i++) {
        const orderRow = document.createElement("tr");
        orderRow.innerHTML=`<td>${rows[i].id}</td><td>${rows[i].is_paid_by_card === 0 ? "Да" : "Нет"}</td><td>${rows[i].order_date}</td>`
        orderHistory.appendChild(orderRow)
    }
})

addButton.addEventListener("click", async () => {
    await addProductToReceipt()
    if (isFirstOrderedItem) {
        isFirstOrderedItem = false
    }
})

cashPainButton.addEventListener("click", async () => {
    receiptTbody.innerHTML = ""
    price = 0

    await createOrder();

    const orderRow = document.createElement("tr");
    await db.all('SELECT id, is_paid_by_card, order_date FROM orders ORDER BY id DESC LIMIT 1', (error, rows) => {
        if (error) {
            console.error(error)
            return;
        }
        orderRow.innerHTML = `<td>${rows[0].id}</td><td>Да</td><td>${rows[0].order_date}</td>`
        orderHistory.appendChild(orderRow)
    })

    document.querySelector(".addition-input-quantity").value = 1;
    receiptPrice.innerHTML = 0
})

cardPainButton.addEventListener("click", async () => {
    receiptTbody.innerHTML = ""
    price = 0

    await createOrder();

    const orderRow = document.createElement("tr");
    await db.all('SELECT id, is_paid_by_card, order_date FROM orders ORDER BY id DESC LIMIT 1', (error, rows) => {
        if (error) {
            console.error(error)
            return;
        }
        orderRow.innerHTML = `<td>${rows[0].id}</td><td>Нет</td><td>${rows[0].order_date}</td>`
        orderHistory.appendChild(orderRow)
    })

    document.querySelector(".addition-input-quantity").value = 1;
    receiptPrice.innerHTML = 0
})

isFirstOrderedItem = receiptTbody.childNodes.length === 0;
