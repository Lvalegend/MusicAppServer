const sql = require("../configs/database-config");

class RecentlyViewedServices {
    static addViewToQueue(data) {
        const {song_id, user_id} = data;
        console.log(user_id, song_id);
        return new Promise((resolve, reject) => {
            sql.query(
                "SELECT * FROM `recently_view_queue` WHERE `song_id` = ? AND user_id = ?",
                [song_id, user_id],
                (err, recently_view_queue) => {
                    if (err) {
                        console.log(err);
                        return reject(err);
                    }

          if (recently_view_queue.length > 0) {
            const reInsert = recently_view_queue.map(recently_view => {
              return new Promise((resolve, reject) => {
                sql.query("DELETE FROM `recently_view_queue` WHERE `id` = ?", [recently_view.id], (err) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
                  sql.query("INSERT INTO `recently_view_queue` (`song_id`, `user_id`) VALUES (?,?)", [recently_view.song_id, recently_view.user_id], (err) => {
                    if (err) {
                      console.log(err);
                      return reject(err);
                    }
                    resolve();
                  });
                });
              });
            })
            Promise.all(reInsert)
              .then(() => resolve({ message: "Success" }))
              .catch(reject);
          } else {
            sql.query("SELECT COUNT(*) AS numberData FROM recently_view_queue WHERE user_id = ?", user_id, (err, countingshit) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              if (countingshit[0].numberData == 5) {
                sql.query("SELECT MIN(id) AS lowest_id FROM recently_view_queue WHERE user_id = ?", user_id, (err, min_id) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
                  sql.query("DELETE FROM `recently_view_queue` WHERE `id` = ?", min_id[0].lowest_id, (err) => {
                    if (err) {
                      console.log(err);
                      return reject(err);
                    }
                    sql.query("INSERT INTO `recently_view_queue` (`song_id`, `user_id`) VALUES (?,?)", [song_id, user_id], (err) => {
                      if (err) {
                        console.log(err);
                        return reject(err);
                      }
                      resolve({ message: "Success" });
                    });
                  })
                })
              } else {
                sql.query("INSERT INTO `recently_view_queue` (`song_id`, `user_id`) VALUES (?,?)", [song_id, user_id], (err) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
                  resolve({ message: "Success" });
                });
              }
            });
          }
        }
      );
    });
  }
  static getRecentlyViewedData(song_id = null, user_id = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM recently_view_queue r
            INNER JOIN song s ON r.song_id = s.song_id
        `;
      const values = [];
      const conditions = [];

      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }

      if (user_id) {
        conditions.push("user_id = ?");
        values.push(user_id);
      }

      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }

      sql.query(query, values, (err, res) => {
        if (err) {
          console.log(err);
          reject(err);
        } else {
          resolve(res);
        }
      });
    });
  }
}

module.exports = RecentlyViewedServices;
