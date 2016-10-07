class AppController {
  constructor() {
    'ngInject';

    const config = {
      apiKey: 'AIzaSyBDdWtz7vzIJCVs9zOxJAkPLUAy6UV2r2w',
      authDomain: 'pointdog-ba7c4.firebaseapp.com',
      databaseURL: 'https://pointdog-ba7c4.firebaseio.com',
      storageBucket: 'pointdog-ba7c4.appspot.com',
      messagingSenderId: '719778653133',
    };

    firebase.initializeApp(config);
  }
}

export default AppController;
