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
}

module.exports = UserSongServices;
