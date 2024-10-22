const PlaylistServices = require("../services/playlist-service");
const paginate = require("../utilities/pagination");

exports.createPlaylist = async (req, res, next) => {
  const { user_id } = req.user;
  const { playlist_name } = req.body;
  const data = {
    user_id: user_id,
    playlist_name: playlist_name
  };

  try {
    const result = await PlaylistServices.createPlaylist(data);
    return res.status(200).json({ success: true, message: 'Playlist created successfully', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};


exports.getUserPlaylistData = async (req, res, next) => {
  const { user_id } = req.user
  try {
    const result = await PlaylistServices.getUserPlaylistData(user_id)
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err })
  }
}


exports.getPlaylistData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : ''; // lấy tên cột
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';

  try {
    const response = await paginate('playlist', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
