const SingerAlbumServices = require("../services/singer-album-services");

exports.relationshipSingerAndAlbum = async (req, res, next) => {
  const { singerIds, albumIds } = req.body;

  if (!Array.isArray(singerIds) || singerIds.length === 0) {
    return res.status(400).json({ message: 'Invalid singer list' });
  }

  if (!Array.isArray(albumIds) || albumIds.length === 0) {
    return res.status(400).json({ message: 'Invalid album list' });
  }

  try {
    for (const singer_id of singerIds) {
      for (const album_id of albumIds) {
        const values = [singer_id, album_id];
        await SingerAlbumServices.relationshipSingerAndAlbum(values);
      }
    }
    return res.status(200).json({ success: true, message: 'Success' });
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
exports.getSingersAndAlbumsData = async (req, res, next) => {
  const singer_id = parseInt(req.query.singer_id)
  const album_id = parseInt(req.query.album_id)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)
  try {
    const result = await SingerAlbumServices.getSingersAndAlbumsData(singer_id, album_id, page, limit)
    if (result) {
      res.status(200).json({ success: true, message: 'Get data success', data: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
}
