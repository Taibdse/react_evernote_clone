import React, { useState, useEffect } from 'react';
import { notesCollection } from '../firebase';
import { isEmpty } from '../utils/validations';

export const NoteContext = React.createContext();
let timeout = null;

export const NoteProvider = ({ children }) => {
    
    const [notes, setNotes] = useState([]);
    const [note, setNote] = useState(null);
    const [timeDelay, setTimeDelay] = useState(300);

    useEffect(() => {
        notesCollection.orderBy('createdAt', 'desc').onSnapshot(handleSnapshot)
    }, []);

    const handleSnapshot = (snapshot) => {
        const docs = snapshot.docs.map(doc => {
            return { id: doc.id, ...doc.data() };
        })
        // console.log(note);
        if(isEmpty(note) && docs.length > 0) {
            // setNote(docs[0]);
            // console.log(note);
            console.log('note');
        }
        setNotes(docs);
    }

    const updateNote = (note) => {
        // setNote({ ...note });
        clearTimeout(timeout);
        timeout = setTimeout(() => {
            if(!isEmpty(note)){
                const doc = notesCollection.doc(`/${note.id}`);
                if(!isEmpty(doc)) doc.set({ body: note.body, title: note.title }, { merge: true })
            } 
        }, timeDelay);
    }

    const clearTimeoutBeforeUpdate = () => clearTimeout(timeout);

    const addNote = async () => {
        notesCollection.add({ title: 'Title', body: '<h3>Content</h3>', createdAt: Date.now() });
    }

    const deleteNote = (noteId) => {
        setNote(null);
        return notesCollection.doc(`/${noteId}`).delete();
    }

    const states = { notes, note };
    const methods = { setNotes, setNote, updateNote, addNote, deleteNote, clearTimeoutBeforeUpdate };
    
    return (
        <NoteContext.Provider value={{
            ...states,
            ...methods
        }}>
            { children }
        </NoteContext.Provider>
    )
}
