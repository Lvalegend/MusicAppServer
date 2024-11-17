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

  static deleteSongAlbumRelationship(song_id, album_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `song_album` WHERE `song_id` = ? AND `album_id` = ?",
        [song_id, album_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "Song And Album Relationship deleted successfully",
            song_id: song_id,
            album_id: album_id
          });
        }
      );
    });
  }

  // static getSongsAndAlbumsData(song_id = null, album_id = null, page = null, limit = null) {
  //   return new Promise((resolve, reject) => {
  //     let query = `
  //           SELECT *
  //           FROM album al
  //           LEFT JOIN song_album sa ON al.album_id = sa.album_id
  //           LEFT JOIN song s ON sa.song_id = s.song_id
  //       `;
  //     const values = [];
  //     const conditions = [];

  //     if (album_id) {
  //       conditions.push("al.album_id = ?");
  //       values.push(album_id);
  //     }

  //     if (song_id) {
  //       conditions.push("s.song_id = ?");
  //       values.push(song_id);
  //     }

  //     if (conditions.length > 0) {
  //       query += " WHERE " + conditions.join(" AND ");
  //     }

  //     // Luôn áp dụng phân trang khi page và limit được truyền vào
  //     if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
  //       limit = parseInt(limit);
  //       const offset = parseInt((page - 1) * limit);
  //       query += " LIMIT ? OFFSET ?";
  //       values.push(limit, offset);
  //     }

  //     console.log('Final query:', query);
  //     console.log('Values:', values);

  //     sql.query(query, values, (err, albums) => {
  //       if (err) {
  //         console.log(err);
  //         return reject(err);
  //       }

  //       if (!albums || albums.length === 0) {
  //         return resolve({ message: "No data found" });
  //       }

  //       // Nhóm các bài hát theo album
  //       const albumMap = {};
  //       albums.forEach(album => {
  //         if (!albumMap[album.album_id]) {
  //           albumMap[album.album_id] = {
  //             album_id: album.album_id,
  //             album_name: album.album_name,
  //             album_image: album.album_image,
  //             songs: []
  //           };
  //         }
  //         if (album.song_id) {
  //           albumMap[album.album_id].songs.push({
  //             song_id: album.song_id,
  //             song_name: album.song_name,
  //             song_url: album.song_url
  //           });
  //         }
  //       });

  //       // Chuyển đổi map thành mảng và lọc các album có album_id null
  //       const result = Object.values(albumMap);
  //       const filteredResult = result.filter(album => album.album_id !== null);

  //       resolve(filteredResult);
  //     });
  //   });
  // }
  static getSongsAndAlbumsData(song_id = null, album_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM song_album sa
            INNER JOIN song s ON sa.song_id = s.song_id
            INNER JOIN album al ON sa.album_id = al.album_id
       ` ;
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
      if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null && page !== undefined && limit !== undefined) {
        const offset = (page - 1) * limit;
        query += ` LIMIT ? OFFSET ? ` ;
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
