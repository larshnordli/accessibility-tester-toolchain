var app = angular.module("Focuser", []);

app.controller("FocusController", function($scope){
  $scope.test = "Hi from Angular";

  var messages = [
      'Hi there',
      'Hi, bot. How are you?',
      'Im great. What about you?',
      'Hey, check out <a href="#path">this link</a>'
    ];

  $scope.messages = messages;

  $scope.sendMessage = function(){
    var message = $scope.inputField;
    
    if(message != null){
      messages.push($scope.inputField);
    }

  }
});
