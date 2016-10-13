import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFire from 'angularfire';
import 'normalize.css';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services';
import AppComponent from './app.component';

angular.module('app', [
  uiRouter,
  angularFire,
  Common,
  Components,
  Services,
])

.config(($locationProvider, $urlRouterProvider) => {
  'ngInject';
  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  // index router
  $urlRouterProvider.when('', '/');
  // set 404 router to default
  $urlRouterProvider.otherwise('/');
})

.component('app', AppComponent);
