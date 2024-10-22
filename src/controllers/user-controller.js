const { JWT_SECRET } = require("../configs/config-env");
const jwt = require('jsonwebtoken');
const UserServices = require("../services/user-services");
const paginate = require("../utilities/pagination");

exports.registerAccount = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await UserServices.registerAccount(data);

    if (result.message) {
      return res.status(400).json({ message: result.message });
    }

    const user_id = result.user_id;
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '24h' });

    console.log('Successfully Registered:', result);
    return res.status(200).json({
      success: true,
      message: 'Register Successful',
      token,
      role: result.role,
      user_name: result.user_name,
      user_avatar: result.user_avatar,
      email: result.email,
      password: result.password
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

exports.loginAccount = async (req, res, next) => {
  const data = req.body;

  try {
    const result = await UserServices.loginAccount(data);

    if (result.message) {
      return res.status(400).json({ message: result.message });
    }

    const user_id = result.user_id;
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '24h' });

    console.log('Successfully Logged In:', result);
    return res.status(200).json({
      success: true,
      message: 'Login Successful',
      token,
      role: result.role,
      user_name: result.user_name,
      user_avatar: result.user_avatar,
      email: result.email, password: result.password
    });

  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.getUserData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);
  const filterColumn = req.query.filterColumn ? req.query.filterColumn.toString() : '';
  const filterValue = req.query.filterValue ? req.query.filterValue.toString() : '';

  try {
    const response = await paginate('user', page, limit, filterColumn, filterValue);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};
exports.updateProfile = async (req, res, next) => {
  try {
    const { user_id } = req.user
    const { user_name } = req.body
    let user_avatar;
    if (req?.file?.filename !== undefined) {
      user_avatar = `src/uploads/images/${req?.file?.filename}`;
    }
    const data = {
      user_id: user_id,
      user_name: user_name,
      user_avatar: user_avatar,
    }
    const result = await UserServices.updateProfile(data)
    if (result) {
      return res.status(200).json({ success: true, message: 'Update Success', data: result });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
}
