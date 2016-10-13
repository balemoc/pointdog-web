const UserFactory = ($firebaseObject) => {
  'ngInject';

  // services container
  const services = {};

  // store firebase refs
  const storageRef = firebase.storage().ref();
  const dbRef = firebase.database().ref();

  // Get user object by username
  services.getByName = (username) => {
    // param checking
    if (!username) throw new Error('Missing username');

    const user = dbRef
                  .child('user-profiles')
                  .child(username);

    const checkIfExists = new Promise((resolve, reject) => {
      user
        .once('value')
        .then((snapshot) => {
          if (!snapshot.exists()) reject();
          resolve(true);
        });
    });

    const userObj = $firebaseObject(user);

    // check if user exists
    return checkIfExists
      .then(() => userObj.$loaded());
  };

  return services;
};

export default UserFactory;
