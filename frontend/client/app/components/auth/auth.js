import angular from 'angular';
import uiRouter from 'angular-ui-router';
import authComponent from './auth.component';

const authModule = angular.module('auth', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('auth', {
      url: '/auth',
      component: 'auth',
    });
})

.component('auth', authComponent)

.name;

export default authModule;
