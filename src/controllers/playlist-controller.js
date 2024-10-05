const PlaylistServices = require("../services/playlist-service");

exports.createPlaylist = async (req, res, next) => {
  const { user_id } = req.user;
  const { playlist_name } = req.body;
  const data = {
    user_id: user_id,
    playlist_name: playlist_name
  };

  try {
    const result = await PlaylistServices.createPlaylist(data);
    return res.status(200).json({ success: true, message: 'Playlist created successfully', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
