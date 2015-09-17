var modalApp = angular.module("modal", ["ui.bootstrap.modal", "firebase"]);

modalApp.controller('ModalDemoCtrl', function ($scope, $modal, $log, $rootScope) {

  $scope.items = ['$5', '$25', '$100', '$500', '$1000', 'No thanks, not at this time.'];

  $scope.animationsEnabled = true;

  $scope.open = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.items;
        }
      }
    });

    modalInstance.result.then(function (selectedItem) {
      $scope.selected = selectedItem;
    }, function () {
      $log.info('Modal dismissed at: ' + new Date());
    });
  };

  $scope.toggleAnimation = function () {
    $scope.animationsEnabled = !$scope.animationsEnabled;
  };

  var myObj = {
  1: 'eyes',
  2: 'off',
  3: 'non'
}


$rootScope.folder = myObj[Math.floor(Math.random() * 3) + 1];

});

var start = new Date().getTime(),
    elapsed = '0.0';

window.setInterval(function()
{
    var time = new Date().getTime() - start;

    elapsed = Math.floor(time / 100) / 10;
    if(Math.round(elapsed) == elapsed) { elapsed += '.0'; }


}, 100);

// Please note that $modalInstance represents a modal window (instance) dependency.
// It is not the same as the $modal service used above.

angular.module('modal').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $firebaseArray) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };

  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    var data = {"folder": $scope.folder, "amount": $scope.selected.item, "time":elapsed};

     var ref = new Firebase('https://thesis-eyes.firebaseio.com/pilot');
	  // create a synchronized array
	  $scope.messages = $firebaseArray(ref);
	  // add new items to the array
	  // the message is automatically added to our Firebase database!
	  $scope.addMessage = function() {
	    $scope.messages.$add({
	      data:data
	    });

			    
	  };

	  $scope.addMessage();

  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };
});