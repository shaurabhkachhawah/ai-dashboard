import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-app.js";

import { getFirestore, addDoc, collection, getDocs } from "https://www.gstatic.com/firebasejs/10.7.0/firebase-firestore.js";

const firebaseConfig = {

apiKey: "AIzaSyCNfhwjpNk9k6dTYyD4V1qzMvVippuLx64",

authDomain: "ai-dashboard-14782.firebaseapp.com",

projectId: "ai-dashboard-14782",

storageBucket: "ai-dashboard-14782.firebasestorage.app",

messagingSenderId: "256117832488",

appId: "1:256117832488:web:2c75c646083f1f2449ee1d",

measurementId: "G-VZWKG40JTJ"

};

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);



window.addPromotion = async function(){

let brand=document.getElementById("brand").value

let amount=document.getElementById("amount").value

let method=document.getElementById("method").value


await addDoc(collection(db,"promotions"),{

brand:brand,

amount:amount,

method:method

})


loadPromotions()

}



async function loadPromotions(){

let list=document.getElementById("promotionList")

let totalIncome=0


const querySnapshot = await getDocs(collection(db,"promotions"))

list.innerHTML=""


let labels=[]

let amounts=[]


querySnapshot.forEach((doc)=>{


let data=doc.data()


totalIncome+=Number(data.amount)


labels.push(data.brand)

amounts.push(data.amount)


list.innerHTML+=`

<div class="card">

Brand: ${data.brand}<br>

Amount: ${data.amount}<br>

Method: ${data.method}

</div>

`

})


document.getElementById("totalIncome").innerText=totalIncome


drawChart(labels,amounts)


}



function drawChart(labels,amounts){

const ctx=document.getElementById("incomeChart")


if(!ctx) return


new Chart(ctx,{

type:"bar",

data:{

labels:labels,

datasets:[{

label:"Promotion Income",

data:amounts

}]

}

})

}



loadPromotions()