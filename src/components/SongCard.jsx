import React from "react";

export default class SongCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            isDragging: false,
            draggedTo: false
        }
    }
    handleDragStart = (event) => {
        event.dataTransfer.setData("song", event.target.id);
        this.setState(prevState => ({
            isDragging: true,
            draggedTo: prevState.draggedTo
        }));
    }
    handleDragOver = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragEnter = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: true
        }));
    }
    handleDragLeave = (event) => {
        event.preventDefault();
        this.setState(prevState => ({
            isDragging: prevState.isDragging,
            draggedTo: false
        }));
    }
    handleDrop = (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.id;        
            let sourceId = event.dataTransfer.getData("song");
            const toNum = (id) => id.substring(id.indexOf("-") + 1);

            const targetNum = toNum(targetId);
            const sourceNum = toNum(sourceId);
        
        this.setState({isDragging: false, draggedTo: false});

        // ASK THE MODEL TO MOVE THE DATA
        this.props.moveCallback(sourceNum, targetNum);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {
    const { song } = this.props;
    const num = this.getItemNum(); 
    const itemClass = this.state.draggedTo ? "song-card-dragged-to" : "song-card";

return (
  <div
    id={"song-" + num}
    className={itemClass}
    draggable="true"
    onDragStart={this.handleDragStart}
    onDragOver={this.handleDragOver}
    onDragEnter={this.handleDragEnter}
    onDragLeave={this.handleDragLeave}
    onDrop={this.handleDrop}
    onDoubleClick={() => this.props.startEditSong?.(Number(num))}
  >
    <div className="song-pill">
        <span className="song-index">{Number(num) }.</span>

        <div className="song-text">
        <span className="song-title">
          {song.youTubeId ? (
            <a

              href={`https://www.youtube.com/watch?v=${song.youTubeId}`}
              target="_blank"
              rel="noreferrer"
            >
              {song.title}
            </a>
          ) : (
            song.title
          )}
        </span>
        {song.year ? <span className="song-year"> ({song.year})</span> : null}
        <span className="by-word"> by </span>
        <span className="song-artist">{song.artist}</span>
      </div>

      <button
        className="song-delete-btn"
        onClick={(e) => {
          e.stopPropagation();
          this.props.deleteSongCallback(Number(num)); 
        }}
        title="Remove song"
        aria-label="Remove song"
      >
        <span className="material-symbols-outlined">delete</span>
            </button>
      </div>
      </div>
);
}
}