const UserSongServices = require("../services/user-song-services");

exports.relationshipUserAndSong = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { song_id } = req.body;
    const values = {
      user_id: user_id,
      song_id: song_id
    };

    const result = await UserSongServices.relationshipUserAndSong(values);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};
