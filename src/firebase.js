import * as firebase from 'firebase';

const config = {
  apiKey: 'AIzaSyDZ_OW50Pk7YUTL8vtjj5YRQPQk3BG20rI',
  authDomain: "shotonzeiss.firebaseapp.com",
  databaseURL: "https://shotonzeiss.firebaseio.com",
  projectId: "shotonzeiss",
  storageBucket: "shotonzeiss.appspot.com",
};

firebase.initializeApp(config)
const googleProvider = new firebase.auth.GoogleAuthProvider()

export { firebase, googleProvider }
