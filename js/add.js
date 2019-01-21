var db = firebase.database();

var player = {
  create: function(data){
    db.ref('players/').push(data);
  },
  update: function(){
    
  },
  delete: function(id){
    var ref = db.ref('players/' + id);
    ref.remove();
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
  for(let i in arr){
    dp += '<div class="card" style="width: 18rem;">';
    dp += '<div class="card-body">';
    dp += '<h5 class="card-title">';
    dp += i;
    dp += '</h5>'
    var c = arr[i];
    for(let j in arr[i]){
      dp += '<p color="black">';
      dp += j;
      dp += ":";
      dp += JSON.stringify(arr[i][j]);
      dp += "</p>";
    }
    //dp += JSON.stringify(arr[i]);
    dp += '<input type="button" onclick="del(';
    dp += "'"+i.toString()+"'";
    dp += ')" value="Delete" class="btn btn-primary">';
    dp += '</div></div>';
  }

  
  
  display.innerHTML = dp;
});

function del(id){
  var ref = playerRef.child(id);
  ref.remove();
}