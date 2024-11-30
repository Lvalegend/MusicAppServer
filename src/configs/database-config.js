// db.js
const mysql = require('mysql2');
const { DB_NAME, DB_HOST, DB_USER, DB_PASSWORD } = require('./config-env');
const { setAllSongData } = require('../all-song');

const sql = mysql.createConnection({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  database: `${DB_NAME}`
});


sql.connect(async (err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the MySQL database.');
  try {
    const catalogue = await new Promise((resolve, reject) => 
      sql.query(
        `SELECT DISTINCT s.song_name AS song_name, ss.song_id AS song_id
         FROM singer_song ss
         INNER JOIN singer sg ON ss.singer_id = sg.singer_id
         INNER JOIN song s ON ss.song_id = s.song_id`,
        [],
        (err, result) => {
          if (err) reject(err);
          else resolve(result);
        }
      )
    );
    console.log('Catalogue:', catalogue);
    setAllSongData(catalogue)
  } catch (error) {
    console.error('Error fetching catalogue:', error);
  }  
})


module.exports = sql;
