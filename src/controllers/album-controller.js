const AlbumServices = require("../services/album-services");
const paginate = require("../utilities/pagination");

exports.addAlbum = async (req, res, next) => {
  const data = req.body;
  try {
    const result = await AlbumServices.addAlbum(data);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
exports.getAlbumData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const response = await paginate('album', page, limit);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
