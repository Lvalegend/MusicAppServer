const sql = require("../configs/database-config");

class AlbumServices {
  static addAlbum(data, album_image) {
    const { album_name, release_date, album_type, description, more_description, status } = data;
    
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `album` (`album_name`, `release_date`, `album_type`,`description`, `more_description`, `status`, `album_image`) VALUES (?,?,?,?,?,?,?)",
        [album_name, release_date, album_type, description, more_description, status, album_image],
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
              album_type: album_type,
              description: description,
              more_description: more_description,
              status: status,
              album_image: album_image
            });
          }
        }
      );
    });
  }
}

module.exports = AlbumServices;
