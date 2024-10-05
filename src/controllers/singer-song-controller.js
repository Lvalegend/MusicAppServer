const SingerSongServices = require("../services/singer-song-services");

exports.relationshipSingerAndSong = async (req, res, next) => {
  const { singerIds, songIds } = req.body;

  if (!Array.isArray(singerIds) || singerIds.length === 0) {
    return res.status(400).json({ message: 'Invalid singer list' });
  }

  if (!Array.isArray(songIds) || songIds.length === 0) {
    return res.status(400).json({ message: 'Invalid song list' });
  }

  try {
    for (const singer_id of singerIds) {
      for (const song_id of songIds) {
        const values = [singer_id, song_id];
        await SingerSongServices.relationshipSingerAndSong(values);
      }
    }
    return res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
