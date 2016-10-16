const UserFactory = ($firebaseObject) => {
  'ngInject';

  // services container
  const services = {};

  // firebase refs
  const storageRef = firebase.storage().ref();
  const dbRef = firebase.database().ref();

  // store user obj
  services.user = null;

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
          // reject if does not exists
          if (!snapshot.exists()) reject();
          resolve(true);
        });
    });

    const userObj = $firebaseObject(user);

    // check if user exists
    return checkIfExists
      .then(() => userObj.$loaded())
      .then((user) => {
        services.user = user;
        return user;
      });
  };

  services.getAvatarUrl = (username) => {
    throw new Error('not implemented yet');
  };

  return services;
};

export default UserFactory;
