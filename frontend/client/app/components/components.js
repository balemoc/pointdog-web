import angular from 'angular';
import Header from './header/header';

const componentModule = angular.module('app.components', [
  Header,
])

.name;

export default componentModule;
