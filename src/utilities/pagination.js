const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,   
  password: `${DB_PASSWORD}`, 
  database:`${DB_NAME}`
});

async function paginate(tableName, page, limit, filterColumn, filterValue) {
  try {
    page = (page ?? 0) > 0 ? page : null;  
    limit = (limit ?? 0) > 0 ? limit : null; 
    filterColumn = filterColumn ?? '';
    filterValue = filterValue ?? ''; 
    
    let query = `SELECT * FROM ${tableName}`;
    let totalItems = 0;
    let rows = [];

    if (filterColumn && filterValue) {
      query += ` WHERE ${filterColumn} LIKE ?`;
      filterValue = `%${filterValue}%`;
    }

    if (page && limit) {
      const offset = (page - 1) * limit;

      // Truy vấn tổng số bản ghi
      const countQuery = `SELECT COUNT(*) AS totalItems FROM ${tableName} ${filterColumn && filterValue ? 'WHERE ' + filterColumn + ' LIKE ?' : ''}`;
      const [countRows] = await pool.query(countQuery, filterColumn && filterValue ? [filterValue] : []);
      totalItems = countRows[0].totalItems;

      // Thêm điều kiện phân trang vào câu truy vấn
      query += ` LIMIT ? OFFSET ?`;
      [rows] = await pool.query(query, filterColumn && filterValue ? [filterValue, limit, offset] : [limit, offset]);

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
      [rows] = await pool.query(query, filterColumn && filterValue ? [filterValue] : []);

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

module.exports = paginate;
