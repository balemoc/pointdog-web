import angular from 'angular';
import UserFactory from './user.factory';

const userModule = angular.module('user', [])

.factory('UserService', UserFactory)

.name;

export default userModule;
