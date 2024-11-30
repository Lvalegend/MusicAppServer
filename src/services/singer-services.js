const sql = require("../configs/database-config");

class SingerServices {
  static saveSingerData(data, singer_avatar) {
    const { singer_name, date_of_birth, description, total_favourite } = data;
    const timestamp = Date.now();
    const singer_entity_id = `singer-${timestamp}`;
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer` (`singer_name`, `date_of_birth`, `total_favourite`, `singer_avatar`, `description`, `singer_entity_id`) VALUES (?, ?, ?, ?, ?, ?)",
        [singer_name, date_of_birth, total_favourite, singer_avatar, description, singer_entity_id],
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
            description: description,
            singer_entity_id: singer_entity_id
          });
        }
      );
    });
  }

  static editSingerData(values) {
    return new Promise((resolve, reject) => {
      resolve({
        values: values
      });
      let query = "UPDATE `singer` SET ";
      const values2 = [];
      const conditions = [];

      resolve({
        singer_id: values
      });
      if (values.singer_name) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`singer_name`= ?");
        values2.push(values.singer_name);
      }
      if (values.date_of_birth) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`date_of_birth`= ?");
        values2.push(values.date_of_birth);
      }
      if (values.total_favourite) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`total_favourite`= ?");
        values2.push(values.total_favourite);
      }
      if (values.singer_avatar) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`singer_avatar`= ?");
        values2.push(values.singer_avatar);
      }
      if (values.description) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`description`= ?");
        values2.push(values.description);
      }

      conditions.push(" WHERE `singer_id`= ?");
      values2.push(values.singer_id);

      if (conditions.length > 0) {
        query += conditions.join("");
      }
      sql.query(query, values2, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });

      // sql.query(
      //     "UPDATE `singer` SET `singer_name` = ?, `date_of_birth` = ?, `total_favourite` = ?, `singer_avatar` = ?, `description` = ? WHERE singer_id = ?",
      //     [values.singer_name, values.date_of_birth, values.total_favourite, values.singer_avatar, values.description,values.singer_id],
      //     (err, res) => {
      //         if (err) {
      //             console.log(err);
      //             reject(err);
      //         }
      //         resolve({
      //             singer_id: values.singer_id
      //         });
      //     }
      // );
    });
  }

  static async deleteSinger(singer_id) {
    try {
        await sql.promise().query("DELETE FROM `singer_album` WHERE `singer_id` = ?", [singer_id]);
        await sql.promise().query("DELETE FROM `singer_song` WHERE `singer_id` = ?", [singer_id]);
        await sql.promise().query("DELETE FROM `singer` WHERE `singer_id` = ?", [singer_id]);
        return {
            message: "Singer deleted successfully",
            album_id: singer_id
        };
    } catch (err) {
        console.log(err);
        throw new Error("Error deleting singer");
    }
}
}

module.exports = SingerServices;
