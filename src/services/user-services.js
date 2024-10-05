const sql = require("../configs/database-config");

class UserServices {
  static registerAccount(data) {
    const { user_name, user_avatar, email, password, role } = data;

    return new Promise((resolve, reject) => {
      sql.query("SELECT user_id FROM `user` WHERE `email` = ?", [email], (err, res) => {
        if (err) {
          console.log(err);
          return reject(err);
        }

        if (res.length > 0) {
          return resolve({ message: "Email already registered" });
        } else {
          sql.query(
            "INSERT INTO `user` (`user_name`, `user_avatar`, `email`, `password`, `role`) VALUES (?, ?, ?, ?, ?)",
            [user_name, user_avatar, email, password, role],
            (err, res) => {
              if (err) {
                console.log(err);
                return reject(err);
              }

              const user_id = res.insertId;
              return resolve({
                user_id: user_id,
                user_name: user_name,
                user_avatar: user_avatar,
                email: email,
                password: password,
                role: role
              });
            }
          );
        }
      });
    });
  }

  static loginAccount(data) {
    const { email, password } = data;

    return new Promise((resolve, reject) => {
      sql.query(
        "SELECT user_id FROM `user` WHERE `email` = ? AND `password` = ?",
        [email, password],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }

          if (res.length > 0) {
            return resolve({
              user_id: res[0].user_id
            });
          } else {
            return resolve({
              message: "Invalid email or password"
            });
          }
        }
      );
    });
  }
}

module.exports = UserServices;
