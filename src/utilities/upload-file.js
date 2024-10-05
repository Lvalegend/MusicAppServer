const upload = require("./multer-storage");

exports.singleFile = upload.single('image');
exports.muitiFile = upload.fields([{ name: 'image', maxCount: 1 }, { name: 'audio', maxCount: 1 }])

exports.responseStatusFile = (req, res, next) => {
  if (req.file) {
    return res.status(200).json('Thành công');
  } else {
    return res.status(400).json('Không có file nào được tải lên');
  }
};

