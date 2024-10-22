const SingerServices = require("../services/singer-services");
const paginate = require("../utilities/pagination");

exports.saveSingerData = async (req, res, next) => {
  const data = req.body;
  const singer_avatar = req?.file?.filename ?  `src/uploads/images/${req?.file?.filename}` : null;

  try {
    const result = await SingerServices.saveSingerData(data, singer_avatar);
    return res.status(200).json({ success: true, message: 'Singer added successfully', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getSingerData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : ''; // lấy tên cột
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';

  try {
    const response = await paginate('singer', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
