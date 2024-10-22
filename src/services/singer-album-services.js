const sql = require("../configs/database-config");

class SingerAlbumServices {
  static relationshipSingerAndAlbum(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer_album` (`singer_id`, `album_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              singer_id: values.singer_id,
              album_id: values.album_id
            });
          }
        }
      );
    });
  }
  static getSingersAndAlbumsData(singer_id = null, album_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM singer_album sa
            INNER JOIN singer s ON sa.singer_id = s.singer_id
            INNER JOIN album al ON sa.album_id = al.album_id
        `;
      const values = [];
      const conditions = [];
  
      if (singer_id) {
        conditions.push("s.singer_id = ?");
        values.push(singer_id);
      }
  
      if (album_id) {
        conditions.push("al.album_id = ?");
        values.push(album_id);
      }
  
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      // Check if page and limit are valid numbers; if not, default to get all records
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

module.exports = SingerAlbumServices;
