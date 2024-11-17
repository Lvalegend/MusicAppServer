const sql = require("../configs/database-config");
class CommentServices {
  static saveComments(data, user_id, io) {
    const {
      song_id,
      parent_comment_id,
      reply_to_comment_id,
      message,
      updated_at,
      report = false,
      report_message,
      user_name,
      user_avatar
    } = data;
  
    const timestamp = Date.now();
    const comment_entity_id = `comment-${timestamp}`;
  
    return new Promise((resolve, reject) => {
      // Lưu bình luận vào CSDL
      sql.query(
        "INSERT INTO `comment` (`song_id`, `user_id`, `parent_comment_id`, `reply_to_comment_id`, `message`, `updated_at`, `report`, `report_message`, `comment_entity_id`) VALUES (?,?,?,?,?,?,?,?,?)",
        [song_id, user_id, parent_comment_id, reply_to_comment_id, message, updated_at, report, report_message, comment_entity_id],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
  
          // Truy vấn lấy lại comment vừa lưu từ CSDL
          sql.query(
            "SELECT * FROM `comment` WHERE `comment_entity_id` = ?",
            [comment_entity_id],
            (err, commentData) => {
              if (err) {
                console.log(err);
                return reject(err);
              }
  
              io.to(song_id).emit('chatMessage', {
                comment_id: commentData[0].comment_id,
                song_id,
                user_id,
                parent_comment_id,
                reply_to_comment_id,
                message,
                created_at: commentData[0].created_at,
                updated_at,
                report,
                report_message,
                comment_entity_id,
                user_name,
                user_avatar
              });
  
              // Trả về kết quả thành công
              resolve({
                song_id,
                user_id,
                parent_comment_id,
                reply_to_comment_id,
                message,
                updated_at,
                report,
                report_message
              });
            }
          );
        }
      );
    });
  }
  
  static async getCommentsData(page, limit, filterColumn, filterValue, isRandom = 0) {
    return new Promise((resolve, reject) => {
      try {
        page = (page ?? 0) > 0 ? page : null;
        limit = (limit ?? 0) > 0 ? limit : null;
        filterColumn = filterColumn ?? '';
        filterValue = filterValue ?? '';

        // Ánh xạ giữa cột và bảng
        const columnToTableMap = {
          comment_id: 'sa',
          song_id: 'sa',
          user_id: 'sa',
          parent_comment_id: 'sa',
          reply_to_comment_id: 'sa',
          message: 'sa',
          created_at: 'sa',
          updated_at: 'sa',
          report: 'sa',
          report_message: 'sa',
          comment_entity_id: 'sa',
          song_name: 's',
          song_entity_id: 's',
          user_name: 'u',
          user_avatar: 'u',
          role: 'u'
        };

        // Xử lý tiền tố cho cột lọc
        let prefixedColumn = columnToTableMap[filterColumn];
        if (prefixedColumn) {
          prefixedColumn = `${prefixedColumn}.${filterColumn}`;
        } else {
          prefixedColumn = filterColumn; // Nếu không có ánh xạ, giữ nguyên cột
        }

        let query = `
          SELECT 
            sa.comment_id,
            sa.song_id,
            sa.user_id,
            sa.parent_comment_id,
            sa.reply_to_comment_id,
            sa.message,
            sa.created_at,
            sa.updated_at,
            sa.report,
            sa.report_message,
            sa.comment_entity_id,
            s.song_name,
            s.song_entity_id,
            u.user_name,
            u.user_avatar,
            u.role
          FROM comment sa
          INNER JOIN song s ON sa.song_id = s.song_id
          INNER JOIN user u ON sa.user_id = u.user_id
        `;

        let totalItems = 0;
        const values = [];
        const conditions = [];

        // Kiểm tra nếu có filter theo cột và giá trị
        if (filterColumn && filterValue) {
          conditions.push(`${prefixedColumn} LIKE ?`);
          values.push(`%${filterValue}%`);
        }

        if (conditions.length > 0) {
          query += " WHERE " + conditions.join(" AND ");
        }

        if (page && limit) {
          const offset = (page - 1) * limit;

          // Query để đếm tổng số items
          const countQuery = `
            SELECT COUNT(*) AS totalItems
            FROM comment sa
            INNER JOIN song s ON sa.song_id = s.song_id
            INNER JOIN user u ON sa.user_id = u.user_id
            ${conditions.length > 0 ? 'WHERE ' + conditions.join(" AND ") : ''}
          `;
          sql.query(countQuery, values, (err, countResult) => {
            if (err) {
              console.error('Error counting total items:', err);
              reject(err);
            } else {
              totalItems = countResult[0].totalItems;

              // Áp dụng sắp xếp ngẫu nhiên nếu được yêu cầu
              if (isRandom === 1) {
                query += ` ORDER BY RAND()`;
              } else {
                query += ` ORDER BY sa.created_at DESC`;
              }

              // Thêm phân trang vào truy vấn
              query += ` LIMIT ? OFFSET ?`;
              values.push(limit, offset);

              sql.query(query, values, (err, result) => {
                if (err) {
                  console.error('Error fetching data:', err);
                  reject(err);
                } else {
                  const totalPages = Math.ceil(totalItems / limit);
                  resolve({
                    data: result,
                    currentPage: page,
                    totalItems: totalItems,
                    totalPages: totalPages
                  });
                }
              });
            }
          });
        } else {
          // Nếu không có phân trang, truy vấn tất cả dữ liệu
          query += ` ORDER BY sa.created_at DESC`; 
          sql.query(query, values, (err, result) => {
            if (err) {
              console.error('Error fetching data:', err);
              reject(err);
            } else {
              resolve({
                data: result,
                totalItems: result.length
              });
            }
          });
        }
      } catch (error) {
        console.error('Error fetching data:', error);
        reject(new Error('Error fetching data: ' + error.message));
      }
    });
  }



}
module.exports = CommentServices;