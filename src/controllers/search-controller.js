const SearchServices = require("../services/search-services");

exports.getSearchResult = async (req, res, next) => {
  const text = req.query.text;
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  try {
    const result = await SearchServices.getSearchData(text, page, limit);
    if (result) {
      res.status(200).json({ success: true, message: 'Get data success', data: result });
    }
  } catch (error) {
    res.status(500).json({ success: false, error: error.message || error });
  }
}
