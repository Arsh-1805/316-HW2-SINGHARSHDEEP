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
            <button 
                type="button" 
                id='add-song-button' 
                value="+" 
                className={addSongClass}
            />
            <button 
                type="button" 
                id='undo-button' 
                value="⟲" 
                className={undoClass} 
                onClick={undoCallback}
            />
            <button  
                type="button" 
                id='redo-button' 
                value="⟳" 
                className={redoClass} 
                onClick={redoCallback}
            />
            <button  
                type="button" 
                id='close-button' 
                value="&#x2715;" 
                className={closeClass} 
                onClick={closeCallback}
            />
            <button
                id="add-song-button"
                className={canAddSong ? "toolbar-btn" : "toolbar-btn disabled"}
                disabled={!canAddSong}
                onClick={canAddSong ? addSongCallback : undefined}
                title="Add Song"
            >
                +
            </button>
        </div>
        )
    }
}