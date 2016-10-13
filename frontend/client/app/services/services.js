import angular from 'angular';
import UserService from './user/user';
import PointdogService from './pointdog/pointdog';

const componentModule = angular.module('app.services', [
  UserService,
  PointdogService,
])

.name;

export default componentModule;
