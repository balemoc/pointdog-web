import angular from 'angular';
import uiRouter from 'angular-ui-router';
import angularFire from 'angularfire';
import ngMeta from 'ng-meta';
import 'normalize.css';
import Common from './common/common';
import Components from './components/components';
import Services from './services/services';
import AppComponent from './app.component';

angular.module('app', [
  uiRouter,
  'ngMeta',
  angularFire,
  Common,
  Components,
  Services,
])

.config(($locationProvider, $urlRouterProvider, $compileProvider) => {
  'ngInject';

  $compileProvider.aHrefSanitizationWhitelist(/^\s*(https?|ftp|mailto|comgooglemaps|waze|tomtomhome|here-location|chrome-extension):/);

  // @see: https://github.com/angular-ui/ui-router/wiki/Frequently-Asked-Questions
  // #how-to-configure-your-server-to-work-with-html5mode
  $locationProvider.html5Mode(true).hashPrefix('!');
  // index router
  $urlRouterProvider.when('', '/');
  // set 404 router to default
  $urlRouterProvider.otherwise('/');

  const config = {
    apiKey: 'AIzaSyBDdWtz7vzIJCVs9zOxJAkPLUAy6UV2r2w',
    authDomain: 'pointdog-ba7c4.firebaseapp.com',
    databaseURL: 'https://pointdog-ba7c4.firebaseio.com',
    storageBucket: 'pointdog-ba7c4.appspot.com',
    messagingSenderId: '719778653133',
  };

  firebase.initializeApp(config);
})

.run(($transitions, ngMeta) => {
  'ngInject';

  ngMeta.init();

  // matchCriteria // async 'callback'
  $transitions.onBefore({}, (transition) => {
    // get state informations to changes and be sure,
    // user can get auth component from detail
    const from = transition.$from().toString();
    const to = transition.$to().toString();

    // TODO: should be separated as matchCriteria
    if (to === 'auth') {
      // check if user was redirected from detail
      if (from !== 'detail') {
        return false;
      }
    }
    return true;
  });
})

.component('app', AppComponent);
