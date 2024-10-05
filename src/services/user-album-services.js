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
}

module.exports = UserAlbumServices;
