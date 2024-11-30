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
  static async deleteCategory(category_id) {
    try {
        await sql.promise().query("DELETE FROM `song_category` WHERE `category_id` = ?", [category_id]);
        await sql.promise().query("DELETE FROM `category` WHERE `category_id` = ?", [category_id]);
        return {
            message: "Category deleted successfully",
            album_id: category_id
        };
    } catch (err) {
        console.log(err);
        throw new Error("Error deleting album");
    }
}
}

module.exports = CategoryServices;
