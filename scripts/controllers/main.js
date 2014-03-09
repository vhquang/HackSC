'use strict';

angular.module('fappyBirdApp')
  .controller('MainCtrl', function ($scope, $http) {
//
    var done = false;
    var intervalId = setInterval(function() {
      if (done) {
        clearInterval(intervalId);
        return;
      }
      var birdHeight = jQuery(".bird").css("height");
      if (!birdHeight) { return; }

      birdHeight = birdHeight.replace("px", "");
      var buttonSize = parseInt(birdHeight) / 5;
      var size = buttonSize.toString() + "px";
      jQuery(".option-button").css("height", size);
      done = true;
    }, 200);

    $scope.countDown = 0;
    $scope.available = false;

    function waitNextVote(num) {
      $scope.countDown = parseInt(num / 1000) + 1;
      var intervalId = setInterval(function() {
        $scope.$apply(function() {
          $scope.countDown -= 1;
          if ( $scope.countDown < 1 ) {
            $scope.countDown = 0;
            clearInterval(intervalId);
            startVote();
            return;
          }
        });
      }, 1000);
    }

    function startVote() {
      var votingTime = 6;
      $scope.countDown = votingTime;
      $scope.available = true;
      var startTime = new Date().getTime();

      var intervalId = setInterval(function() {
        $scope.$apply(function() {
          var time = new Date().getTime();
          if ( (time - startTime) > (votingTime * 1000) ) {
            $scope.countDown = 0;
            $scope.available = false;
            clearInterval(intervalId);
            waitNextVote(5000);
            return;
          }
          $scope.countDown -= 1;
        });
      }, 1000);
    }

    window.vote = startVote;

//    function send(options) {
//      return function() {
//        $.ajax(options).done(function() {
//          //cooldown
//        });
//      };
//    }
//
//    $("#btn0").click( send({ url: "./v0", type: "POST" }) );
//    $("#btn1").click( send({ url: "./v1", type: "POST" }) );
//    $("#btn2").click( send({ url: "./v2", type: "POST" }) );
//    $("#btn3").click( send({ url: "./v3", type: "POST" }) );

    $scope.post = function (num) {
      $http({
        url: './v' + num,
        method: "POST"
//        data: inspection,
      }).success(function (data, status, headers, config) {
          $scope.available = false;
          console.log(data);
        }).error(function (data, status, headers, config) {
          console.log('fail', data);
        });
    }

    startVote();

  });


