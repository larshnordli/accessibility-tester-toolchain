
var app = angular.module("Focuser", []);

app.controller("FocusController", function($scope, $timeout){
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
      $scope.inputField = '';
      $scope.textArea = true;
    }

  }
});

angular.module('ng').directive('ngFocus', function($timeout) {
    return {
        link: function ( scope, element, attrs ) {
            scope.$watch( attrs.ngFocus, function ( val ) {
                if ( angular.isDefined( val ) && val ) {
                    $timeout( function () { element[0].focus(); } );
                }
            }, true);

            element.bind('blur', function () {
                if ( angular.isDefined( attrs.ngFocusLost ) ) {
                    scope.$apply( attrs.ngFocusLost );

                }
            });
        }
    };
});
