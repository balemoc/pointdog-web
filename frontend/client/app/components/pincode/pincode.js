import angular from 'angular';
import uiRouter from 'angular-ui-router';
import pincodeComponent from './pincode.component';

const pincodeModule = angular.module('pincode', [
  uiRouter,
])

.component('pincode', pincodeComponent)

.name;

export default pincodeModule;
