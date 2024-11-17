const SongServices = require("../services/song-services");
const paginate = require("../utilities/pagination");
const statusUpdate = require("../services/status-update-services");

exports.saveSongData = async (req, res, next) => {
  const data = req.body;
  const imageFile = req?.files?.image ? req?.files?.image[0] : null;
  const audioFile = req?.files?.audio[0];

  const song_image = imageFile ? `src/uploads/images/${imageFile?.filename}` : null;
  const song_url = `src/uploads/audios/${audioFile?.filename}`;

  try {
    let isHot =  data.is_hot||"0";
    let result;
    if(isHot === "1"){
        result = await SongServices.saveSongData(data, song_image, song_url,'hot');
    }else{
        result = await SongServices.saveSongData(data, song_image, song_url,'new');
    }
      if(result != null){
          await statusUpdate('song','song_id');
      }
    return res.status(200).json({ success: true, message: 'Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.getSongData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : ''; // lấy tên cột
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';
  const isRandom = req.query.isRandom ? parseInt(req.query.isRandom) : '';

  try {
    const response = await paginate('song', page, limit,filterColumn,filterValue,isRandom);
    if (response) {
      return res.status(200).json({ success: true, result: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.deleteSong = async (req, res, next) => {
  const song_id = parseInt(req.query.song_id);
  try {
    const result = await SongServices.deleteSong(song_id);
    return res.status(200).json({ success: true, message: 'Success', result: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.editSong = async (req, res, next) => {
    const data = req.body;
    const imageFile = req?.files?.image ? req?.files?.image[0] : null;
    const audioFile = req?.files?.audio[0];
    try {
        const result = await SongServices.editSong(data,imageFile,audioFile);
        return res.status(200).json({ success: true, message: 'Success', result: result });
    } catch (err) {
        return res.status(500).json({ success: false, error: err.message || err });
    }
}
exports.updateSongView = async (req, res, next) => {
  const song_id = parseInt(req.query.song_id);
  try {
    await SongServices.updateSongView(song_id);
    return res.status(200).json({ success: true, message: 'Update success' });
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
