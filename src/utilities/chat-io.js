const chatSocketIo = (io) => {
  io.on('connection', (socket) => {
    console.log('Có một người dùng đã kết nối:', socket.id);

    // Xử lý khi người dùng tham gia vào room của một bài hát
    socket.on('joinRoom', ({ songId, user_name, user_avatar }) => {
      console.log('songId:', songId);
      console.log('user_name:', user_name);
      console.log('user_avatar:', user_avatar);

      socket.join(songId);  // Tham gia vào room tương ứng với songId
      console.log(`Người dùng ${user_name} (${socket.id}) đã tham gia room của bài hát: ${songId}`);

      // Gửi thông báo cho tất cả người dùng trong cùng room
      socket.to(songId).emit('message', {
        user_name,
        user_avatar,
        message: `Người dùng ${user_name} đã tham gia phòng`,
      });
    });

    // Xử lý khi nhận tin nhắn từ người dùng trong room
    // socket.on('chatMessage', ({ songId, message, user_name, user_avatar }) => {
    //   console.log(`Tin nhắn từ room ${songId} từ ${user_name}:`, message);

    //   // Gửi tin nhắn đến tất cả người dùng trong room
    //   io.to(songId).emit('message', {
    //     user_name,
    //     user_avatar,
    //     message,
    //     created_at: new Date()
    //   });
    // });

    // Xử lý ngắt kết nối
    socket.on('disconnect', () => {
      console.log('Người dùng đã ngắt kết nối:', socket.id);
    });
  });
};

module.exports = chatSocketIo;
