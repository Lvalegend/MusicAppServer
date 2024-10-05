const jwt = require('jsonwebtoken');
const { JWT_SECRET } = require('../configs/config-env');


// Middleware để xác thực token dùng cho xác định người dùng
const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if (token == null)
        return res.status(401).json({ sucess: false, message: 'No tokens detected' });
    jwt.verify(token, JWT_SECRET, (err, user) => {
        if (err){
           return res.status(500). json({ sucess: false, message: 'Unable to decode token'});
        }    
        req.user = user; // req.user là tên tự tạo
        console.log(req.user);
        next(); 
    });
};

module.exports = authenticateToken;
