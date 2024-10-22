const sql = require("../configs/database-config");

class SongCategoryServices {
  static relationshipSongAndCategory(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song_category` (`song_id`, `category_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              song_id: values.song_id,
              category_id: values.category_id
            });
          }
        }
      );
    });
  }
  static getSongsAndCategoriesData(song_id = null, category_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM song_category sc
            INNER JOIN song s ON sc.song_id = s.song_id
            INNER JOIN category c ON sc.category_id = c.category_id
        `;
      const values = [];
      const conditions = [];
  
      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }
  
      if (category_id) {
        conditions.push("c.category_id = ?");
        values.push(category_id);
      }
  
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      // Apply pagination only if both page and limit are provided
      if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
        const offset = (page - 1) * limit;
        query += ` LIMIT ? OFFSET ?`;
        values.push(limit, offset);
      }
  
      sql.query(query, values, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
  
}

module.exports = SongCategoryServices;
