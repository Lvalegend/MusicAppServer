const http = require('http');
const app = require('./app');
const { HOST_SERVER_NAME, PORT } = require('./configs/config-env');

const server = http.createServer(app);

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST_SERVER_NAME}:${PORT}`);
});
