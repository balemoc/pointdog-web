import angular from 'angular';
import User from './user/user';
import Header from './header/header';
import Map from './map/map';

const commonModule = angular.module('app.common', [
  User,
  Header,
  Map,
])

.name;

export default commonModule;
