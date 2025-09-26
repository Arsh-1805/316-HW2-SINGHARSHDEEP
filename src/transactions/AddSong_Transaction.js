export default class AddSong_Transaction {
  constructor(app, song, index = null) {
    this.app = app;
    this.song = {...song};
    this.index = index;
    }

    doTransaction() {
    const list = this.app.state.currentList;
    if (!list) return;
    
    const songs = [...list.songs];
    const pos = (this.index == null) ? songs.length
              : Math.max(0, Math.min(this.index, songs.length));

    songs.splice(pos, 0, { ...this.song });
    this.app.updateCurrentListSongs(songs);
    this.index = pos; 
  }

  undoTransaction() {
    const list = this.app.state.currentList;
    if (!list || this.index == null) return;

    const songs = [...list.songs];
    if (this.index >= 0 && this.index < songs.length) {
      songs.splice(this.index, 1);
      this.app.updateCurrentListSongs(songs);
    }
  }
}