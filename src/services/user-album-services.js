const sql = require("../configs/database-config");

class UserAlbumServices {
  static relationshipUserAndAlbum(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `user_album` (`user_id`,`album_id`) VALUES (?,?)",
        [values.user_id, values.album_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            album_id: values.album_id
          });
        }
      );
    });
  }

  static deleteUserAlbumRelationship(user_id, album_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `user_album` WHERE `user_id` = ? AND `album_id` = ?",
        [user_id, album_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "User And Album Relationship deleted successfully",
            user_id: user_id,
            album_id: album_id
          });
        }
      );
    });
  }

  static statusUserAlbumFavourite(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE `user_album` SET `favourite` = ? WHERE `user_id` = ? AND `album_id` = ?",
        [values.favourite, values.user_id, values.album_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            album_id: values.album_id,
            favourite: values.favourite
          });
        }
      );
    });
  }
  static getUserAndAlbumsData(album_id = null, user_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM user_album ua
            INNER JOIN album a ON ua.album_id = a.album_id
            INNER JOIN user u ON ua.user_id = u.user_id
        `;
      const values = [];
      const conditions = [];

      if (album_id) {
        conditions.push("a.album_id = ?");
        values.push(album_id);
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

module.exports = UserAlbumServices;
