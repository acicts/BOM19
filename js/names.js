function TodoCtrl($scope, $http) {
  $http.get(serverAddress+'/data/players').success(function(data) {
    $scope.players = data;
  });

  $scope.addPlayer = function() {
    $scope.players.push({
      name: $scope.playerName,
      school: $scope.playerSchool,
      remove: false
    });
    $scope.playerName = '';
    $scope.playerSchool = '';
  }
  $scope.clean = function() {
    var oldPlayers = $scope.players;
    $scope.players = [];
    angular.forEach(oldPlayers, function(player) {
      if (!player.remove) $scope.players.push(player);
    })

  }
  var socket = io.connect(serverAddress+'');

  socket.on('get.special.players', function(data) {
    $scope.players = data;
  })
  $scope.updateServer = function() {
    var toSend = [];
    for (var i = 0; i < $scope.players.length; i++) {
      var object = {
        name: $scope.players[i].name,
        school: $scope.players[i].school
      };
      toSend.push(object);
    }
    console.log("SENDING ",toSend);
    socket.emit('special.players', toSend);
  }
}