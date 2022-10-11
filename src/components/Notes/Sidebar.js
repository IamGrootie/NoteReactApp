import React from "react"

export default function Sidebar(props) {
    const noteElements = props.notes.map((note, index) => {
        
        const noteBodyArray = note.body.split("\n");
        const noteTitle = noteBodyArray.shift();
        const noteBody = noteBodyArray[1];

        return(
        <div className='notes-sidebar' key={note.id}>
            <div
                className={`title ${
                    note.id === props.currentNote.id ? "selected-note" : ""
                }`}
                onClick={() => props.setCurrentNoteId(note.id)}
            >
                <h3 className="note-title">{noteTitle}</h3>
                <p className="text-snippet">{noteBody > 50 ? noteBody.length.slice(0,50) + '...' : noteBody}</p>
                <p className="note-date">{note.dateCreated}</p>
                <button 
                    className="delete-btn"
                    onClick={(event) => props.deleteNote(event, note.id)}
                >
                    <i className="gg-trash trash-icon"></i>
                </button>
            </div>
        </div>)
    })

    return (
        <section className="pane sidebar-container">
            <div className="sidebar--header">
                <button className="new-note" onClick={props.newNote}>Create Note</button>
            </div>
            <div className="sidebar--content">
                <h2>Notes</h2>
            </div>
            {noteElements}
        </section>
    )
}
