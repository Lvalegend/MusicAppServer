const sql = require("../configs/database-config");

class SingerServices {
  static saveSingerData(data, singer_avatar) {
    const { singer_name, date_of_birth, description, total_favourite } = data;

    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer` (`singer_name`, `date_of_birth`, `total_favourite`, `singer_avatar`, `description`) VALUES (?, ?, ?, ?, ?)",
        [singer_name, date_of_birth, total_favourite, singer_avatar, description],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            singer_name: singer_name,
            date_of_birth: date_of_birth,
            total_favourite: total_favourite,
            singer_avatar: singer_avatar,
            description: description
          });
        }
      );
    });
  }
}

module.exports = SingerServices;
