class DetailController {
  constructor($scope, $state, $stateParams, UserService, PointdogService, AuthService) {
    'ngInject';

    const username = $stateParams.username;
    // get pointdogname from /{username}/{pointdogname} path
    // and if it was not specificed, set 'default'
    const pointdogName = $stateParams.pointdogName === '' ? 'default' : $stateParams.pointdogName;

    this.isAuthenticated = AuthService.authenticated;
    const dataToAuthenticate = AuthService.dataToAuthenticate;
    console.log(this.isAuthenticated);
    /*
    const user = UserService.getByName(username);

    const isAuthenticated = AuthService.isAuthenticated;
    const dataToAuthenticate = AuthService.dataToAuthenticate;
    */

    /*
    user
      .then((user) => {
        if (user.isPrivate) {
          if (!isAuthenticated) {
            // pass username
            dataToAuthenticate.username = username;
            dataToAuthenticate.pointdogName = pointdogName;
            dataToAuthenticate.hash = user.PIN;
            return $state.go('auth');
          }
        }
        // redirect to flow when already authenticated or doesn't need to be
        return user;
      })
      .then((user) => PointdogService.getByUId(user.uid, pointdogName))
      .then((pointdog) => {
        console.log(pointdog)
        console.log(this.user)
      })
      .catch((error) => console.log(error));
      */


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
      // authenticate
      .then(() => {
        if (this.user.isPrivate) {
          if (!this.isAuthenticated) {
            // pass username
            dataToAuthenticate.username = username;
            dataToAuthenticate.pointdogName = pointdogName;
            dataToAuthenticate.hash = this.user.PIN;
            return $state.go('auth');
          }
        }
        // there is no need for authentication
        // set it true - messy way
        $scope.$apply(() => {
          this.isAuthenticated = true;
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
