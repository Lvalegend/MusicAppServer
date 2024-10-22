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


