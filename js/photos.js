function TodoCtrl($scope, $http) {
  $http.get(serverAddress+'/data/photos').success(function(data) {
    $scope.photos = data;
  });

  $scope.remove = function(index) {
    $scope.photos.splice(index, 1);
  };

  var socket = io.connect(serverAddress+'');

  socket.on('get.special.photos', function(data) {
    $scope.photos = data;
  })
  $scope.updateServer = function() {
    socket.emit('special.photos', $scope.photos);
  }
}