var db = firebase.firestore();
db.collection("counts").get().then((querySnapshot)=>{
  querySnapshot.forEach((doc) =>{
    console.log(doc.dat());
  });
});

const result = document.getElementById("result");
const tweetbutton = document.getElementById("tweetbutton");

let moving = false;
function randNum(){
  let num = Math.floor(Math.random() * 4);
  return num;
}
let num;
function move(){
  var movesound = new Audio('movesound.mp3');
  
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
  movesound.play();
}
let timeOutId;
var start = new Vue({
  el:"#start",
  methods: {
    tapStart(){
      if (moving){
        return;
      }
      var pushsound = new Audio('pushsound.mp3');
      pushsound.play();
      timeOutId = setInterval(move, 100);
      moving = true;
      result.textContent = "回転中…";
      tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレット";
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
      var pushsound = new Audio('pushsound.mp3');
      pushsound.play();
      clearInterval(timeOutId);
      moving = false;
      
      switch(num){
        case 0:
        console.log("チです");
        result.textContent = "結果は「チ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレットで「チ」が出ました！";
        break;
        case 1:
        console.log("ンです");
        result.textContent = "結果は「ン」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレットで「ン」が出ました！";
        break;
        case 2:
        console.log("ポです");
        result.textContent = "結果は「ポ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレットで「ポ」が出ました！";
        break;
        case 3:
        console.log("コです");
        result.textContent = "結果は「コ」でした。";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレットで「コ」が出ました！";
        break;
        default:
        console.log("エラー");
        result.textContent = "エラー";
        tweetbutton.href = "http://twitter.com/share?url=https://yoshiishunichi.github.io/c-roulette/&text=チンポコルーレットでエラーが出ました…";
      }
    }
  },
});
