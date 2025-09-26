export default class AddSong_Transaction {
  constructor(app, song, index = null) {
    this.app = app;
    this.song = song;
    this.index = index;
    }

    doTransaction() {
    const songs = [...this.app.state.currentList.songs];
    const pos = this.index ?? songs.length;
    songs.splice(pos, 0, this.song);
    this.app.updateCurrentListSongs(songs);
    this.index = pos;
    }