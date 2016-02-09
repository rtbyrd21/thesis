var modalApp = angular.module("modal", ["ui.bootstrap.modal", "firebase"]);

modalApp.controller('ModalDemoCtrl', function ($scope, $modal, $log, $rootScope) {

  $scope.items = ['$5', '$10', '$25', '$50', 'No thanks, not at this time.'];
  $scope.itemsTwo = 'ok';

  $scope.animationsEnabled = true;



  $scope.agreed = {
       value : false
     };

     // console.log('ok');

    $rootScope.scrollUp = function(){
      window.scrollTo(0, 0);
      $scope.open('directions');
    } 

  $scope.open = function (donate) {

    if(!donate){
      $rootScope.openTwo();
      $rootScope.donate = false;
      return true;
    }else{
      if(donate != 'directions'){
        $rootScope.donate = true;
      }else{
        $rootScope.openThree();
        return true;
      }
    }
    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl',
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


    $rootScope.openTwo = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentTwo.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.itemsTwo;
        }
      }
    });

    modalInstance.result.then(function (comments) {
    }, function () {
      console.log($scope);
      $log.info('Modal dismissed at: ' + new Date());
    });
  };


  $rootScope.openThree = function (size) {

    var modalInstance = $modal.open({
      animation: $scope.animationsEnabled,
      templateUrl: 'myModalContentThree.html',
      controller: 'ModalInstanceCtrl',
      size: size,
      resolve: {
        items: function () {
          return $scope.itemsTwo;
        }
      }
    });

    modalInstance.result.then(function (comments) {
    }, function () {
      console.log($scope);
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

angular.module('modal').controller('ModalInstanceCtrl', function ($scope, $modalInstance, items, $firebaseArray, $modal, $rootScope) {

  $scope.items = items;
  $scope.selected = {
    item: $scope.items[0]
  };




  $scope.ok = function () {
    $modalInstance.close($scope.selected.item);
    $scope.data = {"folder": $scope.folder, "amount": $scope.selected.item, "time":elapsed};
    $rootScope.data = $scope.data;
    $scope.okAgain();
	  

  };

  $scope.okAgain = function(){

    
    $rootScope.openTwo();

  }

  $scope.sendData = function () {

    var completeData = angular.extend({}, $rootScope.data, {"comments": $scope.comments});
    console.log(completeData);

    if($rootScope.donate == false){
      completeData.amount = 'not today';
      completeData.time = elapsed;
      completeData.folder = $scope.folder;
    }
    var ref = new Firebase('https://thesis-eyes.firebaseio.com/thesis');
    // create a synchronized array
    $scope.messages = $firebaseArray(ref);
    // add new items to the array
    // the message is automatically added to our Firebase database!
    $scope.addMessage = function() {
      $scope.messages.$add({
        data:completeData
      });

          
    };
    $scope.addMessage();
    $modalInstance.dismiss();
  };

  $scope.cancel = function () {
    $modalInstance.dismiss('cancel');
  };


});

