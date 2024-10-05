const sql = require("../configs/database-config");

class SongCategoryServices {
  static relationshipSongAndCategory(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song_category` (`song_id`, `category_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              song_id: values.song_id,
              category_id: values.category_id
            });
          }
        }
      );
    });
  }
}

module.exports = SongCategoryServices;
