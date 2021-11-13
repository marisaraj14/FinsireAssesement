import firebase from 'firebase';

var firebaseConfig = {
    apiKey: "AIzaSyB07P3Hj9Nxgi_PhQ2p9SKtytXYk4W_wOs",
    authDomain: "test-e2fdb.firebaseapp.com",
    projectId: "test-e2fdb",
    storageBucket: "test-e2fdb.appspot.com",
    messagingSenderId: "1027037122158",
    appId: "1:1027037122158:web:4df7e836496aae92c4e07f"};
	
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();

export default db;
