import angular from 'angular';
import Header from './header/header';
import Map from './map/map';

const componentModule = angular.module('app.components', [
  Header,
  Map,
])

.name;

export default componentModule;
