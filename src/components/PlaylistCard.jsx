import React from "react";

export default class PlaylistCard extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            text: this.props.keyNamePair.name,
            editActive: false,
        }
    }
    handleClick = (event) => {
        if (event.detail === 1) {
            this.handleLoadList(event);
        }
        else if (event.detail === 2) {
            this.handleToggleEdit(event);
        }
    }
    handleLoadList = (event) => {
        let listKey = event.target.id;
        if (listKey.startsWith("playlist-card-text-")) {
            listKey = listKey.substring("playlist-card-text-".length);
        }
        this.props.loadListCallback(listKey);
    }
    handleDeleteList = (event) => {
        event.stopPropagation();
        this.props.deleteListCallback(this.props.keyNamePair);
    }
    handleToggleEdit = (event) => {
        this.setState({
            editActive: !this.state.editActive
        });
    }
    handleUpdate = (event) => {
        this.setState({ text: event.target.value });
    }
    handleKeyPress = (event) => {
        if (event.code === "Enter") {
            this.handleBlur();
        }
    }
    handleBlur = () => {
        let key = this.props.keyNamePair.key;
        let textValue = this.state.text;
        console.log("PlaylistCard handleBlur: " + textValue);
        this.props.renameListCallback(key, textValue);
        this.handleToggleEdit();
    }

    render() {
        const { keyNamePair, loadListCallback, deleteListCallback, renameListCallback, duplicateListCallback, selected} = this.props;

        if (this.state.editActive) {
            return (
                <input
                    id={"playlist-" + keyNamePair.name}
                    className='playlist-card'
                    type='text'
                    onKeyPress={this.handleKeyPress}
                    onBlur={this.handleBlur}
                    onChange={this.handleUpdate}
                    defaultValue={keyNamePair.name}
                />)
            ;
    }
        else {
      let selectClass = selected ? "selected-playlist-card" : "unselected-playlist-card";
      return (
        <div
          id={keyNamePair.key}
          key={keyNamePair.key}
          onClick={this.handleClick}
          className={"playlist-card " + selectClass}
        >
          <span
            id={"playlist-card-text-" + keyNamePair.key}
            className="playlist-card-text"
          >
            {keyNamePair.name}
          </span>

          {/* Duplicate button */}
          <button
            className="card-button"
            title="Duplicate playlist"
            onClick={(e) => {
              e.stopPropagation();
              // ⬇️ USE the prop (works whether destructured or via this.props)
              duplicateListCallback?.(keyNamePair.key);
            }}
          >
            <span className="material-symbols-outlined">content_copy</span>
          </button>

          {/* Delete button */}
          <button
            id={"delete-list-" + keyNamePair.key}
            className="card-button"
            onClick={this.handleDeleteList}
            title="Delete this playlist"
            aria-label="Delete this playlist"
            onMouseDown={(e) => e.stopPropagation()}
          >
            <span className="material-symbols-outlined">delete</span>
          </button>
        </div>
      );
    }
}
}
