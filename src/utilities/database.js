const sqlite3 = require('sqlite3').verbose();

const db = new sqlite3.Database('database.db', (error) => {
  if (error) {
    console.error('Error opening database:', error.message);
  } else {
    console.log('Database connection established');
  }
});

module.exports = {db};
