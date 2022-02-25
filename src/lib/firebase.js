import Firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth'

//import { seedDatabase } from '../seed';

const config = {
    apiKey: "AIzaSyC85Q94Hj7E9HNMH33pIML9cbWeuN8MlQk",
authDomain: "instagram-na.firebaseapp.com",
projectId: "instagram-na",
storageBucket: "instagram-na.appspot.com",
messagingSenderId: "967684309847",
appId: "1:967684309847:web:7cb4fdfd5dadb80d47b412"
};

const firebase = Firebase.initializeApp(config);
const { FieldValue } = Firebase.firestore;

//seedDatabase(firebase);

export { firebase , FieldValue }