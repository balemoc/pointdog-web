import angular from 'angular';
import uiRouter from 'angular-ui-router';
import mapdetailComponent from './mapdetail.component';

const mapdetailModule = angular.module('mapdetail', [
  uiRouter,
])

.component('mapdetail', mapdetailComponent)

.name;

export default mapdetailModule;
