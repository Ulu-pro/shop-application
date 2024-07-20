const {db} = require("./utilities/database");

const productsBody = document.querySelector(".products-body")
const addProductButton = document.querySelector(".add-button")

const productName = document.getElementById("name")
const productPrice = document.getElementById("price")
const productBarcode = document.getElementById("barcode")

let currentName = "";
let currentBarcode;
let currentPrice = 0;


db.all('SELECT id, name, barcode FROM products', (error, rows) => {
    if (error) {
        console.error(error)
        return;
    }
    for (let i = 0; i < rows.length; i++) {
        const productRow = document.createElement("tr");
        productRow.innerHTML = `<td>${rows[i].id}</td><td>${rows[i].name}</td><td>${rows[i].barcode}</td>`
        productsBody.appendChild(productRow)
    }
})


productName.addEventListener("input", (e) => {
    currentName = e.target.value
})

productBarcode.addEventListener("input", (e) => {
    currentBarcode = e.target.value
})

productPrice.addEventListener("input", (e) => {
    currentPrice = e.target.value
})


addProductButton.addEventListener("click", async () => {
    await db.run("INSERT INTO products (name, barcode) VALUES (?, ?)", [currentName, currentBarcode], (err) => {
        if (err) {
            console.error("Ошибка при добавлении продукта:", err);
        }
    })

    await db.all('SELECT id FROM products WHERE name = ?', [currentName], async (error, rows) => {
        if (error) {
            console.error(error)
            return;
        }
        console.log(rows[0].id, parseInt(currentPrice))
        await db.run("INSERT INTO prices (product_id, value) VALUES  (?, ?)", [rows[0].id, parseInt(currentPrice)], (err) => {
            if (err) {
                console.error("Ошибка при добавлении продукта:", err);
            }
        })
    })

    productName.value = ""
    productPrice.value = ""
    productBarcode.value = ""
})
