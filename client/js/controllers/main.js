/**
 * Created by drmischer on 14.07.2016.
 */
// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('AllGroupController', ['$scope', 'Taskgroup', function($scope,
                                                                     Taskgroup) {
    $scope.taskgroup = Taskgroup.find({
      filter: {
        include: [
          'task',
          'simpleuser'
        ]
      }
    });
  }])
  .controller('AddReviewController', ['$scope', 'CoffeeShop', 'Review',
    '$state', function($scope, CoffeeShop, Review, $state) {
      $scope.action = 'Add';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = false;

      CoffeeShop
        .find()
        .$promise
        .then(function(coffeeShops) {
          $scope.coffeeShops = coffeeShops;
          $scope.selectedShop = $scope.selectedShop || coffeeShops[0];
        });

      $scope.submitForm = function() {
        Review
          .create({
            rating: $scope.review.rating,
            comments: $scope.review.comments,
            coffeeShopId: $scope.selectedShop.id
          })
          .$promise
          .then(function() {
            $state.go('all-reviews');
          });
      };
    }])
  .controller('DeleteReviewController', ['$scope', 'Review', '$state',
    '$stateParams', function($scope, Review, $state, $stateParams) {
      Review
        .deleteById({ id: $stateParams.id })
        .$promise
        .then(function() {
          $state.go('my-reviews');
        });
    }])
  .controller('EditReviewController', ['$scope', '$q', 'CoffeeShop', 'Review',
    '$stateParams', '$state', function($scope, $q, CoffeeShop, Review,
                                       $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.coffeeShops = [];
      $scope.selectedShop;
      $scope.review = {};
      $scope.isDisabled = true;

      $q
        .all([
          CoffeeShop.find().$promise,
          Review.findById({ id: $stateParams.id }).$promise
        ])
        .then(function(data) {
          var coffeeShops = $scope.coffeeShops = data[0];
          $scope.review = data[1];
          $scope.selectedShop;

          var selectedShopIndex = coffeeShops
            .map(function(coffeeShop) {
              return coffeeShop.id;
            })
            .indexOf($scope.review.coffeeShopId);
          $scope.selectedShop = coffeeShops[selectedShopIndex];
        });

      $scope.submitForm = function() {
        $scope.review.coffeeShopId = $scope.selectedShop.id;
        $scope.review
          .$save()
          .then(function(review) {
            $state.go('all-reviews');
          });
      };
    }])
  .controller('MyGroupsController', ['$scope', 'Taskgroup', '$rootScope',
    function($scope, Taskgroup, $rootScope) {
      $scope.taskgroups = Taskgroup.find({
        filter: {
          where: {
            simpleUserId: $rootScope.currentUser.id
          },
          include: [
            'task',
            'simpleuser'
          ]
        }
      });
    }])
  .controller('MyTasksController', ['$scope', 'Task', '$rootScope',
    function($scope, Task, $rootScope) {
      $scope.tasks = Task.find({
        filter: {
/*          where: {
                    taskGroupId: $rootScope.currentUser.id
          },*/
          include: [
            'taskgroup'
          ]
        }
      });
    }])
  .controller('CreateGroupController', ['$scope', 'Taskgroup', '$state',
    function ($scope, Taskgroup, $state) {
      $scope.action = 'Add';

      $scope.submitForm = function() {
        Taskgroup.create({
          title: $scope.taskGroup.title,
          status: $scope.taskGroup.status
        })
          .$promise
          .then(function() {
            $state.go('main.my-groups');
          });
      };
    }])
  .controller('CreateTaskController', ['$scope', 'Task', '$state',
    function($scope, Task, $state) {
      $scope.action = 'Add';

      $scope.submitForm = function() {
        Task.create({
            title: $scope.task.title,
            status: $scope.task.status
          })
          .$promise
          .then(function() {
            $state.go('main.my-tasks');
          });
      };
    }]);
