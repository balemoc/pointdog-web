class AppController {
  constructor($firebase, $firebaseObject) {
    "ngInject";

    this.name = 'map';
    console.log($firebaseObject)
  }
}

export default AppController;
