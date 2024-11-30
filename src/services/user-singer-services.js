const sql = require("../configs/database-config");

class UserSingerServices {
  static relationshipUserAndSinger(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `user_singer` (`user_id`,`singer_id`) VALUES (?,?)",
        [values.user_id, values.singer_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            singer_id: values.singer_id
          });
        }
      );
    });
  }

  static deleteUserSingerRelationship(user_id, singer_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `user_singer` WHERE `user_id` = ? AND `singer_id` = ?",
        [user_id, singer_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "User And Song Relationship deleted successfully",
            user_id: user_id,
            singer_id: singer_id
          });
        }
      );
    });
  }

  static statusUserSingerFavourite(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "UPDATE `user_singer` SET `favourite` = ? WHERE `user_id` = ? AND `singer_id` = ?",
        [values.favourite, values.user_id, values.singer_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            user_id: values.user_id,
            singer_id: values.singer_id,
            favourite: values.favourite
          });
        }
      );
    });
  }
  static getUserAndSingersData(singer_id = null, user_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM user_singer us
            INNER JOIN singer s ON us.singer_id = s.singer_id
            INNER JOIN user u ON us.user_id = u.user_id
        `;
      const values = [];
      const conditions = [];

      if (singer_id) {
        conditions.push("s.singer_id = ?");
        values.push(singer_id);
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

module.exports = UserSingerServices;
