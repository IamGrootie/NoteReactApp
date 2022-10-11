import React from 'react'
import Split from "react-split"
import {nanoid} from "nanoid"
import Sidebar from "./Sidebar"
import Editor from "./Editor"
import { setDoc,
    doc, deleteDoc, updateDoc
} from "firebase/firestore";
import {onSnapshot, collection} from "firebase/firestore"
import { db } from "../../firebase-config";
import { useAuth } from '../auth'
import './Notes.css'

export default function Notes() {
    const [notes, setNotes] = React.useState( []
        // () => JSON.parse(localStorage.getItem("notes")) || []
        )

    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0] && notes[0].id) || ""
    )

    const { currentUser } = useAuth();
    
	const uid = currentUser && currentUser.uid;

    const notesRef = currentUser && collection(db, "users", uid, "notes");

    // Save the notes in the local storage 
    // React.useEffect(() => {
    //     localStorage.setItem("notes", JSON.stringify(notes))
    // }, [notes])

    React.useEffect(()=> {
        if (currentUser){
        onSnapshot(notesRef, (snapshot)=> {
            let notedata = [];
            snapshot.docs.map((doc)=> notedata.push(
                {...doc.data()}
            ))
            setNotes(notedata);
        })}
    }, [currentUser])

    // Function to create a note
    function createNewNote() {
        const dateBase = new Date();
        const completeDate = dateBase.toDateString();
        const id = nanoid();

        const newNote = {
            id: id,
            body: "# Type your markdown note's title here",
            dateCreated: completeDate
        }
        // setNotes(prevNotes => [newNote, ...prevNotes]);
        setDoc(doc(db, 'users', uid, "notes", id), newNote);
        setCurrentNoteId(newNote.id)
    }

    // Function to put the most recently-modified note at the top 
    function updateNote(text) {
        const noteRef = doc(db, 'users', uid, 'notes', currentNoteId);
        updateDoc(noteRef, {body: text});
        // setNotes(oldNotes => {
        //     const newArr = [];
        //     for (let i=0; i<oldNotes.length; i++) {
        //         const oldNote = oldNotes[i];
        //         if (oldNote.id === currentNoteId) {
        //         newArr.unshift({...oldNote, body: text})
        //         } else {
        //         newArr.push(oldNote);
        //         }
        //     }
        //     return newArr;
        // })
    }

    // Function to delete a note
    function deleteNote(event, noteId) {
        event.stopPropagation()
        const noteRef=doc(db,'users', uid, 'notes', noteId);
        deleteDoc(noteRef);
        // setNotes(oldNotes => oldNotes.filter(note => note.id !== noteId))
    }
    
    function findCurrentNote() {
        return notes.find(note => {
            return note.id === currentNoteId
        }) || notes[0]
    }

  return (
    <div className='notes-container'>
        {
            notes.length > 0 
            ?
            <Split 
                sizes={[30, 70]} 
                direction="horizontal" 
                className="split"
            >
                <Sidebar
                    notes={notes}
                    currentNote={findCurrentNote()}
                    setCurrentNoteId={setCurrentNoteId}
                    newNote={createNewNote}
                    deleteNote={deleteNote}
                />
                {
                    currentNoteId && 
                    notes.length > 0 &&
                    <Editor 
                        currentNote={findCurrentNote()} 
                        updateNote={updateNote} 
                    />
                }
            </Split>
            :
            <div className="no-notes">
                <h1>You have no notes</h1>
                <button 
                    className="first-note" 
                    onClick={createNewNote}
                >
                    Create one now
                </button>
            </div>
            
        }
    </div>
  )
}
