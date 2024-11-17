const path = require('path');
const fs = require('fs');

const FILES_DIR = path.join(__dirname, '..', 'uploads', 'audios');

const downloadFile = (req, res) => {
  const fileName = req.query.fileName;
  const filePath = path.join(FILES_DIR, fileName);

  console.log('Đường dẫn file:', filePath);

  fs.stat(filePath, (err, stats) => {
    if (err || !stats.isFile()) {
      console.error('Lỗi khi kiểm tra file:', err);
      return res.status(404).send('Không tìm thấy file');
    }

    res.download(filePath, fileName, (err) => {
      if (err) {
        console.error('Lỗi khi tải file:', err);
        return res.status(500).send('Lỗi khi tải file');
      }
      console.log('Tải file thành công')
    });
  });
};

module.exports = downloadFile;