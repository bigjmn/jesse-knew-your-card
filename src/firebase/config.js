import firebase from 'firebase/app'
import 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyAfLof3A5w61IaKx0UVwA16RWgAm378qYk",
  authDomain: "jesseknew-12329.firebaseapp.com",
  projectId: "jesseknew-12329",
  storageBucket: "jesseknew-12329.appspot.com",
  messagingSenderId: "810136038561",
  appId: "1:810136038561:web:e4404f162c583e37df54e0",
  measurementId: "G-JPBCYR7LR2"
};

firebase.initializeApp(firebaseConfig)
const projectFirestore = firebase.firestore()

export {projectFirestore}
