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
    event.dataTransfer.setData("song", event.currentTarget.id);
    this.setState({ isDragging: true });
    };
    handleDragOver = (event) => { 
      event.preventDefault(); this.setState({ draggedTo: true }); 
    };
    handleDragEnter = (event) => { 
      event.preventDefault(); this.setState({ draggedTo: true }); 
    };
    handleDragLeave = (event) => { 
      event.preventDefault(); this.setState({ draggedTo: false }); 
    };
  

    handleDrop = (event) => {
            event.preventDefault();
            const targetId = event.currentTarget.id;        
            let sourceId = event.dataTransfer.getData("song");
            const toNum = (id) => id.substring(id.indexOf("-") + 1);

            const targetNum = toNum(e.currentTarget.id);
            const sourceNum = toNum(e.dataTransfer.getData("song"));
        
        this.setState({isDragging: false, draggedTo: false});

        this.props.moveCallback(sourceNum, targetNum);
    }

    getItemNum = () => {
        return this.props.id.substring("song-card-".length);
    }

    render() {    
    const { song, index, onDoubleClick, onDelete } = this.props;
    const numFromId = Number(this.getItemNum());       
    const displayNum = index != null ? index + 1 : numFromId;
    const itemClass = this.state.draggedTo ? "song-card-dragged-to" : "song-card";

    return (
      <div
        id={`song-${displayNum}`}
        className={itemClass}
        draggable="true"
        onDragStart={this.handleDragStart}
        onDragOver={this.handleDragOver}
        onDragEnter={this.handleDragEnter}
        onDragLeave={this.handleDragLeave}
        onDrop={this.handleDrop}
        onDoubleClick={onDoubleClick}                 
      >
        <div className="song-pill" onDoubleClick={onDoubleClick}>
          <span className="song-index" onDoubleClick={onDoubleClick}>
            {displayNum}.
          </span>

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
            className="song-dup-btn"
            onClick={(e) => { e.stopPropagation(); this.props.onDuplicate?.(this.props.index); }}
            title="Duplicate song"
            aria-label="Duplicate song"
            >
            <span className="material-symbols-outlined">content_copy</span>
          </button>

          <button
            className="song-delete-btn"
            onClick={(e) => { e.stopPropagation(); this.props.onDelete?.(this.props.index); }}
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