import React from "react";
import SongCard from "./SongCard.jsx";

export default class SongCards extends React.Component {
  render() {
    const {
      currentList,
      moveSongCallback,
      requestEditSong,
      deleteSong,
      duplicateSong
    } = this.props;

    if (!currentList) return <div id="song-cards" />;

    return (
      <div id="song-cards">
        {currentList.songs.map((song, index) => (
          <SongCard
            id={`song-card-${index + 1}`}
            key={`song-card-${index + 1}`}
            index={index}
            song={song}
            moveCallback={moveSongCallback}
            onDoubleClick={() => requestEditSong(index)}
            onDelete={() => deleteSong(index)}
            onDuplicate={() => duplicateSong(index)}
          />
        ))}
      </div>
    );
  }
}