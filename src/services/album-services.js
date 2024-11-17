const sql = require("../configs/database-config");

class AlbumServices {
  static addAlbum(data, album_image) {
    const { album_name, release_date, album_type, description, more_description, status } = data;
    const timestamp = Date.now();
    const album_entity_id = `album-${timestamp}`;
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `album` (`album_name`, `release_date`, `album_type`,`description`, `more_description`, `status`, `album_image`, `album_entity_id`) VALUES (?,?,?,?,?,?,?,?)",
        [album_name, release_date, album_type, description, more_description, status, album_image, album_entity_id],
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
              album_image: album_image,
              album_entity_id: album_entity_id
            });
          }
        }
      );
    });
  }



  static editAlbum(values, album_image) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE `album` SET ";
      const values2 = [];
      const conditions = [];

      if (values.album_name) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`album_name`= ?");
        values2.push(values.album_name);
      }
      if (values.release_date) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`release_date`= ?");
        values2.push(values.release_date);
      }
      if (values.album_type) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`album_type`= ?");
        values2.push(values.album_type);
      }
      if (values.description) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`description`= ?");
        values2.push(values.description);
      }
      if (values.more_description) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`more_description`= ?");
        values2.push(values.more_description);
      }
      if (values.status) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`status`= ?");
        values2.push(values.status);
      }
      if (album_image) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`album_image`= ?");
        values2.push(album_image);
      }
      conditions.push(" WHERE `album_id`= ?");
      values2.push(values.album_id);

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
      //     "UPDATE `album` SET `album_name`= ?, `release_date` = ?, `album_type` = ?,`description` = ?, `more_description` = ?, `status` = ?, `album_image` = ? WHERE album_id = ?",
      //     [values.album_name, values.release_date, values.album_type, values.description, values.more_description, values.status, album_image,values.album_id],
      //     (err, res) => {
      //         if (err) {
      //             console.log(err);
      //             reject(err);
      //         }
      //         resolve({
      //             album_id: values.album_id
      //         });
      //     }
      // );
    });
  }

  static deleteAlbum(album_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `album` WHERE `album_id` = ?",
        [album_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "Album deleted successfully",
            song_id: album_id
          });
        }
      );
    });
  }
}

module.exports = AlbumServices;
