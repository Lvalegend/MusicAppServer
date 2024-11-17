const sql = require("../configs/database-config");

class SongServices {
  static saveSongData(data, song_image, song_url, status_data) {
    const { song_name, release_date, total_view } = data;
    const status = status_data;
    const timestamp = Date.now();
    const song_entity_id = `song-${timestamp}`;
    
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song` (`song_name`, `release_date`, `song_image`, `song_url`, `total_view`,`status`, `song_entity_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [song_name, release_date, song_image, song_url, total_view, status, song_entity_id],
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
            total_view: total_view,
            song_entity_id: song_entity_id
          });
        }
      );
    });
  }
  static editSong(values, imageUpload, songFile) {
    return new Promise((resolve, reject) => {
      let query = "UPDATE `song` SET ";
      const values2 = [];
      const conditions = [];
      if (values.song_name) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`song_name`= ?");
        values2.push(values.song_name);
      }
      if (values.release_date) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`release_date`= ?");
        values2.push(values.release_date);
      }
      if (imageUpload) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`imageUpload`= ?");
        values2.push(imageUpload);
      }
      if (songFile) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`songFile`= ?");
        values2.push(songFile);
      }
      if (values.total_view) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`total_view`= ?");
        values2.push(values.total_view);
      }
      if (values.status) {
        if (conditions.length !== 0) {
          conditions.push(",");
        }
        conditions.push("`status`= ?");
        values2.push(values.status);
      }

      conditions.push("WHERE `song_id`= ?");
      values2.push(values.song_id);

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
      //     "UPDATE `song` SET song_name = ?, release_date = ?, song_image = ?, song_url = ?, total_view = ?, status = ? WHERE song_id = ?",
      //     [values.song_name, values.release_date, imageUpload, songFile, values.total_view, values.status,values.song_id],
      //     (err, res) => {
      //         if (err) {
      //             console.log(err);
      //             reject(err);
      //         }
      //         resolve({
      //             song_id: values.song_id
      //         });
      //     }
      // );
    });
  }

  static deleteSong(song_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `song` WHERE `song_id` = ?",
        [song_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve(res);
        }
      );
    });
  }
  static updateSongView(song_id){
     return new Promise((resolve, reject) => {
       sql.query(
         "UPDATE `song` SET `total_view` = `total_view` + 1 WHERE `song_id` = ?",
         [song_id],
         (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve(res);
        }
       )  
     })
  }
}

module.exports = SongServices;
