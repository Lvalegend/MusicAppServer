const UserSongServices = require("../services/user-song-services");

exports.relationshipUserAndSong = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { song_id } = req.body;
    const values = {
      user_id: user_id,
      song_id: song_id,
    };

    const result = await UserSongServices.relationshipUserAndSong(values);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

exports.deleteRelationshipUserAndSong = async (req, res, next) => {
  const { user_id } = req.user;
  const song_id = parseInt(req.query.song_id);
  try {
    const result = await UserSongServices.deleteUserSongRelationship(user_id, song_id);
    return res.status(200).json({ success: true, message: 'Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
exports.getUserAndSongsData = async (req, res, next) => {
  const { user_id } = req.user;
  const song_id = parseInt(req.query.song_id)
  const page = parseInt(req.query.page)
  const limit = parseInt(req.query.limit)

  try {
    const result = await UserSongServices.getUserAndSongsData(song_id, user_id, page, limit);
    if (result) {
      res.status(200).json({ success: true, message: 'Get data success', data: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
}
