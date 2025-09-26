export default class DeleteSong_Transaction {
  constructor(app, index) {
    this.app = app;
    this.index = index;
    this.deletedSong = null;
  }

doTransaction() {
    const songs = [...this.app.state.currentList.songs];
    // capture the song so we can undo
    this.deletedSong = songs[this.index];
    songs.splice(this.index, 1);
    this.app.updateCurrentListSongs(songs);
}

undoTransaction() {
    const songs = [...this.app.state.currentList.songs];
    songs.splice(this.index, 0, this.deletedSong);
    this.app.updateCurrentListSongs(songs);
  }
}
