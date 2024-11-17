const RecentlyViewedServices = require("../services/recently-viewed-services");

exports.addRecentlyViewedForUser = async (req, res, next) => {
  const { user_id } = req.user;
  const song_id = parseInt(req.query.song_id);
  const data = {
    user_id: user_id,
    song_id: song_id
  };

  try {
    const result = await RecentlyViewedServices.addViewToQueue(data);
    return res.status(200).json({ success: true, message: 'Add To Queue successfully', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getRecentlyViewedData = async (req, res, next) => {
  const { user_id } = req.user;
  const song_id = parseInt(req.query.song_id);

  try {
    const result = await RecentlyViewedServices.getRecentlyViewedData(song_id, user_id);
    return res.status(200).json({ success: true, message: 'Get Data Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
