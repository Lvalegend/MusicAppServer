const sql = require("../configs/database-config");

class SingerSongServices {
  static relationshipSingerAndSong(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer_song` (`singer_id`, `song_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              singer_id: values.singer_id,
              song_id: values.song_id
            });
          }
        }
      );
    });
  }
}

module.exports = SingerSongServices;
