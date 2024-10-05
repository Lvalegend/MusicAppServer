// Phân quyền chỉ cho admin
const checkAdminPermissions = (req, res, next) => {
  const { role } = req.user;

  if (role === "admin") {
    return next(); 
  }
  return res.status(403).json({ success: false, message: 'Không có quyền truy cập' });
};

module.exports = checkAdminPermissions;
