class AppController {
  constructor($firebaseObject, $firebaseArray) {
    'ngInject';

    const config = {
      apiKey: 'AIzaSyBDdWtz7vzIJCVs9zOxJAkPLUAy6UV2r2w',
      authDomain: 'pointdog-ba7c4.firebaseapp.com',
      databaseURL: 'https://pointdog-ba7c4.firebaseio.com',
      storageBucket: 'pointdog-ba7c4.appspot.com',
      messagingSenderId: '719778653133',
    };

    firebase.initializeApp(config);
    firebase.database.enableLogging(true);

    var ref = firebase.database().ref();

    console.log($firebaseObject(ref.child('pointdogs').orderByChild('url').equalTo('http://point.dog/leeprobert')));
  }
}

export default AppController;
