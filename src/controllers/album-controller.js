const AlbumServices = require("../services/album-services");
const paginate = require("../utilities/pagination");

exports.addAlbum = async (req, res, next) => {
  const data = req.body;
  const album_image = req?.file?.filename ? `src/uploads/images/${req?.file?.filename}` : null;

  try {
    const result = await AlbumServices.addAlbum(data, album_image);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message });
  }
};
exports.getAlbumData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : ''; // lấy tên cột
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';

  try {
    const response = await paginate('album', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
