import angular from 'angular';
import Detail from './detail/detail';

const componentModule = angular.module('app.components', [
  Detail,
])

.name;

export default componentModule;
