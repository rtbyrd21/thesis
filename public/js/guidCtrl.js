app.controller('guidCtrl', function($scope, $http, guid, user, entry, eligibility){


var myObj = {
  1: 'eyes',
  2: 'off',
  3: 'non'
}


$scope.folder = myObj[Math.floor(Math.random() * 3) + 1];



});

