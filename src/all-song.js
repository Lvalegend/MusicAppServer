let allSong = []
module.exports = {
  getAllSongData: () => {
    return allSong
  },
  setAllSongData: (newSong) => {
    allSong = newSong
  },
  addInSongData: (newSong) => {
    allSong.push(newSong)
  }
}
