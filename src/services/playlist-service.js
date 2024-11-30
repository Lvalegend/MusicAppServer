const sql = require("../configs/database-config");

class PlaylistServices {
  static createPlaylist(data) {
    const { playlist_name, user_id } = data;
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `playlist` (`playlist_name`, `user_id`) VALUES (?,?)",
        [playlist_name, user_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            playlist_name,
            user_id
          });
        }
      );
    });
  }
    static editPlaylist(values,user_id) {
        return new Promise((resolve, reject) => {
            let query = "UPDATE `album` SET ";
            const values2 = [];
            const conditions = [];
            // if(values.date_created){
            //     if(conditions.length !== 0){
            //         conditions.push(",");
            //     }
            //     conditions.push("`date_created`= ?");
            //     values2.push(date_created);
            // }

            if(values.playlist_name){
                if(conditions.length !== 0){
                    conditions.push(",");
                }
                conditions.push("`playlist_name`= ?");
                values2.push(playlist_name);
            }

            conditions.push(" WHERE `user_id`= ?");
            values2.push(user_id);

            conditions.push(" AND `playlist_id`= ?");
            values2.push(values.playlist_id);

            if (conditions.length > 0) {
                query +=  conditions.join("")  ;
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
            //     "UPDATE `playlist` SET `date_created`= ?,playlist_name = ? WHERE user_id= ? AND playlist_id = ?",
            //     [values.date_created, values.playlist_name, user_id, values.playlist_id],
            //     (err, res) => {
            //         if (err) {
            //             console.log(err);
            //             reject(err);
            //         }
            //         resolve({
            //             playlist_id: values.playlist_id
            //         });
            //     }
            // );
        });
    }

    static async deletePlaylist(playlist_id) {
      try {
          await sql.promise().query("DELETE FROM `song_playlist` WHERE `playlist_id` = ?", [playlist_id]);
          await sql.promise().query("DELETE FROM `playlist` WHERE `playlist_id` = ?", [playlist_id]);
          return {
              message: "Playlist deleted successfully",
              album_id: playlist_id
          };
      } catch (err) {
          console.log(err);
          throw new Error("Error deleting Playlist");
      }
  }

    static getUserPlaylistData(user_id, page, limit) {
      return new Promise((resolve, reject) => {
        let query = "SELECT * FROM `playlist` WHERE `user_id` = ?";
        let params = [user_id];
    
        // Kiểm tra nếu page hoặc limit không hợp lệ thì lấy toàn bộ dữ liệu
        if (page !== undefined && limit !== undefined && !isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
          const offset = (page - 1) * limit;
          query += " LIMIT ? OFFSET ?";
          params.push(parseInt(limit), parseInt(offset));
        }
    
        sql.query(query, params, (err, playlist_datas) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          console.log(playlist_datas);
    
          const playlist_promise = playlist_datas.map((playlist_data) => {
            return new Promise((resolve, reject) => {
              sql.query(
                "SELECT `song_playlist`.*,`song`.* FROM `song_playlist` INNER JOIN `song` ON `song`.song_id = `song_playlist`.song_id INNER JOIN `playlist` ON `playlist`.playlist_id = `song_playlist`.playlist_id WHERE `song_playlist`.playlist_id = ?",
                [playlist_data.playlist_id],
                (err, song_playlist_datas) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
    
                  const song_playlist_data_promise = song_playlist_datas.map(
                    (song_playlist_data) => {
                      return new Promise((resolve, reject) => {
                        sql.query(
                          "SELECT `singer_song`.*,`singer`.* FROM `singer_song` INNER JOIN `singer` ON `singer`.singer_id = `singer_song`.singer_id WHERE `singer_song`.song_id = ?",
                          [song_playlist_data.song_id],
                          (err, singer_datas) => {
                            if (err) {
                              console.log(err);
                              return reject(err);
                            }
                            const singers = singer_datas.map((singer_data) => ({
                              singer_name: singer_data.singer_name,
                              singer_id: singer_data.singer_id,
                            }));
                            resolve({
                              song_id: song_playlist_data.song_id,
                              release_date: song_playlist_data.release_date,
                              song_name: song_playlist_data.song_name,
                              song_url: song_playlist_data.song_url,
                              song_image: song_playlist_data.song_image,
                              total_view: 0,
                              song_entity_id: null,
                              singers,
                            });
                          }
                        );
                      });
                    }
                  );
                  Promise.all(song_playlist_data_promise)
                    .then((mergedData) => {
                      resolve({
                        user_id: user_id,
                        playlist_id: playlist_data.playlist_id,
                        playlist_name: playlist_data.playlist_name,
                        date_created: playlist_data.date_created,
                        songs: mergedData,
                      });
                    })
                    .catch(reject);
                }
              );
            });
          });
          Promise.all(playlist_promise)
            .then((mergedData) => {
              resolve(mergedData);
            })
            .catch(reject);
        });
      });
    }
    
  }

module.exports = PlaylistServices;
