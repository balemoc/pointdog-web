import angular from 'angular';
import uiRouter from 'angular-ui-router';
import notFoundComponent from './notfound.component';

const notFoundModule = angular.module('notfound', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('notfound', {
      url: '/404',
      component: 'notfound',
    });
})

.component('notfound', notFoundComponent)

.name;

export default notFoundModule;
