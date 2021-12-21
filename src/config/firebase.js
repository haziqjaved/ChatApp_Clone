import { initializeApp } from "firebase/app";
import { getAuth, signInWithEmailAndPassword,createUserWithEmailAndPassword,onAuthStateChanged,updateEmail,signOut} from "firebase/auth";
import { getFirestore, collection,
  addDoc, setDoc, doc, getDoc, query, getDocs,updateDoc,where,Timestamp } from "firebase/firestore";
// import * as firebase from 'firebase';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAo2TwS6hgMmUe3hGDOhNv5ObPjtQ4wFFA",
  authDomain: "chatapp-7461c.firebaseapp.com",
  projectId: "chatapp-7461c",
  storageBucket: "chatapp-7461c.appspot.com",
  messagingSenderId: "697071475969",
  appId: "1:697071475969:web:39d0a990b8d299b8c18f00"
};

// Initialize Firebase
initializeApp(firebaseConfig);
const auth = getAuth();
const db = getFirestore();


async function loginUser(email,password)
{

  const {user:{uid}} = await signInWithEmailAndPassword(auth, email, password)
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
    data.id=uid;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  return data;
  
  // user = userCredential.user.uid.toString();

}
async function registerUser(authParams)
{
  const {name,email,contact,password} = authParams;

  
  const {user:{uid}} = await createUserWithEmailAndPassword(auth, email, password)
 
//   const storageRef = ref(storage, 'users/' + picture.name) 
//     await uploadBytes(storageRef, picture)
//     const url = await getDownloadURL(storageRef)
 
 
  await setDoc(doc(db, "users", uid), {
    email,name,contact
  });
  const docRef = doc(db, "users", uid);
  const docSnap = await getDoc(docRef);
  const data = docSnap.data();
  data.id=uid;

    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
    } else {
      // doc.data() will be undefined in this case
      console.log("No such document!");
    }

  return data;
  
    
}



async function getAllUsers() {
    const q = query(collection(db, "users"))
    const querySnapshot = await getDocs(q)
    const currentUsers = []
    querySnapshot.forEach(doc => {
      currentUsers.push({...doc.data(),id:doc.id})
    })
   
    return currentUsers
  }

async function createChatRoom(name)
{
  let messages=[];
  const docRef = await addDoc(collection(db, "chatroom"), {
    name,messages
   
   });
   return docRef.id;
}

/*
async function addMessage(text,senderid,receiverid)
{
  
//await setDoc(doc(db, "cities", "new-city-id"), data);
    console.log(text,senderid,receiverid)
    // await addDoc(collection(db, "messages"), {
    //     text,senderid,receiverid
    //   });
      

      const docRef = doc(db,"messages",senderid+receiverid);
      const docSnap = await getDoc(docRef);
     
    
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log(data);
            let temparr =[];
            temparr =data.temparr;
            temparr.push(text);
            await setDoc(doc(db,"messages",senderid+receiverid), {
                temparr,senderid,receiverid
              });

        } else {
            let temparr = []
            temparr.push(text);
            await setDoc(doc(db,"messages",senderid+receiverid), {
                temparr,senderid,receiverid
              });
          // doc.data() will be undefined in this case
          //console.log("No such document!");
        }
    
}
*/

async function messageInChatRoom(text,id,userid)
{
  console.log(text,id,userid)
  const docRef = doc(db,"chatroom",id);
  const docSnap = await getDoc(docRef);
     
    
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('i am data',data);
            let messages =[];
           messages =data.messages;
           let name=data.name
           console.log('i am message',messages);
           let obj = {
            text:text,
            id:userid,
            timestamp:Timestamp.fromDate(new Date())

         }
            messages.push(obj);
            await setDoc(doc(db,"chatroom",id), {
               name,messages
              });

        } else {
          
            let obj = {
              text:text,
              id:userid,
              timestamp:Timestamp.fromDate(new Date())

           }
             let messages = []
            messages.push(obj);
            await setDoc(doc(db,"chatroom",id), {
               messages
              });
          // doc.data() will be undefined in this case
          //console.log("No such document!");

          

       

        
        }

}
async function addMessage(text,senderid,receiverid,userid)
{
  
    

      const docRef = doc(db,"messages",senderid+receiverid);
      const docSnap = await getDoc(docRef);
     
    
        if (docSnap.exists()) {
            const data = docSnap.data();
            console.log('i am data',data);
            let messages =[];
           messages =data.messages;
           console.log('i am message',messages);
           let obj = {
            text:text,
            id:userid,
            timestamp:Timestamp.fromDate(new Date())

         }
            messages.push(obj);
            await setDoc(doc(db,"messages",senderid+receiverid), {
               messages
              });

        } else {
          const docRef = doc(db,"messages",receiverid+senderid);
          const docSnap = await getDoc(docRef);

          if (docSnap.exists()) {

            const data = docSnap.data();
            console.log('i am data',data);
            let messages =[];
            messages =data.messages;
            console.log('i am message',messages);
           let obj = {
            text:text,
            id:userid,
            timestamp:Timestamp.fromDate(new Date())

         }
            messages.push(obj);
            await setDoc(doc(db,"messages",receiverid+senderid), {
               messages
              });
          }

          else{
            let obj = {
              text:text,
              id:userid,
              timestamp:Timestamp.fromDate(new Date())

           }
             let messages = []
            messages.push(obj);
            await setDoc(doc(db,"messages",receiverid+senderid), {
               messages
              });
          // doc.data() will be undefined in this case
          //console.log("No such document!");

          }

       

        
        }
    
}

async function getUserData(id)
{
    const docRef = doc(db, "users", id);
    const docSnap = await getDoc(docRef);
    
    //console.log("Document data 2:", docSnap.data());
    const data = docSnap.data();
    // data.id=uid;
    return data;
}

// async function getMessage(id)
// {
//     //  console.log('re',id);
//  const messagesRef = collection(db, "messages");
//  let results=[];

//   const q = query(messagesRef, where("receiverid", "==", id));
//   const querySnapshot = await getDocs(q);
//   querySnapshot.forEach((doc) => {
 
//   results.push({...doc.data(),id:doc.id,...details})

// });

async function getMessage(id)
{
    //  console.log('re',id);
 const messagesRef = collection(db, "messages");
 let results=[];

  const q = query(messagesRef, where("receiverid", "==", id));
  const querySnapshot = await getDocs(q);
  querySnapshot.forEach((doc) => {
 
  results.push({...doc.data(),id:doc.id,...details})

});


for(let i=0 ; i<results.length; i++)
{
    var details = await getUserData(results[i].senderid);
    
    results[i].senderDetails = details
}


return results;
}

async function getChatRoom()
{
  const q = query(collection(db, "chatroom"));

const querySnapshot = await getDocs(q);
const  result = [];
querySnapshot.forEach((doc) => {
  // doc.data() is never undefined for query doc snapshots
  result.push({ ...doc.data(), id: doc.id});
});
   
   return result;
}

async function getChat(senderid,receiverid)
{
    const docRef = doc(db,"messages",senderid+receiverid);
    const docSnap = await getDoc(docRef);
   
  
      if (docSnap.exists()) {
          // const data = docSnap.data();
          // console.log(data);
         return true;
         

      } else {
         
      //  console.log("No such document!");
      return false;
      }
   
}

export{
    registerUser,
    loginUser,
    getAllUsers,
    addMessage,
    getMessage,
    getChat,
    createChatRoom,
    getChatRoom,
    messageInChatRoom
}


