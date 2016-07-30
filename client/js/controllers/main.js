/**
 * Created by drmischer on 14.07.2016.
 */
// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app')
  .controller('MainController', ['$scope', '$rootScope', function ($scope, $rootScope) {
    $scope.screenName = $rootScope.currentUser.email;
  }])

  .controller('DeleteGroupController', ['$scope', 'Taskgroup', '$state',
    '$stateParams', function ($scope, Taskgroup, $state, $stateParams) {
      Taskgroup.deleteById({id: $stateParams.id})
        .$promise
        .then(function () {
          $state.go('main.my-groups');
        });
    }])
  .controller('EditGroupController', ['$scope', '$q', 'Taskgroup', '$stateParams', '$state',
    function ($scope, $q, Taskgroup, $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.taskGroup = {};

      $q.all([
        Taskgroup.findById({id: $stateParams.id}).$promise
      ])
        .then(function (data) {
          $scope.taskGroup = data[0];
        });

      $scope.submitForm = function () {
        $scope.taskGroup
          .$save()
          .then(function (taskGroup) {
            $state.go('main.my-groups');
          });
      };
    }])
  .controller('MyGroupsController', ['$scope', 'Taskgroup', '$rootScope',
    function ($scope, Taskgroup, $rootScope) {
      $scope.taskgroups = Taskgroup.find({
        filter: {
          where: {
            simpleUserId: $rootScope.currentUser.id
          }
        }
      });
    }])
  .controller('MyTasksController', ['$scope', 'Task', '$rootScope',
    function ($scope, Task, $rootScope) {
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

      $scope.submitForm = function () {
        Taskgroup.create({
          title: $scope.taskGroup.title,
          status: $scope.taskGroup.status
        })
          .$promise
          .then(function () {
            $state.go('main.my-groups');
          });
      };
    }])
  .controller('CreateTaskController', ['$scope', 'Task', '$state',
    function ($scope, Task, $state) {
      $scope.action = 'Add';

      $scope.submitForm = function () {
        Task.create({
          title: $scope.task.title,
          status: $scope.task.status
        })
          .$promise
          .then(function () {
            $state.go('main.my-tasks');
          });
      };
    }]);
