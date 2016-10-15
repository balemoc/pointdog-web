class DetailController {
  constructor($scope, $firebaseObject, $firebaseArray,
  $state, $stateParams, UserService, PointdogService) {
    'ngInject';

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
        return PointdogService.getMapImageUrl(pointdog.mapImageRefPath);
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
  }
}

export default DetailController;
