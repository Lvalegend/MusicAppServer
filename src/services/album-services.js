const sql = require("../configs/database-config");

class AlbumServices {
  static addAlbum(data) {
    const { album_name, release_date, album_type } = data;

    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `album` (`album_name`, `release_date`, `album_type`) VALUES (?,?,?)",
        [album_name, release_date, album_type],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            const album_id = res.insertId
            resolve({
              album_id: album_id,
              album_name: album_name,
              release_date: release_date,
              album_type: album_type
            });
          }
        }
      );
    });
  }
}

module.exports = AlbumServices;
