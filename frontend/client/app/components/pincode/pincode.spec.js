import PincodeModule from './pincode'
import PincodeController from './pincode.controller';
import PincodeComponent from './pincode.component';
import PincodeTemplate from './pincode.html';

describe('Pincode', () => {
  let $rootScope, makeController;

  beforeEach(window.module(PincodeModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new PincodeController();
    };
  }));

  describe('Module', () => {
    // top-level specs: i.e., routes, injection, naming
  });

  describe('Controller', () => {
    // controller specs
    it('has a name property [REMOVE]', () => { // erase if removing this.name from the controller
      let controller = makeController();
      expect(controller).to.have.property('name');
    });
  });

  describe('Template', () => {
    // template specs
    // tip: use regex to ensure correct bindings are used e.g., {{  }}
    it('has name in template [REMOVE]', () => {
      expect(PincodeTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = PincodeComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(PincodeTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(PincodeController);
      });
  });
});
