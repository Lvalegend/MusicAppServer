const SongCategoryServices = require("../services/song-category-services");

exports.relationshipSongAndCategory = async (req, res, next) => {
  const { songIds, categoryIds } = req.body;

  if (!Array.isArray(categoryIds) || categoryIds.length === 0) {
    return res.status(400).json({ message: 'Invalid category list' });
  }

  if (!Array.isArray(songIds) || songIds.length === 0) {
    return res.status(400).json({ message: 'Invalid song list' });
  }

  try {
    for (const song_id of songIds) {
      for (const category_id of categoryIds) {
        const values = [song_id, category_id];
        await SongCategoryServices.relationshipSongAndCategory(values);
      }
    }
    return res.status(200).json({ success: true, message: 'Success'});
  } catch (error) {
    return res.status(500).json({ success: false, error });
  }
};
