const express = require('express')
const app = express()
const path = require('path');
const cors = require('cors');
const bodyParser = require('body-parser');
const userRouter = require('./routes/user-router');
const songRouter = require('./routes/song-router');
const singerRouter = require('./routes/singer-router');
const categoryRouter = require('./routes/category-router');
const albumRouter = require('./routes/album-router');
const playlistRouter = require('./routes/playlist-router');
const songPlaylistRouter = require('./routes/song-playlist-router');
const userAlbumRouter = require('./routes/user-album-router');
const singerSongRouter = require('./routes/singer-song-router');
const songCategoryRouter = require('./routes/song-category-router');
const userSingerRouter = require('./routes/user-singer-router');
const userSongRouter = require('./routes/user-song-router');
const songAlbumRouter = require('./routes/song-album-router');
const singerAlbumRouter = require('./routes/singer-album-router');

app.set('view engine', 'ejs');

let jsonParser = bodyParser.json()
let urlencodedParser = bodyParser.urlencoded({ extended: false })
app.use(urlencodedParser)
app.use(jsonParser)
app.use(cors());

app.use('/lvalegend', categoryRouter)
app.use('/lvalegend', albumRouter)
app.use('/lvalegend', playlistRouter)
app.use('/lvalegend', songRouter)  
app.use('/lvalegend', songCategoryRouter)
app.use('/lvalegend', songPlaylistRouter)
app.use('/lvalegend', songAlbumRouter)
app.use('/lvalegend', singerRouter)
app.use('/lvalegend', singerSongRouter)
app.use('/lvalegend', singerAlbumRouter)
app.use('/lvalegend', userRouter)
app.use('/lvalegend', userAlbumRouter)
app.use('/lvalegend', userSingerRouter)
app.use('/lvalegend', userSongRouter)



module.exports = app