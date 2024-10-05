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
}

module.exports = SongAlbumServices;
