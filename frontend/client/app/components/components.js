import angular from 'angular';
import Home from './home/home';
import About from './about/about';
import Header from './header/header';

const componentModule = angular.module('app.components', [
  Home,
  About,
  Header,
])

.name;

export default componentModule;
