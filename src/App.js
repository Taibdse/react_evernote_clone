import React, { useState, useEffect } from 'react';
import 'react-quill/dist/quill.snow.css';
import './App.css';

// import {  } from './firebase';
import { Container, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import GlobalContext from './contexts';
import Notes from './components/notes';
import Note from './components/note';

const useStyles = makeStyles(theme => ({
  root: {
    flexGrow: 1,
    marginBottom: '30px'
  },
  item: {
    border: '1px solid #ccc',
    minHeight: '100vh',
    maxHeight: '100vh',
    overflowY: 'auto'
  }
}));

function App() {
  const classes = useStyles();

  useEffect(() => {
    
  }, []);

  return (
    <GlobalContext>
      <div style={{ padding: '10px 20px' }}>
        <h2 className="heading">Evernote Application</h2>
        <Grid container className={classes.root} style={{ minWidth: '800px' }}>
          <Grid item xs={3} className={classes.item}>
            <Notes/>
          </Grid>
          <Grid
            style={{ minHeight: '100vh' }}
            item xs={9} className={classes.item}>
            <Note/>
          </Grid>
        </Grid>
      </div>
    </GlobalContext>
    
  );
}

export default App;
