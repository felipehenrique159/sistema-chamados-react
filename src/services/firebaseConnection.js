import firebase from 'firebase'
import 'firebase/firestore'
import 'firebase/auth'
import 'firebase/database'
import 'firebase/storage'

let firebaseConfig = {
    apiKey: "AIzaSyBkFuG_fMH8qR1NSLD5VEITfyufDrLbAoA",
    authDomain: "sistema-chamados-2cd22.firebaseapp.com",
    projectId: "sistema-chamados-2cd22",
    storageBucket: "sistema-chamados-2cd22.appspot.com",
    messagingSenderId: "573808048715",
    appId: "1:573808048715:web:859f525c75c823553dabce",
    measurementId: "G-JKGYE9YXX4"
  };
  
  if(!firebase.apps.length){
      firebase.initializeApp(firebaseConfig);
  }

export default firebase
