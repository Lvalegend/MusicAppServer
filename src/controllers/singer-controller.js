const SingerServices = require("../services/singer-services");
const paginate = require("../utilities/pagination");

exports.saveSingerData = async (req, res, next) => {
  const data = req.body;
  const singer_avatar = `src/uploads/images/${req.file.filename}`;

  try {
    const result = await SingerServices.saveSingerData(data, singer_avatar);
    return res.status(200).json({ success: true, message: 'Singer added successfully', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getSingerData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const response = await paginate('singer', page, limit);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
