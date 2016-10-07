class DetailController {
  constructor($scope, $firebaseObject, $firebaseArray, $state, $stateParams) {
    'ngInject';

    const username = $stateParams.username;
    const pointdogName = $stateParams.pointdogName;

    /* img storage ref */
    const storageRef = firebase.storage().ref();
    /* db ref */
    const dbRef = firebase.database().ref();
    /* get pointdog */
    let pointdog = null;
    /* check if user is looking for default */
    if ($stateParams.pointdogName !== '') {
      pointdog = dbRef.child('pointdogs')
                        .orderByChild('url')
                        .equalTo(`http://point.dog/${username}/${pointdogName}`);
    } else {
      pointdog = dbRef.child('pointdogs')
                        .orderByChild('name')
                        .equalTo('default');
    }

    /* bind pointdog to scope */
    $firebaseArray(pointdog).$loaded((obj) => {
      this.pointdog = obj[0];

      // set user
      $firebaseObject(dbRef.child('profiles').child(obj[0].uid))
        .$loaded()
        .then((user) => {
          this.user = user;

          storageRef.child(this.pointdog.imageThumbRefPath).getDownloadURL()
            .then((url) => {
              $scope.$apply(() => {
                this.user.profileImage = url;
              });
          });
        });

      // get image and bind
      storageRef.child(obj[0].mapImageRefPath).getDownloadURL()
        .then((url) => {
          $scope.$apply(() => {
            this.pointdog.mapImage = url;
          });
        });
    });
  }
}

export default DetailController;
