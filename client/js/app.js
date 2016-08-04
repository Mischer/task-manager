// Copyright IBM Corp. 2015. All Rights Reserved.
// Node module: loopback-getting-started-intermediate
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

angular
  .module('app', [
    'ui.router',
    'lbServices'
  ])
  .config(['$stateProvider', '$urlRouterProvider', function($stateProvider,
      $urlRouterProvider) {
    $stateProvider
      .state('main', {
        url: '/main',
        templateUrl: 'views/main.html',
        controller: 'MainController',
        authenticate: true
      })
      .state('forbidden', {
        url: '/forbidden',
        templateUrl: 'views/forbidden.html',
      })
      .state('login', {
        url: '/login',
        templateUrl: 'views/login.html',
        controller: 'AuthLoginController'
      })
      .state('logout', {
        url: '/logout',
        controller: 'AuthLogoutController'
      })
      .state('main.my-groups', {
        url: '/my-groups',
        templateUrl: 'views/my-groups.html',
        controller: 'MyGroupsController',
        authenticate: true
      })
      .state('main.my-tasks', {
        url: '/my-tasks',
        templateUrl: 'views/my-tasks.html',
        controller: 'MyTasksController',
        authenticate: true
      })
      .state('main.create-group', {
        url: '/create-group',
        templateUrl: 'views/group.html',
        controller: 'CreateGroupController',
        authenticate: true
      })
      .state('main.edit-group', {
        url: '/edit-group/:id',
        templateUrl: 'views/group.html',
        controller: 'EditGroupController',
        authenticate: true
      })
      .state('main.delete-group', {
        url: '/delete-group/:id',
        controller: 'DeleteGroupController',
        authenticate: true
      })
      .state('main.create-task', {
        url: '/create-task/:groupId',
        templateUrl: 'views/task.html',
        controller: 'CreateTaskController',
        authenticate: true
      })
      .state('main.edit-task', {
        url: '/edit-task/:id',
        templateUrl: 'views/task.html',
        controller: 'EditTaskController',
        authenticate: true
      })
      .state('main.delete-task', {
        url: '/delete-task/:id',
        controller: 'DeleteTaskController',
        authenticate: true
      })
      .state('sign-up', {
        url: '/sign-up',
        templateUrl: 'views/sign-up-form.html',
        controller: 'SignUpController',
      })
      .state('sign-up-success', {
        url: '/sign-up/success',
        templateUrl: 'views/sign-up-success.html'
      });
    $urlRouterProvider.otherwise('login');
  }])
  .run(['$rootScope', '$state', function($rootScope, $state) {
    $rootScope.$on('$stateChangeStart', function(event, next) {
      // redirect to login page if not logged in
      if (next.authenticate && !$rootScope.currentUser) {
        event.preventDefault(); //prevent current page from loading
        $state.go('forbidden');
      }
    });
  }]);
