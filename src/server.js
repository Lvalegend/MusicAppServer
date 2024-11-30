const http = require('http');
const app = require('./app');
const cors = require('cors');
const chatSocketIo = require('./utilities/chat-io')
const { HOST_SERVER_NAME, PORT } = require('./configs/config-env');
const injectSocketIo = require('./middlewares/inject-socket-io');
const commentRouter = require('./routes/comment-router');

const server = http.createServer(app);


app.use(cors({
  origin: ['*'],
  credentials: true,
}));

const io = require('socket.io')(server, {
  path: '/socket-io',
  cors: {
    origin: `http://${HOST_SERVER_NAME}:${PORT}`
  }
});

app.use(function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header("Access-Control-Allow-Methods", "GET,PATCH,PUT,POST,DELETE");
  res.header("Access-Control-Expose-Headers", "Content-Length");
  res.header(
    "Access-Control-Allow-Headers",
    "Accept, Authorization,x-auth-token, Content-Type, X-Requested-With, Range"
  );
  if (req.method === "OPTIONS") {
    return res.sendStatus(200);
  } else {
    return next();
  }
});

app.use(injectSocketIo(io));
app.use('/lvalegend', commentRouter)
chatSocketIo(io)

server.listen(PORT, () => {
  console.log(`Server is running on http://${HOST_SERVER_NAME}:${PORT}`);
});

module.exports = io