const sql = require("../configs/database-config");

class SongAlbumServices {
  static relationshipSongAndAlbum(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song_album` (`song_id`, `album_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              song_id: values.song_id,
              album_id: values.album_id
            });
          }
        }
      );
    });
  }
  static getSongsAndAlbumsData(song_id = null, album_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM song_album sa
            INNER JOIN song s ON sa.song_id = s.song_id
            INNER JOIN album al ON sa.album_id = al.album_id
        `;
      const values = [];
      const conditions = [];

      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }

      if (album_id) {
        conditions.push("al.album_id = ?");
        values.push(album_id);
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

module.exports = SongAlbumServices;
