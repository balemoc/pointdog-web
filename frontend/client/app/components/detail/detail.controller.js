class DetailController {
  constructor($scope, $firebaseObject, $firebaseArray, $state, $stateParams) {
    'ngInject';

    /* state params - url */
    const username = $stateParams.username;
    const pointdogName = $stateParams.pointdogName;

    /* img storage ref */
    const storageRef = firebase.storage().ref();
    /* db ref */
    const dbRef = firebase.database().ref();
    /* get pointdog */
    const pointdog = dbRef.child('pointdogs')
                        .orderByChild('url')
                        .equalTo(`http://point.dog/${username}/${pointdogName}`);

    /* bind pointdog to scope */
    $firebaseArray(pointdog).$loaded((obj) => {
      this.pointdog = obj[0];

      // set user
      $firebaseObject(dbRef.child('profiles').child(obj[0].uid))
        .$loaded()
        .then((user) => {
          this.user = user;
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
