const multer = require('multer');
const path = require('path');
const fs = require('fs');

// Đảm bảo các thư mục tồn tại
const ensureDirectoryExistence = (dir) => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
};

// Định nghĩa thư mục lưu trữ và đặt tên file
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let uploadPath = 'src/uploads/';
    
    if (file.mimetype.startsWith('image')) {
      uploadPath += 'images/';
    } else if (file.mimetype.startsWith('video')) {
      uploadPath += 'videos/';
    } else if (file.mimetype === 'audio/mpeg') {
      uploadPath += 'audios/';
    }

    ensureDirectoryExistence(uploadPath); // Đảm bảo thư mục tồn tại
    cb(null, uploadPath); // Thiết lập thư mục lưu trữ
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname); // Đặt tên file
  }
});

// Khởi tạo multer với cấu hình đã định nghĩa
const upload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    // Cập nhật regex để kiểm tra file mp3
    const filetypes = /jpeg|jpg|png|gif|mp4|mp3|avi|mkv/;
    
    const mimetype = file.mimetype === 'audio/mpeg' || filetypes.test(file.mimetype);
    const extname = path.extname(file.originalname).toLowerCase();

    if (mimetype && filetypes.test(extname)) {
      return cb(null, true);
    } else {
      cb(new Error('Chỉ cho phép tải lên các file ảnh, video và mp3!'));
    }
  }
});

module.exports = upload;
