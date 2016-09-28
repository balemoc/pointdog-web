import angular from 'angular';
import uiRouter from 'angular-ui-router';
import detailComponent from './detail.component';

const detailModule = angular.module('detail', [
  uiRouter,
])

.config(($stateProvider) => {
  'ngInject';
  $stateProvider
    .state('detail', {
      url: '/{username}/{name}',
      component: 'detail',
    });
})

.component('detail', detailComponent)

.name;

export default detailModule;
