const { DB_PASSWORD, DB_NAME, DB_HOST, DB_USER } = require("./src/configs/config-env");

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {

  development: {
    client: 'mysql2',  // Client cơ sở dữ liệu sử dụng MySQL
    connection: {
      host: `${DB_HOST}`,  // Địa chỉ máy chủ cơ sở dữ liệu
      user: `${DB_USER}`,  // Tên người dùng cơ sở dữ liệu
      password:`${DB_PASSWORD}`,  // Mật khẩu cơ sở dữ liệu
      database: `${DB_NAME}`  // Tên cơ sở dữ liệu
    },
    migrations: {
      directory: 'src/migrations'  // Thư mục chứa các tập tin migration
    },
    seeds: {
      directory: './seeds'  // Thư mục chứa các tập tin seed
    }
  },

  staging: {
    client: 'mysql2',  // Client cơ sở dữ liệu sử dụng MySQL
    connection: {
      host: 'staging_host',  // Địa chỉ máy chủ cơ sở dữ liệu staging
      user: 'staging_username',  // Tên người dùng cơ sở dữ liệu staging
      password: 'staging_password',  // Mật khẩu cơ sở dữ liệu staging
      database: 'staging_database'  // Tên cơ sở dữ liệu staging
    },
    pool: {
      min: 2,  // Số kết nối tối thiểu trong pool
      max: 10  // Số kết nối tối đa trong pool
    },
    migrations: {
      tableName: 'knex_migrations',  // Tên bảng lưu thông tin migration
      directory: './migrations'  // Thư mục chứa các tập tin migration
    },
    seeds: {
      directory: './seeds'  // Thư mục chứa các tập tin seed
    }
  },

  production: {
    client: 'mysql2',  // Client cơ sở dữ liệu sử dụng MySQL
    connection: {
      host: 'production_host',  // Địa chỉ máy chủ cơ sở dữ liệu production
      user: 'production_username',  // Tên người dùng cơ sở dữ liệu production
      password: 'production_password',  // Mật khẩu cơ sở dữ liệu production
      database: 'production_database'  // Tên cơ sở dữ liệu production
    },
    pool: {
      min: 2,  // Số kết nối tối thiểu trong pool
      max: 10  // Số kết nối tối đa trong pool
    },
    migrations: {
      tableName: 'knex_migrations',  // Tên bảng lưu thông tin migration
      directory: './migrations'  // Thư mục chứa các tập tin migration
    },
    seeds: {
      directory: './seeds'  // Thư mục chứa các tập tin seed
    }
  }

};
