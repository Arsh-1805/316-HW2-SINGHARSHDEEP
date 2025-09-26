import React from "react";

export default class EditToolbar extends React.Component {
    render() {
        const { canAddSong, canUndo, canRedo, canClose, 
                undoCallback, redoCallback, closeCallback, addSongCallback} = this.props;
        let addSongClass = "toolbar-button";
        let undoClass = "toolbar-button";
        let redoClass = "toolbar-button";
        let closeClass = "toolbar-button";
        if (!canAddSong) addSongClass += " disabled";
        if (!canUndo) undoClass += " disabled";
        if (!canRedo) redoClass += " disabled";
        if (!canClose) closeClass += " disabled";
        return (
            <div id="edit-toolbar">
            <input
                type="button" 
                id='add-song-button' 
                value="+" 
                className={addSongClass}
                onClick={canAddSong ? (() => { console.log('add click'); addSongCallback(); }) : undefined}
                disabled={!canAddSong}
                title="Add Song"
            />
            <input
                type="button" 
                id='undo-button' 
                value="⟲" 
                className={undoClass} 
                onClick={undoCallback}
                disabled={!canUndo}
                title="Undo"
            />
            <input  
                type="button" 
                id='redo-button' 
                value="⟳" 
                className={redoClass} 
                onClick={redoCallback}
                disabled={!canRedo}
                title="Redo"
            />
            <input  
                type="button" 
                id='close-button' 
                value="x" 
                className={closeClass} 
                onClick={closeCallback}
                disabled={!canClose}
                title="Close List"
            />
        </div>
        )
    }
}