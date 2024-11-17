const sql = require("../configs/database-config");

class SingerSongServices {
  static relationshipSingerAndSong(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `singer_song` (`singer_id`, `song_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
          } else {
            resolve({
              singer_id: values.singer_id,
              song_id: values.song_id
            });
          }
        }
      );
    });
  }

  static deleteSingerSongRelationship(singer_id, song_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `singer_song` WHERE `singer_id` = ? AND `song_id` = ?",
        [singer_id, song_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "Singer And Album deleted successfully",
            singer_id: singer_id,
            song_id: song_id
          });
        }
      );
    });
  }

  // static getSingersAndSongsData(singer_id = null, song_id = null, page = null, limit = null) {
  //   try {
  //     // Parse limit and offset for pagination
  //     page = (page ?? 0) > 0 ? page : null;
  //     limit = (limit ?? 0) > 0 ? limit : null;
  //     if (page && limit && !singer_id && !song_id) {
  //       limit = parseInt(limit);
  //       const offset = parseInt((page - 1) * limit);
  //       return new Promise((resolve, reject) => {
  //         // Step 1: Fetch paginated singers
  //         sql.query(`
  //                       SELECT singer.singer_id
  //                       FROM singer
  //                                INNER JOIN singer_song ON singer.singer_id = singer_song.singer_id LIMIT ?
  //                       OFFSET ?
  //                   `, [limit, offset], (err, paginatedSingers) => {
  //           if (err) {
  //             console.log(err);
  //             return reject(err);
  //           }

  //           // Step 2: Check if we have any paginated singers
  //           if (paginatedSingers.length === 0) {
  //             return resolve({ message: "No singers found for the given page" });
  //           }

  //           // Get the singer_ids from paginated singers
  //           const singerIds = paginatedSingers.map(singer => singer.singer_id);

  //           // Step 3: Fetch the songs for the paginated singers
  //           let query = `
  //                           SELECT singer_song.singer_id, singer_song.song_id, s.song_name
  //                           FROM singer_song
  //                                    INNER JOIN song s ON singer_song.song_id = s.song_id
  //                           WHERE singer_song.singer_id IN (?)
  //                       `;
  //           const values = [singerIds]; // Array of singer_ids for the IN() clause

  //           if (song_id) {
  //             query += " AND singer_song.song_id = ?";
  //             values.push(song_id);
  //           }

  //           // Step 4: Get the songs associated with the selected singers
  //           sql.query(query, values, (err, singer_songs) => {
  //             if (err) {
  //               console.log(err);
  //               return reject(err);
  //             }

  //             if (!singer_songs || singer_songs.length === 0) {
  //               return resolve({ message: "No songs found for these singers" });
  //             }

  //             // Step 5: Merge singer data with their songs
  //             // Create a map of singers to store their songs
  //             const singerMap = {};

  //             // Initialize the map with singer data
  //             paginatedSingers.forEach(singer => {
  //               singerMap[singer.singer_id] = {
  //                 singer_id: singer.singer_id,
  //                 singer_name: singer.singer_name,
  //                 songs: []
  //               };
  //             });

  //             // For each song, assign it to the correct singer
  //             singer_songs.forEach(singer_song => {
  //               const singer = singerMap[singer_song.singer_id];
  //               if (singer) {
  //                 singer.songs.push({
  //                   song_id: singer_song.song_id,
  //                   song_name: singer_song.song_name
  //                 });
  //               }
  //             });

  //             // Step 6: Return the result
  //             const result = Object.values(singerMap);

  //             resolve(result);
  //           });
  //         });
  //       });
  //     } else {
  //       if (!song_id && singer_id) {
  //         return new Promise((resolve, reject) => {
  //           let query = `
  //           SELECT singer_song.*, sg.singer_name, s.song_name
  //           FROM singer_song
  //           INNER JOIN singer sg ON singer_song.singer_id = sg.singer_id
  //           INNER JOIN song s ON singer_song.song_id = s.song_id
  //           `;
  //           const values = [];
  //           const conditions = [];

  //           if (singer_id) {
  //             conditions.push("singer_song.singer_id = ?");
  //             values.push(singer_id);
  //           }

  //           if (song_id) {
  //             conditions.push("singer_song.song_id = ?");
  //             values.push(song_id);
  //           }

  //           if (conditions.length > 0) {
  //             query += " WHERE " + conditions.join(" AND ");
  //           }

  //           // Trường hợp chỉ truyền page và limit, lấy tất cả dữ liệu
  //           if (!singer_id && !song_id && !isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
  //             limit = parseInt(limit);
  //             const offset = parseInt((page - 1) * limit);
  //             query += " LIMIT ? OFFSET ?";
  //             values.push(limit, offset);
  //           }

  //           sql.query(query, values, (err, singer_songs) => {
  //             if (err) {
  //               console.log(err);
  //               return reject(err);
  //             }

  //             if (!singer_songs || singer_songs.length === 0) {
  //               return resolve({ message: "No data found" });
  //             }

  //             // Merging data into a single structure: singers -> songs
  //             const singerMap = new Map();

  //             // Iterate through the results and merge them by singer_id and song_id
  //             singer_songs.forEach(singer_song => {
  //               const singerId = singer_song.singer_id;
  //               const songId = singer_song.song_id;

  //               // Initialize singer if not already present
  //               if (!singerMap.has(singerId)) {
  //                 singerMap.set(singerId, {
  //                   singer_id: singerId,
  //                   singer_name: singer_song.singer_name,
  //                   songs: []
  //                 });
  //               }

  //               // Add song to the singer's list of songs
  //               const singer = singerMap.get(singerId);
  //               singer.songs.push({
  //                 song_id: songId,
  //                 song_name: singer_song.song_name
  //               });
  //             });

  //             // Convert the Map back to an array and resolve
  //             resolve(Array.from(singerMap.values()));
  //           });
  //         });

  //       } else if (song_id && !singer_id) {
  //         return new Promise((resolve, reject) => {
  //           let query = `
  //       SELECT singer_song.*, sg.singer_name, s.song_name
  //       FROM singer_song
  //       INNER JOIN singer sg ON singer_song.singer_id = sg.singer_id
  //       INNER JOIN song s ON singer_song.song_id = s.song_id
  //   `;
  //           const values = [];
  //           const conditions = [];

  //           if (singer_id) {
  //             conditions.push("singer_song.singer_id = ?");
  //             values.push(singer_id);
  //           }

  //           if (song_id) {
  //             conditions.push("singer_song.song_id = ?");
  //             values.push(song_id);
  //           }

  //           if (conditions.length > 0) {
  //             query += " WHERE " + conditions.join(" AND ");
  //           }

  //           // Trường hợp chỉ truyền page và limit, lấy tất cả dữ liệu
  //           if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
  //             limit = parseInt(limit);
  //             const offset = parseInt((page - 1) * limit);
  //             query += " LIMIT ? OFFSET ?";
  //             values.push(limit, offset);
  //           }

  //           sql.query(query, values, (err, singer_songs) => {
  //             if (err) {
  //               console.log(err);
  //               return reject(err);
  //             }

  //             if (!singer_songs || singer_songs.length === 0) {
  //               return resolve({ message: "No data found" });
  //             }

  //             // Merging data into a single structure: songs -> singers
  //             const songMap = new Map();

  //             // Iterate through the results and merge them by song_id and singer_id
  //             singer_songs.forEach(singer_song => {
  //               const songId = singer_song.song_id;
  //               const singerId = singer_song.singer_id;

  //               // Initialize song if not already present
  //               if (!songMap.has(songId)) {
  //                 songMap.set(songId, {
  //                   song_id: songId,
  //                   song_name: singer_song.song_name,
  //                   singers: []
  //                 });
  //               }

  //               // Add singer to the song's list of singers
  //               const song = songMap.get(songId);
  //               song.singers.push({
  //                 singer_id: singerId,
  //                 singer_name: singer_song.singer_name
  //               });
  //             });

  //             // Convert the Map back to an array and resolve
  //             resolve(Array.from(songMap.values()));
  //           });
  //         });

  //       }

  //     }
  //   } catch (error) {
  //     console.log(error);
  //     throw new Error('Error fetching data: ' + error.message);
  //   }
  // }

  static getSingersAndSongsData(singer_id = null, song_id = null, page = null, limit = null) {
    return new Promise((resolve, reject) => {
      let query = `
            SELECT *
            FROM singer_song ss
            INNER JOIN singer sg ON ss.singer_id = sg.singer_id
            INNER JOIN song s ON ss.song_id = s.song_id
       ` ;
      const values = [];
      const conditions = [];
  
      if (song_id) {
        conditions.push("s.song_id = ?");
        values.push(song_id);
      }
  
      if (singer_id) {
        conditions.push("sg.singer_id = ?");
        values.push(singer_id);
      }
  
      if (conditions.length > 0) {
        query += " WHERE " + conditions.join(" AND ");
      }
  
      query += " ORDER BY s.total_view DESC";
      // Check if page and limit are valid numbers; if not, default to get all records
      if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null) {
        const offset = (page - 1) * limit;
        query += ` LIMIT ? OFFSET ? `
        values.push(limit, offset);
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

  // static getSingersAndSongsData(singer_id = null, song_id = null, page = null, limit = null) {
  //     try {
  //         // Step 1: Parse limit and offset for pagination
  //         limit = parseInt(limit);
  //         const offset = parseInt((page - 1) * limit);
  //
  //         return new Promise((resolve, reject) => {
  //
  //             // Step 2: Fetch paginated singers
  //             sql.query(`
  //             SELECT singer_id
  //             FROM singer
  //             LIMIT ?
  //             OFFSET ?
  //         `, [limit, offset], (err, paginatedSingers) => {
  //                 if (err) {
  //                     console.log(err);
  //                     return reject(err);
  //                 }
  //
  //                 // Step 3: Get the list of singer_ids
  //                 const singerIds = paginatedSingers.map(singer => singer.singer_id);
  //
  //                 if (singerIds.length === 0) {
  //                     return resolve({ message: "No singers found for the given page" });
  //                 }
  //
  //                 // Step 4: Build the main query with the IN() clause
  //                 let query = `
  //                 SELECT singer_song.*, sg.singer_name, s.song_name
  //                 FROM singer_song
  //                 INNER JOIN singer sg ON singer_song.singer_id = sg.singer_id
  //                 INNER JOIN song s ON singer_song.song_id = s.song_id
  //                 WHERE singer_song.singer_id IN (?)
  //             `;
  //                 const values = [singerIds]; // Array of singer_ids for the IN() clause
  //
  //                 // Step 5: Add additional filters if singer_id or song_id are provided
  //                 const conditions = [];
  //
  //                 if (singer_id) {
  //                     conditions.push("singer_song.singer_id = ?");
  //                     values.push(singer_id);
  //                 }
  //
  //                 if (song_id) {
  //                     conditions.push("singer_song.song_id = ?");
  //                     values.push(song_id);
  //                 }
  //
  //                 // Append any conditions to the query
  //                 if (conditions.length > 0) {
  //                     query += " AND " + conditions.join(" AND ");
  //                 }
  //
  //                 // Step 6: Execute the query to get singer_song data
  //                 sql.query(query, values, (err, singer_songs) => {
  //                     if (err) {
  //                         console.log(err);
  //                         return reject(err);
  //                     }
  //
  //                     if (!singer_songs || singer_songs.length === 0) {
  //                         return resolve({ message: "No data found" });
  //                     }
  //
  //                     // Step 7: Create promises to fetch song details for each song
  //                     const songDetailsPromises = singer_songs.map(singer_song => {
  //                         return new Promise((resolveSong) => {
  //                             sql.query(`
  //                             SELECT singer_song.*, sg.singer_name, s.song_name
  //                             FROM singer_song
  //                             INNER JOIN singer sg ON singer_song.singer_id = sg.singer_id
  //                             INNER JOIN song s ON singer_song.song_id = s.song_id
  //                             WHERE singer_song.song_id = ?
  //                         `, [singer_song.song_id], (err, songDetails) => {
  //                                 if (err) {
  //                                     console.log(err);
  //                                     return reject(err);
  //                                 }
  //
  //                                 if (!songDetails || songDetails.length === 0) {
  //                                     return resolveSong({
  //                                         "song_id": singer_song.song_id,
  //                                         "song_name": singer_song.song_name,
  //                                         "singers": [] // No singers for this song
  //                                     });
  //                                 }
  //
  //                                 const singers = songDetails.map(detail => ({
  //                                     singer_id: detail.singer_id,
  //                                     singer_name: detail.singer_name
  //                                 }));
  //
  //                                 resolveSong({
  //                                     "song_id": singer_song.song_id,
  //                                     "song_name": singer_song.song_name,
  //                                     "singers": singers
  //                                 });
  //                             });
  //                         });
  //                     });
  //
  //                     // Step 8: Resolve all promises for song details and merge data
  //                     Promise.all(songDetailsPromises)
  //                         .then(mergedData => {
  //                             resolve(singer_songs.map(singer_song => ({
  //                                 "singer_id": singer_song.singer_id,
  //                                 "singer_name": singer_song.singer_name,
  //                                 "songs": mergedData.filter(data => data.song_id === singer_song.song_id)
  //                             })));
  //                         })
  //                         .catch(reject);
  //                 });
  //             });
  //         });
  //     } catch (error) {
  //         console.log(error);
  //         throw new Error('Error fetching data: ' + error.message);
  //     }
  // }


}

module.exports = SingerSongServices;
