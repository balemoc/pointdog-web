class DetailController {
  constructor($scope, $firebaseObject, $firebaseArray,
  $state, $stateParams, UserService, PointdogService) {
    'ngInject';

    /*
    const username = $stateParams.username;
    const pointdogName = $stateParams.pointdogName;
    */

    const username = $stateParams.username;
    // get pointdogname from /{username}/{pointdogname} path
    // and if it was not specificed, set 'default'
    const pointdogName = $stateParams.pointdogName === '' ? 'default' : $stateParams.pointdogName;

    // data pipeline
    UserService
      // get user
      .getByName(username)
      // bind user & get pointdog
      .then((user) => {
        this.user = user;
        return PointdogService.getByUId(user.uid, pointdogName);
      })
      // bind pointdog & get map image
      .then((pointdog) => {
        this.pointdog = pointdog;
        return PointdogService.getMapImage(pointdog.mapImageRefPath);
      })
      // bind map image
      .then((url) => {
        // due to limit of angular / es5.
        // we need to reapply update bindings
        $scope.$apply(() => {
          this.mapImageUrl = url;
        });
      })
      // debug
      .then(() => {
        console.log(this.mapImageUrl);
        console.log(this.user);
        console.log(this.pointdog);
      })
      // if user/pointdog is absent or db error occured
      .catch((error) => {
        console.log(error);
        $state.go('index');
      });

    /*
    const storageRef = firebase.storage().ref();
    const dbRef = firebase.database().ref();
    let pointdog = null;
    if ($stateParams.pointdogName !== '') {
      pointdog = dbRef
        .child('pointdogs')
        .orderByChild('url')
        .equalTo(`http://point.dog/${username}/${pointdogName}`);
    } else {
      pointdog = dbRef
        .child('pointdogs')
        .orderByChild('name')
        .equalTo('default');
    }

    $firebaseArray(pointdog).$loaded((obj) => {
      // set user
      $firebaseObject(dbRef.child('profiles').child(obj[0].uid))
        .$loaded()
        .then((user) => {
          if (user.isPrivate) {
            this.pointdog = null;
          } else {
            this.pointdog = obj[0];
            this.user = user;
          }

          storageRef
            .child(this.pointdog.imageThumbRefPath)
            .getDownloadURL()
            .then((url) => {
              $scope.$apply(() => {
                this.user.profileImage = url;
              });
            });
        });

      // get image and bind
      storageRef
        .child(obj[0].mapImageRefPath)
        .getDownloadURL()
        .then((url) => {
          $scope.$apply(() => {
            this.pointdog.mapImage = url;
          });
        });
    });
    */
  }
}

export default DetailController;
