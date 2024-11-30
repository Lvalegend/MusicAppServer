const sql = require("../configs/database-config");

class SongServices {
  // static saveSongData(data, song_image, song_url, status_data) {
  //   const { song_name, release_date, total_view } = data;
  //   const status = status_data;
  //   const timestamp = Date.now();
  //   const song_entity_id = `song-${timestamp}`;

  //   return new Promise((resolve, reject) => {
  //     sql.query(
  //       "INSERT INTO `song` (`song_name`, `release_date`, `song_image`, `song_url`, `total_view`,`status`, `song_entity_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
  //       [song_name, release_date, song_image, song_url, total_view, status, song_entity_id],
  //       (err, res) => {
  //         if (err) {
  //           console.log(err);
  //           return reject(err);
  //         }
  //         return resolve({
  //           song_name: song_name,
  //           release_date: release_date,
  //           song_image: song_image,
  //           song_url: song_url,
  //           total_view: total_view,
  //           song_entity_id: song_entity_id
  //         });
  //       }
  //     );
  //   });
  // }
  static async saveSongData(data, song_image, song_url, status_data) {
    const { song_name, release_date, total_view, category_id, singer_id } = data;
    const status = status_data;
    const timestamp = Date.now();
    const song_entity_id = `song-${timestamp}`;

    try {
      // Insert song into the `song` table
      const [songInsertResult] = await sql.promise().query(
        "INSERT INTO `song` (`song_name`, `release_date`, `song_image`, `song_url`, `total_view`, `status`, `song_entity_id`) VALUES (?, ?, ?, ?, ?, ?, ?)",
        [song_name, release_date, song_image, song_url, total_view, status, song_entity_id]
      );

      const song_id = songInsertResult.insertId; // Get the newly inserted song_id

      // Insert into `song_category`
      await sql.promise().query(
        "INSERT INTO `song_category` (`song_id`, `category_id`) VALUES (?, ?)",
        [song_id, category_id]
      );

      // Insert into `singer_song`
      await sql.promise().query(
        "INSERT INTO `singer_song` (`singer_id`, `song_id`) VALUES (?, ?)",
        [singer_id, song_id]
      );

      // Return the inserted song data
      return {
        song_id: songInsertResult.insertId,
        song_name,
        release_date,
        song_image,
        song_url,
        total_view,
        status,
        song_entity_id
      };
    } catch (err) {
      console.error("Error saving song data:", err);
      throw new Error("Error saving song data to the database.");
    }
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
    });
  }

  static async deleteSong(song_id) {
    try {
      await sql.promise().query("DELETE FROM `user_song` WHERE `song_id` = ?", [song_id]);
      await sql.promise().query("DELETE FROM `singer_song` WHERE `song_id` = ?", [song_id]);
      await sql.promise().query("DELETE FROM `song_album` WHERE `song_id` = ?", [song_id]);
      await sql.promise().query("DELETE FROM `song_category` WHERE `song_id` = ?", [song_id]);
      await sql.promise().query("DELETE FROM `song_playlist` WHERE `song_id` = ?", [song_id]);
      await sql.promise().query("DELETE FROM `song` WHERE `song_id` = ?", [song_id]);
      return {
        message: "Song deleted successfully",
        album_id: song_id
      };
    } catch (err) {
      console.log(err);
      throw new Error("Error deleting song");
    }
  }
  static updateSongView(song_id) {
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
