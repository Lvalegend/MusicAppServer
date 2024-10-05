const sql = require("../configs/database-config");

class SongPlaylistServices {
  static addSongInPlaylist(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song_playlist` (`playlist_id`, `song_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve({
            playlist_id: values.playlist_id,
            song_id: values.song_id,
          });
        }
      );
    });
  }
}

module.exports = SongPlaylistServices;
