import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import {
getAuth,
signInWithEmailAndPassword,
createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-auth.js";

import {
getFirestore,
addDoc,
collection,
getDocs
} from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";



/* FIREBASE CONFIG */

const firebaseConfig = {

apiKey:"AIzaSyCNfhwjpNk9k6dTYyD4V1qzMvVippuLx64",
authDomain:"ai-dashboard-14782.firebaseapp.com",
projectId:"ai-dashboard-14782",
storageBucket:"ai-dashboard-14782.firebasestorage.app",
messagingSenderId:"256117832488",
appId:"1:256117832488:web:2c75c646083f1f2449ee1d"

};



/* INITIALIZE FIREBASE */

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);

const db = getFirestore(app);



/* LOGIN */

window.login = function(){

let email = document.getElementById("email").value

let password = document.getElementById("password").value

signInWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Login Successful")

window.location="dashboard.html"

})

.catch(error=>{

alert(error.message)

})

}



/* REGISTER */

window.register = function(){

let email = document.getElementById("email").value

let password = document.getElementById("password").value

createUserWithEmailAndPassword(auth,email,password)

.then(()=>{

alert("Account created successfully")

})

.catch(error=>{

alert(error.message)

})

}



/* ADD BRAND COLLABORATION */

window.addPromotion = async function(){

let brand = document.getElementById("brand").value
let amount = document.getElementById("amount").value
let method = document.getElementById("method").value

try{

await addDoc(collection(db,"promotions"),{

brand:brand,
amount:amount,
method:method,
date:new Date()

})

alert("Promotion Added")

loadPromotions()

}

catch(e){

alert(e.message)

}

}



/* LOAD PROMOTIONS */

async function loadPromotions(){

let list=document.getElementById("promotionList")

if(!list) return

const querySnapshot = await getDocs(collection(db,"promotions"))

list.innerHTML=""

querySnapshot.forEach(doc=>{

let data=doc.data()

list.innerHTML+=`

<div class="card">

<b>Brand:</b> ${data.brand}<br>
<b>Amount:</b> ${data.amount}<br>
<b>Method:</b> ${data.method}

</div>

`

})

}

loadPromotions()



/* AI NEURAL BACKGROUND */

const canvas=document.getElementById("ai-bg")

if(canvas){

const ctx=canvas.getContext("2d")

canvas.width=window.innerWidth
canvas.height=window.innerHeight

let particles=[]

for(let i=0;i<80;i++){

particles.push({

x:Math.random()*canvas.width,
y:Math.random()*canvas.height,
vx:(Math.random()-0.5),
vy:(Math.random()-0.5),
size:2

})

}

function animate(){

ctx.clearRect(0,0,canvas.width,canvas.height)

particles.forEach(p=>{

p.x+=p.vx
p.y+=p.vy

if(p.x<0||p.x>canvas.width) p.vx*=-1
if(p.y<0||p.y>canvas.height) p.vy*=-1

ctx.beginPath()
ctx.arc(p.x,p.y,p.size,0,Math.PI*2)
ctx.fillStyle="#ff2d2d"
ctx.fill()

particles.forEach(p2=>{

let dx=p.x-p2.x
let dy=p.y-p2.y

let dist=Math.sqrt(dx*dx+dy*dy)

if(dist<120){

ctx.beginPath()
ctx.strokeStyle="rgba(255,0,0,0.2)"
ctx.moveTo(p.x,p.y)
ctx.lineTo(p2.x,p2.y)
ctx.stroke()

}

})

})

requestAnimationFrame(animate)

}

animate()

}
