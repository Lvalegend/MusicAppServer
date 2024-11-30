const { getAllSongData } = require("../all-song");
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
          sql.query("SELECT * FROM `song` WHERE `song_name` LIKE ?  " +
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
                        sql.query("SELECT * FROM `singer` WHERE `singer_id` = ?", [singer.singer_id], (err, singerData) => {
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
                        song_url: song.song_url,
                        song_image: song.song_image,
                        song_entity_id: song.song_entity_id,
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
          sql.query("SELECT * FROM `song` WHERE `song_name` LIKE ?", [`%${text}%`], (err, songs) => {
            if (err) {
              console.log(err);
              return reject(err);
            }

            // Create an array of promises for fetching singer data
            const songPromises = songs.map(song => {
              return new Promise((resolveSong) => {
                sql.query("SELECT * FROM `singer_song` WHERE `song_id` = ?", [song.song_id], (err, singers) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }

                  const singerPromises = singers.map(singer => {
                    return new Promise((resolveSinger) => {
                      sql.query("SELECT * FROM `singer` WHERE `singer_id` = ?", [singer.singer_id], (err, singerData) => {
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
                      song_url: song.song_url,
                      song_image: song.song_image,
                      song_entity_id: song.song_entity_id,
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
  static getSpeechToTextData(text) {
    const dataCompare = getAllSongData()
    if (text && dataCompare) {
      function generateNgrams(text, n) {
        text = text.toLowerCase().replace(/\s+/g, "");
        let ngrams = [];
        for (let i = 0; i <= text.length - n; i++) {
          ngrams.push(text.substring(i, i + n));
        }
        return ngrams;
      }

      function jaccardSimilarity(s1, s2, n = 2) {
        let ngrams1 = new Set(generateNgrams(s1, n));
        let ngrams2 = new Set(generateNgrams(s2, n));

        let intersection = new Set([...ngrams1].filter(x => ngrams2.has(x))).size;
        let union = new Set([...ngrams1, ...ngrams2]).size;

        return union !== 0 ? intersection / union : 0.0;
      }

      function findMostSimilarSong(catalogue, resultText, n = 2) {
        let bestMatch = { song_id: null, similarity: 0 };

        catalogue.forEach(song => {
          resultText.forEach(text => {
            let similarity = jaccardSimilarity(song.song_name, text, n);
            if (similarity > bestMatch.similarity) {
              bestMatch = { song_id: song.song_id, similarity };
            }
          });
        });

        return bestMatch;
      }

      const bestMatch = findMostSimilarSong(dataCompare, text, 2);
      console.log(`Bài hát có độ tương đồng cao nhất: Song ID ${bestMatch.song_id}, Độ tương đồng: ${bestMatch.similarity.toFixed(2)}`);
      if (bestMatch.similarity.toFixed(2) > 0.35) {
        return bestMatch.song_id
      }
      else {
        return 0
      }
    }
  }
}

module.exports = SearchServices;
