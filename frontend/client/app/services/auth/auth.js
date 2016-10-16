import angular from 'angular';
import AuthFactory from './auth.factory';

const authModule = angular.module('auth.service', [])

.factory('AuthService', AuthFactory)

.name;

export default authModule;
