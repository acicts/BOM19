var db = firebase.database();

function addWides(m){
  db.ref('current').once('value').then(function(snap){
    var cIn = snap.val();
    db.ref('extras/'+ cIn + '/wides').once('value').then(function(s){
      var w = s.val();
      w += m;
      db.ref('extras/'+ cIn + '/wides').set(w);
      console.log(w);
    })
  })
}




var rad = document.getElementsByName('in');
for(var i = 0; i < rad.length; i++) {
    rad[i].addEventListener('change', function() {
        db.ref('current').set(this.value);
    });
}
