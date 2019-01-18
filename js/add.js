var db = firebase.database();

var player = {
  create: function(data){
    db.ref('players/').push(data);
  },
  update: function(){
    
  },
  delete: function(){

  }
}

function Person(name, school){
  this.name = name;
  this.school = school;
  this.marks = 0;
  this.balls = 0;
  this.isBalling = false;
  this.isBatting = false;
  this.isFacing = false;
}

function addOne(){
  var n = document.getElementById('player').value;
  var s = document.getElementById('school').value;
  var data = new Person(n, s);
  player.create(data);
  n = "";
  s = "";
}

const playerRef = db.ref('players/');
const display =   document.getElementById('players');

playerRef.on('value', snap => {
  var arr = snap.val();
  var len = Object.keys(arr).length;
  var dp = "  ";
  for(var i in arr){
    dp += i;
    dp += '<br><ul>';
    var c = arr[i];
    for(var j in arr[i]){
      dp += "<li>";
      dp += j;
      dp += ":";
      dp += JSON.stringify(arr[i][j]);
      dp += "</li>";
    }
    //dp += JSON.stringify(arr[i]);
    dp += '</ul><br>';
  }
  
  display.innerHTML = dp;
});