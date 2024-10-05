const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME } = require('../configs/config-env');

const pool = mysql.createPool({
  host: `${DB_HOST}`,
  user: `${DB_USER}`,
  password: `${DB_PASSWORD}`,
  database: `${DB_NAME}`
});

const findInfoUser = async (req, res, next) => {
  const { user_id } = req.user;

  try {
    const [users] = await pool.query('SELECT * FROM user WHERE user_id = ?', [user_id]);

    if (users.length === 0) {
      return res.status(404).json({ message: 'User not found' });
    }

    req.user = { ...req.user, ...users[0] };

    return next();
  } catch (error) {
    return res.status(500).json({ message: 'Error querying database', error });
  }
};
module.exports = findInfoUser