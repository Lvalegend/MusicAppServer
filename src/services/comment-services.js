const sql = require("../configs/database-config");
class CommentServices {
    static saveComments(data, user_id){
       const {song_id, parent_comment_id, reply_to_comment_id, content, updated_at, report = false, report_content} = data
       return new Promise((resolve, reject) => {
          sql.query(
            "INSERT INTO `comment` (`song_id`, `user_id`, `parent_comment_id`, `reply_to_comment_id`, `content`, `updated_at`, `report`, `report_content`) VALUES (?,?,?,?,?,?,?,?)",
            [song_id, user_id, parent_comment_id, reply_to_comment_id, content, updated_at, report, report_content],
            (err, res) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
              resolve({
                song_id: song_id, 
                user_id: user_id, 
                parent_comment_id: parent_comment_id,  
                reply_to_comment_id: reply_to_comment_id, 
                content: content, 
                updated_at: updated_at,  
                report: report,   
                report_content: report_content
              });
            }
          )
       })
    }
} 
module.exports = CommentServices;