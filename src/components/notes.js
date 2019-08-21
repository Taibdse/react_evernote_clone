import React, { useContext, useState } from 'react';
import { List, ListItemText, ListItem, IconButton, TextField, Fab } from '@material-ui/core';
// import { DeleteIcon } from '@material-ui/icons';
import DeleteIcon from '@material-ui/icons/Delete';
import EditIcon from '@material-ui/icons/Edit';
import { makeStyles } from '@material-ui/core/styles';
import { NoteContext } from '../contexts/note.context';
import { removeHTMLTags, truncate } from '../utils/functions';
import { isEmpty } from '../utils/validations';
import classnames from 'classnames';
import swal from 'sweetalert';
import toastr from 'toastr';

const useStyles = makeStyles(theme => ({

}))

let timeout = null;

const Notes = () => {
    const noteContext = useContext(NoteContext);
    const { notes, note, addNote, deleteNote, clearTimeoutBeforeUpdate, setNote, updateNote } = noteContext;
    const [filters, setFilters] = useState({ title: '' });
    
    const classes = useStyles();

    const onChange = e => updateNote({ ...note, title: e.target.value });

    const onEdit = (_note) => {
        clearTimeoutBeforeUpdate();
        setNote({ ..._note });
    }

    const onDelete = async (note) => {
        const sure = await swal({ 
            title: 'Are you sure?',
            text: `Once deleted ${note.title} can not be recovered`,
            icon: "warning",
            buttons: true,
            dangerMode: true,
         });
         if(sure){
            await deleteNote(note.id);
            toastr.success(`${note.title} has deleted!!`, 'Success')
         }
    }

    const onChangeFilters = (e) => {
        setFilters({ ...filters, [e.target.name]: e.target.value });
    }

    const filterNotes = (notes) => {
        // clearTimeout(timeout);
        // timeout = setTimeout(() => {
           
        // }, 300);
        if(isEmpty(notes)) return [];
        let title = filters.title.toLowerCase();
        if(isEmpty(title)) return notes;
        return notes.filter(n => n.title.toLowerCase().indexOf(title) > -1)
    }

    const filteredNotes = filterNotes(notes);

    return (
        <div>
            <div style={{ padding: '10px' }}>
                <TextField
                    label="Search note..."
                    value={filters.title}
                    onChange={onChangeFilters}
                    name="title"
                    style={{ marginBottom: '10px', width: '100%' }}
                />
                 <Fab
                    variant="extended"
                    size="medium"
                    color="primary"
                    aria-label="add"
                    style={{ width: '100%' }}
                    onClick={addNote}
                    >
                    Add more note
                </Fab>
            </div>
            <List 
                    component="nav"
                    aria-labelledby="nested-list-subheader"
                >
                   
                    { filteredNotes.map(_note => {
                        const selected = (!isEmpty(note) && note.id === _note.id);
                        let primary = _note.title;
                        
                        if(selected){
                            primary = (
                                <TextField
                                    label="Title..."
                                    value={note.title}
                                    onChange={onChange}
                                    style={{ marginBottom: '10px' }}
                                />
                            )
                        }
                        return (
                            <ListItem  key={_note.id} 
                                className={classnames({ 'note-focus': selected })}
                                >
                                <ListItemText 
                                    primary={ primary } 
                                    secondary={ truncate(removeHTMLTags(_note.body), 10) } />
                                <IconButton edge="end" aria-label="edit" onClick={() => onEdit(_note)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton edge="end" aria-label="delete" onClick={() => onDelete(_note)}>
                                    <DeleteIcon />
                                </IconButton>
                            </ListItem>
                        )
                    }) }
            </List>
        </div>
    );
};

export default Notes;
