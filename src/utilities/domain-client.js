const { HOST_SERVER_NAME, PORT } = require("../configs/config-env")

const domainClient = `http://${HOST_SERVER_NAME}:${PORT}/`
module.exports = domainClient