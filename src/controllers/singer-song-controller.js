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
exports.getSingersAndSongsData = async (req, res, next) => {
  const singer_id = parseInt(req.query.singer_id)
  const song_id = parseInt(req.query.song_id)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  try {
    const result = await SingerSongServices.getSingersAndSongsData(singer_id, song_id, page, limit);
    if (result) {
      res.status(200).json({ success: true, message: 'Get data success', data: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
}
