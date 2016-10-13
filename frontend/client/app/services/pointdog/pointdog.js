import angular from 'angular';
import PointdogFactory from './pointdog.factory';

const pointdogModule = angular.module('pointdog', [])

.factory('PointdogService', PointdogFactory)

.name;

export default pointdogModule;
