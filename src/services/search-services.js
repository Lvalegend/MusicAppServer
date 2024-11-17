const sql = require("../configs/database-config");

class SearchServices {

  static getSearchData(text, page, limit) {
    try {
      page = (page ?? 0) > 0 ? page : null;
      limit = (limit ?? 0) > 0 ? limit : null;
      if (page && limit) {
        limit = parseInt(limit);
        const offset = parseInt((page - 1) * limit);
        return new Promise((resolve, reject) => {
          sql.query("SELECT song_name, song_id FROM `song` WHERE `song_name` LIKE ?  " +
            "LIMIT ? OFFSET ?", [`%${text}%`, limit, offset], (err, songs) => {
              if (err) {
                console.log(err);
                return reject(err);
              }

              // Create an array of promises for fetching singer data
              const songPromises = songs.map(song => {
                return new Promise((resolveSong) => {
                  sql.query("SELECT singer_id FROM `singer_song` WHERE `song_id` = ?", [song.song_id], (err, singers) => {
                    if (err) {
                      console.log(err);
                      return reject(err);
                    }

                    const singerPromises = singers.map(singer => {
                      return new Promise((resolveSinger) => {
                        sql.query("SELECT singer_name, singer_id FROM `singer` WHERE `singer_id` = ?", [singer.singer_id], (err, singerData) => {
                          if (err) {
                            console.log(err);
                            return reject(err);
                          }

                          resolveSinger(singerData[0]); // Assuming singerData will have at least one entry
                        });
                      });
                    });

                    Promise.all(singerPromises).then(singerData => {
                      resolveSong({
                        song_id: song.song_id,
                        song_name: song.song_name,
                        singers: singerData // Array of singer data
                      });
                    });
                  });
                });
              });

              // Wait for all songs to resolve
              Promise.all(songPromises).then(mergedData => {
                resolve(mergedData);
              }).catch(reject);
            });
        });
      } else {
        // Nếu không có page và limit, lấy tất cả các bản ghi
        return new Promise((resolve, reject) => {
          sql.query("SELECT song_name, song_id FROM `song` WHERE `song_name` LIKE ?", [`%${text}%`], (err, songs) => {
            if (err) {
              console.log(err);
              return reject(err);
            }

            // Create an array of promises for fetching singer data
            const songPromises = songs.map(song => {
              return new Promise((resolveSong) => {
                sql.query("SELECT singer_id FROM `singer_song` WHERE `song_id` = ?", [song.song_id], (err, singers) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }

                  const singerPromises = singers.map(singer => {
                    return new Promise((resolveSinger) => {
                      sql.query("SELECT singer_name, singer_id FROM `singer` WHERE `singer_id` = ?", [singer.singer_id], (err, singerData) => {
                        if (err) {
                          console.log(err);
                          return reject(err);
                        }

                        resolveSinger(singerData[0]); // Assuming singerData will have at least one entry
                      });
                    });
                  });

                  Promise.all(singerPromises).then(singerData => {
                    resolveSong({
                      song_id: song.song_id,
                      song_name: song.song_name,
                      singers: singerData // Array of singer data
                    });
                  });
                });
              });
            });

            // Wait for all songs to resolve
            Promise.all(songPromises).then(mergedData => {
              resolve(mergedData);
            }).catch(reject);
          });
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data: ' + error.message);
    }
  }
}

module.exports = SearchServices;
