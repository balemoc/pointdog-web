import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailComponent from './detail.component';

const detailModule = angular.module('detail', [
  uiRouter,
])

.config(($stateProvider, $urlMatcherFactoryProvider) => {
  'ngInject';

  // make ending trailing slash irrelevant on routing
  $urlMatcherFactoryProvider.strictMode(false);

  $stateProvider
    .state('detail', {
      url: '/me/{username}/{pointdogName}',
      component: 'detail',
      params: {
        // setup default pointdogname if null
        pointdogName: {
          value: 'default',
          squash: true,
        },
      },
    });
})

.component('detail', detailComponent)

.name;

export default detailModule;
