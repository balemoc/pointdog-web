import angular from 'angular';
import Detail from './detail/detail';
import Index from './index/index';
import Auth from './auth/auth';

const componentModule = angular.module('app.components', [
  Detail,
  Index,
  Auth,
])

.name;

export default componentModule;
