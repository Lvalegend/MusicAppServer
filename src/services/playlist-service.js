const sql = require("../configs/database-config");

class PlaylistServices {
  static createPlaylist(data) {
    const { playlist_name, user_id } = data;

    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `playlist` (`playlist_name`, `user_id`) VALUES (?,?)",
        [playlist_name, user_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            playlist_name,
            user_id
          });
        }
      );
    });
  }
}

module.exports = PlaylistServices;
