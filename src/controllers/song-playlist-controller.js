const SongPlaylistServices = require("../services/song-playlist-services");

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
