(function(){

'use strict';

  angular.module('EissonApp', ['ngRoute'])
  .controller('piController',['$scope','$http','$interval',function ($scope,$http, $interval) {
    $scope.btn = 'Prender';
    $scope.img = 'img/white.png';
    $scope.disable_start = false;
    $scope.disable_stop = true;
    $scope.valor = 'stopped';
    var tiempo_ms = 700;

    $scope.start = function() {
      $scope.disable_stop = false;
      $scope.disable_start = true;
      $scope.promesa = $interval(function(){
        console.log('Calling to the server...');
        $scope.callingServer();
      },tiempo_ms);
    };

    $scope.stop = function() {
      $scope.disable_start = false;
      $scope.disable_stop = true;
        $interval.cancel($scope.promesa);
        console.log('Aniquilado...');
    };

    $scope.callingServer = function() {
      $http({method:'POST',url: 'api/server.php', headers : { 'Content-Type': 'application/x-www-form-urlencoded' }}).success(function(response) {
        $scope.valor = response;
        if ( parseInt(response) < 15 ) {
          $('body').css({'background':'#BB1717'});
          var alerta = new Audio('sound/impacto.mp3');
          //alerta.paused ? alerta.play() : alerta.pause();
          alerta.play();
        } else {
          $('body').css({'background':'#000000'});
        }
      });
    };

  }]);

})();