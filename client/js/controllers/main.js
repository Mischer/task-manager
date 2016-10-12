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
  .controller('CompleteTasksController', ['$scope', 'Taskgroup', 'Task', '$state',
    '$stateParams', function ($scope, Taskgroup, Task, $state, $stateParams) {
      Task.updateAll({
        where: {taskGroupId: $stateParams.id}
      }, {status: true}, function(err, results){
        $state.go('main.my-groups');
        alert('All tasks updated successfully.');
      });
    }])
  .controller('MyTasksController', ['$scope', 'Taskgroup', 'Task', '$rootScope',
    function ($scope, Taskgroup, Task, $rootScope) {
      $scope.tasks = [];
      Taskgroup.find({
        filter: {
          fields: {id: true},
          where: {
            simpleUserId: $rootScope.currentUser.id
          }
        }
      }).$promise
        .then(function (taskgroups) {
          $scope.tasks = Task.find({
            filter: {
              where: {taskGroupId: {inq: parseIds(taskgroups)}}
            }
          });
        });
    }])
  .controller('CreateTaskController', ['$scope', 'Task', '$stateParams', '$state',
    function ($scope, Task, $stateParams, $state) {
      $scope.action = 'Add';

      $scope.submitForm = function () {
        Task.create({
          title: $scope.task.title,
          status: $scope.task.status,
          description: $scope.task.description,
          taskGroupId: $stateParams.groupId
        }).$promise
          .then(function () {
            $state.go('main.my-tasks');
          });
      };
    }])
  .controller('DeleteTaskController', ['$scope', 'Task', '$state',
    '$stateParams', function ($scope, Task, $state, $stateParams) {
      Task.deleteById({id: $stateParams.id})
        .$promise
        .then(function () {
          $state.go('main.my-tasks');
        });
    }])
  .controller('EditTaskController', ['$scope', '$q', 'Task', '$stateParams', '$state',
    function ($scope, $q, Task, $stateParams, $state) {
      $scope.action = 'Edit';
      $scope.task = {};

      $q.all([
        Task.findById({id: $stateParams.id}).$promise
      ])
        .then(function (data) {
          $scope.task = data[0];
        });

      $scope.submitForm = function () {
        $scope.task
          .$save()
          .then(function (task) {
            $state.go('main.my-tasks');
          });
      };
    }]);

function parseIds(taskgroups) {
  ids = [];
  angular.forEach(taskgroups, function (tg) {
    ids.push(tg.id);
  });
  return ids;
}
