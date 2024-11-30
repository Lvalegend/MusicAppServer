const fs = require('fs').promises;
const path = require('path');

async function deleteFiles(req) {
  const filePaths = [
    `F:/Graduation Server Project/src/uploads/audios-m4a/${req}`,
    `F:/Graduation Server Project/src/uploads/changes/${req}.wav`,
  ];

  try {
    await Promise.all(filePaths.map((filePath) => fs.unlink(filePath)));
    console.log('Đã xóa file ở cả hai thư mục.');
  } catch (err) {
    console.error('Lỗi khi xóa file:', err);
  }
}

const changeFileFormat = async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send('No file uploaded');
  }

  try {
    console.log('req.file.filename', `F:/Graduation Server Project/src/uploads/audios/${req.file.filename}`)
    const result = await fetch(`http://localhost:8080?filename=${req.file.filename}`);
    const json = await result.json();
    console.log(json);
    if (json) {
      deleteFiles(req.file.filename)
      req.text = json
      return next();
    }
  } catch (e) {
    console.error('Error:', e);
    deleteFiles(req.file.filename)
    return res.status(500).send('Error');
  }
}
module.exports = changeFileFormat