(function () {
  'use strict';

  angular.module('frontend.consumers', [
    'angular.chips',
    'ngMessages',
    'angularsails.helpers.directives.dirPagination'
  ]);

  // Module configuration
  angular.module('frontend.consumers')
    .config([
      '$stateProvider',
      function config($stateProvider) {
        $stateProvider
          .state('consumers', {
            parent: 'frontend',
            url: '/consumers',
            data: {
              activeNode: true,
              pageName: "Consumers",
              pageDescription: "The Consumer object represents a consumer - or a user - of a Service. You can either rely on Kong as the primary datastore, or you can map the consumer list with your database to keep consistency between Kong and your existing primary datastore.",
              //displayName : "consumers",
              prefix: '<i class="material-icons">perm_identity</i>'
            },

            views: {
              'content@': {
                templateUrl: 'js/app/consumers/index.html',
                controller: 'ConsumersController'
              }
            }
          })
          .state('consumers.edit', {
            url: '/:id',
            data: {
              pageName: "Edit Consumer",
              pageDescription: null,
              displayName: "edit consumer",
              prefix: '<i class="material-icons">perm_identity</i>'
            },
            views: {
              'content@': {
                templateUrl: 'js/app/consumers/edit-consumer.html',
                controller: 'ConsumerController',
              },
              'details@consumers.edit': {
                templateUrl: 'js/app/consumers/details/consumer-details.html',
                controller: 'ConsumerDetailsController',
              },
              'groups@consumers.edit': {
                templateUrl: 'js/app/consumers/groups/consumer-groups.html',
                controller: 'ConsumerGroupsController'
              },
              'plugins@consumers.edit': {
                templateUrl: 'js/app/consumers/plugins/consumer-plugins.html',
                controller: 'ConsumerPluginsController'
              }
            },
            resolve: {
              _consumer: [
                'ConsumerService',
                '$stateParams',
                function (ConsumerService, $stateParams) {
                  return ConsumerService.findById($stateParams.id)
                }
              ],
              _activeNode: [
                'NodesService',
                function resolve(NodesService) {
                  return NodesService.isActiveNodeSet()
                }
              ],
            },
          })
      }
    ]);
}());
