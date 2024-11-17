const UserAlbumServices = require("../services/user-album-services");

exports.relationshipUserAndAlbum = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { album_id } = req.body;
    const values = {
      user_id: user_id,
      album_id: album_id
    };

    await UserAlbumServices.relationshipUserAndAlbum(values);
    return res.status(200).json({ success: true, message: 'Success' });

  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};

exports.deleteUserAndAlbumReplationship = async (req, res, next) => {
  const { user_id } = req.user;
  const album_id = parseInt(req.query.album_id);
  try {
    const result = await UserAlbumServices.deleteUserAlbumRelationship(user_id, album_id);
    return res.status(200).json({ success: true, message: 'Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
exports.getUserAndAlbumsData = async (req, res, next) => {
  const { user_id } = req.user;
  const album_id = parseInt(req.query.album_id);
  const limit = parseInt(req.query.limit)
  const page = parseInt(req.query.page)
  try {
    const result = await UserAlbumServices.getUserAndAlbumsData(album_id, user_id, page, limit);
    return res.status(200).json({ success: true, message: 'Get Data Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
