import MapdetailModule from './mapdetail'
import MapdetailController from './mapdetail.controller';
import MapdetailComponent from './mapdetail.component';
import MapdetailTemplate from './mapdetail.html';

describe('Mapdetail', () => {
  let $rootScope, makeController;

  beforeEach(window.module(MapdetailModule));
  beforeEach(inject((_$rootScope_) => {
    $rootScope = _$rootScope_;
    makeController = () => {
      return new MapdetailController();
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
      expect(MapdetailTemplate).to.match(/{{\s?\$ctrl\.name\s?}}/g);
    });
  });

  describe('Component', () => {
      // component/directive specs
      let component = MapdetailComponent;

      it('includes the intended template',() => {
        expect(component.template).to.equal(MapdetailTemplate);
      });

      it('invokes the right controller', () => {
        expect(component.controller).to.equal(MapdetailController);
      });
  });
});
