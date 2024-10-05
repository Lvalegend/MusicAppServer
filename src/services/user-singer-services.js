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
}

module.exports = UserSingerServices;
