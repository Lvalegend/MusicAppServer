const SongServices = require("../services/song-services");
const paginate = require("../utilities/pagination");

exports.saveSongData = async (req, res, next) => {
  const data = req.body;
  const imageFile = req.files['image'][0];
  const audioFile = req.files['audio'][0];

  const song_image = `src/uploads/images/${imageFile.filename}`;
  const song_url = `src/uploads/audios/${audioFile.filename}`;

  try {
    const result = await SongServices.saveSongData(data, song_image, song_url);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.getSongData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const response = await paginate('song', page, limit);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
