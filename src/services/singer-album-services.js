const sql = require("../configs/database-config");

class SingerAlbumServices {
  static relationshipSingerAndAlbum(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer_album` (`singer_id`, `album_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              singer_id: values.singer_id,
              album_id: values.album_id
            });
          }
        }
      );
    });
  }
}

module.exports = SingerAlbumServices;
