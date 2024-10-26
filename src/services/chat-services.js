const io = require("../server");

io.on('connection', (socket) => {
  console.log('Có một người dùng đã kết nối:', socket.id);

  // Xử lý khi người dùng tham gia vào room của một bài hát
  socket.on('joinRoom', (songId) => {
    socket.join(songId);  // Tham gia vào room tương ứng với songId
    console.log(`Người dùng ${socket.id} đã tham gia room của bài hát: ${songId}`);
    
    // Gửi thông báo cho tất cả người dùng trong cùng room
    socket.to(songId).emit('message', `Người dùng ${socket.id} đã tham gia phòng`);
  });

  // Xử lý khi nhận tin nhắn từ người dùng trong room
  socket.on('chatMessage', (songId, message) => {
    console.log(`Tin nhắn từ room ${songId}:`, message);
    
    // Gửi tin nhắn đến tất cả người dùng trong room
    io.to(songId).emit('message', message);
  });

  // Xử lý ngắt kết nối
  socket.on('disconnect', () => {
    console.log('Người dùng đã ngắt kết nối:', socket.id);
  });
});