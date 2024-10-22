const sql = require("../configs/database-config");

class SongServices {
  static saveSongData(data, song_image, song_url) {
    const { song_name, release_date, total_view } = data;
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song` (`song_name`, `release_date`, `song_image`, `song_url`, `total_view`) VALUES (?, ?, ?, ?, ?)",
        [song_name, release_date, song_image, song_url, total_view],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            song_name: song_name,
            release_date: release_date,
            song_image: song_image,
            song_url: song_url,
            total_view: total_view
          });
        }
      );
    });
  }
}

module.exports = SongServices;
