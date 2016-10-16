import angular from 'angular';
import UserService from './user/user';
import PointdogService from './pointdog/pointdog';
import AuthService from './auth/auth';

const componentModule = angular.module('app.services', [
  UserService,
  PointdogService,
  AuthService,
])

.name;

export default componentModule;
