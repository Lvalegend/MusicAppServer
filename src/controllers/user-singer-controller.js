const UserSingerServices = require("../services/user-singer-services");

exports.relationshipUserAndSinger = async (req, res, next) => {
  try {
    const { user_id } = req.user;
    const { singer_id } = req.body;
    const values = {
      user_id: user_id,
      singer_id: singer_id
    };

    const result = await UserSingerServices.relationshipUserAndSinger(values);
    return res.status(200).json({ success: true, message: 'Success', data: result });
  } catch (err) {
    return res.status(500).json({ success: false, error: err });
  }
};
