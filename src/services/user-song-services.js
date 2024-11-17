const sql = require("../configs/database-config");

class UserSongServices {
  static relationshipUserAndSong(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `user_song` (`user_id`,`song_id`) VALUES (?,?)",
        [values.user_id, values.song_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            song_id: values.song_id
          });
        }
      );
    });
  }

  static deleteUserSongRelationship(user_id, song_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `user_song` WHERE `user_id` = ? AND `song_id` = ?",
        [user_id, song_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "User And Song Relationship deleted successfully",
            user_id: user_id,
            song_id: song_id
          });
        }
      );
    });
  }

  static statusUserSongFavourite(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE `user_song` SET `favourite` = ? WHERE `user_id` = ? AND `song_id` = ?",
        [values.favourite, values.user_id, values.song_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            song_id: values.song_id,
            favourite: values.favourite
          });
        }
      );
    });
  }
  static getUserAndSongsData(song_id = null, user_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM user_song us
            INNER JOIN song s ON us.song_id = s.song_id
            INNER JOIN user u ON us.user_id = u.user_id
        `;
      const values = [];
      const conditions = [];

      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }

      if (user_id) {
        conditions.push("u.user_id = ?");
        values.push(user_id);
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

module.exports = UserSongServices;
