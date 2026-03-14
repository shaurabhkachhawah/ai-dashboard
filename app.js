import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword }

from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import { getFirestore, addDoc, collection, getDocs }

from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {

apiKey:"AIzaSyCNfhwjpNk9k6dTYyD4V1qzMvVippuLx64",

authDomain:"ai-dashboard-14782.firebaseapp.com",

projectId:"ai-dashboard-14782",

storageBucket:"ai-dashboard-14782.firebasestorage.app",

messagingSenderId:"256117832488",

appId:"1:256117832488:web:2c75c646083f1f2449ee1d"

};

const app=initializeApp(firebaseConfig);

const auth=getAuth(app);

const db=getFirestore(app);


/* LOGIN */

window.login=function(){

let email=document.getElementById("email").value

let password=document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

window.location="dashboard.html"

})

.catch(e=>alert(e.message))

}


/* REGISTER */

window.register=function(){

let email=document.getElementById("email").value

let password=document.getElementById("password").value

createUserWithEmailAndPassword(auth,email,password)

.then(()=>alert("Account created"))

.catch(e=>alert(e.message))

}
