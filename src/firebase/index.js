import firebase from 'firebase';

const firebaseConfig = {
    apiKey: "AIzaSyCWcuN5ewXa7m-QilIDV9JZIb6z4g8k59Y",
    authDomain: "evernoteclone-d3920.firebaseapp.com",
    databaseURL: "https://evernoteclone-d3920.firebaseio.com",
    projectId: "evernoteclone-d3920",
    storageBucket: "",
    messagingSenderId: "747717359271",
    appId: "1:747717359271:web:614bca00a2b87971"
};

  // Initialize Firebase
firebase.initializeApp(firebaseConfig);

const notesCollection = firebase.firestore().collection('notes');

export { notesCollection };



