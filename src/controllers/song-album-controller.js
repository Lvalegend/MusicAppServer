const SongAlbumServices = require("../services/song-album-services");

exports.relationshipSongAndAlbum = async (req, res, next) => {
  const { songIds, albumIds } = req.body;

  if (!Array.isArray(albumIds) || albumIds.length === 0) {
    return res.status(400).json({ message: 'Invalid album list' });
  }

  if (!Array.isArray(songIds) || songIds.length === 0) {
    return res.status(400).json({ message: 'Invalid song list' });
  }

  try {
    for (const song_id of songIds) {
      for (const album_id of albumIds) {
        const values = [song_id, album_id];
        await SongAlbumServices.relationshipSongAndAlbum(values);
      }
    }
    return res.status(200).json({ success: true, message: 'Success'});
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
