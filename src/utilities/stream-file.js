const path = require('path');
const fs = require('fs');

exports.StreamFileAudio = (req, res) => {
  const link = req.params[0]; // Get the file path from the wildcard parameter

    // Construct the full path to the file
    const filePath = path.join(__dirname, '..', '..', link);
    console.log(filePath);

    // Check if the file exists
    if (!fs.existsSync(filePath)) {
      res.status(404).send({success: false, message: 'File not found'});
      return;
    }

    const stat = fs.statSync(filePath);
    const fileSize = stat.size;
    const range = req.headers.range;

    if (range) {
      const parts = range.replace(/bytes=/, "").split("-");
      const start = parseInt(parts[0], 10);
      const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;

      if (start >= fileSize) {
        res.status(416).send('Requested range not satisfiable\n' + start + ' >= ' + fileSize);
        return;
      }
      const chunkSize = (end - start) + 1;
      const file = fs.createReadStream(filePath, { start, end });
      const head = {
        'Content-Range': `bytes ${start}-${end}/${fileSize}`,
        'Accept-Ranges': 'bytes',
        'Content-Length': chunkSize,
        'Content-Type': 'audio/mpeg', // Adjust as needed for the actual content type
      };

      res.writeHead(206, head);
      file.pipe(res);
    } else {
      const head = {
        'Content-Length': fileSize,
        'Content-Type': 'audio/mpeg', // Adjust as needed for the actual content type
      };

      res.writeHead(200, head);
      fs.createReadStream(filePath).pipe(res);
    }
};

exports.StreamFileImage = (req, res) => {
  const link = req.params[0]; // Get the file path from the wildcard parameter

  // Construct the full path to the file
  const filePath = path.join(__dirname, '..', '..', link);
  console.log(filePath);

  // Check if the file exists
  if (!fs.existsSync(filePath)) {
    res.status(404).send({success: false, message: 'File not found'});
    return;
  }

  // Get the file extension to determine the content type
  const ext = path.extname(filePath).toLowerCase();
  let contentType = 'image/jpeg'; // Default content type

  // Adjust the content type based on the file extension
  if (ext === '.png') {
    contentType = 'image/png';
  } else if (ext === '.gif') {
    contentType = 'image/gif';
  } else if (ext === '.webp') {
    contentType = 'image/webp';
  } else if (ext === '.bmp') {
    contentType = 'image/bmp';
  } // Add other image formats if needed

  // Set the response headers and stream the image
  const stat = fs.statSync(filePath);
  const fileSize = stat.size;
  const head = {
    'Content-Length': fileSize,
    'Content-Type': contentType,
  };

  res.writeHead(200, head);
  fs.createReadStream(filePath).pipe(res);
};