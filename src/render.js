const {db} = require('./database');

const tbody = document.querySelector('#products tbody');
tbody.innerHTML = '';

db.all('SELECT * FROM products', (error, rows) => {
  if (error) {
    console.error(error);
    return;
  }

  rows.forEach(product => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${product['id']}</td>
      <td>${product['name']}</td>
      <td>${product['barcode']}</td>
    `;
    tbody.appendChild(tr);
  });
});
