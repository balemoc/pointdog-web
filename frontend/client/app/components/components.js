import angular from 'angular';
import Detail from './detail/detail';
import Index from './index/index';
import Auth from './auth/auth';
import NotFound from './notfound/notfound'

const componentModule = angular.module('app.components', [
  Detail,
  Index,
  Auth,
  NotFound,
])

.name;

export default componentModule;
