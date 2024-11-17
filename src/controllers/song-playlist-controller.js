const SongPlaylistServices = require("../services/song-playlist-services");

exports.deleteSongsAndPlaylistReplationship = async (req, res, next) => {
    const song_id = parseInt(req.query.song_id);
    const playlist_id = parseInt(req.query.playlist_id);
    try {
        const result = await SongPlaylistServices.deleteSongPlaylistRelationship(song_id,playlist_id);
        return res.status(200).json({ success: true, message: 'Success', result: result });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || err });
    }
}

exports.addSongsInPlaylist = async (req, res, next) => {
  const { playlist_id, songIds } = req.body;

  if (!Array.isArray(songIds) || songIds.length === 0) {
    return res.status(400).json({ message: 'Invalid song list' });
  }

  const values = songIds.map(song_id => [playlist_id, song_id]);
  console.log('values:', values);

  try {
    await Promise.all(
      values.map(item => SongPlaylistServices.addSongInPlaylist(item))
    );

    return res.status(200).json({ success: true, message: 'All songs added to playlist successfully' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getSongsAndPlaylistData = async (req, res, next) => {
  const song_id = parseInt(req.query.song_id)
  const playlist_id = parseInt(req.query.playlist_id)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  try {
    const result = await SongPlaylistServices.getSongsAndPlaylistData(song_id, playlist_id, page, limit)
    if (result) {
      res.status(200).json({ success: true, message: 'Get data success', data: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
}
