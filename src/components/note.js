import React, { useContext, useState, useEffect } from 'react';
import ReactQuill from 'react-quill';
import { NoteContext } from '../contexts/note.context';
import { isEmpty } from '../utils/validations';
import classnames from 'classnames';

const Note = () => {
    const noteContext = useContext(NoteContext);
    const { note, updateNote } = noteContext;
    const [myNote, setMyNote] = useState({});
    const [canUpdate, setCanUpdate] = useState(false);

    const onChange = (val) => {
        setMyNote({ ...myNote, body: val });
        if(canUpdate){
            updateNote({ ...note, body: val });
        } else {
            setCanUpdate(true);
        }
        
    };

    useEffect(() => {
        setCanUpdate(false);
        setMyNote({ ...note });
    }, [note]);

    return (
        <div className={classnames({ 'hide': isEmpty(note) })}>
            <ReactQuill 
                style={{ height: '100%' }}
                value={ isEmpty(myNote) ? '' : myNote.body }
                onChange={onChange}
            ></ReactQuill>
        </div>
    );
};

export default Note;
