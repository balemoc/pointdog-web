import angular from 'angular';
import Detail from './detail/detail';
import Index from './index/index';

const componentModule = angular.module('app.components', [
  Detail,
  Index,
])

.name;

export default componentModule;
