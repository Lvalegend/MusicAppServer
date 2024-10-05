const CategoryServices = require("../services/category-services");
const paginate = require("../utilities/pagination");

exports.addCategory = async (req, res, next) => {
  const { category_name } = req.body;

  try {
    const result = await CategoryServices.addCategory(category_name);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getCategoryData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const response = await paginate('category', page, limit);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
