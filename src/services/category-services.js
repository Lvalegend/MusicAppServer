const sql = require("../configs/database-config");

class CategoryServices {
  static addCategory(category_name) {
    return new Promise((resolve, reject) => {
      sql.query(
        "INSERT INTO `category` (`category_name`) VALUES (?)",
        [category_name],
        (err, res) => {
          if (err) {
            console.log(err);
            return reject(err);
          }
          resolve({
            category_name: category_name
          });
        }
      );
    });
  }
}

module.exports = CategoryServices;
