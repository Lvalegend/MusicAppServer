const jwt = require('jsonwebtoken');
const mysql = require('mysql2/promise');
const { DB_HOST, DB_USER, DB_PASSWORD, DB_NAME, JWT_SECRET } = require('../configs/config-env');


const pool = mysql.createPool({
  host: DB_HOST,
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME
});

const checkTokenSocket = async (socket, next) => {
    const token = socket.handshake.auth.token;
    if (!token) {
        socket.emit('unauthorized', { message: 'You are not logged in or registered' });
        return socket.disconnect();
    }

    console.log('Received token:', token);

    try {
       
        const decoded = jwt.verify(token, JWT_SECRET);

        const [comments] = await pool.query(
            'SELECT * FROM comment WHERE user_id = ?',
            [decoded.userId]
        );

        if (comments.length > 0) {
            const userIdFromComment = comments[0].user_id;

            const [userInfo] = await pool.query(
                'SELECT user_id, email, user_name, user_avatar, role FROM user WHERE user_id = ?',
                [userIdFromComment]
            );
            console.log(userInfo);

            if (userInfo.length > 0) {
                const user = userInfo[0];

                const userComments = comments.map(comment => ({
                    song_id: comment.song_id,
                    content: comment.content,
                    report: comment.report,
                    report_content: comment.report_content,
                    date: comment.updated_at || new Date().toLocaleString(),
                    parent_comment_id: comment.parent_comment_id,
                    reply_to_comment_id: comment.reply_to_comment_id
                }));

                socket.data.user = {
                    _id: userIdFromComment,
                    email: user.email,
                    name: user.user_name,
                    avatar: user.user_avatar,
                    role: user.role,
                    comments: userComments
                };
            } else {
                socket.data.user = { 
                    _id: userIdFromComment, 
                    name: 'Unknown User', 
                    email: '', 
                    avatar: '', 
                    role: 'normal',
                    comments: [], 
                    date: new Date().toLocaleString()
                };
            }
        } else {
            socket.data.user = { 
                _id: decoded.userId, 
                name: 'Unknown User', 
                email: '', 
                avatar: '', 
                role: 'normal',
                comments: [],
                date: new Date().toLocaleString()
            };
        }

        next();
    } catch (err) {
        console.error("Token verification or DB query error:", err.message);
        socket.emit('unauthorized', { message: 'Token verification failed' });
        return socket.disconnect();
    }
};

module.exports = checkTokenSocket;
