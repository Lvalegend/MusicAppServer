const http = require('http');
const app = require('./app');
const cors = require('cors');
const chatSocketIo = require('./utilities/chat-io')
const checkTokenSocket = require('./middlewares/check-token-socket')
const { HOST_SERVER_NAME, PORT } = require('./configs/config-env');

const server = http.createServer(app);


app.use(cors({
  origin: `http://${HOST_SERVER_NAME}:${PORT}`
}));

const io = require('socket.io')(server, {
  path: '/socket-io',
  cors: {
    origin: `http://${HOST_SERVER_NAME}:${PORT}`
  }
});

io.use(checkTokenSocket)
chatSocketIo(io)

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST_SERVER_NAME}:${PORT}`);
});

module.exports = io