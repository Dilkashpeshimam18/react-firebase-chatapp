import firebase from "firebase"
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDepGnXtU5WJ7FId9Iueb2C7S2c8Oc3WHE",
    authDomain: "realtime-chatapp-firebase.firebaseapp.com",
    projectId: "realtime-chatapp-firebase",
    storageBucket: "realtime-chatapp-firebase.appspot.com",
    messagingSenderId: "29098193017",
    appId: "1:29098193017:web:a08daa8b051c3ac63464a8",
    measurementId: "G-RH5MXV44J1"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);
  const db = firebaseApp.firestore();
  const auth = firebase.auth();
  const provider = new firebase.auth.GoogleAuthProvider();

  export {auth,provider};
  export default db;