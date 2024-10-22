const sql = require("../configs/database-config");

class SingerSongServices {
  static relationshipSingerAndSong(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer_song` (`singer_id`, `song_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              singer_id: values.singer_id,
              song_id: values.song_id
            });
          }
        }
      );
    });
  }
  static getSingersAndSongsData(singer_id = null, song_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM singer_song ss
            INNER JOIN singer sg ON ss.singer_id = sg.singer_id
            INNER JOIN song s ON ss.song_id = s.song_id
        `;
      const values = [];
      const conditions = [];
  
      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }
  
      if (singer_id) {
        conditions.push("sg.singer_id = ?");
        values.push(singer_id);
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

module.exports = SingerSongServices;
