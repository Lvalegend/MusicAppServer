const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,   
  password: `${DB_PASSWORD}`, 
  database:`${DB_NAME}`
});


async function paginate(tableName, page = null, limit = null, filter = '') {
  try {
    let query = `SELECT * FROM ${tableName} ${filter ? 'WHERE ' + filter : ''}`;
    let totalItems = 0;
    let rows = [];

    // Nếu có truyền page và limit, thực hiện phân trang
    if (page && limit) {
      const offset = (page - 1) * limit;

      // Truy vấn tổng số bản ghi
      const countQuery = `SELECT COUNT(*) AS totalItems FROM ${tableName} ${filter ? 'WHERE ' + filter : ''}`;
      const [countRows] = await pool.query(countQuery);
      totalItems = countRows[0].totalItems;

      // Thêm điều kiện phân trang vào câu truy vấn
      query += ` LIMIT ? OFFSET ?`;
      [rows] = await pool.query(query, [limit, offset]);

      // Tính tổng số trang
      const totalPages = Math.ceil(totalItems / limit);

      return {
        data: rows,
        currentPage: page,
        totalItems: totalItems,
        totalPages: totalPages
      };
    } else {
      // Nếu không có page và limit, lấy tất cả các bản ghi
      [rows] = await pool.query(query);

      return {
        data: rows,
        totalItems: rows.length
      };
    }
  } catch (error) {

    console.log(error);
    throw new Error('Error fetching data: ' + error.message);
  }
}
module.exports = paginate
