// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: 'AIzaSyDwUEKJDau1MnlsLchceN5wnirfEbarHps',
    authDomain: 'mhiebl-budget.firebaseapp.com',
    databaseURL: 'https://mhiebl-budget-default-rtdb.firebaseio.com',
    projectId: 'mhiebl-budget',
    storageBucket: 'mhiebl-budget.appspot.com',
    messagingSenderId: '516450976341',
    appId: '1:516450976341:web:3e5d83e664087a5a628adc',
}

// Initialize Firebase
export const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const database = getFirestore(app)
