const PointdogFactory = ($firebaseObject) => {
  'ngInject';

  // services container
  const services = {};

  // firebase refs
  const storageRef = firebase.storage().ref();
  const dbRef = firebase.database().ref();

  services.getByUId = (userId, pointdogName) => {
    // param check
    if (!userId || !pointdogName) throw new Error('Missing param(s)');

    // path to obj
    const pointdog = dbRef
                      .child('user-pointdogs-name')
                      .child(userId)
                      .child(pointdogName);

    // firebaseobj
    const pointdogObj = $firebaseObject(pointdog);

    // return promise
    return pointdogObj
      .$loaded();
  };

  // get map imageURL
  services.getImageUrl = (path) => {
    // param check
    if (!path) throw new Error('Missing path');

    // get storage ref url based on path
    const image = storageRef.child(path).getDownloadURL();

    return image;
  };

  // Get all pointdogs based on userid
  services.getAllByUId = (userId) => {
    // param check
    if (!userId) throw new Error('Missing userId');

    // path to obj
    const pointdogs = dbRef
                        .child('user-pointdogs-name')
                        .child(userId);

    const pointdogsObj = $firebaseObject(pointdogs);

    // return promise
    return pointdogsObj
      .$loaded();
  };

  return services;
};

export default PointdogFactory;
