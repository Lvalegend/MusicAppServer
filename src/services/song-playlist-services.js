const sql = require("../configs/database-config");

class SongPlaylistServices {

  static deleteSongPlaylistRelationship(song_id, playlist_id) {
    return new Promise((resolve, reject) => {
      sql.query(
        "DELETE FROM `song_playlist` WHERE `song_id` = ? AND `playlist_id` = ?",
        [song_id, playlist_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          return resolve({
            message: "Song And Playlist Relationship deleted successfully",
            song_id: song_id,
            playlist_id: playlist_id
          });
        }
      );
    });
  }
  static addSongInPlaylist(values) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `song_playlist` (`playlist_id`, `song_id`) VALUES (?)",
        [values],
        (err, res) => {
          if (err) {
            console.log(err);
            reject(err);
            return;
          }
          resolve({
            playlist_id: values.playlist_id,
            song_id: values.song_id,
          });
        }
      );
    });
  }
  static getSongsAndPlaylistData(song_id = null, playlist_id = null, page = null, limit = null) {
    try {
      if (playlist_id) {
        return new Promise((resolve, reject) => {
          let query = `
            SELECT song_playlist.*, playlist.playlist_name, playlist.date_created
            FROM song_playlist
            INNER JOIN playlist ON song_playlist.playlist_id = playlist.playlist_id
            WHERE song_playlist.playlist_id = ?
          `;
          const values = [playlist_id];

          if (!isNaN(page) && !isNaN(limit) && page !== null && limit !== null && page !== undefined && limit !== undefined) {
            limit = parseInt(limit);
            const offset = parseInt((page - 1) * limit);
            query += " LIMIT ? OFFSET ?";
            values.push(limit, offset);
          }

          sql.query(query, values, (err, song_playlists) => {
            if (err) {
              console.log(err);
              return reject(err);
            }

            if (!song_playlists || song_playlists.length === 0) {
              return resolve([]);
            }

            // Create promises for fetching singers
            const singer_playlists_promise = song_playlists.map(song_playlist => {
              return new Promise((resolveSong) => {
                sql.query(`
                  SELECT *
                  FROM singer_song
                  INNER JOIN singer ON singer_song.singer_id = singer.singer_id
                  INNER JOIN song ON singer_song.song_id = song.song_id
                  WHERE singer_song.song_id = ?
                `, [song_playlist.song_id], (err, songWithOtherJoinDatas) => {
                  if (err) {
                    console.log(err);
                    return reject(err);
                  }
                  if (!songWithOtherJoinDatas || songWithOtherJoinDatas.length === 0) {
                    return resolveSong({
                      "song_id": song_playlist.song_id,
                      "song_name": song_playlist.song_name,
                      "song_image": song_playlist.song_image,
                      "song_url": song_playlist.song_url,
                      "singers": [] // No singers for this song
                    });
                  }
                  const singers = songWithOtherJoinDatas.map(songWithOtherJoinData => ({
                    singer_name: songWithOtherJoinData.singer_name,
                    singer_id: songWithOtherJoinData.singer_id,
                    singer_avatar: songWithOtherJoinData.singer_avatar,
                    date_of_birth: songWithOtherJoinData.date_of_birth,
                    description: songWithOtherJoinData.description,
                    singer_entity_id: songWithOtherJoinData.singer_entity_id,
                    total_favourite: songWithOtherJoinData.total_favourite
                  }));

                  resolveSong({
                    "song_id": song_playlist.song_id,
                    "song_name": songWithOtherJoinDatas[0].song_name,
                    "song_image": songWithOtherJoinDatas[0].song_image,
                    "song_url": songWithOtherJoinDatas[0].song_url,
                    "singers": singers
                  });
                });
              });
            });

            Promise.all(singer_playlists_promise)
              .then(mergedData => {
                resolve({
                  "playlist_id": song_playlists[0].playlist_id,
                  "playlist_name": song_playlists[0].playlist_name,
                  "date_created": song_playlists[0].date_created,
                  "songs": mergedData
                });
              })
              .catch(reject);
          });
        });
      }
    } catch (error) {
      console.log(error);
      throw new Error('Error fetching data: ' + error.message);
    }
  }

}

module.exports = SongPlaylistServices;
