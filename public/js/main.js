let chi = 0;
let nn = 0;
let po = 0;
let ko = 0;
let er = 0;

let all = 0;

let chiP = 0.0;
let nnP = 0.0;
let poP = 0.0;
let koP = 0.0;


let access = false;

const history = document.getElementById("history");

const config = {
  apiKey: "AIzaSyD7bWyfvQZHNrRGZTKh49ztQHDbxu-v4Bk",
  authDomain: "chimpoko-roulette.firebaseapp.com",
  projectId: "chimpoko-roulette",
  storageBucket: "chimpoko-roulette.appspot.com",
  messagingSenderId: "124026382192",
  appId: "1:124026382192:web:5a5db27802eafb10ac51b5",
  measurementId: "G-F0QTJ0WWLR"
}
firebase.initializeApp(config);
const db = firebase.firestore();

const numberRef = db.collection('numbers').doc('WGhjEW33p5snZ3bnEKKc');
const numberDoc = numberRef.get().then(function(doc){
  if (doc.exists){
    console.log("document data:", doc.data());
    chi = doc.get("chi");
    nn = doc.get("nn");
    po = doc.get("po");
    ko = doc.get("ko");
    er = doc.get("err");
    
    all = chi + nn + po + ko;
    
    chiP = chi / all;
    nnP = nn / all;
    poP = po / all;
    koP = ko / all;
    
    chiP = parseFloat(chiP * 100).toFixed(2);
    nnP = parseFloat(nnP * 100).toFixed(2);
    poP = parseFloat(poP * 100).toFixed(2);
    koP = parseFloat(koP * 100).toFixed(2);
    
    const historyText = "チ: "+ String(chi) +"回("+String(chiP)+"%), ン: "+String(nn)+"回("+String(nnP)+"%), ポ: "+String(po)+"回("+String(poP)+"%), コ: "+String(ko)+"回("+String(koP)+"%)";
    history.textContent = historyText;
    access = true;
  }
  else {
    console.log("no such document");
    history.textContent = "データ取得失敗…";
  }
});

const result = document.getElementById("result");
const tweetbutton = document.getElementById("tweetbutton");
const pushsound = new Audio('pushsound.mp3');

let moving = false;
function randNum(){
  let num = Math.floor(Math.random() * 4);
  return num;
}
let num;
function move(){
  
  const d0 = document.getElementById("0");
  const d1 = document.getElementById("1");
  const d2 = document.getElementById("2");
  const d3 = document.getElementById("3");
  const ds = [d0, d1, d2, d3];
  
  for (var i = 0; i < 4; i++){
    ds[i].style.display = "none";
  }
  num = randNum();
  ds[num].style.display = "block";
  let kyori = num * 35;
  ds[num].style.marginLeft = kyori + "px";
}
let timeOutId;
let stopActive = true;

function stopActivate(){
  stopActive = false;
}
var start = new Vue({
  el:"#start",
  methods: {
    tapStart(){
      if (moving){
        return;
      }
      pushsound.play();
      timeOutId = setInterval(move, 100);
      setTimeout(stopActivate, 500);
      
      moving = true;
      result.textContent = "回転中…";
      tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレット";
    }
  },
});
var stop = new Vue({
  el:"#stop",
  methods: {
    tapStop(){
      if (!moving){
        return;
      }
      if (stopActive){
        return;
      }
      stopActive = true;
      pushsound.play();
      clearInterval(timeOutId);
      moving = false;
      
      switch(num){
        case 0:
        console.log("チです");
        result.textContent = "結果は「チ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「チ」が出ました！";
        if (access){
          chi++;
          all = chi + nn + po + ko;
          chiP = chi / all;          
          chiP = parseFloat(chiP * 100).toFixed(2);
          
          numberRef.update({chi:chi});
          tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「チ」が出ました！("+String(chi)+"回目)";
          const historyText = "チ: "+ String(chi) +"回("+String(chiP)+"%), ン: "+String(nn)+"回("+String(nnP)+"%), ポ: "+String(po)+"回("+String(poP)+"%), コ: "+String(ko)+"回("+String(koP)+"%)";
          
          history.textContent = historyText;
        }
        break;
        case 1:
        console.log("ンです");
        result.textContent = "結果は「ン」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「ン」が出ました！";
        if (access){
          nn++;
          all = chi + nn + po + ko;
          nnP = nn / all;      
          nnP = parseFloat(nnP * 100).toFixed(2);
          
          numberRef.update({nn:nn});
          tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「ン」が出ました！("+String(nn)+"回目)";
          const historyText = "チ: "+ String(chi) +"回("+String(chiP)+"%), ン: "+String(nn)+"回("+String(nnP)+"%), ポ: "+String(po)+"回("+String(poP)+"%), コ: "+String(ko)+"回("+String(koP)+"%)";
          
          history.textContent = historyText;
        }
        break;
        case 2:
        console.log("ポです");
        result.textContent = "結果は「ポ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「ポ」が出ました！";
        if (access){
          po++;
          all = chi + nn + po + ko;
          poP = po / all;
          poP = parseFloat(poP * 100).toFixed(2);
          
          numberRef.update({po:po});
          tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「ポ」が出ました！("+String(po)+"回目)";
          const historyText = "チ: "+ String(chi) +"回("+String(chiP)+"%), ン: "+String(nn)+"回("+String(nnP)+"%), ポ: "+String(po)+"回("+String(poP)+"%), コ: "+String(ko)+"回("+String(koP)+"%)";
          
          history.textContent = historyText;
        }
        break;
        case 3:
        console.log("コです");
        result.textContent = "結果は「コ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「コ」が出ました！";
        if (access){
          ko++;
          all = chi + nn + po + ko;
          koP = ko / all;
          koP = parseFloat(koP * 100).toFixed(2);
          numberRef.update({ko:ko});
          tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットで「コ」が出ました！("+String(ko)+"回目)";
          const historyText = "チ: "+ String(chi) +"回("+String(chiP)+"%), ン: "+String(nn)+"回("+String(nnP)+"%), ポ: "+String(po)+"回("+String(poP)+"%), コ: "+String(ko)+"回("+String(koP)+"%)";
          history.textContent = historyText;
        }
        break;
        default:
        console.log("エラー");
        result.textContent = "エラー";
        tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットでエラーが出ました…";
        if (access){
          er++;
          numberRef.update({err:er});
          tweetbutton.href = "http://twitter.com/share?url=https://chimpoko-roulette.web.app/&text=チンポコルーレットでエラーが出ました！("+String(er)+"回目)";
        }
      }
    }
  },
});
