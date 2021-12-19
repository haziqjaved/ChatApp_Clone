// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword,signOut} from "firebase/auth";
import { getFirestore,setDoc, doc, updateDoc, addDoc, collection, query, getDoc, getDocs, onSnapshot} from "firebase/firestore";
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBfAfbQA_9XoM1cpsaBwlhx6pKU5xAz8Ec",
  authDomain: "uberappclone-10100.firebaseapp.com",
  projectId: "uberappclone-10100",
  storageBucket: "uberappclone-10100.appspot.com",
  messagingSenderId: "437102258830",
  appId: "1:437102258830:web:03f6bc025e9bd6f53377df",
  measurementId: "G-CH2C27C2X1"
};

// Initialize Firebase
initializeApp(firebaseConfig);

const auth = getAuth()
const db = getFirestore();

async function registerUser(authData,password) {
  const { userName,email} = authData
  const { user: { uid } } = await createUserWithEmailAndPassword(auth, email, password)

  await setDoc(doc(db, 'user',uid), {
    userName, email,password
  })
}
async function loginWithUser({email,password}){
  await signInWithEmailAndPassword(auth,email,password)
}

//logout function
async function logout() {
  try {
    await signOut(auth)
    alert("successfully logged out")
  }
  catch (e) {
    alert(e.message)
  }
}

// const docRef = doc(db, "cities", "SF");
// const docSnap = await getDoc(docRef);

// if (docSnap.exists()) {
//   console.log("Document data:", docSnap.data());
// } else {
//   console.log("No such document!");
// }


function getAllUsers() {
  let dataArray = []
  const q = query(collection(db, "user"));
    onSnapshot(q,(querySnapshot)=>{
      querySnapshot.forEach((doc)=>{
        console.log(doc.data())
        dataArray.push({...doc.data()})
      })
    })
    console.log("DataArr",dataArray)
    return dataArray
}

// async function getAllUsers() {

//   let dataCopyArray = []

//   const q = query(collection(db, "user"))
//   const querySnapshot = await getDocs(q);

//   querySnapshot.forEach((doc) => {
//     let dataCopy = doc.data()
//     dataCopyArray.push({ ...dataCopy, id: doc.id })
//   });
//   return dataCopyArray;
// }
export {
  registerUser,
  loginWithUser,
  logout,
  getAllUsers
}