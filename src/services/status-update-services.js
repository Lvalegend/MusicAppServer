const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
    host: `${DB_HOST}`,
    user: `${DB_USER}`,
    password: `${DB_PASSWORD}`,
    database:`${DB_NAME}`
});

async function statusUpdate(tableName,id_key) {
    try {
        let query = `SELECT * FROM ${tableName} WHERE status = 'new'`;
        let rows = [];
        [rows] = await pool.query(query);
        if(rows.length > 5){
            let query2 = `SELECT * FROM ${tableName} WHERE status = 'new' ORDER BY ${id_key} ASC LIMIT 1`;
            let needUpdateStatus = await pool.query(query2);
            if(needUpdateStatus.length > 0){
                let query3 =   `UPDATE ${tableName} SET status = 'normal' WHERE ${id_key} = `+needUpdateStatus[0][0]['song_id'];
                await pool.query(query3);
            }
        }
    }catch (error){
        console.log(error);
        throw new Error('Error random data: ' + error.message);
    }
}
module.exports = statusUpdate
