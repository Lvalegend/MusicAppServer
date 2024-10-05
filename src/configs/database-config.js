// db.js
const mysql = require('mysql2');
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = require('./config-env');

const sql = mysql.createConnection({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,   
  password: `${DB_PASSWORD}`, 
  database:`${DB_NAME}`
});

sql.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
});

module.exports = sql;
