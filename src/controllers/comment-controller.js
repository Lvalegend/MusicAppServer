const CommentServices = require("../services/comment-services");
const paginate = require("../utilities/pagination");

exports.saveComments = async (req, res, next) => {
   const data = req.body
   const { user_id } = req.user;
   try{
     const result = await CommentServices.saveComments(data, user_id)
     return res.status(200).json({ success: true, message: 'Success', result: result });
    } catch (err) {
      return res.status(500).json({ success: false, error: err.message || err });
    }
}
exports.getCommentData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : ''; // lấy tên cột
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';

  try {
    const response = await paginate('comment', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}