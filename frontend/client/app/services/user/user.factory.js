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

    const userObj = $firebaseObject(user);

    return userObj
      .$loaded();
  };

  services.getAvatarUrl = (path) => {
    // param check
    if (!path) throw new Error('Missing path');

    // get storage ref url based on path
    const image = storageRef.child(path).getDownloadURL();

    return image;
  };

  return services;
};

export default UserFactory;
