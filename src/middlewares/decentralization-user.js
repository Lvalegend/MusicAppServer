// Phân quyền
const checkDecentralizationUser = (req, res, next) => {
  const role = req.user.role
  if (role === "admin" || role === "normal") {
    return res.status(200).json({ sucess: true });
  }
  else if (role === "admin" || role === "vip") {
    return res.status(200).json({ sucess: true });
  }
  else if (role === "admin") {
    return res.status(200).json({ sucess: true })
  }
  else {
    return res.status(403).json({ success: false, message: 'Không có quyền truy cập' })
  }
}

module.exports = checkDecentralizationUser
