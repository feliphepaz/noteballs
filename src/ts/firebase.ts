import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyDwL24nEmMoMj5mQ9ivUa2P2Kacz4A573U',
  authDomain: 'noteballs-212e5.firebaseapp.com',
  projectId: 'noteballs-212e5',
  storageBucket: 'noteballs-212e5.firebasestorage.app',
  messagingSenderId: '876734438131',
  appId: '1:876734438131:web:51014f61d162c8c0cdf586',
}

const app = initializeApp(firebaseConfig)
const db = getFirestore(app)

export { db }
