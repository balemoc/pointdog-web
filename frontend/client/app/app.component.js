import template from './app.html';
import controller from './app.controller.js';
import './app.styl';

const appComponent = {
  template,
  restrict: 'E',
  controller,
};

export default appComponent;
