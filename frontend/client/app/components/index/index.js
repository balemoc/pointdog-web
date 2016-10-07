import angular from 'angular';
import uiRouter from 'angular-ui-router';
import indexComponent from './index.component';

const indexModule = angular.module('index', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';

  $stateProvider
    .state('index', {
      url: '/',
      component: 'index',
    });
})

.component('index', indexComponent)

.name;

export default indexModule;
