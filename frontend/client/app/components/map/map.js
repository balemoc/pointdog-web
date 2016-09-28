import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFire from 'angularfire';
import mapComponent from './map.component';

const mapModule = angular.module('map', [
  uiRouter,
  angularFire,
])

.component('map', mapComponent)

.name;

export default mapModule;
