const CommentServices = require("../services/comment-services");

exports.saveComments = async (req, res, next) => {
   const data = req.body
   const { user_id } = req.user;
   const io = req.io;
   try{
     const result = await CommentServices.saveComments(data, user_id, io)
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
  const isRandom = parseInt(req.query.random)

  try {
    const response = await CommentServices.getCommentsData(page, limit, filterColumn, filterValue, isRandom)
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}