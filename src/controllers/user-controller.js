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
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Successfully Registered:', result);
    return res.status(200).json({ message: 'Register Successful', token, redirect: '/HomeScreen' });

  } catch (err) {
    return res.status(500).json({ error: err.message || err });
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
    const token = jwt.sign({ user_id: user_id }, JWT_SECRET, { expiresIn: '1h' });

    console.log('Successfully Logged In:', result);
    return res.status(200).json({ message: 'Login Successful', token, redirect: '/HomeScreen' });

  } catch (err) {
    return res.status(500).json({ error: err.message || err });
  }
};
exports.getUserData = async (req, res, next) => {
  const page = parseInt(req.query.page);
  const limit = parseInt(req.query.limit);

  try {
    const response = await paginate('user', page, limit);
    if (response) {
      return res.status(200).json({ success: true, data: response });
    }
  } catch (err) {
    return res.status(500).json({ success: false, error: err.message || err });
  }
};

