import { initializeApp } from 'firebase/app';
import { getAuth, 
    signInWithRedirect, 
    signInWithPopup, 
    GoogleAuthProvider, 
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signOut,
    onAuthStateChanged
} from 'firebase/auth';

import { 
    getFirestore,
    doc,
    getDoc,
    setDoc
 } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBuWjK_n28MaehLi0khgBGVa_CMQlAIWvc",
    authDomain: "crwn-clothing-db-5097f.firebaseapp.com",
    projectId: "crwn-clothing-db-5097f",
    storageBucket: "crwn-clothing-db-5097f.appspot.com",
    messagingSenderId: "290580509036",
    appId: "1:290580509036:web:6c466a882fa4c54b498349"
  };



  // Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

const googleProvider = new GoogleAuthProvider();

googleProvider.setCustomParameters({
    prompt: "select_account"
});


export const auth = getAuth();
export const signInWithGooglePopup = () => signInWithPopup(auth, googleProvider);
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, googleProvider); 

export const db = getFirestore();

export const createUserDocumentFromAuth = async (userAuth, additionalInformation = {}
) => {
    if(!userAuth) return;

  const userDocRef = doc(db, 'users', userAuth.uid);
  
  console.log(userDocRef);

  const userSnapshot = await getDoc(userDocRef);
  console.log(userSnapshot);
  console.log(userSnapshot.exists());

if(!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
        await setDoc(userDocRef, {
         displayName,
         email,
         createdAt,
         ...additionalInformation
        });
    }
        catch (error) {
            console.log('error creating the user', error.messasge);
        }
   
}

return userDocRef;
};


export const createAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

   return await createUserWithEmailAndPassword(auth, email, password);
};


export const signInAuthUserWithEmailAndPassword = async (email, password) =>{
    if(!email || !password) return;

   return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => await signOut(auth);

export const onAuthStateChangedListener = (callback) => 
onAuthStateChanged(auth, callback);

   