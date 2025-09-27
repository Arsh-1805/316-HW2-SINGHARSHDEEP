// src/transactions/DeleteSong_Transaction.js
export default class DeleteSong_Transaction {
  constructor(app, index) {
    this.app = app;
    this.index = index;
    this.removedSong = null; // capture the deleted song during do
  }

  doTransaction() {
    const songs = [...this.app.state.currentList.songs];
    this.removedSong = songs[this.index];
    songs.splice(this.index, 1);
    this.app.updateCurrentListSongs(songs);
  }

  undoTransaction() {
    const songs = [...this.app.state.currentList.songs];
    songs.splice(this.index, 0, this.removedSong);
    this.app.updateCurrentListSongs(songs);
  }
}
